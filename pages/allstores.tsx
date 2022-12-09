import React from 'react';
import axios from 'axios';
import { useState,useEffect } from 'react';
import cookie from "js-cookie";
import Router from "next/router";
import Table from "react-bootstrap/Table";

export default function Allstores() {

    const [mydata, setMydata] = useState([]);

    useEffect(() => {
        axios
          .get("api/allstores")
          .then((res: any) => {
            console.log(res.data);
            setMydata(res.data);
          })
          .catch(() => Router.push("/signupandlogin"));
      }, []);

      const signupandloginpage = ()=>{
        Router.push("/signupandlogin")
      }

      return (
        <>

        <button onClick={signupandloginpage} className="edge">Login</button>
            <div className="dashboarddiv">
              <h1>All Stores</h1>
    
              <div className="storesindashboardd">
                {mydata.map((abcd) => {
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
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>{id}</td>
                                <td>{title}</td>
                                <td>{description}</td>
                                <td>{phone}</td>
                                <td>{website}</td>
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
        </>
      )
            }













//   return (
//     <>
//     <div className="dashboarddiv">
//         <h1> All Stores</h1>
//         <div className="storesindashboardd">
//             {mydata.map((abcd) => {
//               const {
//                 id,
//                 title,
//                 description,
//                 popular_for,
//                 address,
//                 location,
//                 pincode,
//                 phone,
//                 email,
//                 website,
//                 created_at,
//               } = abcd;
//               return (
//                 <>
//                   <div key={id}>
//                     <div className="storesrender">
//                       <Table striped bordered hover>
//                         <thead>
//                           <tr>
//                             <th>Store Id</th>
//                             <th>Store Name</th>
//                             <th>Description</th>
//                             <th>Phone</th>
//                             <th>Website</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           <tr>
//                             <td>{id}</td>
//                             <td>{title}</td>
//                             <td>{description}</td>
//                             <td>{phone}</td>
//                             <td>{website}</td>
//                             </tr>
//                           <tr></tr>
//                         </tbody>
//                       </Table>
//                       </div>
//                       </div>
//                       </>
//               )
//             }
//         }
//     </div>
//     </div>
//     </>
  

