const deformation = /* glsl */ `
  uniform float uPeel;
  uniform float uPeelDepth;
  uniform float uDetachedTension;
  uniform float uRadius;
  uniform float uMaxAngle;
  uniform float uWind;
  uniform float uTime;
  uniform vec2 uOrigin;
  uniform vec2 uPeelDir;
  uniform vec2 uMeshSize;
  uniform float uEntranceScaleProgress;
  uniform float uPreEntranceProgress;
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
    float preEntrance = smoothstep(
      0.0,
      1.0,
      clamp(uPreEntranceProgress, 0.0, 1.0)
    );
    base.xy *= mix(1.0, 0.6, preEntrance);
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
    // Pulling a detached sheet taut unfolds the curl without turning the
    // sticker back over. Reflecting it across the peel front keeps the back
    // face toward the viewer when the sheet becomes flat.
    vec3 tautBack = base;
    tautBack.xy += direction * (2.0 * arcDistance);
    curved = mix(curved, tautBack, clamp(uDetachedTension, 0.0, 1.0));
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
    vec3 curledNormal = normalize(vec3(direction * sin(angle), cos(angle)));
    return normalize(mix(
      curledNormal,
      vec3(0.0, 0.0, -1.0),
      clamp(uDetachedTension, 0.0, 1.0)
    ));
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
    vCurl = peelMask
      * sin(clamp(normalizedArc, 0.0, 3.14159265))
      * (1.0 - clamp(uDetachedTension, 0.0, 1.0));
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

export const galleryShadowVertexShader = /* glsl */ `
  ${deformation}

  uniform vec2 uShadowDirection;
  uniform float uShadowDistance;
  uniform float uShadowLiftScale;

  varying vec2 vShadowUv;

  void main() {
    vShadowUv = uv;
    vec3 deformed = deformSticker(position);
    vec4 worldPosition = modelMatrix * vec4(deformed, 1.0);
    float projectionDistance =
      uShadowDistance + max(deformed.z, 0.0) * uShadowLiftScale;
    worldPosition.xy += normalize(uShadowDirection) * projectionDistance;
    worldPosition.z = -0.004;
    gl_Position = projectionMatrix * viewMatrix * worldPosition;
  }
`;

export const galleryShadowFragmentShader = /* glsl */ `
  uniform sampler2D uMap;
  uniform vec2 uTexel;
  uniform vec3 uShadowColor;
  uniform float uShadowOpacity;
  uniform float uShadowDeleteOpacity;
  uniform float uShadowBlur;
  uniform float uOpacity;

  varying vec2 vShadowUv;

  float shadowAlpha(vec2 offset) {
    return texture2D(uMap, vShadowUv + offset).a;
  }

  void main() {
    vec2 blur = uTexel * max(uShadowBlur, 0.75);
    float alpha = shadowAlpha(vec2(0.0)) * 0.16;
    alpha += shadowAlpha(vec2( blur.x, 0.0)) * 0.1;
    alpha += shadowAlpha(vec2(-blur.x, 0.0)) * 0.1;
    alpha += shadowAlpha(vec2(0.0,  blur.y)) * 0.1;
    alpha += shadowAlpha(vec2(0.0, -blur.y)) * 0.1;
    alpha += shadowAlpha(vec2( blur.x,  blur.y)) * 0.075;
    alpha += shadowAlpha(vec2(-blur.x,  blur.y)) * 0.075;
    alpha += shadowAlpha(vec2( blur.x, -blur.y)) * 0.075;
    alpha += shadowAlpha(vec2(-blur.x, -blur.y)) * 0.075;
    vec2 wideBlur = blur * 1.85;
    alpha += shadowAlpha(vec2( wideBlur.x, 0.0)) * 0.0375;
    alpha += shadowAlpha(vec2(-wideBlur.x, 0.0)) * 0.0375;
    alpha += shadowAlpha(vec2(0.0,  wideBlur.y)) * 0.0375;
    alpha += shadowAlpha(vec2(0.0, -wideBlur.y)) * 0.0375;

    if (alpha < 0.002) discard;
    gl_FragColor = vec4(
      uShadowColor,
      alpha * uShadowOpacity * uShadowDeleteOpacity * uOpacity
    );
    #include <colorspace_fragment>
  }
`;

export const stickerFragmentShader = /* glsl */ `
  uniform sampler2D uMap;
  uniform sampler2D uPreparedMap;
  uniform float uPreparedMix;
  uniform vec2 uTexel;
  uniform float uEdgeFinishScale;
  uniform float uEdgeBevelWidth;
  uniform float uEdgeFinishStrength;
  uniform vec3 uBackColor;
  uniform float uGloss;
  uniform float uRoughness;
  uniform vec3 uLightDirection;
  uniform float uLightIntensity;
  uniform float uAmbientLight;
  uniform float uLightSoftness;
  uniform float uMaterialType;
  uniform float uMaterialIntensity;
  uniform float uMaterialScale;
  uniform float uMaterialSeed;
  uniform vec3 uHolographicColorA;
  uniform vec3 uHolographicColorB;
  uniform vec3 uHolographicColorC;
  uniform vec3 uShadowColor;
  uniform float uShadowOpacity;
  uniform float uEntranceSweep;
  uniform vec2 uEntranceAxis;
  uniform float uLaserCoreWidth;
  uniform float uLaserBandWidth;
  uniform float uLaserBandOpacity;
  uniform float uLaserBrightness;
  uniform float uLaserHighlightIntensity;
  uniform float uBackgroundRemovalDistortion;
  uniform float uRemovalDistortionRange;
  uniform float uRemovalDistortionStrength;
  uniform float uRemovalRippleDensity;
  uniform float uRemovalRippleSpeed;
  uniform float uInteractionHint;
  uniform float uInteractionHintRadius;
  uniform vec3 uInteractionHintColor;
  uniform float uTime;
  uniform float uPreserveFrontColor;
  uniform float uOpacity;

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

  vec4 artworkSample(vec2 uv) {
    vec2 safeUv = clamp(uv, vec2(0.0), vec2(1.0));
    vec4 artwork = texture2D(uMap, safeUv);
    if (uPreparedMix > 0.0) {
      artwork = mix(
        artwork,
        texture2D(uPreparedMap, safeUv),
        uPreparedMix
      );
    }
    return artwork;
  }

  vec3 spectralPalette(float phase) {
    return 0.55 + 0.45 * cos(
      6.2831853 * (phase + vec3(0.0, 0.333333, 0.666667))
    );
  }

  vec3 screenBlend(vec3 base, vec3 layer) {
    return 1.0 - (1.0 - base) * (1.0 - layer);
  }

  vec3 holographicPalette(float phase) {
    float position = fract(phase);
    if (position < 0.333333) {
      return mix(
        uHolographicColorA,
        uHolographicColorB,
        position * 3.0
      );
    }
    if (position < 0.666667) {
      return mix(
        uHolographicColorB,
        uHolographicColorC,
        (position - 0.333333) * 3.0
      );
    }
    return mix(
      uHolographicColorC,
      uHolographicColorA,
      (position - 0.666667) * 3.0
    );
  }

  vec3 applyFrontMaterial(
    vec3 base,
    vec3 normal,
    vec3 viewDirection,
    vec3 halfDirection
  ) {
    float kind = floor(uMaterialType + 0.5);
    // The default path is deliberately a no-op so it is pixel-identical to
    // Sticker Forge's front material before selectable finishes were added.
    if (kind < 0.5) return base;

    float amount = clamp(uMaterialIntensity, 0.0, 1.0);
    float scale = max(uMaterialScale, 0.2);
    vec2 detailUv = vUv * scale;
    float facing = max(dot(normal, viewDirection), 0.0);
    float ndh = max(dot(normal, halfDirection), 0.0);
    float edge = pow(1.0 - facing, 3.0);
    float grain = hash21(detailUv * 913.7 + uMaterialSeed * 71.3) - 0.5;
    float fineGrain = hash21(detailUv * 2471.0 + uMaterialSeed * 131.0);
    float sharpSpec = pow(ndh, 72.0);

    // Diffractive holographic film.
    if (kind < 1.5) {
      // Keep the diffraction bands anchored to the undeformed sticker.
      // The scalar view shift below lets the colors travel as the film bends
      // without rotating the band direction independently on either side of
      // the peel front.
      vec2 holographicUv = (vUv - 0.5) * scale;
      float holographicViewShift =
        (1.0 - facing) * 0.62
        + (1.0 - ndh) * 0.08
        + vCurl * 0.16;
      float phase =
        dot(holographicUv, vec2(1.15, 0.72)) * 2.8
        + holographicViewShift
        + grain * 0.16;
      vec3 rainbow = holographicPalette(phase);
      float band = 0.38 + 0.62 * pow(0.5 + 0.5 * sin(phase * 13.0), 3.0);
      float broadSpec = pow(ndh, 12.0);
      float bendSheen = 0.72 + broadSpec * 0.2 + vCurl * 0.18;
      return mix(
        base,
        screenBlend(base, rainbow * band * bendSheen),
        amount * (0.48 + 0.14 * facing)
      ) + (
        broadSpec * 0.13
        + sharpSpec * 0.24
        + vCurl * 0.06
      ) * rainbow * amount;
    }

    // Glitter laminate.
    if (kind < 2.5) {
      vec2 cell = floor(detailUv * 115.0);
      float flake = hash21(cell + uMaterialSeed * 97.0);
      float orientation = hash21(cell.yx + uMaterialSeed * 43.0);
      float twinkle = pow(
        max(0.0, cos((orientation - dot(normal.xy, vec2(0.47, 0.83))) * 6.2831853)),
        18.0
      );
      float sparkle = smoothstep(0.91, 0.995, flake) * twinkle;
      vec3 sparkleColor = mix(vec3(1.0), spectralPalette(flake), 0.46);
      return base * (1.0 + grain * 0.04 * amount)
        + sparkleColor * sparkle * amount * 1.35
        + sharpSpec * 0.08 * amount;
    }

    // Retroreflective film.
    float retro = pow(facing, 22.0);
    float beads = 0.78 + fineGrain * 0.28;
    return screenBlend(base, vec3(retro * beads * amount * 0.9))
      + edge * 0.025 * amount;
  }

  float interactionHitArea(vec2 uv, float centerAlpha, float radius) {
    vec2 hitOffset = uTexel * radius;
    vec2 diagonalOffset = hitOffset * 0.70710678;
    float sampledAlpha = min(
      min(
        min(
          texture2D(uMap, uv + vec2(hitOffset.x, 0.0)).a,
          texture2D(uMap, uv - vec2(hitOffset.x, 0.0)).a
        ),
        min(
          texture2D(uMap, uv + vec2(0.0, hitOffset.y)).a,
          texture2D(uMap, uv - vec2(0.0, hitOffset.y)).a
        )
      ),
      min(
        min(
          texture2D(uMap, uv + diagonalOffset).a,
          texture2D(uMap, uv - diagonalOffset).a
        ),
        min(
          texture2D(
            uMap,
            uv + vec2(diagonalOffset.x, -diagonalOffset.y)
          ).a,
          texture2D(
            uMap,
            uv + vec2(-diagonalOffset.x, diagonalOffset.y)
          ).a
        )
      )
    );
    return smoothstep(0.04, 0.28, centerAlpha)
      * (1.0 - smoothstep(0.08, 0.72, sampledAlpha));
  }

  void main() {
    vec2 surfaceUv = vUv;
    if (uBackgroundRemovalDistortion > 0.5 && uEntranceSweep >= 0.0) {
      vec2 scanDirection = abs(uEntranceAxis.x) > 0.5
        ? vec2(sign(uEntranceAxis.x), 0.0)
        : vec2(0.0, sign(uEntranceAxis.y));
      vec2 scanTangent = vec2(-scanDirection.y, scanDirection.x);
      float scanCoordinate = abs(uEntranceAxis.x) > 0.5
        ? (uEntranceAxis.x > 0.0 ? vUv.x : 1.0 - vUv.x)
        : (uEntranceAxis.y < 0.0 ? 1.0 - vUv.y : vUv.y);
      float tangentCoordinate = dot(vUv - vec2(0.5), scanTangent);
      float sweepCenter = mix(-0.3, 1.3, uEntranceSweep);
      float sweepDelta = scanCoordinate - sweepCenter;
      float distortionEnvelope =
        1.0 - smoothstep(
          uRemovalDistortionRange * 0.15,
          uRemovalDistortionRange,
          abs(sweepDelta)
        );
      float ripplePhase =
        tangentCoordinate * uRemovalRippleDensity;
      float rippleAcross = sweepDelta * uRemovalRippleDensity;
      float waterWaveA = sin(
        ripplePhase * 0.55
        + rippleAcross * 0.8
        + uTime * uRemovalRippleSpeed
      );
      float waterWaveB = sin(
        ripplePhase * 0.31
        - rippleAcross * 0.45
        - uTime * uRemovalRippleSpeed * 0.63
        + 1.7
      );
      float waterWaveC = sin(
        ripplePhase * 0.18
        + uTime * uRemovalRippleSpeed * 0.37
        + 3.1
      );
      float waterRipple =
        (waterWaveA * 0.58 + waterWaveB * 0.3 + waterWaveC * 0.12)
        * 0.0045
        * distortionEnvelope
        * uRemovalDistortionStrength;
      surfaceUv += scanTangent * waterRipple;
      surfaceUv +=
        scanDirection
        * (
          cos(ripplePhase * 0.42 + uTime * uRemovalRippleSpeed * 0.48)
          * 0.65
          + sin(ripplePhase * 0.23 - uTime * uRemovalRippleSpeed * 0.31)
          * 0.35
        )
        * distortionEnvelope
        * uRemovalDistortionStrength
        * 0.0016;
      surfaceUv = clamp(surfaceUv, vec2(0.001), vec2(0.999));
    }

    vec4 printSample = artworkSample(surfaceUv);
    float finishScale = clamp(uEdgeFinishScale, 0.75, 8.0);
    vec2 bevelOffset = uTexel * clamp(
      uEdgeBevelWidth * finishScale,
      0.5,
      24.0
    );
    float alphaLeft = artworkSample(
      surfaceUv - vec2(bevelOffset.x, 0.0)
    ).a;
    float alphaRight = artworkSample(
      surfaceUv + vec2(bevelOffset.x, 0.0)
    ).a;
    float alphaUp = artworkSample(
      surfaceUv + vec2(0.0, bevelOffset.y)
    ).a;
    float alphaDown = artworkSample(
      surfaceUv - vec2(0.0, bevelOffset.y)
    ).a;
    float innerAlpha = min(
      min(alphaLeft, alphaRight),
      min(alphaUp, alphaDown)
    );
    float edgeBand = smoothstep(0.06, 0.56, printSample.a)
      * (1.0 - smoothstep(0.1, 0.88, innerAlpha));
    vec2 inwardGradient = vec2(
      alphaRight - alphaLeft,
      alphaUp - alphaDown
    );
    vec2 outwardNormal = -inwardGradient
      / max(length(inwardGradient), 0.0001);
    vec2 edgeLightDirection = length(uLightDirection.xy) > 0.001
      ? normalize(uLightDirection.xy)
      : normalize(vec2(-0.65, 0.76));
    float directionalEdgeLight =
      dot(outwardNormal, edgeLightDirection);
    float edgeHighlight = pow(
      max(directionalEdgeLight, 0.0),
      1.35
    );
    float edgeShade = pow(
      max(-directionalEdgeLight, 0.0),
      1.2
    );

    if (printSample.a < 0.1) discard;

    vec3 surfaceNormal = normalize(vNormalView);
    vec3 viewDirection = normalize(-vViewPosition);
    float frontDeformation = clamp(vCurl * 0.82 + vLift * 0.48, 0.0, 1.0);
    float preservedFront = uPreserveFrontColor * (
      1.0 - smoothstep(0.025, 0.34, frontDeformation)
    );
    float signedFacing = dot(surfaceNormal, viewDirection);
    float frontMix = smoothstep(-0.035, 0.035, signedFacing);
    frontMix = mix(
      frontMix,
      step(0.0, signedFacing),
      preservedFront
    );
    vec3 normal = signedFacing < 0.0 ? -surfaceNormal : surfaceNormal;
    vec3 lightDirection = normalize(uLightDirection);
    vec3 halfDirection = normalize(lightDirection + viewDirection);
    float normalLight = max(dot(normal, lightDirection), 0.0);
    float lightLevel = clamp(
      uAmbientLight + normalLight * uLightIntensity,
      0.0,
      1.65
    );
    float facing = max(dot(normal, viewDirection), 0.0);
    float fresnel = pow(1.0 - facing, 3.0);
    float micro = (hash21(vUv * 970.0) - 0.5) * 0.018;

    float highlightExponent = mix(52.0, 18.0, uLightSoftness);
    float printHighlight =
      pow(max(dot(normal, halfDirection), 0.0), highlightExponent)
      * 0.068
      * uLightIntensity
      * mix(1.0, 0.68, uLightSoftness);
    float frontDiffuse = mix(
      1.0,
      lightLevel,
      0.18 + frontDeformation * 0.82
    );
    vec3 litFrontColor = printSample.rgb * frontDiffuse + printHighlight;
    litFrontColor += fresnel * 0.025;
    vec3 neutralFrontColor = mix(
      litFrontColor,
      printSample.rgb,
      preservedFront
    );
    vec3 frontColor = applyFrontMaterial(
      neutralFrontColor,
      normal,
      viewDirection,
      halfDirection
    );
    frontColor = mix(
      frontColor,
      vec3(1.0),
      edgeBand
        * edgeHighlight
        * clamp(uEdgeFinishStrength, 0.0, 1.0)
        * 0.2
    );
    frontColor *= 1.0
      - edgeBand
        * edgeShade
        * clamp(uEdgeFinishStrength, 0.0, 1.0)
        * 0.12;

    float exponent =
      mix(17.0, 86.0, clamp(uGloss, 0.0, 1.0))
      * mix(1.2, 0.42, uLightSoftness);
    float specular = pow(max(dot(normal, halfDirection), 0.0), exponent);
    specular *=
      mix(0.06, 0.3, uGloss)
      * (1.0 - uRoughness * 0.58)
      * uLightIntensity
      * mix(1.0, 0.72, uLightSoftness);
    float satinBand = pow(max(vCurl, 0.0), 1.7) * (0.045 + uGloss * 0.1);
    vec3 backColor = uBackColor * mix(0.76, 1.0, lightLevel);
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
      float laserCore =
        1.0 - smoothstep(0.0, uLaserCoreWidth, laserDistance);
      float laserHalo =
        1.0 - smoothstep(uLaserCoreWidth, uLaserBandWidth, laserDistance);
      float laserPhase =
        (sweepCoordinate - sweepCenter) * 3.6 + uEntranceSweep * 1.7;
      vec3 laserColor = 0.58 + 0.42 * cos(
        6.2831853 * (laserPhase + vec3(0.0, 0.33, 0.67))
      );
      color = mix(
        color,
        laserColor * uLaserBrightness,
        laserHalo * uLaserBandOpacity
      );
      color += laserColor * (
        laserCore * uLaserHighlightIntensity
        + laserHalo * uLaserBandOpacity * 0.347826
      );
    }

    if (uInteractionHint > 0.0) {
      float hitArea = interactionHitArea(
        vUv,
        printSample.a,
        uInteractionHintRadius
      );
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
      float innerLineWidth = max(2.0, uInteractionHintRadius * 0.09);
      float innerEdgeOuter = interactionHitArea(
        vUv,
        printSample.a,
        uInteractionHintRadius + innerLineWidth
      );
      float innerEdgeInner = interactionHitArea(
        vUv,
        printSample.a,
        max(0.0, uInteractionHintRadius - innerLineWidth)
      );
      float innerEdge = clamp(
        innerEdgeOuter - innerEdgeInner,
        0.0,
        1.0
      ) * (1.0 - edge);
      float dash = smoothstep(
        -0.22,
        0.22,
        sin((gl_FragCoord.x + gl_FragCoord.y) * 0.72)
      );
      color = mix(
        color,
        uInteractionHintColor,
        hitArea * 0.28 * uInteractionHint
      );
      color = mix(
        color,
        uInteractionHintColor,
        max(edge, innerEdge) * dash * uInteractionHint
      );
    }

    gl_FragColor = vec4(color, printSample.a * uOpacity);
    #include <colorspace_fragment>
  }
`;

export const residueVertexShader = /* glsl */ `
  uniform float uPeelDepth;
  uniform vec2 uOrigin;
  uniform vec2 uPeelDir;
  uniform vec2 uMeshSize;

  varying vec2 vResidueUv;
  varying float vResidueReveal;

  void main() {
    vResidueUv = uv;
    vec2 direction = normalize(uPeelDir + vec2(0.00001));
    float along = dot(position.xy - uOrigin, direction);
    float revealFeather = max(min(uMeshSize.x, uMeshSize.y) * 0.012, 0.004);
    float peeledArea = 1.0 - smoothstep(
      uPeelDepth - revealFeather,
      uPeelDepth + revealFeather,
      along
    );
    vResidueReveal = peeledArea * step(0.00001, uPeelDepth);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const residueFragmentShader = /* glsl */ `
  uniform sampler2D uMap;
  uniform float uOpacity;

  varying vec2 vResidueUv;
  varying float vResidueReveal;

  float residueNoise(vec2 point) {
    point = fract(point * vec2(127.1, 311.7));
    point += dot(point, point + 19.19);
    return fract(point.x * point.y);
  }

  void main() {
    float artworkAlpha = texture2D(uMap, vResidueUv).a;
    if (artworkAlpha < 0.1 || vResidueReveal < 0.001) discard;

    float grain = mix(0.82, 1.0, residueNoise(vResidueUv * 760.0));
    float residueAlpha = artworkAlpha * vResidueReveal * grain * 0.085;
    gl_FragColor = vec4(vec3(0.34), residueAlpha * uOpacity);
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
