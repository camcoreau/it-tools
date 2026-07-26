import type { GlobalThemeOverrides } from 'naive-ui';

export const lightThemeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#2563EB',
    primaryColorHover: '#1D4ED8',
    primaryColorPressed: '#1E40AF',
    primaryColorSuppl: '#38BDF8',
    borderRadius: '10px',
  },

  Menu: {
    itemHeight: '36px',
  },

  Layout: {
    color: '#EEF4FB',
    siderColor: '#F7FAFE',
    siderBorderColor: '#DCE7F4',
  },

  Card: {
    color: '#FFFFFFE8',
    borderColor: '#DCE7F4',
    borderRadius: '14px',
  },

  AutoComplete: {
    peers: {
      InternalSelectMenu: { height: '500px' },
    },
  },
};

export const darkThemeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#38BDF8',
    primaryColorHover: '#60A5FA',
    primaryColorPressed: '#2563EB',
    primaryColorSuppl: '#93C5FD',
    borderRadius: '10px',
    bodyColor: '#07111F',
    cardColor: '#0F1D31',
    modalColor: '#0F1D31',
    popoverColor: '#101F35',
    tableColor: '#0F1D31',
  },

  Notification: {
    color: '#0F1D31',
  },

  AutoComplete: {
    peers: {
      InternalSelectMenu: { height: '500px', color: '#0B1728' },
    },
  },

  Menu: {
    itemHeight: '36px',
  },

  Layout: {
    color: '#07111F',
    siderColor: '#0B1728',
    siderBorderColor: '#1D2E49',
  },

  Card: {
    color: '#0F1D31E8',
    borderColor: '#203451',
    borderRadius: '14px',
  },

  Table: {
    tdColor: '#0F1D31',
    thColor: '#132641',
  },
};
