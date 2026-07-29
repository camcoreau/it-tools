<script setup lang="ts">
import { useStyleStore } from '@/stores/style.store';

const styleStore = useStyleStore();
const { isMenuCollapsed } = toRefs(styleStore);
</script>

<template>
  <div class="workspace">
    <main class="workspace-content">
      <slot name="content" />
    </main>

    <div
      v-show="!isMenuCollapsed"
      class="overlay"
      aria-hidden="true"
      @click="isMenuCollapsed = true"
    />

    <aside
      v-show="!isMenuCollapsed"
      class="workspace-sider"
      aria-label="IT Tools navigation"
    >
      <slot name="sider" />
    </aside>
  </div>
</template>

<style lang="less" scoped>
.workspace {
  position: relative;
  min-height: 100vh;
}

.workspace-content {
  position: relative;
  z-index: 1;
  width: 100%;
  min-width: 0;
  min-height: 100vh;
}

.workspace-sider {
  position: fixed;
  z-index: 60;
  top: 18px;
  bottom: 18px;
  left: 18px;
  width: min(350px, calc(100vw - 36px));
  overflow: auto;
  border: 1px solid var(--line);
  border-radius: var(--radius-xl);
  background: #071424;
  box-shadow: 0 32px 90px rgba(0, 0, 0, 0.62);
}

.overlay {
  position: fixed;
  inset: 0;
  z-index: 50;
  cursor: pointer;
  background: rgba(2, 6, 17, 0.82);
}

@media (max-width: 700px) {
  .workspace-sider {
    top: 0;
    bottom: 0;
    left: 0;
    width: min(92vw, 350px);
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
}
</style>
