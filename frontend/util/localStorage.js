
export const localStorageUtil = {
    saveToStorage: (key, value) => {
        localStorage.setItem(key, value);
    },
    removeFromStorage: (key)=> {
        localStorage.removeItem(key);
    },
    getFromStorage: (key) => {
        return localStorage.getItem(key);
    }
};