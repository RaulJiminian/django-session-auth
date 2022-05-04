import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function CSRFToken() {
  const [csrftoken, setcsrftoken] = useState("");

  const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
  }

  useEffect(() => {
    const fetchCookie = async () => {
      try {
        await axios.get("/accounts/csrf_cookie");
      } catch (error) {
        
      }
    }

    fetchCookie();
    setcsrftoken(getCookie('csrftoken'))
  }, [])

  return (
    <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken} />
  )
}
