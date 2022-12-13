import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Navbar from "components/Navbar";
import Sidebar from "components/Sidebar";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import cookie from "js-cookie";
import Router from "next/router";
import Table from "react-bootstrap/Table";
import Image from "next/image";
import Update from "../public/edit1.png";
import Delete from "../public/delete.png";

export default function Dashboard() {
  const [show, setShow] = useState<any>(false);
  const { register, handleSubmit, formState, trigger } = useForm<any>();

  const [updatedStore, setUpdatedStore] = useState<any>({});
  const [showupdateChanges , setShowupdateChanges] = useState<any>(false) 

  const handleShow = () => setShow(true);
  const { errors } = formState;
  const [render, setRender] = useState(false);
  const [data, setData] = useState([]);

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

  // update store function
  const updateStoreHandler = (data : any) => {
    const updatedData = {
      title: data.title,
      description: data.description,
      email: data.email,
      website: data.website,
      phone: data.phone,
      fullAddress: data.fullAddress,
      location: data.location,
      popularFor: data.popularFor,
    };
    setUpdatedStore(updatedData);
    console.log(updatedStore);
    setShowupdateChanges(true)
  };

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
  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
      <Navbar />

      <div className="sidebyside">
        <Sidebar />
        <div className="dashboarddiv">
          <h1>Your Stores</h1>

          <div className="storesindashboardd">
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
                  <div key={id}>
                    <div className="storesrender">
                      <div id="modal-window">
                        <Modal show={show} onHide={handleClose}>
                          <Modal.Header>
                            <Modal.Title>Update Store Information</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <form onSubmit={handleSubmit(updateStoreHandler)}>
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

                              <div className="text-center">
                                <button
                                  type="submit"
                                  className="btn btn-danger me-2"
                                  onClick={handleClose}
                                >
                                  Submit
                                </button>
                              </div>
                            </form>
                            
                          </Modal.Body>
                        </Modal>
                      </div>
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
                          <tr>
                            <td>{id}</td>
                            <td>{title}</td>
                            <td>{description}</td>
                            <td>{phone}</td>
                            <td>{website}</td>
                            <td>
                              <Image
                                src={Update}
                                alt="update"
                                onClick={handleShow}
                              />
                              {showupdateChanges && <Button
                                onClick={() => updateStore(id)}
                                variant="danger"
                                className="btn-update"
                              >
                                <span>Apply Changes</span>
                              </Button>}
                            </td>
                            <td>
                              <Image
                                src={Delete}
                                alt="delete"
                                onClick={() => deleteStore(id)}
                              />
                            </td>
                          </tr>
                          <tr></tr>
                        </tbody>
                      </Table>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
