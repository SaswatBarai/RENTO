import { useMutation, useQuery } from "@tanstack/react-query";
import {
  login,
  register,
  googleLogin,
  getAllVehicle,
  getVehicleById,
  getLocation,
  setLocation,
  getVehicleByLocation,
  createOrder,
  verifyPayment,
  getBookings,
  logout
} from "./axios.js";

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: register,
  });
};

export const useLogout = () => {
/*
useQuery to useMutation - Logout should be a mutation, not a query
Now uses mutateAsync() to call the logout function in navbar
*/

  return useMutation({
    mutationFn: logout,
  });
};

export const useGoogleSignIn = () => {
  return useMutation({
    mutationFn: googleLogin,
  });
};

export const useGetAllVehicle = () => {
  return useQuery({
    queryKey: ["getAllVehicle"],
    queryFn: getAllVehicle,
    gcTime: 1000 * 60 * 2,
  });
};

export const useSetLocation = () => {
  return useMutation({
    mutationFn: setLocation,
  });
};

export const UseGetLocation = () => {
  return useQuery({
    queryKey: ["getLocation"],
    queryFn: getLocation,
    gcTime: 1000 * 60 * 2,
    refetchInterval: 1000 * 60 * 2,
  });
};

export const useGetVehicleById = (id) => {
  return useQuery({
    queryKey: ["getVehicleById", id],
    queryFn: () => getVehicleById(id),
    gcTime: 1000 * 60 * 4,
  });
};

export const useGetVehicleByLocation = (selectedLocation) => {
  return useQuery({
    queryKey: ["getVehicleByLocation", selectedLocation],
    queryFn: () => getVehicleByLocation(selectedLocation),
    gcTime: 1000 * 60 * 2,
  });
};

export const useGetBookings = ({page, limit, sortBy, sortOrder, status}) => {
  return useQuery({
    queryKey:["getBookings", page, limit, sortBy, sortOrder, status],
    queryFn: () => getBookings({page, limit, sortBy, sortOrder, status}),
    gcTime: 1000 * 60 * 2,
    keepPreviousData: true,
  })
}

export const useCreateOrder = () => {
  return useMutation({
    mutationFn: createOrder,
  })
}


export const useVerifyPayment = () => {
  return useMutation({
    mutationFn: verifyPayment,
  })
}