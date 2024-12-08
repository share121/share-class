export interface Student {
  name: string;
  id: number;
  credit: number;
}
export interface Group {
  leaderId: number;
  members: Student[];
}
export const classStateMap = ["开始上课", "上课中"];
export enum ClassState {
  pending,
  toward,
}
export interface MyClass {
  grade: number;
  classNumber: number;
  groups: Group[];
  state: ClassState;
}

export const gradeMap = [
  "一年级",
  "二年级",
  "三年级",
  "四年级",
  "五年级",
  "六年级",
  "初一",
  "初二",
  "初三",
  "高一",
  "高二",
  "高三",
];

export const useMyClassStore = defineStore("myClassStore", () => {
  const myClasses = ref(
    [
      {
        grade: 10,
        classNumber: 4,
        state: ClassState.pending,
        groups: [{
          leaderId: 2,
          members: [
            {
              name: "张三",
              id: 1,
              credit: 1,
            },
            {
              name: "李四",
              id: 2,
              credit: 13,
            },
            {
              name: "王五",
              id: 3,
              credit: 5,
            },
          ],
        }, {
          leaderId: 6,
          members: [
            {
              name: "小明",
              id: 6,
              credit: 10,
            },
            {
              name: "小红",
              id: 7,
              credit: 13,
            },
            {
              name: "小刚",
              id: 8,
              credit: 2,
            },
            {
              name: "小丽",
              id: 9,
              credit: 5,
            },
          ],
        }],
      },
      {
        grade: 10,
        classNumber: 1,
        state: ClassState.pending,
        groups: [{
          leaderId: 3,
          members: [
            {
              name: "熊大",
              id: 1,
              credit: 10,
            },
            {
              name: "熊二",
              id: 2,
              credit: 13,
            },
            {
              name: "光头强",
              id: 3,
              credit: 2,
            },
            {
              name: "小猪佩奇",
              id: 4,
              credit: 5,
            },
          ],
        }, {
          leaderId: 6,
          members: [
            {
              name: "乔治",
              id: 6,
              credit: 10,
            },
            {
              name: "小兔",
              id: 7,
              credit: 13,
            },
            {
              name: "毛毛",
              id: 8,
              credit: 2,
            },
            {
              name: "吉吉国王",
              id: 9,
              credit: 5,
            },
          ],
        }],
      },
    ] as MyClass[],
  );
  const studentCount = computed(() =>
    myClasses.value.map((item) =>
      item.groups.reduce(
        (prev, curr) => prev + curr.members.length,
        0,
      )
    )
  );
  const classTotalCredit = computed(() =>
    myClasses.value.map((item) =>
      item.groups.reduce(
        (prev, curr) =>
          prev +
          curr.members.reduce((prev, curr) => prev + curr.credit, 0),
        0,
      )
    )
  );
  const className = computed(() =>
    myClasses.value.map((item) =>
      `${gradeMap[item.grade - 1]} ${item.classNumber} 班`
    )
  );
  return { myClasses, studentCount, classTotalCredit, className };
}, { persist: true });
