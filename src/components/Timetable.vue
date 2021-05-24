<template>
<Header
 :typeHeader="'timetable'"
></Header>
<!-- <TimetableHeader></TimetableHeader> -->
<div class="main main-timetable">
    <p class="main__title">Список администрируемых расписаний</p>
    <div class="main__inner">
        <div 
            class="timetable" 
            v-for="date in this.getDates"
            :key="date"
        >
            <!-- <img src="../assets/calendar.svg"> -->
            <p class="timetable__date">{{ date }}</p>
            <button    
                class="header__btn"
                v-on:click="editSheduleOnDate(date)"
            >Редактировать</button>
        </div>
    </div>
</div>

</template>

<script>
import Header from './Header.vue';
// import TimetableHeader from './TimetableHeader';
export default {
  name: "Timetable",
  components: {
    // TimetableHeader,
    Header
  },
  
  emits: [
    "editSheduleOnDate"
  ],
  
  // data() {
  //   return {
  //     dates: ["26.04.2021","27.04.2021","28.04.2021","29.04.2021","30.04.2021","01.05.2021"],
  //   }
  // },

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
    }
  },
  methods:{
    editSheduleOnDate(date){
      this.$emit('editSheduleOnDate', date);
    },
  },
  provide() {
    return {
      dates: this.getDates
    }
  },
}
</script>

<style>
@import '../assets/Timetable.module.css';
</style>