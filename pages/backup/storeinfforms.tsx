import { useForm } from "react-hook-form";
import HeroNavbar from "components/HeroNavbar";
import AuthenticationService from "services/authentication.service";
import { useEffect } from "react";
import axios from "axios";
import cookie from "js-cookie";
import Router from "next/router";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const authService = new AuthenticationService();


export default function storeinfforms() {

   const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
    <>
      <HeroNavbar />

      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Store Info
          </h1>
        </div>
      </header>

      <div className="px-12 pb-10 pt-2">
        <div>
          <form onSubmit={handleSubmit(onSubmitstoreinfo)} className="md:gap-y-6">
            {/* top */}
            <div className="md:flex md:justify-between md:p-2 md:shadow-xl">
              <h3>About</h3>

              {/* top left */}

              <div className="lefttttttttt">
                <div className="w-full mb-2">
                  <div className="flex justify-center">
                    <input
                      type="text"
                      placeholder="Store Name"
                      {...register("title", {
                        required: true,
                      })}
                      className="px-8  w-full border rounded py-2 text-gray-700 focus:outline-none items-center"
                    />
                    {errors.storename && (
                      <span className="errortext">Store name is required</span>
                    )}
                  </div>
                </div>

                <div className="w-full mb-2">
                  <div className="flex justify-center">
                    <input
                      type="text"
                      placeholder="Popular for"
                      {...register("popularFor", {
                        required: true,
                      })}
                      className="px-8  w-full border rounded py-2 text-gray-700 focus:outline-none items-center"
                    />
                    {errors.storename && (
                      <span className="errortext">Popular for is required</span>
                    )}
                  </div>
                </div>

                <div className="w-full mb-2">
                  <div className="flex justify-center">
                    <input
                      type="text"
                      placeholder="Tags"
                      {...register("tags", {
                        required: true,
                      })}
                      className="px-8  w-full border rounded py-2 text-gray-700 focus:outline-none items-center"
                    />
                    {errors.storename && (
                      <span className="errortext">Tags are required</span>
                    )}
                  </div>
                </div>
              </div>

              {/* top right */}

              <div className="topright">
                <div className="w-full mb-2">
                  <div className="flex justify-center">
                    <input
                      type="text"
                      placeholder="Description"
                      {...register("description", {
                        required: true,
                      })}
                      className="px-8  w-full border rounded py-2 text-gray-700 focus:outline-none items-center"
                    />
                    {errors.storename && (
                      <span className="errortext">Description is required</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* bottom */}

            <div className="md:flex md:justify-between md:p-2 md:shadow-xl">
              <h3>Contact</h3>

              {/* down left */}

              <div className="down-left">
                <div className="w-full mb-2">
                  <div className="flex justify-center">
                    <input
                      type="text"
                      placeholder="Store full address"
                      {...register("fullAddress", {
                        required: true,
                      })}
                      className="px-8  w-full border rounded py-2 text-gray-700 focus:outline-none items-center"
                    />
                    {errors.storename && (
                      <span className="errortext">Address required</span>
                    )}
                  </div>
                </div>

                <div className="w-full mb-2">
                  <div className="flex justify-center">
                    <input
                      type="text"
                      placeholder="Location"
                      {...register("location", {
                        required: true,
                      })}
                      className="px-8  w-full border rounded py-2 text-gray-700 focus:outline-none items-center"
                    />
                    {errors.storename && (
                      <span className="errortext">Location is required</span>
                    )}
                  </div>
                </div>

                <div className="w-full mb-2">
                  <div className="flex justify-center">
                    <input
                      type="text"
                      placeholder="Pincode"
                      {...register("pincode", {
                        required: true,
                      })}
                      className="px-8  w-full border rounded py-2 text-gray-700 focus:outline-none items-center"
                    />
                    {errors.storename && (
                      <span className="errortext">Pincode is required</span>
                    )}
                  </div>
                </div>
              </div>

              {/* down right */}

              <div className="downright">
                <div className="w-full mb-2">
                  <div className="flex justify-center">
                    <input
                      type="text"
                      placeholder="Phone"
                      {...register("phone", {
                        required: true,
                      })}
                      className="px-8  w-full border rounded py-2 text-gray-700 focus:outline-none items-center"
                    />
                    {errors.storename && (
                      <span className="errortext">
                        Phone number is required
                      </span>
                    )}
                  </div>
                </div>

                <div className="w-full mb-2">
                  <div className="flex justify-center">
                    <input
                      type="text"
                      placeholder="Email"
                      {...register("email", {
                        required: true,
                      })}
                      className="px-8  w-full border rounded py-2 text-gray-700 focus:outline-none items-center"
                    />
                    {errors.storename && (
                      <span className="errortext">Email is required</span>
                    )}
                  </div>
                </div>

                <div className="w-full mb-2">
                  <div className="flex justify-center">
                    <input
                      type="text"
                      placeholder="Website"
                      {...register("website", {
                        required: true,
                      })}
                      className="px-8  w-full border rounded py-2 text-gray-700 focus:outline-none items-center"
                    />
                    {errors.storename && (
                      <span className="errortext">Website is required</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="md:flex md:justify-center md:items-center">
              <button
                type="submit"
                className="w-full mt-6 py-2 rounded bg-pink-600 text-gray-100 focus:outline-none md:w-32 md:rounded-full"
              >
                Publish
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
