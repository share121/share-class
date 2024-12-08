<template>
  <content-with-sider sider-style="padding: 8px">
    <Waterfall
      :list="filteredClassName"
      background-color="transparent"
      :gutter="8"
      :animation-delay="0"
      :animation-duration="500"
      row-key="className"
    >
      <template
        #default="{
          item: { className, index },
        }: {
          item: (typeof filteredClassName.value)[number],
          index: number,
        }"
      >
        <n-card size="small" :title="className" hoverable>
          <n-space :size="6">
            <n-tag>{{ myClasses[index].groups.length }} 组</n-tag>
            <n-tag>{{ studentCount[index] }} 人</n-tag>
            <n-tag>{{ classTotalCredit[index] }} 分</n-tag>
          </n-space>
          <template #action>
            <n-button
              :type="
                myClasses[index].state === ClassState.toward
                  ? 'primary'
                  : undefined
              "
              @click="() => changeClassState(myClasses[index])"
            >
              {{ classStateMap[myClasses[index].state] }}
            </n-button>
          </template>
        </n-card>
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

const { myClasses, studentCount, classTotalCredit, className } = storeToRefs(
  useMyClassStore()
);
const keyword = ref("");
const classNameWithIndex = computed(() =>
  className.value.map((className, index) => ({
    className,
    index,
  }))
);
const { results } = useFuse(keyword, classNameWithIndex, {
  fuseOptions: {
    keys: ["className"],
  },
});
const filteredClassName = computed(() => {
  if (keyword.value) {
    return results.value.map((result) => result.item);
  } else {
    return classNameWithIndex.value;
  }
});

function changeClassState(myClass: MyClass) {
  if (myClass.state === ClassState.toward) {
    myClass.state = ClassState.pending;
  } else {
    myClass.state = ClassState.toward;
  }
}
</script>
