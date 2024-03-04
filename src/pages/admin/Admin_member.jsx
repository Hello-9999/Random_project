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
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
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
  const [eventdata, seteventdata] = useState([]);

  const addEvent = (e) => {
    e.preventDefault();
    navigate("/admin_member/addmember");
  };

  const Eventdata = async () => {
    try {
      const response = await getDocs(collection(db, "event"));
      seteventdata(response.docs);
    } catch (error) {
      console.log(error);
    }

    // console.log(response);
  };

  const TableHeadroe = [" name", "sn", "oic"];
  useEffect(() => {
    Eventdata();
  }, []);

  useEffect(() => {}, [eventdata]);
  return (
    <div className="bg-slate-300 h-screen overflow-auto">
      {" "}
      <Admin_Navbar member_st={member_st} />
      <div className="Admin_member_container  ">
        <div className="Admin_member_title text-center mt-6">
          <h1> member</h1>
        </div>
        <div className="Admin_member_body container m-auto mt-5">
          <div className="member-btn text-end mb-5 container">
            <button onClick={addEvent} className=" mr-4">
              {" "}
              Add member
            </button>
          </div>

          <div className="h-full">
            <div className="Admin_member_body_container p-8   ">
              <div className="member_data flex gap-6 flex-wrap w-full sm:w-4/5 sm:m-auto  lg:m-0 lg:flex-nowrap lg:w-2/4">
                {eventdata.map((e_data) => {
                  const event_data = e_data.data();
                  console.log(event_data, "poster");

                  return (
                    <div className="member_box 	w-full">
                      {console.log(event_data, "e")}{" "}
                      <Box sx={{ minWidth: 275 }}>
                        <Card className="">
                          <div className="img ">
                            <img
                              className="w-full"
                              src="data:image/jpeg;base64,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"
                              alt=""
                            />
                          </div>
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                              className="title"
                            >
                              {event_data.event_title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {/* {event_data.event_describe.length < 10 ? event_data.event_describe : '...' } */}
                              {event_data.event_describe}
                            </Typography>
                          </CardContent>
                          <CardActions>
                            <Button size="small" variant="contained">
                              Delete
                            </Button>
                            <Button size="small" variant="contained">
                              Edit
                            </Button>
                          </CardActions>
                        </Card>
                      </Box>
                    </div>
                  );
                })}
              </div>
            </div>
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
              <TableContainer sx={{ maxHeight: 440 }}>
                <TableHead>
                  <TableRow>sdadasd</TableRow>
                  <TableRow>{TableHeadroe.map((h)=>{

                    h.name
                  })}</TableRow>
                </TableHead>
              </TableContainer>
            </Paper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin_member;