// import post from './modules/post'
import { createStore} from "vuex";

export default createStore({
    actions: {
        fetchAllEditInformation(context){
            const fetchNames = ["group", "employee", "subject", "practice", "room"];
            fetchNames.forEach(async element => {
                const res = await fetch(
                    this.getters.getHost + element + "/list",
                    {
                        headers: {
                            "Authorization": "Token " + this.getters.getToken
                        }
                    }
                );
                const JSON = await res.json();
                const information = JSON.data
                const update = "update" + element[0].toUpperCase() + element.slice(1) + "s"
                context.commit(update, information);
            });
        },
        async fetchLogin(context, user){
            const res = await fetch(
                this.getters.getHost + 'user/login',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        'username': user.username, 
                        'password': user.password
                    })
                }
            )
            const tokenJSON = await res.json();
            if(tokenJSON.data == "Auth failed"){
                context.commit('updateErrorMessage', "Неверный логин или пароль");
            }
            else{
                const token = tokenJSON.data.token
                context.commit('updateToken', [token,user.username]);
            }
        },   
        newEdit(context){  
            context.commit('updateEdit');
        },
        logOut(context){
            context.commit('updateToken', ['', ''])
        },
        copyLesson(context, lesson){
            context.commit('updateCopiedLesson', lesson)
        },
        async fetchSchedule(context, date){

            const dateISO = new Date(date).toISOString()
            const fetchDate = dateISO.slice(0, -14)
            // const fetchDate = dateISO.slice(0, -19) + dateISO.slice(-16, -14) + dateISO.slice(-20, -17) 
            // const fetchDate = "2012-12-05"
            console.log(dateISO)
            
            const res = await fetch(
                this.getters.getHost + 'schedule/get?date=' + fetchDate,
                {
                    headers: {
                        "Authorization": "Token " + this.getters.getToken,
                    }
                }
            )
                    // "2012-12-05"
            const scheduleJSON = await res.json();
            if(scheduleJSON.message == "error"){
                context.commit('updateSchedule', "noSchedule")
            }
            else{
                const schedule = scheduleJSON.data.schedule
                context.commit('updateSchedule', schedule)
            }
        },
    },
    mutations:{
        updateEmployees(state, employees){
                employees.forEach((element) => {
                    state.employees.push(element)
                },
            state.loading++
            );
        },
        updateSubjects(state, subjects){
            subjects.forEach((element) => {  
                state.subjects.push(element)
            },
            state.loading++
            );
        },
        updatePractices(state, practices){
            practices.forEach((element) => {  
                state.subjects.push(element)
            },
            state.loading++
            );
        },
        updateRooms(state, rooms){
            rooms.forEach((element) => {
                state.rooms.push(element)
            },
            state.loading++
            );
        },
        updateGroups(state, groups){
            groups.forEach((element) => {
                state.groups.push(element)
            },
            state.loading++
            );
        },
        updateToken(state, info){
            state.token = info[0];
            state.username = info[1];
            state.errorMessage = "";
        },
        updateEdit(state){
            state.loading = -5;
            state.groups = [];
            state.employees = [];
            state.subjects = [];
            state.rooms = [];
        },
        updateCopiedLesson(state, copiedLesson){
            state.copiedLesson = {...copiedLesson}
        },
        updateErrorMessage(state, errorMessage){
            state.errorMessage = errorMessage
        },
        updateSchedule(state, schedule){
            state.schedule = schedule
        }
    },
    state() {
        return {
            host: "http://95.79.50.190:8000/api/v1/",
            token: "",
            username: "",
            groups: [],
            employees: [],
            subjects: [],
            rooms: [],
            errorMessage: "",
            loading: -5,
            copiedLesson: "notOneCopy",
            schedule: [],
        }
    },
    
    getters: {
        getErrorMessage: state =>{
            return state.errorMessage;
        },
        getToken: state => {
            return state.token;
        },
        getCopiedLesson: state => {
            return {...state.copiedLesson};
        },
        getGroups: state => {
            let res = [] 
            state.groups.forEach(element =>{
                res.push(element.Description)
            })
            return res;
        },
        getEmployees: state => {
            let res = [] 
            state.employees.forEach(element =>{
                res.push(element.Description)
            })
            return res;
        },
        getSubjects: state => {
            let res = [] 
            state.subjects.forEach(element =>{
                res.push(element.Description)
            })
            return res;
        },
        getRooms: state => {
            let res = [] 
            state.rooms.forEach(element =>{
                res.push(element.Description)
            })
            return res;
        },
        getGroupRefKey: state => Description => {
            let res = ""
            state.groups.forEach(element =>{
                if(element.Description == Description){
                    res = element.Ref_Key;
                }
            })
            return res
        },
        getEmployeeRefKey: state => Description => {
            let res = ""
            state.employees.forEach(element =>{
                if(element.Description == Description){
                    res = element.Ref_Key;
                }
            })
            return res
        },
        getSubjectRefKey: state => Description => {
            let res = ""
            state.subjects.forEach(element =>{
                if(element.Description == Description){
                    res = element.Ref_Key;
                }
            })
            return res
        },
        getRoomRefKey: state => Description => {
            let res = ""
            state.rooms.forEach(element =>{
                if(element.Description == Description){
                    res = element.Ref_Key;
                }
            })
            return res
        },
        getGroupByRefKey: state => Ref_Key => {
            let res = ""
            state.groups.forEach(element =>{
                if(element.Ref_Key == Ref_Key){
                    res = element.Description;
                }
            })
            return res
        },
        getEmployeeByRefKey: state => Ref_Key => {
            let res = ""
            state.employees.forEach(element =>{
                if(element.Ref_Key == Ref_Key){
                    res = element.Description;
                }
            })
            return res
        },
        getSubjectByRefKey: state => Ref_Key => {
            let res = ""
            state.subjects.forEach(element =>{
                if(element.Ref_Key == Ref_Key){
                    res = element.Description;
                }
            })
            return res
        },
        getRoomByRefKey: state => Ref_Key => {
            let res = ""
            state.rooms.forEach(element =>{
                if(element.Ref_Key == Ref_Key){
                    res = element.Description;
                }
            })
            return res
        },
        getHost: state => {
            return state.host
        },
        getSchedule: state => {
            return state.schedule
        }
    },
});
