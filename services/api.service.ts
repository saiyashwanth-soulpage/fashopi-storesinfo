import axios, { AxiosPromise } from "axios";
// cookie
import cookie from "js-cookie";

abstract class APIService {

  getAxiosHeaders(): any {
    const token = cookie.get('accessToken');
    return {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json',
    };
  }

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
      // or headers like this ?
      headers:{ Authorization: `Bearer ${cookie.get("accessToken")}` },
    });
  }
  
  // Axios put method
  put(url: string, data = {}): AxiosPromise<any> {
    return axios({
      method: "PUT",
      url,
      data,
      headers: this.getAxiosHeaders(),
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
