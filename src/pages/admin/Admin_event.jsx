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
import { getDownloadURL, getStorage, uploadBytes } from "firebase/storage";

const Admin_event = () => {
  const navigate = useNavigate();
  const [eventdata, seteventdata] = useState([]);
  const [open, setOpen] = useState(false);
  const [editID, seteditID] = useState();

  const [edittitle, setedittitle] = useState();
  const [editimage, setediimage] = useState();
  const [editdescription, setedidescription] = useState();
  const [editlocation, setedilocation] = useState();
  const [edittime, seteditime] = useState();
  const [editdate, setedidate] = useState();
  const [editType, setedittype] = useState();

  const data =
    "bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium xl:text-base";
  const addEvent = (e) => {
    e.preventDefault();
    navigate("/admin_event/addevent");
  };

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

  const Read_more = (e) => {
    e.preventDefault();
  };

  const Edithandler = (id, title, poster, desc, location, time, date, type) => {
    seteditID(id);
    setedittitle(title);
    setediimage(poster);
    setedidescription(desc);
    setedilocation(location);
    seteditime(time);
    setedidate(date);
    setedittype(type);
    setOpen(true);
  };

  const Updatehandler = async (e) => {
    e.preventDefault();

    if (typeof editimage === "string") {
      const docRef = doc(db, "event", editID);

      try {
        await updateDoc(docRef, {
          event_title: edittitle,
          event_type: editType,
          event_describe: editdescription,
          event_location: editlocation,
          event_date: editdate,
          event_time: edittime,
        });

        setOpen(false);
        Eventdata();
        console.log(event, "event");
        console.log("Updated Sucess !! ");
      } catch (error) {
        console.log(error, "error");
      }
    } else {
      const Storageref = ref(storage, `files/${editID}`);
      const docRef = doc(db, "event", editID);

      try {
        await uploadBytes(Storageref, editimage).then((img_data) => {
          getDownloadURL(img_data.ref).then((url) => {
            console.log(url);
            if (url) {
              updateDoc(docRef, {
                event_title: edittitle,
                event_type: editType,
                event_describe: editdescription,
                event_location: editlocation,
                event_date: editdate,
                event_time: edittime,
                event_poster: url,
              });
              console.log(url, "img");
              setOpen(false);
              Eventdata();
              console.log("Update Sucessfully");
            }
          });
        });
      } catch (error) {
        console.log(error, "error image edit");
      }
    }
  };

  console.log(editimage, "image");
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
              <div className="flex justify-between gap-3 m-auto  sm:m-auto  lg:m-0 lg:flex-nowrap  flex-wrap w-full">
                {event.map((event_data) => {
                  return (
                    <div className="event_box w-full md:w-3/4 lg:w-2/5 shadow m-auto">
                      <Admin_editevent
                        title={edittitle}
                        image={editimage}
                        description={editdescription}
                        location={editlocation}
                        time={edittime}
                        date={editdate}
                        type={editType}
                        event_box={open}
                        setevent_box={setOpen}
                        id={editID}
                        set_eventdata={seteventdata}
                        settitle={setedittitle}
                        setimage={setediimage}
                        setdescription={setedidescription}
                        setlocation={setedilocation}
                        settime={seteditime}
                        setdate={setedidate}
                        settype={setedittype}
                        Editbtn={Updatehandler}
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
                            // variant="p"
                            color="text.secondary"
                            id="card_para"
                            style={{ height: "50px", overflow: "hidden" }}
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

                              <h5 className="font-medium capitalize">{event_data.detail.event_location}</h5>
                            </div>

                            <div className="time flex gap-5 align-middle mt-3">
                              <span>
                                <AccessTimeTwoToneIcon />
                              </span>

                              <h5 className="font-medium">
                                {event_data.detail.event_time}
                              </h5>
                            </div>

                            <div className="calender flex gap-5 align-middle mt-3">
                              <span>
                                <CalendarMonthTwoToneIcon
                                  style={{ color: "red" }}
                                />
                              </span>

                              <h5 className="font-medium">
                                {event_data.detail.event_date}
                              </h5>
                            </div>
                            <div className="mt-5 text-center flex gap-6">
                              <Button
                                variant="contained"
                                className=" w-full p-5 sm:w-2/4"
                                onClick={Read_more}
                              >
                                {" "}
                                Read More
                              </Button>

                              <Button
                                variant="contained"
                                className=" w-full p-5 sm:w-2/4"
                                onClick={(e) =>
                                  Edithandler(
                                    event_data.id,
                                    event_data.detail.event_title,
                                    event_data.detail.event_poster,
                                    event_data.detail.event_describe,
                                    event_data.detail.event_location,
                                    event_data.detail.event_time,
                                    event_data.detail.event_date,
                                    event_data.detail.event_type
                                  )
                                }
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
