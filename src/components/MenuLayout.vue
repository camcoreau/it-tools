<script setup lang="ts">
import { useStyleStore } from '@/stores/style.store';

const styleStore = useStyleStore();
const { isMenuCollapsed, isSmallScreen } = toRefs(styleStore);
const siderPosition = computed(() => (isSmallScreen.value ? 'absolute' : 'static'));
</script>

<template>
  <n-layout class="workspace" has-sider>
    <n-layout-sider
      class="workspace-sider"
      collapse-mode="width"
      :collapsed-width="0"
      :width="310"
      :collapsed="isMenuCollapsed"
      :show-trigger="false"
      :native-scrollbar="false"
      :position="siderPosition"
    >
      <slot name="sider" />
    </n-layout-sider>

    <n-layout class="workspace-content">
      <slot name="content" />
      <div v-show="isSmallScreen && !isMenuCollapsed" class="overlay" @click="isMenuCollapsed = true" />
    </n-layout>
  </n-layout>
</template>

<style lang="less" scoped>
.workspace {
  height: 100vh;
  padding: 18px;
  gap: 18px;
  background: transparent !important;
}

.workspace-sider {
  height: calc(100vh - 36px);
  overflow: hidden;
  border: 1px solid var(--line) !important;
  border-radius: var(--radius-xl);
  background: var(--panel) !important;
  box-shadow: var(--shadow);
  backdrop-filter: blur(22px);

  ::v-deep(.n-layout-sider-scroll-container) {
    position: relative;
  }
}

.workspace-content {
  min-width: 0;
  border: 0;
  background: transparent !important;

  ::v-deep(> .n-layout-scroll-container) {
    padding: 0 0 34px;
  }
}

.overlay {
  position: fixed;
  inset: 0;
  z-index: 25;
  cursor: pointer;
  background: rgba(2, 6, 17, 0.78);
  backdrop-filter: blur(5px);
}

@media (max-width: 700px) {
  .workspace {
    padding: 12px;
  }

  .workspace-sider {
    position: fixed !important;
    z-index: 30;
    top: 0;
    left: 0;
    height: 100vh;
    max-width: min(88vw, 330px);
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
}
</style>
