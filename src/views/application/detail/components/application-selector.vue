<template>
  <div class="selector-container">
    <a-select
      v-model="value"
      :style="{ width: '223px' }"
      placeholder="请选择应用"
      value-key="id"
      :bordered="false"
      @change="onSelectChange"
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
  import { ApplicationInfo, queryApplicationInfoList } from '@/api/application';
  import { onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';

  const route = useRoute();

  const appList = ref<ApplicationInfo[]>();
  const value = ref();

  const emit = defineEmits<{
    valueChange: [value: ApplicationInfo];
  }>();
  const onSelectChange = (newValue: ApplicationInfo) => {
    // 触发自定义事件，将 value 的新值作为参数传递
    emit('valueChange', newValue);
  };

  onMounted(async () => {
    const res = await queryApplicationInfoList();
    appList.value = res.data;
    value.value = appList.value?.filter(
      (item) => item.id.toString() === route.params.appId,
    );
    if (value.value) {
      emit('valueChange', value.value);
    }
  });
</script>

<style scoped lang="less">
  @activate-color: #8c78e6;

  .selector-container {
    display: flex;
    margin: 8px;
  }
</style>
