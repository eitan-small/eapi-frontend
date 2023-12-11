import axios from 'axios';

export interface ApplicationInfo {
  id: number;
  appName: string;
  appDescription?: string;
  appIp?: string;
  appPort?: number;
  appNameCn: string;
  ownerName?: string;
  ownerPhone?: string;
  creator: string;
}

export function queryApplicationInfoList() {
  return axios.post<ApplicationInfo[]>('/system/appTable/list');
}
