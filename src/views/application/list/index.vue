<template>
  <div class="app-container">
    <div class="page-header">应用列表</div>
    <div class="page-search">
      <div>
        <span
          class="tab-item"
          :class="{ 'tab-item-active': activeTab === 'all' }"
          @click="changeTab('all')"
          >全部</span
        >
        <span
          class="tab-item"
          :class="{ 'tab-item-active': activeTab === 'mine' }"
          @click="changeTab('mine')"
          >我的</span
        >
      </div>
      <a-input-search placeholder="搜索" style="width: 240px" />
    </div>
    <div class="page-cards">
      <tabCards :tab-cards-data="tabCardsData" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted, ref } from 'vue';
  import { ApplicationInfo, queryApplicationInfoList } from '@/api/application';
  import useUserStore from '@/store/modules/user/index';
  import tabCards from './components/tab-cards.vue';

  const userStore = useUserStore();
  const activeTab = ref('all');
  const appInfoList = ref<ApplicationInfo[]>([]);

  const tabCardsData = computed(() => {
    if (activeTab.value === 'all') {
      return appInfoList.value;
    }
    return appInfoList.value.filter(
      (appInfo) => appInfo.creator === userStore.userId?.toString(),
    );
  });

  const queryApplicationList = async () => {
    const result = await queryApplicationInfoList();
    appInfoList.value = result.data;
  };

  const changeTab = (tab: string) => {
    activeTab.value = tab;
  };

  onMounted(() => {
    queryApplicationList();
  });
</script>

<script lang="ts">
  export default {
    name: 'Application', // If you want the include property of keep-alive to take effect, you must name the component
  };
</script>

<style scoped lang="less">
  .app-container {
    height: 100%;
    background-color: var(--color-bg-1);
  }

  .page-header {
    padding: 20px;
    font-size: 20px;
  }

  .page-search {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
  }

  .tab-item {
    margin: 0 5px;
    padding: 5px 15px;
    border-radius: 32px;
    cursor: pointer;

    &:hover {
      background-color: var(--color-border-2);
    }
  }

  .tab-item-active {
    color: rgb(var(--primary-6));
    background-color: var(--color-border-2);
  }

  .page-cards {
    padding: 20px;
  }
</style>
