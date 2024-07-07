import { apiCalls } from "../api/helpers";

describe('api articles request',()=>{
    test('api article request',async ()=>{
        const loginRequestResult = await apiCalls.loginRequest('abc', '17203896789');
        const articleRequest = await apiCalls.getArticlesRequest(loginRequestResult.token);
        expect(articleRequest.status).toBe(200);
        expect(articleRequest.data.articles.length>0).toBe(true);
    },999999);


});