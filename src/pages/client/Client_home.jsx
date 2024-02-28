import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../service/login_Server";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
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
      <div className="container m-auto">
        <div className="flex gap-5">
          {client_event.map((e) => {
            const event_data = e.data();

            console.log(event_data);

            return (
              <div className="client_event_container w-100 ">
                <Card className="">
                  {/* <CardMedia  src="" title="green iguana" />{" "} */}
                  <div className="img">
                    {" "}
                    <img
                      src="https://meetings.skift.com/wp-content/uploads/2023/11/a-group-of-diverse-professionals-in-a-high-tech-environment-brainstorming-and-discussing-around-a-futuristic-display-of-advanced-event-technology.jpg"
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
                      {event_data.event_describe}
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Client_home;
