import React, { useEffect, useState } from "react";
import Admin_Navbar from "../Admin_Navbar";
import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import { database, db, storage } from "../../../service/login_Server";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

const Admin_addmember = () => {
  const [member_name, setmember_name] = useState("");
  const [member_role, setmember_role] = useState("");
  const [member_facebook_link, setmember_facebook_link] = useState("");
  const [member_linkdein_link, setmember_linkdein_link] = useState("");
  const [member_pic, setmember_pic] = useState("");

  const navigate = useNavigate();

  const hadler_add = async (e) => {
    e.preventDefault();
    console.log(member_facebook_link);
    let httpFacebookLink;
    let httpLinkdeinLink;

    if (member_facebook_link.match("https://")) {
      httpFacebookLink = member_facebook_link;
    } else {
      httpFacebookLink = `https://${member_facebook_link}`;
    }

    if (member_linkdein_link.match("https://")) {
      httpLinkdeinLink = member_linkdein_link;
    } else {
      httpLinkdeinLink = `https://${member_linkdein_link}`;
    }

    try {
      const Storageref = ref(storage, `membersprofile/${v4()}`);
      await uploadBytes(Storageref, member_pic).then((img_data) => {
        getDownloadURL(img_data.ref).then((url) => {
          if (url) {
            const form_data = {
              member_name: member_name,
              member_role: member_role,
              member_facebook_link: httpFacebookLink,
              member_linkdein_link: httpLinkdeinLink,
              member_img: url,
            };
            addDoc(collection(db, "member"), form_data);
            console.log(" member  is added succesfully in your database");
            navigate("/admin_member");
          }
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="add_event_container bg-slate-300 h-screen overflow-auto">
      <Admin_Navbar />
      <div className="add_event text-black mb-3">
        <h2 className="font-bold text-3xl text-center mt-4"> Add Member</h2>

        <div className="form w-11/12 bg-slate-400 mt-5  pb-5 m-auto p-4 md:w-10/12 lg:8/12 xl:w-7/12">
          <form action="" onSubmit={hadler_add}>
            <div className="xl:flex xl:gap-4 xl:items-center xl:mt-0">
              <div className="member_name mt-6 w-full m-auto md:10/12">
                <TextField
                  id="outlined-basic"
                  member_role="text"
                  label="Name"
                  placeholder="Enter a member name"
                  className=" h-12 p-5 text-xl text-cyan-100 w-full "
                  onChange={(e) => setmember_name(e.target.value)}
                  required
                  variant="filled"
                />
              </div>
              <div className="member_role   mt-6 w-full  m-auto">
                <TextField
                  member_role="text"
                  label="Role"
                  placeholder=" Enter a role of member"
                  className=" h-12 p-5 text-xl text-cyan-100 w-full"
                  onChange={(e) => setmember_role(e.target.value)}
                  required
                  variant="filled"
                />
              </div>
            </div>

            <div className="member_link mt-6 xl:mt-8  w-full  m-auto flex gap-4">
              <TextField
                className="p-5 text-xl text-cyan-100 w-full"
                onChange={(e) => setmember_facebook_link(`${e.target.value}`)}
                minLength={10}
                required
                placeholder=""
                multiline
                maxRows={15}
                variant="filled"
                label="Facebook link
                "
              />

              <TextField
                className="p-5 text-xl text-cyan-100 w-full"
                onChange={(e) => setmember_linkdein_link(`${e.target.value}`)}
                minLength={10}
                placeholder=""
                multiline
                maxRows={15}
                variant="filled"
                label="Linkdein link 
                "
              />
            </div>
            <div
              className=" mt-4 flex items-center gap-5
            "
            >
              <label htmlFor="profile">
                {" "}
                <strong>Add Member profile pic :</strong>
              </label>
              <TextField
                className="  text-cyan-100  mt-4"
                onChange={(e) => setmember_pic(e.target.files[0])}
                required
                variant="filled"
                type="file"
                id="profile"
              />
            </div>

            <div className="Add_btn text-center  mt-5">
              <button
                className="bg-blue-600 text-white w-full sm:w-8/12 m-auto"
                member_role="submit"
              >
                {" "}
                Add Member
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Admin_addmember;
