import { apiCalls } from "../api/helpers";


export const loginBusiness = {
    login: async(username, password)=>{
        let requestResult = await apiCalls.loginRequest(username, password);
        //todo: if requestResult ok save token into localStorage, else return false
    },
    checklogin: async()=>{},
};