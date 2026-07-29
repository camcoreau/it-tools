<script setup lang="ts">
import { IconDragDrop } from '@tabler/icons-vue';
import { useHead } from '@vueuse/head';
import { computed, ref } from 'vue';
import Draggable from 'vuedraggable';
import ToolCard from '../components/ToolCard.vue';
import { useToolStore } from '@/tools/tools.store';

const toolStore = useToolStore();
useHead({ title: 'CamCore IT Tools | Private Browser Utilities' });

const activeCategory = ref('All');
const favoriteTools = computed(() => toolStore.favoriteTools);
const newTools = computed(() => toolStore.newTools);
const totalTools = computed(() => toolStore.tools.length);
const categories = computed(() => ['All', ...toolStore.toolsByCategory.map(category => category.name)]);
const visibleTools = computed(() => activeCategory.value === 'All'
  ? toolStore.tools
  : toolStore.tools.filter(tool => tool.category === activeCategory.value));

function categoryCount(category: string) {
  if (category === 'All') {
    return totalTools.value;
  }
  return toolStore.tools.filter(tool => tool.category === category).length;
}

function onUpdateFavoriteTools() {
  toolStore.updateFavoriteTools(favoriteTools.value);
}

function focusToolSearch() {
  const searchButton = document.querySelector<HTMLElement>('.search-wrap button, .search-wrap [role="button"]');
  const searchInput = document.querySelector<HTMLInputElement>('.search-wrap input');
  if (searchInput) {
    searchInput.focus();
    searchInput.select();
  }
  else {
    searchButton?.click();
  }
}
</script>

<template>
  <div class="home-page">
    <section class="hero" aria-label="CamCore IT Tools overview">
      <div class="hero-main surface">
        <div class="eyebrow"><span class="status-dot" />Ready on CamCore LAN or NetBird</div>
        <h1>The right utility.<br>One trusted workspace.</h1>
        <p>
          Search, convert, inspect, generate and troubleshoot with practical browser-based tools
          designed for everyday CamCore administration and support.
        </p>

        <div class="utility-search-panel">
          <div>
            <strong>Find a utility</strong>
            <span>Search all {{ totalTools }} tools by name or purpose.</span>
          </div>
          <button type="button" @click="focusToolSearch">Search IT Tools</button>
        </div>
      </div>

      <aside class="hero-side surface" aria-label="IT Tools service information">
        <div class="service-card">
          <small>Service availability</small>
          <strong><span class="status-dot" />Ready to use</strong>
          <p>Tools load from the private CamCore service and complete most work locally in your browser.</p>
        </div>

        <div class="mini-grid">
          <div class="stat-card"><strong>{{ totalTools }}</strong><p>Utilities available</p></div>
          <div class="stat-card"><strong>{{ categories.length - 1 }}</strong><p>Tool categories</p></div>
          <div class="stat-card"><strong>{{ favoriteTools.length }}</strong><p>Saved favourites</p></div>
          <div class="stat-card"><strong>Local</strong><p>Browser processing</p></div>
        </div>

        <div class="network-card">
          <h3>Private access is working</h3>
          <p>If this page is visible, this device can reach private CamCore services.</p>
          <div class="network-paths">
            <div class="network-path"><strong>At home</strong><span>CamCore LAN</span></div>
            <div class="network-path"><strong>Away</strong><span>NetBird</span></div>
          </div>
        </div>
      </aside>
    </section>

    <section class="section" aria-label="IT Tools quick actions">
      <div class="section-head">
        <div>
          <h2>Common starting points</h2>
          <p>Use these shortcuts to get to the right part of the toolkit quickly.</p>
        </div>
      </div>

      <div class="quick-grid">
        <button class="quick-card" type="button" @click="focusToolSearch">
          <div><small>Fastest route</small><h3>Search utilities</h3><p>Find a tool by its name, purpose or category.</p></div>
          <strong>Open search →</strong>
        </button>
        <a class="quick-card" href="#utility-directory">
          <div><small>Complete directory</small><h3>Browse all tools</h3><p>Filter the full collection by category.</p></div>
          <strong>View directory →</strong>
        </a>
        <a class="quick-card" href="#favourites">
          <div><small>Your workspace</small><h3>Saved favourites</h3><p>Open the tools you use most often.</p></div>
          <strong>{{ favoriteTools.length }} saved →</strong>
        </a>
        <RouterLink class="quick-card" to="/about">
          <div><small>Privacy and source</small><h3>About IT Tools</h3><p>Learn how the service works and where it comes from.</p></div>
          <strong>Read more →</strong>
        </RouterLink>
      </div>
    </section>

    <transition name="height">
      <section v-if="favoriteTools.length > 0" id="favourites" class="section">
        <div class="section-head">
          <div>
            <h2>
              Favourite utilities
              <c-tooltip :tooltip="$t('home.categories.favoritesDndToolTip')">
                <n-icon :component="IconDragDrop" size="19" />
              </c-tooltip>
            </h2>
            <p>Your pinned tools, ready for quick access. Drag cards to change their order.</p>
          </div>
          <span class="count-chip">{{ favoriteTools.length }} saved</span>
        </div>

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
      </section>
    </transition>

    <section v-if="newTools.length > 0" class="section">
      <div class="section-head">
        <div>
          <h2>Recently added</h2>
          <p>The newest utilities available in the CamCore collection.</p>
        </div>
        <span class="count-chip">{{ newTools.length }} new</span>
      </div>
      <div class="tool-grid">
        <ToolCard v-for="tool in newTools" :key="tool.name" :tool="tool" />
      </div>
    </section>

    <section id="utility-directory" class="section" aria-label="Complete IT Tools directory">
      <div class="section-head">
        <div>
          <h2>All utilities</h2>
          <p>Search from the header or filter the complete directory by category.</p>
        </div>
        <span class="count-chip">{{ visibleTools.length }} shown</span>
      </div>

      <div class="directory-panel surface">
        <div class="category-bar" aria-label="Utility categories">
          <button
            v-for="category in categories"
            :key="category"
            class="category-chip"
            :class="{ active: activeCategory === category }"
            type="button"
            :aria-pressed="activeCategory === category"
            @click="activeCategory = category"
          >
            {{ category }}
            <span>{{ categoryCount(category) }}</span>
          </button>
        </div>

        <div class="results-line">
          <strong>{{ activeCategory === 'All' ? 'Complete CamCore toolkit' : activeCategory }}</strong>
          <span>{{ visibleTools.length }} utilit{{ visibleTools.length === 1 ? 'y' : 'ies' }}</span>
        </div>

        <div class="tool-grid">
          <ToolCard v-for="tool in visibleTools" :key="tool.path" :tool="tool" />
        </div>
      </div>
    </section>

    <section class="section" aria-label="IT Tools guidance">
      <div class="guide-grid">
        <article class="guide-card">
          <span>01</span>
          <h3>Choose the right utility</h3>
          <p>Use search or category filters instead of scrolling through the entire directory.</p>
        </article>
        <article class="guide-card">
          <span>02</span>
          <h3>Work in your browser</h3>
          <p>Most utilities complete their work locally without intentionally uploading your input.</p>
        </article>
        <article class="guide-card">
          <span>03</span>
          <h3>Check before sharing</h3>
          <p>Review generated values, commands and converted data before using them elsewhere.</p>
        </article>
      </div>
    </section>
  </div>
</template>

<style scoped lang="less">
.home-page {
  padding-top: 22px;
}

.hero {
  display: grid;
  grid-template-columns: minmax(0, 1.3fr) minmax(370px, 0.7fr);
  gap: 18px;
}

.hero-main,
.hero-side {
  overflow: hidden;
  border-radius: var(--radius-xl);
}

.hero-main {
  position: relative;
  min-height: 425px;
  padding: 42px;
}

.hero-main::after {
  content: "";
  position: absolute;
  width: 470px;
  height: 470px;
  right: -190px;
  bottom: -250px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(84, 186, 255, 0.24), transparent 70%);
  pointer-events: none;
}

.eyebrow {
  position: relative;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  gap: 9px;
  margin-bottom: 20px;
  padding: 9px 13px;
  border: 1px solid rgba(84, 186, 255, 0.29);
  border-radius: 999px;
  color: #dff4ff;
  background: rgba(84, 186, 255, 0.13);
  font-size: 0.88rem;
}

.status-dot {
  width: 10px;
  height: 10px;
  flex: 0 0 auto;
  border-radius: 50%;
  background: var(--green);
  box-shadow: 0 0 18px rgba(56, 220, 135, 0.9);
}

h1 {
  position: relative;
  z-index: 2;
  max-width: 900px;
  margin: 0;
  font-size: clamp(2.75rem, 5.2vw, 5.2rem);
  line-height: 0.94;
  letter-spacing: -0.078em;
}

.hero-main > p {
  position: relative;
  z-index: 2;
  max-width: 820px;
  margin: 20px 0 0;
  color: var(--muted);
  font-size: 1.08rem;
  line-height: 1.68;
}

.utility-search-panel {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 18px;
  margin-top: 26px;
  padding: 17px;
  border: 1px solid rgba(84, 186, 255, 0.28);
  border-radius: 21px;
  background: linear-gradient(145deg, rgba(84, 186, 255, 0.1), rgba(143, 115, 255, 0.055));
}

.utility-search-panel strong,
.utility-search-panel span {
  display: block;
}

.utility-search-panel strong {
  font-size: 0.94rem;
}

.utility-search-panel span {
  margin-top: 5px;
  color: var(--muted);
  font-size: 0.8rem;
}

.utility-search-panel button {
  min-height: 48px;
  padding: 12px 18px;
  border: 1px solid rgba(84, 186, 255, 0.55);
  border-radius: 16px;
  color: var(--text);
  background: linear-gradient(135deg, rgba(84, 186, 255, 0.3), rgba(143, 115, 255, 0.23));
  font-weight: 850;
  cursor: pointer;
}

.hero-side {
  display: grid;
  align-content: start;
  gap: 14px;
  padding: 22px;
}

.service-card,
.network-card,
.stat-card {
  border-radius: var(--radius-lg);
}

.service-card {
  padding: 20px;
  border: 1px solid rgba(56, 220, 135, 0.3);
  background: rgba(56, 220, 135, 0.08);
}

.service-card small {
  display: block;
  color: #9fc4df;
  font-size: 0.69rem;
  font-weight: 850;
  letter-spacing: 0.09em;
  text-transform: uppercase;
}

.service-card strong {
  display: flex;
  align-items: center;
  gap: 9px;
  margin-top: 10px;
  font-size: 1.42rem;
  letter-spacing: -0.04em;
}

.service-card p,
.network-card p {
  margin: 8px 0 0;
  color: var(--muted);
  font-size: 0.91rem;
  line-height: 1.55;
}

.mini-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.stat-card {
  padding: 16px;
  border: 1px solid var(--line);
  background: rgba(0, 0, 0, 0.2);
}

.stat-card strong {
  display: block;
  margin-bottom: 5px;
  font-size: 1.08rem;
  letter-spacing: -0.035em;
}

.stat-card p {
  margin: 0;
  color: var(--muted);
  font-size: 0.82rem;
  line-height: 1.46;
}

.network-card {
  padding: 19px;
  border: 1px solid rgba(84, 186, 255, 0.27);
  background: linear-gradient(145deg, rgba(84, 186, 255, 0.09), rgba(143, 115, 255, 0.045));
}

.network-card h3 {
  margin: 0 0 9px;
  font-size: 1.04rem;
}

.network-paths {
  display: grid;
  gap: 9px;
  margin-top: 15px;
}

.network-path {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 11px;
  border: 1px solid var(--line);
  border-radius: 14px;
  background: rgba(0, 0, 0, 0.18);
  font-size: 0.86rem;
}

.network-path span {
  color: #bff7d8;
}

.section {
  margin-top: 34px;
}

.section-head {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 18px;
  margin-bottom: 16px;
}

.section-head h2 {
  display: flex;
  align-items: center;
  gap: 7px;
  margin: 0;
  font-size: 1.55rem;
  letter-spacing: -0.045em;
}

.section-head p {
  margin: 7px 0 0;
  color: var(--muted);
  font-size: 0.98rem;
  line-height: 1.5;
}

.count-chip {
  min-height: 39px;
  display: inline-flex;
  align-items: center;
  padding: 8px 12px;
  border: 1px solid var(--line);
  border-radius: 999px;
  color: var(--muted);
  background: rgba(255, 255, 255, 0.055);
  font-size: 0.75rem;
  font-weight: 780;
  white-space: nowrap;
}

.quick-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
}

.quick-card {
  min-height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  color: var(--text);
  text-align: left;
  text-decoration: none;
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.065), rgba(255, 255, 255, 0.025)), var(--panel);
  box-shadow: 0 18px 48px rgba(0, 0, 0, 0.23);
  cursor: pointer;
  transition: transform 0.18s ease, border-color 0.18s ease, background 0.18s ease;
}

.quick-card:hover {
  transform: translateY(-3px);
  border-color: rgba(84, 186, 255, 0.45);
  background: linear-gradient(145deg, rgba(84, 186, 255, 0.12), rgba(143, 115, 255, 0.04)), var(--panel-strong);
}

.quick-card small {
  color: #9fc4df;
  font-size: 0.68rem;
  font-weight: 850;
  letter-spacing: 0.09em;
  text-transform: uppercase;
}

.quick-card h3 {
  margin: 9px 0 0;
  font-size: 1.08rem;
  letter-spacing: -0.035em;
}

.quick-card p {
  margin: 8px 0 0;
  color: var(--muted);
  font-size: 0.84rem;
  line-height: 1.48;
}

.quick-card > strong {
  margin-top: 18px;
  color: #dff4ff;
  font-size: 0.78rem;
}

.directory-panel {
  padding: 20px;
  border-radius: var(--radius-xl);
}

.category-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
  margin-bottom: 17px;
}

.category-chip {
  min-height: 42px;
  padding: 9px 13px;
  border: 1px solid var(--line);
  border-radius: 999px;
  color: #deedff;
  background: rgba(255, 255, 255, 0.062);
  cursor: pointer;
  transition: transform 0.18s ease, border-color 0.18s ease, background 0.18s ease;
}

.category-chip:hover {
  transform: translateY(-1px);
  background: rgba(255, 255, 255, 0.11);
}

.category-chip.active {
  border-color: rgba(84, 186, 255, 0.52);
  color: #f4fbff;
  background: rgba(84, 186, 255, 0.16);
}

.category-chip span {
  display: inline-grid;
  min-width: 24px;
  height: 24px;
  place-items: center;
  margin-left: 7px;
  padding: 0 7px;
  border-radius: 999px;
  color: #cfe8ff;
  background: rgba(0, 0, 0, 0.22);
  font-size: 0.73rem;
  font-weight: 800;
}

.results-line {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  min-height: 25px;
  margin: 0 0 14px;
  color: var(--muted);
  font-size: 0.9rem;
}

.results-line strong {
  color: #eaf5ff;
}

.tool-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 15px;
}

.guide-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.guide-card {
  min-height: 190px;
  padding: 22px;
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  background: rgba(255, 255, 255, 0.046);
}

.guide-card > span {
  display: inline-grid;
  width: 38px;
  height: 38px;
  place-items: center;
  border: 1px solid rgba(84, 186, 255, 0.29);
  border-radius: 12px;
  color: #dff4ff;
  background: rgba(84, 186, 255, 0.15);
  font-size: 0.72rem;
  font-weight: 900;
}

.guide-card h3 {
  margin: 18px 0 8px;
  font-size: 1.05rem;
}

.guide-card p {
  margin: 0;
  color: var(--muted);
  font-size: 0.91rem;
  line-height: 1.55;
}

.height-enter-active,
.height-leave-active {
  overflow: hidden;
  max-height: 1200px;
  transition: all 0.45s ease-in-out;
}

.height-enter-from,
.height-leave-to {
  max-height: 0;
  margin-bottom: 0;
  opacity: 0;
}

.ghost-favorites-draggable {
  opacity: 0.42;
  border: 2px dashed var(--blue);
  background: rgba(84, 186, 255, 0.11);
}

@media (max-width: 1180px) {
  .quick-grid,
  .tool-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 980px) {
  .hero {
    grid-template-columns: 1fr;
  }

  .quick-grid,
  .guide-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 720px) {
  .home-page {
    padding-top: 14px;
  }

  .hero-main {
    min-height: auto;
    padding: 28px 22px;
  }

  h1 {
    font-size: clamp(2.45rem, 13vw, 3.7rem);
  }

  .hero-main > p {
    font-size: 0.96rem;
  }

  .utility-search-panel {
    grid-template-columns: 1fr;
  }

  .quick-grid,
  .tool-grid,
  .guide-grid {
    grid-template-columns: 1fr;
  }

  .section-head,
  .results-line {
    align-items: flex-start;
    flex-direction: column;
  }

  .directory-panel {
    padding: 15px;
    border-radius: 22px;
  }
}
</style>
