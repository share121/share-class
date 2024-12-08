<template>
  <n-config-provider
    :theme="isDark ? darkTheme : lightTheme"
    :locale="zhCN"
    :date-locale="dateZhCN"
  >
    <n-global-style />
    <n-notification-provider>
      <n-dialog-provider>
        <n-layout style="height: 100vh">
          <n-layout-header
            style="
              height: 64px;
              display: flex;
              align-items: center;
              padding: 0 16px;
            "
            bordered
          >
            <slot name="header" />
          </n-layout-header>
          <n-layout
            position="absolute"
            style="top: 64px; bottom: 64px"
            has-sider
          >
            <n-layout-sider
              :native-scrollbar="false"
              bordered
              show-trigger="arrow-circle"
            >
              <slot name="left" />
            </n-layout-sider>
            <slot />
          </n-layout>
          <n-layout-footer
            position="absolute"
            style="height: 64px; padding: 24px"
            bordered
          >
            <slot name="footer" />
          </n-layout-footer>
        </n-layout>
      </n-dialog-provider>
    </n-notification-provider>
  </n-config-provider>
</template>

<script lang="ts" setup>
import { darkTheme, lightTheme, zhCN, dateZhCN } from "naive-ui";

const isDark = ref(true);
isDark.value = window.matchMedia("(prefers-color-scheme: dark)").matches;
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (e) => (isDark.value = e.matches));
</script>
