import React, { useState, useEffect } from "react";
import stories from "@/pages/Data/stories";
import { collection, getDocs } from "firebase/firestore";
import { auth } from "../../lib/firebase";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { setMyUsers } from "@/pages/store";
import {
  getAuth,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";

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
const authInstance = getAuth();
setPersistence(authInstance, browserSessionPersistence);

export default function StoriesBar() {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const fetchUsers = async () => {
    try {
      // const currentUserId = auth.currentUser?.uid;

      const usersCollection = collection(db, "users");
      const querySnapshot = await getDocs(usersCollection);

      const usersData = [];

      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        if (userData.uid !== auth.currentUser.uid) {
          usersData.push(userData);
        } else {
        }
      });

      return usersData;
    } catch (error) {
      console.error("Error fetching users: ", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchUsers();
      setUsers(data);
      dispatch(setMyUsers(data));
    };

    fetchData();
  }, []);
  const myData_redux = useSelector((state) => state.user.usersRedux);

  return (
    <div style={{ display: "flex" }}>
      {myData_redux.map((user) => (
        <div style={{ textAlign: "center", width: "70px" }}>
          <img className="stories_picture" src={user.photoURL} alt="image" />
          <span style={{ fontSize: "14px" }}>{user.username}</span>
        </div>
      ))}
    </div>
  );
}
