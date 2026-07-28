<script lang="ts" setup>
import { NIcon } from 'naive-ui';
import { RouterLink } from 'vue-router';
import { Home2, Menu2, X } from '@vicons/tabler';
import { storeToRefs } from 'pinia';
import CamCoreLogo from '../assets/camcore-logo.svg?component';
import CamCoreMark from '../assets/camcore-mark.svg?component';
import MenuLayout from '../components/MenuLayout.vue';
import { useStyleStore } from '@/stores/style.store';
import { config } from '@/config';
import type { ToolCategory } from '@/tools/tools.types';
import { useToolStore } from '@/tools/tools.store';
import CollapsibleToolMenu from '@/components/CollapsibleToolMenu.vue';

const styleStore = useStyleStore();
const version = config.app.version;
const commitSha = config.app.lastCommitSha.slice(0, 7);
const release = '2026.07.28';

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
              <span>Private utility directory</span>
            </div>
          </RouterLink>

          <c-button circle variant="text" aria-label="Close utility navigation" @click="styleStore.isMenuCollapsed = true">
            <NIcon size="23" :component="X" />
          </c-button>
        </header>

        <div v-if="styleStore.isSmallScreen" class="drawer-search">
          <command-palette />
        </div>

        <div class="menu-heading">
          <span>Browse utilities</span>
          <small>Choose a category or search by name</small>
        </div>

        <div class="drawer-menu">
          <CollapsibleToolMenu :tools-by-category="tools" />
        </div>

        <footer class="drawer-footer">
          <div class="drawer-footer-title">CamCore IT Tools</div>
          <div>
            <c-link target="_blank" rel="noopener" href="https://github.com/camcoreau/it-tools">v{{ version }}</c-link>
            <template v-if="commitSha && commitSha.length > 0">
              · <c-link target="_blank" rel="noopener" :href="`https://github.com/camcoreau/it-tools/commit/${commitSha}`">{{ commitSha }}</c-link>
            </template>
          </div>
          <div>Based on <c-link target="_blank" rel="noopener" href="https://github.com/CorentinTh/it-tools">IT Tools</c-link> · GPLv3</div>
        </footer>
      </div>
    </template>

    <template #content>
      <div class="site-shell">
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

        <footer class="site-footer">
          <div>
            <strong>CamCore IT Tools</strong>
            <span>Private browser-based utilities for trusted CamCore devices.</span>
          </div>
          <nav aria-label="IT Tools footer links">
            <a href="https://start.inside.camcore.au">Start</a>
            <a href="https://inside.camcore.au">Inside CamCore</a>
            <a href="https://software.inside.camcore.au">Software Centre</a>
            <a href="https://status.camcore.au">Status</a>
          </nav>
          <span class="release-badge">Web release {{ release }}</span>
        </footer>
      </div>
    </template>
  </MenuLayout>
</template>

<style lang="less" scoped>
.drawer-shell {
  display: flex;
  min-height: 100%;
  flex-direction: column;
  padding: 18px 12px;
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
  font-size: 0.98rem;
  letter-spacing: -0.03em;
}

.drawer-brand span {
  margin-top: 4px;
  color: var(--subtle);
  font-size: 0.72rem;
}

.drawer-search {
  margin: 16px 7px 10px;
  padding: 11px 13px;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.28);
}

.menu-heading {
  padding: 15px 12px 9px;
}

.menu-heading span,
.menu-heading small {
  display: block;
}

.menu-heading span {
  color: var(--text);
  font-size: 0.88rem;
  font-weight: 850;
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
  line-height: 1.75;
}

.drawer-footer-title {
  color: var(--muted);
  font-weight: 800;
}

.site-shell {
  width: min(var(--content-max), 100%);
  margin: 0 auto;
  padding-top: 18px;
}

.topbar {
  position: sticky;
  top: 14px;
  z-index: 20;
  display: grid;
  grid-template-columns: minmax(295px, 0.82fr) minmax(360px, 1.3fr) auto;
  align-items: center;
  gap: 18px;
  min-height: 88px;
  padding: 15px 16px;
  border-radius: var(--radius-xl);
  background: rgba(7, 20, 36, 0.96);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
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
  width: 184px;
  height: 58px;
  flex: 0 0 auto;
  filter: drop-shadow(0 10px 22px rgba(0, 0, 0, 0.18));
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
  background: rgba(0, 0, 0, 0.29);
  transition: border-color 0.18s ease, background 0.18s ease;
}

.search-wrap:focus-within {
  border-color: rgba(84, 186, 255, 0.58);
  background: rgba(0, 0, 0, 0.4);
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
  min-width: 0;
}

.site-footer {
  display: grid;
  grid-template-columns: minmax(260px, 1fr) auto auto;
  align-items: center;
  gap: 18px;
  margin-top: 38px;
  padding: 22px 5px 6px;
  border-top: 1px solid var(--line);
  color: var(--subtle);
  font-size: 0.76rem;
}

.site-footer strong,
.site-footer span {
  display: block;
}

.site-footer strong {
  color: var(--muted);
  font-size: 0.82rem;
}

.site-footer > div > span {
  margin-top: 4px;
}

.site-footer nav {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 12px;
}

.site-footer a {
  color: #bcd8ef;
  text-decoration: none;
}

.site-footer a:hover {
  color: #fff;
}

.release-badge {
  padding: 7px 10px;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.045);
  white-space: nowrap;
}

@media (max-width: 1250px) {
  .topbar {
    grid-template-columns: minmax(265px, 1fr) minmax(300px, 1fr) auto;
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

  .site-footer {
    grid-template-columns: 1fr;
  }

  .site-footer nav {
    justify-content: flex-start;
  }

  .release-badge {
    width: max-content;
  }
}

@media (max-width: 720px) {
  .site-shell {
    padding-top: 10px;
  }

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
    width: 154px;
    height: 51px;
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

  .site-footer {
    margin-top: 28px;
    padding-inline: 4px;
  }
}

@media (max-width: 460px) {
  .brand-logo {
    width: 138px;
    height: 46px;
  }
}
</style>
