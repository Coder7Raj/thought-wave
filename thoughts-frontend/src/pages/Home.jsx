import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import useGetCurrentUser from "../hooks/useGetCurrentUser.jsx";

export default function Home() {
  useGetCurrentUser();
  const currUser = useSelector((state) => state.user.userData);

  // console.log("curr user", currUser?.user?.email);

  return (
    <>
      <section className="flex justify-evenly">
        <div className="w-4/12 h-[250px] border border-red-500"></div>
        <div className="w-4/6 h-[250px[ border border-blue-500">
          <Outlet />
        </div>
      </section>
    </>
  );
}
