import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { OverlayPanel } from "primereact/overlaypanel";
import { useRef, useState } from "react";
import { FaRegBell, FaRegPlusSquare } from "react-icons/fa";

export const Navbar = () => {
  const [selectedItem, setSelectedItem] = useState<string | null>();

  const op = useRef<OverlayPanel>(null);

  const onOptionChange = (e: any) => {
    setSelectedItem(e.value);
  };
  const options: any[] = [
    { label: "Discover", value: "1" },
    { label: "Browse", value: "2" },
    { label: "News", value: "3" },
  ];

  return (
    // Trang này nó responsive làm nhớ để ý kỹ ko rõ thì liên hệ Huy
    <>
      <div className="mx-4 my-5 sm:mx-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-7">
            <img src="/cat.jpeg" alt="" className="h-8 w-8" />
            <a
              href="#"
              className="text-2xl font-extrabold text-white hover:opacity-80"
            >
              STORE
            </a>
          </div>
          {/* Chưa đăg nhập thì cho nó hiển thị cái này xoá hidden đê là đc */}
          <div className="flex hidden items-center gap-4">
            <Button
              label="Sign In"
              className="rounded-lg bg-gray400 px-3 py-1 text-base font-normal text-white hover:bg-gray200"
            />
            <Button
              label="Create Account"
              className="hidden rounded-lg bg-mainYellow px-3 py-1 text-base font-normal hover:bg-hoverYellow sm:block"
            />
          </div>
          {/* Đăg nhập rồi thì hidden cái kia hiển thị cái này */}
          <div className="flex cursor-pointer items-center gap-6">
            <FaRegBell className="text-xl text-white" />
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
              <p className="text-sm text-gray250">User Name</p>
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
      </div>
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
                <li className="text-white">Discover</li>
                <li className="hover:text-white">Browse</li>
                <li className="hover:text-white">News</li>
              </ul>
            </div>
          </div>
          {/* Cái này cũg thế kô rõ thì lên trên epic game xem */}
          <div className="hidden lg:block">
            <ul className="flex items-center gap-8 text-sm font-normal text-gray150">
              <li className="text-white">Wishlist</li>
              <li className="hover:text-white">Cart</li>
            </ul>
          </div>
          <div className="block lg:hidden">
            <Dropdown
              value={selectedItem}
              options={options}
              defaultValue={"1"}
              onChange={onOptionChange}
              className="custom-dropdown bg-transparent !font-inter focus:outline-none focus:ring-0"
            />
          </div>
        </div>
      </div>
    </>
  );
};
