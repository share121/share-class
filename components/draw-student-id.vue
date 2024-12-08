<template>
  <n-card size="small" title="抽学号" hoverable>
    <n-space :size="6" vertical>
      <div style="font-size: 3em">
        <template v-if="studentIndex === -1">开始抽学号</template>
        <div style="line-height: 1.1" v-else>
          <div>{{ students[studentIndex].id }}</div>
          <div>{{ students[studentIndex].name }}</div>
        </div>
      </div>
    </n-space>
    <template #action>
      <n-button
        v-if="!students.length"
        type="primary"
        @click="$router.push('/')"
        >选择上课班级</n-button
      >
      <n-button v-else @click="handle">
        <template v-if="isRunning">结束</template>
        <template v-else>开始</template>
      </n-button>
    </template>
  </n-card>
</template>

<script lang="ts" setup>
const studentIndex = ref(-1);
const { myClasses } = storeToRefs(useMyClassStore());
const students = computed(() =>
  myClasses.value
    .filter((item) => item.state === ClassState.toward)
    .flatMap((item) =>
      item.groups.flatMap((group) =>
        group.members.flatMap((m) => ({
          ...m,
          grade: item.grade,
          classNumber: item.classNumber,
        }))
      )
    )
);
let usedIndex = [] as number[];
const isRunning = ref(false);
let timer = undefined as NodeJS.Timeout | undefined;

function getRandomIndex(max: number) {
  return Math.floor(Math.random() * max);
}

function handle() {
  if (isRunning.value) {
    isRunning.value = false;
    clearInterval(timer);
    if (usedIndex.length == students.value.length) usedIndex = [];
    let nextIndex = getRandomIndex(students.value.length);
    while (usedIndex.includes(nextIndex))
      nextIndex = getRandomIndex(students.value.length);
    studentIndex.value = nextIndex;
    usedIndex.push(nextIndex);
    console.log(usedIndex);
    return;
  }
  isRunning.value = true;
  studentIndex.value = getRandomIndex(students.value.length);
  timer = setInterval(() => {
    studentIndex.value = getRandomIndex(students.value.length);
  });
}
</script>
