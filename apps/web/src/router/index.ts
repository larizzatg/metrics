import { createRouter, createWebHistory } from 'vue-router'

import { MetricsRoutes } from '@/domains/metrics/routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...MetricsRoutes],
})

export default router
