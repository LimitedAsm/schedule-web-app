import { mount } from "@vue/test-utils"
import testStore from "../store/testStore.js"
import Authentication from './Authentication.vue'

const wrapper = mount(Authentication, {
  global: {
    plugins: [testStore]
  }
})

test('Render error message ', () => {
  expect(wrapper.html()).toContain('<div class="errorMessage">test</div>')
})

test('Button click', async () => {
  await wrapper.find('button').trigger('click')
  expect(wrapper.html()).toContain('<div class="errorMessage">administrator</div>')
})