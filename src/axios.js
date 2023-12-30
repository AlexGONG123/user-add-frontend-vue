import axios from "axios";
import { toast } from '~/composables/utils'
import {getCSRFToken} from '~/composables/auth'
import router from '~/router'

const service = axios.create({
    baseURL:"/api",
    // baseURL:import.meta.env.VITE_API_BASE_URL,
})
// 添加请求拦截器
service.interceptors.request.use(function (config) {
    const csrfToken = getCSRFToken();
    // console.log(csrfToken)
    // console.log(config)
    if (config.url !== "/admin/login") {
        // 检查是否有 csrf_token
        if (!csrfToken) {
            // 如果没有 csrf_token，则重定向到登录页
            toast('login expired','error');
            router.push('/login');
            return Promise.reject(new Error('expired Token'));
        }
    }

    // add token into header
    // const cookie = useCookies()
    // const token = cookie.get("admin-token")
    // if(token){
    //     config.headers['token'] = token
    // }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
service.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response.data;
  }, function (error) {
    // 对响应错误做点什么
    toast(error.response.data.error ||'This is an error message','error')
    return Promise.reject(error);
  });

export default service