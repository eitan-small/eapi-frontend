<template>
  <div class="detail-container">
    <div class="tabs-container">
      <div
        class="svg-wrapper"
        @mouseover="changeIconName"
        @mouseout="resetIconName"
        @click="goto()"
      >
        <Icon :name="iconName" class="logo-svg" />
      </div>
      <div
        class="tab-wrapper"
        :class="{ 'active-tab': activeTab === 'Interfaces' }"
        @click="activateTab('InterfaceManagement')"
      >
        <Icon
          name="icon-share-alt"
          :svg-style="{ fontSize: '24px', color: '#86909C' }"
        />
        <a-typography-paragraph>接口管理</a-typography-paragraph>
      </div>
      <div
        class="tab-wrapper"
        :class="{ 'active-tab': activeTab === 'settings' }"
        @click="activateTab('settings')"
      >
        <Icon
          name="icon-settings"
          :svg-style="{ fontSize: '24px', color: '#86909C' }"
        />
        <a-typography-paragraph>应用设置</a-typography-paragraph>
      </div>
    </div>
    <component :is="componentMap[activeTab]" />
  </div>
</template>

<script setup lang="ts">
  import Icon from '@/components/icon/index.vue';
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import InterfaceManagement from './components/interface-management.vue';

  const router = useRouter();
  const iconName = ref('Pokemon');
  const activeTab = ref('InterfaceManagement');

  const componentMap: any = {
    InterfaceManagement,
  };

  const changeIconName = () => {
    iconName.value = 'icon-home';
  };
  const resetIconName = () => {
    iconName.value = 'Pokemon';
  };

  const goto = () => {
    router.push({ name: 'Application' });
  };

  const activateTab = (tab: string) => {
    // 切换激活状态
    activeTab.value = tab;
  };
</script>

<script lang="ts">
  export default {
    name: 'ApplicationDetail', // If you want the include property of keep-alive to take effect, you must name the component
  };
</script>

<style scoped lang="less">
  @activate-tab-color: #8c78e6;

  .detail-container {
    display: flex;
    height: 100%;
    background-color: var(--color-bg-1);
  }

  .tabs-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 72px;
    height: 100%;
    padding: 0 4px;
    background-color: #f9fafb;
  }

  .svg-wrapper {
    height: 64px;
    margin-bottom: 12px;
  }

  .logo-svg {
    width: 40px;
    height: 40px;
    margin: 16px 0;
    padding: 8px;
    background-color: #fff;
    border-radius: 12px;
  }

  .tab-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 65px;
    height: 64px;
    margin-bottom: 12px;
    border-radius: 10px;
    cursor: pointer;
    user-select: none;

    &:hover {
      background-color: rgb(147 115 238 / 8%);
    }

    .arco-typography {
      margin: 0;
    }

    /* 激活状态的背景色 */
    &.active-tab {
      color: @activate-tab-color;

      .arco-typography {
        color: @activate-tab-color;
      }
    }
  }
</style>
