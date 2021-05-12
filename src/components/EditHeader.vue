<template>
  <div class="header__bg">
    <div class="header fixed-nav-bar">
      <div class="header__left">
        <img
          src="../assets/logo.png"
          alt="Логотип"
          class="header__logo header__item"
        />
        <button 
          class="header__btn header__item"
          v-on:click="backToTimetable"
        >Назад</button>
        <button 
          class="header__btn header__item"
          v-on:click="saveSchedule"
        >Сохранить</button>
      </div>
      <p class="header__data">{{this.date}}</p>
      <div class="header__right">
        <p class="header__user">{{ $store.state.user }}</p>
        <button class="header__btn danger">Выйти</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  emits: [
    "saveSchedule",
    "backToTimetable"
  ],
  methods: {
    saveSchedule(){
      this.$emit("saveSchedule")
    },
    backToTimetable(){
      this.$emit("backToTimetable")
    }
  },
  inject: [
    "date"
  ],
}

</script>

<style>

</style>