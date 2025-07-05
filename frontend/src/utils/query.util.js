import {useMutation} from "@tanstack/react-query"
import {login,register,googleLogin} from "./axios.js"

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