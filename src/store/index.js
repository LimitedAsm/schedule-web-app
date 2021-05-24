// import post from './modules/post'
import { createStore} from "vuex";


const host = "http://95.79.50.190:8000/api/v1/"
export default createStore({
    actions: {
        fetchAllEditInformation(context){
            const fetchNames = ["group", "employee", "subject", "practice", "room"];
            fetchNames.forEach(async element => {
                // const res = await fetch(
                //     host + element + "/list",
                //     {
                //         headers: {
                //             "Authorization": "Token " + this.getters.getToken
                //         }
                //     }
                // )
                // .then(async() =>{
                //         const JSON = await res.json();
                //         const information = JSON.data;
                //         const update = "update" + element[0].toUpperCase() + element.slice(1) + "s";
                //         context.commit(update, information);  
                //     }    
                // )
                // .catch(() =>{
                //     alert("ОШИБКА СЕРВЕРА")
                // })
                
                const res = await fetch(
                    host + element + "/list",
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
            host + 'user/login',
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
        // .then(async() =>{
        //     const tokenJSON = await res.json();
        //     const token = tokenJSON.data
        //     context.commit('updateToken', token);
        // })
        // .catch(() =>{
        //     context.commit('updateErrorMessage', "Сервер недоступен обратитесь к системному администратору");
        // });
        const tokenJSON = await res.json();
        const token = tokenJSON.data
        context.commit('updateToken', [token,user.username]);
        },
        newEdit(context){  
            context.commit('updateEdit');
        },
        logOut(context){
            context.commit('updateToken', '')
        },
        copyLesson(context, lesson){
            context.commit('updateCopiedLesson', lesson)
        }    
    },
    mutations:{
        updateEmployees(state, employees){
                employees.forEach((element) => {
                    state.employees.push({"Description": element.Description, "Ref_Key": element.Description})
                },
            state.loading++
            );
        },
        updateSubjects(state, subjects){
            subjects.forEach((element) => {  
                state.subjects.push({"Description": element.Description, "Ref_Key": element.Description})
            },
            state.loading++
            );
        },
        updatePractices(state, practices){
            practices.forEach((element) => {  
                state.subjects.push({"Description": element.Description, "Ref_Key": element.Description})
            },
            state.loading++
            );
        },
        updateRooms(state, rooms){
            rooms.forEach((element) => {
                state.rooms.push({"Description": element.Description, "Ref_Key": element.Description})
            },
            state.loading++
            );
        },
        updateGroups(state, groups){
            groups.forEach((element) => {
                state.groups.push({"Description": element.Description, "Ref_Key": element.Description})
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
    },
    state() {
        return {
            token: "",
            username: "",
            groups: [],
            employees: [],
            subjects: [],
            rooms: [],
            errorMessage: "",
            loading: -5,
            copiedLesson: "notOneCopy",
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
        getGroupRefKey: state => Discription => {
            state.groups.forEach(element =>{
                if(element.Description == Discription){
                    return element.Ref_Key;
                }
            })
        },
        getEmployeeRefKey: state => Discription => {
            state.employees.forEach(element =>{
                if(element.Description == Discription){
                    return element.Ref_Key;
                }
            })
        },
        getSubjectRefKey: state => Discription => {
            state.subjects.forEach(element =>{
                if(element.Description == Discription){
                    return element.Ref_Key;
                }
            })
        },
        getRoomRefKey: state => Discription => {
            state.rooms.forEach(element =>{
                if(element.Description == Discription){
                    return element.Ref_Key;
                }
            })
        },
    },
});
