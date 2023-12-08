<template>
  <div class="menu">
    <a-menu
      style="width: 220px; height: 100%"
      show-collapse-button
      :level-indent="34"
      breakpoint="xl"
    >
      <MenuTree :tree-data="treeData" />
    </a-menu>
  </div>
</template>

<script setup lang="ts">
  import { useAppStore } from '@/store';
  import { computed } from 'vue';
  import MenuTree from './menu-tree.vue';

  const appStore = useAppStore();

  const treeData = computed(() => {
    return appStore.appAsyncMenus;
  });
</script>

<style scoped>
  .menu {
    box-sizing: border-box;
    height: 100%;
    background-color: var(--color-neutral-2);
  }
</style>
