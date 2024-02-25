import React, { useEffect, useState } from "react";
import { doc, setDoc, getDocs, collection } from "firebase/firestore";
import { db } from "../service/login_Server";
import { TextField, Button } from "@mui/material";
import Admin_Navbar from "./Admin_Navbar";
import { useNavigate } from "react-router-dom";
import EmojiEventsTwoToneIcon from "@mui/icons-material/EmojiEventsTwoTone";
import PersonPinTwoToneIcon from "@mui/icons-material/PersonPinTwoTone";
import AutoStoriesTwoToneIcon from "@mui/icons-material/AutoStoriesTwoTone";
const Admin_home = () => {
  const [name, setname] = useState("");
  const [age, setage] = useState("");
  const [role, setrole] = useState("");
  const [eventdata, seteventdata] = useState([]);
  const [evenstdata, setevenstdata] = useState([]);
  const navigate = useNavigate();
  const submit_handler = async (e) => {
    e.preventDefault();

    // const data = {
    //   name: name,
    //   age: age,
    //   role: role,
    // };

    const data = await setDoc(doc(db, "event", "data"), {
      name: name,
      age: age,
      role: role,
    });

    console.log(data);
  };
  const addEvent = (e) => {
    e.preventDefault();
    navigate("/admin_addevent");
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
  }, [eventdata]);

  return (
    <div className="admin_container bg-slate-300 h-screen ">
      <Admin_Navbar />

      <div className="admin_home_container container p-7 mx-auto">
        <div className="amin_box text-black bg-slate-100 mt-2 p-5 lg:w-9/12 m-auto">
          <div className="event_body mt-3  gap-6  sm:flex  sm:flex-wrap  ">
            <div className="total_event flex gap-3 md:2/4  items-center mt-5 sm:mt-0 m-auto w-9/12 sm:w-1/4">
              <div className="event_logo">
                <EmojiEventsTwoToneIcon className="!size-12  lg:!size-16 md:!size-14 !text-orange-400" />{" "}
              </div>
              <div className="total">
                <div className="total_title">
                  <h5 className="text-xl md:2xl">Event</h5>
                </div>
                <div className="total_num ">
                  <h2 className=" font-semibold text-4xl md:text-5xl ">12</h2>{" "}
                </div>
              </div>
            </div>

            <div className="total_member flex items-center gap-3  md:2/4 mt-5 sm:mt-0 m-auto w-9/12 sm:w-1/4">
              <div className="member_logo">
                <PersonPinTwoToneIcon className="!size-12  lg:!size-16 md:!size-14 !text-blue-400" />
              </div>
              <div className="member">
                <div className="member_title">
                  <h5 className="text-xl md:2xl  ">Member</h5>
                </div>
                <div className=" font-semibold text-4xl md:text-5xl">
                  <h2>12</h2>{" "}
                </div>
              </div>
            </div>

            <div className="total_Blogs flex gap-3  md:2/4 mt-5 sm:mt-0 m-auto w-9/12 sm:w-1/4">
              <div className="Blogs_logo">
                <AutoStoriesTwoToneIcon className="!size-12  lg:!size-16 md:!size-14 !text-green-400" />
              </div>
              <div className="Blogs">
                <div className="Blogs_title">
                  <h5 className="text-xl md:2xl">Blogs</h5>
                </div>
                <div className="font-semibold text-4xl md:text-5xl">
                  <h2>12</h2>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* blogs */}
        {/* member  */}
        {/* event */}
        {/* gallery */}
        <div className="event_member_container flex gap-6 mt-6 m-auto">


          <div className="event_container bg-slate-400 w-3/5">
            <h4>event</h4>
          </div>

          <div className="member_container bg-slate-700 w-1/4">
            <h4>member</h4>
          </div>


        </div>
        {/* <div className="deatail pt-5">
          <div className="event_container">
            <div className="event-btn">
              <button onClick={addEvent}> Add Event</button>
            </div>

            <div className="event_data flex gap-6">
              {eventdata.map((e_data) => {
                const event_data = e_data.data();

                console.log(event_data);
                return (
                  <div className="event_box mt-3 bg-black w-3/5">
                    <div class=" rounded overflow-hidden shadow-lg  ">
                      <img
                        class="w-full"
                        src="/img/card-top.jpg"
                        alt="Sunset in the mountains"
                      />
                      <div class="px-6 py-4">
                        <div class="font-bold text-xl mb-2">
                          {event_data.title}{" "}
                        </div>
                        <p class="text-gray-700 text-base">
                          {event_data.describe}
                        </p>
                      </div>
                      <div class="px-6 pt-4 pb-2 btn flex">
                        <button class="inline-block bg-red-500 rounded-full px-3 py-1 text-sm font-semibold text-white-300 mr-2 mb-2">
                          Delete{" "}
                        </button>

                        <span class="inline-block bg-blue-500 rounded-full px-3 py-1 text-sm font-semibold text-white-700 mr-2 mb-2">
                          Edit{" "}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="event mt-3">
            <button> Add Event</button>
          </div>
          <div className="event mt-3">
            <button> Add Event</button>
          </div>
          <div className="event mt-3">
            <button> Add Event</button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Admin_home;
