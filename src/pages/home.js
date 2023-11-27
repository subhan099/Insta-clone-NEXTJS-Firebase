"use client";
import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout/Layout";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";
import { FaRegComment, FaRegBookmark } from "react-icons/fa";
import { FiMoreHorizontal } from "react-icons/fi";
import { GoPaperAirplane } from "react-icons/go";
import LikedPost from "@/components/Liked_Posts/Liked_Posts";
import BookMark from "@/components/BookMark/BookMark";
import { LoadComments } from "@/components/LoadComments/LoadComments";
import Comment from "@/components/Comments/Comment";
import { useSelector, useDispatch } from "react-redux";
import { setPostsDataRedux } from "@/pages/store";

const Home = () => {
  const [visiblePosts, setVisiblePosts] = useState(5);
  const [postsData, setPostsData] = useState([]);

  const loadMorePosts = () => {
    setVisiblePosts((prevVisiblePosts) => prevVisiblePosts + 5);
  };
  const dispatch = useDispatch();
  const is_Following = useSelector((state) => state.user.followedUsersRedux);
  const isFollowing = (uid) => {
    console.log(
      is_Following.some((id) => uid === id.uid),
      "isfollowng",
      is_Following,
      "uid",
      uid
    );

    return is_Following.some((id) => uid === id.uid);
  };

  const fetchPostsFromFirestore = async () => {
    const postsCollection = collection(db, "posts");
    const querySnapshot = await getDocs(postsCollection);
    const postsData = [];

    const fetchUserDataByUid = async (uid) => {
      if (!uid) {
        return;
      }
      const userDocRef = doc(db, "users", uid);

      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        return userDoc.data();
      } else {
        return null;
      }
    };

    for (const doc of querySnapshot.docs) {
      const postData = doc.data();
      if (postData.uid === auth.currentUser.uid) {
        // console.log("IT'S ME ", postData.uid);
      } else if (isFollowing(postData.uid)) {
        const userData = await fetchUserDataByUid(postData.uid);
        if (userData) {
          const combinedData = {
            ...postData,
            username: userData.username,
            photoURL: userData.photoURL,
          };
          postsData.push(combinedData);
        }
      }
    }

    return postsData;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("CALLING");
        const data = await fetchPostsFromFirestore();
        console.log("DATA!!!!!!!!!!", data);
        setPostsData(data);
        if (dispatch(setPostsDataRedux(data))) {
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const postsDataRedux = useSelector((state) => state.user.value);

  return (
    <>
      <Layout>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {postsDataRedux.slice(0, visiblePosts).map((item) => (
            <div className="posts" key={item.id}>
              <div className="post_head">
                <div style={{ display: "flex" }}>
                  <img
                    className="picture"
                    src={item.photoURL}
                    alt="post image"
                  />
                  <div className="name_">{item.username}</div>
                </div>
                <div>
                  <FiMoreHorizontal
                    style={{ marginTop: "20px", cursor: "pointer" }}
                  />
                </div>
              </div>
              <img className="image_" src={item.postURL} alt="post image" />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "670px",
                }}
              >
                <div style={{ display: "flex" }}>
                  <LikedPost post={item} />
                  <FaRegComment
                    style={{
                      height: "30px",
                      width: "30px",
                      marginRight: "15px",
                      cursor: "pointer",
                    }}
                  />
                  <GoPaperAirplane
                    style={{
                      height: "30px",
                      width: "30px",
                      marginRight: "15px",
                      cursor: "pointer",
                    }}
                  />
                </div>
                <div>
                  <BookMark post={item} />
                </div>
              </div>
              <div className="post_description">{item.description}</div>
              {item.comment && item.comment.length > 0 && (
                <div className="post_comments">
                  <LoadComments item={item.comment} />
                </div>
              )}
              <div>
                <Comment />
              </div>
            </div>
          ))}
          {visiblePosts < postsDataRedux.length && (
            <button className="Load_More" onClick={loadMorePosts}>
              Load More
            </button>
          )}
        </div>
      </Layout>
    </>
  );
};

export default Home;
// for data directly from firebase--------------------------------------------------------
// "use client";
// import React, { useState, useEffect } from "react";
// import Layout from "@/components/Layout/Layout";
// import {
//   collection,
//   query,
//   where,
//   getDocs,
//   doc,
//   getDoc,
// } from "firebase/firestore";
// import { db, auth } from "@/lib/firebase";
// import { FaRegComment, FaRegBookmark } from "react-icons/fa";
// import { FiMoreHorizontal } from "react-icons/fi";
// import { GoPaperAirplane } from "react-icons/go";
// import LikedPost from "@/components/Liked_Posts/Liked_Posts";
// import BookMark from "@/components/BookMark/BookMark";
// import { LoadComments } from "@/components/LoadComments/LoadComments";
// import Comment from "@/components/Comments/Comment";
// import { useSelector, useDispatch } from "react-redux";
// import { setPostsDataRedux } from "@/pages/store";

// const Home = () => {
//   const [visiblePosts, setVisiblePosts] = useState(5);
//   const [postsData, setPostsData] = useState([]);
//   const followedUsersRedux = useSelector(
//     (state) => state.user.followedUsersRedux
//   );
//   const loadMorePosts = () => {
//     setVisiblePosts((prevVisiblePosts) => prevVisiblePosts + 5);
//   };
//   const dispatch = useDispatch();

//   // Function to fetch user data by UID
//   const fetchUserDataByUid = async (uid) => {
//     if (!uid) {
//       return null;
//     }
//     const userDocRef = doc(db, "users", uid);

//     const userDoc = await getDoc(userDocRef);
//     if (userDoc.exists()) {
//       return userDoc.data();
//     } else {
//       return null;
//     }
//   };

//   const fetchPostsFromFirestore = async () => {
//     // Get the UIDs of users you are following
//     const followedUsers = await getFollowedUsers(auth.currentUser.uid);

//     // Filter posts where the UID is in the followedUsers list
//     const postsCollection = collection(db, "posts");
//     const querySnapshot = await getDocs(
//       query(postsCollection, where("uid", "in", followedUsers))
//     );

//     const postsData = [];

//     for (const doc of querySnapshot.docs) {
//       const postData = doc.data();
//       const userData = await fetchUserDataByUid(postData.uid);

//       if (userData) {
//         const combinedData = {
//           ...postData,
//           username: userData.username,
//           photoURL: userData.photoURL,
//         };
//         postsData.push(combinedData);
//       }
//     }

//     return postsData;
//   };

//   // Function to get the list of UIDs you are following
//   const getFollowedUsers = async (currentUserUid) => {
//     const followedDocRef = doc(db, "followed", currentUserUid);
//     const followedDocSnapshot = await getDoc(followedDocRef);

//     if (followedDocSnapshot.exists()) {
//       const followedData = followedDocSnapshot.data();
//       return followedData.followedIDs || [];
//     } else {
//       return [];
//     }
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         console.log("CALLING");
//         const data = await fetchPostsFromFirestore();
//         console.log("DATA!!!!!!!!!!", data);
//         setPostsData(data);
//         setPostsDataRedux(data);
//         if (dispatch(setPostsDataRedux(data))) {
//         }
//       } catch (error) {
//         console.error("Error fetching data: ", error);
//       }
//     };

//     fetchData();
//   }, [followedUsersRedux]);

//   const postsDataRedux = useSelector((state) => state.user.value);

//   return (
//     <>
//       <Layout>
//         <div style={{ display: "flex", flexDirection: "column" }}>
//           {postsDataRedux.slice(0, visiblePosts).map((item) => (
//             <div className="posts" key={item.id}>
//               <div className="post_head">
//                 <div style={{ display: "flex" }}>
//                   <img
//                     className="picture"
//                     src={item.photoURL}
//                     alt="post image"
//                   />
//                   <div className="name_">{item.username}</div>
//                 </div>
//                 <div>
//                   <FiMoreHorizontal
//                     style={{ marginTop: "20px", cursor: "pointer" }}
//                   />
//                 </div>
//               </div>
//               <img className="image_" src={item.postURL} alt="post image" />
//               <div
//                 style={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   width: "670px",
//                 }}
//               >
//                 <div style={{ display: "flex" }}>
//                   <LikedPost post={item} />
//                   <FaRegComment
//                     style={{
//                       height: "30px",
//                       width: "30px",
//                       marginRight: "15px",
//                       cursor: "pointer",
//                     }}
//                   />
//                   <GoPaperAirplane
//                     style={{
//                       height: "30px",
//                       width: "30px",
//                       marginRight: "15px",
//                       cursor: "pointer",
//                     }}
//                   />
//                 </div>
//                 <div>
//                   <BookMark post={item} />
//                 </div>
//               </div>
//               <div className="post_description">{item.description}</div>
//               {item.comment && item.comment.length > 0 && (
//                 <div className="post_comments">
//                   <LoadComments item={item.comment} />
//                 </div>
//               )}
//               <div>
//                 <Comment />
//               </div>
//             </div>
//           ))}
//           {visiblePosts < postsDataRedux.length && (
//             <button className="Load_More" onClick={loadMorePosts}>
//               Load More
//             </button>
//           )}
//         </div>
//       </Layout>
//     </>
//   );
// };

// export default Home;
