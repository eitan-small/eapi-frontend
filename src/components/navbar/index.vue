<template>
  <div class="navbar">
    <div class="left-side">
      <LogoSvg class="logo-svg" />
      <a-typography-title :style="{ margin: 0, fontSize: '18px' }" :heading="5"
        >Epsilon Open Platform</a-typography-title
      >
    </div>
    <div class="right-side">
      <a-dropdown trigger="click">
        <a-avatar
          :size="32"
          :style="{ marginRight: '20px', cursor: 'pointer' }"
        >
          {{ nickname }}
        </a-avatar>
        <template #content>
          <a-doption>
            <a-space>
              <icon-user />
              <span> 用户信息 </span>
            </a-space>
          </a-doption>
          <a-doption>
            <a-space @click="handleLogout">
              <icon-export />
              <span> 退出登录 </span>
            </a-space>
          </a-doption>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import LogoSvg from '@/assets/logo.svg';
  import { useUserStore } from '@/store';
  import { computed } from 'vue';
  import useUser from '@/hooks/user';

  const userStore = useUserStore();
  const { logout } = useUser();

  const nickname = computed(() => {
    return userStore.nickname?.charAt(0);
  });

  const handleLogout = () => {
    logout();
  };
</script>

<style lang="less">
  .navbar {
    display: flex;
    align-self: center;
    justify-content: space-between;
    height: 100%;
  }

  .left-side {
    display: flex;
    align-items: center;
    padding-left: 20px;
  }

  .logo-svg {
    margin-right: 8px;
  }

  .right-side {
    display: flex;
    align-items: center;
    padding-right: 20px;
  }
</style>
