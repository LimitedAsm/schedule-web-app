<template>
  <!-- <div class="lesson__info"> -->
    
  <div class="main__info" data-test="lesson">
    <p class="lesson__number">{{ lessonNumber }}</p>
    <div class="select__menu">
      <div class="subgroup main__group">
        <input
          list="subject"
          placeholder="Предмет"
          v-model="lesson.subject"
        />
        <datalist id="subject" title="Предмет">
          <option 
            v-for="subject in this.subjects"
            :key="subject"
          >
            {{ subject }}
          </option>
        </datalist>
        <input
          list="employee"
          placeholder="Преподаватель"
          v-model="lesson.employee"
        />
        <datalist id="employee" title="Преподаватель">
          <option 
            v-for="employee in this.employees"
            :key="employee"
          >
            {{ employee }}
          </option>
        </datalist>
        <input 
          list="room" 
          placeholder="Аудитория" 
          v-model="lesson.room"
        />
        <datalist id="room" title="Аудитория">
          <option 
            v-for="room in this.rooms"
            :key="room"
          >
            {{ room }}
          </option>
        </datalist>
        <!-- <input 
          list="идентификатор5" 
          placeholder="Заметки" 
          v-model="lesson.note"
        /> -->
      </div>
      <template v-if='lesson.subgroup'>
        <div class="subgroup main__group">
          <input
            list="subject"
            placeholder="Предмет"
            v-model="lesson.subjectSubgroup"
          />
          <datalist id="subject" title="Предмет">
            <option 
              v-for="subject in this.subjects"
              :key="subject"
            >
              {{ subject }}
            </option>
          </datalist>

          <input
            list="teacher"
            placeholder="Преподаватель"
            v-model="lesson.employeeSubgroup"
          />
          <datalist id="teacher" title="Преподаватель">
            <option 
              v-for="employee in this.employees"
              :key="employee"
            >
              {{ employee }}
            </option>
          </datalist>

          <input 
            list="room" 
            placeholder="Аудитория" 
            v-model="lesson.roomSubgroup"
          />
          <datalist id="room" title="Аудитория">
            <option 
              v-for="room in this.rooms"
              :key="room"
            >
              {{ room }}
            </option>
          </datalist>
          <!-- <input  
            placeholder="Заметки" 
            v-model="lesson.noteSubgroup"
          /> -->
        </div>
      </template>
    </div> 
  </div>   
      
  <!-- <button 
    class="option__btn"
    v-on:click="handleSubgroupButton"
  > -->


    <!-- <input
    class="checkbox"
      v-bind:id="group + lessonNumber"
      type="checkbox"
      v-model="lesson.subgroup"
    > -->

  <!-- </button> -->

  <!-- <label 
    v-bind:for="group + lessonNumber"
  ></label> -->

  <input type="checkbox" class="checkbox"  v-bind:id="group + ' ' + lessonNumber" v-model="lesson.subgroup"/>
  <label  v-bind:for="group + ' ' + lessonNumber"></label>

<!-- <label class="checkbox">
	<input type="checkbox" />
	<div class="checkbox__text"></div>
</label> -->

<!-- v-bind:id="group + lessonNumber" -->


  <button 
    type="button" 
    class="option__btn del"
    v-on:click="handleInsertLesson"
  >
    <img src="../assets/paste.svg">
  </button>

  <button 
    type="button" 
    class="option__btn del"
    v-on:click="handleCopyLesson" 
  > 
    <img src="../assets/copy.svg">
  </button> 

  <button 
    type="button" 
    class="option__btn del addDown"
    v-on:click="shiftLessonUp"
  >
    <img src="../assets/arrow-up.svg">
  </button>

  <button
    type="button"
    class="option__btn"
    v-on:click="shiftLessonDown"
  >
    <img src="../assets/arrow-down.svg">
  </button>

  <button 
    type="button" 
    class="option__btn"
    v-on:click="handleCleaningLesson"  
  >
    <img src="../assets/delete.svg">
  </button>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: "Lesson",
  props: [
    "lessonNumber",
    "group"
  ],
  emits: [
    "shiftLessonUp",
    "shiftLessonDown",
    "cleaningLesson"  
  ],
  inject: [
    "getLessonFunction",
    "getChildrenFunction",
  ],
  data() {
    return {
      lesson: {
        room: "",
        employee: "",
        subject: "",
        roomSubgroup: "",
        employeeSubgroup: "",
        subjectSubgroup: "",
        subgroup: false,
      },
    }
  },
  computed: {
    subjects(){
      return this.getSubjects()
    },
    employees(){
      return this.getEmployees()
    }, 
    rooms(){
      return this.getRooms()
    }
  },
  methods: {
    ...mapActions(["copyLesson"]),
    ...mapGetters(["getSchedule", "getSubjectByRefKey", "getGroupRefKey",
     "getEmployeeByRefKey", "getRoomByRefKey", "getSubjects", "getEmployees", "getRooms", "getCopiedLesson"]),
    handleSubgroupButton(){
      this.lesson.subgroup = !this.lesson.subgroup 
    },
    handleInsertLesson(){
      if(this.getCopiedLesson() != "notOneCopy"){
        this.lesson = this.getCopiedLesson();
      }
    },
    handleCopyLesson(){
      this.copyLesson(this.lesson)
    },
    shiftLessonUp(){
      this.$emit('shiftLessonUp', this.lessonNumber);
    },
    shiftLessonDown(){
      this.$emit('shiftLessonDown', this.lessonNumber);
    },
    handleCleaningLesson(){
      this.$emit('cleaningLesson', this.lessonNumber);
    },
    returnChildrenFunctionGet(){
      return(
        {
          lessonNumber: this.lessonNumber,
          group: this.group,
          ...this.lesson
        }
      )
    },
    returnChildrenFunctionSet(lesson){
      this.lesson = {...lesson};
    },
    returnLessonFunctionGet(){
      let lesson = {...this.lesson}
      return lesson;
    },
    returnLessonFunctionSet(lesson){
      this.lesson = {...lesson};
    }
  }, 
  created(){ 
    this.getChildrenFunction(this.returnChildrenFunctionGet, this.returnChildrenFunctionSet),
    this.getLessonFunction(this.returnLessonFunctionGet, this.returnLessonFunctionSet, this.lessonNumber)
  }, 
  mounted(){
    if(this.getSchedule() != "noSchedule"){
      this.getSchedule().forEach(schedule => {
        let lesson = this.lesson
        if((schedule.groupKey == this.getGroupRefKey()(this.group)) && (schedule.lessonNumber == this.lessonNumber)){
          if(schedule.subgroup == 0){
            lesson.subgroup = false
            lesson.room = this.getRoomByRefKey()(schedule.roomKey)
            lesson.employee = this.getEmployeeByRefKey()(schedule.teacherKey)
            lesson.subject = this.getSubjectByRefKey()(schedule.subjectKey)
          }
          else if(schedule.subgroup == 1){
            lesson.subgroup = true
            lesson.room = this.getRoomByRefKey()(schedule.roomKey)
            lesson.employee = this.getEmployeeByRefKey()(schedule.teacherKey)
            lesson.subject = this.getSubjectByRefKey()(schedule.subjectKey)
          }
          else if(schedule.subgroup == 2){
            lesson.subgroup = true
            lesson.roomSubgroup = this.getRoomByRefKey()(schedule.roomKey)
            lesson.employeeSubgroup = this.getEmployeeByRefKey()(schedule.teacherKey)
            lesson.subjectSubgroup = this.getSubjectByRefKey()(schedule.subjectKey)
          }
        }
        this.lesson = {...lesson}
      });      
    }
  }
}
</script>

<style>
@import '../assets/Lesson.module.css';
</style>