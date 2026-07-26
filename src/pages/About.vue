<script setup lang="ts">
import { useHead } from '@vueuse/head';

useHead({ title: 'About | CamCore IT Tools' });
</script>

<template>
  <div class="about-page">
    <section class="about-hero surface">
      <div class="hero-glow" />
      <div class="eyebrow">CamCore private service</div>
      <h1>Useful tools.<br>A trusted home.</h1>
      <p class="lead">
        CamCore IT Tools brings practical browser utilities for troubleshooting, networking,
        development, encoding and everyday system administration into one secure workspace.
      </p>
    </section>

    <section class="principles">
      <article class="surface">
        <div class="number">01</div>
        <h2>Private by design</h2>
        <p>Most utilities process information directly in your browser instead of uploading it to another service.</p>
      </article>

      <article class="surface">
        <div class="number">02</div>
        <h2>One trusted location</h2>
        <p>Access is intended for CamCore devices connected through the home network or secure NetBird access.</p>
      </article>

      <article class="surface">
        <div class="number">03</div>
        <h2>Built for support</h2>
        <p>Tools are searchable, categorised and kept together so common IT work can be completed consistently.</p>
      </article>
    </section>

    <section class="attribution surface">
      <div>
        <div class="eyebrow">Open-source foundation</div>
        <h2>CamCore maintained, community powered.</h2>
      </div>
      <p>
        This deployment is based on
        <a href="https://github.com/CorentinTh/it-tools" target="_blank" rel="noopener">IT Tools</a>
        by Corentin Thomasset and remains available under the GNU GPLv3 licence. CamCore maintains
        this fork’s branding, deployment configuration and internal integration.
      </p>
    </section>
  </div>
</template>

<style scoped lang="less">
.about-page {
  padding-top: 22px;
  padding-bottom: 20px;
}

.about-hero,
.attribution,
.principles article {
  border-radius: var(--radius-xl);
}

.about-hero {
  position: relative;
  overflow: hidden;
  min-height: 390px;
  padding: 42px;
}

.hero-glow {
  position: absolute;
  width: 520px;
  height: 520px;
  right: -190px;
  bottom: -310px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(84, 186, 255, 0.24), transparent 70%);
  pointer-events: none;
}

.eyebrow {
  position: relative;
  z-index: 2;
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

h1 {
  position: relative;
  z-index: 2;
  max-width: 900px;
  margin: 22px 0 0;
  font-size: clamp(2.85rem, 5.2vw, 5.4rem);
  font-weight: 850;
  line-height: 0.94;
  letter-spacing: -0.078em;
}

.lead {
  position: relative;
  z-index: 2;
  max-width: 850px;
  margin: 22px 0 0;
  color: var(--muted);
  font-size: 1.08rem;
  line-height: 1.72;
}

.principles {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin-top: 18px;
}

.principles article {
  min-height: 230px;
  padding: 24px;
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.062), rgba(255, 255, 255, 0.022)),
    var(--panel);
}

.number {
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  border: 1px solid rgba(84, 186, 255, 0.27);
  border-radius: 16px;
  color: #dff4ff;
  background: linear-gradient(135deg, rgba(84, 186, 255, 0.17), rgba(143, 115, 255, 0.11));
  font-size: 0.76rem;
  font-weight: 850;
}

h2 {
  margin: 24px 0 9px;
  font-size: 1.18rem;
  letter-spacing: -0.035em;
}

.principles p,
.attribution p {
  margin: 0;
  color: var(--muted);
  line-height: 1.65;
}

.attribution {
  display: grid;
  grid-template-columns: minmax(250px, 0.7fr) minmax(0, 1.3fr);
  align-items: center;
  gap: 36px;
  margin-top: 18px;
  padding: 30px;
}

.attribution h2 {
  margin: 14px 0 0;
}

.attribution a {
  color: var(--blue);
  font-weight: 760;
}

@media (max-width: 850px) {
  .principles,
  .attribution {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 560px) {
  .about-page {
    padding-top: 14px;
  }

  .about-hero {
    min-height: auto;
    padding: 27px 21px;
    border-radius: 22px;
  }

  h1 {
    font-size: clamp(2.45rem, 13vw, 3.5rem);
  }

  .lead {
    font-size: 0.95rem;
  }

  .principles article,
  .attribution {
    border-radius: 22px;
  }
}
</style>
