<script setup lang="ts">
import { IconDragDrop } from '@tabler/icons-vue';
import { useHead } from '@vueuse/head';
import { computed } from 'vue';
import Draggable from 'vuedraggable';
import ToolCard from '../components/ToolCard.vue';
import { useToolStore } from '@/tools/tools.store';

const toolStore = useToolStore();

useHead({ title: 'CamCore IT Tools | Private browser utilities' });
const { t } = useI18n();

const favoriteTools = computed(() => toolStore.favoriteTools);
const totalTools = computed(() => toolStore.tools.length);

function onUpdateFavoriteTools() {
  toolStore.updateFavoriteTools(favoriteTools.value);
}
</script>

<template>
  <div class="home-page">
    <section class="hero-grid">
      <div class="hero-main surface">
        <div class="hero-glow" />
        <div class="eyebrow">
          <span class="status-dot" />
          CamCore private service
        </div>

        <h1>Everyday IT work,<br>handled in one place.</h1>
        <p>
          A trusted collection of fast browser-based tools for networking, troubleshooting,
          encoding, development and system administration across CamCore devices.
        </p>

        <div class="hero-actions" aria-label="Service capabilities">
          <span class="feature-pill">Runs locally in your browser</span>
          <span class="feature-pill">No files uploaded</span>
          <span class="feature-pill">Available on LAN &amp; NetBird</span>
        </div>
      </div>

      <aside class="hero-side surface" aria-label="CamCore IT Tools service information">
        <div class="service-card">
          <small>Service status</small>
          <strong><span class="status-dot" /> Ready to use</strong>
          <p>Your data stays in the browser while each utility completes its work.</p>
        </div>

        <div class="mini-grid">
          <div class="stat-card">
            <strong>{{ totalTools }}</strong>
            <span>Utilities available</span>
          </div>
          <div class="stat-card">
            <strong>{{ favoriteTools.length }}</strong>
            <span>Saved favourites</span>
          </div>
        </div>

        <div class="access-card">
          <small>Secure access</small>
          <div class="access-path"><strong>Home network</strong><span>CamCore LAN</span></div>
          <div class="access-path"><strong>Away from home</strong><span>NetBird</span></div>
        </div>
      </aside>
    </section>

    <transition name="height">
      <section v-if="toolStore.favoriteTools.length > 0" class="tool-section">
        <div class="section-head">
          <div>
            <h2>
              Favourite utilities
              <c-tooltip :tooltip="$t('home.categories.favoritesDndToolTip')">
                <n-icon :component="IconDragDrop" size="19" />
              </c-tooltip>
            </h2>
            <p>Your pinned tools, ready for quick access.</p>
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

    <section v-if="toolStore.newTools.length > 0" class="tool-section">
      <div class="section-head">
        <div>
          <h2>{{ t('home.categories.newestTools') }}</h2>
          <p>Recently added utilities available in CamCore IT Tools.</p>
        </div>
        <span class="count-chip">{{ toolStore.newTools.length }} new</span>
      </div>

      <div class="tool-grid">
        <ToolCard v-for="tool in toolStore.newTools" :key="tool.name" :tool="tool" />
      </div>
    </section>

    <section class="tool-section">
      <div class="section-head">
        <div>
          <h2>All utilities</h2>
          <p>Browse the complete CamCore toolkit or use search in the navigation bar.</p>
        </div>
        <span class="count-chip">{{ totalTools }} tools</span>
      </div>

      <div class="tool-grid">
        <ToolCard v-for="tool in toolStore.tools" :key="tool.name" :tool="tool" />
      </div>
    </section>
  </div>
</template>

<style scoped lang="less">
.home-page {
  padding-top: 22px;
}

.hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.45fr) minmax(350px, 0.55fr);
  gap: 18px;
}

.hero-main,
.hero-side {
  overflow: hidden;
  border-radius: var(--radius-xl);
}

.hero-main {
  position: relative;
  min-height: 390px;
  padding: 42px;
}

.hero-glow {
  position: absolute;
  width: 500px;
  height: 500px;
  right: -195px;
  bottom: -285px;
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
  font-size: 0.82rem;
  font-weight: 760;
}

.status-dot {
  width: 9px;
  height: 9px;
  flex: 0 0 auto;
  border-radius: 50%;
  background: var(--green);
  box-shadow: 0 0 16px rgba(56, 220, 135, 0.9);
}

h1 {
  position: relative;
  z-index: 2;
  max-width: 920px;
  margin: 0;
  font-size: clamp(2.85rem, 5.2vw, 5.4rem);
  font-weight: 850;
  line-height: 0.94;
  letter-spacing: -0.078em;
}

.hero-main > p {
  position: relative;
  z-index: 2;
  max-width: 850px;
  margin: 22px 0 0;
  color: var(--muted);
  font-size: 1.08rem;
  line-height: 1.72;
}

.hero-actions {
  position: relative;
  z-index: 2;
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
  margin-top: 28px;
}

.feature-pill,
.count-chip {
  display: inline-flex;
  align-items: center;
  border: 1px solid var(--line);
  border-radius: 999px;
  color: #deedff;
  background: rgba(255, 255, 255, 0.062);
  white-space: nowrap;
}

.feature-pill {
  min-height: 39px;
  padding: 9px 13px;
  font-size: 0.78rem;
  font-weight: 720;
}

.feature-pill::before {
  content: "";
  width: 7px;
  height: 7px;
  margin-right: 8px;
  border-radius: 50%;
  background: var(--blue);
  box-shadow: 0 0 12px rgba(84, 186, 255, 0.78);
}

.hero-side {
  display: grid;
  align-content: start;
  gap: 14px;
  padding: 22px;
}

.service-card,
.access-card,
.stat-card {
  border-radius: var(--radius-lg);
}

.service-card {
  padding: 20px;
  border: 1px solid rgba(56, 220, 135, 0.3);
  background: rgba(56, 220, 135, 0.08);
}

.service-card small,
.access-card small {
  display: block;
  color: #9fc4df;
  font-size: 0.68rem;
  font-weight: 850;
  letter-spacing: 0.09em;
  text-transform: uppercase;
}

.service-card strong {
  display: flex;
  align-items: center;
  gap: 9px;
  margin-top: 11px;
  font-size: 1.35rem;
  letter-spacing: -0.04em;
}

.service-card p {
  margin: 9px 0 0;
  color: var(--muted);
  font-size: 0.9rem;
  line-height: 1.58;
}

.mini-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.stat-card {
  padding: 17px;
  border: 1px solid var(--line);
  background: rgba(0, 0, 0, 0.2);
}

.stat-card strong {
  display: block;
  font-size: 1.45rem;
  letter-spacing: -0.045em;
}

.stat-card span {
  display: block;
  margin-top: 5px;
  color: var(--muted);
  font-size: 0.74rem;
  line-height: 1.42;
}

.access-card {
  padding: 19px;
  border: 1px solid rgba(84, 186, 255, 0.27);
  background: linear-gradient(145deg, rgba(84, 186, 255, 0.09), rgba(143, 115, 255, 0.045));
}

.access-path {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 10px;
  padding: 10px 11px;
  border: 1px solid var(--line);
  border-radius: 14px;
  background: rgba(0, 0, 0, 0.18);
  font-size: 0.76rem;
}

.access-path span {
  color: #bff7d8;
}

.tool-section {
  margin-top: 35px;
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
  font-size: 0.92rem;
  line-height: 1.5;
}

.count-chip {
  min-height: 39px;
  padding: 8px 12px;
  color: var(--muted);
  font-size: 0.72rem;
  font-weight: 760;
}

.tool-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
}

.height-enter-active,
.height-leave-active {
  overflow: hidden;
  max-height: 900px;
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
  box-shadow: 0 0 20px rgba(84, 186, 255, 0.22);
  transform: scale(1.02);
}

@media (max-width: 1260px) {
  .tool-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 1050px) {
  .hero-grid {
    grid-template-columns: 1fr;
  }

  .hero-side {
    grid-template-columns: minmax(260px, 1fr) minmax(220px, 0.7fr) minmax(280px, 1fr);
  }
}

@media (max-width: 850px) {
  .hero-main {
    min-height: auto;
    padding: 32px 28px;
  }

  .hero-side {
    grid-template-columns: 1fr;
  }

  .tool-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 560px) {
  .home-page {
    padding-top: 14px;
  }

  .hero-main,
  .hero-side {
    border-radius: 22px;
  }

  .hero-main {
    padding: 27px 21px;
  }

  h1 {
    font-size: clamp(2.45rem, 13vw, 3.5rem);
  }

  .hero-main > p {
    font-size: 0.95rem;
  }

  .section-head {
    align-items: flex-start;
    flex-direction: column;
  }

  .tool-grid {
    grid-template-columns: 1fr;
  }
}
</style>
