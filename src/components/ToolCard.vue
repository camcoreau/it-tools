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

    <small>{{ tool.category }}</small>
    <h3>{{ tool.name }}</h3>
    <p>{{ tool.description }}</p>

    <div class="open-label">
      <span>Open utility</span>
      <strong aria-hidden="true">↗</strong>
    </div>
  </router-link>
</template>

<style scoped lang="less">
.tool-card {
  position: relative;
  min-height: 205px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 19px;
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  color: var(--text);
  text-decoration: none;
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.065), rgba(255, 255, 255, 0.025)), var(--panel);
  box-shadow: 0 18px 48px rgba(0, 0, 0, 0.23);
  transition: transform 0.18s ease, border-color 0.18s ease, background 0.18s ease;
}

.tool-card::after {
  content: "";
  position: absolute;
  width: 190px;
  height: 190px;
  right: -112px;
  bottom: -132px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(84, 186, 255, 0.16), transparent 70%);
  pointer-events: none;
  transition: transform 0.22s ease;
}

.tool-card:hover,
.tool-card:focus-visible {
  transform: translateY(-3px);
  border-color: rgba(84, 186, 255, 0.45);
  background: linear-gradient(145deg, rgba(84, 186, 255, 0.12), rgba(143, 115, 255, 0.04)), var(--panel-strong);
}

.tool-card:hover::after,
.tool-card:focus-visible::after {
  transform: scale(1.15);
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
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  flex: 0 0 auto;
  border: 1px solid rgba(84, 186, 255, 0.25);
  border-radius: 15px;
  color: #dff4ff;
  background: rgba(84, 186, 255, 0.11);
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

small {
  position: relative;
  z-index: 2;
  display: block;
  margin-top: 17px;
  color: #9fc4df;
  font-size: 0.68rem;
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
  margin: 8px 0 18px;
  color: var(--muted);
  font-size: 0.84rem;
  line-height: 1.48;
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

.open-label strong {
  color: var(--blue);
  font-size: 0.92rem;
  transition: transform 0.18s ease;
}

.tool-card:hover .open-label strong,
.tool-card:focus-visible .open-label strong {
  transform: translate(2px, -2px);
}
</style>
