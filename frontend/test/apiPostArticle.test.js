import { apiCalls } from "../api/helpers";

describe('api article post request', () => {
    test('api article post', async () => {
        const loginRequestResult = await apiCalls.loginRequest('abc', '17203896789');
        const testArticle = {
            "article_id": 99999,
            "title": "test article",
            "text": "bu bir testtir",
            "topic": "React"
        }
        const {title, text, topic} = testArticle
        const articleRequest = await apiCalls.postArticleRequest(loginRequestResult.token, title, text, topic);
        expect(articleRequest.status).toBe(201);
    }, 999999);
});