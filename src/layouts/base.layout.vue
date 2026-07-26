<script lang="ts" setup>
import { NIcon } from 'naive-ui';
import { RouterLink } from 'vue-router';
import { Home2, Menu2, X } from '@vicons/tabler';
import { storeToRefs } from 'pinia';
import CamCoreLogo from '../assets/camcore-logo.svg?component';
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
  <MenuLayout>
    <template #sider>
      <div class="drawer-shell">
        <header class="drawer-header">
          <RouterLink to="/" class="drawer-brand" aria-label="CamCore IT Tools home" @click="styleStore.isMenuCollapsed = true">
            <CamCoreMark class="drawer-mark" />
            <div>
              <strong>CamCore IT Tools</strong>
              <span>Browse utilities</span>
            </div>
          </RouterLink>

          <c-button circle variant="text" aria-label="Close utility navigation" @click="styleStore.isMenuCollapsed = true">
            <NIcon size="23" :component="X" />
          </c-button>
        </header>

        <div class="drawer-search">
          <command-palette />
        </div>

        <div class="menu-heading">
          <span>Utility categories</span>
          <small>Choose a category or search for a tool</small>
        </div>

        <div class="drawer-menu">
          <CollapsibleToolMenu :tools-by-category="tools" />
        </div>

        <footer class="drawer-footer">
          <div>
            CamCore IT Tools
            <c-link target="_blank" rel="noopener" href="https://github.com/camcoreau/it-tools">
              v{{ version }}
            </c-link>
            <template v-if="commitSha && commitSha.length > 0">
              ·
              <c-link target="_blank" rel="noopener" :href="`https://github.com/camcoreau/it-tools/commit/${commitSha}`">
                {{ commitSha }}
              </c-link>
            </template>
          </div>
          <div>© {{ new Date().getFullYear() }} CamCore</div>
          <div class="upstream-credit">
            Based on <c-link target="_blank" rel="noopener" href="https://github.com/CorentinTh/it-tools">IT Tools</c-link> · GPLv3
          </div>
        </footer>
      </div>
    </template>

    <template #content>
      <header class="topbar surface" aria-label="CamCore IT Tools header">
        <RouterLink to="/" class="brand" aria-label="CamCore IT Tools home">
          <CamCoreLogo class="brand-logo" />
          <div class="brand-text">
            <h1>IT Tools</h1>
            <p>Private browser utilities</p>
          </div>
        </RouterLink>

        <div class="search-wrap" aria-label="Search CamCore IT Tools">
          <command-palette />
        </div>

        <div class="top-actions">
          <span class="private-pill"><span class="status-dot" />LAN or NetBird only</span>

          <c-button
            round
            href="https://inside.camcore.au"
            rel="noopener"
            class="portal-button"
            :bordered="false"
            aria-label="Open Inside CamCore"
          >
            Inside CamCore
            <NIcon :component="Home2" ml-2 />
          </c-button>

          <c-button
            round
            class="browse-button"
            :bordered="false"
            aria-label="Browse utilities"
            @click="styleStore.isMenuCollapsed = false"
          >
            <NIcon size="20" :component="Menu2" mr-2 />
            Browse
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
.drawer-shell {
  display: flex;
  min-height: 100%;
  flex-direction: column;
  padding: 18px 12px 18px;
}

.drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 6px 8px 16px;
  border-bottom: 1px solid var(--line);
}

.drawer-brand {
  display: flex;
  min-width: 0;
  align-items: center;
  gap: 12px;
  color: var(--text);
  text-decoration: none;
}

.drawer-mark {
  width: 48px;
  height: 48px;
  flex: 0 0 auto;
}

.drawer-brand strong,
.drawer-brand span {
  display: block;
}

.drawer-brand strong {
  font-size: 0.96rem;
  letter-spacing: -0.03em;
}

.drawer-brand span {
  margin-top: 4px;
  color: var(--subtle);
  font-size: 0.73rem;
}

.drawer-search {
  margin: 16px 7px 10px;
  padding: 11px 13px;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.24);
}

.menu-heading {
  padding: 12px 12px 8px;
}

.menu-heading span,
.menu-heading small {
  display: block;
}

.menu-heading span {
  color: var(--text);
  font-size: 0.88rem;
  font-weight: 800;
}

.menu-heading small {
  margin-top: 4px;
  color: var(--subtle);
  font-size: 0.7rem;
}

.drawer-menu {
  flex: 1 1 auto;
}

.drawer-footer {
  flex: 0 0 auto;
  margin: 24px 10px 0;
  padding: 18px 4px 2px;
  border-top: 1px solid var(--line);
  color: var(--subtle);
  text-align: center;
  font-size: 0.67rem;
  line-height: 1.7;
}

.upstream-credit {
  opacity: 0.75;
}

.topbar {
  position: sticky;
  top: 14px;
  z-index: 20;
  display: grid;
  grid-template-columns: minmax(310px, 0.82fr) minmax(360px, 1.3fr) auto;
  align-items: center;
  gap: 18px;
  min-height: 86px;
  padding: 15px 16px;
  border-radius: var(--radius-xl);
  background: rgba(7, 20, 36, 0.98);
}

.brand {
  display: flex;
  min-width: 0;
  align-items: center;
  gap: 14px;
  color: inherit;
  text-decoration: none;
}

.brand-logo {
  display: block;
  width: auto;
  height: 56px;
  max-width: 215px;
  flex: 0 0 auto;
}

.brand-text {
  min-width: 0;
  padding-left: 14px;
  border-left: 1px solid var(--line);
}

.brand-text h1 {
  margin: 0;
  font-size: 1.08rem;
  line-height: 1.1;
  letter-spacing: -0.035em;
}

.brand-text p {
  margin: 6px 0 0;
  color: var(--muted);
  font-size: 0.78rem;
  white-space: nowrap;
}

.search-wrap {
  min-width: 0;
  padding: 11px 16px;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.27);
}

.top-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  white-space: nowrap;
}

.private-pill {
  display: inline-flex;
  min-height: 43px;
  align-items: center;
  gap: 9px;
  padding: 10px 14px;
  border: 1px solid rgba(56, 220, 135, 0.36);
  border-radius: 999px;
  color: #d4ffee;
  background: rgba(56, 220, 135, 0.11);
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

.portal-button,
.browse-button {
  min-height: 43px;
  padding-inline: 16px !important;
  color: #fff !important;
  font-weight: 780;
  transition: transform 0.18s ease, background 0.18s ease !important;
}

.portal-button {
  border: 1px solid rgba(84, 186, 255, 0.58) !important;
  background: linear-gradient(135deg, rgba(84, 186, 255, 0.3), rgba(143, 115, 255, 0.23)) !important;
}

.browse-button {
  border: 1px solid var(--line-strong) !important;
  background: rgba(255, 255, 255, 0.07) !important;
}

.portal-button:hover,
.browse-button:hover {
  color: #fff !important;
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.14) !important;
}

.page-content {
  width: min(var(--content-max), 100%);
  margin: 0 auto;
}

@media (max-width: 1250px) {
  .topbar {
    grid-template-columns: minmax(280px, 1fr) minmax(300px, 1fr) auto;
  }

  .private-pill {
    display: none;
  }
}

@media (max-width: 980px) {
  .topbar {
    grid-template-columns: 1fr auto;
  }

  .search-wrap {
    grid-column: 1 / -1;
    grid-row: 2;
  }

  .top-actions {
    grid-column: 2;
    grid-row: 1;
  }
}

@media (max-width: 720px) {
  .topbar {
    position: relative;
    top: 0;
    grid-template-columns: 1fr auto;
    gap: 12px;
    min-height: auto;
    padding: 13px;
    border-radius: 24px;
  }

  .brand-logo {
    height: 48px;
    max-width: 180px;
  }

  .brand-text,
  .portal-button {
    display: none !important;
  }

  .browse-button {
    min-height: 40px;
    padding-inline: 13px !important;
    font-size: 0.78rem;
  }
}

@media (max-width: 460px) {
  .brand-logo {
    height: 43px;
    max-width: 155px;
  }
}
</style>
