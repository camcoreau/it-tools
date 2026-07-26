<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router';
import { NGlobalStyle, NMessageProvider, NNotificationProvider, darkTheme } from 'naive-ui';
import { darkThemeOverrides } from './themes';
import { layouts } from './layouts';

const route = useRoute();
const layout = computed(() => route?.meta?.layout ?? layouts.base);

const { locale } = useI18n();

syncRef(
  locale,
  useStorage('locale', locale),
);
</script>

<template>
  <n-config-provider :theme="darkTheme" :theme-overrides="darkThemeOverrides">
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
  color-scheme: dark;
  --bg-0: #020611;
  --bg-1: #061321;
  --bg-2: #0a1021;
  --panel: rgba(12, 28, 47, 0.84);
  --panel-strong: rgba(18, 39, 63, 0.96);
  --panel-soft: rgba(255, 255, 255, 0.052);
  --panel-hover: rgba(255, 255, 255, 0.095);
  --text: #f5f9ff;
  --muted: #b1c3d8;
  --subtle: #8298b2;
  --line: rgba(194, 220, 247, 0.15);
  --line-strong: rgba(194, 220, 247, 0.28);
  --blue: #54baff;
  --purple: #8f73ff;
  --green: #38dc87;
  --amber: #ffd06e;
  --danger: #ff7896;
  --shadow: 0 28px 80px rgba(0, 0, 0, 0.42);
  --radius-xl: 30px;
  --radius-lg: 23px;
  --radius-md: 17px;
  --content-max: 1450px;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

* {
  box-sizing: border-box;
}

html {
  min-height: 100%;
  margin: 0;
  padding: 0;
  scroll-behavior: smooth;
  font-size: 17px;
  background: var(--bg-0);
}

body {
  min-height: 100vh;
  margin: 0;
  padding: 0;
  color: var(--text);
  background:
    radial-gradient(circle at 7% -8%, rgba(84, 186, 255, 0.28), transparent 31rem),
    radial-gradient(circle at 92% 2%, rgba(143, 115, 255, 0.24), transparent 35rem),
    radial-gradient(circle at 50% 115%, rgba(56, 220, 135, 0.11), transparent 34rem),
    linear-gradient(145deg, var(--bg-0) 0%, var(--bg-1) 47%, var(--bg-2) 100%);
  overflow: hidden;
}

body::before {
  content: "";
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.028) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.028) 1px, transparent 1px);
  background-size: 58px 58px;
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.86), transparent 82%);
}

#app {
  position: relative;
  z-index: 1;
  min-height: 100vh;
}

.n-layout,
.n-layout-sider {
  background: transparent !important;
}

.surface {
  border: 1px solid var(--line);
  background: var(--panel);
  box-shadow: var(--shadow);
  backdrop-filter: blur(22px);
}

a {
  color: inherit;
}

:focus-visible {
  outline: 3px solid rgba(84, 186, 255, 0.9);
  outline-offset: 3px;
}

::selection {
  color: #fff;
  background: rgba(84, 186, 255, 0.3);
}

* {
  scrollbar-width: thin;
  scrollbar-color: rgba(177, 195, 216, 0.32) transparent;
}

*::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

*::-webkit-scrollbar-thumb {
  border: 3px solid transparent;
  border-radius: 999px;
  background: rgba(177, 195, 216, 0.32);
  background-clip: padding-box;
}

*::-webkit-scrollbar-track {
  background: transparent;
}
</style>
