import { useDark, useMediaQuery, useStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { type Ref, watch } from 'vue';

export const useStyleStore = defineStore('style', {
  state: () => {
    const isDarkTheme = useDark();
    isDarkTheme.value = true;

    watch(isDarkTheme, (isDark) => {
      if (!isDark) {
        isDarkTheme.value = true;
      }
    });

    const toggleDark = () => {
      isDarkTheme.value = true;
      return true;
    };

    const isSmallScreen = useMediaQuery('(max-width: 700px)');
    const isMenuCollapsed = useStorage('camcore-it-tools:menu-collapsed', true) as Ref<boolean>;

    watch(isSmallScreen, () => (isMenuCollapsed.value = true));

    return {
      isDarkTheme,
      toggleDark,
      isMenuCollapsed,
      isSmallScreen,
    };
  },
});
