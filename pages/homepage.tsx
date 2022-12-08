import { useEffect } from "react";
import Image from "next/image";
import Step1 from "../public/step1.png";
import Step2 from "../public/step2.png";
import Step3 from "../public/step3.png";
import Retailshoppingstore from "../public/retailshoppingstore.png";
import Link from "next/link";
import Navbar from "components/Navbar";
import Sidebar from "components/Sidebar";
// import AuthenticationService from "services/authentication.service";
import axios from "axios";
import cookie from "js-cookie";
import Router from "next/router";

export default function homepage(){

  // const authService = new AuthenticationService();


  useEffect(() => {
    axios
      .post(
        "api/authenticated",
        {},
        {
          headers: {
            Authorization: cookie.get("accessToken")
              ? `Bearer ${cookie.get("accessToken")}`
              : "",
            "Content-Type": "application/json",
          },
        }
      )
      .catch(() => Router.push("/signupandlogin"));
  }, []);

  
    return(
      <>
      <Navbar/>

      <div className="sidebyside">
      <Sidebar/>
        <div className="homepagerootdiv">

          

        <h2>Here is how Fashopi helps you</h2>
        <p>Lorem ipsum dolor sit amet.</p>

     <div className="steps">
        <div className="step1">
        <Image
            src={Step1}
            alt="image1"
            className="step1"
          />
          <h2>Step 1</h2>
          <p>Add your store info in below form</p>
        </div>

        <div>
        <Image
            src={Step2}
            alt="image1"
            className="step2"
          />
          <h2>Step 2</h2>
          <p>Set up your store profile & add products</p>
        </div>

        <div>
        <Image
            src={Step3}
            alt="image1"
            className="step3"
          />
          <h3>Step 3</h3>
          <p>Start Selling & make more business</p>
        </div>

      </div>

       <div className="retailshoppingstore">
        <h1>Are you a Retail Store Owner ?</h1>
        <Image
            src={Retailshoppingstore}
            alt="image1"
          />

          <Link href="/storeinfo">
          <button className="pinkbutton">Get Started</button>
          </Link>
       </div> 
        </div>
        </div>
        </>
    )

}