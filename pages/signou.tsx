import { toast } from "react-toastify";
import cookie from "js-cookie";
import Signupandlogin from "./signupandlogin";
// import { useRouter } from "next/router";
// import Router from "next/router";

export default function signou() {
  // const router = useRouter();

  const handleLogout = () => {
    console.log("dkd");
    cookie.remove("accessToken");
    toast.success("Logged out ", { autoClose: 1000 });
    // Router.push("/signupandlogin");
  };

  return (
    <>
      
      {handleLogout()}
      <Signupandlogin/>
    </>
  );
}
