import { RouteRecordRaw, useRouter } from 'vue-router';

export default function useMenu() {
  const router = useRouter();
  const onClickMenu = (menu: RouteRecordRaw) => {
    router.push({
      name: menu.name,
    });
  };

  return {
    onClickMenu,
  };
}
