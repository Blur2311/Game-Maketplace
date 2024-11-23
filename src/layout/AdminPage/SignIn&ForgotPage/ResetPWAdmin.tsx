import { Button } from "primereact/button";
import { FloatLabel } from "primereact/floatlabel";
import { Message } from "primereact/message";
import { Password } from "primereact/password";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../../config/apiClient";
import { NewPasswordErrors } from "../../../model/RegistrationModel";
import { validateNewPasswordForm } from "../../../utils/RegistrationUtils";

export const ResetPWAdmin = () => {
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
  const [email] = useState(localStorage.getItem("email") || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<NewPasswordErrors>({});
  const navigate = useNavigate();

  const isFormValid = useCallback(() => {
    const newErrors = validateNewPasswordForm(email, password, confirmPassword);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      return true;
    } else {
      Object.values(newErrors).forEach((error) => {
        setMessages({ status: "error", message: error });
      });
      return false;
    }
  }, [password, confirmPassword]);

  const handleSubmit = useCallback(async () => {
    if (!isFormValid()) {
      return;
    }
    setIsSubmitting(true);
    setMessages({
      status: "info",
      message: "Hang tight while we send an OTP to your email.",
    });
    try {
      const response = await apiClient.put(
        "/api/accounts/forgot-password/new-password",
        null,
        {
          params: { email: email, newPass: password },
        },
      );
      if (response.status === 200) {
        localStorage.setItem("email", email);
        setMessages({
          status: "success",
          message:
            "Reset password successfully!, redirecting to sign-in page...",
        });
        setTimeout(() => {
          navigate("/admin/sign-in");
        }, 3000);
      } else {
        setIsSubmitting(false);
      }
    } catch (error) {
      setMessages({
        status: "error",
        message:
          (error as any)?.response?.data?.message ??
          "Something went wrong. Try again.",
      });
      setIsSubmitting(false);
    }
  }, [email, password, isFormValid, navigate]);
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
                <h1 className="text-[32px] font-medium">Reset password</h1>
              </div>
              <div className="flex flex-col items-center gap-4">
                <div className="flex flex-col items-center gap-7">
                  <FloatLabel className="text-sm">
                    <Password
                      toggleMask
                      inputId="Password"
                      inputClassName="border-grayBorder rounded-lg w-[300px] sm:w-[450px] h-[50px] border bg-transparent p-5 ps-[10px]"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      aria-invalid={!!errors.password}
                      aria-describedby="password-error"
                    />
                    <label htmlFor="Password">New Password</label>
                  </FloatLabel>
                  <FloatLabel className="text-sm">
                    <Password
                      toggleMask
                      inputId="Password"
                      inputClassName="border-grayBorder rounded-lg w-[300px] sm:w-[450px] h-[50px] border bg-transparent p-5 ps-[10px]"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      aria-invalid={!!errors.confirmPassword}
                      aria-describedby="confirm-password-error"
                    />
                    <label htmlFor="Password">Confirm Password</label>
                  </FloatLabel>
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
                  disabled={isSubmitting}
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
