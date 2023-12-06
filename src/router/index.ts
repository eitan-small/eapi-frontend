import { createRouter, createWebHistory } from 'vue-router';
import NProgress from 'nprogress';
import { REDIRECT_ROUTE_NAME } from '@/router/constants';
import createRouteGuard from './guard';
import appRoutes from './routes';

NProgress.configure({ showSpinner: false });

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: 'login',
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/index.vue'),
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: '/redirect',
      name: 'redirectWrapper',
      component: () => import('@/layout/default-layout.vue'),
      meta: {
        requiresAuth: true,
        hideInMenu: true,
      },
      children: [
        {
          path: '/redirect/:path',
          name: REDIRECT_ROUTE_NAME,
          component: () => import('@/views/redirect/index.vue'),
          meta: {
            requiresAuth: true,
            hideInMenu: true,
          },
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: () => import('@/views/not-found/index.vue'),
    },
    ...appRoutes,
  ],
  scrollBehavior() {
    return { left: 0, top: 0 };
  },
});

createRouteGuard(router);

export default router;
