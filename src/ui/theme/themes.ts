import { defineThemes } from './theme.models';

export const { themes: appThemes, useTheme: useAppTheme } = defineThemes({
  light: {
    background: '#ffffff',
    text: {
      baseColor: '#333639',
      mutedColor: '#767c82',
    },
    default: {
      color: 'rgba(46, 51, 56, 0.05)',
      colorHover: 'rgba(46, 51, 56, 0.09)',
      colorPressed: 'rgba(46, 51, 56, 0.22)',
    },
    primary: {
      color: '#18a058',
      colorHover: '#1ea54c',
      colorPressed: '#0C7A43',
      colorFaded: '#18a0582f',
    },
    warning: {
      color: '#f59e0b',
      colorHover: '#f59e0b',
      colorPressed: '#f59e0b',
      colorFaded: '#f59e0b2f',
    },
    success: {
      color: '#18a058',
      colorHover: '#36ad6a',
      colorPressed: '#0c7a43',
      colorFaded: '#18a0582f',
    },
    error: {
      color: '#d03050',
      colorHover: '#de576d',
      colorPressed: '#ab1f3f',
      colorFaded: '#d030502a',
    },
  },
  dark: {
    background: '#0b1c2f',
    text: {
      baseColor: '#f5f9ff',
      mutedColor: '#b1c3d8',
    },
    default: {
      color: 'rgba(255, 255, 255, 0.07)',
      colorHover: 'rgba(255, 255, 255, 0.12)',
      colorPressed: 'rgba(255, 255, 255, 0.2)',
    },
    primary: {
      color: '#54baff',
      colorHover: '#78c9ff',
      colorPressed: '#319edf',
      colorFaded: 'rgba(84, 186, 255, 0.18)',
    },
    warning: {
      color: '#ffd06e',
      colorHover: '#ffdb8f',
      colorPressed: '#d9a94c',
      colorFaded: 'rgba(255, 208, 110, 0.16)',
    },
    success: {
      color: '#38dc87',
      colorHover: '#62e6a1',
      colorPressed: '#20b86a',
      colorFaded: 'rgba(56, 220, 135, 0.16)',
    },
    error: {
      color: '#ff7896',
      colorHover: '#ff9aae',
      colorPressed: '#dc5675',
      colorFaded: 'rgba(255, 120, 150, 0.16)',
    },
  },
});