<template>
  <div class="header__bg">
    <div class="header fixed-nav-bar">
      <div class="header__left">
        <img src="../assets/logo.png" alt="Логотип" class="header__logo header__item"/>
      </div>
      <p class="header__data">{{ this.dateFirst }} - {{ this.dateLast }}</p>
      <div class="header__right">
        <p class="header__user">{{ $store.state.user }}</p>
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
  inject: [
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
  methods:{
    ...mapActions(["logOut"]),
    handleLogOut(){
      this.logOut()
    },
  }
}
</script>

<style>
@import '../assets/Header.module.css';
</style>