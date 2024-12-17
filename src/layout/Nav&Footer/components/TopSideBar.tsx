import { useState } from "react";
import { AiFillClockCircle } from "react-icons/ai";
import { BiSolidUser } from "react-icons/bi";
import { BsChatDotsFill } from "react-icons/bs";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { IoIosLock } from "react-icons/io";
import { PiChatFill } from "react-icons/pi";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { NavLink, useLocation } from "react-router-dom";

export const TopSideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const pageDetails: {
    [key: string]: { icon: JSX.Element; name: string; pattern?: RegExp };
  } = {
    "/setting/user-info": {
      icon: <BiSolidUser className="text-2xl" />,
      name: "Account Settings",
    },
    "/setting/order-history": {
      icon: <RiShoppingCart2Fill className="text-2xl" />,
      name: "Order History",
    },
    "/setting/order-history/detail/:id": {
      icon: <RiShoppingCart2Fill className="text-2xl" />,
      name: "Order History",
      pattern: /^\/setting\/order-history\/detail\/[^/]+$/, // Kiểm tra với đường dẫn động
    },
    "/setting/transaction": {
      icon: <AiFillClockCircle className="text-2xl" />,
      name: "Transactions",
    },
    "/setting/security": {
      icon: <IoIosLock className="text-2xl" />,
      name: "Password & Security",
    },
    "/setting/review-history": {
      icon: <PiChatFill className="text-2xl" />,
      name: "Review History",
    },
    "/setting/chat": {
      icon: <BsChatDotsFill className="text-2xl" />,
      name: "Support",
    },
  };

  // Tìm path hiện tại dựa trên `location.pathname`
  const currentPath = location.pathname;
  const details = Object.entries(pageDetails).find(([key, value]) =>
    value.pattern ? value.pattern.test(currentPath) : key === currentPath,
  )?.[1] || {
    icon: <FaChevronDown className="text-2xl" />,
    name: "Unknown",
  };

  return (
    <>
      <div className="bg-white">
        <div
          onClick={toggleDropdown}
          className="flex cursor-pointer items-center justify-center space-x-2 py-5"
        >
          {details.icon}
          <span>{details.name}</span>
          <span>{isOpen ? <FaChevronUp /> : <FaChevronDown />}</span>
        </div>

        <ul
          className={`${
            isOpen ? "px-[30px] py-5" : ""
          } rounded transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden`}
        >
          <li>
            <NavLink
              to={`/setting/user-info`}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => {
                return isActive
                  ? "flex items-center border-b px-5 py-1"
                  : "flex items-center border-b bg-transparent px-5 py-1 text-textSidebar transition duration-300 ease-in-out hover:bg-[#F2F2F2] hover:text-black";
              }}
            >
              <div className="flex h-10 w-10 items-center justify-center">
                <BiSolidUser className="text-2xl" />
              </div>
              <p className="p-[10px] text-xs font-bold uppercase">
                Account Settings
              </p>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/setting/order-history`}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => {
                return isActive
                  ? "flex items-center border-b px-5 py-1"
                  : "flex items-center border-b bg-transparent px-5 py-1 text-textSidebar transition duration-300 ease-in-out hover:bg-[#F2F2F2] hover:text-black";
              }}
            >
              <div className="flex h-10 w-10 items-center justify-center">
                <RiShoppingCart2Fill className="text-2xl" />
              </div>
              <p className="p-[10px] text-xs font-bold uppercase">
                Order History
              </p>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/setting/transaction`}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => {
                return isActive
                  ? "flex items-center border-b px-5 py-1"
                  : "flex items-center border-b bg-transparent px-5 py-1 text-textSidebar transition duration-300 ease-in-out hover:bg-[#F2F2F2] hover:text-black";
              }}
            >
              <div className="flex h-10 w-10 items-center justify-center">
                <AiFillClockCircle className="text-2xl" />
              </div>
              <p className="p-[10px] text-xs font-bold uppercase">
                Transactions
              </p>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/setting/security`}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => {
                return isActive
                  ? "flex items-center border-b px-5 py-1"
                  : "flex items-center border-b bg-transparent px-5 py-1 text-textSidebar transition duration-300 ease-in-out hover:bg-[#F2F2F2] hover:text-black";
              }}
            >
              <div className="flex h-10 w-10 items-center justify-center">
                <IoIosLock className="text-2xl" />
              </div>
              <p className="p-[10px] text-xs font-bold uppercase">
                Password & Security
              </p>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/setting/review-history`}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => {
                return isActive
                  ? "flex items-center border-b px-5 py-1"
                  : "flex items-center border-b bg-transparent px-5 py-1 text-textSidebar transition duration-300 ease-in-out hover:bg-[#F2F2F2] hover:text-black";
              }}
            >
              <div className="flex h-10 w-10 items-center justify-center">
                <PiChatFill className="text-2xl" />
              </div>
              <p className="p-[10px] text-xs font-bold uppercase">
                Review History
              </p>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/setting/chat`}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => {
                return isActive
                  ? "flex items-center border-b px-5 py-1"
                  : "flex items-center border-b bg-transparent px-5 py-1 text-textSidebar transition duration-300 ease-in-out hover:bg-[#F2F2F2] hover:text-black";
              }}
            >
              <div className="flex h-10 w-10 items-center justify-center">
                <BsChatDotsFill className="text-2xl" />
              </div>
              <p className="p-[10px] text-xs font-bold uppercase">Support</p>
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};
