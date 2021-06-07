import { mount } from "@vue/test-utils"
import { createStore } from 'vuex'
import Authentication from './Authentication.vue'

const store = createStore({
  actions:{
    fetchLogin(context, user){
      context.commit('updateErrorMessage', user.username)
    },
    fetchAllEditInformation(context){
      return context 
    }
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
    }
  }
})

const wrapper = mount(Authentication, {
  global: {
    plugins: [store]
  }
})

test('Render error message ', () => {
  expect(wrapper.html()).toContain('<div class="errorMessage">test</div>')
})

test('Button click', async () => {
  await wrapper.find('button').trigger('click')
  expect(wrapper.html()).toContain('<div class="errorMessage">administrator</div>')
})