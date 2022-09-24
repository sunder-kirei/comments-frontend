import React, { useContext, useState } from "react";
import UserCommentInput from "../user-comment-input/UserCommentInput";
import UserComment from "../user-comment/UserComment";
import "./styles/style.css";
import { Context } from "../App/App";

function Comment(props) {
  const context = useContext(Context);
  const [isEditing, setIsEditing] = useState(false);
  const [isReplying, setIsReplying] = useState(false);

  const [text, setText] = useState(`@${props.replyingTo} ${props.content}`);

  function handleEdit(e) {
    setText(e.target.value);
  }

  function handleDisplay(e) {
    setIsReplying(!isReplying);
  }

  return (
    <>
      <div className="comment" data-id={props.id}>
        <section className="counter">
          <button id="increment" onClick={props.handleChange}>
            +
          </button>
          <div className="score">{props.score}</div>
          <button id="decrement" onClick={props.handleChange}>
            -
          </button>
        </section>
        <section className="main">
          <div className="header">
            <img src={props.user.image.png} alt="user image" />
            <span className="user-name">
              {props.user.username}
              {props.user.username === context.username && (
                <span className="tag">you</span>
              )}
            </span>
            <span className="created">{props.createdAt}</span>
            {props.user.username !== context.username ? (
              <div className="reply" onClick={handleDisplay}>
                <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z"
                    fill="#5357B6"
                  />
                </svg>{" "}
                Reply
              </div>
            ) : (
              <div className="edit-delete">
                <span id="delete" onClick={props.handleDelete}>
                  <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z"
                      fill="#ED6368"
                    />
                  </svg>
                  Delete
                </span>
                <span
                  id="edit"
                  onClick={() => {
                    setText(`@${props.replyingTo} ${props.content}`);
                    setIsEditing(!isEditing);
                  }}
                >
                  <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z"
                      fill="#5357B6"
                    />
                  </svg>
                  Edit
                </span>
              </div>
            )}
          </div>
          {!isEditing ? (
            <div className="comment-body">
              {props.replyingTo && (
                <span className="replying-to">{props.replyingTo}</span>
              )}{" "}
              {props.content}
            </div>
          ) : (
            <div className="comment-body-input">
              <textarea
                name="comment-input"
                id="comment-input"
                value={text}
                onChange={handleEdit}
              />
            </div>
          )}
          {props.user.username === context.username && isEditing && (
            <button
              id="update"
              onClick={(e) => {
                props.handleEdit(e);
                setIsEditing(!isEditing);
              }}
            >
              UPDATE
            </button>
          )}
        </section>
      </div>
      <UserComment
        {...props}
        isReplying={isReplying}
        handleReply={props.handleReply}
        parentID={props.id}
        handleDisplay={handleDisplay}
        handleEdit={props.handleEdit}
        handleDelete={props.handleDelete}
      />
    </>
  );
}

export default Comment;
