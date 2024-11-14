import { OverlayPanel } from "primereact/overlaypanel";
import { BsBellFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { getUsernameFromToken, signOut } from "../../../utils/AuthUtils";
import { useRef, useState } from "react";
import { FiSettings } from "react-icons/fi";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { AdminSidebar } from "./AdminSidebar";
import { FaRegCircleUser } from "react-icons/fa6";

export const AdminNavBar = () => {
  const op = useRef<OverlayPanel>(null);
  const username = getUsernameFromToken();
  const [visible, setVisible] = useState(false);

  const toggleSidebar = () => {
    setVisible(!visible);
  };

  return (
    <>
      <div className="sticky top-0 z-40 flex w-full items-center justify-between border-b border-[#dcdfe4] bg-white px-6 py-2 shadow-sm">
        <div>
          <Button
            icon="pi pi-bars"
            onClick={toggleSidebar}
            className="block lg:hidden"
          />
          <Sidebar
            visible={visible}
            onHide={toggleSidebar}
            position="left"
            className="custom-sidebar bg-bgMainColor"
          >
            <AdminSidebar onLinkClick={toggleSidebar} />
          </Sidebar>
        </div>
        <div className="flex h-10 cursor-pointer items-center gap-2">
          <BsBellFill className="text-xl" />
          <div className="h-full w-[1px] bg-[#dcdfe4]"></div>
          <div
            className="flex items-center gap-3 hover:opacity-80"
            onClick={(e) => op.current?.toggle(e)}
          >
            <img src="/cat.jpeg" alt="" className="h-10 w-10 rounded-full" />
            {/* Không có hình ảnh thì hiển thị cái này
              <Avatar
                icon="pi pi-user"
                // style={{ backgroundColor: "#9c27b0", color: "#ffffff" }}
                className="text-white bg-grayBorder"
                shape="circle"
              /> */}
          </div>
          <OverlayPanel
            ref={op}
            className="custom-admin-navbar min-w-56 rounded-xl border border-[#dcdfe4] bg-white p-0 font-inter shadow-navBoxshadow backdrop-blur-lg"
          >
            <div className="border-b border-[#dcdfe4] p-4">
              <p className="">Full Name</p>
              <p className="text-sm text-[#667085]">{username || "Username"}</p>
            </div>
            <ul className="p-2">
              <li className="cursor-pointer rounded-lg px-2 py-1 hover:bg-gray200 hover:bg-opacity-10">
                <Link
                  to={"/admin/account-info"}
                  className="flex items-center gap-4"
                >
                  <FaRegCircleUser className="text-xl" />
                  <span>Account Info</span>
                </Link>
              </li>
              <li className="cursor-pointer rounded-lg px-2 py-1 hover:bg-gray200 hover:bg-opacity-10">
                <Link
                  to={"/admin/settings"}
                  className="flex items-center gap-4"
                >
                  <FiSettings className="text-xl" />
                  <span>Setting</span>
                </Link>
              </li>
            </ul>
            <div className="border-t border-[#dcdfe4] p-2">
              <button
                className="w-full cursor-pointer rounded-lg px-2 py-1 hover:bg-gray200 hover:bg-opacity-10"
                onClick={signOut}
              >
                Sign Out
              </button>
            </div>
          </OverlayPanel>
        </div>
      </div>
    </>
  );
};
