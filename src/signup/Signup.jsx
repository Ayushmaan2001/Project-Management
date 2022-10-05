import "./Signup.css";
import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailError, setThumbnailError] = useState(null);
  const { signup, isPending, error } = useSignup();

  const handleImage = (e) => {
    setThumbnail(null);
    let selectedimg = e.target.files[0];
    if (!selectedimg) {
      setThumbnailError("please seletc something");
      return;
    }

    if (selectedimg.size > 100000) {
      setThumbnailError("Img size must be less than 100kb");
      return;
    }
    setThumbnailError(null);
    setThumbnail(selectedimg);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(email, password, displayName, thumbnail);
  };
  return (
    <form className="auth-form" onSubmit={(e) => handleSubmit(e)}>
      <h2>Sign up</h2>
      <label>
        <span>email:</span>
        <input
          required
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </label>
      <label>
        <span>password:</span>
        <input
          required
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </label>
      <label>
        <span>Display name:</span>
        <input
          required
          type="text"
          onChange={(e) => {
            setDisplayName(e.target.value);
          }}
        />
        {thumbnailError && <div className="error">{thumbnailError}</div>}
      </label>
      <label>
        <span>profile thumbnail:</span>
        <input required type="file" onChange={handleImage} />
      </label>
      {!isPending && <button className="btn">Submit</button>}
      {isPending && <button>Loading</button>}
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Signup;
