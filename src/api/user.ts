import axios from 'axios';
import { UserState } from '@/store/modules/user/types';
import { RouteRecordNormalized } from 'vue-router';

export interface LoginData {
  username: string;
  password: string;
}

export interface LoginRes {
  token: string;
}
export function login(data: LoginData) {
  return axios.post<LoginRes>('/api/auth/login', data);
}

export function getUserInfo() {
  return axios.post<UserState>('/api/user/info');
}

export function getMenuList() {
  return axios.post<RouteRecordNormalized[]>('/api/user/menu');
}

export function logout() {
  return axios.post<LoginRes>('/api/user/logout');
}
