import type { RouteRecordNormalized } from 'vue-router';

export interface AppState {
  menuFromServer: boolean;
  serverMenu: RouteRecordNormalized[];
}
