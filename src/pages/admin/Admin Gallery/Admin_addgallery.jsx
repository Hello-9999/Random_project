import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, storage } from "../../../service/login_Server";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import Admin_Navbar from "../Admin_Navbar";
import { dark } from "@mui/material/styles/createPalette";
const Admin_addgallery = () => {
  const [imgTitle, setImageTitle] = useState();
  const [galleryImg, setGalleryImg] = useState();
  const navigate = useNavigate();

  const handlerSubmit = async (e) => {
    e.preventDefault();
    const data = {
      title: imgTitle,
      img: [],
      completed: false,
    };
    try {
      if (galleryImg.length == 1) {
        const Storageref = ref(storage, `gallery/${v4()}`);
        await uploadBytes(Storageref, galleryImg[0]).then((img_data) => {
          getDownloadURL(img_data.ref).then((url) => {
            console.log(url);
            data.img.push(url);
            data.completed = true;
            data.id = v4();

            if (url) {
              addDoc(collection(db, "gallery"), data);
              console.log(" gallery is added succesfully in your database");
              navigate("/admin_gallery");
            }
          });
        });
      } else {
        for (let i = 0; i < galleryImg.length; i++) {
          const Storageref = ref(storage, `gallery/${v4()}`);

          console.log(galleryImg[i], "rtt");
          await uploadBytes(Storageref, galleryImg[i]).then((img_data) => {
            getDownloadURL(img_data.ref).then((url) => {
              console.log(url);
              data.img.push(url);
              data.completed = true;
              data.id = v4();
            });
          });
        }
      }
      if (data.completed) {
        addDoc(collection(db, "gallery"), data);
        console.log(" gallery is added succesfully in your database");
        navigate("/admin_gallery");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="addImage_container bg-slate-300 h-screen overflow-auto">
      <Admin_Navbar />
      <div className="addImage text-black mb-3">
        <h2 className="font-bold text-3xl text-center mt-4"> Add image</h2>

        <div className="form w-11/12 bg-slate-400 mt-5  pb-5 m-auto p-4 md:w-10/12 lg:8/12 xl:w-7/12">
          <form action="" onSubmit={handlerSubmit}>
            <div className="image-title mt-6 w-full m-auto md:10/12">
              <TextField
                id="outlined-basic"
                type="text"
                label="Event  Title"
                placeholder="Add Event Title"
                className=" h-12 p-5 text-xl text-cyan-100 w-full "
                onChange={(e) => setImageTitle(e.target.value)}
                variant="filled"
                required
              />
            </div>

            <div className="images mt-6 w-full m-auto md:10/12 ">
              <label htmlFor="image">
                {" "}
                <h6>Choose Your Images :</h6>{" "}
              </label>
              <div className="mt-3">
                <input
                  type="file"
                  accept="image/png,image/jpeg"
                  className="text-lg w-full sm:w-6/12 sm:m-auto "
                  multiple
                  onChange={(e) => setGalleryImg(e.target.files)}
                />
              </div>
            </div>

            <div className="event-time  w-full sm:m-auto mt-6 lg:mt-8 text-center">
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

export default Admin_addgallery;
