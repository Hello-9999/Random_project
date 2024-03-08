import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: 550,
  // height: "100vh",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  color: "black",
  p: 4,
  overflow: "auto",
};
const Admin_editmember = ({
  editModal,
  setEdit,
  editName,
  editImg,
  editRole,
  editFb,
  editLind,
  seteditName,
  seteditImg,
  seteditRole,
  seteditFb,
  seteditLind,
  updateMember,
}) => {
  const handleClose = () => setEdit(false);

  return (
    <div className="">
      {" "}
      <Modal
        open={editModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="w-10/12 md:w-3/5 lg:w-3/6 h-screen ">
          <Typography id="modal-modal-title" variant="h5" component="h2">
            Edit Event{" "}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="img">
              <img
                src={editImg}
                alt=""
                className="w-28 sm:w-40 m-auto rounded-3xl"
              />
            </div>
            <form action="">
              <div className="xl:flex xl:gap-4 xl:items-center xl:mt-0">
                <div className="memberName mt-6 w-full m-auto md:10/12">
                  <TextField
                    id="outlined-basic"
                    type="text"
                    label="Name"
                    placeholder="Member Name ::"
                    className=" h-12 p-5 text-xl text-cyan-100 w-full "
                    onChange={(e) => seteditName(e.target.value)}
                    variant="filled"
                    value={editName}
                    focused
                  />
                </div>
                <div className="member_Role   mt-6 w-full  m-auto">
                  <TextField
                    type="text"
                    label="Role"
                    placeholder="Member Role"
                    className=" h-12 p-5 text-xl text-cyan-100 w-full"
                    onChange={(e) => seteditRole(e.target.value)}
                    variant="filled"
                    value={editRole}
                  />
                </div>
              </div>

              <div className="member_facebook mt-6 xl:mt-8  w-full  m-auto">
                <TextField
                  className="p-5 text-xl text-cyan-100 w-full"
                  onChange={(e) => seteditFb(e.target.value)}
                  minLength={10}
                  placeholder="Member Facebook URL ::"
                  multiline
                  maxRows={15}
                  variant="filled"
                  label="Facebook URL"
                  value={editFb}
                />
              </div>

              <div className="Linkdein_url mt-6 xl:mt-8  w-full  m-auto ">
                <TextField
                  type="text"
                  placeholder="Member Linkdein URL ::"
                  className=" h-12 p-5 text-xl text-cyan-100 w-full"
                  onChange={(e) => seteditLind(e.target.value)}
                  variant="filled"
                  label="Linkdein URL"
                  value={editLind}
                />
              </div>

              <div className="memberPic mt-6 xl:mt-8  w-full  m-auto">
                <label htmlFor="profilePic">
                  {" "}
                  <h2 className="text-xl mb-2"> Member Profile Picture :</h2>
                </label>

                <TextField
                  type="file"
                  id="profilePic"
                  accept="image/png,image/jpeg"
                  className="h-12 p-5 text-xl text-cyan-100 w-full"
                  onChange={(e) => seteditImg(e.target.files[0])}
                />
              </div>

              <div className="event-time  mt-6 w-full  m-auto">
                <button
                  className="bg-blue-600 text-white w-full "
                  type="submit"
                  onClick={updateMember}
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

export default Admin_editmember;
