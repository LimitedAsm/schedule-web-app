<template>
  <div class="group">
    <p class="group__name">{{ group }}</p>
    
    <div 
      class="lesson" 
      v-for="lesson in lessons"
      :key="lesson"
    >
      <p class="lesson__number">{{ lesson  }} </p>
      <Lesson 
        :lessonNumber="lesson"
        :group="group"
        @shiftLessonUp="shiftLessonUp"
        @shiftLessonDown="shiftLessonDown"
        @cleaningLesson="cleaningLesson"
      ></Lesson>
    </div>
  </div>
</template>

<script>
import Lesson from './Lesson';
export default {
  name: "Group",
  props: [
    'group'
  ],
  
  components: {
    Lesson
  },
  data() {
    return {
      firstLesson: 1,
      amountLesson: 6,
      lessonFunction : {},
      clearLesson: {
        // note: "",
        room: "",
        employee: "",
        subject: "",
        // noteSubgroup: "",
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