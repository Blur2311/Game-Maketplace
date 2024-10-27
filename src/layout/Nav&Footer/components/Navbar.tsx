import { Button } from "primereact/button";
import { OverlayPanel } from "primereact/overlaypanel";
import { useRef } from "react";
import { FaRegBell, FaRegPlusSquare } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { getUsernameFromToken, signOut } from "../../../utils/AuthUtils";
import { Avatar } from "primereact/avatar";

export const Navbar = () => {
  const op = useRef<OverlayPanel>(null);
  const username = getUsernameFromToken();
  const navigate = useNavigate();

  return (
    // Trang này nó responsive làm nhớ để ý kỹ ko rõ thì liên hệ Huy
    <>
      <div className="mx-4 my-5 sm:mx-6">
        <div className="flex items-end justify-between">
          <div className="flex items-center gap-3 sm:gap-7">
            <Link to={"/"}>
              <img src="/logo.png" alt="" className="h-8" />
            </Link>
          </div>
          {/* Chưa đăg nhập thì cho nó hiển thị cái này xoá hidden đê là đc */}
          {!username ? (
            <div className="flex items-center gap-4">
              <Button
                label="Sign In"
                className="rounded-lg bg-gray400 px-3 py-1 text-base font-normal text-white hover:bg-gray200"
                onClick={() => {
                  navigate("/sign-in");
                }}
              />
              <Button
                label="Create Account"
                className="hidden rounded-lg bg-mainYellow px-3 py-1 text-base font-normal hover:bg-hoverYellow sm:block"
                onClick={() => {
                  navigate("/register");
                }}
              />
            </div>
          ) : (
            <div className="flex cursor-pointer items-center gap-6">
              <FaRegBell className="text-xl text-white" />
              <div
                className="flex items-center gap-3 hover:opacity-80"
                onClick={(e) => op.current?.toggle(e)}
              >
                {/* <img src="/cat.jpeg" alt="" className="w-8 h-8 rounded-full" /> */}
                {/* Không có hình ảnh thì hiển thị cái này */}
                <Avatar
                  icon="pi pi-user"
                  // style={{ backgroundColor: "#9c27b0", color: "#ffffff" }}
                  className="bg-grayBorder text-white"
                  shape="circle"
                />
                <p className="text-sm text-gray250">{username || "Guest"}</p>
              </div>
              <OverlayPanel
                ref={op}
                className="min-w-56 rounded-xl border border-borderSubdued bg-gray300 bg-opacity-80 shadow-navBoxshadow backdrop-blur-lg"
              >
                <ul className="text-white">
                  <>
                    <li className="cursor-pointer rounded-lg px-4 py-2 hover:bg-gray200 hover:bg-opacity-50">
                      <p>Account Balance: </p>
                      <div className="flex items-center gap-2">
                        1.000$
                        <FaRegPlusSquare className="text-lg" />
                      </div>
                    </li>
                    <li className="cursor-pointer rounded-lg px-4 py-2 hover:bg-gray200 hover:bg-opacity-50">
                      <Link to={"/setting/user-info"}>Account Info</Link>
                    </li>
                    <li className="cursor-pointer rounded-lg px-4 py-2 hover:bg-gray200 hover:bg-opacity-50">
                      Transactions
                    </li>
                    <li className="cursor-pointer rounded-lg px-4 py-2 hover:bg-gray200 hover:bg-opacity-50">
                      Wishlist
                    </li>
                    <li
                      className="cursor-pointer rounded-lg px-4 py-2 hover:bg-gray200 hover:bg-opacity-50"
                      onClick={signOut}
                    >
                      Sign Out
                    </li>
                  </>
                </ul>
              </OverlayPanel>
            </div>
          )}
          {/* Đăg nhập rồi thì hidden cái kia hiển thị cái này */}
        </div>
      </div>
    </>
  );
};
