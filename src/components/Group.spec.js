import { mount } from "@vue/test-utils"
import { createStore } from 'vuex'
import Group from './Group.vue'

const store = createStore({
  getters:{
    getGroups: () => {
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
  }
})

const wrapper = mount(Group, {
  global: {
    plugins: [store],

    provide: {
      getChildrenFunction() {
        (getFunc, setFunc) =>{
          this.childrenFunction.push({"getFunc": getFunc, "setFunc":setFunc})
        } 
      }
    }
  },
  
})

test('Render lessons', () => {
  const lesson =  wrapper.get('[data-test="lesson"]')
  expect(lesson).toBeDefined()
})

test('Render several lessons', () => {
  const alarms = wrapper.findAll('[data-test="lesson"]')
  expect(alarms).toHaveLength(6)
})