<script setup lang="ts">
import { useHead } from '@vueuse/head';

useHead({ title: 'About | CamCore IT Tools' });
</script>

<template>
  <div class="about-page">
    <section class="about-card">
      <div class="eyebrow">
        CAMCORE INTERNAL SERVICE
      </div>
      <h1>About CamCore IT Tools</h1>
      <p class="lead">
        CamCore IT Tools is a private collection of practical browser-based utilities for
        troubleshooting, networking, development, encoding and everyday system administration.
      </p>

      <div class="principles">
        <article>
          <h2>Private by design</h2>
          <p>Most tools process information directly in your browser rather than uploading it to a third-party service.</p>
        </article>
        <article>
          <h2>One trusted location</h2>
          <p>The service is hosted within CamCore and is intended for devices connected through the CamCore LAN or NetBird.</p>
        </article>
        <article>
          <h2>Built for support</h2>
          <p>Utilities are grouped in one searchable interface so common IT tasks can be completed quickly and consistently.</p>
        </article>
      </div>

      <div class="attribution">
        <h2>Open-source foundation</h2>
        <p>
          This CamCore-branded deployment is based on
          <a href="https://github.com/CorentinTh/it-tools" target="_blank" rel="noopener">IT Tools</a>
          by Corentin Thomasset and remains available under the GNU GPLv3 licence. CamCore maintains
          the branding, deployment configuration and internal service integration in its own fork.
        </p>
      </div>
    </section>
  </div>
</template>

<style scoped lang="less">
.about-page {
  max-width: 940px;
  margin: 0 auto;
  padding: 42px 0 70px;
}

.about-card {
  padding: 38px;
  border: 1px solid rgba(96, 165, 250, 0.2);
  border-radius: 22px;
  background: linear-gradient(145deg, rgba(15, 29, 49, 0.94), rgba(11, 23, 40, 0.9));
  box-shadow: 0 24px 70px rgba(2, 8, 23, 0.22);
  color: #dbeafe;
}

.eyebrow {
  color: #7dd3fc;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.18em;
}

h1 {
  margin: 10px 0 14px;
  color: #fff;
  font-size: clamp(32px, 5vw, 48px);
  line-height: 1.05;
  letter-spacing: -0.035em;
}

.lead {
  max-width: 760px;
  margin: 0;
  color: #c7d8ee;
  font-size: 17px;
  line-height: 1.7;
}

.principles {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin-top: 28px;
}

.principles article,
.attribution {
  border: 1px solid rgba(147, 197, 253, 0.16);
  border-radius: 16px;
  background: rgba(7, 17, 31, 0.46);
}

.principles article {
  padding: 20px;
}

h2 {
  margin: 0 0 8px;
  color: #f8fbff;
  font-size: 17px;
}

p {
  line-height: 1.65;
}

.principles p,
.attribution p {
  margin: 0;
  color: #aebfd5;
}

.attribution {
  margin-top: 14px;
  padding: 22px;
}

a {
  color: #7dd3fc;
  font-weight: 650;
}

@media (max-width: 760px) {
  .about-page {
    padding-top: 20px;
  }

  .about-card {
    padding: 26px 20px;
  }

  .principles {
    grid-template-columns: 1fr;
  }
}
</style>
