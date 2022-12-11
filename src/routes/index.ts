import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/home/index.vue'),
    },
    {
      path: '/program',
      name: 'program',
      component: () => import('@/pages/program/index.vue'),
    },
    {
      path: '/model',
      name: 'model',
      component: () => import('@/pages/model/index.vue'),
    },
  ],
})

export default router
