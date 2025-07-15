import axios from "axios";
export const detailGoogle = async (accessToken) => {
  try {
   
    const user = await axios.get(
      `https://www.googleapis.com/oauth2/v2/userinfo?alt=json&access_token=${accessToken}`
    );
   
    return user;
  } catch (error) {
   
    throw error;
  }
};
