// Variant: Deep Ocean (deep sea, bioluminescent aqua, ocean blue, coral).
//
// A dark identity: every original surface, light or dark, lands on a navy step, and text
// lands on mist. Accent fills become violet; the orange call-to-action fills become aqua with
// navy text. Surface-aware custom properties (--oc-*) let text follow the surface it sits on.
// Table format: see scripts/variants/neobrutal.mjs.
export const PALETTE = {
  void: '#020c1b', navy: '#031a33', navy2: '#052544', navy3: '#08305a', navy4: '#0c3d70',
  indigo: '#06415e', indigoDeep: '#02223d', indigoPale: '#062a4a',
  violet: '#0077b6', violetHi: '#ff9e7a', lilac: '#9be7ff',
  aqua: '#5ef2e0', aquaPale: '#c8fff7',
  mist: '#e8fbff', mist2: '#c6e3ee', muted: '#8fb4c6',
};
const P = PALETTE;

const BASE = [
  `--oc-accent:${P.aqua}`, `--oc-accent2:${P.aquaPale}`, `--oc-white:${P.mist}`, `--oc-fg:${P.mist}`,
  `--oc-fg2:${P.mist2}`, `--oc-muted:${P.muted}`, `--oc-deep:${P.lilac}`, `--oc-hot:${P.violetHi}`,
  '--oc-line:rgba(232, 251, 255,.14)', '--oc-line2:rgba(232, 251, 255,.3)', `--oc-glow:${P.violet}`,
].join(';');

// text-like entry: the surface variable when opaque, and the same variable at the token's
// opacity (color-mix) when translucent, so ink follows the surface it lands on
const t = (v, fallback, alpha) => ({ solid: `var(${v},${fallback})`, alpha: alpha === undefined ? fallback : alpha, mix: true });

export default {
  name: 'ocean',
  dist: 'dist',
  port: 4321,
  prefix: '--oc-',
  styles: ['/styles/ocean.css'],
  scripts: ['/scripts/ocean.js'],

  ctx: {
    dark: BASE,
    light: BASE,
    // violet / indigo fills
    accent: [`--oc-accent:#ffffff`, `--oc-accent2:#ffffff`, `--oc-white:#ffffff`, `--oc-fg:#ffffff`, `--oc-fg2:#eefcff`,
      `--oc-muted:#d6f6ff`, `--oc-deep:#ffffff`, `--oc-hot:#ffffff`, '--oc-line:rgba(255,255,255,.3)',
      '--oc-line2:rgba(255,255,255,.5)', `--oc-glow:${P.violet}`].join(';'),
    // aqua fills (were orange call-to-actions): navy ink on top
    orange: [`--oc-accent:${P.navy}`, `--oc-accent2:${P.navy}`, `--oc-white:${P.navy}`, `--oc-fg:${P.navy}`, `--oc-fg2:${P.navy}`,
      '--oc-muted:rgba(3, 26, 51,.72)', `--oc-deep:${P.navy}`, `--oc-hot:${P.navy}`, '--oc-line:rgba(3, 26, 51,.25)',
      '--oc-line2:rgba(3, 26, 51,.45)', `--oc-glow:${P.aqua}`].join(';'),
  },
  whiteTextCtx: '',
  lineVar: 'var(--oc-line,rgba(232, 251, 255,.14))',
  // custom properties are mapped by what they paint where they are read (see collectUses)
  varRoles: true,
  // off-palette pale tints (creams, blush, pastel washes) are light surfaces too: on a dark skin
  // they must land on navy like the rest
  refineOther: (h, s, l) => (l >= 0.86 ? 'paper' : null),

  map: {
    bg: { white: P.navy, paper: P.navy2, silver: P.navy3, grey: P.navy4, ink: P.void, ink2: '#041d38',
      teal: P.violet, blue: P.violet, mint: P.indigo, mintPale: P.indigoPale, deep: P.indigoDeep, orange: P.aqua },
    grad: { white: P.navy, paper: P.navy2, silver: P.navy3, ink: P.void, ink2: '#041d38',
      teal: P.violet, mint: '#0a5a8a', mintPale: P.navy2, deep: '#063a63', blue: P.violet, orange: P.aqua },
    // gradients clipped to text (background-clip: text): light, glowing stops
    gradText: { white: P.mist, paper: P.mist2, silver: P.muted, grey: P.muted, ink: P.mist, ink2: P.mist2,
      teal: P.aqua, blue: P.violetHi, mint: P.aquaPale, mintPale: P.aquaPale, deep: P.lilac, orange: P.violetHi },
    text: {
      white: t('--oc-white', P.mist), paper: t('--oc-white', P.mist),
      silver: t('--oc-muted', '#a9cad8', P.mist), grey: t('--oc-muted', P.muted, P.mist),
      ink: t('--oc-fg', P.mist), ink2: t('--oc-fg2', P.mist2, P.mist),
      teal: t('--oc-accent', P.aqua), blue: t('--oc-accent', P.aqua),
      mint: t('--oc-accent2', P.aquaPale, P.aqua), mintPale: t('--oc-accent2', P.aquaPale, P.aqua),
      deep: t('--oc-deep', P.lilac), orange: t('--oc-hot', P.violetHi, P.violet),
    },
    border: {
      white: { solid: 'rgba(232, 251, 255,.55)', alpha: P.mist },
      paper: { solid: 'var(--oc-line,rgba(232, 251, 255,.14))', alpha: null },
      silver: { solid: 'var(--oc-line,rgba(232, 251, 255,.14))', alpha: null },
      mintPale: { solid: 'var(--oc-line,rgba(232, 251, 255,.14))', alpha: null },
      grey: { solid: 'rgba(232, 251, 255,.22)', alpha: P.mist },
      ink: { solid: 'var(--oc-line2,rgba(232, 251, 255,.3))', alpha: P.mist },
      ink2: { solid: 'var(--oc-line2,rgba(232, 251, 255,.3))', alpha: P.mist },
      teal: t('--oc-accent', P.aqua), mint: t('--oc-accent', P.aqua), blue: t('--oc-accent', P.aqua),
      deep: P.violet, orange: P.aqua,
    },
    svg: { white: P.mist, paper: P.navy3, silver: '#3a4378', grey: P.muted, ink: P.mist, ink2: P.mist2,
      teal: P.aqua, blue: P.violet, mint: P.aquaPale, mintPale: P.navy3, deep: P.lilac, orange: P.aqua },
    // fallback for custom properties read both as text and as a surface (or never read):
    // neutrals act as surfaces, saturated colours as accents that must stay readable on navy
    var: { white: P.navy, paper: P.navy2, silver: P.navy3, ink: P.void, ink2: '#041d38',
      teal: { solid: `var(--oc-accent,${P.aqua})`, alpha: P.violet }, blue: { solid: `var(--oc-accent,${P.aqua})`, alpha: P.violet },
      mint: P.aquaPale, mintPale: P.indigoPale, deep: P.aqua, orange: P.violetHi },
    canvas: { white: P.mist, ink: P.navy, ink2: P.navy2, teal: P.aqua, mint: P.aquaPale, mintPale: P.indigoPale,
      deep: P.violet, blue: P.violet, orange: P.aqua },
  },
};
