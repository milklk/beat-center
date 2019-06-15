import axios from "axios";
import { Notification } from 'element-ui';
import router from '../router'


axios.defaults.timeout = 100000;
//跨域请求，允许保存cookie
axios.defaults.withCredentials = true;

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


let token = 1;
let response = true;
export default function ajax(url, data = {}, type = "get",use=true) {
  response = use;
  if (window.sessionStorage.token && token) {
    token = 0;
    axios.defaults.headers.common["token"] = window.sessionStorage.token;
  }
  return new Promise(function(resolve, reject) {
    let promise;
    if (type === "get") {
      let dataStr = "";
      Object.keys(data).forEach(key => {
        dataStr += key + "=" + data[key] + "&";
      });
      if (dataStr !== "") {
        dataStr = dataStr.substring(0, dataStr.lastIndexOf("&"));
        url = url + "?" + dataStr;
      }
      promise = axios.get(url);
    } else if (type === "post") {
      let dataStr = "";
      Object.keys(data).forEach(key => {
        dataStr += key + "=" + data[key] + "&";
      });
      if (dataStr !== "") {
        dataStr = dataStr.substring(0, dataStr.lastIndexOf("&"));
        url = url + "?" + dataStr;
      }
      promise = axios.post(url);
    }
    promise
      .then(function(response) {
        resolve(response.data);
      })
      .catch(function(error) {
        reject(error);
      });
  });
}

//HTTPresponse拦截
axios.interceptors.response.use(data => {
  
  if (!response) {
    response = true;
    return data;
  }
  if (data.data.code == '401') {
      Notification.warning({
        title: '登陆超时',
        message: '登陆超时，请重新登录'
      }); 
      router.push({ path: '/login' })
  } else {
    if (data.data.ret != '200') {
      if(data.data.ret == '300' && data.data.msg){
        Notification.warning({
          title: '请求异常',
          message: data.data.msg
        }); 
      }else{
        Notification.warning({
          title: '网络异常',
          message: '网络异常，请刷新后重试'
        }); 
      }
    }
    return data;
  }
}, error => {
  Notification.warning({
    title: '请求错误',
    message: '请求错误，请稍后再试！',
  });
  return Promise.reject(new Error(msg));
  //  return Promise.reject(error)
})