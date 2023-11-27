import React, { useState } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { HiPaperAirplane } from "react-icons/hi";

export default function Comment() {
  const [writeComment, setWriteComment] = useState("");
  const handleComment = (e) => {
    let comment = e.target.value;
    setWriteComment(comment);
  };
  const handleSubmitComment = () => {
    console.log(writeComment);
  };
  return (
    <div className="write_comment">
      <div style={{ marginTop: "5px", cursor: "pointer" }}>
        <BsEmojiSmile />
      </div>
      <div>
        <input
          type="text"
          name="comment"
          id="comment"
          className="comment_"
          value={writeComment}
          onChange={handleComment}
          placeholder="Add a Comment..."
        />
      </div>
      <div style={{ marginLeft: "5px" }}>
        <button
          style={{ height: "30px", width: "30px", cursor: "pointer" }}
          onClick={handleSubmitComment}
        >
          <HiPaperAirplane />
        </button>
      </div>
    </div>
  );
}
