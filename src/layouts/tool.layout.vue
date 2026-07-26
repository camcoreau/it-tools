<script lang="ts" setup>
import { useRoute } from 'vue-router';
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
</script>

<template>
  <BaseLayout>
    <section class="tool-hero surface">
      <div class="tool-hero-glow" />
      <div class="tool-heading">
        <div class="eyebrow">CamCore IT Tools</div>
        <div class="title-row">
          <div>
            <h1>{{ toolTitle }}</h1>
            <p>{{ toolDescription }}</p>
          </div>

          <div class="favorite-wrap">
            <FavoriteButton :tool="{ name: route.meta.name, path: route.path } as Tool" />
          </div>
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
  width: 420px;
  height: 420px;
  right: -190px;
  bottom: -285px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(84, 186, 255, 0.22), transparent 70%);
  pointer-events: none;
}

.tool-heading {
  position: relative;
  z-index: 2;
}

.eyebrow {
  display: inline-flex;
  align-items: center;
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

.title-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
}

h1 {
  margin: 0;
  font-size: clamp(2.35rem, 4.5vw, 4.45rem);
  font-weight: 850;
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
  min-width: 48px;
  min-height: 48px;
  border: 1px solid var(--line);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.055);
}

.tool-content {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 18px;
  padding-bottom: 8px;

  ::v-deep(& > *) {
    flex: 0 1 700px;
  }

  ::v-deep(.n-card) {
    border: 1px solid var(--line);
    border-radius: var(--radius-lg);
    background: var(--panel);
    box-shadow: 0 20px 56px rgba(0, 0, 0, 0.24);
    backdrop-filter: blur(18px);
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
}
</style>
