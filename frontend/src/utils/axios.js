import axios from "axios";
import {CookieStorage} from "cookie-storage"

const axiosIntance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
})

const cookieStorage = new CookieStorage();

axiosIntance.interceptors.request.use(
    (config) => {
        const accesToken = localStorage.getItem("accessToken");
        if(accesToken){
            config.headers["Authorization"] = `Bearer ${accesToken}`;
        }
        return config;
    }
    ,
    (error) => {
        return Promise.reject(error);
    }
)

// axiosIntance.interceptors.response.use(
//     (response) => response,
//     async(error)=>{
//         const originalReq = error.config;


//         return axiosIntance(originalReq);
//     },
//     (error) => {
//         if (error.response.status === 401) {
//             // Handle unauthorized access, e.g., redirect to login
//             window.location.href = '/login';
//         }
//         return Promise.reject(error);
//     }
// )

export const login = async({email,password})=>{
    alert("thik thik")
    try {
        const res = await axiosIntance.post(
            "/auth/login",
            {
                email,
                password
            },
            {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            }
        );
        console.log(res.data)
        const {accessToken} = res.data
        localStorage.setItem("accessToken",accessToken);
        const refreshToken = cookieStorage.getItem("refreshToken");
        if (refreshToken) {
            localStorage.setItem("refreshToken", refreshToken);
        } 
        return res.data;
    } catch (error) {
        console.error("Login failed", error.response.data);
        throw error;
    }
}

export const register = async({name,email,password}) =>{
    try {
        const res = await axiosIntance.post(
            "/auth/register",
            {
                fullname: name,
                email,
                password
            },
            {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            }
        );
        console.log(res.data);
        return res.data;
    } catch (error) {
        console.log(error.response.data.message);
        throw error;
    }
}

export const googleLogin = async({accessToken}) => {
    try {
        console.log("Sending Google login request with access token:", accessToken);
        const res = await axiosIntance.post(
            `/auth/google`,
            { accessToken }, // Ensure it's an object with accessToken property
            {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            }
        );
        console.log("Google login response data:", res.data);
        const {accessToken: newAccessToken} = res.data;
        localStorage.setItem("accessToken", newAccessToken);
        
        return res.data; // Make sure to return the data
    } catch (error) {
        console.error("Google login error:", error.response?.data?.message);
        throw error;
    }
}

export default axiosIntance;
