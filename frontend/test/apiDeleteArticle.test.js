import { apiCalls } from "../api/helpers";

describe('api article delete request', () => {
    test('api article delete', async () => {
        const loginRequestResult = await apiCalls.loginRequest('abc', '17203896789');
        const getArticlesRequest = await apiCalls.getArticlesRequest(loginRequestResult.token);
        const article_id = getArticlesRequest.data.articles[getArticlesRequest.data.articles.length -1]["article_id"]
            
        const articleRequest = await apiCalls.deleteArticleRequest(loginRequestResult.token, article_id);
        expect(articleRequest.status).toBe(200);
    }, 999999);
});