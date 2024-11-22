import { Outlet } from "react-router-dom";
import { AdminNavBar } from "./components/AdminNavbar";
import { AdminSidebar } from "./components/AdminSidebar";
import "./Admin.css";

export const AdminLayout = () => {
  // useAuthCheck(["ADMIN"]);

  return (
    <>
      <div className="relative flex min-h-full flex-col">
        <div className="fixed left-0 top-0 z-50 hidden h-full bg-bgMainColor lg:block">
          <AdminSidebar onLinkClick={() => {}} />
        </div>
        <div className="z-10 flex flex-1 flex-col bg-white lg:ml-[280px]">
          <AdminNavBar />
          <main className="flex flex-1 flex-col bg-white">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};
