import React, { useState } from "react";
import "./styles/style.css";

function AddComment(props) {
  const [text, setText] = useState("");
  return (
    <div className="new-comment">
      <img src={props.image.png} alt="user image" />
      <div className="main">
        <textarea
          name="text"
          id="new-comment"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <button
          id="send"
          onClick={(e) => {
            props.handleNewComment(e);
            setText("");
          }}
        >
          SEND
        </button>
      </div>
    </div>
  );
}

export default AddComment;
