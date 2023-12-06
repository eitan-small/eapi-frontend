<template>
  <div
    ref="tabScrollbarRef"
    class="tab-bar-container"
    @mousedown="handleMouseDown"
    @mousemove="handleMouseMove"
    @mouseup="handleMouseUp"
    @mouseleave="handleMouseUp"
  >
    <tab-item
      v-for="(tag, index) in tagList"
      :key="tag.fullPath"
      :index="index"
      :item-data="tag"
    />

    <div class="tag-bar-operation"></div>
  </div>
</template>

<script lang="ts" setup>
  import { computed, onUnmounted, ref } from 'vue';
  import {
    listenerRouteChange,
    removeRouteListener,
  } from '@/utils/route-listener';
  import { useTabBarStore } from '@/store';
  import { RouteLocationNormalized } from 'vue-router';
  import TabItem from './tab-item.vue';

  const tabBarStore = useTabBarStore();
  const tabScrollbarRef = ref();

  const tagList = computed(() => {
    return tabBarStore.getTabList;
  });

  let isDragging = false;
  let startX = 0;
  let scrollLeft = 0;

  // 完成拖拽 tab-item 滚动功能
  function handleMouseDown(event: { clientX: number }) {
    isDragging = true;
    startX = event.clientX;
    scrollLeft = tabScrollbarRef.value.scrollLeft;
  }

  function handleMouseMove(event: { clientX: number }) {
    if (!isDragging) return;
    const deltaX = event.clientX - startX;
    tabScrollbarRef.value.scrollLeft = scrollLeft - deltaX;
  }

  function handleMouseUp() {
    isDragging = false;
  }

  listenerRouteChange((route: RouteLocationNormalized) => {
    if (
      !tagList.value.some((tag) => tag.fullPath === route.fullPath) &&
      // 重新加载时，重定向页面不加入TabList
      route.name !== 'redirect'
    ) {
      tabBarStore.updateTabList(route);
    }
  }, true);

  onUnmounted(() => {
    removeRouteListener();
  });
</script>

<style scoped lang="less">
  .tab-bar-container {
    display: flex;
    margin: 10px;
    overflow-x: auto;
  }

  ::-webkit-scrollbar {
    display: none;
  }
</style>
