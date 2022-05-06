import "./App.css";
import Layout from "./hocs/Layout";
import Home from "./screens/Home";
import Register from "./screens/Register";
import Login from "./screens/Login";
import Dashboard from "./screens/Dashboard";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";

function App() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="App">
      <Layout
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
        setUser={setUser}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/register"
            element={<Register isAuthenticated={isAuthenticated} />}
          />
          <Route
            path="/login"
            element={
              <Login
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
                setUser={setUser}
              />
            }
          />
          <Route
            path="/dashboard"
            element={
              <Dashboard
                user={user}
                setUser={setUser}
                setIsAuthenticated={setIsAuthenticated}
              />
            }
          />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
