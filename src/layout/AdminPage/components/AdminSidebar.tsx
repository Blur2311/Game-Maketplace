import { AiOutlineWechat } from "react-icons/ai";
import { FaGamepad } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import { FiPercent, FiSettings, FiTag, FiUsers } from "react-icons/fi";
import { GoHome } from "react-icons/go";
import { LuBarChart4 } from "react-icons/lu";
import { TbFileInvoice } from "react-icons/tb";
import { Link, NavLink } from "react-router-dom";
import { getDecodeToken } from "../../../utils/AuthUtils";
import { CustomSidebar } from "./CustomSidebar";

type AdminSidebarProps = {
  onLinkClick: () => void;
};

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ onLinkClick }) => {
  return (
    <>
      <div className="h-screen w-[280px] overflow-y-auto shadow-navBoxshadow">
        <div className="p-4">
          <Link to={"/"}>
            <img src="/logo.png" alt="" className="h-8" />
          </Link>
        </div>

        <div className="p-4 rounded">
          <ul className="flex flex-col gap-4">
            {getDecodeToken()?.role === "ADMIN" && (
              <li className="flex flex-col gap-2">
                <div>
                  <p className="text-sm font-medium text-[#8a94a6]">
                    Dashboards
                  </p>
                </div>
                <div>
                  <ul className="flex flex-col gap-2">
                    <li>
                      <NavLink
                        to={`/admin/home`}
                        onClick={onLinkClick}
                        className={({ isActive }) => {
                          return isActive
                            ? "flex h-10 items-center gap-2 rounded-lg bg-mainYellow px-[16px] py-[6px] text-white"
                            : "flex h-10 items-center gap-2 rounded-lg bg-transparent px-[16px] py-[6px] text-textAdminGray transition duration-300 ease-in-out hover:bg-bgCheckBox hover:text-white";
                        }}
                      >
                        <GoHome className="text-xl" />
                        <p className="text-sm font-medium">Home</p>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to={`/admin/analytic`}
                        onClick={onLinkClick}
                        className={({ isActive }) => {
                          return isActive
                            ? "flex h-10 items-center gap-2 rounded-lg bg-mainYellow px-[16px] py-[6px] text-white"
                            : "flex h-10 items-center gap-2 rounded-lg bg-transparent px-[16px] py-[6px] text-textAdminGray transition duration-300 ease-in-out hover:bg-bgCheckBox hover:text-white";
                        }}
                      >
                        <LuBarChart4 className="text-xl" />
                        <p className="text-sm font-medium">Analytics</p>
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </li>
            )}
            {getDecodeToken()?.role === "ADMIN" && (
              <li className="flex flex-col gap-2">
                <div>
                  <p className="text-sm font-medium text-[#8a94a6]">General</p>
                </div>
                <div>
                  <ul className="flex flex-col gap-2">
                    <li>
                      <CustomSidebar
                        Icon={FaGamepad}
                        names={"Games"}
                        name={"Game"}
                        listLink={"/admin/game/list"}
                        createLink={"/admin/game/create"}
                        detailLink={"/admin/game/detail/1"}
                        location={"/admin/game"}
                        onLinkClick={onLinkClick}
                      />
                    </li>
                    <li>
                      <CustomSidebar
                        Icon={FiUsers}
                        names={"Customers"}
                        name={"Customer"}
                        listLink={"/admin/customer/list"}
                        createLink={"/admin/customer/create"}
                        detailLink={"/admin/customer/detail/1"}
                        location={"/admin/customer"}
                        onLinkClick={onLinkClick}
                      />
                    </li>
                    <li>
                      <CustomSidebar
                        Icon={TbFileInvoice}
                        names={"Invoices"}
                        name={"Invoice"}
                        listLink={"/admin/invoice/list"}
                        detailLink={"/admin/invoice/detail/1"}
                        location={"/admin/invoice"}
                        onLinkClick={onLinkClick}
                      />
                    </li>
                    <li>
                      <CustomSidebar
                        Icon={FiPercent}
                        names={"Vouchers"}
                        name={"Voucher"}
                        listLink={"/admin/voucher/list"}
                        createLink={"/admin/voucher/create"}
                        detailLink={"/admin/voucher/detail/1"}
                        location={"/admin/voucher"}
                        onLinkClick={onLinkClick}
                      />
                    </li>

                    <li>
                      <CustomSidebar
                        Icon={FiTag}
                        names={"Categories"}
                        name={"Category"}
                        listLink={"/admin/category/list"}
                        createLink={"/admin/category/create"}
                        detailLink={"/admin/category/detail/1"}
                        location={"/admin/category"}
                        onLinkClick={onLinkClick}
                      />
                    </li>
                  </ul>
                </div>
              </li>
            )}
            <li className="flex flex-col gap-2">
              <div hidden={getDecodeToken()?.role !== "ADMIN"}>
                <p className="text-sm font-medium text-[#8a94a6]">Other</p>
              </div>
              <div>
                <ul className="flex flex-col gap-2">
                  <li>
                    <NavLink
                      to={`/admin/chat-manage`}
                      onClick={onLinkClick}
                      className={({ isActive }) => {
                        return isActive
                          ? "flex h-10 items-center gap-2 rounded-lg bg-mainYellow px-[16px] py-[6px] text-white"
                          : "flex h-10 items-center gap-2 rounded-lg bg-transparent px-[16px] py-[6px] text-textAdminGray transition duration-300 ease-in-out hover:bg-bgCheckBox hover:text-white";
                      }}
                    >
                      <AiOutlineWechat className="text-xl" />
                      <p className="text-sm font-medium">Chat Support</p>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={`/admin/account-info`}
                      onClick={onLinkClick}
                      className={({ isActive }) => {
                        return isActive
                          ? "flex h-10 items-center gap-2 rounded-lg bg-mainYellow px-[16px] py-[6px] text-white"
                          : "flex h-10 items-center gap-2 rounded-lg bg-transparent px-[16px] py-[6px] text-textAdminGray transition duration-300 ease-in-out hover:bg-bgCheckBox hover:text-white";
                      }}
                    >
                      <FaRegCircleUser className="text-xl" />
                      <p className="text-sm font-medium">Account</p>
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to={`/admin/settings`}
                      onClick={onLinkClick}
                      className={({ isActive }) => {
                        return isActive
                          ? "flex h-10 items-center gap-2 rounded-lg bg-mainYellow px-[16px] py-[6px] text-white"
                          : "flex h-10 items-center gap-2 rounded-lg bg-transparent px-[16px] py-[6px] text-textAdminGray transition duration-300 ease-in-out hover:bg-bgCheckBox hover:text-white";
                      }}
                    >
                      <FiSettings className="text-xl" />
                      <p className="text-sm font-medium">Settings</p>
                    </NavLink>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
