import NavBar from "components/NavBar/navbar";
import SideNav from "components/sidenav/sidenav";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import EditIcon from "public/edit.png";
import Image from "next/image";
import { useForm} from "react-hook-form";
import axios from "axios";
import router from "next/router";
import { toast } from "react-toastify";
import { storeType } from "docs/data";
import React from "react";
import Select from "react-select";
import UserService from "services/user.service";

export default function StoreInfo(props) {

  const userService = new UserService();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const contactInfoSubmitHandler = async (data: any) => {
    console.log(data);
    try {
      const user = await userService.userDetails();
      const res = await axios.post("api/storeinfo", {
        ...data,
        userId: user.id,
      });
      router.push({ pathname: "/dashboard" });
      toast.success(res.data.message, { autoClose: 3000 });
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.error);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="d-flex">
        <SideNav />
        <div className="container category-bg-container h-100 p-4">
          <form onSubmit={handleSubmit(contactInfoSubmitHandler)}>
            <h1 className="title">Store Info</h1>

            <div className="category-card-container p-3">
              <div className="d-flex justify-content-between align-items-center">
                <h6 className="mt-2 mb-2 about-head">About</h6>
                <button type="submit" className="edit-btn">
                  <Image src={EditIcon} alt="edit" className="edit-icon" />
                </button>
              </div>
              <div className="d-flex">
                <div>
                  <div className="d-flex">
                    <div className="me-3">
                      <label className="label">Store name</label>
                      <input
                        type="text"
                        id="input-format"
                        {...register("title", { required: true })}
                      />
                      {errors.title && (
                        <span className="text-danger">
                          Store name is required
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="d-flex flex-column">
                    <label className="label">Popular for</label>
                    <input
                      type="text"
                      id="input-format"
                      className="popular"
                      {...register("popularFor", { required: true })}
                    />
                    {errors.popularFor && (
                      <span className="text-danger">
                        This field is required
                      </span>
                    )}
                  </div>
                  <div>
                    <label className="label">Tags</label>
                    <Select
                      isMulti
                      name="colors"
                      options={storeType}
                      className="basic-multi-select"
                      classNamePrefix="select"
                    />
                  </div>
                </div>

                <div className="ms-5 mb-4">
                  <span className="ms-3 mt-1 label">Description</span>
                  <FloatingLabel controlId="floatingTextarea2" label="">
                    <Form.Control
                      as="textarea"
                      placeholder="Leave a comment here"
                      style={{ height: "180px" }}
                      {...register("description", { required: true })}
                    />
                  </FloatingLabel>
                  {errors.description && (
                    <span className="text-danger ms-3">
                      Description is required
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="category-card-container mt-5">
              <div className="d-flex justify-content-between align-items-center p-3 pb-0">
                <h6 className="mt-2 mb-2 about-head">Contact</h6>
                <button type="submit" className="edit-btn">
                  <Image src={EditIcon} alt="edit" className="edit-icon" />
                </button>
              </div>

              <div className="d-flex justify-content-between p-3">
                <div className="d-flex flex-column">
                  <label className="label">
                    Store full address
                    <input
                      type="text"
                      placeholder="Your Full Address..."
                      {...register("fullAddress", { required: true })}
                      id="input-format"
                    />
                  </label>
                  {errors.fullAddress && (
                    <span className="text-danger">
                      Full Address is required
                    </span>
                  )}
                  <div>
                    <h3 className="text-center mt-5">Map</h3>
                  </div>
                </div>
                <div className="d-flex flex-column ">
                  <div className="d-flex">
                    <div className="d-flex flex-column">
                      <label className="label">
                        Location
                        <input
                          type="text"
                          placeholder="Location..."
                          {...register("location", { required: true })}
                          id="input-format"
                        />
                      </label>
                      {errors.location && (
                        <span className="text-danger">
                          Location is required
                        </span>
                      )}
                    </div>
                    <div className="d-flex flex-column">
                      <label className="label">
                        Pincode
                        <input
                          type="text"
                          placeholder="Your Location Pincode..."
                          {...register("pincode", { required: true })}
                          id="input-format"
                          className="ms-2"
                        />
                      </label>
                      {errors.pincode && (
                        <span className="text-danger">Pincode is required</span>
                      )}
                    </div>
                  </div>

                  <label className="label">
                    E-mail
                    <input
                      type="email"
                      placeholder="E-mail address..."
                      {...register("email", { required: true })}
                      className="w-100"
                      id="input-format"
                    />
                  </label>
                  {errors.email && (
                    <span className="text-danger">E-mail is required</span>
                  )}
                  <label className="label">
                    Phone
                    <input
                      type="text"
                      placeholder="Your Phone number..."
                      {...register("phone", { required: true })}
                      className="w-100"
                      id="input-format"
                    />
                  </label>
                  {errors.phone && (
                    <span className="text-danger">
                      Phone number is required
                    </span>
                  )}
                  <label className="label">
                    Website
                    <input
                      type="text"
                      placeholder="Your Website.."
                      {...register("website", { required: true })}
                      className="w-100"
                      id="input-format"
                    />
                  </label>
                  {errors.website && (
                    <span className="text-danger">Website is required</span>
                  )}
                </div>
              </div>
            </div>

            <div className="text-center p-3">
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}