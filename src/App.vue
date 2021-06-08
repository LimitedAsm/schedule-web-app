<template>
  <Overview v-if="this.activePage == 'Overview'"></Overview>

  <Authentication
    v-else-if="$store.state.token == ''"
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
  <p class="serverVersion">server: {{ $store.getters.getServerVersion }}</p>
  <!-- <p class="version">clien: v{{ require('../package.json').version }}</p> -->
  <p class="version">clien: {{ version }}</p>
</template>

<script>
  import Timetable from './components/Timetable';
  import Edit from './components/Edit';
  import Authentication from './components/Authentication';
  import Overview from './components/Overview';
  import {mapActions} from 'vuex';
  export default {
    name: "App",
    components: {
      Timetable,
      Edit,
      Authentication,
      Overview,
    },
    data() {
      return {
        activePage: "Timetable",
        // activePage: "Overview",
        editDate: "",
        version: ""
      }
    },
    methods: {

      ...mapActions(["fetchSchedule", "fetchServerVersion"]),
      async editSheduleOnDate(date){
        await this.fetchSchedule(date)        
        this.editDate = date;
        this.activePage = "Edit";
      },
      backToTimetable(){
        this.activePage = "Timetable";
        this.editDate = "";
      }
    },
    provide() {
      return {
        editDate: this.editDate,
      }
    },
    async created(){
      this.fetchServerVersion()
      const res = await fetch("https://api.github.com/repos/LimitedAsm/schedule-web-app/commits/main")
      let version = await res.json()
      this.version = version.sha.slice(0,6)
    }
  }
</script>

<style>
@import './assets/Main.module.css';
</style>