import { apiCalls } from "../api/helpers";


export const loginBusiness = {
    login: async(username, password)=>{
        let requestResult = await apiCalls.loginRequest(username, password);
        //todo: if requestResult ok save token into localStorage, else return false
    if (requestResult.status === 200) {
        localStorage.setItem("token", requestResult.data.token);
        return true;
    } else {
        return false;
    }
    },
    checkLogin: async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            return false; // No token found
        }

        try {
            const response = await axios.get(`${apiUrl}/check-token`, { // böyle bi endpoint yok salladım
                headers: { Authorization: `${token}` }
            });

            return response.status === 200; // Return true if token is valid
        } catch (error) {
            console.error(error);
            return false; // Token check failed
        }
    }
};