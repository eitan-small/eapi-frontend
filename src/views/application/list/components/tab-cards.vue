<template>
  <a-row class="list-row" :gutter="24">
    <a-col :xs="12" :sm="12" :md="12" :lg="6" :xl="6" :xxl="6" class="list-col">
      <div class="card-wrap empty-wrap">
        <a-card hoverable>
          <a-result :status="null" title="点击创建应用">
            <template #icon>
              <Icon name="icon-plus" svg-style="font-size: 20px" />
            </template>
          </a-result>
        </a-card>
      </div>
    </a-col>
    <a-col
      v-for="item in tabCardsData"
      :key="item.id"
      class="list-col"
      :xs="12"
      :sm="12"
      :md="12"
      :lg="6"
      :xl="6"
      :xxl="6"
    >
      <div class="card-wrap">
        <a-card hoverable>
          <a-card-meta>
            <template #title>
              <div>{{ item.appNameCn }}</div>
              <div style="margin-top: 6px; font-size: 10px">
                {{ item.appName }}
              </div>
            </template>
            <template #description>
              <a-descriptions :column="{ xs: 1, md: 2, lg: 2 }">
                <a-descriptions-item label="负责人" :span="item.span ?? 1">
                  {{ item.ownerName }}
                </a-descriptions-item>
                <a-descriptions-item label="联系电话" :span="item.span ?? 1">
                  {{ item.ownerPhone }}
                </a-descriptions-item>
              </a-descriptions>
              <a-typography-paragraph
                :ellipsis="{
                  rows: 2,
                  showTooltip: true,
                }"
                style="height: 40px; margin: 0"
              >
                {{ item.appDescription }}
              </a-typography-paragraph>
            </template>
            <template #avatar>
              <a-button type="outline">查看详情</a-button>
            </template>
          </a-card-meta>
        </a-card>
      </div>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
  import Icon from '@/components/icon/index.vue';
  import { ApplicationInfo } from '@/api/application';

  interface Props {
    tabCardsData: ApplicationInfo[];
  }

  const props = defineProps<Props>();
</script>

<style scoped lang="less">
  .card-wrap {
    min-height: 200px;

    &:deep(.arco-card) {
      min-height: 200px;
    }

    &:deep(.arco-card-meta-description) {
      margin-top: 8px;
    }

    &:deep(.arco-card-meta-footer) {
      justify-content: flex-end;
    }
  }

  .empty-wrap {
    &:deep(.arco-card) {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 200px;
    }
  }
</style>
