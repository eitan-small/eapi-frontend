<template>
  <a-split :style="{ width: '100%' }" default-size="240px" max="800px">
    <template #first>
      <div class="left-panel">
        <application-selector />
      </div>
    </template>
    <template #resize-trigger>
      <div class="resize-trigger"></div>
    </template>
    <template #second>
      <div class="right-panel">RIGHT</div>
    </template>
  </a-split>
</template>

<script setup lang="ts">
  import ApplicationSelector from './application-selector.vue';
</script>

<style scoped lang="less">
  @activate-color: #8c78e6;

  .resize-trigger {
    width: 2px;
    height: 100%;
    background: #f2f4f7;
    cursor: col-resize;

    &:hover {
      background: @activate-color;
    }
  }

  .left-panel {
    display: flex;
    flex-direction: column;
    height: 100%;
    background: #fcfcfd;
    user-select: none;
  }

  .right-panel {
    height: 100%;
    background: #fff;
    user-select: none;
  }
</style>
