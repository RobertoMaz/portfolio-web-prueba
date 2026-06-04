<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from '@/shared/components/AppHeader.vue'
</script>

<template>
  <AppHeader />
  <main>
    <RouterView />
  </main>
</template>
