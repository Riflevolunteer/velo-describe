const colors = {
  background: '#FFFFFF',
  surface: '#F6F5F2',
  ink: '#111111',
  gray: '#8A8A8A',
  grayLight: '#B7B5B0',
  border: '#E4E2DE',
  accent: '#0B2D5B',
  accentDark: '#071D3D',
  amber: '#D98E2B',
  amberDark: '#B26F1A',
};

const typography = {
  eyebrow: {
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: colors.amberDark,
    fontSize: 12,
  },
  headline: {
    fontWeight: '700',
    letterSpacing: 0.2,
    color: colors.ink,
    fontSize: 26,
  },
  title: {
    fontWeight: '600',
    color: colors.ink,
    fontSize: 17,
  },
  body: {
    fontWeight: '400',
    color: colors.ink,
    fontSize: 15,
    lineHeight: 21,
  },
  caption: {
    fontWeight: '400',
    color: colors.gray,
    fontSize: 13,
  },
};

const spacing = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48 };

export default { colors, typography, spacing };
