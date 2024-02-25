import React, { useEffect, useState } from "react";
import { doc, setDoc, getDocs, collection } from "firebase/firestore";
import { db } from "../service/login_Server";
import { TextField, Button } from "@mui/material";
import Admin_Navbar from "./Admin_Navbar";
import { useNavigate } from "react-router-dom";
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
    <div className="admin_home_container bg-slate-300 h-screen">
      <Admin_Navbar />
      <div className="deatail pt-5">
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
      </div>
      {/* <TextField /> */}

      {/* <div className="event">
        <Button className="primary"> Add Event</Button>
      </div> */}

      {/* <div className="form">
        
        <form action="" onSubmit={submit_handler}>
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => setname(e.target.value)}
          />
          <br />
          <br />
          <input
            type="number"
            placeholder="age"
            onChange={(e) => setage(e.target.value)}
          />
          <br />
          <br />
          <input
            type="text"
            name=""
            id=""
            placeholder="role"
            onChange={(e) => setrole(e.target.value)}
          />

          <br />
          <br />
          <button type="submit"> submit</button>
        </form>
      </div> */}
    </div>
  );
};

export default Admin_home;
