<template>
  <div :class="{ 'container': true, 'sign-up-mode': isActive }">
    <div class="image-container">
      <div class="inner-left">
        <a-button type="primary" shape="round" @click="onClick">登入</a-button>
        <LoginSvg />
      </div>
      <div class="inner-right">
        <a-button type="primary" shape="round" @click="onClick">注册</a-button>
        <RegisterSvg />
      </div>
    </div>
    <div class="login-container"> </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import LoginSvg from '@/assets/images/login.svg';
  import RegisterSvg from '@/assets/images/register.svg';

  const isActive = ref<boolean>(false);

  const onClick = () => {
    isActive.value = !isActive.value;
  };
</script>

<style lang="less" scoped>
  .container {
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }

  .container::before {
    position: absolute;
    width: 200vh;
    height: 200vh;
    background-image: linear-gradient(-45deg, #6266f5 0%, #04befe 100%);
    border-radius: 50%;
    transform: translate(-50%, -55%);
    transition: 1.8s ease-in-out;
    content: '';
  }

  .container.sign-up-mode::before {
    transform: translate(50%, -55%);
  }

  .image-container {
    display: flex;
    height: 100%;
  }

  .inner-left {
    z-index: 1;
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-around;
    padding: 3rem 5% 2rem 15%;
  }

  .inner-right {
    z-index: 1;
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-around;
    padding: 3rem 15% 2rem 5%;
  }

  svg {
    width: 100%;
  }

  .login-container {
    position: absolute;
    top: 20%;
    right: 0;
    width: 50%;
    height: 50%;
    background-color: rgb(250 215 219);
    transition: 1s ease-in-out;
    transition-delay: 500ms;
  }

  .container .inner-right {
    transform: translate(100%);
    transition: 1s ease-in-out;
    transition-delay: 500ms;
  }

  .container.sign-up-mode .inner-right {
    transform: translate(0%);
    transition: 1s ease-in-out;
    transition-delay: 500ms;
  }

  .container .inner-left {
    transform: translate(0%);
    transition: 1s ease-in-out;
    transition-delay: 500ms;
  }

  .container.sign-up-mode .inner-left {
    transform: translate(-100%);
    transition: 1s ease-in-out;
    transition-delay: 500ms;
  }

  .container.sign-up-mode .login-container {
    right: 50%;
    transition: 1s ease-in-out;
    transition-delay: 500ms;
  }
</style>
