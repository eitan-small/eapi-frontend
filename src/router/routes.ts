import { RouteRecordRaw } from 'vue-router';

const constantRoute: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
  },
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home/index.vue'),
  },
  {
    path: '/not-found',
    name: 'not-found',
    component: () => import('@/views/not-found/index.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'any',
    redirect: '/not-found',
  },
];

export default constantRoute;
