import { GODDESS_RIG } from './goddessRig';

export const VERTEX_SHADER = /* glsl */ `#version 300 es
in vec2 a_position;
out vec2 v_uv;

void main() {
  // Image space: (0,0) top-left, (1,1) bottom-right.
  v_uv = vec2(a_position.x * 0.5 + 0.5, 0.5 - a_position.y * 0.5);
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

/**
 * Each output pixel looks up where its colour should come from ("inverse
 * warp"). Every rig region adds a small, smoothly weighted offset, so parts
 * move independently without tearing and the image is never moved as a whole.
 */
export const FRAGMENT_SHADER = /* glsl */ `#version 300 es
precision highp float;

#define WEAPON_COUNT ${GODDESS_RIG.weapons.length}
#define JEWEL_COUNT ${GODDESS_RIG.jewels.length}

const float TAU = 6.28318530718;

in vec2 v_uv;
out vec4 outColor;

uniform sampler2D u_art; // cut-out artwork, premultiplied alpha
uniform vec2 u_artSize;

uniform vec2 u_headPivot;
uniform vec4 u_headRegion;
uniform float u_headAngle;

uniform vec2 u_crownPivot;
uniform vec4 u_crownRegion;
uniform vec2 u_crownRamp;
uniform float u_crownAngle;
uniform float u_crownLift;

uniform vec4 u_hairRegions[2];
uniform vec2 u_hairOffsets[2];

uniform vec4 u_weaponSegments[WEAPON_COUNT]; // xy grip, zw tip
uniform vec4 u_weaponHeads[WEAPON_COUNT];
uniform float u_weaponWidths[WEAPON_COUNT];
uniform float u_weaponAngles[WEAPON_COUNT];

uniform vec4 u_fabricBands; // xy left full→none, zw right none→full
uniform vec2 u_fabricTop;
uniform vec2 u_fabricAmp;
uniform float u_fabricWavelength;
uniform vec4 u_fabricPeriods; // left wave, right wave, left swell, right swell
uniform float u_fabricStrength;
uniform vec4 u_skirtRegion;
uniform vec2 u_skirtShift;
uniform vec2 u_fabricShift;
uniform float u_time;

uniform vec4 u_jewels[JEWEL_COUNT];
uniform vec2 u_shimmer; // band centre on the sweep axis, strength
uniform float u_shimmerWidth;
uniform float u_shimmerGain;

uniform vec2 u_edgeFade; // side, bottom

float ellipseWeight(vec2 p, vec4 e, float core) {
  return 1.0 - smoothstep(core, 1.0, length((p - e.xy) / e.zw));
}

// Shaft from grip a to tip b. Weight eases in above the grip, so the shaft
// flexes out of the hand instead of kinking at the fingers.
float capsuleWeight(vec2 p, vec2 a, vec2 b, float radius) {
  vec2 pa = p - a;
  vec2 ba = b - a;
  float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
  return (1.0 - smoothstep(radius * 0.55, radius, length(pa - ba * h))) * smoothstep(0.0, 0.35, h);
}

// Source position for a region rotated by +angle about pivot.
vec2 rotateAbout(vec2 p, vec2 pivot, float angle) {
  float s = sin(-angle);
  float c = cos(-angle);
  vec2 q = p - pivot;
  return pivot + vec2(c * q.x - s * q.y, s * q.x + c * q.y);
}

void main() {
  vec2 p = v_uv * u_artSize;
  vec2 offset = vec2(0.0);
  float axis = u_artSize.x * 0.5;

  // Head: a slow sway about the neck; the face moves rigidly, never warps.
  float wHead = ellipseWeight(p, u_headRegion, 0.75);
  offset += wHead * (rotateAbout(p, u_headPivot, u_headAngle) - p);

  // Crown: the spire floats and sways while the band stays seated.
  float wCrown = ellipseWeight(p, u_crownRegion, 0.7) * (1.0 - smoothstep(u_crownRamp.x, u_crownRamp.y, p.y));
  offset += wCrown * (rotateAbout(p, u_crownPivot, u_crownAngle) - p - vec2(0.0, u_crownLift));

  // Hair: left and right locks drift on their own timing, limited to dark
  // pixels so skin and gold stay put.
  vec3 soft = textureLod(u_art, v_uv, 3.0).rgb;
  float darkness = 1.0 - smoothstep(0.10, 0.30, max(soft.r, max(soft.g, soft.b)));
  offset -= darkness * ellipseWeight(p, u_hairRegions[0], 0.45) * u_hairOffsets[0];
  offset -= darkness * ellipseWeight(p, u_hairRegions[1], 0.45) * u_hairOffsets[1];

  // Weapons: each sways independently about its grip.
  for (int i = 0; i < WEAPON_COUNT; i++) {
    vec4 seg = u_weaponSegments[i];
    float w = max(capsuleWeight(p, seg.xy, seg.zw, u_weaponWidths[i]), ellipseWeight(p, u_weaponHeads[i], 0.7));
    offset += w * (rotateAbout(p, seg.xy, u_weaponAngles[i]) - p);
  }

  // Saree: a breeze that travels outward, strongest at the free ends. Each
  // side has its own rhythm; the centre skirt only shifts a pixel or so.
  float wFabric = max(1.0 - smoothstep(u_fabricBands.x, u_fabricBands.y, p.x), smoothstep(u_fabricBands.z, u_fabricBands.w, p.x));
  wFabric *= smoothstep(u_fabricTop.x, u_fabricTop.y, p.y);
  bool leftSide = p.x < axis;
  float wavePeriod = leftSide ? u_fabricPeriods.x : u_fabricPeriods.y;
  float swellPeriod = leftSide ? u_fabricPeriods.z : u_fabricPeriods.w;
  float side = leftSide ? -1.0 : 1.0;
  float phase = abs(p.x - axis) * (TAU / u_fabricWavelength) - u_time * (TAU / wavePeriod);
  vec2 breeze = vec2(
    side * (0.65 * sin(phase) + 0.35 * sin(phase * 1.7 + p.y * 0.011 + 1.3)),
    sin(phase * 0.8 + p.y * 0.017 - u_time * (TAU / swellPeriod) + 0.7)
  );
  offset -= wFabric * (breeze * u_fabricAmp * u_fabricStrength + u_fabricShift);
  offset -= ellipseWeight(p, u_skirtRegion, 0.3) * u_skirtShift;

  vec2 uv = (p + offset) / u_artSize;
  vec4 texel = texture(u_art, uv);
  float alpha = texel.a;
  vec3 rgb = alpha > 0.0 ? texel.rgb / alpha : vec3(0.0);

  // Jewellery shimmer: an occasional band of light sweeping down the figure.
  if (u_shimmer.y > 0.001) {
    float jewel = 0.0;
    for (int i = 0; i < JEWEL_COUNT; i++) {
      jewel = max(jewel, ellipseWeight(p, u_jewels[i], 0.55));
    }
    float lum = dot(rgb, vec3(0.299, 0.587, 0.114));
    float d = ((p.y + 0.25 * (p.x - axis)) / u_artSize.y - u_shimmer.x) / u_shimmerWidth;
    float light = exp(-d * d) * u_shimmer.y * jewel * smoothstep(0.25, 0.8, lum) * u_shimmerGain;
    rgb += (1.0 - rgb) * vec3(1.0, 0.86, 0.58) * light;
  }

  // Soft sides and base so the fabric ends melt into the page.
  float fade = smoothstep(0.0, u_edgeFade.x, v_uv.x)
    * smoothstep(0.0, u_edgeFade.x, 1.0 - v_uv.x)
    * smoothstep(0.0, u_edgeFade.y, 1.0 - v_uv.y);
  alpha *= fade;
  outColor = vec4(min(rgb, vec3(1.0)) * alpha, alpha);
}
`;
