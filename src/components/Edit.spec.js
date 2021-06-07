import { mount } from "@vue/test-utils"
import { createStore } from 'vuex'
import Edit from './Edit.vue'

const store = createStore({
  getters:{
    getGroups: () => {
      return ["1", "2", "3"]
    },
    getAlarms: () => {
      return ["1", "2", "3"]
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
      return ""
    },
  }
})

const wrapper = mount(Edit, {
  global: {
    plugins: [store]
  }
})

test('Render groups', () => {
  const group =  wrapper.get('[data-test="group"]')
  expect(group).toBeDefined()
})

test('Render several groups', () => {
  const groups = wrapper.findAll('[data-test="group"]')
  expect(groups).toHaveLength(3)
})

test('Render alarms', () => {
  const alarms =  wrapper.get('[data-test="alarm"]')
  expect(alarms).toBeDefined()
})

test('Render several groups', () => {
  const alarms = wrapper.findAll('[data-test="alarm"]')
  expect(alarms).toHaveLength(3)
})