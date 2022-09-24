import React, { useContext, useState } from "react";
import "./styles/style.css";
import { Context } from "../App/App";

function UserCommentInput({
  type = "REPLY",
  handleReply,
  parentID,
  handleDisplay,
}) {
  const context = useContext(Context);

  const [text, setText] = useState("");

  return (
    <div className="reply-input">
      <img src={context.image.png} alt="user image" />
      <div className="main">
        <textarea
          name="text"
          id="reply-text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <button
          id="reply-button"
          onClick={() => {
            handleReply(parentID, text);
            handleDisplay();
          }}
        >
          {type}
        </button>
      </div>
    </div>
  );
}

export default UserCommentInput;
