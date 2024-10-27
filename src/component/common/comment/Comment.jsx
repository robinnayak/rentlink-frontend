import React, { useEffect, useState } from "react";
import { getCommentApi } from "../../api/auth/request";
import dayjs from "dayjs";
import AddComment from "./AddComment";

const Comment = ({ token, room_id }) => {
  const [comments, setComments] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const getUserComment = async () => {
      try {
        const res = await getCommentApi(token, room_id);
        setComments(res);
        console.log("Fetched comments", res);
      } catch (err) {
        console.error("Error fetching comments", err);
      }
    };
    getUserComment();
  }, [room_id, token, refresh]); // Added 'refresh' to dependencies

  const handleCommentAdded = () => {
    setRefresh((prev) => !prev); // Toggle refresh state to re-fetch comments
  };

  return (
    <div className="bg-gradient-to-br from-blue-100 to-purple-100 p-6 rounded-lg shadow-lg mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
        Room Comments
      </h2>
      <div className="space-y-4">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="p-4 rounded-md bg-white shadow-md hover:scale-105 transform transition duration-300"
          >
            <h3 className="text-lg font-semibold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              {comment.commenter_name}
            </h3>
            <p className="text-gray-700 mb-2">{comment.comment_text}</p>
            <p className="text-gray-500 text-sm">
              {dayjs(comment.created_at).format("MMMM D, YYYY h:mm A")}
            </p>
          </div>
        ))}
      </div>
      <AddComment
        token={token}
        room_id={room_id}
        onCommentAdded={handleCommentAdded}
      />
    </div>
  );
};

export default Comment;
