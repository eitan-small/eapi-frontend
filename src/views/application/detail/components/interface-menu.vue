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
    <div class="menu-tree">
      <a-tree
        v-if="props.menuData"
        ref="treeRef"
        :field-names="{
          key: 'id',
          title: 'name',
          children: 'children',
        }"
        :data="props.menuData"
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
        <template #drag-icon>
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
        </template>
      </a-tree>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { InterfaceMenu, ordering } from '@/api/interface';
  import Icon from '@/components/icon/index.vue';
  import { ref } from 'vue';

  interface Props {
    menuData?: InterfaceMenu[];
  }

  const props = defineProps<Props>();
  const treeRef = ref();

  const emit = defineEmits<{
    refresh: [];
  }>();

  const onDrop = async ({ dragNode, dropNode, dropPosition }) => {
    // 如果拖动到叶子节点则什么都不用做
    if (dropPosition === 0 && dropNode.type === 2) return;
    await ordering(dragNode.id, dropNode.id, dropPosition);
    emit('refresh');
  };

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
