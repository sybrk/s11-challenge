import { apiCalls } from "../api/helpers";

export const loginBusiness = {
    login: async (username, password) => {
        try {
            let requestResult = await apiCalls.loginRequest(username, password);
            if (requestResult.status === 200) { // veya başka bir başarılı durum kodu
                localStorage.setItem('token', requestResult.data.token);
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error(error);
            return false;
        }
    },
    checkLogin: async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                // Burada token'i kullanarak sunucuya bir sorgu yapabilirsiniz
                // Örneğin, token'in hâlâ geçerli olup olmadığını kontrol edebilirsiniz
                // Bir örnek olarak, token geçerliyse true, değilse false dönebiliriz
                return true; // Örnek amaçlı olarak geçerli olarak kabul ediyoruz
            } else {
                return false; // Eğer token bulunamazsa veya geçerli değilse false dönebiliriz
            }
        } catch (error) {
            console.error(error);
            return false; // Bir hata durumunda da false dönebiliriz
        }
    }
}
