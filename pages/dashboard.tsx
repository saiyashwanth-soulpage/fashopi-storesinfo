import axios from "axios";
import Navbar from "components/Navbar";
import Sidebar from "components/Sidebar";
import { useEffect, useState } from "react";
import cookie from "js-cookie";
import Router from "next/router";
import Table from "react-bootstrap/Table";
import Image from "next/image";
import { Button } from "react-bootstrap";
import Update from "../public/edit1.png";
import Delete from "../public/delete.png";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [render, setRender] = useState(false);

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

  // update store function
  const updateStore = () => {
    axios
      .put("api/dashboard", {
        headers: {
          Authorization: cookie.get("accessToken")
            ? `Bearer ${cookie.get("accessToken")}`
            : "",
          "Content-Type": "application/json",
        },
      })
      .then((res: any) => {
        alert("Store updated successfully.");
      })
      .catch((e) => {
        alert(e.message);
      });
  };

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
        alert("Store deleted successfully.");
        setRender(!render);
      })
      .catch((e) => {
        alert(e.message);
      });
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
                                onClick={updateStore}
                              />
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
