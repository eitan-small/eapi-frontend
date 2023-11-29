<template>
  <a-layout class="layout">
    <a-layout-header class="layout-navbar">
      <NavBar />
    </a-layout-header>
    <a-layout>
      <a-layout-sider>Sider</a-layout-sider>
      <a-layout-content>Content</a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
  import NavBar from '@/components/navbar/index.vue';
</script>

<style scoped lang="less">
  @nav-size-height: 60px;

  .layout {
    width: 100vw;
    height: 100vh;
  }

  .layout-navbar {
    width: 100%;
    height: @nav-size-height;
  }
</style>
