import { mount } from "@vue/test-utils"
import testStore from "../store/testStore.js"
import Authentication from './Authentication.vue'

const wrapper = mount(Authentication, {
  global: {
    plugins: [testStore]
  }
})

test('Render error message', async () => {
  await wrapper.find(".login").setValue("wrong username")
  await wrapper.find(".password").setValue("wrong possword")
  await wrapper.find('button').trigger('click')
  expect(wrapper.html()).toContain('<div class="message">Неверный логин или пароль</div>')
})

test('Login function', async () => {
  await wrapper.find(".login").setValue("correct username")
  await wrapper.find(".password").setValue("correct possword")
  await wrapper.find('button').trigger('click')
  expect(wrapper.html()).toContain('you new token')
})