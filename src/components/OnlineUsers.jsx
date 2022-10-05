import "./OnlineUsers.css";
import { useCollection } from "../hooks/useCollection";
import Avater from "./Avater";

function OnlineUsers() {
  const { documents, error } = useCollection("users");
//   console.log(documents);
  return (
    <>
      <div className="user-list">
        <h2>All Users</h2>
        {error && <div className="error">{error}</div>}
        {documents &&
          documents.map((user) => {
            return (
              <div key={user.uid} className="user-list-item">
                {user.online && <span className="online-user"></span>}
                <span>{user.displayName}</span>
                <Avater src={user.photoUrl} />
              </div>
            );
          })}
      </div>
    </>
  );
}

export default OnlineUsers;
