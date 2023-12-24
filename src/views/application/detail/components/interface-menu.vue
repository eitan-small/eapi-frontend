<template>
  <div class="menu-container">
    <div class="menu-search">
      <a-input v-model="searchKey" class="input-search">
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
    <div class="menu-tree">
      <a-tree
        ref="treeRef"
        :field-names="{
          key: 'id',
          title: 'name',
          children: 'children',
        }"
        :data="menuData"
        block-node
        draggable
        @drop="onDrop"
        @select="onSelect"
      >
        <template #switcher-icon="{ isLeaf }">
          <IconDown v-if="!isLeaf" />
        </template>
        <template #icon="{ isLeaf, node }">
          <div
            v-if="isLeaf && node.requestMethod === 'GET'"
            class="request-method"
            style="color: #4caf50"
          >
            GET
          </div>
          <div
            v-else-if="isLeaf && node.requestMethod === 'POST'"
            class="request-method"
            style="color: #fa8c16"
          >
            POST
          </div>
          <div
            v-else-if="isLeaf && node.requestMethod === 'PUT'"
            class="request-method"
            style="color: #1890ff"
          >
            PUT
          </div>
          <div
            v-else-if="isLeaf && node.requestMethod === 'DEL'"
            class="request-method"
            style="color: #fa541c"
          >
            DEL
          </div>
          <Icon
            v-else-if="!isLeaf"
            name="icon-folder"
            :svg-style="{ marginLeft: '4px' }"
          />
        </template>
        <template #drag-icon="{ node }">
          <div class="item-more-container">
            <div v-show="1 == node.type" class="item-more" @click.stop>
              <Icon name="icon-plus" />
            </div>
            <div class="item-more" @click.stop>
              <a-dropdown position="bl">
                <Icon name="icon-more" />
                <template #content>
                  <a-doption>Option 1</a-doption>
                  <a-doption>Option 2</a-doption>
                  <a-doption>Option 3</a-doption>
                </template>
              </a-dropdown>
            </div>
          </div>
        </template>
      </a-tree>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { queryInterfaceMenu, InterfaceMenu, ordering } from '@/api/interface';
  import Icon from '@/components/icon/index.vue';
  import { computed, onMounted, ref, watch } from 'vue';

  interface Props {
    appId?: number;
  }

  const searchKey = ref('');
  const props = defineProps<Props>();
  const treeRef = ref();
  const menuData = ref<InterfaceMenu[]>([]);

  const searchData = (list: InterfaceMenu[], key: string) => {
    list.filter((item: InterfaceMenu) => {
      if (item.children && item.children.length > 0) {
        searchData(item.children, key);
      }
      if (item.children && item.children.length > 0) {
        return true;
      }
      if (item.name.toLowerCase().includes(key.toLowerCase())) {
        return true;
      }
      return false;
    });
  };
  // 前端搜索功能
  const treeData = computed(() => {
    if (!searchKey.value) return menuData;
    return searchData(menuData.value, searchKey.value);
  });

  const emit = defineEmits<{
    refresh: [];
  }>();

  const onSelect = (selectedKeys: Array<string | number>) => {
    const expandedNodes = treeRef.value
      .getExpandedNodes()
      .map((item: InterfaceMenu) => {
        return item.id;
      });
    treeRef.value.expandNode(
      selectedKeys[0],
      !expandedNodes.includes(selectedKeys[0]),
    );
  };

  const queryMenuData = async () => {
    if (props.appId) {
      const res = await queryInterfaceMenu(props.appId);
      menuData.value = res.data;
    }
  };

  const onDrop = async ({ dragNode, dropNode, dropPosition }) => {
    // 如果拖动到叶子节点则什么都不用做
    if (dropPosition === 0 && dropNode.type === 2) return;
    await ordering(dragNode.id, dropNode.id, dropPosition);
    queryMenuData();
  };

  // 在组件初始化时调用一次
  onMounted(() => {
    queryMenuData();
  });

  // 监听 appId 的变化，当 appId 变化时重新查询菜单数据
  watch(
    () => props.appId,
    () => {
      queryMenuData();
    },
  );
</script>

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

    &:focus-within {
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

  .menu-tree {
    padding: 0.5rem;

    :deep(.arco-tree-node) {
      &:hover {
        background: var(--color-neutral-2);
      }
    }

    :deep(.arco-tree-node-switcher) {
      width: auto;
      margin-right: 2px;
    }

    :deep(.arco-tree-node-custom-icon) {
      margin-right: 3px;
    }
  }

  .request-method {
    align-items: center;
    width: 32px;
    font-weight: 700;
    font-size: 12px;
    border-radius: 4px;
  }

  .item-more-container {
    display: flex;
  }

  .item-more {
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 22px;

    &:hover {
      background: var(--color-neutral-3);
    }
  }
</style>
