// import React, { useState, useEffect, useMemo } from "react";
// import Link from "next/link";
// import {
//   collection,
//   getDoc,
//   getDocs,
//   doc,
//   setDoc,
//   arrayUnion,
// } from "firebase/firestore";
// import { db, auth } from "../../lib/firebase";
// import { useSelector } from "react-redux";
// import { setMyUsers } from "@/pages/store";
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";

// export default function Suggestions() {
//   const Redux_Data = useSelector((state) => state.user.usersRedux);
//   const handleFollow = () => {};

//   return (
//     <div style={{ width: "350px" }}>
//       <div>
//         {Redux_Data.map((user) => (
//           <div
//             key={user.email}
//             style={{
//               display: "flex",
//               flexDirection: "row",
//               marginBottom: "10px",
//               justifyContent: "space-between",
//               cursor: "pointer",
//             }}
//           >
//             <div style={{ display: "flex" }}>
//               <div>
//                 <img className="picture" src={user.photoURL} alt="user image" />
//               </div>
//               <div>
//                 <div className="name_">{user.username}</div>
//                 <div
//                   style={{
//                     fontSize: "12px",
//                     color: "#9e9e9e",
//                     marginLeft: "12px",
//                   }}
//                 >
//                   Follows You
//                 </div>
//               </div>
//             </div>
//             <button
//               style={{
//                 color: "#0180d3",
//                 backgroundColor: "transparent",
//                 border: "none",
//                 cursor: "pointer",
//               }}
//               onClick={() => handleFollow}
//             >
//               Follow
//             </button>{" "}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
// File name: Suggestions.js

// File name: Suggestions.js

import React, { useEffect } from "react";
import {
  doc,
  setDoc,
  getDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db, auth } from "../../lib/firebase";
import { useSelector, useDispatch } from "react-redux";
import { setMyUsers, followUser, unfollowUser } from "@/pages/store";

export default function Suggestions() {
  const Redux_Data = useSelector((state) => state.user.usersRedux);
  const followedUsers = useSelector((state) => state.user.followedUsersRedux);
  const dispatch = useDispatch();

  const isFollowing = (user) => {
    for (let i = 0; i < followedUsers.length; i++) {
      if (followedUsers[i].uid === user.uid) {
        return true; // User is followed
      }
    }

    return false; // User is not followed
  };

  const handleFollow = async (user) => {
    try {
      const followedDocRef = doc(db, "followed", auth.currentUser.uid);
      const followedDocSnapshot = await getDoc(followedDocRef);

      if (isFollowing(user)) {
        if (dispatch(unfollowUser(user.uid))) {
        }

        const updatedFollowedData = {
          followedIDs: arrayRemove(user.uid),
        };
        await setDoc(followedDocRef, updatedFollowedData, { merge: true });
      } else {
        if (followedDocSnapshot.exists()) {
          const followedDocData = followedDocSnapshot.data();
          const updatedFollowedData = {
            followedIDs: isFollowing(user)
              ? arrayRemove(user.uid)
              : arrayUnion(user.uid),
          };
          await setDoc(followedDocRef, updatedFollowedData, { merge: true });
        } else {
          const newFollowedData = {
            followedIDs: [user.uid],
          };
          await setDoc(followedDocRef, newFollowedData);
        }
      }
      // Update the Redux store with the followed user data
      if (isFollowing(user)) {
        // dispatch(unfollowUser(user.uid));
      } else {
        dispatch(followUser([...followedUsers, { uid: user.uid }]));
      }
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const followedDocRef = doc(db, "followed", auth.currentUser.uid);
        const followedDocSnapshot = await getDoc(followedDocRef);

        if (followedDocSnapshot.exists()) {
          const followedDocData = followedDocSnapshot.data();
          const followedIDs = followedDocData.followedIDs || [];

          // Update the Redux store with the followed user data
          dispatch(setMyUsers(followedIDs.map((uid) => ({ uid }))));
          dispatch(followUser(followedIDs.map((uid) => ({ uid }))));
        }
      } catch (error) {
        console.error("Error fetching followed users:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <div style={{ width: "350px" }}>
      <div>
        {Redux_Data.map((user, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "row",
              marginBottom: "10px",
              justifyContent: "space-between",
              cursor: "pointer",
            }}
          >
            <div style={{ display: "flex" }}>
              <div>
                <img className="picture" src={user.photoURL} alt="user image" />
              </div>
              <div>
                <div className="name_">{user.username}</div>
                <div
                  style={{
                    fontSize: "12px",
                    color: "#9e9e9e",
                    marginLeft: "12px",
                  }}
                >
                  Suggested For You
                </div>
              </div>
            </div>
            <button
              id={`follow-button-${user.uid}`} // Add a unique ID to the button
              style={{
                color: "#0180d3",
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
              }}
              onClick={() => handleFollow(user)}
            >
              {isFollowing(user) ? "Unfollow" : "Follow"}
            </button>{" "}
          </div>
        ))}
      </div>
    </div>
  );
}
