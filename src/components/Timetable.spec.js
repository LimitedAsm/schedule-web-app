import { mount } from "@vue/test-utils";
import testStore from "../store/testStore.js";
import Timetable from "./Timetable.vue";

const wrapper = mount(Timetable, {
  global: {
    plugins: [testStore],
  },
});

test("Render timetables", async () => {
  const timetables = wrapper.get('[data-test="timetable"]');
  await expect(timetables).toBeDefined();
});

test("Render plates", () => {
  const plates = wrapper.get('[data-test="plates"]');
  expect(plates).toBeDefined();
});

test("Render several plates", () => {
  const plates = wrapper.findAll('[data-test="plates"]');
  expect(plates).toHaveLength(3);
});
