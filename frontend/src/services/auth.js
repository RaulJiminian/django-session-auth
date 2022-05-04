import api from "./apiConfig";
import Cookies from "js-cookie";

export const register = async (credentials) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": Cookies.get("csrftoken"),
    },
  };

  try {
    const response = await api.post("accounts/register", credentials, config);

    return response;
  } catch (error) {
    console.error(error);
  }
};
