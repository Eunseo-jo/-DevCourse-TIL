const storage = window.sessionStorage;

export const getItem = (key, defaultValue) => {
    try {
        const storedValue = storage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : defaultValue;
    } catch (error) {
        return defaultValue;
    }
};

export const setItem = (key, value) => {
    try {
        storage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.log(error);
    }
};

export default {
    setItem,
    getItem,
};
