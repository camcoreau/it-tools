<script setup lang="ts">
import { useHead } from '@vueuse/head';

useHead({ title: 'About | CamCore IT Tools' });
</script>

<template>
  <div class="about-page">
    <section class="about-hero surface">
      <div class="eyebrow">CamCore private service</div>
      <h1>Useful tools.<br>One trusted location.</h1>
      <p>
        CamCore IT Tools brings practical browser utilities for troubleshooting, networking,
        development, encoding and everyday system administration into the same clear website
        experience as the rest of CamCore.
      </p>
    </section>

    <section class="section">
      <div class="section-head">
        <div>
          <h2>How the service is designed</h2>
          <p>The principles used to keep IT Tools useful, private and straightforward.</p>
        </div>
      </div>

      <div class="principles">
        <article class="surface">
          <span>01</span>
          <h3>Private by design</h3>
          <p>Most utilities process information directly in your browser instead of intentionally uploading it elsewhere.</p>
        </article>
        <article class="surface">
          <span>02</span>
          <h3>One trusted directory</h3>
          <p>Search and category filters keep the complete utility collection easy to navigate.</p>
        </article>
        <article class="surface">
          <span>03</span>
          <h3>Built for support</h3>
          <p>The service is available to trusted devices over the CamCore LAN or secure NetBird access.</p>
        </article>
      </div>
    </section>

    <section class="section">
      <div class="source-panel surface">
        <div>
          <div class="eyebrow">Open-source foundation</div>
          <h2>CamCore maintained, community powered.</h2>
        </div>
        <div>
          <p>
            This deployment is based on
            <a href="https://github.com/CorentinTh/it-tools" target="_blank" rel="noopener">IT Tools</a>
            by Corentin Thomasset and remains available under the GNU GPLv3 licence. CamCore maintains
            the branding, deployment configuration and private-network integration for this fork.
          </p>
          <div class="source-actions">
            <RouterLink to="/">Open utility directory</RouterLink>
            <a href="https://github.com/camcoreau/it-tools" target="_blank" rel="noopener">View CamCore source</a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="less">
.about-page {
  padding-top: 22px;
}

.about-hero {
  position: relative;
  min-height: 390px;
  overflow: hidden;
  padding: 42px;
  border-radius: var(--radius-xl);
}

.about-hero::after {
  content: "";
  position: absolute;
  width: 500px;
  height: 500px;
  right: -190px;
  bottom: -290px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(84, 186, 255, 0.24), transparent 70%);
}

.eyebrow,
.about-hero h1,
.about-hero > p {
  position: relative;
  z-index: 2;
}

.eyebrow {
  display: inline-flex;
  padding: 9px 13px;
  border: 1px solid rgba(84, 186, 255, 0.29);
  border-radius: 999px;
  color: #dff4ff;
  background: rgba(84, 186, 255, 0.13);
  font-size: 0.76rem;
  font-weight: 820;
  letter-spacing: 0.055em;
  text-transform: uppercase;
}

.about-hero h1 {
  max-width: 900px;
  margin: 22px 0 0;
  font-size: clamp(2.75rem, 5.2vw, 5.2rem);
  line-height: 0.94;
  letter-spacing: -0.078em;
}

.about-hero > p {
  max-width: 850px;
  margin: 22px 0 0;
  color: var(--muted);
  font-size: 1.08rem;
  line-height: 1.68;
}

.section {
  margin-top: 34px;
}

.section-head {
  margin-bottom: 16px;
}

.section-head h2,
.source-panel h2 {
  margin: 0;
  font-size: 1.55rem;
  letter-spacing: -0.045em;
}

.section-head p {
  margin: 7px 0 0;
  color: var(--muted);
  font-size: 0.98rem;
}

.principles {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.principles article {
  min-height: 210px;
  padding: 22px;
  border-radius: var(--radius-lg);
}

.principles article > span {
  display: inline-grid;
  width: 42px;
  height: 42px;
  place-items: center;
  border: 1px solid rgba(84, 186, 255, 0.29);
  border-radius: 13px;
  color: #dff4ff;
  background: rgba(84, 186, 255, 0.15);
  font-size: 0.72rem;
  font-weight: 900;
}

.principles h3 {
  margin: 19px 0 8px;
  font-size: 1.08rem;
}

.principles p,
.source-panel p {
  margin: 0;
  color: var(--muted);
  line-height: 1.6;
}

.source-panel {
  display: grid;
  grid-template-columns: minmax(270px, 0.75fr) minmax(0, 1.25fr);
  align-items: center;
  gap: 34px;
  padding: 30px;
  border-radius: var(--radius-xl);
}

.source-panel h2 {
  margin-top: 15px;
}

.source-panel a {
  color: #bfe8ff;
  font-weight: 760;
}

.source-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
}

.source-actions a {
  min-height: 43px;
  display: inline-flex;
  align-items: center;
  padding: 10px 14px;
  border: 1px solid var(--line);
  border-radius: 999px;
  color: var(--text);
  background: rgba(255, 255, 255, 0.06);
  text-decoration: none;
}

@media (max-width: 850px) {
  .principles,
  .source-panel {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 560px) {
  .about-page {
    padding-top: 14px;
  }

  .about-hero {
    min-height: auto;
    padding: 28px 22px;
    border-radius: 22px;
  }

  .about-hero h1 {
    font-size: clamp(2.45rem, 13vw, 3.5rem);
  }

  .about-hero > p {
    font-size: 0.95rem;
  }

  .principles article,
  .source-panel {
    border-radius: 22px;
  }
}
</style>
