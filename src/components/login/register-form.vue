<template>
  <div>
    <h1 class="title" style="font-size: 3vh">登录</h1>
    <div class="login-form-error-msg">{{ errorMessage }}</div>
    <a-form
      layout="vertical"
      class="login-form"
      :model="userInfo"
      @submit="handleSubmit"
    >
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
          >立即登录</a-button
        >
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { ValidatedError } from '@arco-design/web-vue/es/form/interface';
  import { useUserStore } from '@/store';
  import { LoginData } from '@/api/user';
  import useLoading from '@/hooks/loading';
  import { Message } from '@arco-design/web-vue';

  const router = useRouter();
  const errorMessage = ref('');
  const { loading, setLoading } = useLoading();

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
    if (loading.value) return;
    if (!errors) {
      setLoading(true);
      try {
        // 通知仓库
        await userStore.login(values as LoginData);
        const { redirect, ...othersQuery } = router.currentRoute.value.query;
        router.push({
          name: (redirect as string) || 'Workplace',
          query: {
            ...othersQuery,
          },
        });
        Message.success('登录成功');
      } catch (err) {
        errorMessage.value = (err as Error).message;
      } finally {
        setLoading(false);
      }
    }
  };
</script>

<style lang="less" scoped>
  .login-form {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .title {
    text-align: center;
  }

  .login-form-error-msg {
    color: red;
  }
</style>
