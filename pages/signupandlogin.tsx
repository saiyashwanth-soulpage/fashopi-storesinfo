import Image from "next/image";
// import Pinkfade from "../public/pinkfade.png";
import Leftimage from "../public/Rectangleleftsignup.png";
import Fashpilogo from "../public/fashpilogo.png";
// for form validations
import { useForm } from "react-hook-form";
// for login & signup routes
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AuthenticationService from "services/authentication.service";
import cookie from "js-cookie";
import { toast } from "react-toastify";


export default function Signupandlogin() {
  const authService = new AuthenticationService();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  }: any = useForm();

  // for login & signup routes
  const [forlogin, setForlogin] = useState(true);

  const loginroute = () => {
    setForlogin(true);
  };

  const signuproute = () => {
    setForlogin(false);
  };

  useEffect(() => {
    if (router.query.forlogin !== undefined) 
    loginroute();
  }, []);

  // for validations in email and password (pattern) in login page
  const mobilenumberpattern = /^([+]\d{2})?\d{10}$/;
  const emailpattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const passwordpattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g;

  // for login form submission
  const onSubmit1 = (data: any) => {
    console.log(data);
    const xyz: any = {
      firstname: data.firstname,
      lastname: data.lastname,
      mobilenumber: data.mobilenumber,
      email: data.email,
      password: data.password,
    };

    authService
      .login(xyz)
      .then((res: any) => {
        console.log(res);
        console.log(res.authToken_is_anyname);
        cookie.set("accessToken", res.authToken_is_anyname);
        toast.success("Login successfull ", { autoClose: 2000 });
        // authService.authenticateUser(res?.token);
        router.push("/homepage");
      })
      .catch((err: any) => {
        toast.error(err.message);
      });

    // or like this - axios .post("api/login", xyz) .then((res: any) => {
  };


  // for signup form submission
  const onSubmit2 = (data: any) => {
    console.log(data);
    const xyz: any = {
      firstname: data.firstname,
      lastname: data.lastname,
      mobilenumber: data.mobilenumber,
      email: data.email,
      password: data.password,
    };

    authService
      .signup(xyz)
      .then((res: any) => {
        console.log(res);
        // alert("Account created successfully. Please login !");
        toast.success("Account created successfully. Please login !")
        router.push("/signupandlogin?forlogin");
      })
      .catch((err: any) => {
        alert(err.message);
      });

    //or like this - axios .post("api/signup",xyz) .then((res: any) => {
  };

  // this is error object in console. see it for better understanding
  console.log("errors object is", errors);


  return (
    <div className="layer">
      <div className="center">
        <div className="left">

          {/* <Image src={Pinkfade} alt="fade" className="pinkfade"/> */}
          <Image
            src={Leftimage}
            alt="image"
            className="leftimage"
            // width={300}
            // height={431}
          />
        </div>

        <div className="right">
          <div className="options">
            <p className="login" onClick={loginroute}>
              Login
            </p>
            <p className="signup" onClick={signuproute}>
              Signup
            </p>
          </div>

          {/* for login form */}
          <div>
            {forlogin && (
              <form className="loginform" onSubmit={handleSubmit(onSubmit1)}>
                <input
                  type="email"
                  placeholder="Email Id"
                  className="borderbottom"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: emailpattern,
                      message: "this is not a valid email",
                    },
                  })}
                />
                {/* <p className="errormessage">{errors.email?.message}</p> */}
                {errors.email?.message}

                <input
                  type="password"
                  placeholder="Password"
                  className="borderbottom"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message:
                        "please enter correct password & it should be more than 8 characters",
                    },
                    pattern: {
                      value: passwordpattern,
                      message:
                        "Password criteria - 1 uppercase,1 lowercase,1 number,1 special character, minimum 8 characters",
                    },
                  })}
                />
                {/* <p className="errormessage">{errors.password?.message}</p> */}
                {errors.password?.message}
                <button className="loginbutton">Login</button>
                <p className="textdownbutton">
                  You agree with our terms of use & privacy policy by logging in.
                </p>
              </form>
            )}
          </div>

          {/* for signup form */}
          <div>
            {!forlogin && (
              <form className="signupform" onSubmit={handleSubmit(onSubmit2)}>
                <input
                  type="text"
                  placeholder="First Name"
                  className="borderbottom"
                  {...register("firstname", {
                    required: { value: true, message: "firstname is required" },
                  })}
                />
                {/* <p className="errormessage">{errors.firstname?.message}</p> */}
                {errors.firstname?.message}

                <input
                  type="text"
                  placeholder="Last Name"
                  className="borderbottom"
                  {...register("lastname", {
                    required: { value: true, message: "lastname is required" },
                  })}
                />
                {errors.lastname?.message}

                <input
                  type="tel"
                  placeholder="Mobile number"
                  className="borderbottom"
                  {...register("mobilenumber", {
                    required: {
                      value: true,
                      message: "mobile number is required",
                    },
                    pattern: {
                      value: mobilenumberpattern,
                      message: "please enter valid number",
                    },
                  })}
                />
                {errors.mobilenumber?.message}

                <input
                  type="email"
                  placeholder="Email"
                  className="borderbottom"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: emailpattern,
                      message: "this is not a valid email",
                    },
                  })}
                />
                {errors.email?.message}

                <input
                  type="password"
                  placeholder="Password"
                  className="borderbottom"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message:
                        "please enter correct password & it should be more than 8 characters",
                    },
                    pattern: {
                      value: passwordpattern,
                      message:
                        "Password is not matching the criteria.Password must contain one uppercase, one lowercase, one number, one special character, minimus 8 characters",
                    },
                  })}
                />
                {errors.password?.message}

                <button className="signupbutton">Signup</button>
                <p className="textdownbutton">
                  You agree with our terms of use & privacy policy by signing up
                </p>
              </form>
            )}
          </div>
          <Image src={Fashpilogo} alt="fashopi" className="fashopilogo" />
        </div>
      </div>
    </div>
  );
}
