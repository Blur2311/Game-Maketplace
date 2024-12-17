import { Button } from "primereact/button";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Message } from "primereact/message";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../../config/apiClient";
import { isValidEmail } from "../../../utils/OtherUtils";

export const ForgotPWAdmin = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const handleSubmit = useCallback(async () => {
    if (!email || !isValidEmail(email)) {
      setMessages({
        status: "error",
        message: "Please enter a valid email.",
      });
      return;
    }

    setIsSubmitting(true);

    setMessages({
      status: "info",
      message: "Hang tight while we send an OTP to your email.",
    });

    try {
      const response = await apiClient.post(
        "/api/accounts/forgot-password",
        null,
        {
          params: { email: email },
        },
      );

      if (response.status === 200) {
        localStorage.setItem("email", email);
        navigate("/admin/verify-otp");
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
  }, [email, navigate]);

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
                <h1 className="text-[32px] font-medium">Forgot password</h1>
              </div>
              <div className="flex flex-col items-center gap-4">
                <div className="flex w-[300px] flex-col items-center gap-7 sm:w-[450px]">
                  <FloatLabel className="w-full text-sm">
                    <InputText
                      id="Email"
                      className="h-[50px] w-full rounded-lg border border-grayBorder bg-transparent p-5 ps-[10px]"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="Email">Email</label>
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
                  label="Send recovery link"
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
