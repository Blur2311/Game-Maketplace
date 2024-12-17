import { Outlet } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { SearchBar } from "./components/SearchBar";
import { SideBar } from "./components/SideBar";
import "./Nav.css";
import { TopSideBar } from "./components/TopSideBar";

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
        <div className="sticky top-0 z-50 bg-bgMainColor">
          <Navbar />
        </div>
        <div className="h-full min-h-screen bg-bgProfile">
          <div className="w-full md:px-3 lg:mx-auto lg:w-11/12">
            <div className="flex md:py-20">
              <div className="hidden w-1/4 md:block">
                <SideBar />
              </div>
              <div className="w-full md:w-3/4">
                <div className="block border-b-2 md:hidden">
                  <TopSideBar />
                </div>
                <div className="md:pl-5">
                  <Outlet />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
