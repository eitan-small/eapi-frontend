<template>
  <div>
    <h1 class="title" style="font-size: 3vh">注册</h1>
    <div class="register-form-error-msg">{{ errorMessage }}</div>
    <a-form layout="vertical" class="register-form" :model="userInfo">
      <a-form-item
        field="username"
        :rules="[{ required: true, message: '用户名不能为空' }]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
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
      <a-form-item
        field="password"
        :rules="[{ required: true, message: '密码不能为空' }]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
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
          >立即注册</a-button
        >
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue';

  const errorMessage = ref('');

  const userInfo = reactive({
    username: '',
    password: '',
  });
</script>

<style lang="less" scoped>
  .register-form {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .title {
    text-align: center;
  }

  .register-form-error-msg {
    color: red;
  }
</style>
