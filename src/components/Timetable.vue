<template>
  <Header
    :typeHeader="'timetable'"
    @getDates="getDates"
    @backToAuthentication="backToAuthentication"
    :propDates="this.dates"
  ></Header>
  <div class="main main-timetable">
    <div class="select__block">
      <p class="select__text">Площадка:</p>
      <select class="select">
        <option data-test="plates" v-for="plate in this.plates" :key="plate">
          {{ plate }}
        </option>
      </select>
    </div>
    <p class="main__title">Список администрируемых расписаний</p>
    <div class="main__inner">
      <div class="timetable" v-for="date in this.dates" :key="date">
        <div v-if="isFinalList.includes(date)">!</div>
        <p class="timetable__date" data-test="timetable">{{ date }}</p>
        <button class="header__btn" v-on:click="editSheduleOnDate(date)">
          Редактировать
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Header from "./Header.vue";
export default {
  name: "Timetable",
  components: {
    Header,
  },
  data() {
    return {
      dates: [],
      shiftDate: 0,
    };
  },
  emits: ["editSheduleOnDate", "backToAuthentication"],
  computed: {
    plates() {
      return this.getPlates();
    },
    isFinalList() {
      // console.log( this.getScheduleIsFinalList());
      return this.getScheduleIsFinalList()
    }
  },
  methods: {
    ...mapGetters(["getPlates", "getScheduleIsFinalList"]),
    editSheduleOnDate(date) {
      this.$emit("editSheduleOnDate", date);
    },
    backToAuthentication() {
      this.$emit("backToAuthentication");
    },
    getDates(shiftDate = 0) {
      let fullShiftDate = shiftDate + this.shiftDate;
      this.shiftDate = this.shiftDate + shiftDate;
      let now = new Date();
      const weekDayNow = now.getDay();
      let startDay = new Date();
      startDay.setDate(now.getDate() + fullShiftDate);
      now.setDate(now.getDate() + fullShiftDate);
      let dates = [];
      if (weekDayNow > 1) {
        startDay.setDate(startDay.getDate() - weekDayNow + 1);
      } else if (weekDayNow == 0) {
        startDay.setDate(startDay.getDate() - 6);
      }
      startDay.setDate(startDay.getDate() - 1);
      for (let i = 1; i <= 14; i++) {
        startDay.setDate(startDay.getDate() + 1);
        if (startDay.getDay() != 0) {
          let date = [startDay.getFullYear()] + "-";
          if (startDay.getMonth() < 10) {
            date += "0" + [startDay.getMonth() + 1];
          } else {
            date += [startDay.getMonth() + 1];
          }
          if (startDay.getDate() < 10) {
            date += "-" + "0" + [startDay.getDate()];
          } else {
            date += "-" + [startDay.getDate()];
          }
          dates.push(date);
        }
      }
      this.dates = [];
      this.dates.push(...dates);
      return dates;
    },
  },
  created() {
    this.getDates(0);
  },
};
</script>

<style>
@import "../assets/Timetable.module.css";
</style>
