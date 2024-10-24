import { BreadCrumb } from "primereact/breadcrumb";
import { OverlayPanel } from "primereact/overlaypanel";
import { useRef } from "react";
import { BsBellFill } from "react-icons/bs";
import { FaRegPlusSquare } from "react-icons/fa";
import { FiTag, FiUser, FiPercent } from "react-icons/fi";
import { HiOutlineChartPie } from "react-icons/hi";
import { LuShoppingCart, LuBarChart4 } from "react-icons/lu";
import { Link } from "react-router-dom";
import { NavLink, Outlet } from "react-router-dom";

export const AdminLayout = () => {
  const op = useRef<OverlayPanel>(null);
  const items = [
    {
      template: () => (
        <Link to={"/"} className="text-textAdminGray font-semibold">
          Categories
        </Link>
      ),
    },
    {
      template: () => <span className="font-bold text-black">List</span>,
    },
  ];
  return (
    <>
      <div className="flex h-full">
        <div className="h-max min-h-screen shadow-navBoxshadow">
          <div className="flex flex-col items-center gap-3 border-b-2 border-borderSubdued p-5">
            <img src="/logo.png" alt="" className="w-20" />
            <p className="text-xl font-bold uppercase text-white">
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
                    : "text-textAdminGray flex items-center rounded bg-transparent px-5 py-1 transition duration-300 ease-in-out hover:bg-mainYellow hover:text-white";
                }}
              >
                <div className="flex h-10 w-10 items-center justify-center">
                  <HiOutlineChartPie className="text-2xl" />
                </div>
                <p className="p-[10px] text-xs font-bold uppercase">Overview</p>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`/setting/user-info`}
                className={({ isActive }) => {
                  return isActive
                    ? "flex items-center rounded bg-mainYellow px-5 py-1 text-white"
                    : "text-textAdminGray flex items-center rounded bg-transparent px-5 py-1 transition duration-300 ease-in-out hover:bg-mainYellow hover:text-white";
                }}
              >
                <div className="flex h-10 w-10 items-center justify-center">
                  <LuShoppingCart className="text-2xl" />
                </div>
                <p className="p-[10px] text-xs font-bold uppercase">Products</p>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`/admin/category-list`}
                className={({ isActive }) => {
                  return isActive
                    ? "flex items-center rounded bg-mainYellow px-5 py-1 text-white"
                    : "text-textAdminGray flex items-center rounded bg-transparent px-5 py-1 transition duration-300 ease-in-out hover:bg-mainYellow hover:text-white";
                }}
              >
                <div className="flex h-10 w-10 items-center justify-center">
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
                    : "text-textAdminGray flex items-center rounded bg-transparent px-5 py-1 transition duration-300 ease-in-out hover:bg-mainYellow hover:text-white";
                }}
              >
                <div className="flex h-10 w-10 items-center justify-center">
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
                    : "text-textAdminGray flex items-center rounded bg-transparent px-5 py-1 transition duration-300 ease-in-out hover:bg-mainYellow hover:text-white";
                }}
              >
                <div className="flex h-10 w-10 items-center justify-center">
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
                    : "text-textAdminGray flex items-center rounded bg-transparent px-5 py-1 transition duration-300 ease-in-out hover:bg-mainYellow hover:text-white";
                }}
              >
                <div className="flex h-10 w-10 items-center justify-center">
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
          <div className="flex w-full items-center justify-between border-b-2 border-borderSubdued p-5 shadow-sm">
            <BreadCrumb model={items} />
            <div className="flex cursor-pointer items-center gap-6">
              <BsBellFill className="text-xl" />
              <div
                className="flex items-center gap-3 hover:opacity-80"
                onClick={(e) => op.current?.toggle(e)}
              >
                <img src="/cat.jpeg" alt="" className="h-8 w-8 rounded-full" />
                {/* Không có hình ảnh thì hiển thị cái này
              <Avatar
                icon="pi pi-user"
                // style={{ backgroundColor: "#9c27b0", color: "#ffffff" }}
                className="bg-grayBorder text-white"
                shape="circle"
              /> */}
                <p className="text-sm font-semibold text-black">User Name</p>
              </div>
              <OverlayPanel
                ref={op}
                className="min-w-56 rounded-xl border border-borderSubdued bg-gray300 bg-opacity-80 shadow-navBoxshadow backdrop-blur-lg"
              >
                <ul className="text-white">
                  <li className="cursor-pointer rounded-lg px-4 py-2 hover:bg-gray200 hover:bg-opacity-50">
                    <p>Account Balance: </p>
                    <div className="flex items-center gap-2">
                      1.000$
                      <FaRegPlusSquare className="text-lg" />
                    </div>
                  </li>
                  <li className="cursor-pointer rounded-lg px-4 py-2 hover:bg-gray200 hover:bg-opacity-50">
                    Account Info
                  </li>
                  <li className="cursor-pointer rounded-lg px-4 py-2 hover:bg-gray200 hover:bg-opacity-50">
                    Transactions
                  </li>
                  <li className="cursor-pointer rounded-lg px-4 py-2 hover:bg-gray200 hover:bg-opacity-50">
                    Wishlist
                  </li>
                  <li className="cursor-pointer rounded-lg px-4 py-2 hover:bg-gray200 hover:bg-opacity-50">
                    Sign Out
                  </li>
                </ul>
              </OverlayPanel>
            </div>
          </div>
          <div className="ps-6 pt-8">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};
