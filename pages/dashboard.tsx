// import HeroNavbar from "../components/HeroNavbar";
import Heronav from "../components/Heronav";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import cookie from "js-cookie";
import Router from "next/router";
import { toast } from "react-toastify";
import Image from "next/image";
import Update from "../public/edit1.png";
import Delete from "../public/delete.png";


export default function Dashboard() {
  // form
  const { register, handleSubmit, formState, trigger } = useForm<any>();

  // for modal
  const [showmodal, setShowmodal] = useState<any>(false);

  // for inserting updatexyz
  const [updatedStore, setUpdatedStore] = useState<any>({});

  // to apply update after receiving updatexyz data
  const [applyChanges, setApplyChanges] = useState<any>(false);

  const [render, setRender] = useState(false);

  // for displaying
  const [data, setData] = useState([]);

  // for get user stores
  useEffect(() => {
    axios
      .get("api/dashboard", {
        headers: {
          Authorization: cookie.get("accessToken")
            ? `Bearer ${cookie.get("accessToken")}`
            : "",
          "Content-Type": "application/json",
        },
      })
      .then((res: any) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch(() => Router.push("/signupandlogin"));
  }, [render]);

  // delete store function
  const deleteStore = (id: any) => {
    console.log(id);
    axios
      .delete(`api/deletestore/${id}`, {
        headers: {
          Authorization: cookie.get("accessToken")
            ? `Bearer ${cookie.get("accessToken")}`
            : "",
          "Content-Type": "application/json",
        },
      })
      .then((res: any) => {
        toast.success("Store deleted successfully.", { autoClose: 2000 });
        setRender(!render);
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  // inserting updated data to a variable
  const onSubmitData = (data: any) => {
    console.log(data);
    const updatexyz = {
      title: data.title,
      description: data.description,
      phone: data.phone,
      website: data.website,
    };
    setUpdatedStore(updatexyz);
    // check in console
    console.log(updatedStore);
    // make true for apply changes
    setApplyChanges(true);
  };

  // update store function
  const updateStore = async (id: any) => {
    console.log(id);
    updatedStore &&
      (await axios
        .put(
          `api/updatestore/${id}`,
          {
            ...updatedStore,
          },
          {
            headers: {
              Authorization: cookie.get("accessToken")
                ? `Bearer ${cookie.get("accessToken")}`
                : "",
              "Content-Type": "application/json",
            },
          }
        )
        .then((res: any) => {
          toast.success(res.data.message);
        })
        .catch((e) => {
          alert(e.message);
        }));
  };

  return (
    <div>
      <Heronav/>

      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Dashboard
          </h1>
        </div>
      </header>

      {/* custom render space */}
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          {/* Top replace */}
          <h5 className="text-muted">Your Stores</h5>
          <div className="px-4 py-6 sm:px-0">
            {/* write main */}
            {/* Lorem, ipsum dolor - MAIN */}

            {showmodal ? (
              <>
                <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                  <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                      <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                        <h3 className="text-3xl font=semibold">
                          Update Store Info
                        </h3>
                      </div>

                      <div className="relative p-6 flex-auto">
                        <form
                          onSubmit={handleSubmit(onSubmitData)}
                          className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full"
                        >
                          {/* title */}
                          <label className="block text-black text-sm font-bold mb-1">
                            Title
                          </label>
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                            type="text"
                            {...register("title", { required: true })}
                            placeholder="Enter Store title"
                          />

                          {/* description */}
                          <label className="block text-black text-sm font-bold mb-1">
                            Description
                          </label>
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                            type="text"
                            {...register("description", { required: true })}
                            placeholder="Enter Description"
                          />

                          {/* phone no */}
                          <label className="block text-black text-sm font-bold mb-1">
                            Phone Number
                          </label>
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                            type="text"
                            {...register("phone", { required: true })}
                            placeholder="Enter Phone number"
                          />

                          {/* website */}
                          <label className="block text-black text-sm font-bold mb-1">
                            Website
                          </label>
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                            type="text"
                            {...register("website", { required: true })}
                            placeholder="Enter Website"
                          />

                          {/* button */}
                          <div className="text-center">
                            <button
                              type="submit"
                              className="edge rounded-lg border-2 mt-4 hover:border-pink-900"
                            >
                              Submit
                            </button>
                            <div>
                              <button
                                onClick={() => setShowmodal(false)}
                                className="edge rounded-lg border-2 mt-4 hover:border-pink-900"
                              >
                                Close
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : null}

            <div>
              {/* render Stores in a table */}

              {/* table */}
              <div className="flex items-center justify-center">
                <div>
                  <table className="w-full flex flex-row flex-no-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5">
                    <thead className="text-white">
                      <tr className="bg-pink-500 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
                        <th className="p-3 text-left">Store Id</th>
                        <th className="p-3 text-left">Store Name</th>
                        <th className="p-3 text-left w-28">Description</th>
                        <th className="p-3 text-left">Phone</th>
                        <th className="p-3 text-left">Website</th>
                        <th className="p-3 text-left">Update</th>
                        <th className="p-3 text-left">Delete</th>
                      </tr>
                    </thead>

                    <tbody className="flex-1 sm:flex-none">
                      {data.map((abcd) => {
                        const {
                          id,
                          title,
                          description,
                          popular_for,
                          address,
                          location,
                          pincode,
                          phone,
                          email,
                          website,
                          created_at,
                        } = abcd;
                        return (
                          <>
                            <tr
                              key={id}
                              className="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0"
                            >
                              <td className="border-grey-light border hover:bg-gray-100 p-3">
                                {abcd.id}
                              </td>
                              <td className="border-grey-light border hover:bg-gray-100 p-3">
                                {abcd.title}
                              </td>
                              <td className="border-grey-light border hover:bg-gray-100 p-3">
                                {abcd.description}
                              </td>
                              <td className="border-grey-light border hover:bg-gray-100 p-3">
                                {abcd.phone}
                              </td>
                              <td className="border-grey-light border hover:bg-gray-100 p-3 truncate">
                                {abcd.website}
                              </td>
                              <td className="border-grey-light border hover:bg-gray-100 p-3 text-red-400 hover:text-red-600 hover:font-medium cursor-pointer flex items-center justify-center gap-1">
                                <Image
                                  src={Update}
                                  alt="update"
                                  onClick={() => setShowmodal(true)}
                                />
                                {/* apply changes after modal */}
                                {applyChanges && (
                                  <button
                                    onClick={() => updateStore(id)}
                                    className="ring-2 ring-pink-500 ring-inset text-black hover:ring-4 hover:bg-white"
                                  >
                                    <span>Apply Changes</span>
                                  </button>
                                )}
                              </td>
                              <td className="border-grey-light border hover:bg-gray-100 p-3 text-red-400 hover:text-red-600 hover:font-medium cursor-pointer">
                                <Image
                                  src={Delete}
                                  alt="delete"
                                  onClick={() => deleteStore(id)}
                                />
                              </td>
                            </tr>
                          </>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* table end here */}
            </div>
          </div>
          {/* /End replace */}
          {/* End of the page */}
        </div>
      </main>
    </div>
  );
}
