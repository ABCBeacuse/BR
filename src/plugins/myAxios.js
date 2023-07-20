import axios from "axios";

const isDev = process.env.NODE_ENV === 'development'

const myAxios = axios.create({
    baseURL: isDev ? '/br' : 'http://120.26.74.75:8000/'
})

// 跨域
myAxios.defaults.withCredentials = true

// 请求拦截器
myAxios.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error)
})

// 响应拦截器
myAxios.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    return Promise.reject(error)
})

export default myAxios