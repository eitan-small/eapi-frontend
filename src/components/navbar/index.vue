<template>
  <div class="navbar">
    <div class="left-side">
      <LogoSvg class="logo-svg" />
      <a-typography-title :style="{ margin: 0, fontSize: '18px' }" :heading="5"
        >Epsilon Open Platform</a-typography-title
      >
    </div>
    <ul class="right-side">
      <li>
        <a-tooltip
          :content="isFullscreen ? '点击切换全屏模式' : '点击退出全屏模式'"
        >
          <a-button
            class="nav-btn"
            type="outline"
            :shape="'circle'"
            @click="toggleFullScreen"
          >
            <template #icon>
              <Icon v-if="isFullscreen" name="icon-fullscreen-exit" />
              <Icon v-else name="icon-fullscreen" />
            </template>
          </a-button>
        </a-tooltip>
      </li>
      <li>
        <a-dropdown trigger="click" position="br">
          <a-avatar
            :size="32"
            :style="{ marginRight: '8px', cursor: 'pointer' }"
          >
            {{ nickname }}
          </a-avatar>
          <template #content>
            <a-doption>
              <a-space>
                <Icon name="icon-user" />
                <span> 用户信息 </span>
              </a-space>
            </a-doption>
            <a-doption>
              <a-space @click="handleLogout">
                <Icon name="icon-export" />
                <span> 退出登录 </span>
              </a-space>
            </a-doption>
          </template>
        </a-dropdown>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
  import LogoSvg from '@/assets/logo.svg';
  import Icon from '@/components/icon/index.vue';
  import { useUserStore } from '@/store';
  import { computed } from 'vue';
  import useUser from '@/hooks/user';
  import { useFullscreen } from '@vueuse/core';

  const userStore = useUserStore();
  const { logout } = useUser();
  const { isFullscreen, toggle: toggleFullScreen } = useFullscreen();

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
    border-bottom: 1px solid var(--color-border);
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

    li {
      display: flex;
      align-items: center;
      margin: 0 8px;
    }

    .nav-btn {
      color: rgb(var(--gray-8));
      font-size: 15px;
      border-color: rgb(var(--gray-2));
    }
  }
</style>
