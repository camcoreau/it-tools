<script lang="ts" setup>
import { NIcon, useThemeVars } from 'naive-ui';
import { RouterLink } from 'vue-router';
import { Home2, Menu2 } from '@vicons/tabler';
import { storeToRefs } from 'pinia';
import CamCoreMark from '../assets/camcore-mark.svg?component';
import MenuLayout from '../components/MenuLayout.vue';
import NavbarButtons from '../components/NavbarButtons.vue';
import { useStyleStore } from '@/stores/style.store';
import { config } from '@/config';
import type { ToolCategory } from '@/tools/tools.types';
import { useToolStore } from '@/tools/tools.store';
import CollapsibleToolMenu from '@/components/CollapsibleToolMenu.vue';

const themeVars = useThemeVars();
const styleStore = useStyleStore();
const version = config.app.version;
const commitSha = config.app.lastCommitSha.slice(0, 7);

const { t } = useI18n();

const toolStore = useToolStore();
const { favoriteTools, toolsByCategory } = storeToRefs(toolStore);

const tools = computed<ToolCategory[]>(() => [
  ...(favoriteTools.value.length > 0 ? [{ name: t('tools.categories.favorite-tools'), components: favoriteTools.value }] : []),
  ...toolsByCategory.value,
]);
</script>

<template>
  <MenuLayout class="menu-layout" :class="{ isSmallScreen: styleStore.isSmallScreen }">
    <template #sider>
      <RouterLink to="/" class="hero-wrapper" aria-label="CamCore IT Tools home">
        <div class="brand-grid" />
        <div class="brand-lockup">
          <CamCoreMark class="brand-mark" />
          <div class="brand-copy">
            <div class="eyebrow">
              CAMCORE
            </div>
            <div class="title">
              IT TOOLS
            </div>
            <div class="divider" />
            <div class="subtitle">
              Secure browser utilities
            </div>
          </div>
        </div>
      </RouterLink>

      <div class="sider-content">
        <div v-if="styleStore.isSmallScreen" flex flex-col items-center>
          <locale-selector w="90%" />

          <div flex justify-center>
            <NavbarButtons />
          </div>
        </div>

        <CollapsibleToolMenu :tools-by-category="tools" />

        <div class="footer">
          <div class="footer-brand">
            CamCore IT Tools
            <c-link target="_blank" rel="noopener" href="https://github.com/camcoreau/it-tools">
              v{{ version }}
            </c-link>

            <template v-if="commitSha && commitSha.length > 0">
              ·
              <c-link
                target="_blank"
                rel="noopener"
                type="primary"
                :href="`https://github.com/camcoreau/it-tools/commit/${commitSha}`"
              >
                {{ commitSha }}
              </c-link>
            </template>
          </div>
          <div>
            © {{ new Date().getFullYear() }}
            <c-link target="_blank" rel="noopener" href="https://camcore.au">
              CamCore
            </c-link>
          </div>
          <div class="upstream-credit">
            Based on
            <c-link target="_blank" rel="noopener" href="https://github.com/CorentinTh/it-tools">
              IT Tools
            </c-link>
            · GPLv3
          </div>
        </div>
      </div>
    </template>

    <template #content>
      <div class="top-actions" flex items-center justify-center gap-2>
        <c-button
          circle
          variant="text"
          :aria-label="$t('home.toggleMenu')"
          @click="styleStore.isMenuCollapsed = !styleStore.isMenuCollapsed"
        >
          <NIcon size="25" :component="Menu2" />
        </c-button>

        <c-tooltip :tooltip="$t('home.home')" position="bottom">
          <c-button to="/" circle variant="text" :aria-label="$t('home.home')">
            <NIcon size="25" :component="Home2" />
          </c-button>
        </c-tooltip>

        <c-tooltip :tooltip="$t('home.uiLib')" position="bottom">
          <c-button v-if="config.app.env === 'development'" to="/c-lib" circle variant="text" :aria-label="$t('home.uiLib')">
            <icon-mdi:brush-variant text-20px />
          </c-button>
        </c-tooltip>

        <command-palette />

        <locale-selector v-if="!styleStore.isSmallScreen" />

        <div>
          <NavbarButtons v-if="!styleStore.isSmallScreen" />
        </div>

        <c-button
          round
          href="https://inside.camcore.au"
          rel="noopener"
          class="portal-button"
          :bordered="false"
          aria-label="Open Inside CamCore"
        >
          Inside CamCore
          <NIcon v-if="!styleStore.isSmallScreen" :component="Home2" ml-2 />
        </c-button>
      </div>
      <slot />
    </template>
  </MenuLayout>
</template>

<style lang="less" scoped>
.portal-button {
  background: linear-gradient(115deg, #1d4ed8 0%, #2563eb 48%, #0891b2 100%);
  color: #fff !important;
  box-shadow: 0 10px 28px rgba(37, 99, 235, 0.24);
  transition: transform ease 0.2s, box-shadow ease 0.2s !important;

  &:hover {
    color: #fff;
    transform: translateY(-1px);
    box-shadow: 0 14px 34px rgba(37, 99, 235, 0.34);
  }
}

.top-actions {
  min-height: 54px;
}

.footer {
  text-align: center;
  color: #7f91a8;
  margin-top: 20px;
  padding: 24px 10px;
  font-size: 12px;
  line-height: 1.7;
}

.footer-brand {
  color: #a9bad0;
  font-weight: 600;
}

.upstream-credit {
  opacity: 0.72;
}

.sider-content {
  padding-top: 188px;
  padding-bottom: 180px;
}

.hero-wrapper {
  position: absolute;
  display: block;
  left: 0;
  top: 0;
  width: 100%;
  height: 166px;
  z-index: 10;
  overflow: hidden;
  color: #fff;
  text-decoration: none;
  background:
    radial-gradient(circle at 20% 10%, rgba(56, 189, 248, 0.26), transparent 38%),
    radial-gradient(circle at 90% 90%, rgba(37, 99, 235, 0.32), transparent 42%),
    linear-gradient(145deg, #07111f 0%, #0b1b33 55%, #102a4c 100%);
  border-bottom: 1px solid rgba(147, 197, 253, 0.18);

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(115deg, transparent 0 45%, rgba(255, 255, 255, 0.055) 50%, transparent 55% 100%);
    transform: translateX(-65%);
    transition: transform 0.55s ease;
  }

  &:hover::after {
    transform: translateX(65%);
  }
}

.brand-grid {
  position: absolute;
  inset: 0;
  opacity: 0.55;
  background-image:
    linear-gradient(rgba(147, 197, 253, 0.07) 1px, transparent 1px),
    linear-gradient(90deg, rgba(147, 197, 253, 0.07) 1px, transparent 1px);
  background-size: 24px 24px;
  mask-image: linear-gradient(to bottom, #000, transparent 96%);
}

.brand-lockup {
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  padding: 20px 16px;
}

.brand-mark {
  width: 64px;
  height: 64px;
  flex: 0 0 auto;
  filter: drop-shadow(0 12px 20px rgba(2, 8, 23, 0.45));
}

.brand-copy {
  min-width: 0;
}

.eyebrow {
  color: #93c5fd;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.22em;
}

.title {
  font-size: 27px;
  line-height: 1.05;
  font-weight: 750;
  letter-spacing: 0.035em;
}

.divider {
  width: 58px;
  height: 2px;
  border-radius: 4px;
  background: linear-gradient(90deg, v-bind('themeVars.primaryColor'), #2563eb);
  margin: 8px 0 7px;
}

.subtitle {
  color: #c7d8ee;
  font-size: 13px;
}

@media (max-width: 420px) {
  .brand-mark {
    width: 54px;
    height: 54px;
  }

  .title {
    font-size: 23px;
  }
}
</style>
