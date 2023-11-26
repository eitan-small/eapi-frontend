import {
  LoginData,
  login as userLogin,
  logout as userLogout,
  getUserInfo,
} from '@/api/user';
import { defineStore } from 'pinia';
import { clearToken, setToken } from '@/utils/auth';
import { UserState } from './types';
import useAppStore from '../app';

const useUserStore = defineStore('user', {
  state: (): UserState => ({
    userId: undefined,
    username: undefined,
    nickname: undefined,
    email: undefined,
    mobile: undefined,
    sex: undefined,
    avatar: undefined,
    loginIp: undefined,
    loginDate: undefined,
    roles: undefined,
  }),
  actions: {
    // Set user's information
    setInfo(partial: Partial<UserState>) {
      this.$patch(partial);
    },

    // Reset user's information
    resetInfo() {
      this.$reset();
    },

    // Get user's information
    async info() {
      const res = await getUserInfo();
      this.setInfo(res.data);
    },

    // Login
    async login(loginForm: LoginData) {
      try {
        const res = await userLogin(loginForm);
        setToken(res.data.token);
      } catch (err) {
        clearToken();
        throw err;
      }
    },

    // Logout
    async logout() {
      try {
        await userLogout();
      } finally {
        this.logoutCallBack();
      }
    },
    logoutCallBack() {
      const appStore = useAppStore();
      this.resetInfo();
      clearToken();
      appStore.clearServerMenu();
    },
  },
});

export default useUserStore;
