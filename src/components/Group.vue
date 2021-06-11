<template>
  <div class="group">    
    <div class="grid__lesson">
      <div class="group__name__block">
        <p class="group__name">{{ group }}</p>
        <select class="group__type__select" v-model="groupType"> 
          <option>Обычное расписание</option>
          <option>Нет пар</option>
          <!-- <option>Производственная практика</option> -->
        </select>
      </div>
      <template v-if="groupType == 'Обычное расписание'">
        <GroupHeader ></GroupHeader>
        <template
          v-for="lesson in lessons"
          :key="lesson"
        >
          <Lesson 
            :lessonNumber="lesson"
            :group="group"
            @shiftLessonUp="shiftLessonUp"
            @shiftLessonDown="shiftLessonDown"
            @cleaningLesson="cleaningLesson"
          ></Lesson>
        </template>
      </template>
    </div>
  </div>
</template>

<script>
import Lesson from "./Lesson";
import GroupHeader from "./GroupHeader"
export default {
  name: "Group",
  props: [
    "group"
  ],
  components: {
    Lesson,
    GroupHeader,
  },
  data() {
    return {
      groupType: "Обычное расписание",
      firstLesson: 1,
      amountLesson: 6,
      lessonFunction : {},
      clearLesson: {
        room: "",
        employee: "",
        subject: "",
        roomSubgroup: "",
        employeeSubgroup: "",
        subjectSubgroup: "",
        subgroup: false,
      }
    }
  },
  computed: {
    lessons(){
      let lessons = []
      for (let i = this.firstLesson; i <= this.amountLesson + this.firstLesson - 1; i++) { 
        lessons.push(i)
      }
      return lessons
    },
  },
  provide() {
    return{
      getLessonFunction: this.getLessonFunction
    }
  },
  methods: {
    getLessonFunction(getFunc, setFunc, lessonNumber){
      this.lessonFunction[lessonNumber] = {"getFunc": getFunc, "setFunc":setFunc}
    },
    shiftLessonUp(lessonNumber){
      let firstLesson = this.firstLesson
      for(let i = firstLesson; i < lessonNumber; i++){
        let lessonInfo = this.lessonFunction[i + 1].getFunc();
        this.lessonFunction[i].setFunc(lessonInfo);
      }
      this.cleaningLesson(lessonNumber)
    },
    shiftLessonDown(lessonNumber){
      let lastLesson = this.amountLesson
      for(let i = lastLesson; i > lessonNumber; i--){
        let lessonInfo = this.lessonFunction[i - 1].getFunc();
        this.lessonFunction[i].setFunc(lessonInfo);
      }
      this.cleaningLesson(lessonNumber)
    },
    cleaningLesson(lessonNumber){
      this.lessonFunction[lessonNumber].setFunc(this.clearLesson);
    },
  }
}
</script>

<style>
@import '../assets/Group.module.css';
</style>