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
            { accessToken },
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

export const getAllVehicle = async () => {
    try {
        const res = await axiosIntance.get(
            "/vehicle/getAllVehicles",
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
        console.error("Error fetching vehicles:", error.response?.data?.message);
        throw error;
        
    }
}
export const getVehicleById = async (vehicleId) => {
    try {
        const res = await axiosIntance.get(
            `/vehicle/getVehicle/${vehicleId}`,
            {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            }
        );
        console.log("Vehicle data:", res.data);
        return res.data;
        
    } catch (error) {
        console.error("Error fetching vehicle by ID:", error.response?.data?.message);
        throw error;
    }
}

export const setLocation = async (location) => {
    console.log(location)
    try {
        const res = await axiosIntance.patch(
            "/auth/setLocation",
            { location },
            {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            }
        );
        console.log("Location set successfully:", res.data);
        return res.data;
    } catch (error) {
        console.error("Error setting location:", error.response?.data?.message);
        throw error;
    }
}

export const getLocation = async () => {
    try {
        const res = await axiosIntance.get(
            "/auth/getLocation",
            {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            }
        );
        console.log("Location fetched successfully:", res.data);
        return res.data;
    } catch (error) {
        console.error("Error fetching location:", error.response?.data?.message);
        throw error;
    }
}

export const getVehicleByLocation = async(selectedLocation) => {
    try {
        console.log(selectedLocation)
        const res = await axiosIntance.get(
            `/vehicle/getVehicleByMainLocation/${selectedLocation}`,
            {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            }
        )
        console.log("Vehicles by location:", res.data);
        return res.data;
    } catch (error) {
        console.error("Error fetching vehicles by location:", error.response?.data?.message);
        throw error;
    }
}

export const createOrder = async ({vehicleId, hours,pickupDate,pickupTime}) => {
    try {
        const res = await axiosIntance.post(
            "/order/create-order",
            {
                vehicleId,
                hours,
                pickupDate,
                pickupTime
            },
            {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            }
        );
        // console.log("Order created successfully:", res.data);
        return res.data;
    } catch (error) {
        console.error("Error creating order:", error.response?.data?.message);
        throw error;
    }
}
export const verifyPayment = async ({orderId, paymentId, signature, bookingId}) => {
    try {
        const res = await axiosIntance.post(
            "/order/verify-payment",
            {
                orderId,
                paymentId,
                signature,
                bookingId
            },
            {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            }
        );
        console.log("Payment verified successfully:", res.data);
        return res.data;
    } catch (error) {
        console.error("Error verifying payment:", error.response?.data?.message);
        throw error;
    }
}

export const getBookings = async ({page, limit, sortBy, sortOrder, status}) => {
    try {
       const res = await axiosIntance.get(`/order/bookings?page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}&status=${status}`,
        {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        }
       ) 
         console.log("Bookings fetched successfully:", res.data);
        return res.data;
    } catch (error) {
        console.error("Error fetching bookings:", error.response?.data?.message);
        throw error;
    }
}

export default axiosIntance;
