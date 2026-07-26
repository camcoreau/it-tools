<script setup lang="ts">
import { IconDragDrop } from '@tabler/icons-vue';
import { useHead } from '@vueuse/head';
import { computed } from 'vue';
import Draggable from 'vuedraggable';
import ToolCard from '../components/ToolCard.vue';
import { useToolStore } from '@/tools/tools.store';

const toolStore = useToolStore();

useHead({ title: 'CamCore IT Tools | Secure browser utilities' });
const { t } = useI18n();

const favoriteTools = computed(() => toolStore.favoriteTools);

function onUpdateFavoriteTools() {
  toolStore.updateFavoriteTools(favoriteTools.value);
}
</script>

<template>
  <div class="home-page">
    <section class="camcore-hero">
      <div class="hero-glow hero-glow-one" />
      <div class="hero-glow hero-glow-two" />
      <div class="hero-content">
        <div class="hero-kicker">
          CAMCORE INTERNAL SERVICE
        </div>
        <h1>CamCore IT Tools</h1>
        <p>
          Fast, privacy-friendly utilities for networking, troubleshooting, encoding,
          development and everyday system administration.
        </p>
        <div class="hero-meta" aria-label="Service information">
          <span>Runs in your browser</span>
          <span>No files uploaded</span>
          <span>LAN &amp; NetBird access</span>
        </div>
      </div>
    </section>

    <div class="grid-wrapper">
      <transition name="height">
        <div v-if="toolStore.favoriteTools.length > 0">
          <h3 class="section-heading">
            {{ $t('home.categories.favoriteTools') }}
            <c-tooltip :tooltip="$t('home.categories.favoritesDndToolTip')">
              <n-icon :component="IconDragDrop" size="18" />
            </c-tooltip>
          </h3>
          <Draggable
            :list="favoriteTools"
            class="tool-grid"
            ghost-class="ghost-favorites-draggable"
            item-key="name"
            @end="onUpdateFavoriteTools"
          >
            <template #item="{ element: tool }">
              <ToolCard :tool="tool" />
            </template>
          </Draggable>
        </div>
      </transition>

      <div v-if="toolStore.newTools.length > 0">
        <h3 class="section-heading">
          {{ t('home.categories.newestTools') }}
        </h3>
        <div class="tool-grid">
          <ToolCard v-for="tool in toolStore.newTools" :key="tool.name" :tool="tool" />
        </div>
      </div>

      <h3 class="section-heading">
        {{ $t('home.categories.allTools') }}
      </h3>
      <div class="tool-grid">
        <ToolCard v-for="tool in toolStore.tools" :key="tool.name" :tool="tool" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.home-page {
  padding-top: 24px;
}

.camcore-hero {
  position: relative;
  overflow: hidden;
  max-width: 1180px;
  margin: 0 auto 30px;
  padding: 36px 38px;
  border: 1px solid rgba(96, 165, 250, 0.22);
  border-radius: 22px;
  color: #fff;
  background:
    linear-gradient(rgba(147, 197, 253, 0.055) 1px, transparent 1px),
    linear-gradient(90deg, rgba(147, 197, 253, 0.055) 1px, transparent 1px),
    linear-gradient(135deg, rgba(7, 17, 31, 0.98), rgba(13, 35, 66, 0.96));
  background-size: 28px 28px, 28px 28px, auto;
  box-shadow: 0 24px 70px rgba(2, 8, 23, 0.24);
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 780px;
}

.hero-kicker {
  margin-bottom: 10px;
  color: #7dd3fc;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.18em;
}

h1 {
  margin: 0;
  font-size: clamp(32px, 5vw, 52px);
  line-height: 1.02;
  letter-spacing: -0.035em;
}

.camcore-hero p {
  max-width: 720px;
  margin: 16px 0 20px;
  color: #c7d8ee;
  font-size: 17px;
  line-height: 1.65;
}

.hero-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.hero-meta span {
  display: inline-flex;
  align-items: center;
  min-height: 34px;
  padding: 7px 12px;
  border: 1px solid rgba(147, 197, 253, 0.18);
  border-radius: 999px;
  color: #dbeafe;
  background: rgba(15, 29, 49, 0.68);
  backdrop-filter: blur(10px);
  font-size: 13px;
  font-weight: 600;
}

.hero-meta span::before {
  content: '';
  width: 7px;
  height: 7px;
  margin-right: 8px;
  border-radius: 50%;
  background: #38bdf8;
  box-shadow: 0 0 12px rgba(56, 189, 248, 0.8);
}

.hero-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(4px);
  pointer-events: none;
}

.hero-glow-one {
  width: 300px;
  height: 300px;
  right: -80px;
  top: -140px;
  background: radial-gradient(circle, rgba(37, 99, 235, 0.38), transparent 68%);
}

.hero-glow-two {
  width: 230px;
  height: 230px;
  right: 150px;
  bottom: -170px;
  background: radial-gradient(circle, rgba(8, 145, 178, 0.3), transparent 70%);
}

.grid-wrapper {
  max-width: 1180px;
  margin: 0 auto;
}

.tool-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
}

.section-heading {
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 25px 0 8px;
  color: #7f91a8;
  font-weight: 650;
  letter-spacing: 0.01em;
}

.height-enter-active,
.height-leave-active {
  transition: all 0.5s ease-in-out;
  overflow: hidden;
  max-height: 500px;
}

.height-enter-from,
.height-leave-to {
  max-height: 42px;
  overflow: hidden;
  opacity: 0;
  margin-bottom: 0;
}

.ghost-favorites-draggable {
  opacity: 0.4;
  background-color: rgba(56, 189, 248, 0.12);
  border: 2px dashed #38bdf8;
  box-shadow: 0 0 18px rgba(56, 189, 248, 0.22);
  transform: scale(1.03);
  animation: ghost-favorites-draggable-animation 0.2s ease-out;
}

@keyframes ghost-favorites-draggable-animation {
  0% {
    opacity: 0;
    transform: scale(0.96);
  }
  100% {
    opacity: 0.4;
    transform: scale(1.03);
  }
}

@media (max-width: 1100px) {
  .tool-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 820px) {
  .camcore-hero {
    padding: 30px 26px;
  }

  .tool-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 560px) {
  .home-page {
    padding-top: 14px;
  }

  .camcore-hero {
    padding: 26px 20px;
    border-radius: 18px;
  }

  .camcore-hero p {
    font-size: 15px;
  }

  .tool-grid {
    grid-template-columns: 1fr;
  }
}
</style>
