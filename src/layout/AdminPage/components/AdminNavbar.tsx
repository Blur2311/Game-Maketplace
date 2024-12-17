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
import { NotificationBar } from "./NotificationBar";

export const AdminNavBar = () => {
  const opNotifications = useRef<OverlayPanel>(null); // Dùng cho nút chuông
  const opUserMenu = useRef<OverlayPanel>(null); // Dùng cho menu người dùng
  const username = getUsernameFromToken();
  const [visible, setVisible] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      avatar: "/cat.jpeg",
      name: "Jie Yan",
      action: "added a new product",
      job: "Remote React / React Native Developer",
      time: "2023-11-20T10:33:00",
    },
    {
      id: 2,
      avatar: "/cat.jpeg",
      name: "Huy Dep Giai",
      action: "just sent a message",
      job: "",
      time: "2023-01-01T10:33:00",
    },
  ]);
  const [unread, setUnread] = useState(true);

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
            className="custom-sidebar w-[280px] bg-bgMainColor"
          >
            <AdminSidebar onLinkClick={toggleSidebar} />
          </Sidebar>
        </div>
        <div className="flex items-center h-10 gap-2 cursor-pointer">
          <div className="relative">
            {/* Nút chuông */}
            {/* <button
              onClick={(e) => {
                setUnread(false); // Đặt trạng thái unread về false
                opNotifications.current?.toggle(e); // Bật/tắt OverlayPanel
              }}
              className="relative p-2 rounded-full hover:bg-gray-200"
            >
              <BsBellFill className="text-xl" />
              {unread && (
                <span className="absolute top-0 right-0 w-3 h-3 text-xs text-white bg-red-500 rounded-full"></span>
              )}
            </button> */}

            {/* Overlay Panel */}
            <OverlayPanel
              className="custom-admin-navbar w-80 rounded-lg border border-[#dcdfe4] bg-white p-0 font-inter shadow-navBoxshadow backdrop-blur-lg"
              ref={opNotifications}
            >
              <div className="flex items-center justify-between gap-4 px-6 py-4">
                <h3 className="text-lg font-medium">Notifications</h3>
                <Button
                  className="p-2 rounded-lg hover:bg-gray-100"
                  icon="pi pi-envelope"
                  tooltip="Mark all as read"
                />
              </div>
              <ul>
                {notifications.map((notification) => (
                  <NotificationBar
                    key={notification.id}
                    id={notification.id}
                    avatar={notification.avatar}
                    name={notification.name}
                    action={notification.action}
                    job={notification.job}
                    time={notification.time}
                  />
                ))}
              </ul>
            </OverlayPanel>
          </div>

          {/* <div className="h-full w-[1px] bg-[#dcdfe4]"></div> */}

          <div
            className="flex items-center gap-3 hover:opacity-80"
            onClick={(e) => opUserMenu.current?.toggle(e)}
          >
            <img src="/cat.jpeg" alt="" className="w-10 h-10 rounded-full" />
            {/* Không có hình ảnh thì hiển thị cái này
              <Avatar
                icon="pi pi-user"
                // style={{ backgroundColor: "#9c27b0", color: "#ffffff" }}
                className="text-white bg-grayBorder"
                shape="circle"
              /> */}
          </div>
          <OverlayPanel
            ref={opUserMenu}
            className="custom-admin-navbar min-w-56 rounded-lg border border-[#dcdfe4] bg-white p-0 font-inter shadow-navBoxshadow backdrop-blur-lg"
          >
            <div className="border-b border-[#dcdfe4] p-4">
              <p className="">Full Name</p>
              <p className="text-sm text-[#667085]">{username || "Username"}</p>
            </div>
            <ul className="p-2">
              <li className="px-2 py-1 rounded-lg cursor-pointer hover:bg-gray200 hover:bg-opacity-10">
                <Link
                  to={"/admin/account-info"}
                  className="flex items-center gap-4"
                >
                  <FaRegCircleUser className="text-xl" />
                  <span>Account Info</span>
                </Link>
              </li>
              <li className="px-2 py-1 rounded-lg cursor-pointer hover:bg-gray200 hover:bg-opacity-10">
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
                className="w-full px-2 py-1 rounded-lg cursor-pointer hover:bg-gray200 hover:bg-opacity-10"
                onClick={() => signOut('!CUSTOMER')}
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
