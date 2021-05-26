<template>
  <Header
    :typeHeader="'edit'"
    @saveSchedule="saveSchedule"
    @backToTimetable="backToTimetable"
  >
  </Header>

  <!-- <EditHeader
    @saveSchedule="saveSchedule"
    @backToTimetable="backToTimetable"
  ></EditHeader> -->

  <template v-if="$store.state.loading != 0">
    загрузка{{$store.state.loading}}
  </template>
  <div v-else class="groups">
    <template
      v-for="group in $store.getters.getGroups"
      :key="group"
      
    >
      <Group
      :group="group"
      ></Group>
    </template>
  </div>
</template>

<script>
import Group from './Group';
import {mapActions, mapGetters} from 'vuex';
import Header from './Header.vue';
export default {
  name: "Edit",
  components: {
    Group,
    Header
  },

  props: [
    "editDate",
    // "schedule"
  ],

  emits: [
    "backToTimetable"
  ],

  data() {
    return {
      childrenFunction: [],
      date: this.editDate,
    }
  },

  methods: {
    ...mapActions(["fetchAllEditInformation"]),
    ...mapGetters(["getGroupRefKey", "getRoomRefKey", "getSubjectRefKey", "getEmployeeRefKey", "getHost", "getToken"]),
    async saveSchedule(){
      let date = new Date(this.date)
      let schedule  = [];
      const scheduleDate = date.toISOString().slice(0, -5)
      let informaion = {}
      let lineNumber = 0
      this.childrenFunction.forEach(element => {
        const lessonInfo = element.getFunc() ;
        lineNumber += 1
        let lesson = {
          "groupKey": this.getGroupRefKey()(lessonInfo.group),
          "lineNumber": lineNumber.toString(),
          "subgroup": 0,
          "lessonNumber": lessonInfo.lessonNumber,
          "subjectKey": this.getSubjectRefKey()(lessonInfo.subject),
          "subjectType": "StandardODATA.Catalog_Дисциплины",
          "teacherKey": this.getEmployeeRefKey()(lessonInfo.employee),
          "roomKey": this.getRoomRefKey()(lessonInfo.room),
        } 
        if(lessonInfo.subgroup == false){
          schedule.push(lesson)
        }

        else{
          lineNumber += 1
          lesson.Подгруппа = 1;
          let lessonSubgoupTwo = {
            "groupKey":  this.getGroupRefKey()(lessonInfo.group),
            "lineNumber": lineNumber.toString(),
            "subgroup": 2,
            "lessonNumber": lessonInfo.lessonNumber,
            "subjectKey": this.getSubjectRefKey()(lessonInfo.subjectSubgroup),
            "subjectType": "StandardODATA.Catalog_Дисциплины",
            "teacherKey": this.getEmployeeRefKey()(lessonInfo.employeeSubgroup),
            "roomKey": this.getRoomRefKey()(lessonInfo.roomSubgroup),
          } 
          schedule.push(lesson)
          schedule.push(lessonSubgoupTwo)
        }

        informaion = {
          "scheduleDate": scheduleDate,
          "alarmsScheduleKey": "f0c7b75a-a488-4d9b-a175-f8374de43184", 
          "schedule": schedule
        }
      });
      // console.log(informaion);
      
      await fetch(
        this.getHost() + 'schedule/create',
        {
          method: 'POST',
          headers: {
              "Authorization": "Token " + this.getToken(),
              "Content-Type": "application/json"
          },
          body: JSON.stringify(informaion)
        }
      )
      
      this.backToTimetable();
    },
    backToTimetable(){
      this.childrenFunction = [];
      this.$emit("backToTimetable");
    },
    getChildrenFunction(getFunc, setFunc){
      this.childrenFunction.push({"getFunc": getFunc, "setFunc":setFunc})
    },
    
  },
  provide() {
    return {
      date: this.date,
      dates: "",
      getChildrenFunction: this.getChildrenFunction
    }
  },
  async created() {
    this.fetchAllEditInformation();
  },
  // async mounted(){ 
  // }
}
</script>

<style>

</style>
