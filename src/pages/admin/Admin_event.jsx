import React from "react";
import { useEffect, useState } from "react";

import Admin_Navbar from "./Admin_Navbar";
import { useNavigate, useLocation } from "react-router-dom";
import {
  doc,
  setDoc,
  getDocs,
  collection,
  deleteDoc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { db, storage } from "../../service/login_Server";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import LocationOnTwoToneIcon from "@mui/icons-material/LocationOnTwoTone";
import AccessTimeTwoToneIcon from "@mui/icons-material/AccessTimeTwoTone";
import CalendarMonthTwoToneIcon from "@mui/icons-material/CalendarMonthTwoTone";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import { ref } from "firebase/storage";
import Admin_editevent from "./Admin_editevent";
const Admin_event = () => {
  const navigate = useNavigate();
  const [eventdata, seteventdata] = useState([]);
  const [open, setOpen] = useState(false);
  const [editID, seteditID] = useState();

  // export const []

  const data =
    "bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium xl:text-base";
  const addEvent = (e) => {
    e.preventDefault();
    navigate("/admin_event/addevent");
  };
  //   const route = withRouter
  //   console.log( route,'er')

  const time = () => {
    const value = time();

    console.log(value, "time");
    // if ( value > 12){

    //   console.log('am')

    // }else{

    // }
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



  const event = eventdata.map((data) => {
    const event_detailhandler = { detail: data.data(), id: data.id };

    return event_detailhandler;
  });

  const Deletehandler = async (id) => {
    try {
      await deleteDoc(doc(db, "event", id));
      alert("Event Deleted success");
      Eventdata();
    } catch (error) {
      console.log(error);
      alert("error");
    }
  };

  useEffect(() => {
    Eventdata();
  }, []);

  return (
    <div className="bg-slate-300 h-screen overflow-auto">
      <Admin_Navbar event={data} />
      <div className="Admin_event_container  ">
        <div className="Admin_event_title text-center mt-6">
          <h1> Event</h1>
        </div>
        <div className="Admin_event_body container m-auto mt-5">
          <div className="event-btn text-end mb-5 container">
            <button onClick={addEvent} className=" mr-4">
              {" "}
              Add Event
            </button>
          </div>

          <div className="h-full container">
            <div className="Admin_event_body_container p-8 container">
              {/* event_data flex gap-6   */}
              <div className="flex justify-between gap-3 m-auto  sm:m-auto  lg:m-0 lg:flex-nowrap  flex-wrap w-full">
                {event.map((event_data) => {
                  console.log(event_data, "deteail");
                  return (
                    <div className="event_box w-full md:w-3/4 lg:w-2/5 shadow m-auto">
                      {/* {console.log(event_data, "e")}{" "} */}
                      <Admin_editevent
                        title={event_data.detail.event_title}
                        image={event_data.detail.event_poster}
                        description={event_data.detail.event_describe}
                        location={event_data.detail.event_location}
                        time={event_data.detail.event_time}
                        date={event_data.detail.event_date}
                        // editbutton={Updatehandler}
                        event_box={open}
                        setevent_box={setOpen}
                        id ={editID}
                      />
                      <Card>
                        <div className="img ">
                          <img
                            src={event_data.detail.event_poster}
                            alt=""
                            style={{ width: "100%" }}
                            className="object-fit lg:h-96 w-96"
                          />
                        </div>
                        <CardContent>
                          <Typography
                            gutterBottom
                            variant="h5"
                            component="div"
                            className="title"
                            style={{ textTransform: "capitalize" }}
                          >
                            {event_data.detail.event_title}
                          </Typography>{" "}
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            style={{ height: "55px", overflow: "hidden" }}
                          >
                            {event_data.detail.event_describe}
                          </Typography>
                          <div className="details mt-3">
                            <div className="location flex gap-5 align-middle">
                              <span>
                                <LocationOnTwoToneIcon
                                  className="!text-3xl"
                                  style={{ color: "darkgreen" }}
                                />
                              </span>

                              <h5>{event_data.detail.event_location}</h5>
                            </div>

                            <div className="time flex gap-5 align-middle mt-3">
                              <span>
                                <AccessTimeTwoToneIcon />
                              </span>

                              <h5>{event_data.detail.event_time}</h5>
                            </div>

                            <div className="calender flex gap-5 align-middle mt-3">
                              <span>
                                <CalendarMonthTwoToneIcon
                                  style={{ color: "red" }}
                                />
                              </span>

                              <h5>{event_data.detail.event_date}</h5>
                            </div>
                            <div className="mt-5 text-center flex gap-6">
                              <Button
                                variant="contained"
                                className=" w-full p-5 sm:w-2/4"
                                onClick={(e) => Read_more(event_data)}
                              >
                                {" "}
                                Read More
                              </Button>

                              <Button
                                variant="contained"
                                className=" w-full p-5 sm:w-2/4"
                                onClick={(e) => Edithandler(event_data.id)}
                              >
                                {" "}
                                <EditTwoToneIcon />{" "}
                              </Button>

                              <Button
                                variant="contained"
                                className=" w-full p-5 sm:w-2/4"
                                color="error"
                                onClick={() => Deletehandler(event_data.id)}
                              >
                                {" "}
                                <DeleteTwoToneIcon />{" "}
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin_event;
