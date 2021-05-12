export default {   
   actions: {
        async fetchTeachers(ctx){
            const res = await fetch(
                "95.79.50.190:8000/api/v1/group/list"
            );
            const teachers = await res.json();
            console.log(teachers);
            ctx.commit('updateTeachers', teachers);
        }
   },
    mutations:{
        updateTeachers(state, teachers){
            state.teachers = teachers;
        }
    },
    state: {
        groups: [],
        teachers: [],
    },
    getters: {
        allTeachers(state){
            return state.teachers;
        }
    },
}