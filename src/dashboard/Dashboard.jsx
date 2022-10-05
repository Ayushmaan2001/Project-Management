import "./Dashboard.css";
import { useCollection } from "../hooks/useCollection";
import DocumentsList from "../components/DocumentsList";
import ProjectFilter from "./ProjectFilter";
import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const Dashboard = () => {
  const { documents, error } = useCollection("projects");
  const [currentFilter, setCurrentFilter] = useState("all");
  const { user } = useAuthContext();

  //filters
  const changeFilter = (newFilter) => {
    setCurrentFilter(newFilter);
  };

  const projects = documents ? documents.filter((document) => {
    switch (currentFilter) {
      case "all":
        return true;
      case "mine":
        let assignedToMe = false;
        document.assignedUsersList.forEach((u) => {
          if (user.uid === u.id) {
            assignedToMe = true;
          }
        });
        return assignedToMe;
      case "development":
      case "design":
      case "sales":
      case "maketing":
        console.log(document.category, currentFilter);
        return document.category === currentFilter;
      default:
        return true;
    }
  }) : null//filtered array

  return (
    <div>
      <h2 className="page-tile">Dashboard</h2>
      {error && <p className="error">{error}</p>}
      {documents && (
        <ProjectFilter
          currentFilter={currentFilter}
          changeFilter={changeFilter}
        />
      )}
      {documents && <DocumentsList docs={projects} />}
    </div>
  );
};

export default Dashboard;
