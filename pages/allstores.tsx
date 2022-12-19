import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Router from "next/router";
import Loader from "components/Loader";

export default function Allstores() {
  const [mydata, setMydata] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    axios
      .get("api/allstores")
      .then((res: any) => {
        console.log(res.data);
        setMydata(res.data);
        setLoading(false);
      })
      .catch(() => {
        Router.push("/signupandlogin");
        setLoading(false);
      });
  }, []);

  const signupandloginpage = () => {
    Router.push("/signupandlogin");
  };

  return (
    <div>
      {loading ? (
      
      <Loader/>

      ) : (
        <div>
          <div className="flex justify-center p-2 sm:justify-end md:justify-end lg:justify-end xl:justify-end 2xl:justify-end">
            <button
              className=" edge rounded-lg border-2"
              onClick={signupandloginpage}
            >
              Login
            </button>
          </div>

          <div>
            <p className="pl-3 text-lg font-thin underline decoration-dotted">
              All Stores
            </p>
          </div>

          {/* improve responsive - hydration error - Doubt*/}
          <div className="p-2 flex items-center justify-center container">
            <table className="table-auto text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
              <thead>
                <th className="border">Store Id</th>
                <th className="border">Store Name</th>
                <th className="border">Description</th>
                <th className="border">Phone</th>
                <th className="border">Website</th>
              </thead>

              <tbody>
                {mydata.map((list: any, index: any) => (
                  <tr key={list.id}>
                    <td className="border">{list.id}</td>
                    <td className="border">{list.title}</td>
                    <td className="border">{list.description}</td>
                    <td className="border">{list.phone}</td>
                    <td className="border">{list.website}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

//  <table className="table-auto text-xs border-separate border-spacing-2 border border-slate-400 sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl ">
