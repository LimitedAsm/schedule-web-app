<template>
  <EditHeader
    @saveSchedule="saveSchedule"
    @backToTimetable="backToTimetable"
  ></EditHeader>

  <template v-if="$store.state.loading != 0">
    загрузка{{$store.state.loading}}
  </template>
  <div v-else class="groups">
    <template
      v-for="group in $store.state.groups"
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
import EditHeader from './EditHeader';
import {mapActions} from 'vuex';
export default {
  name: "Edit",
  components: {
    Group,
    EditHeader
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
      date: this.editDate
    }
  },

  methods: {
    ...mapActions(["fetchGroup", "fetchTeacher", "fetchSubject", "fetchRoom", "fetchPractice"]),
    saveSchedule(){
      this.informaion = [];
      console.log(this.childrenFunction);
      this.childrenFunction.forEach(element => {
        this.informaion.push(element())
      });

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
    this.fetchGroup();
    this.fetchTeacher();
    this.fetchSubject();
    this.fetchRoom();
    this.fetchPractice();
  },
}
</script>

<style>

</style>
