import { defineThemes } from '../theme/theme.models';

const camCoreCardTheme = {
  backgroundColor: '#0b1c2f',
  borderColor: 'rgba(194, 220, 247, 0.15)',
};

export const { useTheme } = defineThemes({
  dark: camCoreCardTheme,
  light: camCoreCardTheme,
});
