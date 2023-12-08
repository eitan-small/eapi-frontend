<template>
  <div class="layout">
    <div class="header">
      <NavBar />
    </div>
    <div class="body">
      <Menu />
      <div class="content">
        <TabBar />
        <div class="page-layout">
          <router-view v-slot="{ Component, route }">
            <transition name="fade" mode="out-in" appear>
              <keep-alive :include="cacheList">
                <component :is="Component" :key="route.fullPath" />
              </keep-alive>
            </transition>
          </router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import NavBar from '@/components/navbar/index.vue';
  import Menu from '@/components/menu/index.vue';
  import TabBar from '@/components/tab-bar/index.vue';
  import { computed } from 'vue';
  import { useTabBarStore } from '@/store';

  const tabBarStore = useTabBarStore();

  const cacheList = computed(() => tabBarStore.getCacheList);
</script>

<style scoped lang="less">
  @nav-size-height: 60px;
  @tab-size-height: 56px;

  .layout {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }

  .header {
    width: 100%;
    height: @nav-size-height;
  }

  .body {
    display: inline-flex;
    flex-direction: row;
    width: 100vw;
    height: calc(100vh - @nav-size-height);
  }

  .content {
    width: 100%;
    background-color: rgb(var(--gray-3));
  }

  .page-layout {
    height: calc(100vh - @nav-size-height - @tab-size-height);
    padding: 0 20px;
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 15px;
      height: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: var(--color-text-4);
      background-clip: padding-box;
      border: 4px solid transparent;
      border-radius: 7px;
    }

    &::-webkit-scrollbar-thumb:hover {
      background-color: var(--color-text-3);
    }
  }

  :deep(.arco-menu) {
    ::-webkit-scrollbar {
      width: 12px;
      height: 4px;
    }

    ::-webkit-scrollbar-thumb {
      background-color: var(--color-text-4);
      background-clip: padding-box;
      border: 4px solid transparent;
      border-radius: 7px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background-color: var(--color-text-3);
    }
  }
</style>
