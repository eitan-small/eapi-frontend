<template>
  <a-form
    layout="vertical"
    class="login-form"
    :model="userInfo"
    @submit="handleSubmit"
  >
    <h1 style="font-size: 3vh">登录</h1>
    <a-form-item>
      <a-input
        v-model="userInfo.username"
        long
        placeholder="用户名"
        allow-clear
        style="height: 3vh; border-radius: 1.5vh"
      >
        <template #prefix>
          <icon-user />
        </template>
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-input-password
        v-model="userInfo.password"
        long
        placeholder="密码"
        allow-clear
        style="height: 3vh; border-radius: 1.5vh"
      >
        <template #prefix>
          <icon-lock />
        </template>
      </a-input-password>
    </a-form-item>
    <a-form-item>
      <a-button
        type="primary"
        html-type="submit"
        long
        style="height: 3vh; border-radius: 1.5vh"
        >立即登录</a-button
      >
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
  import { ValidatedError } from '@arco-design/web-vue/es/form/interface';
  import { reactive } from 'vue';
  import { useUserStore } from '@/store';
  import { LoginData } from '@/api/user';

  const userInfo = reactive({
    username: '',
    password: '',
  });
  const userStore = useUserStore();

  const handleSubmit = async ({
    errors,
    values,
  }: {
    errors: Record<string, ValidatedError> | undefined;
    values: Record<string, any>;
  }) => {
    // 通知仓库
    userStore.login(values as LoginData);
  };
</script>

<style lang="less" scoped>
  .login-form {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
