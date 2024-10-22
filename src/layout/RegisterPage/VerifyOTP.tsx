import { Button } from "primereact/button";
// import { Password } from "primereact/password";
import { InputOtp } from "primereact/inputotp";
import { Toast } from "primereact/toast";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { resendOtp, verifyOtp } from "../../utils/api";
import "./VerifyOTP.css";

export const VerifyOTP: React.FC = React.memo(() => {
  const [token, setTokens] = useState<string | number | undefined>();
  const [isLinkDisabled, setIsLinkDisabled] = useState(true);
  const [countdown, setCountdown] = useState(60);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [email] = useState<string>(localStorage.getItem("email") ?? "");
  const toast = useRef<Toast>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!email) {
      navigate("/register");
    }
    let timer: ReturnType<typeof setInterval>;
    if (isLinkDisabled) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown <= 1) {
            clearInterval(timer);
            setIsLinkDisabled(false);
            return 60;
          }
          return prevCountdown - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isLinkDisabled, email, navigate]);

  useEffect(() => {
    setIsTokenValid(token?.toString().length === 6);
  }, [token]);

  const handleLinkClick = useCallback(async () => {
    setIsLinkDisabled(true);
    setCountdown(60);
    await resendOtp(email, toast);
  }, [email]);

  const handleSubmit = useCallback(async () => {
    if (isTokenValid) {
      setIsSubmitDisabled(true);
      await verifyOtp(token, email, toast, navigate);
      setTimeout(() => {
        setIsSubmitDisabled(false); // Re-enable the submit button after 5 seconds
      }, 5000);
    }
  }, [isTokenValid, token, email, navigate]);

  return (
    <>
      <Toast ref={toast} position="top-right" />
      <div className="container flex items-center justify-center h-screen mx-auto">
        <div className="flex w-full flex-col items-center rounded-lg bg-gray300 px-5 pb-[60px] pt-[50px] text-white sm:w-[470px] sm:px-14">
          <img src="/cat.jpeg" alt="" className="mb-[60px] h-14 w-14" />
          <h6 className="mb-5 text-xl font-bold">XÁC THỰC EMAIL</h6>
          <div className="mb-6 text-justify text-[0.925rem] text-slate-400">
            <p>Mã xác thực đã được gửi đến email của bạn</p>
            <p>Vui lòng điền mã OTP vào các ô bên dưới</p>
          </div>
          <InputOtp
            value={token}
            onChange={(e) => setTokens(e.value ?? "")}
            integerOnly
            length={6}
          />
          <div className="flex items-center justify-between w-full mt-5">
            <a
              href="#"
              className={`px-5 text-base font-bold hover:underline ${isLinkDisabled ? "cursor-not-allowed text-gray-500" : "hover:text-mainYello"}`}
              onClick={(e) => {
                if (isLinkDisabled) {
                  e.preventDefault();
                } else {
                  handleLinkClick();
                }
              }}
            >
              {isLinkDisabled
                ? `Gửi lại mã OTP (${countdown}s)`
                : "Gửi lại mã OTP"}
            </a>
            <Button
              label="XÁC NHẬN"
              size="large"
              className="px-5 text-base font-bold h-14 bg-mainYello text-slate-900"
              onClick={handleSubmit}
              disabled={!isTokenValid || isSubmitDisabled}
            />
          </div>
        </div>
      </div>
    </>
  );
});