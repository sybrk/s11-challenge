import { apiCalls } from "../api/helpers";

describe('api test',()=>{
    test('api login request',async ()=>{
        const loginRequestResult = await apiCalls.loginRequest('abc', '123456789');
        console.log(loginRequestResult);

        expect(loginRequestResult.token.length>0).toBe(true);
    },999999);

    test('api login fail request',async ()=>{
        const loginRequestResult = await apiCalls.loginRequest('abc', '1234567');
        console.log(loginRequestResult);

        expect(loginRequestResult.token).toBe(undefined);
    },999999);
});