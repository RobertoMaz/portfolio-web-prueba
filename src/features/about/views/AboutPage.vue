<script setup lang="ts">
// About page — route "/about"
</script>

<template>
  <main class="about-page">
    <h1 class="about-page__title">About Me</h1>
    <p class="about-page__description">Learn more about who I am and what I do.</p>
  </main>
</template>

<style scoped>
/* =====================================================
   ABOUT PAGE — Mobile First
   ===================================================== */

.about-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--space-4);
}

.about-page__title {
  font-size: var(--font-size-2xl);
  font-weight: 700;
  color: var(--color-text);
}

@media (min-width: 768px) {
  .about-page__title {
    font-size: var(--font-size-4xl);
  }
}

.about-page__description {
  margin-top: var(--space-2);
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}

@media (min-width: 768px) {
  .about-page__description {
    font-size: var(--font-size-base);
  }
}
</style>
