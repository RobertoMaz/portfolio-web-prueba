<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { aboutProfile } from '../data/about'
</script>

<template>
  <main class="about-page">
    <div class="about-container">

      <!-- =============================================
           HERO — Avatar + Bio
           ============================================= -->
      <section class="about-hero">

        <!-- Avatar column -->
        <div class="avatar-wrapper" aria-hidden="true">
          <div class="avatar-card">
            <div class="avatar-card__glow" />
            <div class="avatar-card__inner">
              <div class="avatar-initials">{{ aboutProfile.initials }}</div>
              <div class="avatar-card__geo">
                <div class="geo geo--1" />
                <div class="geo geo--2" />
                <div class="geo geo--3" />
              </div>
            </div>
          </div>
        </div>

        <!-- Bio column -->
        <div class="about-bio">
          <p class="about-bio__label">About me</p>
          <h1 class="about-bio__name">{{ aboutProfile.name }}</h1>
          <h2 class="about-bio__role">{{ aboutProfile.role }}</h2>
          <p class="about-bio__text">{{ aboutProfile.bio }}</p>
          <p class="about-bio__text about-bio__text--secondary">
            {{ aboutProfile.extendedBio }}
          </p>
        </div>
      </section>

      <!-- =============================================
           PERSONAL INFO — key data points
           ============================================= -->
      <section class="about-info" aria-label="Personal information">
        <h3 class="section-title">Quick facts</h3>
        <ul class="info-list">
          <li
            v-for="item in aboutProfile.personalInfo"
            :key="item.label"
            class="info-item"
          >
            <span class="info-item__label">{{ item.label }}</span>
            <span class="info-item__value">{{ item.value }}</span>
          </li>
        </ul>
      </section>

      <!-- =============================================
           VALUES — work philosophy
           ============================================= -->
      <section class="about-values" aria-label="Work philosophy">
        <h3 class="section-title">How I work</h3>
        <div class="values-grid">
          <article
            v-for="value in aboutProfile.values"
            :key="value.title"
            class="value-card"
          >
            <div class="value-card__icon" aria-hidden="true">
              <!-- Code icon -->
              <svg
                v-if="value.icon === 'code'"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="value-icon"
                aria-hidden="true"
              >
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
              <!-- Chat icon -->
              <svg
                v-else-if="value.icon === 'chat'"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="value-icon"
                aria-hidden="true"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              <!-- Rocket icon -->
              <svg
                v-else-if="value.icon === 'rocket'"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="value-icon"
                aria-hidden="true"
              >
                <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                <path d="m3.5 11.5 5 5" />
                <path d="M20.5 3.5A19 19 0 0 0 3.5 20.5" />
                <path d="m9 9 6 6" />
                <circle cx="11.5" cy="12.5" r=".5" fill="currentColor" />
              </svg>
            </div>
            <h4 class="value-card__title">{{ value.title }}</h4>
            <p class="value-card__description">{{ value.description }}</p>
          </article>
        </div>
      </section>

      <!-- =============================================
           CTA — contact section
           ============================================= -->
      <section class="about-cta" aria-label="Call to action">
        <div class="cta-card">
          <h3 class="cta-card__title">Let's build something together</h3>
          <p class="cta-card__text">
            Have a project in mind or just want to say hello? I'm always open to
            new conversations.
          </p>
          <RouterLink :to="aboutProfile.contactPath" class="cta-button">
            Get in touch
          </RouterLink>
        </div>
      </section>

    </div>
  </main>
</template>

<style scoped>
/* =====================================================
   ABOUT PAGE — Mobile First
   ===================================================== */

.about-page {
  min-height: 100vh;
  padding: var(--space-8) var(--space-4);
}

.about-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: var(--space-16);
}

/* =====================================================
   SECTION TITLE — shared heading style
   ===================================================== */
.section-title {
  font-size: var(--font-size-xs);
  font-weight: 600;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  margin-bottom: var(--space-6);
}

/* =====================================================
   HERO — avatar + bio
   ===================================================== */
.about-hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-12);
}

@media (min-width: 1024px) {
  .about-hero {
    flex-direction: row;
    align-items: flex-start;
    gap: var(--space-16);
  }
}

/* ----- Avatar ----- */
.avatar-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
}

.avatar-card {
  position: relative;
  width: 240px;
  height: 240px;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (min-width: 640px) {
  .avatar-card {
    width: 280px;
    height: 280px;
  }
}

@media (min-width: 1024px) {
  .avatar-card {
    width: 320px;
    height: 320px;
  }
}

.avatar-card__glow {
  position: absolute;
  inset: 0;
  border-radius: var(--radius-xl);
  background: radial-gradient(
    ellipse at 50% 50%,
    rgba(6, 182, 212, 0.18) 0%,
    rgba(6, 182, 212, 0.06) 50%,
    transparent 70%
  );
}

.avatar-card__inner {
  position: relative;
  width: 180px;
  height: 180px;
  border-radius: var(--radius-xl);
  background: linear-gradient(
    135deg,
    var(--color-surface) 0%,
    var(--color-surface-alt) 100%
  );
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible;
}

@media (min-width: 640px) {
  .avatar-card__inner {
    width: 200px;
    height: 200px;
  }
}

.avatar-initials {
  font-size: 3.5rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  user-select: none;
  background: linear-gradient(135deg, var(--color-primary) 0%, #818cf8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Geometric decoration — mirrors HomeView */
.avatar-card__geo {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.geo {
  position: absolute;
  border-radius: var(--radius-sm);
  opacity: 0.6;
}

.geo--1 {
  width: 36px;
  height: 36px;
  top: -18px;
  right: -18px;
  background: linear-gradient(135deg, var(--color-primary) 0%, #818cf8 100%);
  border-radius: var(--radius-md);
  transform: rotate(20deg);
  animation: float1 4s ease-in-out infinite;
}

.geo--2 {
  width: 24px;
  height: 24px;
  bottom: -12px;
  left: -12px;
  background-color: var(--color-primary);
  border-radius: var(--radius-full);
  animation: float2 5s ease-in-out infinite;
}

.geo--3 {
  width: 14px;
  height: 14px;
  top: 50%;
  right: -28px;
  transform: translateY(-50%);
  background-color: #818cf8;
  border-radius: var(--radius-full);
  animation: float3 3.5s ease-in-out infinite;
}

@keyframes float1 {
  0%, 100% { transform: rotate(20deg) translateY(0); }
  50% { transform: rotate(25deg) translateY(-6px); }
}

@keyframes float2 {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

@keyframes float3 {
  0%, 100% { transform: translateY(-50%) scale(1); }
  50% { transform: translateY(calc(-50% - 5px)) scale(1.1); }
}

/* ----- Bio ----- */
.about-bio {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.about-bio__label {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--font-size-sm);
  color: var(--color-primary);
  font-weight: 500;
}

.about-bio__label::before {
  content: '';
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: var(--radius-full);
  background-color: var(--color-primary);
}

.about-bio__name {
  font-size: var(--font-size-4xl);
  font-weight: 800;
  color: var(--color-text);
  line-height: 1.1;
  letter-spacing: -0.02em;
}

@media (min-width: 640px) {
  .about-bio__name {
    font-size: clamp(2.5rem, 5vw, 3.75rem);
  }
}

.about-bio__role {
  font-size: var(--font-size-xl);
  font-weight: 500;
  color: var(--color-primary);
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

@media (min-width: 640px) {
  .about-bio__role {
    font-size: var(--font-size-2xl);
  }
}

.about-bio__text {
  font-size: var(--font-size-base);
  color: var(--color-text-muted);
  line-height: 1.7;
  max-width: 600px;
}

.about-bio__text--secondary {
  border-left: 3px solid var(--color-border);
  padding-left: var(--space-4);
  font-style: italic;
}

/* =====================================================
   PERSONAL INFO — key data list
   ===================================================== */
.about-info {
  padding: var(--space-8);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-md);
}

.info-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

@media (min-width: 640px) {
  .info-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-4) var(--space-8);
  }
}

@media (min-width: 1024px) {
  .info-list {
    grid-template-columns: repeat(3, 1fr);
  }
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  padding-bottom: var(--space-4);
  border-bottom: 1px solid var(--color-border);
}

.info-item__label {
  font-size: var(--font-size-xs);
  font-weight: 600;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.info-item__value {
  font-size: var(--font-size-base);
  font-weight: 500;
  color: var(--color-text);
}

/* =====================================================
   VALUES — work philosophy cards
   ===================================================== */
.about-values {
  /* no extra wrapper styles needed */
}

.values-grid {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

@media (min-width: 640px) {
  .values-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-6);
  }
}

@media (min-width: 1024px) {
  .values-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.value-card {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  padding: var(--space-8);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-md);
  transition: border-color var(--transition-base), box-shadow var(--transition-base), transform var(--transition-fast);
}

.value-card:hover {
  border-color: var(--color-primary);
  box-shadow: var(--shadow-lg);
  transform: translateY(-4px);
}

.value-card__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: linear-gradient(
    135deg,
    rgba(6, 182, 212, 0.15) 0%,
    rgba(129, 140, 248, 0.15) 100%
  );
  border: 1px solid rgba(6, 182, 212, 0.3);
  border-radius: var(--radius-lg);
  color: var(--color-primary);
  flex-shrink: 0;
}

.value-icon {
  width: 24px;
  height: 24px;
}

.value-card__title {
  font-size: var(--font-size-lg);
  font-weight: 700;
  color: var(--color-text);
}

.value-card__description {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  line-height: 1.7;
}

/* =====================================================
   CTA — contact call-to-action
   ===================================================== */
.about-cta {
  padding-bottom: var(--space-8);
}

.cta-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: var(--space-6);
  padding: var(--space-12) var(--space-8);
  background: linear-gradient(
    135deg,
    var(--color-surface) 0%,
    var(--color-surface-alt) 100%
  );
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
}

@media (min-width: 768px) {
  .cta-card {
    padding: var(--space-16) var(--space-12);
  }
}

.cta-card__title {
  font-size: var(--font-size-2xl);
  font-weight: 800;
  color: var(--color-text);
  line-height: 1.2;
}

@media (min-width: 768px) {
  .cta-card__title {
    font-size: var(--font-size-3xl);
  }
}

.cta-card__text {
  font-size: var(--font-size-base);
  color: var(--color-text-muted);
  max-width: 480px;
  line-height: 1.7;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: var(--space-3) var(--space-8);
  background-color: var(--color-primary);
  color: var(--color-bg);
  font-weight: 700;
  font-size: var(--font-size-base);
  border-radius: var(--radius-md);
  text-decoration: none;
  transition: background-color var(--transition-base), transform var(--transition-fast), box-shadow var(--transition-base);
  box-shadow: var(--shadow-md);
}

.cta-button:hover {
  background-color: var(--color-primary-hover);
  color: var(--color-bg);
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.cta-button:active {
  transform: translateY(0);
}
</style>
