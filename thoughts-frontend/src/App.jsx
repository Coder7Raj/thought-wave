import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <p>navbar</p>

      <Outlet />

      <p>footer</p>
    </>
  );
}

export default App;
