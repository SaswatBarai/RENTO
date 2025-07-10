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
    gcTime: 1000 * 60 * 2,
  });
};

export const useGetVehicleByLocation = (selectedLocation) => {
  return useQuery({
    queryKey: ["getVehicleByLocation", selectedLocation],
    queryFn: () => getVehicleByLocation(selectedLocation),
    gcTime: 1000 * 60 * 2,
  });
};
