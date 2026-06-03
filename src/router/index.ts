import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/features/home/components/HomeView.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/features/about/components/AboutView.vue'),
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('@/features/contact/components/ContactView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
