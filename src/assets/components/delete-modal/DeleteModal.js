import React from "react";
import "./styles/style.css";

function DeleteModal(props) {
  return (
    <div className="overlay">
      <div className="modal">
        <div className="heading">Delete comment</div>
        <div className="main">
          Are you sure you want to delete this comment?This will remove the
          comment and can't be undone.
        </div>
        <div className="buttons">
          <button id="cancel" onClick={props.denied}>
            NO,CANCEL
          </button>
          <button id="delete" onClick={props.confirmed}>
            YES,DELETE
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
