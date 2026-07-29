<script lang="ts" setup>
import { useTheme } from './c-card.theme';

const props = defineProps<{
  title?: string
}>();

const { title } = toRefs(props);

const theme = useTheme();
</script>

<template>
  <div class="c-card">
    <div v-if="title" class="c-card-title">
      {{ title }}
    </div>
    <slot />
  </div>
</template>

<style lang="less" scoped>
.c-card {
  padding: 24px;
  border: 1px solid v-bind('theme.borderColor');
  border-radius: var(--radius-lg);
  color: var(--text);
  background-color: v-bind('theme.backgroundColor');
  box-shadow: 0 18px 48px rgba(0, 0, 0, 0.24);

  &-title {
    margin-bottom: 20px;
    color: var(--text);
    font-size: 16px;
    font-weight: 700;
  }
}
</style>
