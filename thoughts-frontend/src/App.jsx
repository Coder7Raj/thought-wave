import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { setUserData } from "./redux/user.slice";

export const serveruri = "http://localhost:5000";

function App() {
  const isSignUpPage = useLocation().pathname === "/signup";
  const isSignInPage = useLocation().pathname === "/signin";
  const isDashboard = useLocation().pathname === "/user_dashboard";
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${serveruri}/api/auth/me`, {
          withCredentials: true,
        });

        dispatch(setUserData(res.data));
      } catch (error) {
        dispatch(setUserData(null));
      }
    };

    fetchUser();
  }, []);
  return (
    <section className="max-w-[425px] md:max-w-3xl lg:max-w-7xl mx-auto">
      {!isSignUpPage && !isSignInPage && !isDashboard && <Navbar />}

      <Outlet />

      {!isSignUpPage && !isSignInPage && !isDashboard && <Footer />}
    </section>
  );
}

export default App;
