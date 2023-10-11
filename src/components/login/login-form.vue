<template>
  <a-form layout="vertical" class="login-form">
    <h1 style="font-size: 3vh">登录</h1>
    <a-form-item>
      <a-input
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

<style lang="less" scoped>
  .login-form {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
