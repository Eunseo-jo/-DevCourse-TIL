const storage = window.localStorage;

export const saveItem = (key, value) => {
    //용량을 초과하면 에러
    try {
        storage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.log(error);
    }
};

export const getItem = (key, defaultValue) => {
    try {
        const storedValue = storage.getItem(key);
        if (!storedValue) {
            return defaultValue;
        }
        const parsedValue = JSON.parse(storedValue);
        return parsedValue;
    } catch (error) {
        return defaultValue;
    }
};

export const removeItem = (key) => {
    storage.removeItem(key);
};
