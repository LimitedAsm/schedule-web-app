import { mount } from "@vue/test-utils"
import testStore from "../store/testStore.js"
import Group from './Group.vue'

const wrapper = mount(Group, {
  global: {
    plugins: [testStore],
    provide: {
      getChildrenFunction() {
        (getFunc, setFunc) =>{
          this.childrenFunction.push({"getFunc": getFunc, "setFunc":setFunc})
        } 
      }
    }
  }
})

test('Render lessons', () => {
  const lesson =  wrapper.get('[data-test="lesson"]')
  expect(lesson).toBeDefined()
})

test('Render several lessons', () => {
  const alarms = wrapper.findAll('[data-test="lesson"]')
  expect(alarms).toHaveLength(6)
})