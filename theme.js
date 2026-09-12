import { Platform } from 'react-native';

const colors = {
  steel: '#23272A',
  steelDark: '#171A1C',
  steelLight: '#4B4E53',
  rust: '#B5651D',
  rustDark: '#8C4A14',
  patina: '#5B7065',
  parchment: '#EFE6D0',
  parchmentDark: '#DCCFAF',
  ink: '#2B2320',
  cream: '#F5EEDC',
};

const serif = Platform.select({ ios: 'Georgia', android: 'serif', default: 'Georgia, serif' });

const typography = {
  display: {
    fontFamily: serif,
    fontWeight: '700',
    letterSpacing: 1,
    color: colors.parchment,
  },
  label: {
    fontFamily: serif,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    color: colors.rust,
    fontSize: 12,
  },
  body: {
    fontFamily: serif,
    color: colors.ink,
    fontSize: 15,
  },
  bodyOnDark: {
    fontFamily: serif,
    color: colors.parchment,
    fontSize: 15,
  },
};

const spacing = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 };

const shadow = {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.35,
  shadowRadius: 4,
  elevation: 4,
};

export default { colors, typography, spacing, shadow, serif };
