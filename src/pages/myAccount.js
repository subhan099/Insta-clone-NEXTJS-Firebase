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
import { setMyPosts } from "@/pages/store";

const myAccount = () => {
  const [visiblePosts, setVisiblePosts] = useState(5);
  const [myPostsData, setMyPostsData] = useState([]);

  const loadMorePosts = () => {
    setVisiblePosts((prevVisiblePosts) => prevVisiblePosts + 5);
  };
  const dispatch = useDispatch();

  const fetchPostsFromFirestore = async () => {
    const postsCollection = collection(db, "posts");
    const querySnapshot = await getDocs(postsCollection);
    const postsData = [];

    const fetchUserDataByUid = async (uid) => {
      if (!uid) {
        return;
      }
      const userDocRef = doc(db, "users", uid);
      // console.log("userDocRef", db);

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
        const userData = await fetchUserDataByUid(postData.uid);
        if (userData) {
          const combinedData = {
            ...postData,
            username: userData.username,
            photoURL: userData.photoURL,
          };
          postsData.push(combinedData);
        }
      } else {
      }
    }

    return postsData;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPostsFromFirestore();
        setMyPostsData(data);
        if (dispatch(setMyPosts(data))) {
          console.log("done in redux MYPOSTS");
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);
  if (useSelector((state) => state.user.myPosts)) {
    console.log("TRUE");
  }

  const postsDataReduxmyAccount = useSelector((state) => state.user.myPosts);
  console.log(
    "=========DISPATCHED DATA in MYACCOUNT===============",
    postsDataReduxmyAccount
  );
  return (
    <>
      <Layout>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {postsDataReduxmyAccount.slice(0, visiblePosts).map((item) => (
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
          {visiblePosts < postsDataReduxmyAccount.length && (
            <button className="Load_More" onClick={loadMorePosts}>
              Load More
            </button>
          )}
        </div>
      </Layout>
    </>
  );
};

export default myAccount;
