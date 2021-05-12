// import post from './modules/post'
import { createStore } from "vuex";


const host = "http://95.79.50.190:8101/api/v1/"
export default createStore({
    actions: {
        async fetchTeacher(context){
            const res = await fetch(
                host + "employee/list",
                // {
                //     headers: { 
                //         'Access-Control-Allow-Origin': "*"
                //     }
                // }
            );
            const teacherJSON = await res.json();
            const teacher = teacherJSON.data
            context.commit('updateTeachers', teacher);
        },
     
        async fetchSubject(context){
            const res = await fetch(
                host + "subject/list",
            );
            const subjectJSON = await res.json();
            const subject = subjectJSON.data
            context.commit('updateSubjects', subject);
        },


        async fetchPractice(context){
            const res = await fetch(
                host + "practice/list",
            );
            const practiceJSON = await res.json();
            const practice = practiceJSON.data
            context.commit('updatePractices', practice);
        },

        async fetchRoom(context){
            const res = await fetch(
                host + "room/list",
            );
            const roomJSON = await res.json();
            const room = roomJSON.data
            context.commit('updateRooms', room);
        },

        async fetchGroup(context){
            const res = await fetch(
                host + "group/list",
            );
            const groupJSON = await res.json();
            const group = groupJSON.data
            context.commit('updateGroups', group);
        },
        
        async fetchLogin(context, use){
            const res = await fetch(
                host + "user/login",
                {
                    method: 'POST',
                    body: JSON.stringify(use)
                }
            );
            const tokenJSON = await res.json();
            const token = tokenJSON.data
            context.commit('updateToken', token);
        },

        newEdit(context){
            
            context.commit('updateEdit');
        },
            
   },
    mutations:{
        updateTeachers(state, teachers){
             teachers.forEach((element) => {
                state.teachers.push(element.Description)
            },
            state.loading++
            );
        },
        updateSubjects(state, subjects){
            subjects.forEach((element) => {  
                state.subjects.push(element.Description)
            },
            state.loading++
            );
        },
        updatePractices(state, practices){
            practices.forEach((element) => {  
                state.subjects.push(element.Description)
            },
            state.loading++
            );
        },
        updateRooms(state, rooms){
            rooms.forEach((element) => {
                state.rooms.push(element.Description)
            },
            state.loading++
            );
        },
        updateGroups(state, groups){
            groups.forEach((element) => {
                state.groups.push(element.Description)
            },
            state.loading++
            );
        },
        updateToken(state, token){
            console.log(token);
            state.token = token;
        },
        updateEdit(state){
            state.loading = -5;
            state.groups = [];
            state.teachers = [];
            state.subjects = [];
            state.rooms = [];
       },

    },
    state() {
        return {
            token: "",
            user: "Admin",
            groups: [],
            teachers: [],
            subjects: [],
            rooms: [],
            loading: -5,
        }
    },
    getters: {
        teachersDescription(state){
            console.log(state.teachers);
            return state.teachers;
        }
    },
});
