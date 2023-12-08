<template>
  <a-dropdown trigger="contextMenu" align-point @select="actionSelect">
    <div
      class="tab-item"
      :class="{ 'tab-activated': props.itemData.fullPath === $route.fullPath }"
      @click="goto(props.itemData)"
    >
      {{ props.itemData.title }}
      <span
        v-show="tagList.length > 1"
        @click.stop="tagClose(props.itemData, index)"
      >
        <Icon name="icon-close" class="icon-close" />
      </span>
    </div>
    <template #content>
      <a-doption :disabled="disabledReload" :value="Action.reload">
        <Icon name="icon-refresh" />
        <span>重新加载</span>
      </a-doption>
      <a-doption :disabled="disabledClose" :value="Action.current">
        <Icon name="icon-close" />
        <span>关闭当前标签页</span>
      </a-doption>
      <a-doption :disabled="disabledClose" :value="Action.others">
        <Icon name="icon-swap" />
        <span>关闭其它标签页</span>
      </a-doption>
    </template>
  </a-dropdown>
</template>

<script setup lang="ts">
  import useTabBarStore from '@/store/modules/tab-bar';
  import Icon from '@/components/icon/index.vue';
  import { TagProps } from '@/store/modules/tab-bar/types';
  import { useRoute, useRouter } from 'vue-router';
  import { computed } from 'vue';
  import { REDIRECT_ROUTE_NAME } from '@/router/constants';

  const tabBarStore = useTabBarStore();
  const route = useRoute();
  const router = useRouter();

  const tagList = computed(() => {
    return tabBarStore.getTabList;
  });

  // eslint-disable-next-line no-shadow
  enum Action {
    reload = 'reload',
    current = 'current',
    others = 'others',
  }
  interface Props {
    itemData: TagProps;
    index: number;
  }

  const props = withDefaults(defineProps<Props>(), {
    itemData: undefined,
    index: 0,
  });

  const goto = (tag: TagProps) => {
    router.push({ ...tag });
  };

  const disabledReload = computed(() => {
    return props.itemData.fullPath !== route.fullPath;
  });

  const disabledClose = computed(() => {
    return tabBarStore.cacheTabList.size <= 1;
  });

  const tagClose = (tag: TagProps, idx: number) => {
    tabBarStore.deleteTag(idx, tag);
    if (props.itemData.fullPath === route.fullPath) {
      const latest = tagList.value[idx === 0 ? 0 : idx - 1]; // 获取队列的前一个tab
      router.push({ name: latest.name });
    }
  };

  const actionSelect = async (value: any) => {
    const { itemData, index } = props;
    if (value === Action.current) {
      tagClose(itemData, index);
    } else if (value === Action.others) {
      const filterList = tagList.value.filter((el, idx) => {
        return idx === props.index;
      });
      tabBarStore.freshTabList(filterList);
      await router.push({ name: itemData.name });
    } else if (value === Action.reload) {
      tabBarStore.deleteCache(itemData);
      await router.push({
        name: REDIRECT_ROUTE_NAME,
        params: {
          path: route.fullPath,
        },
      });
      tabBarStore.addCache(itemData.name);
    }
  };
</script>

<script setup lang="ts"></script>

<style scoped lang="less">
  .tab-item {
    margin: 0 10px;
    padding: 10px;
    color: var(--color-text-2);
    border-radius: 10%;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      color: var(--color-text-1);
    }

    &.tab-activated {
      background-color: var(--color-bg-1);
    }
  }

  .icon-close {
    border-radius: 50%;

    &:hover {
      color: var(--color-bg-1);
      background-color: rgb(var(--blue-7));
    }
  }
</style>
