import { Outlet } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { SearchBar } from "./components/SearchBar";
import { SideBar } from "./components/SideBar";
import "./Nav.css";

export const NavFooterPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-[1440px]">
        <SearchBar />
        <div className="mx-auto min-h-screen w-11/12 lg:w-3/4">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
};

export const NavSidebarPage: React.FC = () => {
  return (
    <>
      <div className="mx-auto max-w-[1440px]">
        <Navbar />
        <div className="bg-bgProfile h-full">
          <div className="w-full px-3 lg:mx-auto lg:w-11/12">
            <div className="flex py-20">
              <div className="w-1/4">
                <SideBar />
              </div>
              <div className="w-3/4">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
