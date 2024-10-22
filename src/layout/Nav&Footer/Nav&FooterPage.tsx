import { Outlet } from "react-router-dom";
import { Footer } from "../Nav&Footer/Footer";
import { Navbar } from "../Nav&Footer/Navbar";

export const NavFooterPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="mx-auto w-11/12 lg:w-3/4">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};
