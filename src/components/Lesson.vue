<template>

  <div class="lesson__info">
    <div class="main__info">
      <div class="select__menu">
        <div class="subgroup main__group">
          <input
            list="subjects"
            placeholder="Предмет"
            v-model="lesson.subject"
          />
          <datalist id="subjects" title="Предмет">
            <option 
              v-for="subjects in $store.state.subjects"
              :key="subjects"
            >
              {{ subjects }}
            </option>
          </datalist>

          <input
            list="teacher"
            placeholder="Преподаватель"
            v-model="lesson.teacher"
          />
          <datalist id="teacher" title="Преподаватель">
            <option 
              v-for="teacher in $store.state.teachers"
              :key="teacher"
            >
              {{ teacher }}
            </option>
          </datalist>

          <input 
            list="room" 
            placeholder="Кабинет" 
            v-model="lesson.room"
          />
          <datalist id="room" title="Кабинет">
            <option 
              v-for="room in $store.state.rooms"
              :key="room"
            >
              {{ room }}
            </option>
          </datalist>
          <input 
            list="идентификатор5" 
            placeholder="Заметки" 
            v-model="lesson.note"
          />
        </div>

        <template v-if='subgroup'>
          <div class="subgroup main__group">
            <input
              list="subjects"
              placeholder="Предмет"
              v-model="lesson.subjectSubgroup"
            />
            <datalist id="subjects" title="Предмет">
              <option 
                v-for="subjects in $store.state.subjects"
                :key="subjects"
              >
                {{ subjects }}
              </option>
            </datalist>

            <input
              list="teacher"
              placeholder="Преподаватель"
              v-model="lesson.teacherSubgroup"
            />
            <datalist id="teacher" title="Преподаватель">
              <option 
                v-for="teacher in $store.state.teachers"
                :key="teacher"
              >
                {{ teacher }}
              </option>
            </datalist>

            <input 
              list="room" 
              placeholder="Кабинет" 
              v-model="lesson.roomSubgroup"
            />
            <datalist id="room" title="Кабинет">
              <option 
                v-for="room in $store.state.rooms"
                :key="room"
              >
                {{ room }}
              </option>
            </datalist>
            <input 
              list="идентификатор5" 
              placeholder="Заметки" 
              v-model="lesson.noteSubgroup"
            />
          </div>
        </template>
      </div>    
      
      <div class="option">
        <input
          v-bind:id="group + lesson"
          type="checkbox"
          v-model="lesson.subgroup"
        />
        <label 
          v-bind:for="group + lesson"
        ></label>


        <button type="button" class="option__btn del">
          <img src="../assets/arrow-up.svg" /><img
            src="../assets/file.svg"
          />
        </button>
        <button type="button" class="option__btn del">
          <img src="../assets/arrow-down.svg" /><img
            src="../assets/file.svg"
          />
        </button>
        <button 
          type="button" 
          class="option__btn del addDown"
          v-on:click="createCopyOfLessonBefore"
        >
          <img src="../assets/arrow-up.svg" /><img
            src="../assets/file-code.svg"
          />
        </button>

        <button
          type="button"
          class="option__btn"
          v-on:click="createCopyOfLessonAfter"
        >
          <img src="../assets/arrow-down.svg" /><img
            src="../assets/file-code.svg"
          />
        </button>

        <button 
          type="button" 
          class="option__btn"
          v-on:click="deleteLesson"  
        >
          <img src="../assets/trash.svg" />
        </button>
      </div>
    </div>

</div>
</template>

<script>
export default {
  name: "Lesson",
  props: [
    "lessonNumber",
    "group"
  ],
  emits: [
    "createCopyOfLessonBefore",
    "createCopyOfLessonAfter",
    "deleteLesson"  
  ],
  inject: [
    "getLessonFunction",
    "getChildrenFunction"
  ],
  data() {
    return {
      lesson:{
        note: "",
        room: "",
        teacher: "",
        subject: "",

        noteSubgroup: "",
        roomSubgroup: "",
        teacherSubgroup: "",
        subjectSubgroup: "",

        subgroup: false,
      }
    }
  },

  methods: {
    createCopyOfLessonAfter(){
      this.$emit('createCopyOfLessonAfter', this.lesson);
    },
    createCopyOfLessonBefore(){
      this.$emit('createCopyOfLessonBefore', this.lesson);
    },
    deleteLesson(){
      this.note = "",
      this.room = "",
      this.teacher = "",
      this.subject = "",

      this.noteSubgroup = "",
      this.roomSubgroup = "",
      this.teacherSubgroup = "",
      this.subjectSubgroup = "",

      this.subgroup = false,
      this.$emit('deleteLesson', this.lesson);
    },
    returnChildrenFunction(){
      let main = {
        note: this.note,
        room: this.room,
        teacher: this.teacher,
        subject: this.subject,
      }

      let sub = {
        noteSubgroup: this.noteSubgroup,
        roomSubgroup: this.roomSubgroup,
        teacherSubgroup: this.teacherSubgroup,
        subjectSubgroup: this.subjectSubgroup,
      }

      let groupInfo = {
        subgroup: this.subgroup, 
        group: this.group
      }

      if (this.subgroup){
        return{ 
          ...main,
          ...sub,
          ...groupInfo
        }
      }
      else{
        return{ 
          ...main,
          ...groupInfo
        }
      }
    },
    returnLessonFunction:{
      get(){
        this.lesson;
      },
      set(lesson){
        this.lesson = lesson;
      }
    }
  }, 
  created(){ 
    this.getChildrenFunction(this.returnChildrenFunction),
    this.getLessonFunction(this.returnLessonFunction)
  }, 
  
  // beforeUnmount(){

  // }
}
</script>

<style>

</style>