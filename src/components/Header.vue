<template>
  <div class="header__bg">
    <div class="header fixed-nav-bar">
      <div class="header__left">
        <img
          src="../assets/logo.png"
          alt="Логотип"
          class="header__logo header__item"
        />
        <template v-if="this.typeHeader == 'edit'">
          <button 
            class="header__btn header__item"
            v-on:click="backToTimetable"
          >Назад</button>
          <button 
            data-test="saveButton"
            class="header__btn header__item"
            v-on:click="saveSchedule"
          >Сохранить</button>
        </template>
      </div>
      <template v-if="this.typeHeader == 'edit'">
        <p class="header__data" data-test="editDate">{{this.propDate}}</p>
      </template>
      <div class="dateDiv" v-else-if="this.typeHeader == 'timetable'">
        <button v-on:click="hendlerShiftDatePast" class="buttonLeft"><img src="../assets/arrow_back.svg"></button>
        <p class="header__data" data-test="timetableDate">{{ this.dateFirst }} - {{ this.dateLast }}</p>
        <button  v-on:click="hendlerShiftDateFuter" class="buttonRight"><img src="../assets/arrow_forward.svg"></button>
      </div>
      <div class="header__right">
        <button class="header__btn header__item" v-on:click="hendlerSynchronization" >Обновление данных 1С</button>
        <p class="header__user">{{ username }}</p>
        <button 
          class="header__btn danger"
          v-on:click="handleLogOut"
        >Выйти</button>
      </div>
    </div>
  </div>
</template>

<script>
import swal from 'sweetalert';
import {mapActions, mapGetters} from 'vuex';
export default {
  name: "Header",
  emits: [
    "saveSchedule",
    "backToTimetable",
    "getDates"
  ],
  props: [
    "typeHeader",
    "propDates",
    "propDate"
  ],
  computed: {
    dateFirst() {
        return this.propDates[0]
    },
    dateLast() {
        return this.propDates[this.propDates.length - 1]
    },
    username(){
      return this.getUsername()
    }
  },
  methods: {
    ...mapActions(["logOut", "synchronization1CServer"]),
    ...mapGetters(["getHost", "getVersion", "getToken", "getUsername","getMessage"]),
    handleLogOut(){
      this.backToTimetable()
      this.logOut()
    },
    saveSchedule(){
      this.$emit("saveSchedule")
    },
    backToTimetable(){
      this.$emit("backToTimetable");
    },

    async hendlerSynchronization(){
      await this.synchronization1CServer()
      console.log(this.getMessage())
      swal(this.getMessage())
      console.log(this.getMessage())
    },
    hendlerShiftDatePast(){
      this.$emit("getDates", -7)
    },
    hendlerShiftDateFuter(){
      this.$emit("getDates", 7)
    }
  },
}
</script>

<style>
@import '../assets/Header.module.css';
</style>