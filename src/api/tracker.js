import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';


const instance = axios.create({
    baseURL: 'https://ee98-49-145-110-147.ngrok-free.app'
});

instance.interceptors.request.use(
    async (config) => { // called automatically whenever making a request
        const token = await AsyncStorage.getItem('token');
        if (token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }, 
    (err) => { // called automatically when there is an error when making the request
        return Promise.reject(err);
    } 
);

export default instance;