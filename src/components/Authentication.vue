<template>
    Логин: <input v-model="user.login" type="text">
    Пороль: <input v-model="user.password" type="password"> 
    <button v-on:click="this.fetchLogin(this.user)">Войти</button>
</template>

<script>
import {mapActions} from 'vuex';
export default {
    name: "authentication",
    data() {
    return {
      user: { 
          login: '',
          password: ''
      }  
      
    }
  },
    methods: mapActions(["fetchLogin"]),
}
</script>

