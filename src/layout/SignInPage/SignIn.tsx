import { Button } from "primereact/button";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Toast } from "primereact/toast";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { showErrorToast, showInfoToast } from "../../utils/ErrorHandlingUtils";
import {
  getLastFailedLoginTime,
  getLoginAttempts,
  LOCKOUT_DURATION,
  LOCKOUT_THRESHOLD,
  loginUser,
  setLastFailedLoginTime,
  setLoginAttempts,
} from "../../utils/SignInUtils";
import {
  validateEmail,
  validateUsername,
  validatePassword,
} from "../../utils/ValidationUtils";

export const SignIn: React.FC = React.memo(() => {
  const [username, setUsername] = useState<string>(
    localStorage.getItem("email") ?? "",
  );
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLockedOut, setIsLockedOut] = useState<boolean>(false);
  const toast = useRef<Toast>(null);
  const navigate = useNavigate();

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

    // Show info toast on component mount
    showInfoToast(
      toast,
      "Chức năng đăng nhập sẽ bị tạm khóa 30 phút nếu liên tục đăng nhập sai 5 lần liên tiếp",
    );
  }, []);

  useEffect(() => {
    if (error) {
      showErrorToast(toast, error);
    }
  }, [error, isLockedOut]);

  const handleLogin = useCallback(async () => {
    if (isLockedOut) {
      setError("Bạn đã nhập sai quá nhiều lần. Vui lòng thử lại sau 30 phút.");
      return;
    }

    if (!validateEmail(username) && !validateUsername(username)) {
      setError(
        "Tên người dùng không hợp lệ. Vui lòng nhập tên người dùng hợp lệ.",
      );
      return;
    }

    if (!validatePassword(password)) {
      setError("Mật khẩu không hợp lệ. Vui lòng nhập mật khẩu hợp lệ.");
      return;
    }

    try {
      const token = await loginUser(username, password, toast);
      localStorage.setItem("token", token);
      setLoginAttempts(0);
      setLastFailedLoginTime(0);
      setError(null);
      localStorage.removeItem("email");

      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      const attempts = getLoginAttempts() + 1;
      setLoginAttempts(attempts);
      setLastFailedLoginTime(Date.now());

      if (attempts >= LOCKOUT_THRESHOLD) {
        setIsLockedOut(true);
        setError(
          "Bạn đã nhập sai quá nhiều lần. Vui lòng thử lại sau 30 phút.",
        );
      } else {
        setError(`Số lần đăng nhập sai: ${attempts}`);
      }
    }
  }, [isLockedOut, username, password, navigate]);

  return (
    <>
      <Toast ref={toast} position="top-right" />
      <div className="container flex items-center justify-center h-screen mx-auto">
        <div className="flex w-full flex-col items-center rounded-lg bg-gray300 px-5 pb-[60px] pt-[50px] text-white sm:w-[470px] sm:px-14">
          {/* Logo */}
          <img src="/cat.jpeg" alt="" className="mb-[60px] h-14 w-14" />

          <h6 className="mb-5 text-xl font-bold">ĐĂNG NHẬP</h6>
          <div className="flex flex-col items-center gap-6">
            <FloatLabel className="w-full text-sm">
              <InputText
                id="Email"
                className="h-[50px] w-full border border-grayBorder bg-transparent p-5 ps-[10px]"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                aria-invalid={!!error}
                aria-describedby="username-error"
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
                aria-invalid={!!error}
                aria-describedby="password-error"
              />
              <label htmlFor="Password">Mật khẩu</label>
            </FloatLabel>
            <div className="w-full text-slate-300">
              <a
                href="/forgot-password"
                className="text-sm font-medium underline hover:text-mainYellow"
              >
                Quên mật khẩu?
              </a>
            </div>
            <Button
              label="ĐĂNG NHẬP"
              size="large"
              className="w-full text-base font-bold h-14 bg-mainYellow text-slate-900"
              onClick={handleLogin}
              disabled={isLockedOut}
            />
            <div className="mt-10 text-slate-300">
              <a
                href="/register"
                className="text-base font-medium underline hover:text-mainYellow"
              >
                Tạo tài khoản mới
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
