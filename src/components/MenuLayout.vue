<script setup lang="ts">
import { useStyleStore } from '@/stores/style.store';

const styleStore = useStyleStore();
const { isMenuCollapsed } = toRefs(styleStore);
</script>

<template>
  <n-layout class="workspace" has-sider>
    <n-layout-sider
      class="workspace-sider"
      collapse-mode="width"
      :collapsed-width="0"
      :width="330"
      :collapsed="isMenuCollapsed"
      :show-trigger="false"
      :native-scrollbar="false"
      position="absolute"
    >
      <slot name="sider" />
    </n-layout-sider>

    <n-layout class="workspace-content">
      <slot name="content" />
      <div v-show="!isMenuCollapsed" class="overlay" aria-hidden="true" @click="isMenuCollapsed = true" />
    </n-layout>
  </n-layout>
</template>

<style lang="less" scoped>
.workspace {
  min-height: 100vh;
  padding: 18px;
  background: transparent !important;
}

.workspace-sider {
  position: fixed !important;
  z-index: 50;
  top: 18px;
  bottom: 18px;
  left: 18px;
  height: auto;
  overflow: hidden;
  border: 1px solid var(--line) !important;
  border-radius: var(--radius-xl);
  background: rgba(7, 20, 36, 0.99) !important;
  box-shadow: var(--shadow);

  ::v-deep(.n-layout-sider-scroll-container) {
    position: relative;
    height: 100%;
  }
}

.workspace-content {
  min-width: 0;
  width: 100%;
  border: 0;
  background: transparent !important;

  ::v-deep(> .n-layout-scroll-container) {
    padding: 0 0 34px;
  }
}

.overlay {
  position: fixed;
  inset: 0;
  z-index: 40;
  cursor: pointer;
  background: rgba(2, 6, 17, 0.74);
  backdrop-filter: blur(4px);
}

@media (max-width: 700px) {
  .workspace {
    padding: 12px;
  }

  .workspace-sider {
    top: 0;
    bottom: 0;
    left: 0;
    max-width: min(90vw, 340px);
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
}
</style>
