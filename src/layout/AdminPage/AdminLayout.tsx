import { OverlayPanel } from "primereact/overlaypanel";
import { useRef } from "react";
import { BsBellFill } from "react-icons/bs";
import { FaGamepad, FaRegPlusSquare } from "react-icons/fa";
import { FiPercent, FiTag, FiUser } from "react-icons/fi";
import { HiOutlineChartPie } from "react-icons/hi";
import { LuBarChart4 } from "react-icons/lu";
import { Link, NavLink, Outlet } from "react-router-dom";
import {
  getUsernameFromToken,
  signOut,
  useAuthCheck,
} from "../../utils/AuthUtils";

export const AdminLayout = () => {
  const op = useRef<OverlayPanel>(null);
  const username = getUsernameFromToken();
  useAuthCheck(["ADMIN"]);
  // const items = [
  //   {
  //     template: () => (
  //       <Link to={"/"} className="font-semibold text-textAdminGray">
  //         Categories
  //       </Link>
  //     ),
  //   },
  //   {
  //     template: () => <span className="font-bold text-black">List</span>,
  //   },
  // ];
  return (
    <>
      <div className="flex h-full">
        <div className="min-h-screen h-max shadow-navBoxshadow">
          <div className="flex flex-col items-center gap-3 p-5 border-b-2 border-borderSubdued">
            <img src="/logo.png" alt="" className="w-20" />
            <p className="text-xl font-bold text-white uppercase">
              Administrator
            </p>
          </div>
          <ul className="mt-[50px] rounded">
            <li>
              <NavLink
                to={`/setting/user-info`}
                className={({ isActive }) => {
                  return isActive
                    ? "flex items-center rounded bg-mainYellow px-5 py-1 text-white"
                    : "flex items-center rounded bg-transparent px-5 py-1 text-textAdminGray transition duration-300 ease-in-out hover:bg-mainYellow hover:text-white";
                }}
              >
                <div className="flex items-center justify-center w-10 h-10">
                  <HiOutlineChartPie className="text-2xl" />
                </div>
                <p className="p-[10px] text-xs font-bold uppercase">Overview</p>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`/admin/game-list`}
                className={({ isActive }) => {
                  return isActive
                    ? "flex items-center rounded bg-mainYellow px-5 py-1 text-white"
                    : "flex items-center rounded bg-transparent px-5 py-1 text-textAdminGray transition duration-300 ease-in-out hover:bg-mainYellow hover:text-white";
                }}
              >
                <div className="flex items-center justify-center w-10 h-10">
                  <FaGamepad className="text-2xl" />
                </div>
                <p className="p-[10px] text-xs font-bold uppercase">Game</p>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`/admin/category-list`}
                className={({ isActive }) => {
                  return isActive
                    ? "flex items-center rounded bg-mainYellow px-5 py-1 text-white"
                    : "flex items-center rounded bg-transparent px-5 py-1 text-textAdminGray transition duration-300 ease-in-out hover:bg-mainYellow hover:text-white";
                }}
              >
                <div className="flex items-center justify-center w-10 h-10">
                  <FiTag className="text-2xl" />
                </div>
                <p className="p-[10px] text-xs font-bold uppercase">
                  categories
                </p>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`/setting/user-info`}
                className={({ isActive }) => {
                  return isActive
                    ? "flex items-center rounded bg-mainYellow px-5 py-1 text-white"
                    : "flex items-center rounded bg-transparent px-5 py-1 text-textAdminGray transition duration-300 ease-in-out hover:bg-mainYellow hover:text-white";
                }}
              >
                <div className="flex items-center justify-center w-10 h-10">
                  <FiUser className="text-2xl" />
                </div>
                <p className="p-[10px] text-xs font-bold uppercase">Accounts</p>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`/setting/user-info`}
                className={({ isActive }) => {
                  return isActive
                    ? "flex items-center rounded bg-mainYellow px-5 py-1 text-white"
                    : "flex items-center rounded bg-transparent px-5 py-1 text-textAdminGray transition duration-300 ease-in-out hover:bg-mainYellow hover:text-white";
                }}
              >
                <div className="flex items-center justify-center w-10 h-10">
                  <FiPercent className="text-2xl" />
                </div>
                <p className="p-[10px] text-xs font-bold uppercase">
                  Promotion & discount
                </p>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`/setting/user-info`}
                className={({ isActive }) => {
                  return isActive
                    ? "flex items-center rounded bg-mainYellow px-5 py-1 text-white"
                    : "flex items-center rounded bg-transparent px-5 py-1 text-textAdminGray transition duration-300 ease-in-out hover:bg-mainYellow hover:text-white";
                }}
              >
                <div className="flex items-center justify-center w-10 h-10">
                  <LuBarChart4 className="text-2xl" />
                </div>
                <p className="p-[10px] text-xs font-bold uppercase">
                  report & statistics
                </p>
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="flex-1 bg-white">
          <div className="flex items-center justify-end w-full p-5 border-b-2 shadow-sm border-borderSubdued">
            {/* <BreadCrumb model={items} /> */}
            <div className="flex items-center gap-6 cursor-pointer">
              <BsBellFill className="text-xl" />
              <div
                className="flex items-center gap-3 hover:opacity-80"
                onClick={(e) => op.current?.toggle(e)}
              >
                <img src="/cat.jpeg" alt="" className="w-8 h-8 rounded-full" />
                {/* Không có hình ảnh thì hiển thị cái này
              <Avatar
                icon="pi pi-user"
                // style={{ backgroundColor: "#9c27b0", color: "#ffffff" }}
                className="text-white bg-grayBorder"
                shape="circle"
              /> */}
                <p className="text-sm font-semibold text-black">{username}</p>
              </div>
              <OverlayPanel
                ref={op}
                className="border min-w-56 rounded-xl border-borderSubdued bg-gray300 bg-opacity-80 shadow-navBoxshadow backdrop-blur-lg"
              >
                <ul className="text-white">
                  <li className="px-4 py-2 rounded-lg cursor-pointer hover:bg-gray200 hover:bg-opacity-50">
                    <p>Account Balance: </p>
                    <div className="flex items-center gap-2">
                      1.000$
                      <FaRegPlusSquare className="text-lg" />
                    </div>
                  </li>
                  <li className="px-4 py-2 rounded-lg cursor-pointer hover:bg-gray200 hover:bg-opacity-50">
                    <Link to={"/setting/user-info"}>Account Info</Link>
                  </li>
                  <li className="px-4 py-2 rounded-lg cursor-pointer hover:bg-gray200 hover:bg-opacity-50">
                    Transactions
                  </li>
                  <li className="px-4 py-2 rounded-lg cursor-pointer hover:bg-gray200 hover:bg-opacity-50">
                    Wishlist
                  </li>
                  <li
                    className="px-4 py-2 rounded-lg cursor-pointer hover:bg-gray200 hover:bg-opacity-50"
                    onClick={signOut}
                  >
                    Sign Out
                  </li>
                </ul>
              </OverlayPanel>
            </div>
          </div>
          <div className="pt-8 ps-6">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};
