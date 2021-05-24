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
        editDate: "" 
      }
    },
    methods: {
      ...mapActions(["newEdit"]),

      editSheduleOnDate(date){
        this.activePage = "Edit";
        this.editDate = date;
      },
      backToTimetable(){
        this.activePage = "Timetable";
        this.editDate = "";
        this.newEdit();
      }
    },

    provide() {
      return {
        editDate: this.editDate,
      }
    },
  }
</script>

<style>
@import './assets/Main.module.css';
</style>