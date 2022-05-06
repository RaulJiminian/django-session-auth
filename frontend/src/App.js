import "./App.css";
import Layout from "./hocs/Layout";
import Home from "./screens/Home";
import Register from "./screens/Register";
import Login from "./screens/Login";
import Dashboard from "./screens/Dashboard";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
// import axios from "axios";

function App() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    
  }, [])
  

  useEffect(() => {
    /*const fetchData = async () => {
      const body = JSON.stringify({
        withCredentials: true,
        credentials: "include",
      });
      */

    /*
      try {
        const response = await axios.get(
          "http://localhost:8000/accounts/csrf_cookie",
          body
        );
      } catch (error) {
        console.error(error);
      }
      */
    // };

    // fetchData();
    const getCookie = (name) => {
      let cookieValue = null;
      if (document.cookie && document.cookie !== "") {
        let cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
          let cookie = cookies[i].trim();
          if (cookie.substring(0, name.length + 1) === name + "=") {
            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
            break;
          }
        }
      }

      return cookieValue;
    };

    fetch("http://localhost:8000/accounts/csrf_cookie", {
      credentials: "include",
    }).then((response) => {
      //console.log("Done");
      console.log(getCookie("csrftoken"));
    });
  }, []);

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
