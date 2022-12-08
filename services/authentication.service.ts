import axios from "axios";
import APIService from "./api.service";
import { LOG_IN, SIGN_UP, STORE_INFO } from "lib/endpoints";

class AuthenticationService extends APIService {

  // for Sign up
  signup(data: any): Promise<any> {
    return this.post(`${SIGN_UP}`, data)
      .then((res) => {
        return res.data;
      })
      .catch((error: any) => {
        throw error.response.data;
      });
  }


  // Sign in or Log in
  login(data: any): Promise<any> {
    return this.post(`${LOG_IN}`, data)
      .then((res) => {
        return res.data;
      })
      .catch((error: any) => {
        throw error.response.data;
      });
  }

  // same - return this.post(`${LOG_IN}`, data)   from here -----> same as below
  // axios
  // .post("api/login", xyz) or .post(`${LOG_IN}`, xyz)
  // .then((res: any) => {
  //   console.log(res);
  //   console.log(res.data.authToken_is_anyname);
  //   cookie.set("accessToken", res.data.authToken_is_anyname);
  //   router.push("/landingpage");
  // })
  // .catch((e) => {
  //   alert(e.message);
  // });


  //  storeinfo
  storeinfo(data: any): Promise<any> {
    return this.post(`${STORE_INFO}`, data)
      .then((res) => {
        return res.data;
      })
      .catch((error: any) => {
        throw error.response.data;
      });
  }
}

export default AuthenticationService;
