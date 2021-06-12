<template>
  <Header
    :typeHeader="'edit'"
    @saveSchedule="saveSchedule"
    @backToTimetable="backToTimetable"
    @backToAuthentication="backToAuthentication"
    :propDate="this.date"
  ></Header>
  <template v-if="$store.state.loading != 0">
    загрузка{{$store.state.loading}}
  </template>
  <div v-else>
    <div class="select__edit__block">
      <p class="select__text">Расписание звонков: </p>
      <select class="select__edit" v-model="selectAlarm">
        <option 
          selected
          v-for="alarm in this.alarms"
          :key="alarm"
          data-test="alarm"
        >{{alarm}}</option>
      </select>
    </div>
    <div class="groups" >
      <template
        v-for="group in this.groups"
        :key="group"
      >
        <Group
          data-test="group"
          :group="group"
        ></Group>
      </template>
    </div>
  </div>
</template>

<script>
import swal from 'sweetalert';
import Group from './Group';
import {mapGetters} from 'vuex';
import Header from './Header.vue';
export default {
  name: "Edit",
  components: {
    Group,
    Header,
  },
  props: [
    "editDate",
  ],
  emits: [
    "backToTimetable",
    "backToAuthentication"
  ],
  data() {
    return {
      childrenFunction: [],
      date: this.editDate,
      selectAlarm: "Стандартное"
    }
  },
  computed: {
    alarms(){
      return this.getAlarms()
    },
    groups(){
      return this.getGroups()
    }
  },
  methods: {
    ...mapGetters(["getVersion","getGroupRefKey", "getRoomRefKey", "getSubjectRefKey",
     "getEmployeeRefKey", "getAlarmRefKey", "getHost", "getToken", "getAlarms", "getGroups"]),
    async saveSchedule(isFinal){
      let date = new Date(this.date)
      let schedule = [];
      const scheduleDate = date.toISOString().slice(0, -5)
      let informaion = {}
      let lineNumber = 0
      this.childrenFunction.forEach(element => {
        const lessonInfo = element.getFunc() ;
        if(lessonInfo.delited == false){
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
        }
      });
      informaion = {
          "is_final": isFinal,
          "scheduleDate": scheduleDate,
          "alarmsScheduleKey": this.getAlarmRefKey()(this.selectAlarm), 
          "schedule": schedule
      }
      console.log(informaion)
      await fetch(
        this.getHost() + this.getVersion() + '/schedule/create',
        {
          method: 'POST',
          headers: {
            "Authorization": "Token " + this.getToken(),
            "Content-Type": "application/json"
          },
          body: JSON.stringify(informaion)
        }
      )
      .then(
        async response => {
          const responseJSON = await response.json()
          if(responseJSON.message == "success"){
            swal("Расписание успешно сохранено")
          }
          else{
            swal("Ошибка сохранения расписания")
          }          
        },
        reject => {
            console.log('Error: ', reject)
            swal("Сервер недоступен обратитесь к системному администратору")
        })
    },
    backToTimetable(){
      this.childrenFunction = [];
      this.$emit("backToTimetable");
    },
    backToAuthentication(){
      this.$emit("backToAuthentication");
    },
    getChildrenFunction(getFunc, setFunc){
      this.childrenFunction.push({"getFunc": getFunc, "setFunc":setFunc})
    },
  },
  provide() {
    return {
      getChildrenFunction: this.getChildrenFunction
    }
  },
}
</script>

<style>

</style>
