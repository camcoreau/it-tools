<script setup lang="ts">
import { IconDragDrop } from '@tabler/icons-vue';
import { useHead } from '@vueuse/head';
import { computed, ref } from 'vue';
import Draggable from 'vuedraggable';
import ToolCard from '../components/ToolCard.vue';
import { useToolStore } from '@/tools/tools.store';

const toolStore = useToolStore();
useHead({ title: 'CamCore IT Tools | Private browser utilities' });

const activeCategory = ref('All');
const favoriteTools = computed(() => toolStore.favoriteTools);
const newTools = computed(() => toolStore.newTools);
const totalTools = computed(() => toolStore.tools.length);
const categories = computed(() => ['All', ...toolStore.toolsByCategory.map(category => category.name)]);
const visibleTools = computed(() => activeCategory.value === 'All'
  ? toolStore.tools
  : toolStore.tools.filter(tool => tool.category === activeCategory.value));

function categoryCount(category: string) {
  if (category === 'All') return totalTools.value;
  return toolStore.tools.filter(tool => tool.category === category).length;
}

function onUpdateFavoriteTools() {
  toolStore.updateFavoriteTools(favoriteTools.value);
}

function focusToolSearch() {
  const search = document.querySelector<HTMLInputElement>('.topbar input, input[placeholder*="Search"]');
  search?.focus();
  search?.select();
}
</script>

<template>
  <div class="home-page">
    <section class="hero-grid">
      <div class="hero-main surface">
        <div class="hero-glow" />
        <div class="eyebrow"><span class="status-dot" />CamCore private service</div>
        <h1>Technical utilities,<br>without the clutter.</h1>
        <p>Search, convert, inspect, generate and troubleshoot with a trusted toolkit that runs directly in your browser. Built for everyday CamCore administration and support work.</p>
        <div class="hero-actions">
          <a class="hero-button primary" href="#utility-directory">Browse all utilities</a>
          <button class="hero-button" type="button" @click="focusToolSearch">Search tools</button>
        </div>
        <div class="trust-row" aria-label="IT Tools privacy information">
          <span><i />Runs locally in your browser</span>
          <span><i />No files uploaded by CamCore</span>
          <span><i />LAN or NetBird access</span>
        </div>
      </div>

      <aside class="hero-side surface" aria-label="CamCore IT Tools service information">
        <div class="service-card">
          <small>Service availability</small>
          <strong><span class="status-dot" />Ready to use</strong>
          <p>Utilities load from the private CamCore service and process information in the browser.</p>
        </div>
        <div class="mini-grid">
          <div class="stat-card"><strong>{{ totalTools }}</strong><span>Utilities available</span></div>
          <div class="stat-card"><strong>{{ favoriteTools.length }}</strong><span>Saved favourites</span></div>
          <div class="stat-card"><strong>{{ categories.length - 1 }}</strong><span>Tool categories</span></div>
          <div class="stat-card"><strong>Local</strong><span>Browser processing</span></div>
        </div>
        <div class="access-card">
          <small>Approved access paths</small>
          <div class="access-path"><strong>At home</strong><span>CamCore LAN</span></div>
          <div class="access-path"><strong>Away</strong><span>NetBird</span></div>
        </div>
      </aside>
    </section>

    <transition name="height">
      <section v-if="favoriteTools.length > 0" class="tool-section">
        <div class="section-head">
          <div>
            <span class="section-kicker">Your workspace</span>
            <h2>Favourite utilities <c-tooltip :tooltip="$t('home.categories.favoritesDndToolTip')"><n-icon :component="IconDragDrop" size="19" /></c-tooltip></h2>
            <p>Your pinned tools, ready for quick access. Drag cards to change their order.</p>
          </div>
          <span class="count-chip">{{ favoriteTools.length }} saved</span>
        </div>
        <Draggable :list="favoriteTools" class="tool-grid" ghost-class="ghost-favorites-draggable" item-key="name" @end="onUpdateFavoriteTools">
          <template #item="{ element: tool }"><ToolCard :tool="tool" /></template>
        </Draggable>
      </section>
    </transition>

    <section v-if="newTools.length > 0" class="tool-section featured-section surface">
      <div class="section-head">
        <div><span class="section-kicker">Recently added</span><h2>New utilities</h2><p>The newest tools available in the CamCore collection.</p></div>
        <span class="count-chip">{{ newTools.length }} new</span>
      </div>
      <div class="tool-grid"><ToolCard v-for="tool in newTools" :key="tool.name" :tool="tool" /></div>
    </section>

    <section id="utility-directory" class="tool-section">
      <div class="section-head">
        <div><span class="section-kicker">Complete directory</span><h2>All utilities</h2><p>Choose a category below or use the search field in the header to jump directly to a tool.</p></div>
        <span class="count-chip">{{ visibleTools.length }} shown</span>
      </div>
      <div class="category-panel surface" aria-label="Utility category filters">
        <button v-for="category in categories" :key="category" class="category-chip" :class="{ active: activeCategory === category }" type="button" :aria-pressed="activeCategory === category" @click="activeCategory = category">
          <span>{{ category }}</span><strong>{{ categoryCount(category) }}</strong>
        </button>
      </div>
      <div class="directory-summary"><strong>{{ activeCategory === 'All' ? 'Complete CamCore toolkit' : activeCategory }}</strong><span>{{ visibleTools.length }} utilit{{ visibleTools.length === 1 ? 'y' : 'ies' }}</span></div>
      <div class="tool-grid"><ToolCard v-for="tool in visibleTools" :key="tool.path" :tool="tool" /></div>
    </section>

    <section class="privacy-panel surface" aria-label="IT Tools privacy and support">
      <div><span class="section-kicker">Private by design</span><h2>Your work stays with your device.</h2><p>CamCore IT Tools is delivered from the private network. Most utilities complete their work locally in the browser rather than sending your input to an external service.</p></div>
      <div class="privacy-actions">
        <a href="https://inside.camcore.au">Open Inside CamCore</a>
        <a href="https://status.camcore.au">Check service status</a>
        <a href="https://sites.plane.so/intake/forms/2054158f365d49d2a27bfb2c88df72be">Report a problem</a>
      </div>
    </section>
  </div>
</template>

<style scoped lang="less">
.home-page{padding-top:22px}.hero-grid{display:grid;grid-template-columns:minmax(0,1.42fr) minmax(350px,.58fr);gap:18px}.hero-main,.hero-side{overflow:hidden;border-radius:var(--radius-xl)}.hero-main{position:relative;min-height:430px;padding:44px}.hero-glow{position:absolute;width:540px;height:540px;right:-205px;bottom:-315px;border-radius:50%;background:radial-gradient(circle,rgba(84,186,255,.27),transparent 70%);pointer-events:none}.eyebrow,.section-kicker{color:#bfe8ff;font-weight:820}.eyebrow{position:relative;z-index:2;display:inline-flex;align-items:center;gap:9px;margin-bottom:22px;padding:9px 13px;border:1px solid rgba(84,186,255,.29);border-radius:999px;background:rgba(84,186,255,.13);font-size:.82rem}.status-dot{width:9px;height:9px;flex:0 0 auto;border-radius:50%;background:var(--green);box-shadow:0 0 16px rgba(56,220,135,.9)}h1{position:relative;z-index:2;max-width:920px;margin:0;font-size:clamp(2.9rem,5.2vw,5.4rem);font-weight:860;line-height:.94;letter-spacing:-.078em}.hero-main>p{position:relative;z-index:2;max-width:830px;margin:22px 0 0;color:var(--muted);font-size:1.08rem;line-height:1.72}.hero-actions{position:relative;z-index:2;display:flex;flex-wrap:wrap;gap:11px;margin-top:28px}.hero-button{min-height:45px;display:inline-flex;align-items:center;justify-content:center;padding:11px 17px;border:1px solid var(--line-strong);border-radius:999px;color:var(--text);background:rgba(255,255,255,.07);font:inherit;font-size:.88rem;font-weight:800;text-decoration:none;cursor:pointer;transition:transform .18s ease,background .18s ease,border-color .18s ease}.hero-button.primary{border-color:rgba(84,186,255,.56);background:linear-gradient(135deg,rgba(84,186,255,.29),rgba(143,115,255,.22))}.hero-button:hover{transform:translateY(-2px);border-color:rgba(84,186,255,.5);background:rgba(255,255,255,.13)}.trust-row{position:relative;z-index:2;display:flex;flex-wrap:wrap;gap:9px 18px;margin-top:27px;padding-top:20px;border-top:1px solid var(--line);color:var(--muted);font-size:.76rem}.trust-row span{display:inline-flex;align-items:center;gap:8px}.trust-row i{width:7px;height:7px;border-radius:50%;background:var(--blue);box-shadow:0 0 11px rgba(84,186,255,.75)}.hero-side{display:grid;align-content:start;gap:14px;padding:22px}.service-card,.access-card,.stat-card{border-radius:var(--radius-lg)}.service-card{padding:20px;border:1px solid rgba(56,220,135,.3);background:rgba(56,220,135,.08)}.service-card small,.access-card small{display:block;color:#9fc4df;font-size:.68rem;font-weight:850;letter-spacing:.09em;text-transform:uppercase}.service-card strong{display:flex;align-items:center;gap:9px;margin-top:11px;font-size:1.35rem;letter-spacing:-.04em}.service-card p{margin:9px 0 0;color:var(--muted);font-size:.9rem;line-height:1.58}.mini-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}.stat-card{min-height:100px;padding:17px;border:1px solid var(--line);background:rgba(0,0,0,.2)}.stat-card strong{display:block;font-size:1.42rem;letter-spacing:-.045em}.stat-card span{display:block;margin-top:6px;color:var(--muted);font-size:.74rem;line-height:1.42}.access-card{padding:19px;border:1px solid rgba(84,186,255,.27);background:linear-gradient(145deg,rgba(84,186,255,.09),rgba(143,115,255,.045))}.access-path{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-top:10px;padding:10px 11px;border:1px solid var(--line);border-radius:14px;background:rgba(0,0,0,.18);font-size:.76rem}.access-path span{color:#bff7d8}.tool-section{margin-top:38px}.featured-section{padding:24px;border-radius:var(--radius-xl)}.section-head{display:flex;align-items:end;justify-content:space-between;gap:18px;margin-bottom:17px}.section-kicker{display:block;margin-bottom:7px;font-size:.69rem;letter-spacing:.1em;text-transform:uppercase}.section-head h2,.privacy-panel h2{margin:0;font-size:1.58rem;letter-spacing:-.045em}.section-head h2{display:flex;align-items:center;gap:7px}.section-head p,.privacy-panel p{margin:7px 0 0;color:var(--muted);font-size:.92rem;line-height:1.55}.count-chip{min-height:39px;display:inline-flex;align-items:center;padding:8px 12px;border:1px solid var(--line);border-radius:999px;color:var(--muted);background:rgba(255,255,255,.055);font-size:.72rem;font-weight:780;white-space:nowrap}.category-panel{display:flex;flex-wrap:wrap;gap:9px;padding:15px;border-radius:22px}.category-chip{min-height:42px;display:inline-flex;align-items:center;gap:9px;padding:9px 12px;border:1px solid var(--line);border-radius:999px;color:#deedff;background:rgba(255,255,255,.055);font:inherit;font-size:.78rem;cursor:pointer;transition:transform .17s ease,border-color .17s ease,background .17s ease}.category-chip strong{min-width:24px;height:24px;display:grid;place-items:center;padding:0 7px;border-radius:999px;color:#cfe8ff;background:rgba(0,0,0,.24);font-size:.68rem}.category-chip:hover{transform:translateY(-1px);background:rgba(255,255,255,.1)}.category-chip.active{border-color:rgba(84,186,255,.52);background:rgba(84,186,255,.16);color:#fff}.directory-summary{display:flex;align-items:center;justify-content:space-between;gap:14px;margin:16px 2px 13px;color:var(--muted);font-size:.82rem}.directory-summary strong{color:#eaf5ff}.tool-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px}.privacy-panel{display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:center;gap:24px;margin-top:38px;padding:28px;border-radius:var(--radius-xl)}.privacy-panel p{max-width:850px}.privacy-actions{display:grid;gap:9px;min-width:220px}.privacy-actions a{min-height:43px;display:flex;align-items:center;justify-content:space-between;padding:10px 13px;border:1px solid var(--line);border-radius:14px;color:#dff4ff;background:rgba(255,255,255,.05);text-decoration:none;font-size:.78rem;font-weight:760}.privacy-actions a::after{content:"↗";color:var(--blue)}.height-enter-active,.height-leave-active{overflow:hidden;max-height:1200px;transition:all .45s ease-in-out}.height-enter-from,.height-leave-to{max-height:0;margin-bottom:0;opacity:0}.ghost-favorites-draggable{opacity:.42;border:2px dashed var(--blue);background:rgba(84,186,255,.11)}@media(max-width:1180px){.tool-grid{grid-template-columns:repeat(3,minmax(0,1fr))}}@media(max-width:980px){.hero-grid,.privacy-panel{grid-template-columns:1fr}.privacy-actions{grid-template-columns:repeat(3,minmax(0,1fr));min-width:0}}@media(max-width:780px){.home-page{padding-top:14px}.hero-main{min-height:auto;padding:30px 24px}h1{font-size:clamp(2.6rem,12vw,4rem)}.tool-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.section-head,.directory-summary{align-items:flex-start;flex-direction:column}.privacy-actions{grid-template-columns:1fr}}@media(max-width:520px){.hero-main,.hero-side,.featured-section,.privacy-panel{border-radius:22px}.hero-main{padding:27px 20px}.hero-actions,.hero-button{width:100%}.tool-grid{grid-template-columns:1fr}.category-panel{padding:12px}}
</style>
