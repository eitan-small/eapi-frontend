import { LoginData } from '@/api/user';
import { defineStore } from 'pinia';
import { UserState } from './types';

const useUserStore = defineStore('user', {
  state: (): UserState => ({
    name: undefined,
    avatar: undefined,
    job: undefined,
    organization: undefined,
    location: undefined,
    email: undefined,
    introduction: undefined,
    personalWebsite: undefined,
    jobName: undefined,
    organizationName: undefined,
    locationName: undefined,
    phone: undefined,
    registrationDate: undefined,
    accountId: undefined,
    certification: undefined,
    role: '',
  }),
  actions: {
    async login(loginForm: LoginData) {
      console.log(loginForm);
    },
  },
});

export default useUserStore;
