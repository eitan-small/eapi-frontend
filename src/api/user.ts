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
  return axios.post<LoginRes>('/system/user/login', data);
}

export function getUserInfo() {
  return axios.post<UserState>('/system/user/info');
}

export function getMenuList() {
  return axios.post<RouteRecordNormalized[]>('/system/menu/list');
}

export function logout() {
  return axios.post<LoginRes>('/system/user/logout');
}
