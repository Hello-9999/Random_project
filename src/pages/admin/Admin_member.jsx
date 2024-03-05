import React, { useEffect, useState } from "react";
import Admin_Navbar from "./Admin_Navbar";
import {
  doc,
  setDoc,
  addDoc,
  collection,
  getDocs,
  // uploadBytes,
} from "firebase/firestore";
import { db } from "../../service/login_Server";
import { useNavigate, useLocation } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

const Admin_member = () => {
  const member_st =
    "bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium xl:text-base";

  const navigate = useNavigate();
  const [memberdata, setmemberdata] = useState([]);
  const [duplimemberdata, setduplimemberdata] = useState([]);

  const addEvent = (e) => {
    e.preventDefault();
    navigate("/admin_member/addmember");
  };

  const Memberdata = async () => {
    try {
      const response = await getDocs(collection(db, "member"));
      setmemberdata(response.docs);
    } catch (error) {
      console.log(error);
    }

    // console.log(response);
  };

  const member_data = memberdata.map((data) => {
    return data.data();
  });

  useEffect(() => {
    Memberdata();
  }, []);

  useEffect(() => {}, []);
  return (
    <div className="bg-slate-300 h-screen overflow-auto">
      {" "}
      <Admin_Navbar member_st={member_st} />
      <div className="Admin_member_container  ">
        <div className="Admin_member_title text-center mt-6">
          <h1> member</h1>
        </div>
        <div className="Admin_member_body container p-4 sm:p-8 md:p-10 lg:p-20 mx-auto mt-5">
          <div className="member-btn text-end mb-5 container">
            <button onClick={addEvent} className=" mr-4">
              {" "}
              Add member
            </button>
          </div>

          <div className="h-full">
            <div className="member_data ">
              <Paper>
                <TableContainer sx={{}} className="">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        className="  !font-semibold"
                        style={{ textAlign: "center", width: "10%" }}
                      >
                        S.N
                      </TableCell>
                      <TableCell
                        className="  !font-semibold"
                        style={{ width: "300px", textAlign: "center" }}
                      >
                        Name
                      </TableCell>
                      <TableCell
                        className="  !font-semibold"
                        style={{ textAlign: "center", width: "25%" }}
                      >
                        Image
                      </TableCell>
                      <TableCell
                        className="  !font-semibold"
                        style={{ textAlign: "center", width: "15%" }}
                      >
                        Role
                      </TableCell>
                      <TableCell
                        className="  !font-semibold"
                        style={{ textAlign: "center", width: "20%" }}
                      >
                        Media Link
                      </TableCell>
                      <TableCell
                        className="  !font-semibold"
                        style={{ textAlign: "center", width: "20%" }}
                      >
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {member_data.map((e, index) => {
                      const Sn = index + 1;
                      return (
                        <TableRow>
                          <TableCell style={{ textAlign: "center" }}>
                            {" "}
                            {Sn}{" "}
                          </TableCell>
                          <TableCell style={{ textAlign: "center" }}>
                            {" "}
                            {e.member_name}{" "}
                          </TableCell>
                          <TableCell style={{ textAlign: "center" }}>
                            {" "}
                            <img
                              src={e.member_img}
                              alt=""
                              className="w-40 m-auto"
                            />
                          </TableCell>
                          <TableCell style={{ textAlign: "center" }}>
                            {" "}
                            {e.member_role}
                          </TableCell>
                          <TableCell style={{ textAlign: "center" }}>
                            {" "}
                            <div className="flex flex-wrap align-middle gap-2 text-red-100">
                              <button style={{ margin: "auto" }}>
                                <a
                                  href={e.member_facebook_link}
                                  target="_blank"
                                >
                                  {" "}
                                  Facebook{" "}
                                </a>
                              </button>
                              <button style={{ margin: "auto" }}>
                                <a
                                  href={e.member_linkdein_link}
                                  target="_blank"
                                >
                                  {" "}
                                  Linkdein{" "}
                                </a>
                              </button>
                            </div>
                          </TableCell>
                          <TableCell style={{ textAlign: "center" }}>
                            {" "}
                            <div className="flex gap-2  flex-wrap align-middle text-red-100">
                              <button style={{ margin: "auto" }}>Edit</button>
                              <button style={{ margin: "auto" }}>delete</button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </TableContainer>
                {/* </div> */}
              </Paper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin_member;
