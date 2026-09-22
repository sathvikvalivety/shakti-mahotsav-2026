/**
 * The goddess artwork is a single flattened image (cut out onto a transparent
 * ground), so it cannot be split into real layers. Instead, this rig describes
 * soft regions of the image (in source pixels) that the WebGL renderer gently
 * deforms in place: a head sway, crown, hair, weapons, saree and a jewellery
 * shimmer. Face, hands and torso are never warped, and the figure as a whole
 * only breathes (a tiny CSS float + scale, see home-hero.css).
 *
 * Each part runs on its own slow period so nothing moves in lockstep:
 * breath 8s · head 10s · weapons 9–12s · hair 12–14s · saree 12–18s.
 *
 * If the artwork file changes, re-measure these coordinates against it.
 */

type Vec2 = readonly [x: number, y: number];
/** Soft ellipse: centre x, centre y, radius x, radius y. */
type Ellipse = readonly [cx: number, cy: number, rx: number, ry: number];

export const GODDESS_ART = {
  src: '/images/sacred/goddess-cutout.webp',
  width: 1669,
  height: 942,
  alt: 'Goddess Durga with eight arms, adorned in gold jewellery and a flowing red silk saree, holding a trident and sacred weapons',
} as const;

interface WeaponRig {
  id: string;
  /** Where the hand grips the weapon; the sway pivots here. */
  pivot: Vec2;
  /** Far end of the shaft. */
  tip: Vec2;
  /** Half-width of the shaft region, px. */
  width: number;
  /** Head of the weapon (prongs, rings, mace head). */
  head: Ellipse;
  tiltDeg: number;
  period: number;
  phase: number;
}

export const GODDESS_RIG = {
  /** Gentle side-to-side sway of the head about the neck (face stays undistorted). */
  head: {
    pivot: [840, 372] as Vec2,
    region: [838, 195, 135, 235] as Ellipse,
    swayDeg: 1.2,
    period: 10,
  },

  crown: {
    pivot: [836, 240] as Vec2,
    region: [836, 130, 100, 130] as Ellipse,
    /** Float weight is full above ramp[0] and fades to zero at ramp[1] (the band). */
    ramp: [150, 245] as Vec2,
    liftPx: 3,
    tiltDeg: 0.6,
    period: 8,
  },

  /** Left and right hair drift independently, slower than the head. */
  hair: {
    masses: [
      [715, 370, 85, 175],
      [958, 370, 85, 175],
    ] as Ellipse[],
    drift: [2.5, 3] as Vec2,
    periods: [12, 13.6] as Vec2,
  },

  weapons: [
    { id: 'trishula', pivot: [463, 398], tip: [492, 240], width: 20, head: [490, 228, 68, 66], tiltDeg: 1, period: 10.5, phase: 0 },
    { id: 'chakra-staff', pivot: [1222, 400], tip: [1178, 200], width: 20, head: [1192, 250, 80, 54], tiltDeg: 1, period: 11.5, phase: 0.35 },
    { id: 'gada-left', pivot: [566, 345], tip: [602, 265], width: 18, head: [591, 297, 28, 44], tiltDeg: 1, period: 8.8, phase: 0.6 },
    { id: 'gada-right', pivot: [1100, 352], tip: [1054, 275], width: 18, head: [1072, 305, 28, 44], tiltDeg: 1, period: 9.6, phase: 0.15 },
  ] as WeaponRig[],

  fabric: {
    /** Left cloth: full motion at x <= left[0], none at x >= left[1]. */
    left: [220, 440] as Vec2,
    /** Right cloth: none at x <= right[0], full motion at x >= right[1]. */
    right: [1240, 1460] as Vec2,
    /** Motion fades in from top[0] to top[1] (keeps the upper arms still). */
    top: [340, 460] as Vec2,
    /** Peak displacement, px (horizontal, vertical). */
    amplitude: [6, 3] as Vec2,
    wavelength: 520,
    /** Wave periods, s: left cloth is the slowest, right slightly quicker. */
    periods: [15, 12.5] as Vec2,
    swellPeriods: [19, 16] as Vec2,
    /** Lower centre skirt: barely moves. */
    skirt: { region: [835, 880, 270, 170] as Ellipse, drift: 1.2, period: 18 },
  },

  /** Regions eligible for the jewellery shimmer; within them only bright highlights catch the light. */
  jewels: [
    [836, 140, 95, 125], // crown
    [783, 327, 16, 32], // earring
    [888, 327, 16, 32], // earring
    [843, 480, 80, 150], // necklaces
    [495, 463, 40, 38], // bangles
    [572, 418, 38, 36],
    [493, 615, 38, 42],
    [543, 715, 42, 45],
    [1098, 418, 38, 35],
    [1180, 468, 40, 36],
    [1177, 614, 40, 36],
    [1150, 680, 42, 40],
    [848, 672, 128, 55], // waist belt
    [845, 850, 50, 95], // belt pendant
  ] as Ellipse[],

  shimmer: {
    /** Seconds between the start of each sweep. */
    cycle: 11,
    /** Seconds a sweep takes to travel crown → waist. */
    sweep: 3.4,
    /** Delay before the first sweep after the artwork appears. */
    delay: 2.5,
    /** Band half-width as a fraction of image height. */
    width: 0.045,
    gain: 0.85,
  },

  /** Fraction of the image faded at the sides and bottom so it melts into the page. */
  edgeFade: { side: 0.1, bottom: 0.14 },
} as const;

export interface GoddessPose {
  time: number;
  headAngle: number;
  crownAngle: number;
  crownLift: number;
  hairOffsets: [[number, number], [number, number]];
  skirtShift: [number, number];
  weaponAngles: number[];
  fabricStrength: number;
  shimmerCenter: number;
  shimmerStrength: number;
}

const TAU = Math.PI * 2;
const DEG = Math.PI / 180;

const oscillate = (t: number, period: number, phase = 0) => Math.sin(TAU * (t / period + phase));

const easeInOut = (x: number) => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2);

function shimmerAt(t: number): { center: number; strength: number } {
  const { cycle, sweep, delay } = GODDESS_RIG.shimmer;
  const local = t - delay;
  if (local < 0) return { center: -1, strength: 0 };
  const progress = (local % cycle) / sweep;
  if (progress > 1) return { center: -1, strength: 0 };
  return { center: -0.08 + 1.16 * easeInOut(progress), strength: Math.sin(Math.PI * progress) };
}

/**
 * Pose of every rig part at time `t` (seconds). `intensity` (0..1) scales all
 * motion — 0 gives the untouched artwork, used for reduced motion and ease-in.
 */
export function poseAt(t: number, intensity: number): GoddessPose {
  const { head, crown, hair, weapons, fabric } = GODDESS_RIG;
  const shimmer = shimmerAt(t);

  return {
    time: t,
    headAngle: head.swayDeg * DEG * oscillate(t, head.period) * intensity,
    crownAngle: crown.tiltDeg * DEG * oscillate(t, crown.period, 0.3) * intensity,
    crownLift: -crown.liftPx * (0.5 - 0.5 * Math.cos((TAU * t) / crown.period)) * intensity,
    hairOffsets: [
      [
        hair.drift[0] * oscillate(t, hair.periods[0], 0.15) * intensity,
        hair.drift[1] * oscillate(t, hair.periods[0] * 1.17, 0.4) * intensity,
      ],
      [
        hair.drift[0] * oscillate(t, hair.periods[1], 0.6) * intensity,
        hair.drift[1] * oscillate(t, hair.periods[1] * 1.13, 0.05) * intensity,
      ],
    ],
    skirtShift: [
      fabric.skirt.drift * oscillate(t, fabric.skirt.period, 0.2) * intensity,
      fabric.skirt.drift * 0.5 * oscillate(t, fabric.skirt.period * 1.3, 0.7) * intensity,
    ],
    weaponAngles: weapons.map((w) => w.tiltDeg * DEG * oscillate(t, w.period, w.phase) * intensity),
    fabricStrength: intensity,
    shimmerCenter: shimmer.center,
    shimmerStrength: shimmer.strength * intensity,
  };
}
