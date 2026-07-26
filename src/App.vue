<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router';
import { NGlobalStyle, NMessageProvider, NNotificationProvider, darkTheme } from 'naive-ui';
import { darkThemeOverrides, lightThemeOverrides } from './themes';
import { layouts } from './layouts';
import { useStyleStore } from './stores/style.store';

const route = useRoute();
const layout = computed(() => route?.meta?.layout ?? layouts.base);
const styleStore = useStyleStore();

const theme = computed(() => (styleStore.isDarkTheme ? darkTheme : null));
const themeOverrides = computed(() => (styleStore.isDarkTheme ? darkThemeOverrides : lightThemeOverrides));

const { locale } = useI18n();

syncRef(
  locale,
  useStorage('locale', locale),
);
</script>

<template>
  <n-config-provider :theme="theme" :theme-overrides="themeOverrides">
    <NGlobalStyle />
    <NMessageProvider placement="bottom">
      <NNotificationProvider placement="bottom-right">
        <component :is="layout">
          <RouterView />
        </component>
      </NNotificationProvider>
    </NMessageProvider>
  </n-config-provider>
</template>

<style>
:root {
  color-scheme: light;
  --camcore-page-background: #eef4fb;
  --camcore-grid-line: rgba(37, 99, 235, 0.055);
  --camcore-selection: rgba(37, 99, 235, 0.24);
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

html.dark {
  color-scheme: dark;
  --camcore-page-background: #07111f;
  --camcore-grid-line: rgba(96, 165, 250, 0.055);
  --camcore-selection: rgba(56, 189, 248, 0.28);
}

body {
  min-height: 100%;
  margin: 0;
  padding: 0;
  background-color: var(--camcore-page-background);
  background-image:
    linear-gradient(var(--camcore-grid-line) 1px, transparent 1px),
    linear-gradient(90deg, var(--camcore-grid-line) 1px, transparent 1px);
  background-size: 34px 34px;
  background-attachment: fixed;
}

html {
  height: 100%;
  margin: 0;
  padding: 0;
  scroll-behavior: smooth;
}

#app {
  min-height: 100vh;
}

* {
  box-sizing: border-box;
}

::selection {
  background: var(--camcore-selection);
}
</style>
