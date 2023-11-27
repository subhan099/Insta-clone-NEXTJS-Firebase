import React, { useState, useEffect } from "react";
import { doc, setDoc } from "firebase/firestore";
import { auth } from "@/lib/firebase";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export default function ModalContentProfile() {
  const firebaseConfig = {
    apiKey: "AIzaSyDzUevGnhB2yjmo3eFoi-yT1lZHk_5-n58",
    authDomain: "instagram-clone-b8ae6.firebaseapp.com",
    projectId: "instagram-clone-b8ae6",
    storageBucket: "instagram-clone-b8ae6.appspot.com",
    messagingSenderId: "223379145805",
    appId: "1:223379145805:web:de362b2bd0f6405299c804",
  };
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const [data, setData] = useState({
    uid: "",
    email: "",
    username: "",
    photoURL: "",
  });

  useEffect(() => {
    if (auth.currentUser) {
      setData((prevData) => ({
        ...prevData,
        uid: auth.currentUser.uid,
        email: auth.currentUser.email,
      }));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Data is as:", data);
    const uid = data.uid;
    const email = data.email;
    const name = data.username;
    const imageUrl = data.photoURL;

    try {
      // Use the email as the document ID to ensure uniqueness
      const userDocRef = doc(db, "users", uid);
      await setDoc(userDocRef, {
        uid: uid,
        email: email,
        photoURL: imageUrl,
        username: name,
      });

      console.log("Document written with ID: ", userDocRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  return (
    <div style={{ marginTop: "150px" }}>
      <form
        className="form"
        onSubmit={handleSubmit}
        style={{ display: "flex", alignItems: "center" }}
      >
        <div>
          <input
            className="data_styled_modal"
            type="id"
            name="uid"
            id="uid"
            value={data.uid}
            readOnly
          />
        </div>
        <div>
          <input
            className="data_styled_modal"
            type="email"
            name="email"
            id="email"
            value={data.email}
            readOnly
          />
        </div>
        <div>
          <input
            className="data_styled_modal"
            type="text"
            name="username"
            id="username"
            onChange={handleInputChange}
            placeholder="Username"
          />
        </div>
        <div>
          <input
            className="data_styled_modal"
            type="text"
            name="photoURL"
            id="photoURL"
            onChange={handleInputChange}
            placeholder="photo URL"
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
    </div>
  );
}
