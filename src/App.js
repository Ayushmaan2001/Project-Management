import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./dashboard/Dashboard";
import Login from "./login/Login";
import Signup from "./signup/Signup";
import Create from "./create/Create";
import Projectdetails from "./projectDetails/projectDetails";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { useAuthContext } from "./hooks/useAuthContext";
import OnlineUsers from "./components/OnlineUsers";

function App() {
  const { user, authIsReady } = useAuthContext();
  return (
    <div className="App">
      {authIsReady && (
        <>
          {user && <Sidebar />}
          <div className="container">
            <Navbar />
            <Routes>
              <Route
                exact
                path="/"
                element={user ? <Dashboard /> : <Navigate to="/login" />}
              ></Route>
              <Route
                path="/login"
                element={user ? <Navigate to="/" /> : <Login />}
              ></Route>
              <Route
                path="/signup"
                element={user ? <Navigate to="/" /> : <Signup />}
              ></Route>
              <Route
                path="/create"
                element={user ? <Create /> : <Navigate to="/login" />}
              ></Route>
              <Route
                path="/project/:id"
                element={user ? <Projectdetails /> : <Navigate to="/login" />}
              ></Route>
              <Route></Route>
            </Routes>
          </div>
          {user && <OnlineUsers />}
        </>
      )}
    </div>
  );
}

export default App;
