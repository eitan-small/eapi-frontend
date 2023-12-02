<template>
  <div class="layout">
    <div class="header">
      <NavBar />
    </div>
    <div class="body">
      <div class="menu-wrapper">
        <Menu />
      </div>
      <div>Content</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import NavBar from '@/components/navbar/index.vue';
  import Menu from '@/components/menu/index.vue';
</script>

<style scoped lang="less">
  @nav-size-height: 60px;

  .layout {
    width: 100vw;
    height: 100vh;
  }

  .header {
    width: 100%;
    height: @nav-size-height;
  }

  .body {
    display: inline-flex;
    flex-direction: row;
    height: calc(100vh - @nav-size-height);
  }

  .menu-wrapper {
    height: 100%;
    overflow: auto;
    overflow-x: hidden;

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
  }
</style>
