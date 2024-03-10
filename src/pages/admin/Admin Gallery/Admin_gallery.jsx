import React, { useEffect, useState } from "react";
import Admin_Navbar from "../Admin_Navbar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../service/login_Server";

const Admin_gallery = () => {
  const [galleryDetails, setGalleryDetails] = useState([]);
  const gallery_st =
    "bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium xl:text-base";
  const navigate = useNavigate();

  const addImage = (e) => {
    e.preventDefault();
    navigate("/admin_gallery/addimages");
  };

  const galleryData = async () => {
    try {
      const response = await getDocs(collection(db, "gallery"));
      setGalleryDetails(response.docs);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(galleryDetails, "tart");

  const details = galleryDetails.map((i) => {
    const data = i.data();
    return data;
  });
  console.log(
    details.filter((check) => {
      check;
    })
  );

  useEffect(() => {
    galleryData();
  }, []);

  return (
    <div className=" bg-slate-300 ">
      {" "}
      <Admin_Navbar gallery_st={gallery_st} />
      <div className=" container-sm p-8 m-auto lg:w-10/12	">
        <div className="Admin_gallery_title text-center mt-6">
          <h1> Gallery</h1>
        </div>{" "}
        <div className=" ">
          <div className="event-btn text-end mb-5 mt-5 ">
            <button onClick={addImage} className=" mr-4">
              {" "}
              Add Image
            </button>
          </div>
        </div>
        <div className="admin_gallery_body ">
          <div className="img-card w-full  flex gap-6 flex-wrap justify-between">
            {details.map((e) => {
              console.log(e);
              return (
                <Card className="w-5/12 cursor-pointer">
                  <img
                    src={e.galleryImg.url}
                    alt=""
                    className="w-full h-96 object-fill"
                  />
                  <CardContent>
                    <h5 className="m-auto">
                      <b>{e.gallery_title}</b>
                    </h5>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin_gallery;
