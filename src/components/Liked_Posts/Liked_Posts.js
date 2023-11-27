import React, { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

export default function LikedPost({ post }) {
  const [isLiked, setIsLiked] = useState(false);

  const handleLikedClicked = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div>
      {isLiked ? (
        <AiFillHeart
          style={{
            color: "red",
            height: "30px",
            width: "30px",
            marginRight: "15px",
            cursor: "pointer",
          }}
          onClick={handleLikedClicked}
        />
      ) : (
        <AiOutlineHeart
          style={{
            height: "30px",
            width: "30px",
            marginRight: "15px",
            cursor: "pointer",
          }}
          onClick={handleLikedClicked}
        />
      )}
    </div>
  );
}
