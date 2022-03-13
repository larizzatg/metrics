import { createRouter, createWebHistory } from 'vue-router'
import Timeline from '../views/Timeline.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'timeline',
      component: Timeline,
    },
  ],
})

export default router
