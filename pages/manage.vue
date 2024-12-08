<template>
  <content-with-sider sider-style="padding: 8px">
    <Waterfall
      ref="waterfall"
      :list="filteredClassName"
      background-color="transparent"
      :gutter="8"
      :animation-delay="0"
      :animation-duration="500"
      row-key="id"
    >
      <template
        #default="{
          item: { component: MyComponent },
        }: {
          item: (typeof filteredClassName.value)[number],
          index: number,
        }"
      >
        <component :is="MyComponent()" />
      </template>
    </Waterfall>
    <template #sider>
      <n-space vertical>
        <n-input placeholder="搜索" v-model:value="keyword">
          <template #prefix>
            <n-icon :component="Search" />
          </template>
        </n-input>
      </n-space>
    </template>
  </content-with-sider>
</template>

<script lang="ts" setup>
import { Waterfall } from "vue-waterfall-plugin-next";
import { Search } from "@vicons/ionicons5";
import { useFuse } from "@vueuse/integrations/useFuse";
import DrawStudentId from "~/components/draw-student-id.vue";

const waterfall = ref(null as any);
const componentItems = ref([] as HTMLElement[]);
onMounted(() => {
  componentItems.value = Array.from(
    document.querySelectorAll(".waterfall-item")
  );
});
useResizeObserver(componentItems, () => waterfall.value?.renderer?.());
useMutationObserver(
  waterfall,
  () => {
    componentItems.value = Array.from(
      document.querySelectorAll(".waterfall-item")
    );
  },
  {
    childList: true,
    characterData: false,
  }
);
const list = ref([
  {
    id: "抽学号1",
    component: () => DrawStudentId,
  },
  {
    id: "抽学号2",
    component: () => DrawStudentId,
  },
  {
    id: "抽学号3",
    component: () => DrawStudentId,
  },
]);
const keyword = ref("");
const { results } = useFuse(keyword, list, {
  fuseOptions: {
    keys: ["id"],
  },
});
const filteredClassName = computed(() => {
  if (keyword.value) {
    return results.value.map((result) => result.item);
  } else {
    return list.value;
  }
});
</script>
