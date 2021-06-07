import { mount } from "@vue/test-utils"
import { createStore } from 'vuex'
import Header from './Header.vue'

const store = createStore({
  actions: {
    logOut(){
      return
    },
    fetchAllEditInformation(){
      return 
    },
  },

  getters: {
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
    },
  }
})

const wrapper = mount(Header, {
  global: {
    plugins: [store],
    provide: {
      date: "",
      dates: []
      
    },
  }
})

const wrapperEdit = mount(Header, {
  global: {
    plugins: [store],
    provide: {
      date: "edit date",
      dates: ["edit dates 1", "edit dates 2", "edit dates 3"]
      
    },
  },
  props: {
    typeHeader: "edit" 
  }
})

const wrapperTimetable = mount(Header, {
  global: {
    plugins: [store],
    provide: {
      date: "timetable date",
      dates: ["timetable dates 1", "timetable dates 2", "timetable dates 3"]
    },
  },
  props: {
    typeHeader: "timetable" 
  }  
})

test('Render header on edit', () => {
  expect(wrapperEdit.html()).toContain('edit date')
})

test('Render header on timetable', () => {
  expect(wrapperTimetable.html()).toContain('timetable dates 1 - timetable dates 3')
})

test('Render username', () => {
  expect(wrapper.html()).toContain('test username')
})

