<script lang="ts" setup>
import { useRoute, RouterLink } from 'vue-router';
import { useHead } from '@vueuse/head';
import type { HeadObject } from '@vueuse/head';

import BaseLayout from './base.layout.vue';
import FavoriteButton from '@/components/FavoriteButton.vue';
import type { Tool } from '@/tools/tools.types';
import { useToolStore } from '@/tools/tools.store';

const route = useRoute();
const toolStore = useToolStore();

const head = computed<HeadObject>(() => ({
  title: `${route.meta.name} | CamCore IT Tools`,
  meta: [
    {
      name: 'description',
      content: route.meta?.description as string,
    },
    {
      name: 'keywords',
      content: ((route.meta.keywords ?? []) as string[]).join(','),
    },
  ],
}));
useHead(head);

const { t } = useI18n();
const i18nKey = computed<string>(() => route.path.trim().replace('/', ''));
const toolTitle = computed<string>(() => t(`tools.${i18nKey.value}.title`, String(route.meta.name)));
const toolDescription = computed<string>(() => t(`tools.${i18nKey.value}.description`, String(route.meta.description)));
const currentTool = computed(() => toolStore.tools.find(tool => tool.path === route.path));
const toolCategory = computed<string>(() => currentTool.value?.category ?? String(route.meta.category || 'Browser utility'));
</script>

<template>
  <BaseLayout>
    <section class="tool-hero" aria-label="Utility overview">
      <div class="tool-hero-main surface">
        <div class="breadcrumb">
          <RouterLink to="/">IT Tools</RouterLink>
          <span aria-hidden="true">›</span>
          <span>{{ toolCategory }}</span>
        </div>
        <div class="eyebrow">CamCore browser utility</div>
        <h1>{{ toolTitle }}</h1>
        <p>{{ toolDescription }}</p>
        <div class="hero-actions">
          <RouterLink to="/" class="btn primary">Back to all utilities</RouterLink>
          <a href="https://inside.camcore.au" class="btn">Inside CamCore</a>
        </div>
      </div>

      <aside class="tool-hero-side surface" aria-label="Utility information">
        <div class="info-card">
          <small>Category</small>
          <strong>{{ toolCategory }}</strong>
          <p>Use the utility below, then review the output before using or sharing it.</p>
        </div>
        <div class="info-grid">
          <div><strong>Private</strong><span>LAN or NetBird</span></div>
          <div><strong>Local</strong><span>Browser processing</span></div>
        </div>
        <div class="favourite-card">
          <div>
            <small>Quick access</small>
            <strong>Save this utility</strong>
          </div>
          <FavoriteButton :tool="{ name: route.meta.name, path: route.path } as Tool" />
        </div>
      </aside>
    </section>

    <section class="tool-workspace" aria-label="Utility workspace">
      <div class="workspace-head">
        <div>
          <h2>Utility workspace</h2>
          <p>Enter the required information and use the available actions below.</p>
        </div>
        <RouterLink to="/">Browse other tools</RouterLink>
      </div>
      <div class="tool-content">
        <slot />
      </div>
    </section>
  </BaseLayout>
</template>

<style lang="less" scoped>
.tool-hero {
  display: grid;
  grid-template-columns: minmax(0, 1.3fr) minmax(340px, 0.7fr);
  gap: 18px;
  margin-top: 22px;
}

.tool-hero-main,
.tool-hero-side {
  overflow: hidden;
  border-radius: var(--radius-xl);
}

.tool-hero-main {
  position: relative;
  min-height: 330px;
  padding: 38px 42px;
}

.tool-hero-main::after {
  content: "";
  position: absolute;
  width: 450px;
  height: 450px;
  right: -190px;
  bottom: -285px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(84, 186, 255, 0.24), transparent 70%);
  pointer-events: none;
}

.breadcrumb,
.eyebrow,
h1,
.tool-hero-main > p,
.hero-actions {
  position: relative;
  z-index: 2;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  color: var(--subtle);
  font-size: 0.76rem;
}

.breadcrumb a {
  color: #bfe8ff;
  text-decoration: none;
}

.eyebrow {
  display: inline-flex;
  margin-bottom: 16px;
  padding: 8px 12px;
  border: 1px solid rgba(84, 186, 255, 0.29);
  border-radius: 999px;
  color: #dff4ff;
  background: rgba(84, 186, 255, 0.13);
  font-size: 0.72rem;
  font-weight: 820;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

h1 {
  margin: 0;
  font-size: clamp(2.35rem, 4.4vw, 4.25rem);
  line-height: 0.98;
  letter-spacing: -0.065em;
}

.tool-hero-main > p {
  max-width: 860px;
  margin: 17px 0 0;
  color: var(--muted);
  font-size: 1rem;
  line-height: 1.66;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 23px;
}

.btn {
  min-height: 43px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 15px;
  border: 1px solid var(--line-strong);
  border-radius: 999px;
  color: var(--text);
  background: rgba(255, 255, 255, 0.07);
  font-size: 0.82rem;
  font-weight: 800;
  text-decoration: none;
}

.btn.primary {
  border-color: rgba(84, 186, 255, 0.55);
  background: linear-gradient(135deg, rgba(84, 186, 255, 0.3), rgba(143, 115, 255, 0.23));
}

.tool-hero-side {
  display: grid;
  align-content: start;
  gap: 14px;
  padding: 22px;
}

.info-card {
  padding: 20px;
  border: 1px solid rgba(84, 186, 255, 0.3);
  border-radius: var(--radius-lg);
  background: linear-gradient(145deg, rgba(84, 186, 255, 0.11), rgba(143, 115, 255, 0.06));
}

.info-card small,
.favourite-card small {
  display: block;
  color: #9fc4df;
  font-size: 0.68rem;
  font-weight: 850;
  letter-spacing: 0.09em;
  text-transform: uppercase;
}

.info-card strong {
  display: block;
  margin-top: 10px;
  font-size: 1.25rem;
  letter-spacing: -0.04em;
}

.info-card p {
  margin: 8px 0 0;
  color: var(--muted);
  font-size: 0.9rem;
  line-height: 1.55;
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.info-grid > div {
  padding: 16px;
  border: 1px solid var(--line);
  border-radius: 20px;
  background: rgba(0, 0, 0, 0.2);
}

.info-grid strong,
.info-grid span {
  display: block;
}

.info-grid strong {
  font-size: 1.02rem;
}

.info-grid span {
  margin-top: 5px;
  color: var(--muted);
  font-size: 0.76rem;
}

.favourite-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  padding: 17px;
  border: 1px solid rgba(56, 220, 135, 0.28);
  border-radius: var(--radius-lg);
  background: rgba(56, 220, 135, 0.08);
}

.favourite-card strong {
  display: block;
  margin-top: 6px;
  font-size: 0.95rem;
}

.tool-workspace {
  margin-top: 34px;
}

.workspace-head {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 18px;
  margin-bottom: 16px;
}

.workspace-head h2 {
  margin: 0;
  font-size: 1.55rem;
  letter-spacing: -0.045em;
}

.workspace-head p {
  margin: 7px 0 0;
  color: var(--muted);
  font-size: 0.96rem;
}

.workspace-head a {
  color: #bfe8ff;
  font-size: 0.82rem;
  font-weight: 760;
  text-decoration: none;
}

.tool-content {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 16px;
  padding: 20px;
  border: 1px solid var(--line);
  border-radius: var(--radius-xl);
  background: var(--panel);
  box-shadow: var(--shadow);
  backdrop-filter: blur(22px);
  -webkit-backdrop-filter: blur(22px);

  ::v-deep(& > *) {
    width: min(100%, 1120px);
    min-width: 0;
    margin: 0 auto;
  }

  ::v-deep(.n-card) {
    border: 1px solid var(--line);
    border-radius: var(--radius-lg);
    background: rgba(12, 29, 48, 0.82);
    box-shadow: none;
  }

  ::v-deep(.n-card-header) {
    border-bottom: 1px solid rgba(194, 220, 247, 0.1);
  }

  ::v-deep(.n-input),
  ::v-deep(.n-input-number),
  ::v-deep(.n-select),
  ::v-deep(.n-date-picker) {
    border-radius: 14px;
  }

  ::v-deep(.n-button) {
    border-radius: 999px;
  }
}

@media (max-width: 900px) {
  .tool-hero {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 700px) {
  .tool-hero {
    margin-top: 14px;
  }

  .tool-hero-main {
    min-height: auto;
    padding: 28px 22px;
  }

  h1 {
    font-size: clamp(2.15rem, 12vw, 3.3rem);
  }

  .tool-hero-main > p {
    font-size: 0.92rem;
  }

  .workspace-head {
    align-items: flex-start;
    flex-direction: column;
  }

  .tool-content {
    padding: 14px;
    border-radius: 22px;
  }
}
</style>
