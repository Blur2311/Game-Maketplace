import { Outlet } from "react-router-dom";
import { AdminNavBar } from "./components/AdminNavbar";
import { AdminSidebar } from "./components/AdminSidebar";
import "./Admin.css";

export const AdminLayout = () => {
  // useAuthCheck(["ADMIN"]);

  return (
    <>
      <div className="relative flex h-full">
        <div className="hidden lg:block">
          <AdminSidebar onLinkClick={() => {}} />
        </div>
        <div className="flex-1 bg-white">
          <AdminNavBar />
          <div className="h-full min-h-svh bg-white px-6 py-16">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};
