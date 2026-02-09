import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentAddress,
  setCurrentCity,
  setCurrentCountry,
  setCurrentState,
} from "../redux/user.slice";

export default function useGetCountry() {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      const result = await axios.get(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${
          import.meta.env.VITE_GEO_API_KEY
        }`,
      );

      dispatch(setCurrentCountry(result?.data?.results[0].country));
      dispatch(setCurrentCity(result?.data?.results[0].city));
      dispatch(setCurrentState(result?.data?.results[0].state));

      setCurrentAddress(
        result?.data?.results[0].address_line2 ||
          result?.data?.results[0].address_line1,
      );

      console.log(result?.data);
    });
  }, [dispatch, userData]);
}
