import React, { useState } from "react";
import { IoChevronForward } from "react-icons/io5";
import { NavLink, useLocation } from "react-router-dom";

type CustomSidebarProps = {
  Icon: React.ElementType;
  name: string;
  names: string;
  listLink: string;
  createLink?: string;
  detailLink: string;
  location: string;
  onLinkClick: () => void;
};

export const CustomSidebar: React.FC<CustomSidebarProps> = (props) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = location.pathname.startsWith(props.location);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="">
      {/* Header Section */}
      <div
        className={`flex h-10 items-center justify-between rounded-lg bg-transparent px-[16px] py-[6px] ${isActive ? "text-white" : "text-textAdminGray"} transition duration-300 ease-in-out hover:bg-bgCheckBox hover:text-white`}
        onClick={toggleOpen}
      >
        <div className="flex items-center gap-2">
          <props.Icon className="text-xl" />
          <p className="text-sm font-medium">{props.names}</p>
        </div>
        <span
          className={`transform transition-transform ${isOpen ? "rotate-90" : ""}`}
        >
          <IoChevronForward />
        </span>
      </div>

      {/* Collapsible Items */}
      {isOpen && (
        <div className="ps-6 text-white">
          <div className="border-l border-[#434a60] ps-3">
            <ul className="flex flex-col gap-2">
              <li className="relative">
                <NavLink
                  to={props.listLink}
                  onClick={props.onLinkClick}
                  className={({ isActive }) => {
                    return isActive
                      ? "flex h-10 items-center gap-2 rounded-lg bg-mainYellow px-[16px] py-[6px] text-sm text-white"
                      : "flex h-10 items-center gap-2 rounded-lg bg-transparent px-[16px] py-[6px] text-sm text-textAdminGray transition duration-300 ease-in-out hover:bg-bgCheckBox hover:text-white";
                  }}
                >
                  {({ isActive }) => (
                    <>
                      <span>
                        List <span className="lowercase">{props.names}</span>
                      </span>
                      {/* Chỉ hiển thị div khi NavLink đang active */}
                      {isActive && (
                        <div className="absolute left-[-14px] top-1/2 h-5 w-[3px] -translate-y-1/2 transform rounded-sm bg-[#8a94a6]"></div>
                      )}
                    </>
                  )}
                </NavLink>
              </li>
              {props.createLink && (
                <li className="relative">
                  <NavLink
                    to={props.createLink}
                    onClick={props.onLinkClick}
                    className={({ isActive }) => {
                      return isActive
                        ? "flex h-10 items-center gap-2 rounded-lg bg-mainYellow px-[16px] py-[6px] text-sm text-white"
                        : "flex h-10 items-center gap-2 rounded-lg bg-transparent px-[16px] py-[6px] text-sm text-textAdminGray transition duration-300 ease-in-out hover:bg-bgCheckBox hover:text-white";
                    }}
                  >
                    {({ isActive }) => (
                      <>
                        <span>
                          Create <span className="lowercase">{props.name}</span>
                        </span>

                        {/* Chỉ hiển thị div khi NavLink đang active */}
                        {isActive && (
                          <div className="absolute left-[-14px] top-1/2 h-5 w-[3px] -translate-y-1/2 transform rounded-sm bg-[#8a94a6]"></div>
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
              )}

              <li className="relative">
                <NavLink
                  to={props.detailLink}
                  onClick={props.onLinkClick}
                  className={({ isActive }) => {
                    return isActive
                      ? "flex h-10 items-center gap-2 rounded-lg bg-mainYellow px-[16px] py-[6px] text-sm text-white"
                      : "flex h-10 items-center gap-2 rounded-lg bg-transparent px-[16px] py-[6px] text-sm text-textAdminGray transition duration-300 ease-in-out hover:bg-bgCheckBox hover:text-white";
                  }}
                >
                  {({ isActive }) => (
                    <>
                      {props.name} details
                      {/* Chỉ hiển thị div khi NavLink đang active */}
                      {isActive && (
                        <div className="absolute left-[-14px] top-1/2 h-5 w-[3px] -translate-y-1/2 transform rounded-sm bg-[#8a94a6]"></div>
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
