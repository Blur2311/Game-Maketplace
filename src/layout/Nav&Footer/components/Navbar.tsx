import { Button } from "primereact/button";
import { OverlayPanel } from "primereact/overlaypanel";
import { useEffect, useRef, useState } from "react";
import { FaRegPlusSquare } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import {
  getCurrentUser,
  getUsernameFromToken,
  signOut,
  User,
} from "../../../utils/AuthUtils";
import { Avatar } from "primereact/avatar";
import { formatCurrency } from "../../../utils/OtherUtils";

export const Navbar = () => {
  const op = useRef<OverlayPanel>(null);
  const username = getUsernameFromToken();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (username) {
      getCurrentUser().then((user: User | null) => {
        if (user) {
          setUser(user);
        }
      });
    }
  }, []);

  return (
    // Trang này nó responsive làm nhớ để ý kỹ ko rõ thì liên hệ Huy
    <>
      <div className="px-4 py-5 sm:mx-6">
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
                  <li className="cursor-pointer rounded-lg px-4 py-2 hover:bg-gray200 hover:bg-opacity-50">
                    <p>Account Balance:</p>
                    <div className="flex items-center gap-2">
                      {formatCurrency(user?.balance || 0)}
                      <FaRegPlusSquare className="text-lg" />
                    </div>
                  </li>
                  <li>
                    <Link
                      to="/setting/user-info"
                      className="block cursor-pointer rounded-lg px-4 py-2 hover:bg-gray200 hover:bg-opacity-50"
                    >
                      Account Info
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/setting/transaction"
                      className="block cursor-pointer rounded-lg px-4 py-2 hover:bg-gray200 hover:bg-opacity-50"
                    >
                      Transactions
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/wishlist"
                      className="block cursor-pointer rounded-lg px-4 py-2 hover:bg-gray200 hover:bg-opacity-50"
                    >
                      Wishlist
                    </Link>
                  </li>
                  <li
                    className="cursor-pointer rounded-lg px-4 py-2 hover:bg-gray200 hover:bg-opacity-50"
                    onClick={signOut}
                  >
                    Sign Out
                  </li>
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
