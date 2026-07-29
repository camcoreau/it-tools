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
  --panel: #0b1c2f;
  --panel-strong: #11283f;
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
  --shadow: 0 24px 65px rgba(0, 0, 0, 0.36);
  --radius-xl: 30px;
  --radius-lg: 22px;
  --radius-md: 16px;
  --content-max: 1480px;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

* {
  box-sizing: border-box;
  scrollbar-width: thin;
  scrollbar-color: rgba(177, 195, 216, 0.32) transparent;
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
  overflow-x: hidden;
  overflow-y: auto;
  color: var(--text);
  background:
    radial-gradient(circle at 7% -8%, rgba(84, 186, 255, 0.23), transparent 31rem),
    radial-gradient(circle at 92% 2%, rgba(143, 115, 255, 0.2), transparent 35rem),
    radial-gradient(circle at 50% 115%, rgba(56, 220, 135, 0.08), transparent 34rem),
    linear-gradient(145deg, var(--bg-0) 0%, var(--bg-1) 48%, var(--bg-2) 100%);
}

body::before {
  content: "";
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  opacity: 0.5;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.025) 1px, transparent 1px);
  background-size: 58px 58px;
}

#app {
  position: relative;
  z-index: 1;
  min-height: 100vh;
}

button,
input,
textarea,
select {
  font: inherit;
}

a {
  color: inherit;
}

.n-layout,
.n-layout-sider {
  background: transparent !important;
}

.surface {
  border: 1px solid var(--line);
  background: var(--panel);
  box-shadow: var(--shadow);
}

.topbar.surface {
  background: #081729;
}

:focus-visible {
  outline: 3px solid rgba(84, 186, 255, 0.92);
  outline-offset: 3px;
}

::selection {
  color: #fff;
  background: rgba(84, 186, 255, 0.3);
}

.brand-logo {
  width: auto !important;
  height: 54px !important;
  max-width: 215px !important;
}

.search-wrap input,
.search-wrap .n-input__input-el,
.drawer-search input,
.drawer-search .n-input__input-el {
  color: var(--text) !important;
  caret-color: var(--blue) !important;
}

.search-wrap input::placeholder,
.search-wrap .n-input__input-el::placeholder,
.drawer-search input::placeholder,
.drawer-search .n-input__input-el::placeholder {
  color: rgba(177, 195, 216, 0.84) !important;
  opacity: 1 !important;
}

.search-wrap .n-input,
.drawer-search .n-input,
.search-wrap .n-button,
.drawer-search .n-button {
  color: var(--text) !important;
  background: transparent !important;
  opacity: 1 !important;
}

.search-wrap .n-button__content,
.drawer-search .n-button__content,
.search-wrap .n-icon,
.drawer-search .n-icon,
.search-wrap kbd,
.drawer-search kbd {
  color: var(--muted) !important;
  opacity: 1 !important;
}

.home-page .hero {
  grid-template-columns: minmax(0, 1.18fr) minmax(360px, 0.82fr) !important;
}

.home-page .hero-main {
  min-height: 390px !important;
  padding: 36px !important;
}

.home-page .hero-main::after {
  display: none !important;
}

.home-page .hero h1 {
  max-width: 780px !important;
  font-size: clamp(2.65rem, 4.25vw, 4.2rem) !important;
  line-height: 1 !important;
  letter-spacing: -0.058em !important;
}

.home-page .hero-main > p {
  max-width: 760px !important;
  font-size: 1rem !important;
  line-height: 1.62 !important;
}

.home-page .utility-search-panel {
  margin-top: 22px !important;
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

@media (max-width: 980px) {
  .home-page .hero {
    grid-template-columns: 1fr !important;
  }
}

@media (max-width: 720px) {
  .brand-logo {
    height: 46px !important;
    max-width: 184px !important;
  }

  .home-page .hero-main {
    min-height: auto !important;
    padding: 27px 21px !important;
  }

  .home-page .hero h1 {
    font-size: clamp(2.35rem, 11vw, 3.35rem) !important;
  }
}
</style>
