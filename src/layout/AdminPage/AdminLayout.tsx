import { Outlet } from "react-router-dom";
import { AdminNavBar } from "./components/AdminNavbar";
import { AdminSidebar } from "./components/AdminSidebar";
import "./Admin.css";
import { useAuthCheck } from "../../utils/AuthUtils";

export const AdminLayout = () => {
  useAuthCheck(["ADMIN"]);

  return (
    <>
      <div className="relative flex flex-col min-h-full">
        <div className="fixed top-0 left-0 z-50 hidden h-full bg-bgMainColor lg:block">
          <AdminSidebar onLinkClick={() => {}} />
        </div>
        <div className="z-10 flex flex-1 flex-col bg-white lg:ml-[280px]">
          <AdminNavBar />
          <main className="flex flex-col flex-1 bg-white">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};
