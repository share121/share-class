<script setup lang="ts"></script>

<template>
  <nuxt-loading-indicator />
  <nuxt-layout>
    <template #header>
      <n-h2 style="margin: 0">share 课堂</n-h2>
    </template>
    <template #left>
      <n-list clickable hoverable>
        <n-list-item @click="$router.push('/')">
          <n-thing title="班级" description="选择你上课的班级" />
        </n-list-item>
        <n-list-item @click="$router.push('/manage')">
          <n-thing title="管理" description="管理所选的班级" />
        </n-list-item>
        <n-list-item @click="$router.push('/about')">
          <n-thing title="关于" description="关于此软件" />
        </n-list-item>
      </n-list>
    </template>
    <nuxt-page></nuxt-page>
  </nuxt-layout>
</template>

<style scoped>
a {
  text-decoration: none;
  color: inherit;
}
</style>
