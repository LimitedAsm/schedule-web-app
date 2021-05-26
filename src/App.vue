<template>

  <Authentication
    v-if="$store.state.token == ''"
  ></Authentication>
  <Timetable 
    v-else-if="this.activePage == 'Timetable'"
    @editSheduleOnDate="editSheduleOnDate"
  ></Timetable>
  <Edit 
    v-else-if="this.activePage == 'Edit'"
    :editDate="this.editDate"
    
    @backToTimetable="backToTimetable"
  ></Edit>
</template>

<script>
  import Timetable from './components/Timetable';
  import Edit from './components/Edit';
  import Authentication from './components/Authentication';
  import {mapActions} from 'vuex';
  export default {
    name: "App",
    components: {
      Timetable,
      Edit,
      Authentication
    },
    data() {
      return {
        activePage: "Timetable",
        editDate: "",
        // schedule: "" 
      }
    },
    methods: {
      ...mapActions(["newEdit", "fetchSchedule"]),
      // ...mapGetters(["getHost", "getToken"]),
      editSheduleOnDate(date){


        this.fetchSchedule(date)
        
        
        this.editDate = date;
        this.activePage = "Edit";
      },
      backToTimetable(){
        this.activePage = "Timetable";
        this.editDate = "";
        // this.schedule = "";
        this.newEdit();
      }
    },

    provide() {
      return {
        editDate: this.editDate,
        schedule: this.schedule
      }
    },
  }
</script>

<style>
@import './assets/Main.module.css';
</style>