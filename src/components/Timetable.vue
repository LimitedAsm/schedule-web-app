<template>
<TimetableHeader></TimetableHeader>
<div class="main main-timetable">
    <p class="main__title">Список администрируемых расписаний</p>
    <div class="main__inner">
        <div 
            class="timetable" 
            v-for="date in this.dates"
            :key="date"
        >
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
import TimetableHeader from './TimetableHeader';
export default {
  name: "Timetable",
  components: {
    TimetableHeader,
  },
  emits: [
    "editSheduleOnDate"
  ],
  
  data() {
    return {
      dates: ["26.04.2021","27.04.2021","28.04.2021","29.04.2021","30.04.2021","01.05.2021"],

    }
  },

  methods:{
    editSheduleOnDate(date){
      this.$emit('editSheduleOnDate', date);
    },
  },

  provide() {
    return {
      dates: this.dates
    }
  },
}
</script>

<style>
@import '../assets/Timetable.module.css';
</style>