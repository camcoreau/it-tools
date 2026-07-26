import type { GlobalThemeOverrides } from 'naive-ui';

export const lightThemeOverrides: GlobalThemeOverrides = {};

export const darkThemeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#54BAFF',
    primaryColorHover: '#79C9FF',
    primaryColorPressed: '#389FE8',
    primaryColorSuppl: '#8F73FF',
    infoColor: '#54BAFF',
    successColor: '#38DC87',
    warningColor: '#FFD06E',
    errorColor: '#FF7896',
    textColorBase: '#F5F9FF',
    textColor1: '#F5F9FF',
    textColor2: '#D7E5F5',
    textColor3: '#B1C3D8',
    bodyColor: '#020611',
    cardColor: '#0C1C2FD6',
    modalColor: '#12273FF5',
    popoverColor: '#12273FF5',
    tableColor: '#0C1C2FD6',
    borderColor: '#C2DCF726',
    dividerColor: '#C2DCF726',
    inputColor: '#00000045',
    hoverColor: '#FFFFFF18',
    borderRadius: '17px',
    borderRadiusSmall: '12px',
    fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },

  Button: {
    borderRadiusMedium: '999px',
    borderRadiusSmall: '999px',
    borderRadiusLarge: '999px',
    textColorText: '#DDEBFA',
    textColorTextHover: '#FFFFFF',
    colorTextHover: '#FFFFFF12',
  },

  Notification: {
    color: '#12273FF5',
    borderRadius: '17px',
  },

  AutoComplete: {
    peers: {
      InternalSelectMenu: {
        height: '500px',
        color: '#12273FF5',
      },
    },
  },

  Menu: {
    itemHeight: '40px',
    itemTextColor: '#B1C3D8',
    itemTextColorHover: '#FFFFFF',
    itemTextColorActive: '#FFFFFF',
    itemIconColor: '#8298B2',
    itemIconColorHover: '#54BAFF',
    itemIconColorActive: '#54BAFF',
    itemColorHover: '#FFFFFF0E',
    itemColorActive: '#54BAFF1F',
    itemColorActiveHover: '#54BAFF29',
    borderRadius: '14px',
  },

  Layout: {
    color: 'transparent',
    siderColor: 'transparent',
    siderBorderColor: 'transparent',
  },

  Card: {
    color: '#0C1C2FD6',
    borderColor: '#C2DCF726',
    borderRadius: '23px',
  },

  Input: {
    color: '#00000045',
    colorFocus: '#00000060',
    border: '1px solid #C2DCF726',
    borderFocus: '1px solid #54BAFFA6',
    borderHover: '1px solid #C2DCF747',
    borderRadius: '17px',
  },

  Table: {
    tdColor: '#0C1C2FD6',
    thColor: '#12273FF0',
    borderColor: '#C2DCF726',
  },
};
