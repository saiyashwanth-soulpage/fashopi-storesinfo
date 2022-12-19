import HeroNavbar from "components/HeroNavbar";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import cookie from "js-cookie";
import Router from "next/router";
import { toast } from "react-toastify";
import { Dialog } from "@headlessui/react";

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
      email: data.email,
      website: data.website,
      phone: data.phone,
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
              
              <div>
              <Dialog open={showmodal} onClose={() => setShowmodal(false)}>
                <Dialog.Panel>
                  <Dialog.Title>Update Store Information</Dialog.Title>
                  <Dialog.Description>
                    This will permanently update your store.
                  </Dialog.Description>




                  {/* form in modal body for new updated data - updatexyz */}
                  <form onSubmit={handleSubmit(onSubmitData)}>
                      {/* title */}
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput1"
                          className="form-label"
                        >
                          Title
                        </label>
                        <input
                          type="text"
                          {...register("title", { required: true })}
                          className="form-control"
                          id="exampleFormControlInput1"
                          placeholder="Enter Store title"
                        />
                      </div>

                      {/* email */}
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput1"
                          className="form-label"
                        >
                          E-mail
                        </label>
                        <input
                          {...register("email")}
                          type="email"
                          className="form-control"
                          id="exampleFormControlInput1"
                          placeholder="Enter Store E-mail address"
                        />
                      </div>

                      {/* phone no. */}
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput1"
                          className="form-label"
                        >
                          Phone number
                        </label>
                        <input
                          {...register("phone")}
                          type="text"
                          className="form-control"
                          id="exampleFormControlInput1"
                          placeholder="Enter phone number "
                        />
                      </div>

                      {/* full adderess */}
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput1"
                          className="form-label"
                        >
                          Full Address
                        </label>
                        <input
                          {...register("fullAddress")}
                          type="text"
                          className="form-control"
                          id="exampleFormControlInput1"
                          placeholder="Enter Full Address "
                        />
                      </div>

                      {/* location */}
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput1"
                          className="form-label"
                        >
                          Location
                        </label>
                        <input
                          {...register("location")}
                          type="text"
                          className="form-control"
                          id="exampleFormControlInput1"
                          placeholder="Enter Location of Store "
                        />
                      </div>

                      {/* website */}
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput1"
                          className="form-label"
                        >
                          Website
                        </label>
                        <input
                          {...register("website")}
                          type="text"
                          className="form-control"
                          id="exampleFormControlInput1"
                          placeholder="Enter Website of your Store "
                        />
                      </div>

                      {/* popular for */}
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput1"
                          className="form-label"
                        >
                          Popular For
                        </label>
                        <input
                          {...register("popularFor")}
                          type="text"
                          className="form-control"
                          id="exampleFormControlInput1"
                          placeholder="Your Store Popular for... "
                        />
                      </div>

                      {/* for description */}
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                      >
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                          as="textarea"
                          {...register("description")}
                          rows={3}
                        />
                      </Form.Group>

                      {/* button */}
                      <div className="text-center">
                        <button
                          type="submit"
                          className="btn btn-danger me-2"
                          onClick={() => setShowmodal(false)}
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                </Dialog.Panel>
              </Dialog>
              </div>



              

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
                                onClick={handleShow}
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
