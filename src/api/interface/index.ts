import axios from 'axios';

export interface InterfaceMenu {
  id: number;
  parentId: number;
  name: string;
  type: number;
  path?: string;
  requestMethod?: string;
  responsiblePersonName?: string;
  appName: string;
  appNameCn: string;
  order: string;
  children?: InterfaceMenu[];
}

export function queryInterfaceMenu(appId?: number) {
  return axios.get<InterfaceMenu[]>('/system/interface/menuList', {
    params: { appId },
  });
}
