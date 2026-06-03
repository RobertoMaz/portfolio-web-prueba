import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/features/home/views/HomePage.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/features/about/views/AboutPage.vue'),
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('@/features/contact/views/ContactPage.vue'),
  },
  // Catch-all: redirect unknown routes to home
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
