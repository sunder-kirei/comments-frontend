import React, { createContext, useState } from "react";
import Comment from "../comment/Comment";
import data from "../../data.json";
import AddComment from "../add-comment/AddComment";
import DeleteModal from "../delete-modal/DeleteModal";
import "./styles/style.css";

export const Context = createContext();

export default function App(props) {
  const [commentData, setCommentData] = useState(data);
  const [isVisible, setIsVisible] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(undefined);
  let currentID = 5;

  function handleReply(parentID, text) {
    const newComments = commentData.comments.map((item) => {
      if (item.id == parentID) {
        item.replies.push({
          id: currentID,
          content: text,
          createdAt: "",
          score: 0,
          replyingTo: item.user.username,
          user: {
            ...commentData.currentUser,
          },
        });
        currentID++;
      }
      const newReplies = item.replies.map((item) => {
        if (item.id == parentID) {
          if (item.replies == undefined) item.replies = [];

          item.replies.push({
            id: currentID,
            content: text,
            createdAt: "",
            score: 0,
            replyingTo: item.user.username,
            user: {
              ...commentData.currentUser,
            },
          });
          currentID++;
        }
        return item;
      });
      return { ...item, replies: newReplies };
    });
    setCommentData({ ...commentData, comments: newComments });
  }

  function changeVotes(e) {
    const targetParent = e.target.closest(".comment").dataset.id;
    const newComments = commentData.comments.map((item) => {
      if (item.id == targetParent) {
        if (e.target.id == "increment")
          return { ...item, score: item.score + 1 };

        return { ...item, score: item.score - 1 };
      }
      const replies = item.replies.map((reply) => {
        if (reply.id == targetParent) {
          if (e.target.id == "increment")
            return { ...reply, score: reply.score + 1 };

          return { ...reply, score: reply.score - 1 };
        }
        return reply;
      });
      return { ...item, replies: replies };
    });

    setCommentData({ ...commentData, comments: newComments });
  }

  function handleEdit(e) {
    const targetParent = e.target.closest(".comment").dataset.id;
    const newContent = e.target.parentNode.children[1].children[0].value;
    const newComments = commentData.comments.map((item) => {
      if (item.id == targetParent) {
        return {
          ...item,
          content: newContent,
        };
      }
      const newReplies = item.replies.map((item) => {
        if (item.id == targetParent) {
          return {
            ...item,
            content: newContent,
          };
        }
        return item;
      });
      return { ...item, replies: newReplies };
    });

    setCommentData({ ...commentData, comments: newComments });
  }

  function handleDelete(e) {
    const targetParent = e.target.closest(".comment").dataset.id;
    let newComments = commentData.comments;
    for (let item of newComments) {
      if (item.id == targetParent) {
        newComments.splice(newComments.indexOf(item), 1);
        break;
      }
      for (let reply of item.replies) {
        if (reply.id == targetParent) {
          item.replies.splice(item.replies.indexOf(reply));
          break;
        }
      }
    }
    setCommentData({ ...commentData, newComments });
  }

  function getConfirmation(e) {
    setCurrentEvent(e);
    setIsVisible(true);
    console.log(currentEvent);
  }

  function confirmed() {
    console.log(currentEvent);
    handleDelete(currentEvent);
    setIsVisible(false);
    setCurrentEvent(undefined);
  }

  function denied() {
    setIsVisible(false);
    setCurrentEvent(undefined);
  }

  function handleNewComment(e) {
    const newComment = e.target.parentNode.children[0].value;

    let newComments = commentData.comments;

    newComments.push({
      id: currentID,
      content: newComment,
      createdAt: "",
      score: 0,
      user: {
        ...commentData.currentUser,
      },
      replies: [],
    });
    currentID++;
    setCommentData({ ...commentData, comments: newComments });
  }

  const comments = commentData.comments.map((item) => (
    <Context.Provider value={commentData.currentUser}>
      <Comment
        key={item.id.toString()}
        {...item}
        handleChange={changeVotes}
        handleReply={handleReply}
        handleEdit={handleEdit}
        handleDelete={getConfirmation}
      />
    </Context.Provider>
  ));
  return (
    <main>
      {isVisible && <DeleteModal denied={denied} confirmed={confirmed} />}
      <div className="container">
        {comments}
        <AddComment
          {...commentData.currentUser}
          handleNewComment={handleNewComment}
        />
      </div>
    </main>
  );
}
