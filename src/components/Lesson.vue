<template>
  <div class="lesson__info">
    <div class="main__info">
      <div class="select__menu">
        <div class="subgroup main__group">
          <input
            list="subject"
            placeholder="Предмет"
            v-model="lesson.subject"
          />
          <datalist id="subject" title="Предмет">
            <option 
              v-for="subject in $store.getters.getSubjects"
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
              v-for="employee in $store.getters.getEmployees"
              :key="employee"
            >
              {{ employee }}
            </option>
          </datalist>
          <input 
            list="room" 
            placeholder="Кабинет" 
            v-model="lesson.room"
          />
          <datalist id="room" title="Кабинет">
            <option 
              v-for="room in $store.getters.getRooms"
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
                v-for="subject in $store.getters.getSubjects"
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
                v-for="employee in $store.getters.getEmployees"
                :key="employee"
              >
                {{ employee }}
              </option>
            </datalist>

            <input 
              list="room" 
              placeholder="Кабинет" 
              v-model="lesson.roomSubgroup"
            />
            <datalist id="room" title="Кабинет">
              <option 
                v-for="room in $store.getters.getRooms"
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
      
      <div class="option">
        <button 
          class="option__btn"
          v-on:click="handleSubgroupButton"
        >
          <input
          v-bind:id="group + lessonNumber"
          type="checkbox"
          v-model="lesson.subgroup"
          >
          По подгруппам
        </button>
        <!-- <label 
          v-bind:for="group + lessonNumber"
        ></label> -->

        <button 
          type="button" 
          class="option__btn del"
          v-on:click="handleInsertLesson"
        >
        вставка
        </button>
      
        <button 
          type="button" 
          class="option__btn del"
          v-on:click="handleCopyLesson" 
        > 
        копия
        </button> 
      
        <button 
          type="button" 
          class="option__btn del addDown"
          v-on:click="shiftLessonUp"
        >Сдвиг вверх
        </button>
      
        <button
          type="button"
          class="option__btn"
          v-on:click="shiftLessonDown"
        >Сдвиг вниз
        </button>

        <button 
          type="button" 
          class="option__btn"
          v-on:click="handleCleaningLesson"  
        >Очистка
        </button>
      </div>
    </div>

</div>
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
    "schedule"
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

  methods: {
    ...mapActions(["copyLesson"]),
    ...mapGetters(["getSchedule", "getSubjectByRefKey", "getGroupRefKey", "getEmployeeByRefKey", "getRoomByRefKey"]),
    handleSubgroupButton(){
      this.lesson.subgroup = !this.lesson.subgroup 
    },
    handleInsertLesson(){
      if(this.$store.getters.getCopiedLesson != "notOneCopy"){
        this.lesson = this.$store.getters.getCopiedLesson;
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

</style>