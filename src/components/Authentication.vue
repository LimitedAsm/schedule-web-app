<template>
  <div class="authenticationForm">
    <div class="authenticationLable">Авторизация</div>
    <input class="login" v-model="user.username" placeholder="Логин" type="text" />
    <input class="password" v-model="user.password" placeholder="Пароль" type="password" />    
    <button class="authenticationButton" v-on:click="handleAuthorization">Войти</button>
    <div class="message">{{ message }}</div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
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
  emits: [
    "authorizationSuccess"
  ],
  computed:{
    message(){
      return this.getMessage()
    }
  },
  methods: {
    ...mapActions(["fetchLogin", "synchronization1CServer"]),
    ...mapGetters(["getMessage"]),
    async handleAuthorization()  {
      await this.fetchLogin(this.user);
      await this.synchronization1CServer();
      if(this.message == "" || this.message == "Данные успешно обновлены" || this.message == "Новых данных не обнаруженно"){
        this.$emit("authorizationSuccess");
      }
    },
  },
};
</script>

<style>
@import "../assets/Authentication.module.css";
</style>
