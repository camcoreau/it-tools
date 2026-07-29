<script setup lang="ts">
import { useHead } from '@vueuse/head';

useHead({ title: 'Page not found | CamCore IT Tools' });
</script>

<template>
  <section class="not-found surface">
    <div class="mark">404</div>
    <div class="eyebrow">CamCore IT Tools</div>
    <h1>That utility could not be found.</h1>
    <p>The address may be incorrect, the tool may have moved, or the requested page is no longer available.</p>
    <div class="actions">
      <RouterLink to="/" class="primary">Open utility directory</RouterLink>
      <a href="https://inside.camcore.au">Inside CamCore</a>
      <a href="https://status.camcore.au">Check service status</a>
    </div>
  </section>
</template>

<style scoped lang="less">
.not-found {
  position: relative;
  min-height: 520px;
  display: grid;
  place-content: center;
  overflow: hidden;
  margin-top: 22px;
  padding: 42px;
  border-radius: var(--radius-xl);
  text-align: center;
}

.not-found::after {
  content: "";
  position: absolute;
  width: 520px;
  height: 520px;
  right: -220px;
  bottom: -320px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(84, 186, 255, 0.24), transparent 70%);
}

.mark,
.eyebrow,
h1,
p,
.actions {
  position: relative;
  z-index: 2;
}

.mark {
  width: 86px;
  height: 86px;
  display: grid;
  place-items: center;
  margin: 0 auto 18px;
  border: 1px solid rgba(84, 186, 255, 0.29);
  border-radius: 26px;
  color: #dff4ff;
  background: rgba(84, 186, 255, 0.13);
  font-size: 1.35rem;
  font-weight: 900;
}

.eyebrow {
  color: #9fc4df;
  font-size: 0.72rem;
  font-weight: 850;
  letter-spacing: 0.09em;
  text-transform: uppercase;
}

h1 {
  max-width: 800px;
  margin: 15px auto 0;
  font-size: clamp(2.4rem, 5vw, 4.6rem);
  line-height: 0.98;
  letter-spacing: -0.065em;
}

p {
  max-width: 700px;
  margin: 18px auto 0;
  color: var(--muted);
  font-size: 1rem;
  line-height: 1.65;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-top: 25px;
}

.actions a {
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  padding: 10px 15px;
  border: 1px solid var(--line);
  border-radius: 999px;
  color: var(--text);
  background: rgba(255, 255, 255, 0.06);
  font-size: 0.82rem;
  font-weight: 800;
  text-decoration: none;
}

.actions .primary {
  border-color: rgba(84, 186, 255, 0.55);
  background: linear-gradient(135deg, rgba(84, 186, 255, 0.3), rgba(143, 115, 255, 0.23));
}

@media (max-width: 560px) {
  .not-found {
    min-height: 430px;
    margin-top: 14px;
    padding: 28px 22px;
    border-radius: 22px;
  }
}
</style>
