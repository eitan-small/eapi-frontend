<script setup lang="ts">
  import axios from 'axios';
  import { Message } from '@arco-design/web-vue';

  const login = () => {
    axios({
      url: '/api/user/login',
      method: 'post',
      data: {
        username: 'admin',
        password: 'admin',
      },
    }).then((response) => {
      if (response.data.code === 20000) {
        Message.success('login success');
      } else {
        Message.error('login fail');
      }
    });
  };
</script>

<template>
  <div>
    <h1>Hello Vue</h1>
  </div>
  <a-button type="primary" @click="login">Login</a-button>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
</template>

<style scoped lang="less">
  div {
    h1 {
      color: @color;
    }
  }
</style>
