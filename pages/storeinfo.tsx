import { useForm } from "react-hook-form";
import Image from "next/image";
import Navbar from "components/Navbar";
import { Button } from "react-bootstrap";
import Sidebar from "components/Sidebar";
import Edit from "../public/edit.png";
import AuthenticationService from "services/authentication.service";
import { useEffect } from "react";
import axios from "axios";
import cookie from "js-cookie";
import Router from "next/router";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const authService = new AuthenticationService()

export default function Storeinfo() {
  const router = useRouter();

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


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmitstoreinfo = (data: any) => {
    // console.log(data);
    const storesxyz: any = {
      title: data.title,
      description: data.description,
      popularFor: data.popularFor,
      fullAddress: data.fullAddress,
      location: data.location,
      pincode: data.pincode,
      phone: data.phone,
      email: data.email,
      tags: data.tags,
      website: data.website,
    };
    
      authService
      .storeinfo(storesxyz)
      .then((res: any) => {
        toast.success("Store Created ", { autoClose: 2000 });
        router.push("/dashboard");

     })
     .catch((err: any) => {
       toast.error(err.message);
     });
  };

  console.log("errors object is", errors);
  return (
    <div>
      <Navbar />

      <div className="bg">
        <div className="sidebyside">
          <Sidebar />

          <div className="storeinfodivroot">
            <form onSubmit={handleSubmit(onSubmitstoreinfo)}>
              <h5 className="text-muted">Store Info</h5>

              <div className="aboutdiv">
                <div className="aboutandedit">
                  <h4 className="abouth3">About</h4>
                  {/* <Image src={Edit} alt="edit" className="aboutimgeedit" /> */}
                </div>

                <div className="rowtype">
                  <div className="aboutdetails">
                    <label> Store Name </label>
                    <input
                      type="text"
                      placeholder="Store Name"
                      {...register("title", {
                        required: true,
                      })}
                    />

                    {errors.storename && (
                      <span className="errortext">Store name is required</span>
                    )}

                    <label> Popular for </label>
                    <input
                      type="text"
                      placeholder="Popular for"
                      {...register("popularFor", {
                        required: true,
                      })}
                    />

                    {errors.popularfor && (
                      <span className="errortext">Field is required</span>
                    )}

                    <label> Tags ( Seperated by Commas) </label>
                    <input
                      type="text"
                      placeholder="Tags"
                      {...register("tags", {
                        required: true,
                      })}
                    />
                    <br />
                  </div>

                  <div className="descriptiondiv">
                    <label>Description</label>
                    <input
                      type="text"
                      placeholder="maximum of 500 characters"
                      {...register("description", {
                        required: true,
                      })}
                      style={{ height: "160px", width: "260px" }}
                    />

                    {errors.description && (
                      <span className="errortext">Description is required</span>
                    )}
                  </div>
                </div>
              </div>

              <br />
              <br />

              <div className="contactdiv">
                <div className="contactandedit">
                  <h4>Contact</h4>
                  {/* <Image src={Edit} alt="edit" /> */}
                </div>

                <div className="rowtype">
                  <div className="storefulladdressdiv">
                    <label> Store full address </label>
                    <input
                      type="text"
                      placeholder="Store full address"
                      {...register("fullAddress", {
                        required: true,
                      })}
                    />

                    {errors.fulladdress && (
                      <span className="errortext">
                        Full address is required
                      </span>
                    )}
                  </div>

                  <div className="contactdetails">
                    <label>location</label>
                    <input
                      type="text"
                      placeholder="Location"
                      {...register("location", {
                        required: true,
                      })}
                    />

                    {errors.location && (
                      <span className="errortext">Location is required</span>
                    )}

                    <label>pincode</label>
                    <input
                      type="text"
                      placeholder="Pincode"
                      {...register("pincode", {
                        required: true,
                      })}
                    />

                    {errors.pincode && (
                      <span className="errortext">Pincode is required</span>
                    )}

                    <label>Phone</label>
                    <input
                      type="text"
                      placeholder="Phone number"
                      {...register("phone", {
                        required: true,
                      })}
                    />

                    {errors.phone && (
                      <span className="errortext">
                        Phone number is required is required
                      </span>
                    )}

                    <label>Email Id</label>
                    <input
                      type="text"
                      placeholder="Email Id"
                      {...register("email", {
                        required: true,
                      })}
                    />

                    {errors.email && (
                      <span className="errortext">Email id is required</span>
                    )}

                    <label>Website</label>
                    <input
                      type="text"
                      placeholder="Website"
                      {...register("website", {
                        required: true,
                      })}
                    />

                    {errors.website && (
                      <span className="errortext">Website is required</span>
                    )}
                    <br />
                  </div>
                </div>
              </div>
              <div className="publishbutton">
                <button className="pinkbutton">Publish</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
