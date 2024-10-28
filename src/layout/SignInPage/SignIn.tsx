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
import { Link } from "react-router-dom";

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
      "If you mess up 5 times, login will be locked for 30 mins.",
    );
  }, []);

  useEffect(() => {
    if (error) {
      showErrorToast(toast, error);
    }
  }, [error, isLockedOut]);

  const handleLogin = useCallback(async () => {
    if (isLockedOut) {
      setError("Too many wrong tries. Wait 30 mins.");
      return;
    }

    if (!validateEmail(username) && !validateUsername(username)) {
      setError("Invalid username. Enter a valid one, at least 4 characters.");
      return;
    }

    if (!validatePassword(password)) {
      setError("Invalid password. Enter a valid one, at least 6 characters - including number.");
      return;
    }

    try {
      await loginUser(username, password, toast);
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
        setError("Too many wrong tries. Wait 30 mins.");
      } else {
        setError(`Wrong tries: ${attempts}`);
      }
    }
  }, [isLockedOut, username, password, navigate]);

  return (
    <>
      <Toast ref={toast} position="top-right" />
      <div className="container mx-auto flex h-dvh justify-center sm:my-8">
        <div className="flex h-full w-full flex-col items-center rounded-lg bg-gray300 px-5 pb-[60px] pt-[50px] text-white sm:h-fit sm:w-[470px] sm:px-14">
          {/* Logo */}
          <Link to={"/"}>
            <img src="/logo.png" alt="" className="mb-[60px] h-14" />
          </Link>

          <h6 className="mb-5 text-xl font-bold">SIGN IN</h6>
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
              <label htmlFor="Email">Username or Email</label>
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
              <label htmlFor="Password">Password</label>
            </FloatLabel>
            <div className="w-full text-slate-300">
              <Link
                to="/forgot-password"
                className="text-sm font-medium underline hover:text-mainYellow"
              >
                Forgot password?
              </Link>
            </div>
            <Button
              label="SIGN IN"
              size="large"
              className="h-14 w-full bg-mainYellow text-base font-bold text-slate-900"
              onClick={handleLogin}
              disabled={isLockedOut}
            />
            <div className="mt-10 text-slate-300">
              <Link
                to="/register"
                className="text-base font-medium underline hover:text-mainYellow"
              >
                Create new account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});