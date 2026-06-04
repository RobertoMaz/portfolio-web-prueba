<script setup lang="ts">
import type { Skill } from '../data/developer'

interface Props {
  skill: Skill
}

defineProps<Props>()
</script>

<template>
  <span class="skill-badge">
    {{ skill.name }}
  </span>
</template>

<style scoped>
.skill-badge {
  display: inline-block;
  padding: var(--space-2) var(--space-4);
  background-color: var(--color-surface);
  color: var(--color-primary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  font-weight: 600;
  letter-spacing: 0.025em;
  transition: background-color var(--transition-fast), border-color var(--transition-fast), transform var(--transition-fast);
  cursor: default;
}

.skill-badge:hover {
  background-color: var(--color-surface-alt);
  border-color: var(--color-primary);
  transform: translateY(-1px);
}
</style>
