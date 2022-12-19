import HeroNavbar from "components/HeroNavbar";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import cookie from "js-cookie";
import Router from "next/router";
import { toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Image from "next/image";
import Update from "../public/edit1.png";
import Delete from "../public/delete.png";
import Button from "react-bootstrap/Button";

export default function Dashboard() {
  // form
  const { register, handleSubmit, formState, trigger } = useForm<any>();

  // for modal
  const [showmodal, setShowmodal] = useState<any>(false);

  // to open modal
  const handleShow = () => {
    setShowmodal(true);
  };

  // to close modal
  const handleClose = () => {
    setShowmodal(false);
  };

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
    const updatexyz = {
      title: data.title,
      description: data.description,
      phone: data.phone,
      website: data.website,
      email: data.email,
      fullAddress: data.fullAddress,
      location: data.location,
      popularFor: data.popularFor,
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
      <HeroNavbar />

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
          Your Stores
          <div className="px-4 py-6 sm:px-0">
            <div className="h-96 rounded-lg border-4 border-dashed border-gray-200 flex items-center justify-center">
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
                                onClick={() => setShowmodal(false)}
                              >
                                Submit
                              </button>
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

                {/* react bootstrap table */}
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Store Id</th>
                      <th>Store Name</th>
                      <th>Description</th>
                      <th>Phone</th>
                      <th>Website</th>
                      <th>Update</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
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
                          <tr key={id}>
                            <td className="border">{abcd.id}</td>
                            <td className="border">{abcd.title}</td>
                            <td className="border">{abcd.description}</td>
                            <td className="border">{abcd.phone}</td>
                            <td className="border">{abcd.website}</td>
                            <td>
                              <Image
                                src={Update}
                                alt="update"
                                onClick={() => setShowmodal(true)}
                              />

                              {/* apply changes after modal */}
                              {applyChanges && (
                                <Button
                                  onClick={() => updateStore(id)}
                                  variant="danger"
                                  className="btn-update ring-2 ring-pink-300 ring-inset text-black hover:ring-4 hover:bg-white"
                                >
                                  <span>Apply Changes</span>
                                </Button>
                              )}
                            </td>
                            <td>
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
                </Table>
              </div>
            </div>
          </div>
          {/* /End replace */}
          {/* End of the page */}
        </div>
      </main>
    </div>
  );
}
