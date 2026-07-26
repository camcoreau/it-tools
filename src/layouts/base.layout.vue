<script lang="ts" setup>
import { NIcon } from 'naive-ui';
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
      <RouterLink to="/" class="brand-panel" aria-label="CamCore IT Tools home">
        <div class="brand-glow" />
        <div class="brand-lockup">
          <CamCoreMark class="brand-mark" />
          <div class="brand-copy">
            <div class="brand-name">CamCore</div>
            <div class="brand-product">IT Tools</div>
            <div class="brand-subtitle">Private browser utilities</div>
          </div>
        </div>
        <div class="private-pill">
          <span class="status-dot" />
          LAN &amp; NetBird only
        </div>
      </RouterLink>

      <div class="sider-content">
        <div v-if="styleStore.isSmallScreen" class="mobile-actions">
          <command-palette />
          <locale-selector />
          <NavbarButtons />
        </div>

        <div class="menu-heading">
          <span>Browse utilities</span>
          <small>Choose a category or search</small>
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
          <div>© {{ new Date().getFullYear() }} CamCore</div>
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
      <header class="topbar surface">
        <div class="topbar-left">
          <c-button
            circle
            variant="text"
            aria-label="Toggle utility navigation"
            @click="styleStore.isMenuCollapsed = !styleStore.isMenuCollapsed"
          >
            <NIcon size="24" :component="Menu2" />
          </c-button>

          <c-tooltip tooltip="CamCore IT Tools home" position="bottom">
            <c-button to="/" circle variant="text" aria-label="CamCore IT Tools home">
              <NIcon size="23" :component="Home2" />
            </c-button>
          </c-tooltip>

          <div class="command-button">
            <command-palette />
          </div>
        </div>

        <div class="topbar-title">
          <strong>CamCore IT Tools</strong>
          <span>Secure utility workspace</span>
        </div>

        <div class="topbar-right">
          <div class="service-pill">
            <span class="status-dot" />
            Private service
          </div>

          <locale-selector v-if="!styleStore.isSmallScreen" />
          <NavbarButtons v-if="!styleStore.isSmallScreen" />

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
      </header>

      <main class="page-content">
        <slot />
      </main>
    </template>
  </MenuLayout>
</template>

<style lang="less" scoped>
.brand-panel {
  position: absolute;
  inset: 0 0 auto;
  z-index: 10;
  display: block;
  height: 174px;
  overflow: hidden;
  padding: 22px;
  color: var(--text);
  text-decoration: none;
  border-bottom: 1px solid var(--line);
  background:
    radial-gradient(circle at 8% -12%, rgba(84, 186, 255, 0.34), transparent 15rem),
    radial-gradient(circle at 105% 105%, rgba(143, 115, 255, 0.26), transparent 17rem),
    linear-gradient(145deg, rgba(8, 24, 43, 0.96), rgba(14, 34, 59, 0.96));
}

.brand-panel::before {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0.72;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px);
  background-size: 34px 34px;
  mask-image: linear-gradient(to bottom, #000, transparent 95%);
}

.brand-glow {
  position: absolute;
  width: 230px;
  height: 230px;
  right: -110px;
  bottom: -150px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(84, 186, 255, 0.22), transparent 70%);
}

.brand-lockup {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 15px;
}

.brand-mark {
  width: 62px;
  height: 62px;
  flex: 0 0 auto;
  filter: drop-shadow(0 14px 25px rgba(0, 0, 0, 0.42));
}

.brand-copy {
  min-width: 0;
}

.brand-name {
  color: #dff4ff;
  font-size: 0.72rem;
  font-weight: 850;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.brand-product {
  margin-top: 2px;
  font-size: 1.62rem;
  font-weight: 850;
  line-height: 1;
  letter-spacing: -0.045em;
}

.brand-subtitle {
  margin-top: 8px;
  color: var(--muted);
  font-size: 0.78rem;
}

.private-pill,
.service-pill {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  border: 1px solid rgba(56, 220, 135, 0.34);
  border-radius: 999px;
  color: #d4ffee;
  background: rgba(56, 220, 135, 0.1);
  white-space: nowrap;
}

.private-pill {
  position: relative;
  z-index: 2;
  margin-top: 18px;
  padding: 8px 11px;
  font-size: 0.74rem;
}

.service-pill {
  padding: 10px 13px;
  font-size: 0.8rem;
}

.status-dot {
  width: 9px;
  height: 9px;
  flex: 0 0 auto;
  border-radius: 50%;
  background: var(--green);
  box-shadow: 0 0 16px rgba(56, 220, 135, 0.9);
}

.sider-content {
  min-height: 100%;
  padding: 194px 12px 180px;
}

.mobile-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  margin: 2px 6px 18px;
  padding: 10px;
  border: 1px solid var(--line);
  border-radius: var(--radius-md);
  background: rgba(0, 0, 0, 0.2);
}

.menu-heading {
  padding: 0 12px 12px;
}

.menu-heading span {
  display: block;
  color: var(--text);
  font-size: 0.9rem;
  font-weight: 800;
}

.menu-heading small {
  display: block;
  margin-top: 4px;
  color: var(--subtle);
  font-size: 0.72rem;
}

.footer {
  position: absolute;
  right: 12px;
  bottom: 0;
  left: 12px;
  padding: 22px 12px 24px;
  color: var(--subtle);
  text-align: center;
  font-size: 0.68rem;
  line-height: 1.7;
  border-top: 1px solid var(--line);
  background: linear-gradient(to bottom, transparent, rgba(2, 6, 17, 0.32));
}

.footer-brand {
  color: var(--muted);
  font-weight: 700;
}

.upstream-credit {
  opacity: 0.76;
}

.topbar {
  position: sticky;
  top: 0;
  z-index: 20;
  display: grid;
  grid-template-columns: minmax(190px, 0.8fr) minmax(220px, 1fr) minmax(330px, 1.2fr);
  align-items: center;
  gap: 16px;
  min-height: 78px;
  padding: 13px 15px;
  border-radius: var(--radius-xl);
}

.topbar-left,
.topbar-right {
  display: flex;
  align-items: center;
  gap: 7px;
}

.topbar-right {
  justify-content: flex-end;
}

.topbar-title {
  min-width: 0;
  text-align: center;
}

.topbar-title strong {
  display: block;
  font-size: 0.98rem;
  letter-spacing: -0.025em;
}

.topbar-title span {
  display: block;
  margin-top: 4px;
  color: var(--subtle);
  font-size: 0.72rem;
}

.command-button {
  display: flex;
  align-items: center;
}

.portal-button {
  min-height: 42px;
  padding-inline: 16px !important;
  color: #fff !important;
  font-weight: 780;
  border: 1px solid rgba(84, 186, 255, 0.58) !important;
  background: linear-gradient(135deg, rgba(84, 186, 255, 0.3), rgba(143, 115, 255, 0.23)) !important;
  box-shadow: 0 14px 32px rgba(0, 0, 0, 0.22);
  transition: transform 0.18s ease, background 0.18s ease !important;

  &:hover {
    color: #fff !important;
    transform: translateY(-2px);
    background: linear-gradient(135deg, rgba(84, 186, 255, 0.42), rgba(143, 115, 255, 0.32)) !important;
  }
}

.page-content {
  width: min(var(--content-max), 100%);
  margin: 0 auto;
}

@media (max-width: 1120px) {
  .topbar {
    grid-template-columns: auto 1fr auto;
  }

  .service-pill,
  .topbar-title span {
    display: none;
  }
}

@media (max-width: 760px) {
  .topbar {
    min-height: 66px;
    grid-template-columns: 1fr auto;
    padding: 10px;
    border-radius: 22px;
  }

  .topbar-title {
    display: none;
  }

  .topbar-right {
    grid-column: 2;
  }

  .portal-button {
    min-height: 38px;
    padding-inline: 13px !important;
    font-size: 0.78rem;
  }
}
</style>
