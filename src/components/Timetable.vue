<template>
<Header
 :typeHeader="'timetable'"
></Header>
<div class="main main-timetable">
  <div class="select__block">
    <p class="select__text">Площадка: </p>
    <select class="select">
      <option
        data-test="plates"
        v-for="plate in this.plates"
        :key="plate"
      >{{plate}}</option>
    </select>
  </div>
  <p class="main__title">Список администрируемых расписаний</p>
  <div class="main__inner">
      <div 
          class="timetable" 
          v-for="date in this.getDates"
          :key="date"
      >
          <p 
            class="timetable__date"
            data-test="timetable"
          >{{ date }}</p>
          <button    
              class="header__btn"
              v-on:click="editSheduleOnDate(date)"
          >Редактировать</button>
      </div>
  </div>
</div>

</template>

<script>
import { mapGetters } from 'vuex';
import Header from './Header.vue';
export default {
  name: "Timetable",
  components: {
    Header
  },
  emits: [
    "editSheduleOnDate"
  ],
  computed:{
    getDates(){
      let now = new Date();
      const weekDayNow = now.getDay();
      let startDay = new Date();
      let dates = [];
      if(weekDayNow > 1){
        startDay.setDate(startDay.getDate() - weekDayNow + 1);
      }
      else if(weekDayNow == 0){
        startDay.setDate(startDay.getDate() - 6);
      }
      startDay.setDate(startDay.getDate() - 1)
      for(let i = 1; i <= 14; i++){
        startDay.setDate(startDay.getDate() + 1)
        if(startDay.getDay() != 0){
          let date =  [startDay.getFullYear()] + "-"
          if(startDay.getMonth() < 10){
            date += "0" + [startDay.getMonth() + 1]
          }
          else{
            date += [startDay.getMonth() + 1]
          }
          if(startDay.getDate() < 10){
            date += "-" + "0" + [startDay.getDate()]
          }
          else{
            date += "-" + [startDay.getDate()]
          }
          dates.push(date);
        }
      }
      return dates;
    },
    plates(){
      return this.getPlates()
    }
  },
  methods:{
    ...mapGetters(["getPlates"]),
    editSheduleOnDate(date){
      this.$emit('editSheduleOnDate', date);
    },
  },
  provide() {
    return {
      dates: this.getDates,
      date: ""
    }
  },
  // created(){
  //   this.fetchAllEditInformation()
  // }
}
</script>

<style>
@import '../assets/Timetable.module.css';
</style>