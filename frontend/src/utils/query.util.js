import {useMutation,useQuery} from "@tanstack/react-query"
import {login,register,googleLogin,getAllVehicle,getVehicleById} from "./axios.js"

export const useLogin = ()=>{
    return useMutation({
        mutationFn:login
    })
};

export const useRegister = ()=>{
    return useMutation({
        mutationFn:register
    })
}

export const useGoogleSignIn = ()=>{
    return useMutation({
        mutationFn: googleLogin
    })
}

export const useGetAllVehicle = () => {
    return useQuery({
        queryKey: ["getAllVehicle"],
        queryFn: getAllVehicle,
        gcTime: 1000 * 60 * 5, // Cache for 5 minutes
    })
}

export const useGetVehicleById = (id) => {
    return useQuery({
        queryKey: ["getVehicleById", id],
        queryFn: () => getVehicleById(id),
        gcTime: 1000 * 60 * 5, // Cache for 5 minutes
    })
}