import axios from "axios";

export default axios.interceptors.request.use((config) => {
    const token = window.localStorage.getItem('accessToken');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
}, error => {
    return Promise.reject(error);
});
