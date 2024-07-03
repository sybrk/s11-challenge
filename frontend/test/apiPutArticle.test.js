import { apiCalls } from "../api/helpers";

describe('api article put request', () => {
    test('api article put', async () => {
        const loginRequestResult = await apiCalls.loginRequest('abc', '17203896789');
        const getArticlesRequest = await apiCalls.getArticlesRequest(loginRequestResult.token);
        const testArticle = {
            "article_id": getArticlesRequest.data.articles[getArticlesRequest.data.articles.length -1]["article_id"],
            "title": "test article",
            "text": "bu bir güncelleme",
            "topic": "Node"
        }
        const {article_id, title, text, topic} = testArticle
        const articleRequest = await apiCalls.updateArticleRequest(loginRequestResult.token, article_id, title, text, topic);
        expect(articleRequest.status).toBe(200);
    }, 999999);
});