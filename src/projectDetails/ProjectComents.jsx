import { useState } from "react";
import Avater from "../components/Avater";
import { timestamp } from "../firebase/config";
import { useAuthContext } from "../hooks/useAuthContext";
import { useFirestore } from "../hooks/useFirestore";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

export default function ProjectComents({ project }) {
  const [newComment, setNewComment] = useState("");
  const { updateDocument, respose } = useFirestore("projects");
  const { user } = useAuthContext();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const commentToAdd = {
      displayName: user.displayName,
      photoUrl: user.photoURL,
      content: newComment,
      createdAt: timestamp.fromDate(new Date()),
      id: Math.random(), //generate comment id
    };
    await updateDocument(project.id, {
      comments: [...project.comments, commentToAdd],
    });
    if (!respose) {
      setNewComment("");
    }
  };
  return (
    <div className="project-comments">
      <h4>ProjectComments</h4>
      <ul>{project.comments.length > 0 &&project.comments.map((comment) => {
        return (<li key={comment.id}>
          <div className="comment-author">
            <Avater src={comment.photoUrl}/>
            <p>{comment.displayName}</p>
          </div>
          <div className="comment-date">
            <p>{formatDistanceToNow(comment.createdAt.toDate(),{addSuffix:true})}</p>
          </div>
          <div className="comment-content">
            <p>{comment.content}</p>
          </div>
        </li>)
      })}</ul>
      <form className="add-comments" onSubmit={handleSubmit}>
        <label>
          <span>Add new Comment</span>
          <textarea
            required
            onChange={(e) => {
              setNewComment(e.target.value);
            }}
            value={newComment}
          ></textarea>
        </label>
        <button className="btn">Add comment</button>
      </form>
    </div>
  );
}
