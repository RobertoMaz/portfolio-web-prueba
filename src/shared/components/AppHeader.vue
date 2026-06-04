<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, RouterLink } from 'vue-router'

interface NavLink {
  label: string
  to: string
}

const navLinks: NavLink[] = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

const isMenuOpen = ref<boolean>(false)
const route = useRoute()

function toggleMenu(): void {
  isMenuOpen.value = !isMenuOpen.value
}

function closeMenu(): void {
  isMenuOpen.value = false
}

// Close mobile menu on route change
watch(
  () => route.path,
  () => {
    closeMenu()
  },
)
</script>

<template>
  <header class="app-header">
    <div class="header-inner">
      <!-- Logo / Brand -->
      <RouterLink to="/" class="brand" @click="closeMenu">
        Alex Rivera
      </RouterLink>

      <!-- Desktop navigation -->
      <nav class="nav-desktop" aria-label="Main navigation">
        <RouterLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="nav-link"
          active-class="nav-link--active"
          exact-active-class="nav-link--active"
        >
          {{ link.label }}
        </RouterLink>
      </nav>

      <!-- Hamburger button (mobile only) -->
      <button
        class="hamburger"
        type="button"
        :aria-expanded="isMenuOpen"
        aria-controls="mobile-menu"
        aria-label="Toggle navigation menu"
        @click="toggleMenu"
      >
        <span class="hamburger-bar" :class="{ 'bar--open-1': isMenuOpen }" />
        <span class="hamburger-bar" :class="{ 'bar--open-2': isMenuOpen }" />
        <span class="hamburger-bar" :class="{ 'bar--open-3': isMenuOpen }" />
      </button>
    </div>

    <!-- Mobile menu -->
    <nav
      id="mobile-menu"
      class="nav-mobile"
      :class="{ 'nav-mobile--open': isMenuOpen }"
      aria-label="Mobile navigation"
    >
      <RouterLink
        v-for="link in navLinks"
        :key="link.to"
        :to="link.to"
        class="nav-mobile-link"
        active-class="nav-mobile-link--active"
        exact-active-class="nav-mobile-link--active"
        @click="closeMenu"
      >
        {{ link.label }}
      </RouterLink>
    </nav>
  </header>
</template>

<style scoped>
/* =====================================================
   APP HEADER — Mobile First
   ===================================================== */

.app-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  box-shadow: var(--shadow-md);
}

/* Inner container: logo + hamburger on mobile */
.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-4) var(--space-6);
  max-width: 1280px;
  margin: 0 auto;
  width: 100%;
}

/* =====================================================
   BRAND / LOGO
   ===================================================== */
.brand {
  font-size: var(--font-size-xl);
  font-weight: 700;
  color: var(--color-text);
  text-decoration: none;
  letter-spacing: -0.025em;
  transition: color var(--transition-fast);
  white-space: nowrap;
}

.brand:hover {
  color: var(--color-primary);
}

/* =====================================================
   DESKTOP NAVIGATION — hidden on mobile
   ===================================================== */
.nav-desktop {
  display: none;
  align-items: center;
  gap: var(--space-8);
}

/* =====================================================
   NAV LINK (desktop)
   ===================================================== */
.nav-link {
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--color-text-muted);
  text-decoration: none;
  padding-bottom: var(--space-1);
  border-bottom: 2px solid transparent;
  transition:
    color var(--transition-fast),
    border-color var(--transition-fast);
}

.nav-link:hover {
  color: var(--color-text);
}

.nav-link--active {
  color: var(--color-primary);
  border-bottom-color: var(--color-primary);
}

/* =====================================================
   HAMBURGER BUTTON — visible on mobile only
   ===================================================== */
.hamburger {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 44px;
  height: 44px;
  padding: 12px 10px;
  background: transparent;
  border: none;
  cursor: pointer;
  border-radius: var(--radius-md);
  transition: background-color var(--transition-fast);
}

.hamburger:hover {
  background-color: var(--color-surface-alt);
}

.hamburger-bar {
  display: block;
  width: 100%;
  height: 2px;
  background-color: var(--color-text);
  border-radius: var(--radius-full);
  transition: transform var(--transition-base), opacity var(--transition-base);
  transform-origin: center;
}

/* Animated state: X icon */
.bar--open-1 {
  transform: translateY(6px) rotate(45deg);
}

.bar--open-2 {
  opacity: 0;
  transform: scaleX(0);
}

.bar--open-3 {
  transform: translateY(-6px) rotate(-45deg);
}

/* =====================================================
   MOBILE MENU
   ===================================================== */
.nav-mobile {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  max-height: 0;
  transition: max-height var(--transition-base), padding var(--transition-base);
  border-top: 1px solid transparent;
}

.nav-mobile--open {
  max-height: 240px;
  border-top-color: var(--color-border);
  padding-bottom: var(--space-4);
}

/* =====================================================
   MOBILE NAV LINK
   ===================================================== */
.nav-mobile-link {
  display: block;
  padding: var(--space-3) var(--space-6);
  font-size: var(--font-size-base);
  font-weight: 500;
  color: var(--color-text-muted);
  text-decoration: none;
  transition: color var(--transition-fast), background-color var(--transition-fast);
}

.nav-mobile-link:hover {
  color: var(--color-text);
  background-color: var(--color-surface-alt);
}

.nav-mobile-link--active {
  color: var(--color-primary);
  background-color: var(--color-surface-alt);
  border-left: 3px solid var(--color-primary);
  padding-left: calc(var(--space-6) - 3px);
}

/* =====================================================
   DESKTOP BREAKPOINT — md: 768px+
   ===================================================== */
@media (min-width: 768px) {
  .nav-desktop {
    display: flex;
  }

  .hamburger {
    display: none;
  }

  .nav-mobile {
    display: none !important;
  }
}
</style>
