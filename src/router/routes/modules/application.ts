import { RouteRecordRaw } from 'vue-router';
import DEFAULT_LAYOUT from '@/layout/default-layout.vue';

const APPLICATION: RouteRecordRaw = {
  path: '/application',
  name: 'application',
  component: DEFAULT_LAYOUT,
  meta: {
    requiresAuth: true,
    order: 0,
    type: 1,
    title: '应用管理',
    icon: 'icon-apps',
  },
  children: [
    {
      path: 'list',
      name: 'Application',
      component: () => import('@/views/application/list/index.vue'),
      meta: {
        requiresAuth: true,
        type: 2,
        title: '应用列表',
      },
    },
  ],
};

export default APPLICATION;
