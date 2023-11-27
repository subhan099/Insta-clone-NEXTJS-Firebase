import React, { useState, useEffect } from "react";
import { TfiGallery } from "react-icons/tfi";
import {
  doc,
  setDoc,
  addDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db, auth } from "@/lib/firebase";

export default function ModalContentCreate() {
  const [data, setData] = useState({
    uid: "",
    postURL: "",
    description: "",
  });

  const [showForm, setShowForm] = useState(false);

  const handleClick = () => {
    setShowForm(true);
  };

  useEffect(() => {
    if (auth.currentUser) {
      setData((prevData) => ({
        ...prevData,
        uid: auth.currentUser.uid,
      }));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const postID = self.postID;
    const uid = data.uid;
    const postURL = data.postURL;
    const description = data.description;

    try {
      const userDocRef = collection(db, "posts");
      const docRef = await addDoc(userDocRef, {
        // postID: postID,
        uid: uid,
        postURL: postURL,
        description: description,
      });

      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "150px",
      }}
    >
      {!showForm && (
        <div>
          <TfiGallery
            style={{
              height: "50px",
              width: "50px",
              marginRight: "15px",
            }}
          />
        </div>
      )}

      {!showForm && (
        <div
          style={{ fontWeight: "400", fontSize: "20px", lineHeight: "25px" }}
        >
          Drag Photos and Videos Here
        </div>
      )}

      {!showForm && (
        <button
          style={{
            backgroundColor: "#0095f6",
            border: "none",
            borderRadius: "3px",
            marginTop: "20px",
            height: "30px",
            width: "200px",
            cursor: "pointer",
          }}
          onClick={handleClick}
        >
          Select From Computer
        </button>
      )}

      {showForm && (
        <form
          className="form"
          onSubmit={handleSubmit}
          style={{ display: "flex", alignItems: "center" }}
        >
          <div>
            <input
              className="data_styled_modal"
              type="text"
              name="postURL"
              id="postURL"
              onChange={handleInputChange}
              placeholder="Post URL"
              value={data.postURL}
            />
          </div>
          <div>
            <input
              className="data_styled_modal"
              type="text"
              name="description"
              id="description"
              onChange={handleInputChange}
              placeholder="Description"
              value={data.description}
            />
          </div>
          <button
            style={{ marginBottom: "50px", width: "150px" }}
            className="submit_button"
            type="submit"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
}
