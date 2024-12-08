<template>
  <n-layout sider-placement="right" has-sider>
    <n-layout :native-scrollbar="false">
      <slot />
    </n-layout>
    <n-layout-sider
      :native-scrollbar="false"
      show-trigger="arrow-circle"
      bordered
      :content-style="props.siderStyle"
    >
      <slot name="sider" />
    </n-layout-sider>
  </n-layout>
</template>

<script lang="ts" setup>
const props = defineProps<{ siderStyle?: string }>();
</script>
