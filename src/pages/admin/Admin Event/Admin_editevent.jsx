import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 550,
  height: "100vh",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  color: "black",
  p: 4,
  overflow: "auto",
};
const Admin_editevent = ({
  title,
  image,
  description,
  location,
  time,
  date,
  type,
  event_box,
  setevent_box,
  settitle,
  setimage,
  setdescription,
  setlocation,
  settime,
  setdate,
  settype,
  Editbtn,
}) => {
  const handleClose = () => setevent_box(false);
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
              <img src={image} alt="" />
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
                    onChange={(e) => settitle(e.target.value)}
                    variant="filled"
                    value={title}
                    focused
                  />
                </div>
                <div className="event-type   mt-6 w-full  m-auto">
                  <TextField
                    type="text"
                    label="Type"
                    placeholder="Add Event Type"
                    className=" h-12 p-5 text-xl text-cyan-100 w-full"
                    onChange={(e) => settype(e.target.value)}
                    variant="filled"
                    value={type}
                  />
                </div>
              </div>

              <div className="event-describe mt-6 xl:mt-8  w-full  m-auto">
                <TextField
                  className="p-5 text-xl text-cyan-100 w-full"
                  onChange={(e) => setdescription(e.target.value)}
                  minLength={10}
                  placeholder=" Add event detail"
                  multiline
                  maxRows={15}
                  variant="filled"
                  label="Description"
                  value={description}
                />
              </div>

              <div className="event-location md:flex md:items-center gap-5 mt-6 lg:flex w-full m-auto">
                <div className="location_input md:w-6/12 lg:m-auto lg:w-4/5">
                  <TextField
                    type="text"
                    placeholder="Event venue"
                    className=" h-12 p-5 text-xl text-cyan-100 w-full"
                    onChange={(e) => setlocation(e.target.value)}
                    variant="filled"
                    label="Location"
                    value={location}
                  />
                </div>

                <div className="template mt-5 lg:mt-0 md:mt-0  lg:m-auto lg:w-4/5  sm:items-center sm:mt-6 sm:gap-3 sm:m-auto">
                  <label htmlFor="event_poster">
                    {" "}
                    <h2 className="text-xl mb-2"> Event Poster :</h2>
                  </label>

                  <TextField
                    type="file"
                    id="event_poster"
                    accept="image/png,image/jpeg"
                    className="text-lg w-full sm:w-6/12 sm:m-auto"
                    onChange={(e) => setimage(e.target.files[0])}
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
                    variant="filled"
                    value={date}
                  />
                </div>

                <div className="mt-6 md:mt-0  md:w-6/12">
                  <TextField
                    type="time"
                    placeholder="Event time"
                    className=" h-12 p-5 text-xl  text-cyan-100 w-full  md:w-full sm:mb-6"
                    onChange={(e) => settime(e.target.value)}
                    variant="filled"
                    value={time}
                  />
                </div>
              </div>

              <div className="event-time  w-full sm:m-auto m-auto">
                <button
                  className="bg-blue-600 text-white w-full sm:w-8/12"
                  type="submit"
                  onClick={Editbtn}
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
