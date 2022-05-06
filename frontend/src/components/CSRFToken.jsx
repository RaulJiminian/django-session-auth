import React, { useState, useEffect } from 'react';

export default function CSRFToken() {
  const [csrftoken, setcsrftoken] = useState("");

  const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        let cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }

    return cookieValue;
  }
  
  useEffect(() => {
    fetch("http://localhost:8000/accounts/csrf_cookie", {
      credentials: "include",
    }).then((response) => {
      setcsrftoken(getCookie("csrftoken"));
    });
  }, [])

  return (
    <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken} />
  )
}

// Former useEffect w/ async/await/axios
// import api from '../services/apiConfig';

// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const response = await api.get("/accounts/csrf_cookie");
//       setcsrftoken(getCookie('csrftoken'));
//     } catch (error) {
//       console.error(error)
//     }
//   }

//   fetchData();
// }, [])