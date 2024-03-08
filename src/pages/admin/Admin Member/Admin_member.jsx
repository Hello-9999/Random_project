import React, { useEffect, useState } from "react";
import Admin_Navbar from "../Admin_Navbar";
import {
  doc,
  setDoc,
  addDoc,
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  // uploadBytes,
} from "firebase/firestore";
import { db, storage } from "../../../service/login_Server";
import { useNavigate, useLocation } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Admin_editmember from "./Admin_editmember";
import FacebookIcon from "@mui/icons-material/Facebook";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Button from "@mui/material/Button";

const Admin_member = () => {
  const member_st =
    "bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium xl:text-base";

  const navigate = useNavigate();
  const [memberdata, setmemberdata] = useState([]);
  const [duplimemberdata, setduplimemberdata] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [editMemberName, setEditMemberName] = useState();
  const [editMemberRole, setEditMemberRole] = useState();
  const [editMemberImg, setEditMemberImg] = useState();
  const [editMemberFbLink, setEditMemberFbLink] = useState();
  const [editMemberLinLink, setEditMemberLinLink] = useState();
  const [editId, setEditId] = useState();

  const addMember = (e) => {
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
    const memberDetail = { details: data.data(), ID: data.id };
    return memberDetail;
  });

  console.log(member_data, "erer");

  const handlerEdit = (name, img, role, fb, lind, id) => {
    setEditModal(true);
    setEditMemberName(name);
    setEditMemberImg(img);
    setEditMemberRole(role);
    setEditMemberFbLink(fb);
    setEditMemberLinLink(lind);
    setEditId(id);
  };

  const editMember = async (e) => {
    e.preventDefault();

    if (typeof editMemberImg === "string") {
      const docRef = doc(db, "member", editId);

      try {
        await updateDoc(docRef, {
          member_name: editMemberName,
          member_role: editMemberRole,
          member_facebook_link: editMemberFbLink,
          member_linkdein_link: editMemberLinLink,
          member_img: editMemberImg,
        });

        setEditModal(false);
        Memberdata();
        console.log("Updated Sucess !! ");
      } catch (error) {
        console.log(error, "error");
      }
    } else {
      const Storageref = ref(storage, `membersprofile/${editId}`);
      const docRef = doc(db, "member", editId);
      await uploadBytes(Storageref, editMemberImg).then((img_data) => {
        getDownloadURL(img_data.ref).then((url) => {
          if (url) {
            updateDoc(docRef, {
              member_name: editMemberName,
              member_role: editMemberRole,
              member_facebook_link: editMemberFbLink,
              member_linkdein_link: editMemberLinLink,
              member_img: url,
            });
            console.log(" member  is added succesfully in your database");
            setEditModal(false);
            Memberdata();
          }
        });
      });
    }
    try {
    } catch (error) {}
  };

  const deleteHandler = async (id) => {
    try {
      await deleteDoc(doc(db, "member", id));
      alert("Member Deleted success");
      Memberdata();
    } catch (error) {
      console.log(error);
      alert("error");
    }
  };

  useEffect(() => {
    Memberdata();
  }, []);

  return (
    <div className="bg-slate-300 h-screen overflow-auto">
      <Admin_Navbar member_st={member_st} />
      <div className="Admin_member_container  ">
        <div className="Admin_member_title text-center mt-6">
          <h1> Member</h1>
        </div>
        <div className="Admin_member_body container p-4 sm:p-8 md:p-10 lg:p-20 mx-auto ">
          <div className="member-btn text-end mb-5 container">
            <Button
              variant="contained"
              onClick={addMember}
              className=" mr-4 capitalize"
            >
              {" "}
              Add member
            </Button>
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
                  <TableBody key={"member"}>
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
                            {e.details.member_name}{" "}
                          </TableCell>
                          <TableCell style={{ textAlign: "center" }}>
                            {" "}
                            <img
                              src={e.details.member_img}
                              alt=""
                              className="w-40 m-auto"
                            />
                          </TableCell>
                          <TableCell style={{ textAlign: "center" }}>
                            {" "}
                            {e.details.member_role}
                          </TableCell>
                          <TableCell style={{ textAlign: "center" }}>
                            {" "}
                            <div className="flex flex-wrap align-middle gap-2 text-red-100">
                              <button style={{ margin: "auto" }}>
                                <a
                                  // href={"https://www.youtube.com/"}

                                  href={e.details.member_facebook_link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <FacebookIcon />{" "}
                                </a>
                              </button>

                              <button style={{ margin: "auto" }}>
                                <a
                                  href={e.details.member_linkdein_link}
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
                              <button
                                style={{ margin: "auto" }}
                                onClick={() =>
                                  handlerEdit(
                                    e.details.member_name,
                                    e.details.member_img,
                                    e.details.member_role,
                                    e.details.member_facebook_link,
                                    e.details.member_linkdein_link,
                                    e.ID
                                  )
                                }
                              >
                                Edit
                              </button>
                              <button
                                style={{ margin: "auto" }}
                                onClick={() => deleteHandler(e.ID)}
                              >
                                delete
                              </button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>

                  <Admin_editmember
                    editModal={editModal}
                    setEdit={setEditModal}
                    editName={editMemberName}
                    editImg={editMemberImg}
                    editRole={editMemberRole}
                    editFb={editMemberFbLink}
                    editLind={editMemberLinLink}
                    seteditName={setEditMemberName}
                    seteditImg={setEditMemberImg}
                    seteditRole={setEditMemberRole}
                    seteditFb={setEditMemberFbLink}
                    seteditLind={setEditMemberLinLink}
                    updateMember={editMember}
                  />
                </TableContainer>
              </Paper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin_member;
