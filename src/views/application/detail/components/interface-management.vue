<template>
  <a-split :style="{ width: '100%' }" default-size="280px" max="800px">
    <template #first>
      <div class="left-panel">
        <div class="selector-container">
          <a-select
            v-model="selectorValue"
            :style="{ width: '223px' }"
            placeholder="请选择应用"
            value-key="id"
            :bordered="false"
          >
            <a-option
              v-for="item of appList"
              :key="item.id"
              :value="item"
              :label="item.appName"
            />
          </a-select>
        </div>
        <Menu :app-id="selectorValue?.id" @active-tag="activeTag" />
      </div>
    </template>
    <template #resize-trigger>
      <div class="resize-trigger"></div>
    </template>
    <template #second>
      <div class="right-panel">
        <InterfacePanel ref="panelRef" :app-id="selectorValue?.id" />
      </div>
    </template>
  </a-split>
</template>

<script setup lang="ts">
  import { ApplicationInfo, queryApplicationInfoList } from '@/api/application';
  import { onMounted, ref } from 'vue';
  import { InterfaceMenu } from '@/api/interface';
  import { useRoute } from 'vue-router';
  import Menu from './interface-menu.vue';
  import InterfacePanel from './interface-panel.vue';

  const route = useRoute();

  const appList = ref<ApplicationInfo[]>();
  const selectorValue = ref();

  const panelRef = ref();

  const activeTag = (tag: InterfaceMenu) => {
    panelRef.value.activeTag(tag);
  };

  onMounted(async () => {
    const res = await queryApplicationInfoList();
    appList.value = res.data;
    selectorValue.value = appList.value?.find(
      (item) => item.id.toString() === route.params.appId,
    );
  });
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
    overflow-x: hidden;
    background: #fcfcfd;
    user-select: none;
  }

  .right-panel {
    height: 100%;
    background: #fff;
    user-select: none;
  }

  .selector-container {
    display: flex;
    margin: 8px;
  }
</style>
