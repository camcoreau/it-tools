<script setup lang="ts">
import FavoriteButton from './FavoriteButton.vue';
import type { Tool } from '@/tools/tools.types';

const props = defineProps<{ tool: Tool & { category: string } }>();
const { tool } = toRefs(props);
</script>

<template>
  <router-link :to="tool.path" class="tool-card" :data-category="tool.category" :aria-label="`Open ${tool.name}`">
    <div class="card-topline">
      <div class="tool-icon">
        <n-icon size="27" :component="tool.icon" />
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
      <span>Open utility</span>
      <strong aria-hidden="true">→</strong>
    </div>
  </router-link>
</template>

<style scoped lang="less">
.tool-card {
  position: relative;
  min-height: 218px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 19px;
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  color: var(--text);
  text-decoration: none;
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.064), rgba(255, 255, 255, 0.022)),
    rgba(11, 28, 47, 0.9);
  box-shadow: 0 18px 46px rgba(0, 0, 0, 0.22);
  transition: transform 0.18s ease, border-color 0.18s ease, background 0.18s ease, box-shadow 0.18s ease;

  &::before {
    content: "";
    position: absolute;
    inset: 0 auto 0 0;
    width: 3px;
    background: linear-gradient(to bottom, var(--blue), rgba(143, 115, 255, 0.7));
    opacity: 0.68;
  }

  &::after {
    content: "";
    position: absolute;
    width: 190px;
    height: 190px;
    right: -112px;
    bottom: -132px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(84, 186, 255, 0.17), transparent 70%);
    pointer-events: none;
    transition: transform 0.22s ease, opacity 0.22s ease;
  }

  &:hover,
  &:focus-visible {
    transform: translateY(-4px);
    border-color: rgba(84, 186, 255, 0.46);
    background:
      linear-gradient(145deg, rgba(84, 186, 255, 0.12), rgba(143, 115, 255, 0.045)),
      rgba(14, 34, 56, 0.96);
    box-shadow: 0 25px 62px rgba(0, 0, 0, 0.32);
  }

  &:hover::after,
  &:focus-visible::after {
    transform: scale(1.17);
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
  border: 1px solid rgba(84, 186, 255, 0.28);
  border-radius: 16px;
  color: #dff4ff;
  background: linear-gradient(135deg, rgba(84, 186, 255, 0.19), rgba(143, 115, 255, 0.12));
  box-shadow: inset 0 1px rgba(255, 255, 255, 0.07);
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
  font-size: 0.64rem;
  font-weight: 850;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.tool-category {
  position: relative;
  z-index: 2;
  margin-top: 18px;
  color: #9fc4df;
  font-size: 0.65rem;
  font-weight: 850;
  letter-spacing: 0.095em;
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
  line-height: 1.54;
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
  font-size: 0.75rem;
  font-weight: 800;
}

.open-label strong {
  color: var(--blue);
  font-size: 1rem;
  transition: transform 0.18s ease;
}

.tool-card:hover .open-label strong,
.tool-card:focus-visible .open-label strong {
  transform: translateX(4px);
}

@media (max-width: 520px) {
  .tool-card {
    min-height: 205px;
  }
}
</style>
