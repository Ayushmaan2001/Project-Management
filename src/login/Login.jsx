import './Login.css';
import React from 'react';
import {useLogin} from '../hooks/useLogin';

const Login = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const {login,isPending,error} = useLogin();

    const handleSubmit = (e) =>{
        e.preventDefault();
        login(email,password);
    }
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
        {!isPending && <button className="btn">Submit</button>}
        {isPending && <button>Loading</button>}
        {error && <div className="error">{error}</div>}
      </form>
    );
}

export default Login;
