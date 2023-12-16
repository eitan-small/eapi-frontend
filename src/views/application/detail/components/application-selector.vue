<template>
  <div class="selector-container">
    <a-select
      v-model="value"
      :style="{ width: '223px' }"
      placeholder="请选择应用"
      value-key="id"
      :bordered="false"
      @change="handlerChange"
    >
      <a-option
        v-for="item of appList"
        :key="item.id"
        :value="item"
        :label="item.appName"
      />
    </a-select>
  </div>
</template>

<script setup lang="ts">
  import {
    ApplicationInfo,
    queryApplicationInfoList,
  } from '@/api/application/index';
  import { onMounted, ref } from 'vue';
  import { useRouter, useRoute } from 'vue-router';

  const router = useRouter();
  const route = useRoute();

  const appList = ref<ApplicationInfo[]>();
  const value = ref();

  const handlerChange = () => {
    router.push({
      name: 'ApplicationDetail',
      params: {
        appId: value.value.id,
      },
    });
  };

  onMounted(async () => {
    const res = await queryApplicationInfoList();
    appList.value = res.data;
    value.value = appList.value?.filter(
      (item) => item.id.toString() === route.params.appId,
    );
  });
</script>

<style scoped lang="less">
  @activate-color: #8c78e6;

  .selector-container {
    display: flex;
    margin: 8px;
  }
</style>
