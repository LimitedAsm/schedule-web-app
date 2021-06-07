<template>
  <div class="authenticationForm">
    <div class="authenticationLable">Авторизация</div>
    <input v-model="user.username" placeholder="Логин" type="text" />
    <input v-model="user.password" placeholder="Пароль" type="password" />    
    <button class="authenticationButton" v-on:click="handleAuthorization">Войти</button>
    <div class="errorMessage">{{ $store.getters.getErrorMessage }}</div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Authentication",
  data() {
    return {
      user: {
        username: "administrator",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions(["fetchLogin", "fetchAllEditInformation"]),
    async handleAuthorization()  {
      await this.fetchLogin(this.user);
      this.fetchAllEditInformation();
    },
  },
};
</script>

<style>
@import "../assets/Authentication.module.css";
</style>
