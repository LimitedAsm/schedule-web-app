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
            class="header__btn header__item"
            v-on:click="saveSchedule"
          >Сохранить</button>
        </template>
      </div>
      <template v-if="this.typeHeader == 'edit'">
        <p class="header__data">{{this.date}}</p>
      </template>
      <template v-if="this.typeHeader == 'timetable'">
        <p class="header__data">{{ this.dateFirst }} - {{ this.dateLast }}</p>
      </template>
      <div class="header__right">
        <p class="header__user">{{ $store.state.username }}</p>
        <button 
          class="header__btn danger"
          v-on:click="handleLogOut"
        >Выйти</button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex';
export default {
  name: "Header",
  emits: [
    "saveSchedule",
    "backToTimetable"
  ],
  props: [
    "typeHeader"
  ],
  inject: [
    "date",
    "dates"
  ],
  computed: {
    dateFirst() {
        return this.dates[0]
    },
    dateLast() {
        return this.dates[this.dates.length - 1]
    }
  },
  methods: {
    ...mapActions(["logOut"]),
    handleLogOut(){
      this.backToTimetable()
      this.logOut()
    },
    saveSchedule(){
      this.$emit("saveSchedule")
    },
    backToTimetable(){
      this.$emit("backToTimetable")
    }
  },
}
</script>

<style>
@import '../assets/Header.module.css';
</style>