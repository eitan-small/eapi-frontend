<template>
  <div class="panel-container">
    <a-tabs
      v-model:active-key="activeKey"
      type="card"
      size="large"
      :editable="true"
      show-add-button
      auto-switch
      justify
      destroy-on-hide
      @add="handleAdd"
      @delete="handleDelete"
    >
      <a-tab-pane v-for="item of data" :key="item.id">
        <template #title>
          <div class="tab-title">
            <div
              class="request-method"
              :style="getRequestMethodStyle(item.requestMethod as string)"
            >
              {{ getRequestMethodLabel(item.requestMethod as string) }}
            </div>
            <a-typography-paragraph
              :style="{
                margin: '0 0 0 5px',
                maxWidth: `100px`,
                minWidth: '100px',
              }"
              :ellipsis="{
                rows: 1,
                showTooltip: true,
              }"
            >
              {{ item.name }}
            </a-typography-paragraph>
          </div>
        </template>
        <InterfacePanelDetail :tag-info="item" />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { InterfaceMenu } from '@/api/interface';
  import { getRequestMethodLabel, getRequestMethodStyle } from './constants';
  import InterfacePanelDetail from './interface-panel-detail.vue';

  interface Props {
    appId?: number;
  }

  const props = defineProps<Props>();
  const data = ref<InterfaceMenu[]>([]);
  const activeKey = ref<number>();

  const addTag = (tag: InterfaceMenu) => {
    // 判断标签是否已存在
    const idExisting = data.value.find(
      (existingTag) => existingTag.id === tag.id,
    );

    // 如果标签不存在，则添加
    if (!idExisting) {
      data.value.push(tag);
    }
  };

  const activeTag = (tag: InterfaceMenu) => {
    addTag(tag);
    activeKey.value = tag.id;
  };
  // 使用 defineExpose 向外暴露指定的数据和方法
  defineExpose({
    activeTag,
  });

  const handleAdd = () => {
    const tag = {
      id: Date.now(),
      requestMethod: 'GET',
      name: '新建接口',
      // 表示新建接口，暂存未入库
      type: 0,
    } as InterfaceMenu;
    addTag(tag);
  };

  const handleDelete = (id: number) => {
    data.value = data.value.filter((item) => item.id !== id);
  };
</script>

<style scoped lang="less">
  .panel-container {
    width: 100%;
    height: 100%;

    :deep(.arco-tabs-nav-tab) {
      padding: 8px 8px 0;
      background-color: #fcfcfd;
    }

    :deep(.arco-tabs-tab) {
      padding-bottom: 9px;
      color: var(--color-text-3);
      border: none;

      &.arco-tabs-tab-active {
        color: var(--color-text-1);
        background-color: var(--color-bg-1);
      }
    }

    :deep(.arco-tabs-content) {
      border: none;
    }
  }

  .tab-title {
    display: flex;
  }
</style>
