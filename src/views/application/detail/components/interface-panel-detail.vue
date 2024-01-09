<template>
  <div class="panel-detail">
    {{ tagInfo.appId }}
    {{ tagInfo.parentId }}
    {{ tagInfo }}
  </div>
</template>

<script setup lang="ts">
  import { InterfaceMenu } from '@/api/interface';

  interface Props extends InterfaceMenu {
    tagInfo: InterfaceMenu;
  }

  const props = defineProps<Props>();
</script>
