import { createStore } from 'vuex'

export default createStore({
  actions:{
    fetchLogin(context, user){
      if (user.username == "correct username" && user.password == "correct possword"){
        context.commit('updateMessage', "you new token")
      }
      else{
        context.commit('updateMessage', "Неверный логин или пароль")
      }
    },
    synchronization1CServer(){
      return 
    },
    logOut(){
      return
    },
  },
  mutations:{
    updateMessage(state, message){
      state.message = message
    }
  },
  state() {
    return {
      message: "test",
      loading: 0
    }
  },
  getters:{
    getMessage: state => {
      return state.message
    },
    getGroups(){
      return ["1", "2", "3"]
    },
    getAlarms(){
      return ["1", "2", "3"]
    },
    getPlates(){
      return ["1","2","3"]
    },
    getSchedule(){
      return "noSchedule"
    },
    getSubjects(){
      return ["1", "2", "3"]
    },
    getEmployees(){
      return ["1", "2", "3"]
    }, 
    getRooms(){
      return ["1", "2", "3"]
    },
    getGroupRefKey(){
      return ["1", "2", "3"]
    },
    getRoomRefKey(){
      return ["1", "2", "3"]
    },
    getSubjectRefKey(){
      return ["1", "2", "3"]
    },
    getEmployeeRefKey(){
      return ["1", "2", "3"]
    },
    getUsername(){
      return "test username"
    },
    getHost(){
      return "1"
    },
    getVersion(){
      return "1"
    },
    getToken(){
      return ""
    }
  }
})