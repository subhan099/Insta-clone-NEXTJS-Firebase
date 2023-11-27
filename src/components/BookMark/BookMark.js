import React, { useState } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

export default function BookMark({ post }) {
  const [isBookMarked, setIsBookMarked] = useState(false);

  const handleBookMarkClicked = () => {
    setIsBookMarked(!isBookMarked);
  };

  return (
    <div>
      {isBookMarked ? (
        <FaBookmark
          style={{
            color: "black",
            height: "30px",
            width: "30px",
            marginRight: "15px",
            cursor: "pointer",
          }}
          onClick={handleBookMarkClicked}
        />
      ) : (
        <FaRegBookmark
          style={{
            height: "30px",
            width: "30px",
            marginRight: "15px",
            cursor: "pointer",
          }}
          onClick={handleBookMarkClicked}
        />
      )}
    </div>
  );
}
