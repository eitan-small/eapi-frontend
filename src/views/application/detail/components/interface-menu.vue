<template>
  <div class="menu-container">
    <div class="menu-search">
      <a-input class="input-search">
        <template #prefix>
          <Icon name="icon-search" />
        </template>
      </a-input>
      <a-button class="filter-btn">
        <template #icon>
          <Icon name="icon-filter" />
        </template>
      </a-button>
      <a-popover
        position="bl"
        :content-style="{ padding: '4px', width: '256px' }"
      >
        <a-button class="plus-btn">
          <template #icon>
            <Icon name="icon-plus" />
          </template>
        </a-button>
        <template #content>
          <a-doption>
            <template #icon>
              <Icon name="icon-fire" :svg-style="{ color: '#8c78e6' }" />
            </template>
            <template #default>新建接口</template>
          </a-doption>
          <a-doption>
            <template #icon>
              <Icon name="icon-folder-add" :svg-style="{ color: '#8c78e6' }" />
            </template>
            <template #default>新建接口目录</template>
          </a-doption>
        </template>
      </a-popover>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { InterfaceMenu } from '@/api/interface';
  import Icon from '@/components/icon/index.vue';

  interface Props {
    menuData: InterfaceMenu[];
  }

  const props = defineProps<Props>();
</script>

<script setup lang="ts"></script>

<script setup lang="ts"></script>

<style scoped lang="less">
  @activate-color: #8c78e6;

  .menu-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .menu-search {
    display: flex;
    gap: 4px;
    padding: 0 0.5rem;
  }

  .input-search {
    padding-right: 4px;
    border-radius: 5px;

    &:hover {
      border-color: @activate-color;
    }

    &:active {
      border-color: @activate-color;
    }
  }

  .filter-btn {
    padding: 0 10px;
    border-radius: 5px;
  }

  .plus-btn {
    padding: 0 10px;
    background: @activate-color;
    border-radius: 5px;

    &:hover {
      background: #bba0fa;
    }

    &:active {
      background: #7056c7;
    }
  }
</style>
