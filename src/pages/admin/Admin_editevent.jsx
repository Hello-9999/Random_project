import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { db } from "../../service/login_Server";
import {
  doc,
  setDoc,
  getDocs,
  collection,
  deleteDoc,
  updateDoc,
  getDoc,
} from "firebase/firestore";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  color: "black",
  p: 4,
};
const Admin_editevent = ({
  title,
  image,
  description,
  location,
  time,
  date,
  editbutton,
  event_box,
  setevent_box,
  id,
}) => {
  const handleClose = () => setevent_box(false);
  const [edittitle, setedittitle] = useState(title);
  const [editimage, setediimage] = useState(image);
  const [editdescription, setedidescription] = useState(description);
  const [editlocation, setedilocation] = useState(location);
  const [edittime, seteditime] = useState(time);
  const [editdate, setedidate] = useState(date);
  console.log(editimage, "edittitle");

  const Updatehandler = async (e) => {
    e.preventDefault();
    db.collection("users")
      .doc(id)
      .update({
        form_data: {
          event_title: edittitle,
          //   event_type: type,
          event_describe: editdescription,
          event_location: editlocation,
          event_date: editdate,
          event_time: edittime,
          //   event_poster: url,
        },
      })
      .then(function () {
        console.log("Frank food updated");
      });
  };

  useEffect(() => {
    Updatehandler();
  }, []);
  return (
    <div className="">
      <Modal
        open={event_box}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Event{" "}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="img">
              <img src={editimage} alt="" />
            </div>
            <form action="">
              <div className="xl:flex xl:gap-4 xl:items-center xl:mt-0">
                <div className="event-title mt-6 w-full m-auto md:10/12">
                  <TextField
                    id="outlined-basic"
                    type="text"
                    label="Title"
                    placeholder="Add Event Title"
                    className=" h-12 p-5 text-xl text-cyan-100 w-full "
                    onChange={(e) => setedittitle(e.target.value)}
                    variant="filled"
                    value={edittitle}
                    focused
                  />
                </div>
                <div className="event-type   mt-6 w-full  m-auto">
                  <TextField
                    type="text"
                    label="Type"
                    placeholder="Add Event Type"
                    className=" h-12 p-5 text-xl text-cyan-100 w-full"
                    // onChange={(e) => settype(e.target.value)}
                    variant="filled"
                    value={"e"}
                  />
                </div>
              </div>

              <div className="event-describe mt-6 xl:mt-8  w-full  m-auto">
                <TextField
                  className="p-5 text-xl text-cyan-100 w-full"
                  onChange={(e) => setedidescription(e.target.value)}
                  minLength={10}
                  placeholder=" Add event detail"
                  multiline
                  maxRows={15}
                  variant="filled"
                  label="Description"
                  value={editdescription}
                />
              </div>

              <div className="event-location md:flex md:items-center gap-5 mt-6 lg:flex w-full m-auto">
                <div className="location_input md:w-6/12 lg:m-auto lg:w-4/5">
                  <TextField
                    type="text"
                    placeholder="Event venue"
                    className=" h-12 p-5 text-xl text-cyan-100 w-full"
                    onChange={(e) => setedilocation(e.target.value)}
                    variant="filled"
                    label="Location"
                    value={editlocation}
                  />
                </div>

                <div className="template mt-5 lg:mt-0 md:mt-0  lg:m-auto lg:w-4/5  sm:items-center sm:mt-6 sm:gap-3 sm:m-auto">
                  <label htmlFor="event_poster">
                    {" "}
                    <h2 className="text-xl mb-2"> Event Poster :</h2>
                  </label>

                  <TextField
                    type="file"
                    // name=""
                    id="event_poster"
                    accept="image/png,image/jpeg"
                    className="text-lg w-full sm:w-6/12 sm:m-auto"
                    onChange={(e) => setediimage(e.target.files[0])}

                    // variant="filled"
                    // value={image}
                  />
                </div>
              </div>

              <div className="event-date  gap-5 mb-5 mt-6 md:flex w-full  m-auto">
                <div className="md:w-6/12">
                  <TextField
                    type="date"
                    placeholder="Event date"
                    className=" h-12 p-5 text-xl text-cyan-100 w-full md:w-full"
                    onChange={(e) => setedidate(e.target.value)}
                    variant="filled"
                    value={editdate}
                  />
                </div>

                <div className="mt-6 md:mt-0  md:w-6/12">
                  <TextField
                    type="time"
                    placeholder="Event time"
                    className=" h-12 p-5 text-xl  text-cyan-100 w-full  md:w-full sm:mb-6"
                    onChange={(e) => seteditime(e.target.value)}
                    variant="filled"
                    // label="time"

                    value={edittime}
                  />
                </div>
              </div>

              <div className="event-time  w-full sm:m-auto m-auto">
                <button
                  className="bg-blue-600 text-white w-full sm:w-8/12"
                  type="submit"
                  onClick={Updatehandler}
                >
                  {" "}
                  Edit
                </button>
              </div>
            </form>{" "}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default Admin_editevent;
