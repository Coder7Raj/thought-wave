import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

export const serveruri = "http://localhost:5000";

function App() {
  return (
    <section className="max-w-[425px] md:max-w-3xl lg:max-w-7xl mx-auto bg-white">
      <Navbar />

      <Outlet />

      <Footer />
    </section>
  );
}

export default App;
