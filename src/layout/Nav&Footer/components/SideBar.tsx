import { AiFillClockCircle } from "react-icons/ai";
import { BiSolidUser } from "react-icons/bi";
import { IoIosLock } from "react-icons/io";
import { PiChatFill } from "react-icons/pi";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { BsChatDotsFill } from "react-icons/bs";

export const SideBar = () => {
  return (
    <>
      <div className="pl-5">
        <ul className="rounded bg-white">
          <li>
            <NavLink
              to={`/setting/user-info`}
              className={({ isActive }) => {
                return isActive
                  ? "flex items-center rounded bg-[#F2F2F2] px-5 py-1"
                  : "text-textSidebar flex items-center rounded bg-transparent px-5 py-1 transition duration-300 ease-in-out hover:bg-[#F2F2F2] hover:text-black";
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
              className={({ isActive }) => {
                return isActive
                  ? "flex items-center rounded bg-[#F2F2F2] px-5 py-1"
                  : "text-textSidebar flex items-center rounded bg-transparent px-5 py-1 transition duration-300 ease-in-out hover:bg-[#F2F2F2] hover:text-black";
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
              className={({ isActive }) => {
                return isActive
                  ? "flex items-center rounded bg-[#F2F2F2] px-5 py-1"
                  : "text-textSidebar flex items-center rounded bg-transparent px-5 py-1 transition duration-300 ease-in-out hover:bg-[#F2F2F2] hover:text-black";
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
              className={({ isActive }) => {
                return isActive
                  ? "flex items-center rounded bg-[#F2F2F2] px-5 py-1"
                  : "text-textSidebar flex items-center rounded bg-transparent px-5 py-1 transition duration-300 ease-in-out hover:bg-[#F2F2F2] hover:text-black";
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
              className={({ isActive }) => {
                return isActive
                  ? "flex items-center rounded bg-[#F2F2F2] px-5 py-1"
                  : "text-textSidebar flex items-center rounded bg-transparent px-5 py-1 transition duration-300 ease-in-out hover:bg-[#F2F2F2] hover:text-black";
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
              className={({ isActive }) => {
                return isActive
                  ? "flex items-center rounded bg-[#F2F2F2] px-5 py-1"
                  : "text-textSidebar flex items-center rounded bg-transparent px-5 py-1 transition duration-300 ease-in-out hover:bg-[#F2F2F2] hover:text-black";
              }}
            >
              <div className="flex h-10 w-10 items-center justify-center">
                <BsChatDotsFill className="text-2xl" />
              </div>
              <p className="p-[10px] text-xs font-bold uppercase">
                Support
              </p>
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};
