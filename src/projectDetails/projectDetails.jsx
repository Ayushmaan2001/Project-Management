import "./projectDetails.css";
import { useParams } from "react-router-dom";
import { useDocument } from "../hooks/useDocument";
import ProjectSummary from "./projectSummary";
import React from "react";
import ProjectComents from "./ProjectComents";

const Projectdetails = () => {
  const { id } = useParams();
  const { error, document } = useDocument("projects", id);
  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!document) {
    return <div className="loading">Loading...</div>;
  }
  return (
    <div className="project-details">
      <ProjectSummary project={document}/>
      <ProjectComents project={document}/>
    </div>
  );
};

export default Projectdetails;
