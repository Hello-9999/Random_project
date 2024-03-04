import React, { useEffect, useState } from "react";
import Admin_Navbar from "./Admin_Navbar";
import {
  doc,
  setDoc,
  addDoc,
  collection,
  // uploadBytes,
} from "firebase/firestore";
import { database, db, storage } from "../../service/login_Server";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import {
  getDownloadURL,
  ref,
  ref as storageRef,
  uploadBytes,
  // uploadImageToStorage,
} from "firebase/storage";
// import { v4 } from "uuid";
import { v4 } from "uuid";
const Admin_addmember = () => {
  const [title, settitle] = useState("");
  const [type, settype] = useState("");
  const [describe, setdescribe] = useState("");
  const [location, setlocation] = useState("");
  const [date, setdate] = useState("");
  const [time, settime] = useState("");
  const [data, setdata] = useState();
  const [event_poster, setevent_poster] = useState();

  const [imgdata, setimgdata] = useState("");
  const navigate = useNavigate();

  // const llocation = useLocation();
  // const { from } = llocation.state || { from: "/" };

  // console.log("Coming from:", from);

  const hadler_add = async (e) => {
    e.preventDefault();

    const data = {
      event_title: title,
      event_type: type,
      event_describe: describe,
      event_location: location,
      event_date: date,
      event_time: time,
      event_poster: event_poster.toString(),
    };

    try {
      const event_data = await addDoc(collection(db, "event"), data);
      alert(" Event is added succesfully in your database");
      navigate("/admin_event");
      console.log(event_data, "er");
    } catch (error) {
      console.log(error, "error event");
    }
  };

  useEffect(() => {
    // hadler_add();
    // data()
  }, []);

  return (
    <div className="add_event_container bg-slate-300 h-screen overflow-auto">
      <Admin_Navbar />
      <div className="add_event text-black mb-3">
        <h2 className="font-bold text-3xl text-center mt-4"> Add Member</h2>

        <div className="form w-11/12 bg-slate-400 mt-5  pb-5 m-auto p-4 md:w-10/12 lg:8/12 xl:w-7/12">
          <form action="" onSubmit={hadler_add}>
            <div className="xl:flex xl:gap-4 xl:items-center xl:mt-0">
              <div className="event-title mt-6 w-full m-auto md:10/12">
                <TextField
                  id="outlined-basic"
                  type="text"
                  label="Name"
                  placeholder="name"
                  className=" h-12 p-5 text-xl text-cyan-100 w-full "
                  onChange={(e) => settitle(e.target.value)}
                  required
                  variant="filled"
                />
              </div>
              <div className="event-type   mt-6 w-full  m-auto">
                <TextField
                  type="text"
                  label="Role"
                  placeholder="ROle"
                  className=" h-12 p-5 text-xl text-cyan-100 w-full"
                  onChange={(e) => settype(e.target.value)}
                  required
                  variant="filled"
                />
              </div>
            </div>

            <div className="event-describe mt-6 xl:mt-8  w-full  m-auto">
              <TextField
                className="p-5 text-xl text-cyan-100 w-full"
                onChange={(e) => setdescribe(e.target.value)}
                minLength={10}
                required
                placeholder=" Add event detail"
                multiline
                maxRows={15}
                variant="filled"
                label="Description
                "
              />
            </div>

            <div className="event-location md:flex md:items-center gap-5 mt-6 lg:flex w-full m-auto">
              <div className="location_input md:w-6/12 lg:m-auto lg:w-4/5">
                <TextField
                  type="text"
                  placeholder="Event venue"
                  className=" h-12 p-5 text-xl text-cyan-100 w-full"
                  onChange={(e) => setlocation(e.target.value)}
                  required
                  variant="filled"
                  label="Location"
                />
              </div>

              <div className="template mt-5 lg:mt-0 md:mt-0 lg:m-auto lg:w-4/5 sm:flex sm:items-center sm:mt-6 sm:gap-3 sm:m-auto">
                <label htmlFor="event_poster">
                  {" "}
                  <h2 className="text-xl mb-2"> profile Photo :</h2>
                </label>

                <TextField
                  type="file"
                  // name=""
                  id="event_poster"
                  accept="image/png,image/jpeg"
                  className="text-lg w-full sm:w-6/12 sm:m-auto"
                  onChange={(e) => setevent_poster(e.target.files[0])}
                  // variant="filled"
                />
              </div>
            </div>

            <div className="event-date  gap-5 mb-5 mt-6 md:flex w-full  m-auto">
              <div className="md:w-6/12">
                <TextField
                  type="date"
                  placeholder="Event date"
                  className=" h-12 p-5 text-xl text-cyan-100 w-full md:w-full"
                  onChange={(e) => setdate(e.target.value)}
                  required
                  variant="filled"
                />
              </div>

              <div className="mt-6 md:mt-0  md:w-6/12">
                <TextField
                  type="time"
                  placeholder="Event time"
                  className=" h-12 p-5 text-xl  text-cyan-100 w-full  md:w-full sm:mb-6"
                  onChange={(e) => settime(e.target.value)}
                  required
                  variant="filled"
                  // label="time"
                />
              </div>
            </div>

            <div className="event-time  w-full sm:m-auto">
              <button
                className="bg-blue-600 text-white w-full sm:w-8/12"
                type="submit"
              >
                {" "}
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Admin_addmember;