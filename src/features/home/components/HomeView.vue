<script setup lang="ts">
import { RouterLink } from 'vue-router'
import SkillBadge from './SkillBadge.vue'
import { developer } from '../data/developer'
</script>

<template>
  <main class="home-page">
    <section class="hero">
      <!-- Left column: text content -->
      <div class="hero__content">
        <div class="hero__intro">
          <span class="hero__available">Available for work</span>
        </div>

        <h1 class="hero__name">{{ developer.name }}</h1>
        <h2 class="hero__title">{{ developer.title }}</h2>
        <p class="hero__tagline">{{ developer.tagline }}</p>
        <p class="hero__bio">{{ developer.bio }}</p>

        <!-- Skills -->
        <div class="skills">
          <p class="skills__label">Tech I work with</p>
          <div class="skills__list">
            <SkillBadge
              v-for="skill in developer.skills"
              :key="skill.name"
              :skill="skill"
            />
          </div>
        </div>

        <!-- CTA -->
        <div class="hero__cta">
          <RouterLink :to="developer.contactPath" class="cta-button">
            Get in touch
          </RouterLink>
        </div>
      </div>

      <!-- Right column: visual element -->
      <div class="hero__visual" aria-hidden="true">
        <div class="avatar-card">
          <div class="avatar-card__glow" />
          <div class="avatar-card__inner">
            <div class="avatar-initials">AR</div>
            <div class="avatar-card__geo">
              <div class="geo geo--1" />
              <div class="geo geo--2" />
              <div class="geo geo--3" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
/* =====================================================
   HOME VIEW — Mobile First
   ===================================================== */

.home-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: var(--space-8) var(--space-4);
}

/* ----- Hero section ----- */
.hero {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: var(--space-12);
}

@media (min-width: 1024px) {
  .hero {
    flex-direction: row;
    align-items: center;
    gap: var(--space-16);
  }
}

/* ----- Hero content (left column) ----- */
.hero__content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.hero__intro {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.hero__available {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--font-size-sm);
  color: var(--color-primary);
  font-weight: 500;
}

.hero__available::before {
  content: '';
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: var(--radius-full);
  background-color: var(--color-primary);
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(0.8); }
}

.hero__name {
  font-size: var(--font-size-4xl);
  font-weight: 800;
  color: var(--color-text);
  line-height: 1.1;
  letter-spacing: -0.02em;
}

@media (min-width: 640px) {
  .hero__name {
    font-size: clamp(2.5rem, 5vw, 3.75rem);
  }
}

.hero__title {
  font-size: var(--font-size-xl);
  font-weight: 500;
  color: var(--color-primary);
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

@media (min-width: 640px) {
  .hero__title {
    font-size: var(--font-size-2xl);
  }
}

.hero__tagline {
  font-size: var(--font-size-lg);
  color: var(--color-text);
  font-style: italic;
  line-height: 1.5;
  border-left: 3px solid var(--color-primary);
  padding-left: var(--space-4);
}

@media (min-width: 640px) {
  .hero__tagline {
    font-size: var(--font-size-xl);
  }
}

.hero__bio {
  font-size: var(--font-size-base);
  color: var(--color-text-muted);
  line-height: 1.7;
  max-width: 540px;
}

/* ----- Skills ----- */
.skills {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.skills__label {
  font-size: var(--font-size-xs);
  font-weight: 600;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.skills__list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

/* ----- CTA ----- */
.hero__cta {
  padding-top: var(--space-2);
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

/* ----- Visual / right column ----- */
.hero__visual {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
}

@media (min-width: 1024px) {
  .hero__visual {
    width: 380px;
  }
}

.avatar-card {
  position: relative;
  width: 280px;
  height: 280px;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (min-width: 640px) {
  .avatar-card {
    width: 320px;
    height: 320px;
  }
}

@media (min-width: 1024px) {
  .avatar-card {
    width: 360px;
    height: 360px;
  }
}

/* Glow background */
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

/* Inner card */
.avatar-card__inner {
  position: relative;
  width: 200px;
  height: 200px;
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
    width: 220px;
    height: 220px;
  }
}

/* Avatar initials */
.avatar-initials {
  font-size: 3.5rem;
  font-weight: 800;
  color: var(--color-primary);
  letter-spacing: -0.02em;
  user-select: none;
  background: linear-gradient(135deg, var(--color-primary) 0%, #818cf8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Geometric decoration */
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

/* Top-right square */
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

/* Bottom-left circle */
.geo--2 {
  width: 24px;
  height: 24px;
  bottom: -12px;
  left: -12px;
  background-color: var(--color-primary);
  border-radius: var(--radius-full);
  animation: float2 5s ease-in-out infinite;
}

/* Mid-right dot */
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
</style>
