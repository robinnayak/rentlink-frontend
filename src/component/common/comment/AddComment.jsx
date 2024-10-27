import React, { useState } from "react";
import { postCommentApi } from "../../api/auth/request";

const AddComment = ({ token, room_id, onCommentAdded }) => {
  const [commentText, setCommentText] = useState("");

  const handleAddComment = async () => {
    try {
      const credential = { comment_text: commentText };
      await postCommentApi(token, room_id, credential);
      setCommentText(""); // Clear the input field after submitting
      onCommentAdded(); // Refresh the comments in the Comment component
    } catch (error) {
      console.error("Error posting comment", error);
    }
  };

  return (
    <div className="mt-6 p-4 bg-white rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-4 text-center text-gray-800">
        Add Your Comment
      </h3>
      <textarea
        className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-purple-300 transition duration-200"
        rows="3"
        placeholder="Write your comment here..."
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      />
      <button
        onClick={handleAddComment}
        className="mt-4 w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 rounded-md font-semibold hover:scale-105 transition transform duration-300"
      >
        Post Comment
      </button>
    </div>
  );
};

export default AddComment;
