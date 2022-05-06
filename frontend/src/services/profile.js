import api from "./apiConfig";
import Cookies from "js-cookie";

// Checked
export const load_user = async () => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await api.get("/profile/user", config);

    if (response.data.error) {
      throw new Error(response.data.error);
    } else {
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
};

// Checked
export const update_profile = async (formData) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": Cookies.get("csrftoken"),
    },
  };

  const body = JSON.stringify({
    withCredentials: true,
    first_name: formData.first_name,
    last_name: formData.last_name,
    phone: formData.phone,
    city: formData.city,
  });

  try {
    const response = await api.put("/profile/update", body, config);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
