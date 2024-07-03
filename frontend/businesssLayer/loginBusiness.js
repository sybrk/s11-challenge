import { apiCalls } from "../api/helpers";
import { localStorageUtil } from "../util/localStorage";
import { LOCAL_STORAGE_TOKEN_KEY } from "../constants/localStorageKey";

export const loginBusiness = {
    login: async(username, password)=>{
        let loginRequest = await apiCalls.loginRequest(username, password);
        if (loginRequest.token) {
            localStorageUtil.saveToStorage(LOCAL_STORAGE_TOKEN_KEY, loginRequest.token);
            return loginRequest.message;
        } else {
            return loginRequest.message;
        }
    },
    checkLogin: ()=> {
        const token = localStorageUtil.getFromStorage(LOCAL_STORAGE_TOKEN_KEY);
        if (token) {
            
            return true
        } else {
           
            return false;
        }
        
    },
    logout: ()=> {
        try {
            localStorageUtil.removeFromStorage(LOCAL_STORAGE_TOKEN_KEY);
            return true;
        } catch (error) {
            console.log("error logging out", error);
            return false;
        }
    }
};