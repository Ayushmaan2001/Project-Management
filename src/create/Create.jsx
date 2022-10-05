import "./Create.css";
import { useState } from "react";
import Select from "react-select";
import { useCollection } from "../hooks/useCollection";
import { useEffect } from "react";
import { timestamp } from "../firebase/config";
import { useAuthContext } from "../hooks/useAuthContext";
import { useFirestore } from "../hooks/useFirestore";
import {useNavigate} from 'react-router-dom'

const Create = () => {
  const Nav = useNavigate();
  const { documents } = useCollection("users");
  const { user } = useAuthContext();
  const [users, setusers] = useState([]);
  const { addDocument, response } = useFirestore('projects');
  const categories = [
    { value: "development", label: "Development" },
    { value: "design", label: "Design" },
    { value: "sales", label: "Sales" },
    { value: "marketing", label: "Marketing" },
  ];

  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("");
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    if (documents) {
      const options = documents.map((docs) => {
        return { value: docs, label: docs.displayName };
      });
      setusers(options);
    }
  }, [documents]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    if (!category) {
      setFormError("Select Category");
      return;
    }
    if (assignedUsers.length < 1) {
      setFormError("Select the user");
      return;
    }

    const createdBy = {
      displayName: user.displayName,
      photoUrl: user.photoURL,
      id: user.uid,
    };

    const assignedUsersList = assignedUsers.map((u) => {
      return {
        displayName: u.value.displayName,
        id: u.value.id,
        photoUrl: u.value.photoUrl,
      };
    });

    const project = {
      name: name,
      details: details,
      category: category.value,
      dueDate: timestamp.fromDate(new Date()),
      comments: [],
      createdBy: createdBy,
      assignedUsersList: assignedUsersList,
    };
    await addDocument(project);
    if(!response.error){
     Nav('/');
    }
  };
  return (
    <div className="create-form">
      <h2 className="page-title">Create new Project</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Project name:</span>
          <input
            required
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <label>
          <span>Project Details:</span>
          <textarea
            required
            onChange={(e) => setDetails(e.target.value)}
            value={details}
          ></textarea>
        </label>
        <label>
          <span>Set due date:</span>
          <input
            required
            type="date"
            onChange={(e) => setDueDate(e.target.value)}
            value={dueDate}
          />
        </label>
        <label>
          <span>Project category:</span>
          <Select
            onChange={(option) => setCategory(option)}
            options={categories}
          />
          {/* <Select> is like <options value={}/>label */}
        </label>
        <label>
          <span>Assign to:</span>
          <Select
            options={users}
            onChange={(options) => setAssignedUsers(options)}
            isMulti
          />
        </label>
        <button className="btn">Add Project</button>
        {formError && <div className="error">{formError}</div>}
      </form>
    </div>
  );
};

export default Create;
