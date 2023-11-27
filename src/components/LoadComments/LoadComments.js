import React, { useState } from "react";

export const LoadComments = ({ item }) => {
  const [visibleComments, setVisibleComments] = useState(2);
  const loadMoreComments = () => {
    setVisibleComments((prevVisibleComments) => prevVisibleComments + 2);
  };
  const renderComments = (comments) => {
    return (
      <div className="comments">
        {comments.slice(0, visibleComments).map((comment) => (
          <div className="comment" key={comment.id}>
            <strong>{comment.name}: </strong>
            {comment.text}
            {comment.replies && comment.replies.length > 0 && (
              <div className="replies">{renderComments(comment.replies)}</div>
            )}
          </div>
        ))}
        {visibleComments < comments.length && (
          <button className="Load_More_comments" onClick={loadMoreComments}>
            Load More
          </button>
        )}
      </div>
    );
  };
  return (
    <div>
      {item && item.length > 0 && (
        <div className="post_comments">{renderComments(item)}</div>
      )}
    </div>
  );
};
