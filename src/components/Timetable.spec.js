import { mount } from "@vue/test-utils"
import Timetable from "./Timetable.vue"
import { createStore } from 'vuex'

const store = createStore({
  getters: {
    getUsername(){
      return "test username"
    },
    getPlates(){
      return ["1","2","3"]
    }
  }
})

const wrapper =  mount(Timetable,{
  global: {
    plugins: [store]
  }
})

test('Render timetables', async () => {
  const timetables =  wrapper.get('[data-test="timetable"]')
  await expect(timetables).toBeDefined()
})

test('Render plates', () => {
  const plates =  wrapper.get('[data-test="plates"]')
  expect(plates).toBeDefined()
})

test('Render several plates', () => {
  const plates =  wrapper.findAll('[data-test="plates"]')
  expect(plates).toHaveLength(3)
})