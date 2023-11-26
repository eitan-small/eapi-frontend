import { createRouter, createWebHistory } from 'vue-router';
import NProgress from 'nprogress';
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