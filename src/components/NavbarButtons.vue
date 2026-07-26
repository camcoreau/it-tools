<script setup lang="ts">
import { IconBrandGithub, IconInfoCircle } from '@tabler/icons-vue';
</script>

<template>
  <c-tooltip tooltip="CamCore source repository" position="bottom">
    <c-button
      circle
      variant="text"
      href="https://github.com/camcoreau/it-tools"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Open the CamCore IT Tools source repository"
    >
      <n-icon size="23" :component="IconBrandGithub" />
    </c-button>
  </c-tooltip>

  <c-tooltip tooltip="About CamCore IT Tools" position="bottom">
    <c-button circle variant="text" to="/about" aria-label="About CamCore IT Tools">
      <n-icon size="23" :component="IconInfoCircle" />
    </c-button>
  </c-tooltip>
</template>

<style lang="less" scoped>
:deep(.n-button) {
  border: 1px solid transparent;

  &:hover {
    border-color: var(--line);
    background: var(--panel-soft);
  }
}
</style>
