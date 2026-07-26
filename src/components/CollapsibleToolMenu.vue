<script setup lang="ts">
import { useStorage } from '@vueuse/core';
import { RouterLink, useRoute } from 'vue-router';
import MenuIconItem from './MenuIconItem.vue';
import type { Tool, ToolCategory } from '@/tools/tools.types';

const props = withDefaults(defineProps<{ toolsByCategory?: ToolCategory[] }>(), { toolsByCategory: () => [] });
const { toolsByCategory } = toRefs(props);
const route = useRoute();

const makeLabel = (tool: Tool) => () => h(RouterLink, { to: tool.path }, { default: () => tool.name });
const makeIcon = (tool: Tool) => () => h(MenuIconItem, { tool });

const collapsedCategories = useStorage<Record<string, boolean>>(
  'menu-tool-option:collapsed-categories',
  {},
  undefined,
  {
    deep: true,
    serializer: {
      read: v => (v ? JSON.parse(v) : null),
      write: v => JSON.stringify(v),
    },
  },
);

function toggleCategoryCollapse({ name }: { name: string }) {
  collapsedCategories.value[name] = !collapsedCategories.value[name];
}

const menuOptions = computed(() =>
  toolsByCategory.value.map(({ name, components }) => ({
    name,
    isCollapsed: collapsedCategories.value[name],
    tools: components.map(tool => ({
      label: makeLabel(tool),
      icon: makeIcon(tool),
      key: tool.path,
    })),
  })),
);
</script>

<template>
  <div v-for="{ name, tools, isCollapsed } of menuOptions" :key="name" class="category-block">
    <button class="category-heading" type="button" @click="toggleCategoryCollapse({ name })">
      <span :class="{ 'rotate-0': isCollapsed, 'rotate-90': !isCollapsed }" class="chevron">
        <icon-mdi-chevron-right />
      </span>
      <span>{{ name }}</span>
      <small>{{ tools.length }}</small>
    </button>

    <n-collapse-transition :show="!isCollapsed">
      <div class="menu-wrapper">
        <div class="toggle-bar" @click="toggleCategoryCollapse({ name })" />

        <n-menu
          class="menu"
          :value="route.path"
          :collapsed-width="64"
          :collapsed-icon-size="22"
          :options="tools"
          :indent="10"
          :default-expand-all="true"
        />
      </div>
    </n-collapse-transition>
  </div>
</template>

<style scoped lang="less">
.category-block + .category-block {
  margin-top: 4px;
}

.category-heading {
  width: 100%;
  display: grid;
  grid-template-columns: 20px minmax(0, 1fr) auto;
  align-items: center;
  gap: 8px;
  min-height: 38px;
  margin: 0;
  padding: 6px 11px;
  border: 0;
  border-radius: 13px;
  color: var(--muted);
  background: transparent;
  cursor: pointer;
  text-align: left;
  font: inherit;
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.035em;
  transition: color 0.18s ease, background 0.18s ease;

  &:hover {
    color: var(--text);
    background: var(--panel-soft);
  }

  small {
    min-width: 24px;
    padding: 3px 7px;
    border: 1px solid var(--line);
    border-radius: 999px;
    color: var(--subtle);
    background: rgba(0, 0, 0, 0.18);
    text-align: center;
    font-size: 0.64rem;
  }
}

.chevron {
  display: grid;
  place-items: center;
  color: var(--subtle);
  font-size: 16px;
  line-height: 1;
  transition: transform 0.18s ease;
}

.menu-wrapper {
  display: flex;
  flex-direction: row;

  .menu {
    flex: 1;
    margin: 2px 0 7px;

    ::v-deep(.n-menu-item) {
      margin: 2px 0;
    }

    ::v-deep(.n-menu-item-content) {
      padding-right: 9px !important;
      border: 1px solid transparent;
      border-radius: 14px;
    }

    ::v-deep(.n-menu-item-content::before) {
      left: 0;
      right: 7px;
      border-radius: 14px;
    }

    ::v-deep(.n-menu-item-content--selected) {
      border-color: rgba(84, 186, 255, 0.23);
    }

    ::v-deep(.n-menu-item-content-header) {
      font-size: 0.78rem;
    }
  }

  .toggle-bar {
    position: relative;
    width: 19px;
    cursor: pointer;
    opacity: 0.35;
    transition: opacity 0.18s ease;

    &::before {
      content: "";
      position: absolute;
      top: 4px;
      bottom: 8px;
      left: 9px;
      width: 1px;
      border-radius: 2px;
      background: linear-gradient(to bottom, rgba(84, 186, 255, 0.5), rgba(143, 115, 255, 0.12));
    }

    &:hover {
      opacity: 0.9;
    }
  }
}
</style>
