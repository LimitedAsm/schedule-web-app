<template>
  <Authentication
    v-if="this.activePage == 'Authentication'"
    @authorizationSuccess="authorizationSuccess"
  ></Authentication>
  <Timetable
    v-else-if="this.activePage == 'Timetable'"
    @editSheduleOnDate="editSheduleOnDate"
    @backToAuthentication="backToAuthentication"
  ></Timetable>
  <Edit
    v-else-if="this.activePage == 'Edit'"
    :editDate="this.editDate"
    @backToAuthentication="backToAuthentication"
    @backToTimetable="backToTimetable"
  ></Edit>
  <p class="serverVersion">server: {{ $store.getters.getServerVersion }}</p>
  <p class="version">client: {{ version }}</p>
</template>

<script>
import Timetable from "./components/Timetable";
import Edit from "./components/Edit";
import Authentication from "./components/Authentication";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "App",
  components: {
    Timetable,
    Edit,
    Authentication,
  },
  data() {
    return {
      activePage: "Authentication",
      editDate: "",
      version: "",
    };
  },
  methods: {
    ...mapActions(["fetchSchedule", "fetchServerVersion"]),
    ...mapGetters(["getToken", "getLoading"]),
    async editSheduleOnDate(date) {
      await this.fetchSchedule(date);
      this.editDate = date;
      this.activePage = "Edit";
    },
    backToTimetable() {
      this.activePage = "Timetable";
      this.editDate = "";
    },
    backToAuthentication() {
      this.activePage = "Authentication";
    },
    authorizationSuccess() {
      this.activePage = "Timetable";
    },
  },
  provide() {
    return {
      editDate: this.editDate,
    };
  },
  async created() {
    this.fetchServerVersion();
    const res = await fetch(
      "https://api.github.com/repos/LimitedAsm/schedule-web-app/commits/main"
    );
    let version = await res.json();
    this.version = version.sha.slice(0, 6);
  },
};
</script>

<style>
@import "./assets/Main.module.css";
</style>
