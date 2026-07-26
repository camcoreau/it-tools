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
    <div class="tool-layout">
      <div class="tool-header">
        <div class="tool-kicker">
          CAMCORE IT TOOLS
        </div>
        <div flex flex-nowrap items-center justify-between gap-4>
          <n-h1>
            {{ toolTitle }}
          </n-h1>

          <div>
            <FavoriteButton :tool="{ name: route.meta.name, path: route.path } as Tool" />
          </div>
        </div>

        <div class="separator" />

        <div class="description">
          {{ toolDescription }}
        </div>
      </div>
    </div>

    <div class="tool-content">
      <slot />
    </div>
  </BaseLayout>
</template>

<style lang="less" scoped>
.tool-content {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 16px;

  ::v-deep(& > *) {
    flex: 0 1 600px;
  }
}

.tool-layout {
  max-width: 600px;
  margin: 0 auto;
  box-sizing: border-box;

  .tool-header {
    padding: 40px 0 34px;
    width: 100%;

    .tool-kicker {
      margin-bottom: 8px;
      color: #38bdf8;
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.18em;
    }

    .n-h1 {
      opacity: 0.96;
      font-size: 40px;
      font-weight: 650;
      margin: 0;
      line-height: 1.05;
      letter-spacing: -0.025em;
    }

    .separator {
      width: 200px;
      height: 2px;
      margin: 12px 0;
      border-radius: 4px;
      background: linear-gradient(90deg, #38bdf8, #2563eb, transparent);
    }

    .description {
      margin: 0;
      opacity: 0.72;
      line-height: 1.6;
    }
  }
}
</style>
