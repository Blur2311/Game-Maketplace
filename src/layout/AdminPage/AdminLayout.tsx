import { Outlet } from "react-router-dom";
import { AdminNavBar } from "./components/AdminNavbar";
import { AdminSidebar } from "./components/AdminSidebar";
import "./Admin.css";

export const AdminLayout = () => {
  // useAuthCheck(["ADMIN"]);

  return (
    <>
      <div className="relative flex h-full">
        <div className="fixed left-0 top-0 hidden h-full lg:block">
          <AdminSidebar onLinkClick={() => {}} />
        </div>
        <div className="min-h-screen flex-1 bg-white lg:ml-[280px]">
          <AdminNavBar />
          <div className="bg-white">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};
