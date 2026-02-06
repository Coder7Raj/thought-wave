import { Outlet, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

export const serveruri = "http://localhost:5000";

function App() {
  const signupLoc = useLocation().pathname === "/signup";
  const signinLoc = useLocation().pathname === "/signin";

  return (
    <section className="max-w-[425px] md:max-w-3xl lg:max-w-7xl mx-auto">
      {!signupLoc && !signinLoc && <Navbar />}

      <Outlet />

      {!signupLoc && !signinLoc && <Footer />}
    </section>
  );
}

export default App;
