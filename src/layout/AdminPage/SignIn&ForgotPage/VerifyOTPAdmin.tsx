import { Button } from "primereact/button";
import { InputOtp } from "primereact/inputotp";
import { Message } from "primereact/message";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../../config/apiClient";

export const VerifyOTPAdmin = () => {
  const [token, setTokens] = useState<string | number | undefined>();
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [email] = useState<string>(localStorage.getItem("email") ?? "");
  const [{ status, message }, setMessages] = useState<{
    status:
      | "error"
      | "success"
      | "info"
      | "warn"
      | "secondary"
      | "contrast"
      | undefined;
    message: string;
  }>({
    status: undefined,
    message: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!email) {
      navigate("/admin/forgot-password");
    }
  }, [email, navigate]);

  useEffect(() => {
    setIsTokenValid(token?.toString().length === 6);
  }, [token]);

  const handleSubmit = useCallback(async () => {
    if (isTokenValid) {
      setIsSubmitDisabled(true);
      await apiClient
        .post("/api/accounts/forgot-password/verify-otp", null, {
          params: { otp: token, email },
        })
        .then(() => navigate("/admin/reset-password"))
        .catch((error) =>
          setMessages({
            status: "error",
            message:
              error.response.data.message ??
              "Couldn't verify the code. Try again.",
          }),
        );

      setTimeout(() => {
        setIsSubmitDisabled(false);
      }, 5000);
    }
  }, [isTokenValid, token, email, navigate]);
  return (
    <>
      <div className="grid min-h-screen lg:grid-cols-2">
        <div className="flex flex-col bg-white">
          <div className="p-6">
            <img src="/logo.png" alt="" className="h-8" />
          </div>
          <div className="flex items-center justify-center flex-1 p-6">
            <div className="flex flex-col items-center justify-center gap-10 mb-40">
              <div className="w-full text-left">
                <h1 className="text-[32px] font-medium">Verify OTP</h1>
              </div>
              <div className="flex flex-col items-center gap-4">
                <div className="flex w-[300px] flex-col items-center gap-7 sm:w-[450px]">
                  <InputOtp
                    value={token}
                    onChange={(e) => setTokens(e.value ?? "")}
                    integerOnly
                    length={6}
                  />
                </div>
                <div className="w-full text-slate-300">
                  <Message
                    hidden={!status}
                    severity={status}
                    text={message}
                    className="justify-start w-full rounded-lg bg-opacity-15"
                  />
                </div>
                <Button
                  label="Confirm"
                  size="large"
                  className="w-full h-10 text-sm font-semibold text-white rounded-xl bg-mainYellow shadow-buttonShadow"
                  onClick={handleSubmit}
                  disabled={!isTokenValid || isSubmitDisabled}
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

              <img src="/Frame.png" alt="" className="z-10" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
