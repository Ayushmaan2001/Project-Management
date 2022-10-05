import "./DocumentList.css";
import { Link } from "react-router-dom";
import Avater from "./Avater";

function DocumentsList({ docs }) {
  return (
    <div className="project-list">
      {docs.length === 0 && <p>No projects yet!</p>}
      {docs.map((project) => {
        return (
          <Link key={project.id} to={"/project/" + project.id}>
            <h4>{project.name}</h4>
            <p>Due by {project.dueDate.toDate().toDateString()}</p>
            <div className="assigned-to">
              <ul>
                {project.assignedUsersList.map((user) => {
                  return (
                    <li key={user.photoUrl}>
                      <Avater src={user.photoUrl} />
                    </li>
                  );
                })}
              </ul>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default DocumentsList;
