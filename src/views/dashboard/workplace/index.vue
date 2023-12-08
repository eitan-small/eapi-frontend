<template>
  <div>
    workplace
    <a-input
      :style="{ width: '320px' }"
      placeholder="Please enter something"
      allow-clear
    />
    <Icon name="login" />
  </div>
</template>

<script setup lang="ts">
  import Icon from '@/components/icon/index.vue';
</script>

<script lang="ts">
  export default {
    name: 'Workplace', // If you want the include property of keep-alive to take effect, you must name the component
  };
</script>
