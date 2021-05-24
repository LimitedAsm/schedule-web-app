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
// import EditHeader from './EditHeader';
import {mapActions, mapGetters} from 'vuex';
import Header from './Header.vue';
export default {
  name: "Edit",
  components: {
    Group,
    // EditHeader,
    Header
  },

  props: [
    'editDate'
  ],

  emits: [
    "backToTimetable"
  ],

  data() {
    return {
      childrenFunction: [],
      informaion: [],
      date: this.editDate,
      copiedLesson: "notOneCopy"
    }
  },

  methods: {
    // ...mapActions(["fetchGroup", "fetchTeacher", "fetchSubject", "fetchRoom", "fetchPractice"]),
    ...mapActions(["fetchAllEditInformation"]),
    ...mapGetters(["getGroupRefKey"]),
    saveSchedule(){
      this.informaion = [];
      this.childrenFunction.forEach(element => {
        const group = element()[0]
        const data = element()[1]
        this.informaion.push({
          "groupRef_key": this.getGroupRefKey(group),
          "data": data,
        })
      });
      console.log(this.informaion);
      this.backToTimetable();
    },

    backToTimetable(){
      this.childrenFunction = [];
      this.informaion = [];
      this.$emit("backToTimetable");
    },

    getChildrenFunction(func){
      this.childrenFunction.push(func)
    },
    
  },

  provide() {
    return {
      date: this.date,
      getChildrenFunction: this.getChildrenFunction
    }
  },

  async created() {
    this.fetchAllEditInformation();
    // this.fetchGroup();
    // this.fetchEmployee();
    // this.fetchSubject();
    // this.fetchRoom();
    // this.fetchPractice();
  },
}
</script>

<style>

</style>
