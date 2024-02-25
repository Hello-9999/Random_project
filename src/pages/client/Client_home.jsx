import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../service/login_Server";

const Client_home = () => {
  // const response = await getDocs(collection(db, "event"));
  //   seteventdata(response.docs);
  const [client_event, setclient_event] = useState([]);

  const Client_data = async () => {
    const data = await getDocs(collection(db, "event"));
    // console.log(db.type,'db')
    console.log(data.docs);
    setclient_event(data.docs);
  };

  useEffect(() => {
    Client_data();
    client_event;
  }, []);

  //   console.log(client_e)

  const data = client_event.map((e) => {
    // console.log(e.data(), "er");
  });
  return (
    <div className="client_home_container">
      <div className="container">
        {client_event.map((e) => {
          const event_data = e.data();

          console.log(event_data);

          return (
            <div className="client_event_container">
              <h3>{event_data.title}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Client_home;
