import React from "react";
import { useEffect, useState } from "react";

import Admin_Navbar from "./Admin_Navbar";
import { useNavigate, useLocation } from "react-router-dom";
import { doc, setDoc, getDocs, collection } from "firebase/firestore";
import { db } from "../../service/login_Server";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import LocationOnTwoToneIcon from "@mui/icons-material/LocationOnTwoTone";
import AccessTimeTwoToneIcon from "@mui/icons-material/AccessTimeTwoTone";
import CalendarMonthTwoToneIcon from "@mui/icons-material/CalendarMonthTwoTone";
const Admin_event = () => {
  const navigate = useNavigate();
  const [eventdata, seteventdata] = useState([]);

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
  useEffect(() => {
    Eventdata();
  }, []);

  useEffect(() => {}, [eventdata]);
  return (
    <div className="bg-slate-300 h-screen overflow-auto">
      {" "}
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

          <div className="h-full">
            <div className="Admin_event_body_container p-8   ">
              {/* event_data flex gap-6   */}
              <div className="flex justify-between gap-6   sm:m-auto  lg:m-0 lg:flex-nowrap  flex-wrap w-full">
                {eventdata.map((e_data) => {
                  const event_data = e_data.data();

                  return (
                    <div className="event_box w-full md:w-2/4 shadow">
                      {console.log(event_data, "e")}{" "}
                      <Card>
                        <div className="img ">
                          <img
                            src={event_data.event_poster}
                            alt=""
                            style={{ width: "100%" }}
                            className="object-fit h-96 w-96"
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
                            {event_data.event_title}
                          </Typography>{" "}
                          <Typography variant="body2" color="text.secondary">
                            {event_data.event_describe}
                          </Typography>
                          <div className="details mt-3">
                            <div className="location flex gap-5 align-middle">
                              <span >
                                <LocationOnTwoToneIcon className="!text-3xl" />
                              </span>

                              <h5>{event_data.event_location}</h5>
                            </div>

                            <div className="time flex gap-5 align-middle mt-3">
                              <span>
                                <AccessTimeTwoToneIcon />
                              </span>

                              <h5>{event_data.event_time}</h5>
                            </div>

                            <div className="calender flex gap-5 align-middle mt-3">
                              <span>
                                <CalendarMonthTwoToneIcon />
                              </span>

                              <h5>{event_data.event_date}</h5>
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
