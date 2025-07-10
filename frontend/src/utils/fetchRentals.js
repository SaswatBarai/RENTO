
import {useGetAllVehicle,useGetVehicleByLocation} from "../utils/query.util.js"
import {useSelector} from "react-redux"  



export const useFetchVehicles = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const selectedLocation = useSelector((state) => state.location.selectedCity);
  const {
    data: allData,
    isLoading: isAllLoading,
    error: allError,
    isError: isAllError
  } = useGetAllVehicle();

  const {
    data: locationData,
    isLoading: isLocationLoading,
    error: locationError,
    isError: isLocationError
  } = useGetVehicleByLocation(selectedLocation);

  if (!isAuth && !selectedLocation) {
    return { data: allData, isLoading: isAllLoading, error: allError, isError: isAllError };
}

if (selectedLocation) {
    return { data: locationData, isLoading: isLocationLoading, error: locationError, isError: isLocationError };
  }

  return { data: allData, isLoading: isAllLoading, error: allError, isError: isAllError };
};
