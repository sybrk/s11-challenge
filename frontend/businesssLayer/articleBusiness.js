import { apiCalls } from "../api/helpers"
import { LOCAL_STORAGE_TOKEN_KEY } from "../constants/localStorageKey"
import { localStorageUtil } from "../util/localStorage"

export const articleBusiness = {
    getArticles: async()=> {
        let token = localStorageUtil.getFromStorage(LOCAL_STORAGE_TOKEN_KEY);
        
        let articleRequest = await apiCalls.getArticlesRequest(token);
        return articleRequest;
        
    },
    postArticle: async (article)=> {
        const {title, text, topic} = article
        let token = localStorageUtil.getFromStorage(LOCAL_STORAGE_TOKEN_KEY);
        let postRequest = await apiCalls.postArticleRequest(token, title, text, topic);
        return postRequest
    },
    updateArticle: async (article_id, article)=> {
        const {title, text, topic} = article
        let token = localStorageUtil.getFromStorage(LOCAL_STORAGE_TOKEN_KEY);
        let putRequest = await apiCalls.updateArticleRequest(token, article_id, title, text, topic);
        return putRequest
    },
    deleteArticle: async (article_id)=> {
        let token = localStorageUtil.getFromStorage(LOCAL_STORAGE_TOKEN_KEY);
        let putRequest = await apiCalls.deleteArticleRequest(token,article_id)
        return putRequest
    },
}