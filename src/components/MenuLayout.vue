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
      :width="350"
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
  background: transparent !important;
}

.workspace-sider {
  position: fixed !important;
  z-index: 60;
  top: 18px;
  bottom: 18px;
  left: 18px;
  height: auto;
  overflow: hidden;
  border: 1px solid var(--line) !important;
  border-radius: var(--radius-xl);
  background: rgba(7, 20, 36, 0.98) !important;
  box-shadow: var(--shadow);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);

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
    padding: 0;
  }
}

.overlay {
  position: fixed;
  inset: 0;
  z-index: 50;
  cursor: pointer;
  background: rgba(2, 6, 17, 0.76);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
}

@media (max-width: 700px) {
  .workspace-sider {
    top: 0;
    bottom: 0;
    left: 0;
    max-width: min(92vw, 350px);
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
}
</style>
