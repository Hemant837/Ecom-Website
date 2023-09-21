import MyNavbar from "../MyNavbar/MyNavbar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <>
      <MyNavbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default RootLayout;
