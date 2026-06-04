<script setup lang="ts">
// Contact page — route "/contact"
</script>

<template>
  <main class="contact-page">
    <h1 class="contact-page__title">Contact</h1>
    <p class="contact-page__description">Get in touch with me.</p>
  </main>
</template>

<style scoped>
/* =====================================================
   CONTACT PAGE — Mobile First
   ===================================================== */

.contact-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--space-4);
}

.contact-page__title {
  font-size: var(--font-size-2xl);
  font-weight: 700;
  color: var(--color-text);
}

@media (min-width: 768px) {
  .contact-page__title {
    font-size: var(--font-size-4xl);
  }
}

.contact-page__description {
  margin-top: var(--space-2);
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}

@media (min-width: 768px) {
  .contact-page__description {
    font-size: var(--font-size-base);
  }
}
</style>
