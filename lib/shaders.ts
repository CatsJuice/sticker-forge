const deformation = /* glsl */ `
  uniform float uPeel;
  uniform float uPeelDepth;
  uniform float uRadius;
  uniform float uMaxAngle;
  uniform float uWind;
  uniform float uTime;
  uniform vec2 uOrigin;
  uniform vec2 uPeelDir;
  uniform vec2 uMeshSize;
  uniform float uEntranceScaleProgress;
  uniform vec2 uEntranceAxis;

  vec3 scaleEntranceSlice(vec3 base) {
    if (uEntranceScaleProgress < 0.0) return base;

    float entranceCoordinate = abs(uEntranceAxis.x) > 0.5
      ? (uEntranceAxis.x > 0.0
          ? base.x / uMeshSize.x + 0.5
          : 0.5 - base.x / uMeshSize.x)
      : (uEntranceAxis.y < 0.0
          ? 0.5 - base.y / uMeshSize.y
          : base.y / uMeshSize.y + 0.5);
    float sliceProgress = clamp(
      uEntranceScaleProgress * 1.42 - entranceCoordinate * 0.42,
      0.0,
      1.0
    );
    float springResponse = 1.0
      - exp(-3.8 * sliceProgress) * cos(9.0 * sliceProgress);
    float sliceScale = mix(0.6, 1.0, springResponse);
    base.xy *= sliceScale;
    return base;
  }

  vec3 deformSticker(vec3 base) {
    base = scaleEntranceSlice(base);
    if (uPeelDepth <= 0.00001 || uPeel <= 0.0) return base;

    vec2 direction = normalize(uPeelDir + vec2(0.00001));
    vec2 tangent = vec2(-direction.y, direction.x);
    vec2 relative = base.xy - uOrigin;
    float side = dot(relative, tangent);
    float along = dot(relative, direction);
    float front = uPeelDepth;
    float arcDistance = front - along;
    if (arcDistance <= 0.0) return base;

    float radius = max(uRadius, 0.001);
    float maxAngle = clamp(uMaxAngle, 2.55, 3.14159265);
    float arcLength = radius * maxAngle;
    float angle = min(arcDistance / radius, maxAngle);
    float projected = -radius * sin(angle);
    float elevation = radius * (1.0 - cos(angle));

    if (arcDistance > arcLength) {
      float freeLength = arcDistance - arcLength;
      projected += -freeLength * cos(maxAngle);
      elevation += freeLength * sin(maxAngle);
    }

    vec3 curved = base;
    vec2 crease = base.xy + direction * (front - along);
    curved.xy = crease + direction * projected;
    curved.z = elevation;

    float normalizedPeel = clamp(arcDistance / max(front, 0.001), 0.0, 1.0);
    float flutterEnvelope = sin(normalizedPeel * 3.14159265);
    float windWave =
      sin(uTime * 3.1 + side * 4.6 + arcDistance * 2.2) * 0.72 +
      sin(uTime * 7.4 - side * 6.8 + arcDistance * 4.1) * 0.28;
    float windDisplacement = windWave * uWind * flutterEnvelope;
    curved.z += windDisplacement * 0.032;
    curved.xy += tangent * windDisplacement * 0.04;
    curved.xy += direction * windDisplacement * 0.01;
    return curved;
  }

  vec3 stickerSurfaceNormal(vec3 base) {
    if (uPeelDepth <= 0.00001 || uPeel <= 0.0) {
      return vec3(0.0, 0.0, 1.0);
    }

    vec2 direction = normalize(uPeelDir + vec2(0.00001));
    float along = dot(base.xy - uOrigin, direction);
    float arcDistance = uPeelDepth - along;
    if (arcDistance <= 0.0) return vec3(0.0, 0.0, 1.0);

    float radius = max(uRadius, 0.001);
    float maxAngle = clamp(uMaxAngle, 2.55, 3.14159265);
    float angle = min(arcDistance / radius, maxAngle);
    return normalize(vec3(direction * sin(angle), cos(angle)));
  }
`;

export const stickerVertexShader = /* glsl */ `
  ${deformation}
  #include <common>
  #include <shadowmap_pars_vertex>

  varying vec2 vUv;
  varying vec3 vNormalView;
  varying vec3 vViewPosition;
  varying float vLift;
  varying float vCurl;
  varying float vAdhered;

  void main() {
    vUv = uv;
    vec3 deformed = deformSticker(position);
    vec3 localNormal = stickerSurfaceNormal(position);

    vec2 direction = normalize(uPeelDir + vec2(0.00001));
    vec2 relative = position.xy - uOrigin;
    float along = dot(relative, direction);
    float front = uPeelDepth;
    float arcDistance = max(front - along, 0.0);
    float peelMask =
      step(along, front) * step(0.00001, uPeelDepth);
    float effectiveRadius = max(uRadius, 0.001);
    float normalizedArc = arcDistance / effectiveRadius;
    float receiverFeather = max(min(uMeshSize.x, uMeshSize.y) * 0.006, 0.004);
    float activePeel = step(0.00001, uPeelDepth);

    vLift = max(deformed.z, 0.0);
    vCurl = peelMask * sin(clamp(normalizedArc, 0.0, 3.14159265));
    vAdhered = mix(
      1.0,
      smoothstep(front - receiverFeather, front + receiverFeather, along),
      activePeel
    );

    vec4 viewPosition = modelViewMatrix * vec4(deformed, 1.0);
    vViewPosition = viewPosition.xyz;
    vNormalView = normalize(normalMatrix * localNormal);
    vec3 transformedNormal = vNormalView;
    vec4 worldPosition = modelMatrix * vec4(deformed, 1.0);
    #include <shadowmap_vertex>
    gl_Position = projectionMatrix * viewPosition;
  }
`;

export const stickerFragmentShader = /* glsl */ `
  uniform sampler2D uMap;
  uniform vec2 uTexel;
  uniform vec3 uBackColor;
  uniform float uGloss;
  uniform float uRoughness;
  uniform vec3 uShadowColor;
  uniform float uShadowOpacity;
  uniform float uEntranceSweep;
  uniform vec2 uEntranceAxis;
  uniform float uInteractionHint;
  uniform vec3 uInteractionHintColor;

  varying vec2 vUv;
  varying vec3 vNormalView;
  varying vec3 vViewPosition;
  varying float vLift;
  varying float vCurl;
  varying float vAdhered;

  #include <common>
  #include <packing>
  #include <lights_pars_begin>
  #include <shadowmap_pars_fragment>
  #include <shadowmask_pars_fragment>

  float hash21(vec2 point) {
    point = fract(point * vec2(123.34, 456.21));
    point += dot(point, point + 45.32);
    return fract(point.x * point.y);
  }

  void main() {
    vec4 printSample = texture2D(uMap, vUv);
    if (printSample.a < 0.018) discard;

    vec3 surfaceNormal = normalize(vNormalView);
    vec3 viewDirection = normalize(-vViewPosition);
    float signedFacing = dot(surfaceNormal, viewDirection);
    float frontMix = smoothstep(-0.035, 0.035, signedFacing);
    vec3 normal = signedFacing < 0.0 ? -surfaceNormal : surfaceNormal;
    vec3 lightDirection = normalize(vec3(-0.38, 0.52, 0.76));
    vec3 halfDirection = normalize(lightDirection + viewDirection);
    float normalLight = max(dot(normal, lightDirection), 0.0);
    float facing = max(dot(normal, viewDirection), 0.0);
    float fresnel = pow(1.0 - facing, 3.0);
    float micro = (hash21(vUv * 970.0) - 0.5) * 0.018;

    float printHighlight = pow(max(dot(normal, halfDirection), 0.0), 42.0) * 0.055;
    float frontDeformation = clamp(vCurl * 0.82 + vLift * 0.48, 0.0, 1.0);
    float frontDiffuse = mix(1.0, 0.76 + 0.24 * normalLight, frontDeformation);
    vec3 frontColor = printSample.rgb * frontDiffuse + printHighlight;
    frontColor += fresnel * 0.025;

    float exponent = mix(17.0, 86.0, clamp(uGloss, 0.0, 1.0));
    float specular = pow(max(dot(normal, halfDirection), 0.0), exponent);
    specular *= mix(0.06, 0.3, uGloss) * (1.0 - uRoughness * 0.58);
    float satinBand = pow(max(vCurl, 0.0), 1.7) * (0.045 + uGloss * 0.1);
    vec3 backColor = uBackColor * (0.82 + 0.18 * max(dot(normal, lightDirection), 0.0));
    backColor += specular + fresnel * (0.055 + 0.085 * uGloss) + satinBand + micro;

    vec3 color = mix(backColor, frontColor, frontMix);

    float projectedShadow = (1.0 - getShadowMask()) * vAdhered;
    color = mix(
      color,
      uShadowColor,
      clamp(projectedShadow * uShadowOpacity, 0.0, 1.0)
    );

    if (uEntranceSweep >= 0.0) {
      float sweepCoordinate = abs(uEntranceAxis.x) > 0.5
        ? (uEntranceAxis.x > 0.0 ? vUv.x : 1.0 - vUv.x)
        : (uEntranceAxis.y < 0.0 ? 1.0 - vUv.y : vUv.y);
      float sweepCenter = mix(-0.3, 1.3, uEntranceSweep);
      float laserDistance = abs(sweepCoordinate - sweepCenter);
      float laserCore = 1.0 - smoothstep(0.0, 0.04, laserDistance);
      float laserHalo = 1.0 - smoothstep(0.04, 0.3, laserDistance);
      float laserPhase =
        (sweepCoordinate - sweepCenter) * 3.6 + uEntranceSweep * 1.7;
      vec3 laserColor = 0.58 + 0.42 * cos(
        6.2831853 * (laserPhase + vec3(0.0, 0.33, 0.67))
      );
      color = mix(color, laserColor * 1.18, laserHalo * 0.46);
      color += laserColor * (laserCore * 0.62 + laserHalo * 0.16);
    }

    if (uInteractionHint > 0.0) {
      float nearbyAlpha = min(
        min(
          texture2D(uMap, vUv + vec2(uTexel.x * 3.0, 0.0)).a,
          texture2D(uMap, vUv - vec2(uTexel.x * 3.0, 0.0)).a
        ),
        min(
          texture2D(uMap, vUv + vec2(0.0, uTexel.y * 3.0)).a,
          texture2D(uMap, vUv - vec2(0.0, uTexel.y * 3.0)).a
        )
      );
      float edge = smoothstep(0.04, 0.28, printSample.a)
        * (1.0 - smoothstep(0.08, 0.72, nearbyAlpha));
      float dash = smoothstep(
        -0.22,
        0.22,
        sin((gl_FragCoord.x + gl_FragCoord.y) * 0.72 - uTime * 3.2)
      );
      float fillOpacity = 0.1 * uInteractionHint;
      float outlineOpacity = edge * dash * 0.92 * uInteractionHint;
      color = mix(color, uInteractionHintColor, fillOpacity);
      color = mix(color, uInteractionHintColor, outlineOpacity);
    }

    gl_FragColor = vec4(color, printSample.a);
    #include <colorspace_fragment>
  }
`;

export const peelShadowDepthVertexShader = /* glsl */ `
  ${deformation}

  varying vec2 vDepthUv;

  void main() {
    vDepthUv = uv;
    vec3 deformed = deformSticker(position);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(deformed, 1.0);
  }
`;

export const peelShadowDepthFragmentShader = /* glsl */ `
  uniform sampler2D uMap;
  varying vec2 vDepthUv;

  void main() {
    float artworkAlpha = texture2D(uMap, vDepthUv).a;
    if (artworkAlpha < 0.04) discard;
    gl_FragColor = vec4(1.0);
  }
`;
