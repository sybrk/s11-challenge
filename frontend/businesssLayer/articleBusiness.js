import { apiCalls } from "../api/helpers";

export const articleBusiness = {
getArticles: async(token) => {
    let requestArticles = await apiCalls.getArticlesRequest(token)
    if (requestArticles.status === 200 ) {
        return requestArticles.data.articles
    } else {
        return false
    }
},
postArticles: async(token, title, text, topic) => {
    let requestPost = await apiCalls.postArticleRequest(token, title, text, topic);
    if (requestPost.status === 201 ) {
        return requestPost.data.article
    }  else {
        return false
    }
},

updateArticle: async (token, articleId, title, text, topic) => {
    let requestUpdate = await apiCalls.updateArticleRequest(token, articleId, title, text, topic);
    if (requestUpdate.status === 200 ) {
        return requestUpdate.data.article
    }  else {
        return false
    }
},

deleteArticle: async (token, articleId) => {
    let requestDeletion = await apiCalls.deleteArticle(token, articleId);
    if (requestDeletion.status === 200 ) {
        return requestDeletion.data.message
    }  else {
        return false
    }
}
}; 