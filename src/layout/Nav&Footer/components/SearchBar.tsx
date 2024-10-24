import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export const SearchBar = () => {
  const [selectedItem, setSelectedItem] = useState<string | null>("1");
  const onOptionChange = (e: any) => {
    setSelectedItem(e.value);
  };

  const options = [
    { label: "Discover", value: "1", link: "/" },
    { label: "Browse", value: "2", link: "/browser" },
    { label: "News", value: "3", link: "/news" },
  ];
  const optionTemplate = (option: any) => {
    return (
      <Link to={option.link} className="dropdown-item">
        {option.label}
      </Link>
    );
  };
  return (
    <>
      <div className="sticky top-0 z-50 mx-auto h-[100px] w-11/12 bg-bgMainColor md:w-3/4">
        <div className="flex h-full items-center justify-between">
          <div className="flex items-center">
            <div className="relative rounded-full bg-gray300">
              <i className="pi pi-search absolute left-3 top-1/2 -translate-y-1/2 transform text-gray100"></i>
              <InputText
                placeholder="Search store"
                className="w-[230px] bg-transparent p-3 pl-10 text-xs text-white focus:ring-0"
              />
            </div>
            <div className="ml-5 hidden lg:block">
              <ul className="flex items-center gap-8 text-sm font-normal text-gray150">
                <li className="">
                  <NavLink
                    to={`/`}
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
            <div className="ml-5 block lg:hidden">
              <Dropdown
                value={selectedItem}
                options={options}
                onChange={onOptionChange}
                optionLabel="label"
                valueTemplate={optionTemplate}
                itemTemplate={optionTemplate}
                className="custom-dropdown bg-transparent !font-inter focus:outline-none focus:ring-0"
              />
            </div>
          </div>
          {/* Cái này cũg thế kô rõ thì lên trên epic game xem */}
          <div className="">
            <ul className="flex items-center gap-8 text-sm font-normal text-gray150">
              <li className="text-white">Wishlist</li>
              <li className="hover:text-white">Cart</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
