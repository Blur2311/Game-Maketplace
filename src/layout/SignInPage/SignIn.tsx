import { Button } from "primereact/button";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { useEffect, useState } from "react";
import apiClient from "../../apiClient";
import Swal from "sweetalert2";

const LOCKOUT_THRESHOLD = 5;
const LOCKOUT_DURATION = 30 * 60 * 1000;

const getLoginAttempts = () => {
  return parseInt(localStorage.getItem("loginAttempts") || "0", 10);
};

const getLastFailedLoginTime = () => {
  return parseInt(localStorage.getItem("lastFailedLoginTime") || "0", 10);
};

const setLoginAttempts = (attempts: number) => {
  localStorage.setItem("loginAttempts", attempts.toString());
};

const setLastFailedLoginTime = (time: number) => {
  const timeDifference = time - getLastFailedLoginTime();

  if (timeDifference > LOCKOUT_DURATION) {
    setLoginAttempts(1);
  }
  localStorage.setItem("lastFailedLoginTime", time.toString());
};

export const SignIn: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLockedOut, setIsLockedOut] = useState<boolean>(false);

  useEffect(() => {
    const attempts = getLoginAttempts();
    const lastFailedTime = getLastFailedLoginTime();
    const currentTime = Date.now();

    if (
      attempts >= LOCKOUT_THRESHOLD &&
      currentTime - lastFailedTime < LOCKOUT_DURATION
    ) {
      setIsLockedOut(true);
    } else {
      setIsLockedOut(false);
    }
  }, []);
  
  const handleLogin = async () => {
    if (isLockedOut) {
      setError("Bạn đã nhập sai quá nhiều lần. Vui lòng thử lại sau 30 phút.");
      return;
    }
    try {
      const requestBody = { username, password };
      const response = await apiClient.post(`/api/auth/login`, requestBody);

      Swal.fire({
        icon: "success",
        title: "Đăng nhập thành công!",
        text: "Chào mừng bạn quay trở lại!",
      });
      localStorage.setItem("token", response.data.data.token);
      setLoginAttempts(0);
      setLastFailedLoginTime(0);
      setError(null);
    } catch (error) {
      console.error("Login failed:", error);
      setError("Số lần đăng nhập sai: " + getLoginAttempts());

      const attempts = getLoginAttempts() + 1;
      setLoginAttempts(attempts);
      setLastFailedLoginTime(Date.now());

      if (attempts >= LOCKOUT_THRESHOLD) {
        setIsLockedOut(true);
        setError(
          "Bạn đã nhập sai quá nhiều lần. Vui lòng thử lại sau 30 phút.",
        );
      }
    }
  };

  return (
    <>
      <div className="container flex items-center justify-center h-screen mx-auto">
        <div className="flex w-full flex-col items-center rounded-lg bg-gray300 px-5 pb-[60px] pt-[50px] text-white sm:w-[470px] sm:px-14">
          {/* Logo */}
          <img src="/cat.jpeg" alt="" className="mb-[60px] h-14 w-14" />

          {/* <h6 className="mb-5 text-xl font-bold">Sign In</h6> */}
          <div className="flex flex-col items-center gap-6">
            <FloatLabel className="w-full text-sm">
              <InputText
                id="Email"
                className="h-[50px] w-full border border-grayBorder bg-transparent p-5 ps-[10px]"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label htmlFor="Email">Tên người dùng hoặc email</label>
            </FloatLabel>
            <FloatLabel className="text-sm">
              <Password
                // toggleMask
                inputId="Password"
                inputClassName="border-grayBorder h-[50px] border bg-transparent p-5 ps-[10px] first:w-[360px]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="Password">Mật khẩu</label>
            </FloatLabel>
            <div className="w-full text-slate-300">
              <a
                href="/forgot-password"
                className="text-sm font-medium underline hover:text-mainYello"
              >
                Quên mật khẩu?
              </a>
            </div>
            {error && (
              <div className="text-red-500">
                {!isLockedOut && (
                  <p>
                    Lưu ý: Tài khoản sẽ bị tạm khóa 30' nếu liên tục đăng nhập
                    sai 5 lần liên tiếp
                  </p>
                )}
                <p>{error}</p>
              </div>
            )}
            <Button
              label="ĐĂNG NHẬP"
              size="large"
              className="w-full text-base font-bold h-14 bg-mainYello text-slate-900"
              onClick={handleLogin}
              disabled={isLockedOut || !username || !password}
            />
            <div className="mt-10 text-slate-300">
              <a
                href="/register"
                className="text-base font-medium underline hover:text-mainYello"
              >
                Tạo tài khoản mới
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
