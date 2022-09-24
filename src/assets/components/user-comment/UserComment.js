import React from "react";
import Comment from "../comment/Comment";
import UserCommentInput from "../user-comment-input/UserCommentInput";
import "./styles/style.css";

function UserComment(props) {
  const replies = props.replies?.map((item) => (
    <Comment
      {...item}
      key={item?.id}
      handleChange={props.handleChange}
      handleReply={props.handleReply}
      handleEdit={props.handleEdit}
      handleDelete={props.handleDelete}
    />
  ));

  return (
    <div className="user-comment">
      {replies}
      {props.isReplying && (
        <UserCommentInput
          handleReply={props.handleReply}
          parentID={props.parentID}
          handleDisplay={props.handleDisplay}
        />
      )}
    </div>
  );
}

export default UserComment;
