import { createStore } from "vuex";
const config = require("./../../config.js").data;

export default createStore({
  actions: {
    fetchAllEditInformation(context) {
      context.commit("updateEdit");
      const fetchNames = [
        "group",
        "employee",
        "subject",
        "practice",
        "room",
        "alarm",
        "plate",
        "schedule_template",
      ];
      fetchNames.forEach(async (element) => {
        await fetch(
          this.getters.getHost +
            this.getters.getVersion +
            "/" +
            element +
            "/list",
          {
            headers: {
              Authorization: "Token " + this.getters.getToken,
            },
          }
        ).then(
          async (response) => {
            const JSON = await response.json();
            const information = JSON.data;
            const update =
              "update" + element[0].toUpperCase() + element.slice(1) + "s";
            context.commit(update, information);
          },
          (reject) => {
            console.log("Error: ", reject);
            context.commit(
              "updateMessage",
              "Сервер недоступен обратитесь к системному администратору"
            );
          }
        );
      });
    },
    async fetchLogin(context, user) {
      context.commit("updateMessage", "");
      await fetch(
        this.getters.getHost + this.getters.getVersion + "/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: user.username,
            password: user.password,
          }),
        }
      ).then(
        async (response) => {
          const tokenJSON = await response.json();
          if (tokenJSON.data == "Auth failed") {
            context.commit("updateMessage", "Неверный логин или пароль");
          } else {
            const token = tokenJSON.data.token;
            context.commit("updateToken", token);
            context.commit("updateUsername", user.username);
            context.dispatch("fetchScheduleIsFinalList");
          }
        },

        (reject) => {
          console.log("Error: ", reject);
          context.commit(
            "updateMessage",
            "Сервер недоступен обратитесь к системному администратору"
          );
        }
      );
    },
    async synchronization1CServer(context) {
      await fetch(
        this.getters.getHost + this.getters.getVersion + "/sync-with-1c",
        {
          headers: {
            Authorization: "Token " + this.getters.getToken,
          },
        }
      ).then(
        async (response) => {
          const responseJSON = await response.json();
          if (responseJSON.data.hasDataChanged == true) {
            context.dispatch("fetchAllEditInformation");
            context.commit("updateEdit");
            context.commit("updateMessage", "Данные успешно обновлены");
          } else {
            context.commit("updateMessage", "Новых данных не обнаруженно");
          }
        },
        (reject) => {
          console.log("Error: ", reject);
          context.commit(
            "updateMessage",
            "Сервер недоступен обратитесь к системному администратору"
          );
        }
      );
    },

    logOut(context) {
      context.commit("updateToken", "");
      context.commit("updateUsername", "");
      context.commit("updateEdit");
    },
    copyLesson(context, lesson) {
      context.commit("updateCopiedLesson", lesson);
    },

    async fetchServerVersion(context) {
      const res = await fetch(this.getters.getHost + "service/server-version");
      const scheduleJSON = await res.json();
      const schedule = scheduleJSON.data;
      context.commit("updateServerVersion", schedule);
    },

    async fetchSchedule(context, date) {
      const dateISO = new Date(date).toISOString();
      const fetchDate = dateISO.slice(0, -14);
      const res = await fetch(
        this.getters.getHost +
          this.getters.getVersion +
          "/schedule/get?date=" +
          fetchDate,
        {
          headers: {
            Authorization: "Token " + this.getters.getToken,
          },
        }
      );
      const scheduleJSON = await res.json();
      if (scheduleJSON.message == "not_found") {
        context.commit("updateSchedule", "noSchedule");
      } else {
        const schedule = scheduleJSON.data.schedule;
        context.commit("updateSchedule", schedule);
      }
    },
    async fetchScheduleIsFinalList(context) {
      await fetch(
        this.getters.getHost +
          this.getters.getVersion +
          "/schedule/list?is_final=1",
        {
          headers: {
            Authorization: "Token " + this.getters.getToken,
          },
        }
      ).then(
        async (response) => {
          const responseJSON = await response.json();
          if (responseJSON.message == "success") {
            context.commit("updateScheduleIsFinalList", responseJSON.data);
          } else {
            console.log("Error load schedule list: ", responseJSON);
          }
        },
        (reject) => {
          console.log("Error: ", reject);
          context.commit(
            "updateMessage",
            "Сервер недоступен обратитесь к системному администратору"
          );
        }
      );
    },
  },
  mutations: {
    updateEmployees(state, employees) {
      state.employees = employees;
      state.loading++;
    },
    updateSubjects(state, subjects) {
      state.subjects = subjects;
      state.loading++;
    },
    updatePractices(state, practices) {
      state.subjects = practices;
      state.loading++;
    },
    updateRooms(state, rooms) {
      state.rooms = rooms;
      state.loading++;
    },
    updateGroups(state, groups) {
      state.groups = groups;
      state.loading++;
    },
    updateAlarms(state, alarms) {
      state.alarms = alarms;
      state.loading++;
    },

    updatePlates(state, plates) {
      state.plates = plates;
    },

    updateSchedule_templates(state, schedule_templates) {
      state.scheduleTemplate = schedule_templates;
    },

    updateToken(state, token) {
      state.token = token;
      state.message = "";
    },
    updateUsername(state, username) {
      state.username = username;
      state.message = "";
    },
    updateEdit(state) {
      state.loading = -6;
      state.groups = [];
      state.employees = [];
      state.subjects = [];
      state.rooms = [];
      state.alarms = [];
    },
    updateCopiedLesson(state, copiedLesson) {
      state.copiedLesson = { ...copiedLesson };
    },
    updateMessage(state, message) {
      state.message = message;
    },
    updateSchedule(state, schedule) {
      state.schedule = schedule;
    },
    updateServerVersion(state, serverVersion) {
      state.serverVersion = serverVersion.server_version;
    },
    updateScheduleIsFinalList(state, scheduleIsFinalList) {
      let newList = [];
      scheduleIsFinalList.forEach((element) => {
        if (element.is_final == true) {
          newList.push(element.date);
        }
      });
      state.scheduleIsFinalList = newList;
    },
  },
  state() {
    return {
      host: `${config.PROTOCOL}://${config.HOST}:${config.PORT}/api/`,
      version: config.VERSION,
      token: "",
      username: "",
      groups: [],
      employees: [],
      subjects: [],
      rooms: [],
      alarms: [],
      message: "",
      loading: -6,
      copiedLesson: "notOneCopy",
      schedule: [],
      serverVersion: "",
      plates: [],
      scheduleIsFinalList: [],
    };
  },

  getters: {
    getMessage: (state) => {
      return state.message;
    },
    getToken: (state) => {
      return state.token;
    },
    getCopiedLesson: (state) => {
      return { ...state.copiedLesson };
    },
    getGroups: (state) => {
      let res = [];
      state.groups.forEach((element) => {
        res.push(element.Description);
      });
      return res;
    },
    getEmployees: (state) => {
      let res = [];
      state.employees.forEach((element) => {
        res.push(element.Description);
      });
      return res;
    },
    getSubjects: (state) => {
      let res = [];
      state.subjects.forEach((element) => {
        res.push(element.Description);
      });
      return res;
    },
    getRooms: (state) => {
      let res = [];
      state.rooms.forEach((element) => {
        res.push(element.Description);
      });
      return res;
    },
    getAlarms: (state) => {
      let res = [];
      state.alarms.forEach((element) => {
        res.push(element.Description);
      });
      return res;
    },
    getPlates: (state) => {
      let res = [];
      state.plates.forEach((element) => {
        res.push(element.Description);
      });
      return res;
    },

    getGroupRefKey: (state) => (Description) => {
      let res = "";
      state.groups.forEach((element) => {
        if (element.Description == Description) {
          res = element.RefKey;
        }
      });
      return res;
    },
    getEmployeeRefKey: (state) => (Description) => {
      let res = "";
      state.employees.forEach((element) => {
        if (element.Description == Description) {
          res = element.RefKey;
        }
      });
      return res;
    },
    getSubjectRefKey: (state) => (Description) => {
      let res = "";
      state.subjects.forEach((element) => {
        if (element.Description == Description) {
          res = element.RefKey;
        }
      });
      return res;
    },
    getRoomRefKey: (state) => (Description) => {
      let res = "";
      state.rooms.forEach((element) => {
        if (element.Description == Description) {
          res = element.RefKey;
        }
      });
      return res;
    },
    getAlarmRefKey: (state) => (Description) => {
      let res = "";
      state.alarms.forEach((element) => {
        if (element.Description == Description) {
          res = element.RefKey;
        }
      });
      return res;
    },
    getGroupByRefKey: (state) => (RefKey) => {
      let res = "";
      state.groups.forEach((element) => {
        if (element.RefKey == RefKey) {
          res = element.Description;
        }
      });
      return res;
    },
    getAlarmsByRefKey: (state) => (RefKey) => {
      let res = "";
      state.alarms.forEach((element) => {
        if (element.RefKey == RefKey) {
          res = element.Description;
        }
      });
      return res;
    },

    getEmployeeByRefKey: (state) => (RefKey) => {
      let res = "";
      state.employees.forEach((element) => {
        if (element.RefKey == RefKey) {
          res = element.Description;
        }
      });
      return res;
    },
    getSubjectByRefKey: (state) => (RefKey) => {
      let res = "";
      state.subjects.forEach((element) => {
        if (element.RefKey == RefKey) {
          res = element.Description;
        }
      });
      return res;
    },
    getRoomByRefKey: (state) => (RefKey) => {
      let res = "";
      state.rooms.forEach((element) => {
        if (element.RefKey == RefKey) {
          res = element.Description;
        }
      });
      return res;
    },
    getHost: (state) => {
      return state.host;
    },
    getSchedule: (state) => {
      return state.schedule;
    },
    getServerVersion: (state) => {
      return state.serverVersion;
    },
    getVersion: (state) => {
      return state.version;
    },
    getUsername: (state) => {
      return state.username;
    },
    getLoading: (state) => {
      return state.loading;
    },
    getScheduleIsFinalList: (state) => {
      return state.scheduleIsFinalList;
    },
  },
});
