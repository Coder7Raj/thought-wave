import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { serveruri } from "../App";
import { setUserData } from "../redux/user.slice";

export default function useGetCurrentUser() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${serveruri}/api/user/current_user`, {
          withCredentials: true,
        });

        dispatch(setUserData(XPathResult.data));
      } catch (err) {
        console.log("error fetching current user", err);
      }
    };
    fetchUser();
  }, [dispatch]);
}
