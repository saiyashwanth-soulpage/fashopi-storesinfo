import axios, { AxiosPromise } from "axios";
// cookie
import cookie from "js-cookie";

abstract class APIService {

  // Axios get method
  get(url: string): AxiosPromise<any> {
    return axios({ method: "GET", url});
  }

  // Axios post method
  post(url: string, data = {}, headers?: any): AxiosPromise<any> {
    return axios({
      method: "POST",
      url,
      data,
      headers:{ Authorization: `Bearer ${cookie.get("accessToken")}` },
    });
  }
  
  // Axios put method
  put(url: string, data = {}): AxiosPromise<any> {
    return axios({
      method: "PUT",
      url,
      data,
    });
  }
  // Axios delete method
  delete(url: string): AxiosPromise<any> {
    return axios({
      method: "DELETE",
      url,
    });
  }
}

export default APIService;
