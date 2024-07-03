import { apiCalls } from "../api/helpers"
import { LOCAL_STORAGE_TOKEN_KEY } from "../constants/localStorageKey"
import { localStorageUtil } from "../util/localStorage"

export const articleBusiness = {
    getArticles: async()=> {
        let token = localStorageUtil.getFromStorage(LOCAL_STORAGE_TOKEN_KEY);
        
        let articleRequest = await apiCalls.getArticlesRequest(token);
        return articleRequest;
        
    }
}