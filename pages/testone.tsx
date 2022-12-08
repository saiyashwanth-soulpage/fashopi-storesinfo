import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import Image from "next/image";
import Navbar from "components/Navbar";
// import { Button } from "react-bootstrap";
import Sidebar from "components/Sidebar";
import Edit from "../public/edit.png";
import AuthenticationService from "services/authentication.service";
import { useEffect } from "react";
import axios from "axios";
import cookie from "js-cookie";
import Router from "next/router";
import { useRouter } from "next/router";
const authService = new AuthenticationService();

function BasicExample() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            required
          />
        </div>
        <div className="col-md-4">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            required
          />
        </div>
        <div className="col-md-4">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            required
          />
        </div>
      </div>
    </div>
  );
}

export default BasicExample;
