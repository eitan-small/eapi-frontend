<template>
  <template v-for="menu in props.menuTree">
    <template v-if="menu.meta.type == 1">
      <a-sub-menu :key="menu.name as string">
        <template #icon>
          <component :is="menu.meta.icon" />
        </template>
        <template #title>{{ menu.meta.title }}</template>
        <menu-tree :menu-tree="menu.children"></menu-tree>
      </a-sub-menu>
    </template>
    <template v-else-if="menu.meta.type == 2">
      <a-menu-item :key="menu.name as string" @click="onClickMenu(menu)">
        {{ menu.meta.title }}
      </a-menu-item>
    </template>
  </template>
</template>

<script lang="ts" setup>
  import { RouteRecordNormalized } from 'vue-router';
  import useMenu from '@/hooks/menu';

  const { onClickMenu } = useMenu();

  interface Props {
    menuTree: RouteRecordNormalized[];
  }

  const props = withDefaults(defineProps<Props>(), {
    menuTree: () => [],
  });
</script>

<style lang="less">
  .arco-menu-icon {
    font-size: 18px;
  }
</style>
