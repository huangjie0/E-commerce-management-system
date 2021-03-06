import axios from "axios";
const instance = axios.create({
    baseURL:'https://lianghj.top:8888/api/private/v1/',
    timeout:5000
})
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  //往请求拦截器添加属性
    config.headers.Authorization = window.sessionStorage.getItem('token')
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });
//定义暴露函数接口
function userGet(url,params){
    return instance.get(url,params)
}
function userPut(url,data){
    return instance.put(url,data)
}
function userPost(url,data){
  return instance.post(url,data)
}
function userGetId(url,params){
  return instance.get(url,params)
}
//暴露编辑用户信息
function userPutEdit(url,data){
  return  instance.put(url,data)
}
//暴露删除用户信息
function userDelete(url,data){
  return instance.delete(url,data)
}
//暴露分配用户信息
function userDistribution(url,data){
  return instance.put(url,data)
}


export {userPut,userGet,userPost,userGetId,userPutEdit,userDelete,userDistribution}