<script lang="ts" setup>
import { useRoute, RouterLink } from 'vue-router';
import { useHead } from '@vueuse/head';
import type { HeadObject } from '@vueuse/head';

import BaseLayout from './base.layout.vue';
import FavoriteButton from '@/components/FavoriteButton.vue';
import type { Tool } from '@/tools/tools.types';

const route = useRoute();

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
const toolCategory = computed<string>(() => String(route.meta.category || 'Browser utility'));
</script>

<template>
  <BaseLayout>
    <section class="tool-hero surface">
      <div class="tool-hero-glow" />
      <div class="tool-heading">
        <div class="breadcrumb">
          <RouterLink to="/">IT Tools</RouterLink>
          <span aria-hidden="true">›</span>
          <span>{{ toolCategory }}</span>
        </div>

        <div class="title-row">
          <div>
            <div class="eyebrow">CamCore browser utility</div>
            <h1>{{ toolTitle }}</h1>
            <p>{{ toolDescription }}</p>
          </div>

          <div class="favorite-wrap" aria-label="Favourite this utility">
            <FavoriteButton :tool="{ name: route.meta.name, path: route.path } as Tool" />
          </div>
        </div>

        <div class="tool-trust">
          <span><i />Private CamCore access</span>
          <span><i />Runs in your browser</span>
          <RouterLink to="/">Back to utility directory →</RouterLink>
        </div>
      </div>
    </section>

    <section class="tool-content">
      <slot />
    </section>
  </BaseLayout>
</template>

<style lang="less" scoped>
.tool-hero {
  position: relative;
  overflow: hidden;
  margin-top: 22px;
  padding: 34px 38px;
  border-radius: var(--radius-xl);
}

.tool-hero-glow {
  position: absolute;
  width: 470px;
  height: 470px;
  right: -200px;
  bottom: -315px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(84, 186, 255, 0.24), transparent 70%);
  pointer-events: none;
}

.tool-heading {
  position: relative;
  z-index: 2;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  color: var(--subtle);
  font-size: 0.72rem;
}

.breadcrumb a {
  color: #bfe8ff;
  text-decoration: none;
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  margin-bottom: 15px;
  padding: 8px 12px;
  border: 1px solid rgba(84, 186, 255, 0.29);
  border-radius: 999px;
  color: #dff4ff;
  background: rgba(84, 186, 255, 0.13);
  font-size: 0.7rem;
  font-weight: 820;
  letter-spacing: 0.065em;
  text-transform: uppercase;
}

.title-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
}

h1 {
  margin: 0;
  font-size: clamp(2.35rem, 4.5vw, 4.45rem);
  font-weight: 860;
  line-height: 0.98;
  letter-spacing: -0.065em;
}

p {
  max-width: 900px;
  margin: 17px 0 0;
  color: var(--muted);
  font-size: 1rem;
  line-height: 1.66;
}

.favorite-wrap {
  display: grid;
  place-items: center;
  min-width: 50px;
  min-height: 50px;
  border: 1px solid var(--line);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.055);
}

.tool-trust {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px 18px;
  margin-top: 24px;
  padding-top: 17px;
  border-top: 1px solid var(--line);
  color: var(--muted);
  font-size: 0.73rem;
}

.tool-trust span {
  display: inline-flex;
  align-items: center;
  gap: 7px;
}

.tool-trust i {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--green);
  box-shadow: 0 0 11px rgba(56, 220, 135, 0.75);
}

.tool-trust a {
  margin-left: auto;
  color: #bfe8ff;
  text-decoration: none;
  font-weight: 760;
}

.tool-content {
  display: grid;
  grid-template-columns: minmax(0, 980px);
  justify-content: center;
  gap: 16px;
  margin-top: 18px;
  padding-bottom: 8px;

  ::v-deep(& > *) {
    width: 100%;
    min-width: 0;
  }

  ::v-deep(.n-card) {
    border: 1px solid var(--line);
    border-radius: var(--radius-lg);
    background: rgba(12, 29, 48, 0.94);
    box-shadow: 0 20px 56px rgba(0, 0, 0, 0.24);
  }

  ::v-deep(.n-card-header) {
    border-bottom: 1px solid rgba(194, 220, 247, 0.1);
  }

  ::v-deep(.n-input),
  ::v-deep(.n-input-number),
  ::v-deep(.n-select) {
    border-radius: 14px;
  }
}

@media (max-width: 700px) {
  .tool-hero {
    margin-top: 14px;
    padding: 27px 21px;
    border-radius: 22px;
  }

  .title-row {
    gap: 14px;
  }

  h1 {
    font-size: clamp(2.15rem, 12vw, 3.3rem);
  }

  p {
    font-size: 0.92rem;
  }

  .tool-trust a {
    width: 100%;
    margin-left: 0;
  }
}
</style>
