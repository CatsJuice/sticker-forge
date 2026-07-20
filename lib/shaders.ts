const deformation = /* glsl */ `
  uniform float uPeel;
  uniform float uPeelDepth;
  uniform float uRadius;
  uniform float uInfluence;
  uniform float uMaxAngle;
  uniform float uStiffness;
  uniform float uWind;
  uniform float uTime;
  uniform vec2 uOrigin;
  uniform vec2 uPeelDir;
  uniform vec2 uMeshSize;

  vec3 deformSticker(vec3 base) {
    float transition = smoothstep(0.0, 0.018, uPeel);
    if (transition <= 0.0) return base;

    vec2 direction = normalize(uPeelDir + vec2(0.00001));
    vec2 tangent = vec2(-direction.y, direction.x);
    vec2 relative = base.xy - uOrigin;
    float side = dot(relative, tangent);
    float along = dot(relative, direction);
    float influence = max(uInfluence, 0.001);
    float sideRatio = abs(side) / influence;
    float frontShape = max(0.0, 1.0 - sideRatio * sideRatio);
    float front = uPeelDepth * frontShape;
    float arcDistance = front - along;
    float peelMask = step(0.0, arcDistance) * step(sideRatio, 1.0) * transition;
    if (peelMask <= 0.0) return base;

    float radius = max(uRadius * mix(0.76, 1.22, uStiffness), 0.008);
    float maxAngle = clamp(uMaxAngle, 1.1, 4.25);
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
    curved.z = max(0.008, elevation);

    float edgeWeight = smoothstep(0.0, max(front, 0.001), arcDistance);
    float windWave = sin(uTime * 8.168 + side * 10.7) *
      sin(uTime * 3.41 + arcDistance * 6.3);
    curved.z += windWave * uWind * 0.026 * edgeWeight;
    curved.xy += tangent * windWave * uWind * 0.012 * edgeWeight;
    return mix(base, curved, peelMask);
  }
`;

export const stickerVertexShader = /* glsl */ `
  ${deformation}

  varying vec2 vUv;
  varying vec3 vNormalView;
  varying vec3 vViewPosition;
  varying float vLift;
  varying float vCrease;
  varying float vCurl;

  void main() {
    vUv = uv;
    vec3 deformed = deformSticker(position);
    float epsilon = max(min(uMeshSize.x, uMeshSize.y) * 0.0024, 0.001);
    vec3 deformedX = deformSticker(position + vec3(epsilon, 0.0, 0.0));
    vec3 deformedY = deformSticker(position + vec3(0.0, epsilon, 0.0));
    vec3 localNormal = normalize(cross(deformedX - deformed, deformedY - deformed));

    vec2 direction = normalize(uPeelDir + vec2(0.00001));
    vec2 tangent = vec2(-direction.y, direction.x);
    vec2 relative = position.xy - uOrigin;
    float side = dot(relative, tangent);
    float along = dot(relative, direction);
    float sideRatio = abs(side) / max(uInfluence, 0.001);
    float front = uPeelDepth * max(0.0, 1.0 - sideRatio * sideRatio);
    float arcDistance = max(front - along, 0.0);
    float peelMask = step(along, front) * step(sideRatio, 1.0) * smoothstep(0.0, 0.018, uPeel);
    float effectiveRadius = max(uRadius * mix(0.76, 1.22, uStiffness), 0.008);
    float normalizedArc = arcDistance / effectiveRadius;

    vLift = max(deformed.z, 0.0);
    vCrease = peelMask * exp(-arcDistance / max(effectiveRadius * 0.32, 0.004));
    vCurl = peelMask * sin(clamp(normalizedArc, 0.0, 3.14159265));

    vec4 viewPosition = modelViewMatrix * vec4(deformed, 1.0);
    vViewPosition = viewPosition.xyz;
    vNormalView = normalize(normalMatrix * localNormal);
    gl_Position = projectionMatrix * viewPosition;
  }
`;

export const stickerFragmentShader = /* glsl */ `
  uniform sampler2D uMap;
  uniform vec3 uBackColor;
  uniform float uGloss;
  uniform float uRoughness;

  varying vec2 vUv;
  varying vec3 vNormalView;
  varying vec3 vViewPosition;
  varying float vLift;
  varying float vCrease;
  varying float vCurl;

  float hash21(vec2 point) {
    point = fract(point * vec2(123.34, 456.21));
    point += dot(point, point + 45.32);
    return fract(point.x * point.y);
  }

  void main() {
    vec4 printSample = texture2D(uMap, vUv);
    if (printSample.a < 0.018) discard;

    vec3 normal = normalize(vNormalView);
    if (!gl_FrontFacing) normal *= -1.0;
    vec3 viewDirection = normalize(-vViewPosition);
    vec3 lightDirection = normalize(vec3(-0.38, 0.52, 0.76));
    vec3 halfDirection = normalize(lightDirection + viewDirection);
    float diffuse = 0.78 + 0.22 * max(dot(normal, lightDirection), 0.0);
    float facing = max(dot(normal, viewDirection), 0.0);
    float fresnel = pow(1.0 - facing, 3.0);
    float micro = (hash21(vUv * 970.0) - 0.5) * 0.018;

    vec3 color;
    if (gl_FrontFacing) {
      float printHighlight = pow(max(dot(normal, halfDirection), 0.0), 42.0) * 0.055;
      color = printSample.rgb * diffuse + printHighlight;
      color += fresnel * 0.025;
    } else {
      float exponent = mix(17.0, 86.0, clamp(uGloss, 0.0, 1.0));
      float specular = pow(max(dot(normal, halfDirection), 0.0), exponent);
      specular *= mix(0.06, 0.3, uGloss) * (1.0 - uRoughness * 0.58);
      float satinBand = pow(max(vCurl, 0.0), 1.7) * (0.045 + uGloss * 0.1);
      color = uBackColor * (0.82 + 0.18 * max(dot(normal, lightDirection), 0.0));
      color += specular + fresnel * (0.055 + 0.085 * uGloss) + satinBand + micro;
    }

    color *= 1.0 - vCrease * 0.11;
    float rim = smoothstep(0.02, 0.24, printSample.a);
    color *= mix(0.9, 1.0, rim);
    gl_FragColor = vec4(color, printSample.a);
  }
`;

export const shadowVertexShader = /* glsl */ `
  ${deformation}

  uniform vec2 uShadowDirection;
  uniform float uShadowDistance;
  uniform float uShadowLayer;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec3 deformed = deformSticker(position);
    float height = max(deformed.z, 0.0);
    float projection = (0.14 + height * 3.2) * uShadowLayer;
    deformed.xy += uShadowDirection * uShadowDistance * projection;
    deformed.z = -0.075 - uShadowLayer * 0.004;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(deformed, 1.0);
  }
`;

export const shadowFragmentShader = /* glsl */ `
  uniform sampler2D uMap;
  uniform vec2 uTexel;
  uniform vec3 uShadowColor;
  uniform float uShadowOpacity;
  uniform float uShadowBlur;
  uniform float uBlurScale;
  uniform float uLayerWeight;
  varying vec2 vUv;

  void main() {
    vec2 stepSize = uTexel * max(uShadowBlur, 0.25) * uBlurScale;
    float alpha = texture2D(uMap, vUv).a * 0.2;
    alpha += texture2D(uMap, vUv + vec2(stepSize.x, 0.0)).a * 0.11;
    alpha += texture2D(uMap, vUv - vec2(stepSize.x, 0.0)).a * 0.11;
    alpha += texture2D(uMap, vUv + vec2(0.0, stepSize.y)).a * 0.11;
    alpha += texture2D(uMap, vUv - vec2(0.0, stepSize.y)).a * 0.11;
    alpha += texture2D(uMap, vUv + stepSize).a * 0.09;
    alpha += texture2D(uMap, vUv - stepSize).a * 0.09;
    alpha += texture2D(uMap, vUv + vec2(stepSize.x, -stepSize.y)).a * 0.09;
    alpha += texture2D(uMap, vUv + vec2(-stepSize.x, stepSize.y)).a * 0.09;
    alpha = smoothstep(0.0, 0.78, alpha);
    if (alpha < 0.006) discard;
    gl_FragColor = vec4(uShadowColor, alpha * uShadowOpacity * uLayerWeight);
  }
`;
