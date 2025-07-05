import axios from "axios";
export const detailGoogle = async (accessToken) => {
  try {
    console.log("Making request to Google with token:", accessToken);
    const user = await axios.get(
      `https://www.googleapis.com/oauth2/v2/userinfo?alt=json&access_token=${accessToken}`
    );
    console.log("Google API response:", user.data);
    return user;
  } catch (error) {
    console.error("Error fetching Google user data:", error.response?.data || error.message);
    throw error;
  }
};
