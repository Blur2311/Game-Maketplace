import { Button } from "primereact/button";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
// import { Password } from "primereact/password";
import { Toast } from "primereact/toast";
import React, { useCallback, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiClient from "../../config/apiClient";
import { showErrorToast, showInfoToast } from "../../utils/ErrorHandlingUtils";

export const ForgotPassword: React.FC = React.memo(() => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useRef<Toast>(null);
  const navigate = useNavigate();

  const handleSubmit = useCallback(async () => {
    if (!email) {
      return;
    }

    setIsSubmitting(true);

    showInfoToast(toast, "Hang tight while we send an OTP to your email.");

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
        navigate("/forgot-password/verify-otp");
      } else {
        setIsSubmitting(false);
      }
    } catch (error) {
      showErrorToast(
        toast,
        (error as any)?.response?.data?.message ??
          "Something went wrong. Try again.",
      );
      setIsSubmitting(false);
    }
  }, [email, navigate]);

  return (
    <>
      <Toast ref={toast} position="top-right" />
      <div className="mt-[5rem] flex h-full items-center justify-center">
        <div className="flex h-full w-full flex-col items-center rounded-lg bg-gray300 px-5 pb-[60px] pt-[50px] text-white sm:h-fit sm:w-[470px] sm:px-14">
          <Link to={"/"}>
            <img src="/logo.png" alt="" className="mb-[60px] h-14" />
          </Link>
          <h6 className="mb-5 text-xl font-bold">RESET PASSWORD</h6>
          <p className="mb-6 max-w-[360px] text-justify text-[0.925rem] text-mainYellow hover:text-white">
            To reset your password, please enter your email address below
          </p>
          <div className="flex w-full flex-col items-center gap-6">
            <FloatLabel className="mt-2 w-full text-sm">
              <InputText
                id="Email"
                className={`h-[50px] w-full border border-grayBorder bg-transparent p-5 ps-[10px]`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="Email">Email Address</label>
            </FloatLabel>
            <Button
              label="SEND OTP"
              size="large"
              className="h-14 w-full bg-mainYellow text-base font-bold text-slate-900"
              onClick={handleSubmit}
              disabled={isSubmitting}
            />
          </div>
        </div>
      </div>
    </>
  );
});
