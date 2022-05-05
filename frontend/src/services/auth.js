import api from "./apiConfig";
import Cookies from "js-cookie";

export const checkAuthenticated = async () => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await api.get("/accounts/authenticated", config);

    if (response.data.error || response.data.isAuthenticated === "error") {
      return false;
    } else if (response.data.isAuthenticated === "success") {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
  }
};

export const login = async (credentials) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": Cookies.get("csrftoken"),
    },
  };

  try {
    const response = await api.post("/accounts/login", credentials, config);

    if (response.data.success) {
      return response;
    }
  } catch (error) {
    console.error(error);
  }
};

export const logout = async () => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": Cookies.get("csrftoken"),
    },
  };

  const body = JSON.stringify({
    withCredentials: true,
  });

  try {
    const response = await api.post("/accounts/logout", body, config);

    if (response.data.success) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
};

export const register = async (credentials) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": Cookies.get("csrftoken"),
    },
  };

  try {
    const response = await api.post("/accounts/register", credentials, config);

    return response;
  } catch (error) {
    console.error(error);
  }
};

export const delete_account = async () => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": Cookies.get("csrftoken"),
    },
  };

  const body = JSON.stringify({
    withCredentials: true,
  });

  try {
    const response = await api.delete("/accounts/delete", body, config);
    return response;
  } catch (error) {
    console.error(error);
  }
};
