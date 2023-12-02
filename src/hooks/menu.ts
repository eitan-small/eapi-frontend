import { RouteRecordNormalized, useRouter } from 'vue-router';

export default function useMenu() {
  const router = useRouter();
  const onClickMenu = (menu: RouteRecordNormalized) => {
    router.push({
      name: menu.name,
    });
  };

  return {
    onClickMenu,
  };
}
