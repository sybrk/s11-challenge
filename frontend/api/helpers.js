import { apiUrl } from '../constants/apiConstant';
import axios from 'axios';

/* [POST] http://localhost:9000/api/login
Payloadda şunlara ihtiyaç duyuyor: username, password
Örnek payload: { "username": "foo", "password": "12345678" }
username >= 3 karakter, ve password >= 8 karakter, trim yapmayı unutmayın
Uygun bir isteğe verilen yanıt, "200 OK" ve auth token belirtecini içerir */

/* [GET] http://localhost:9000/api/articles
Request headerı Authorization değerine auth token'ı göndermeniz lazım
Uygun bir isteğe verilen yanıt, "200 OK" ve boş olabilecek makalelerin bir listesini içerir. */
export const apiCalls = {
    loginRequest: async (username, password) => {
        //....

        try {
            const response = await axios.post(`${apiUrl}/login`, {
                username,
                password
            });
            return response.data;
            
        } catch (error) {
            console.error(error);
            return error.response.data;
        }
    },
    getArticlesRequest: async (token) => {
        //....
        const headers = {"Authorization": token}
        try {
            const response = await axios.get(`${apiUrl}/articles`, {headers});
            return response;
        } catch (error) {
            console.error(error);
            return error.response;
        }
    },
    postArticleRequest: async (token, title, text, topic) => {
        //....
        //basit bir iş olmasaydı burada title ve text'in 1 karakterden uzun olmasını ve topic'in belirli konularda olmasını da kontrol etmeliydik.
        const headers = {"Authorization": token}
        const data = {title, text, topic}
        try {
            const response = await axios.post(`${apiUrl}/articles`, data, {headers});
            return response;
        } catch (error) {
            console.error(error);
            return error.response;
        }
    },
    updateArticleRequest: async (token, article_id, title, text, topic) => {
        //....
        //basit bir iş olmasaydı burada title ve text'in 1 karakterden uzun olmasını ve topic'in belirli konularda olmasını da kontrol etmeliydik.
        const headers = {"Authorization": token}
        const data = {title, text, topic}
        try {
            const response = await axios.put(`${apiUrl}/articles/${article_id}`, data, {headers});
            return response;
        } catch (error) {
            console.error(error);
            return error.response;
        }
    },
    deleteArticleRequest: async (token, article_id) => {
        //....
        //basit bir iş olmasaydı burada title ve text'in 1 karakterden uzun olmasını ve topic'in belirli konularda olmasını da kontrol etmeliydik.
        const headers = {"Authorization": token}
        try {
            const response = await axios.delete(`${apiUrl}/articles/${article_id}`, {headers});
            return response;
        } catch (error) {
            console.error(error);
            return error.response;
        }
    },
};
