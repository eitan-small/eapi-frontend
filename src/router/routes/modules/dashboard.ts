import { RouteRecordRaw } from 'vue-router';
import DEFAULT_LAYOUT from '@/layout/default-layout.vue';

const DASHBOARD: RouteRecordRaw = {
  path: '/dashboard',
  name: 'dashboard',
  component: DEFAULT_LAYOUT,
  meta: {
    requiresAuth: true,
    order: 0,
  },
  children: [
    {
      path: 'workplace',
      name: 'Workplace',
      component: () => import('@/views/dashboard/workplace/index.vue'),
      meta: {
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default DASHBOARD;
