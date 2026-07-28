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
      :width="340"
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
  z-index: 50;
  top: 18px;
  bottom: 18px;
  left: 18px;
  height: auto;
  overflow: hidden;
  border: 1px solid var(--line) !important;
  border-radius: var(--radius-xl);
  background: rgba(7, 20, 36, 0.995) !important;
  box-shadow: 0 32px 90px rgba(0, 0, 0, 0.58);

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
    min-height: 100vh;
    padding: 0 18px 38px;
  }
}

.overlay {
  position: fixed;
  inset: 0;
  z-index: 40;
  cursor: pointer;
  background: rgba(2, 6, 17, 0.78);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
}

@media (max-width: 700px) {
  .workspace-content {
    ::v-deep(> .n-layout-scroll-container) {
      padding: 0 10px 28px;
    }
  }

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
