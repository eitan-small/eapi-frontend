<template>
  <Transition name="fade" mode="out-in">
    <RegisterForm v-if="isActive" />
    <LoginForm v-else />
  </Transition>
  <Transition name="fade" mode="out-in">
    <a-button v-if="isActive" type="text" shape="round" @click="onClick"
      >前往登录</a-button
    >
    <a-button v-else type="text" shape="round" @click="onClick"
      >立即注册</a-button
    >
  </Transition>
</template>

<script setup lang="ts">
  import LoginForm from './login-form.vue';
  import RegisterForm from './register-form.vue';

  defineProps({
    isActive: Boolean,
  });

  const $emit = defineEmits(['changeActive']);
  const onClick = () => {
    $emit('changeActive');
  };
</script>

<style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0s ease;
    transition-delay: 0.8s;
  }
</style>
