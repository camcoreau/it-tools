<script setup lang="ts">
import FavoriteButton from './FavoriteButton.vue';
import type { Tool } from '@/tools/tools.types';

const props = defineProps<{ tool: Tool & { category: string } }>();
const { tool } = toRefs(props);
</script>

<template>
  <router-link :to="tool.path" class="tool-card">
    <div class="card-topline">
      <div class="tool-icon">
        <n-icon size="28" :component="tool.icon" />
      </div>

      <div class="card-actions">
        <span v-if="tool.isNew" class="new-pill">New</span>
        <FavoriteButton :tool="tool" />
      </div>
    </div>

    <div class="tool-category">
      {{ tool.category }}
    </div>

    <h3>{{ tool.name }}</h3>
    <p>{{ tool.description }}</p>

    <div class="open-label">
      Open utility
      <span aria-hidden="true">→</span>
    </div>
  </router-link>
</template>

<style scoped lang="less">
.tool-card {
  position: relative;
  min-height: 220px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 20px;
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  color: var(--text);
  text-decoration: none;
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.065), rgba(255, 255, 255, 0.025)),
    var(--panel);
  box-shadow: 0 18px 48px rgba(0, 0, 0, 0.23);
  backdrop-filter: blur(18px);
  transition: transform 0.18s ease, border-color 0.18s ease, background 0.18s ease, box-shadow 0.18s ease;

  &::after {
    content: "";
    position: absolute;
    width: 180px;
    height: 180px;
    right: -105px;
    bottom: -125px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(84, 186, 255, 0.18), transparent 70%);
    pointer-events: none;
    transition: transform 0.22s ease, opacity 0.22s ease;
  }

  &:hover {
    transform: translateY(-3px);
    border-color: rgba(84, 186, 255, 0.45);
    background:
      linear-gradient(145deg, rgba(84, 186, 255, 0.12), rgba(143, 115, 255, 0.04)),
      var(--panel-strong);
    box-shadow: 0 24px 58px rgba(0, 0, 0, 0.3);
  }

  &:hover::after {
    transform: scale(1.15);
    opacity: 1;
  }
}

.card-topline {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.tool-icon {
  width: 50px;
  height: 50px;
  display: grid;
  place-items: center;
  flex: 0 0 auto;
  border: 1px solid rgba(84, 186, 255, 0.27);
  border-radius: 16px;
  color: #dff4ff;
  background: linear-gradient(135deg, rgba(84, 186, 255, 0.17), rgba(143, 115, 255, 0.11));
  box-shadow: inset 0 1px rgba(255, 255, 255, 0.06);
}

.card-actions {
  display: flex;
  align-items: center;
  gap: 5px;
}

.new-pill {
  padding: 5px 9px;
  border: 1px solid rgba(56, 220, 135, 0.34);
  border-radius: 999px;
  color: #d4ffee;
  background: rgba(56, 220, 135, 0.11);
  font-size: 0.65rem;
  font-weight: 850;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.tool-category {
  position: relative;
  z-index: 2;
  margin-top: 18px;
  color: #9fc4df;
  font-size: 0.66rem;
  font-weight: 850;
  letter-spacing: 0.09em;
  text-transform: uppercase;
}

h3 {
  position: relative;
  z-index: 2;
  margin: 7px 0 0;
  font-size: 1.08rem;
  line-height: 1.25;
  letter-spacing: -0.035em;
}

p {
  position: relative;
  z-index: 2;
  display: -webkit-box;
  overflow: hidden;
  margin: 9px 0 18px;
  color: var(--muted);
  font-size: 0.82rem;
  line-height: 1.52;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.open-label {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: auto;
  padding-top: 14px;
  border-top: 1px solid var(--line);
  color: #dff4ff;
  font-size: 0.76rem;
  font-weight: 800;
}

.open-label span {
  color: var(--blue);
  font-size: 1rem;
  transition: transform 0.18s ease;
}

.tool-card:hover .open-label span {
  transform: translateX(3px);
}
</style>
