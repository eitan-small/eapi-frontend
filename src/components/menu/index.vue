<template>
  <div class="menu">
    <a-menu
      v-model:open-keys="openKeys"
      v-model:selected-keys="selectedKey"
      style="width: 220px; height: 100%"
      show-collapse-button
      :level-indent="34"
      breakpoint="xl"
      auto-open-selected
    >
      <MenuTree :tree-data="treeData" />
    </a-menu>
  </div>
</template>

<script setup lang="ts">
  import { useAppStore } from '@/store';
  import { computed, ref } from 'vue';
  import { listenerRouteChange } from '@/utils/route-listener';
  import { RouteRecordRaw } from 'vue-router';
  import MenuTree from './menu-tree.vue';

  const appStore = useAppStore();

  const treeData = computed(() => {
    return appStore.appAsyncMenus;
  });

  const openKeys = ref<string[]>([]);
  const selectedKey = ref<string[]>([]);

  const findMenuOpenKeys = (target: string) => {
    const result: string[] = [];
    let isFind = false;
    const backtrack = (item: RouteRecordRaw, keys: string[]) => {
      if (item.name === target) {
        isFind = true;
        result.push(...keys);
        return;
      }
      if (item.children?.length) {
        item.children.forEach((el) => {
          backtrack(el, [...keys, el.name as string]);
        });
      }
    };
    treeData.value.forEach((el: RouteRecordRaw) => {
      if (isFind) return; // Performance optimization
      backtrack(el, [el.name as string]);
    });
    return result;
  };

  listenerRouteChange((newRoute) => {
    const menuOpenKeys = findMenuOpenKeys(newRoute.name as string);
    console.log(menuOpenKeys);
    const keySet = new Set([...menuOpenKeys, ...openKeys.value]);
    openKeys.value = [...keySet];
    selectedKey.value = [menuOpenKeys[menuOpenKeys.length - 1]];
  }, true);
</script>

<style scoped>
  .menu {
    box-sizing: border-box;
    height: 100%;
    background-color: var(--color-neutral-2);
  }
</style>
