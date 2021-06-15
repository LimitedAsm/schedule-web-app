import { mount } from "@vue/test-utils";
import testStore from "../store/testStore.js";
import Edit from "./Edit.vue";

const wrapper = mount(Edit, {
  global: {
    plugins: [testStore],
  },
});

test("Render groups", () => {
  const group = wrapper.get('[data-test="group"]');
  expect(group).toBeDefined();
});

test("Render several groups", () => {
  const groups = wrapper.findAll('[data-test="group"]');
  expect(groups).toHaveLength(3);
});

test("Render alarms", () => {
  const alarms = wrapper.get('[data-test="alarm"]');
  expect(alarms).toBeDefined();
});

test("Render several groups", () => {
  const alarms = wrapper.findAll('[data-test="alarm"]');
  expect(alarms).toHaveLength(3);
});
