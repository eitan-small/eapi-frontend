<template>
  <a-form layout="vertical" class="register-form">
    <h1 style="font-size: 3vh">注册</h1>
    <a-form-item>
      <a-input
        long
        placeholder="用户名"
        style="height: 3vh; border-radius: 1.5vh"
        allow-clear
      >
        <template #prefix>
          <icon-user />
        </template>
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-input-password
        long
        placeholder="密码"
        style="height: 3vh; border-radius: 1.5vh"
        allow-clear
      >
        <template #prefix>
          <icon-lock />
        </template>
      </a-input-password>
    </a-form-item>
    <a-form-item>
      <a-input-password
        long
        placeholder="确认密码"
        style="height: 3vh; border-radius: 1.5vh"
        allow-clear
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
        style="height: 3vh; border-radius: 1.5vh"
        long
        >注册</a-button
      >
    </a-form-item>
  </a-form>
</template>

<style scoped>
  .register-form {
    display: flex;
    align-items: center; /* 垂直居中 */
    justify-content: center; /* 水平居中 */
  }
</style>
