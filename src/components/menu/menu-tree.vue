<template>
  <template v-for="menu in props.treeData">
    <template v-if="menu.meta?.type == 1">
      <a-sub-menu :key="menu.name as string">
        <template #icon>
          <Icon :name="menu.meta.icon" />
        </template>
        <template #title>{{ menu.meta.title }}</template>
        <menu-tree :tree-data="menu.children"></menu-tree>
      </a-sub-menu>
    </template>
    <template v-else-if="menu.meta?.type == 2">
      <a-menu-item :key="menu.name as string" @click="onClickMenu(menu)">
        {{ menu.meta.title }}
      </a-menu-item>
    </template>
  </template>
</template>

<script lang="ts" setup>
  import { RouteRecordRaw } from 'vue-router';
  import useMenu from '@/hooks/menu';
  import Icon from '@/components/icon/index.vue';

  const { onClickMenu } = useMenu();

  interface Props {
    treeData: RouteRecordRaw[];
  }

  const props = withDefaults(defineProps<Props>(), {
    treeData: () => [],
  });
</script>

<style lang="less">
  .arco-menu-icon {
    font-size: 18px;
  }
</style>
