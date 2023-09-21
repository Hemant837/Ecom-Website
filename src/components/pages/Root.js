import MyNavbar from "../MyNavbar/MyNavbar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <>
      <MyNavbar />
      <Outlet />
    </>
  );
};

export default RootLayout;
