import { createStore } from 'vuex'

export default createStore({
  actions:{
    fetchLogin(context, user){
      context.commit('updateErrorMessage', user.username)
    },
    fetchAllEditInformation(){
      return 
    },
    logOut(){
      return
    },
    fetchAllEditInformation(){
      return 
    },
  },
  mutations:{
    updateErrorMessage(state, errorMessage){
      state.errorMessage = errorMessage
    }
  },
  state() {
    return {
      errorMessage: "test"
    }
  },
  getters:{
    getErrorMessage: state => {
      return state.errorMessage
    },
    getGroups: () => {
      return ["1", "2", "3"]
    },
    getAlarms: () => {
      return ["1", "2", "3"]
    },
    getPlates(){
      return ["1","2","3"]
    },
    getSchedule: () => {
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
    getGroupRefKey: () => () =>{
      return ["1", "2", "3"]
    },
    getRoomRefKey: () => () =>{
      return ["1", "2", "3"]
    },
    getSubjectRefKey: () => () =>{
      return ["1", "2", "3"]
    },
    getEmployeeRefKey: () => () =>{
      return ["1", "2", "3"]
    },
    getUsername: () => {
      return "test username"
    },
    getHost: () => {
      return "1"
    },
    getVersion: () => {
      return "1"
    },
    getToken(){
      return "1"
    }
  }
})