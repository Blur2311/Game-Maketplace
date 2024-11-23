import { Button } from "primereact/button";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Toast } from "primereact/toast";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  showErrorToast,
  showInfoToast,
} from "../../../utils/ErrorHandlingUtils";
import {
  getLastFailedLoginTime,
  getLoginAttempts,
  LOCKOUT_DURATION,
  LOCKOUT_THRESHOLD,
  loginUser,
  setLastFailedLoginTime,
  setLoginAttempts,
} from "../../../utils/SignInUtils";
import {
  validateEmail,
  validatePassword,
  validateUsername,
} from "../../../utils/ValidationUtils";

export const SignInAdmin = () => {
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
      setError("Invalid username. Enter a valid one.");
      return;
    }

    if (!validatePassword(password)) {
      setError("Invalid password. Enter a valid one.");
      return;
    }

    try {
      const decodeToken = await loginUser(username, password, toast);
      setLoginAttempts(0);
      setLastFailedLoginTime(0);
      setError(null);
      localStorage.removeItem("email");

      setTimeout(() => {
        navigate(decodeToken.role === "CUSTOMER" ? "/" : "/admin");
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
      <div className="grid min-h-screen lg:grid-cols-2">
        <div className="flex flex-col bg-white">
          <div className="p-6">
            <img src="/logo.png" alt="" className="h-8" />
          </div>
          <div className="flex items-center justify-center flex-1 p-6">
            <div className="flex flex-col items-center justify-center gap-10 mb-40">
              <div className="w-full text-left">
                <h1 className="text-[32px] font-medium">Sign In</h1>
              </div>
              <div className="flex flex-col items-center gap-4">
                <div className="flex flex-col items-center gap-7">
                  <FloatLabel className="w-full text-sm">
                    <InputText
                      id="Email"
                      className="h-[50px] w-full rounded-lg border border-grayBorder bg-transparent p-5 ps-[10px]"
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
                      inputClassName="border-grayBorder rounded-lg w-[300px] sm:w-[450px] h-[50px] border bg-transparent p-5 ps-[10px]"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      aria-invalid={!!error}
                      aria-describedby="password-error"
                    />
                    <label htmlFor="Password">Password</label>
                  </FloatLabel>
                </div>
                <div className="w-full text-slate-300">
                  <Link
                    to="/admin/forgot-password"
                    className="text-sm font-medium text-mainYellow hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Button
                  label="Sign In"
                  size="large"
                  className="w-full h-10 text-sm font-semibold text-white rounded-xl bg-mainYellow shadow-buttonShadow"
                  onClick={handleLogin}
                  disabled={isLockedOut}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="hidden p-6 lg:block">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col justify-center gap-2 text-center text-white">
              <h1 className="text-2xl font-medium">
                Welcome to{" "}
                <span className="text-mainYellow">Code Oxi Admin</span>
              </h1>
              <p className="">
                Empowering your management experience with innovation and
                simplicity.
              </p>
            </div>
            <div className="relative flex justify-center">
              <div
                className="absolute z-0 transform -translate-x-1/2 -translate-y-1/2 rounded-full left-1/2 top-1/3 h-96 w-96"
                style={{
                  background:
                    "radial-gradient(circle, rgba(255, 255, 255, 0.3) 20%, rgba(255, 255, 255, 0.01) 60%, rgba(255, 255, 255, 0) 100%)",
                }}
              ></div>

              <img src="/frame2.png" alt="" className="z-10" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
