import { Outlet } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { SearchBar } from "./components/SearchBar";
import { SideBar } from "./components/SideBar";

export const NavFooterPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <SearchBar />
      <div className="mx-auto w-11/12 lg:w-3/4">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export const NavSidebarPage: React.FC = () => {
  return (
    <>
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
    </>
  );
};
