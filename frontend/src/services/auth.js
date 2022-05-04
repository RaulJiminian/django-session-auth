import axios from "axios";

export const register = async (credentials) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios.post("accounts/register", credentials, config);

    return response;
  } catch (error) {
    console.error(error);
  }
};
