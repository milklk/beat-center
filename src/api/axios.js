import axios from "axios";
axios.defaults.withCredentials = true;
export default function ajax(url, data = {}, type = "get") {
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
      promise = axios.post(url, {});
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
