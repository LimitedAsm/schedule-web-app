import { mount } from "@vue/test-utils";
import Header from "./Header.vue";
import testStore from "../store/testStore.js";

const globalObj = {
  plugins: [testStore],
  provide: {
    date: "date",
    dates: ["date 1", "date 2", "date 3"],
  },
};

const wrapper = mount(Header, {
  global: globalObj,
});

const wrapperEdit = mount(Header, {
  global: globalObj,
  props: {
    typeHeader: "edit",
  },
});

const wrapperTimetable = mount(Header, {
  global: globalObj,
  props: {
    typeHeader: "timetable",
  },
});

test("Render header on edit", () => {
  expect(wrapperEdit.html()).toContain("date");
});

test("Render header on timetable", () => {
  expect(wrapperTimetable.html()).toContain("date 1 - date 3");
});

test("Render username", () => {
  expect(wrapper.html()).toContain("test username");
});
