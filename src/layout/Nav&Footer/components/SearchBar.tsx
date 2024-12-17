import { InputText } from "primereact/inputtext";
import { OverlayPanel } from "primereact/overlaypanel";
import { useRef, useState } from "react";
import {
  MdKeyboardArrowDown,
  MdListAlt,
  MdOutlineShoppingCart,
} from "react-icons/md";
import { NavLink, useLocation } from "react-router-dom";

export const SearchBar = () => {
  const op = useRef<OverlayPanel>(null); // Ref cho OverlayPanel
  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();
  const menuItems = [
    { label: "Discover", link: "/home" },
    { label: "Browse", link: "/browser" },
    { label: "News", link: "/news" },
  ];

  const activeItem = menuItems.find((item) => item.link === location.pathname);

  const toggleOverlay = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsOpen(!isOpen);
    op.current?.toggle(e); // Hiển thị OverlayPanel
  };

  const onNavLinkClick = () => {
    op.current?.hide();
    setIsOpen(false);
  };

  const onHide = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="sticky top-0 z-50 h-[100px] bg-bgMainColor pt-3 sm:pt-0">
        <div className="mx-auto flex h-full w-11/12 flex-col justify-between sm:flex-row sm:items-center lg:w-3/4">
          <div className="w-full sm:w-[230px]">
            <div className="relative rounded-full bg-gray300">
              <i className="pi pi-search absolute left-3 top-1/2 -translate-y-1/2 transform text-gray100"></i>
              <InputText
                placeholder="Search store"
                className="bg-transparent p-3 pl-10 text-xs text-white focus:ring-0"
              />
            </div>
          </div>
          <div className="flex flex-1 items-center justify-between">
            <div className="hidden sm:ml-5 lg:block">
              <ul className="flex items-center gap-8 text-sm font-normal text-gray150">
                <li className="">
                  <NavLink
                    to={`/home`}
                    className={({ isActive }) => {
                      return isActive ? "text-white" : "hover:text-white";
                    }}
                  >
                    Discover
                  </NavLink>
                </li>
                <li className="">
                  <NavLink
                    to={`/browser`}
                    className={({ isActive }) => {
                      return isActive ? "text-white" : "hover:text-white";
                    }}
                  >
                    Browse
                  </NavLink>
                </li>
                <li className="">
                  <NavLink
                    to={`/news`}
                    className={({ isActive }) => {
                      return isActive ? "text-white" : "hover:text-white";
                    }}
                  >
                    News
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className="block sm:ml-5 lg:hidden">
              <div className="relative flex items-center justify-center">
                {/* Button */}
                <button
                  type="button"
                  onClick={toggleOverlay}
                  className={`relative flex h-10 items-center rounded bg-transparent px-3 text-sm ${activeItem?.label ? "text-white" : "text-gray150"} ${isOpen ? "border-2 border-white" : ""}`}
                >
                  {activeItem?.label || "Discover"}
                  <MdKeyboardArrowDown
                    size={17}
                    className={`ml-1 transform transition-transform duration-300 ${
                      isOpen ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>

                {/* OverlayPanel */}
                <OverlayPanel
                  ref={op}
                  onHide={onHide}
                  className="shadow-dropdownShadow rounded-lg bg-black bg-opacity-90 !p-0 !font-inter"
                >
                  <ul className="text-sm">
                    {menuItems.map((item, index) => (
                      <li key={index} className="px-4 py-2">
                        <NavLink
                          to={item.link}
                          onClick={onNavLinkClick}
                          className={({ isActive }) =>
                            `block ${
                              isActive
                                ? "text-white"
                                : "text-gray150 hover:text-white"
                            }`
                          }
                        >
                          {item.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </OverlayPanel>
              </div>
            </div>
            <div className="">
              <ul className="flex items-center text-sm font-normal text-gray150 lg:gap-8">
                <li className="">
                  <NavLink
                    to={`/wishlist`}
                    className={({ isActive }) => {
                      return isActive ? "text-white" : "hover:text-white";
                    }}
                  >
                    <span className="hidden lg:block">Wishlist</span>
                    <div className="block p-2 lg:hidden">
                      <MdListAlt size={20} />
                    </div>
                  </NavLink>
                </li>
                <li className="">
                  <NavLink
                    to={`/cart`}
                    className={({ isActive }) => {
                      return isActive ? "text-white" : "hover:text-white";
                    }}
                  >
                    <span className="hidden lg:block">Cart</span>
                    <div className="block p-2 lg:hidden">
                      <MdOutlineShoppingCart size={20} />
                    </div>
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
