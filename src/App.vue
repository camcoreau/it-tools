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
  --panel: rgba(12, 28, 47, 0.96);
  --panel-strong: rgba(18, 39, 63, 0.98);
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
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
}

/* Edge can produce large opaque clipping blocks when several blurred surfaces
   are nested inside Naive UI scroll containers. Keep the glass appearance with
   opaque layered gradients instead of GPU backdrop filters. */
.workspace-sider,
.topbar,
.hero-main,
.hero-side {
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
}

.workspace-sider {
  background: rgba(7, 20, 36, 0.98) !important;
}

.topbar {
  grid-template-columns: minmax(180px, 1fr) auto minmax(260px, 1fr) !important;
  background: rgba(7, 20, 36, 0.98) !important;
}

.topbar-right > :not(.service-pill):not(.portal-button) {
  display: none !important;
}

.workspace-sider .sider-content {
  display: flex;
  min-height: 100%;
  flex-direction: column;
  padding-bottom: 24px !important;
}

.workspace-sider .footer {
  position: static !important;
  right: auto !important;
  bottom: auto !important;
  left: auto !important;
  flex: 0 0 auto;
  margin: 24px 12px 0;
  padding: 18px 8px 4px !important;
  background: transparent !important;
}

.hero-main {
  min-width: 0;
  background:
    radial-gradient(circle at 92% 95%, rgba(84, 186, 255, 0.2), transparent 28rem),
    linear-gradient(145deg, rgba(12, 28, 47, 0.99), rgba(8, 22, 39, 0.99)) !important;
}

.hero-side {
  min-width: 0;
  background: linear-gradient(145deg, rgba(12, 28, 47, 0.99), rgba(9, 23, 40, 0.99)) !important;
}

.hero-main h1 {
  max-width: 100% !important;
  font-size: clamp(2.65rem, 4vw, 4.8rem) !important;
  line-height: 0.98 !important;
  letter-spacing: -0.062em !important;
  overflow-wrap: anywhere;
}

.hero-main > p {
  max-width: 760px !important;
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

@media (max-width: 1650px) {
  .hero-grid {
    grid-template-columns: minmax(0, 1fr) !important;
  }

  .hero-main {
    min-height: 330px !important;
  }

  .hero-main h1 br {
    display: none;
  }

  .hero-side {
    grid-template-columns: minmax(260px, 1.15fr) minmax(260px, 0.9fr) minmax(280px, 1fr) !important;
  }
}

@media (max-width: 1150px) {
  .topbar {
    grid-template-columns: auto 1fr auto !important;
  }

  .topbar-title span,
  .service-pill {
    display: none !important;
  }

  .hero-side {
    grid-template-columns: 1fr !important;
  }
}

@media (max-width: 760px) {
  .topbar {
    min-height: 66px;
    grid-template-columns: 1fr auto !important;
    padding: 10px;
    border-radius: 22px;
  }

  .topbar-title {
    display: none;
  }

  .hero-main {
    min-height: auto !important;
  }
}
</style>