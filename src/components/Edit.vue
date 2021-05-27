<template>
  <Header
    :typeHeader="'edit'"
    @saveSchedule="saveSchedule"
    @backToTimetable="backToTimetable"
  >
  </Header>
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
      // console.log(scheduleDate)
      let informaion = {}
      let lineNumber = 0
      this.childrenFunction.forEach(element => {
        const lessonInfo = element.getFunc() ;
        lineNumber += 1
        let group = this.getGroupRefKey()(lessonInfo.group)
        let subject = this.getSubjectRefKey()(lessonInfo.subject)
        let employee = this.getEmployeeRefKey()(lessonInfo.employee)
        let room = this.getRoomRefKey()(lessonInfo.room)
        let subjectSubgroup = this.getSubjectRefKey()(lessonInfo.subjectSubgroup)
        let employeeSubgroup = this.getEmployeeRefKey()(lessonInfo.employeeSubgroup)
        let roomSubgroup = this.getRoomRefKey()(lessonInfo.roomSubgroup) 
        if(group == ""){
          group = "00000000-0000-0000-0000-000000000000"
        }
        if(subject == ""){
          subject = "00000000-0000-0000-0000-000000000000"
        }
        if(employee == ""){
          employee = "00000000-0000-0000-0000-000000000000"
        }
        if(room == ""){
          room = "00000000-0000-0000-0000-000000000000"
        }
        if(subjectSubgroup == ""){
          subjectSubgroup = "00000000-0000-0000-0000-000000000000"
        }
        if(employeeSubgroup == ""){
          employeeSubgroup = "00000000-0000-0000-0000-000000000000"
        }
        if(roomSubgroup == ""){
          roomSubgroup = "00000000-0000-0000-0000-000000000000"
        }
        let lesson = {
          "groupKey": group,
          "lineNumber": lineNumber.toString(),
          "subgroup": 0,
          "lessonNumber": lessonInfo.lessonNumber,
          "subjectKey": subject,
          "subjectType": "StandardODATA.Catalog_Дисциплины",
          "teacherKey": employee,
          "roomKey": room,
        } 
        if(lessonInfo.subgroup == false){
          schedule.push(lesson)
        }
        else{
          lineNumber += 1
          lesson.subgroup = 1;
          let lessonSubgoupTwo = {
            "groupKey":  group,
            "lineNumber": lineNumber.toString(),
            "subgroup": 2,
            "lessonNumber": lessonInfo.lessonNumber,
            "subjectKey": subjectSubgroup,
            "subjectType": "StandardODATA.Catalog_Дисциплины",
            "teacherKey": employeeSubgroup,
            "roomKey": roomSubgroup,
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
}
</script>

<style>

</style>
