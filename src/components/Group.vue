<template>
  <div class="group">
    <p class="group__name">{{ group }}</p>
    <div 
      class="lesson" 
      v-for="lesson in lessons"
      :key="lesson"
    >
      <p class="lesson__number">{{ lesson  }} </p>
      <lesson
        
        
        :lessonNumber="lesson"
        :group="group"
        @createCopyOfLessonBefore="createCopyOfLessonBefore"
        @createCopyOfLessonAfter="createCopyOfLessonAfter"
        @deleteLesson="deleteLesson"
      ></lesson>
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
      amountLesson: 3,
      lessonFunction: []
    }
  },
  computed: {
    lessons(){
      let lessons = []

      for (let i = this.firstLesson; i <= this.amountLesson; i++) { 
        lessons.push(i)
      }

      // this.lessons.push(lesson + 1);
      // this.lessons.sort();
      return lessons
    }
  },
  provide() {
    return{
      getLessonFunction: this.getLessonFunction
    }
    
  },
  methods: {
    getLessonFunction(func){
      this.lessonFunction.push(func)
    },
    createCopyOfLessonAfter(lesson) {
      // this.lessons.forEach((element, i) => {
      //   if(lesson + 1 <= this.lessons[i]){
      //     this.lessons[i] = element + 1;
      //   }
      // });
      // this.lessons.push(lesson + 1);
      // this.lessons.sort();
      console.log(lesson);
      this.amountLesson++;
    },
    createCopyOfLessonBefore(lesson) {
      // if (lesson > 1){
      //   this.lessons.forEach((element, i) => {
      //   if(lesson - 1 <= this.lessons[i]){
      //     this.lessons[i] = element - 1;
      //   }
      // });
      // this.lessons.push(lesson - 1);
      // this.lessons.sort();
      // }
      console.log(lesson);
      if(this.firstLesson > 1 & this.firstLesson == lesson){
        this.firstLesson--;
      }
      else if(lesson > 1){
        this.amountLesson++;
      }
    },
    deleteLesson(lesson){
      // const index = this.lessons.indexOf(lesson);
      // if (index > -1) {
      //   this.lessons.splice(index, 1);
      // }
      console.log(lesson);
      if(this.firstLesson == lesson){
        this.firstLesson++;
      }
      else{
        this.amountLesson--;
      }
    }
  }
}
</script>

<style>
</style>