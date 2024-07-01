import { apiCalls } from "../api/helpers";

describe('api articles request',()=>{
    test('api article request',async ()=>{
        const loginRequestResult = await apiCalls.loginRequest('abc', '123456789');
        const articleRequest = await apiCalls.getArticlesRequest(loginRequestResult.token);

        expect(articleRequest.articles.length>0).toBe(true);
    },999999);


});