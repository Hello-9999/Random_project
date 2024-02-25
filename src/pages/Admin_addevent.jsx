import React, { useEffect, useState } from "react";
import Admin_Navbar from "./Admin_Navbar";
import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import { db } from "../service/login_Server";
import { useNavigate } from "react-router-dom";

const Admin_addevent = () => {
  const [title, settitle] = useState("");
  const [type, settype] = useState("");
  const [describe, setdescribe] = useState("");
  const [location, setlocation] = useState("");
  const [date, setdate] = useState("");
  const [time, settime] = useState("");
  const [data, setdata] = useState();
  const navigate = useNavigate();

  const hadler_add = async (e) => {
    e.preventDefault();

    try {
      const event_data = await addDoc(collection(db, "event"), {
        title: title,
        type: type,
        describe: describe,

        location: location,
        date: date,
        time: time,
      });
      alert(" Event is added succesfully in your database");
      // console.log(event_data, "event data ");
      navigate('/adminhome')
    } catch (error) {
      console.log(error, "error event");
    }
  };

  // useEffect(() => {
  //   // hadler_add()
  // }, [data]);

  return (
    <div className="add_event_container bg-slate-300 h-screen">
      <Admin_Navbar />
      <div className="add_event text-black">
        <h2 className="font-bold text-3xl text-center mt-4"> Add Event</h2>
        <div className="form w-2/3 bg-slate-500 mt-5 m-auto p-4">
          <form action="" onSubmit={hadler_add}>
            <div className="event-title mt-4 w-4/5 m-auto ">
              <input
                type="text"
                placeholder="Event Title"
                className=" h-12 p-5 text-xl text-cyan-100 w-full"
                onChange={(e) => settitle(e.target.value)}
              />
            </div>

            <div className="event-type   mt-6  w-4/5 m-auto">
              <input
                type="text"
                placeholder="Event Type"
                className=" h-12 p-5 text-xl text-cyan-100 w-full"
                onChange={(e) => settype(e.target.value)}
              />
            </div>

            <div className="event-describe mt-6  w-4/5 m-auto">
              {/* <input
                type="text"
                placeholder="Event describe"
                className=" h-12 p-5 text-xl text-cyan-100 w-full"
              /> */}
              <textarea
                name=""
                id=""
                placeholder="Event describe"
                cols="20"
                rows="5"
                className="p-5 text-xl text-cyan-100 w-full"
                onChange={(e) => setdescribe(e.target.value)}
              ></textarea>
            </div>

            <div className="event-location  mt-6  w-4/5 m-auto">
              <input
                type="text"
                placeholder="Event location"
                className=" h-12 p-5 text-xl text-cyan-100 w-full"
                onChange={(e) => setlocation(e.target.value)}
              />
            </div>

            <div className="event-date flex gap-5  mt-6  w-4/5 m-auto">
              <input
                type="date"
                placeholder="Event date"
                className=" h-12 p-5 text-xl text-cyan-100 w-full"
                onChange={(e) => setdate(e.target.value)}
              />

              <input
                type="time"
                placeholder="Event time"
                className=" h-12 p-5 text-xl text-cyan-100 w-full"
                onChange={(e) => settime(e.target.value)}
              />
            </div>
            <div className="event-time  mt-6 mb-6  w-4/5 m-auto">
              <button className="bg-blue-600 text-white w-full" type="submit">
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

export default Admin_addevent;
