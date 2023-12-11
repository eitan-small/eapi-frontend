import { defineStore } from 'pinia';
import { Notification } from '@arco-design/web-vue';
import { RouteRecordNormalized } from 'vue-router';
import type { NotificationReturn } from '@arco-design/web-vue/es/notification/interface';
import appRoutes from '@/router/routes';
import { getMenuList } from '@/api/user';
import { AppState } from './types';

const defaultSettings: AppState = {
  menuFromServer: true,
  serverMenu: [],
};

const useAppStore = defineStore('app', {
  state: (): AppState => ({ ...defaultSettings }),

  getters: {
    appAsyncMenus(state: AppState): RouteRecordNormalized[] {
      if (state.menuFromServer) {
        return state.serverMenu as unknown as RouteRecordNormalized[];
      }
      return appRoutes;
    },
  },

  actions: {
    async fetchServerMenuConfig() {
      let notifyInstance: NotificationReturn | null = null;
      try {
        notifyInstance = Notification.info({
          id: 'menuNotice', // Keep the instance id the same
          content: 'loading',
          closable: true,
        });
        const { data } = await getMenuList();
        this.serverMenu = data;
        notifyInstance = Notification.success({
          id: 'menuNotice',
          content: 'success',
          closable: true,
        });
      } catch (error) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        notifyInstance = Notification.error({
          id: 'menuNotice',
          content: 'error',
          closable: true,
        });
      }
    },
    clearServerMenu() {
      this.serverMenu = [];
    },
  },
});

export default useAppStore;
