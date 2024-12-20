import { Button } from "primereact/button";
import { InputOtp } from "primereact/inputotp";
import { Toast } from "primereact/toast";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { resendOtp, verifyOtp } from "../../utils/VerifyOTPUtils";
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
      await verifyOtp(token, email, navigate, "", "", "", toast);
      setTimeout(() => {
        setIsSubmitDisabled(false);
      }, 5000);
    }
  }, [isTokenValid, token, email, navigate]);

  return (
    <>
      <Toast ref={toast} position="top-right" />
      <div className="container flex items-center justify-center mx-auto h-dvh">
        <div className="flex h-full w-full flex-col items-center rounded-lg bg-gray300 px-5 pb-[60px] pt-[50px] text-white sm:h-fit sm:w-[470px] sm:px-14">
          <Link to={"/"}>
            <img src="/logo.png" alt="" className="mb-[60px] h-14" />
          </Link>
          <h6 className="mb-5 text-xl font-bold">VERIFY EMAIL</h6>
          <div className="mb-6 text-center text-[0.925rem] text-slate-400">
            <p>We sent a code to your email</p>
            <p>Please enter the OTP below</p>
          </div>
          <div className="max-w-[360px]">
            <InputOtp
              value={token}
              onChange={(e) => setTokens(e.value ?? "")}
              integerOnly
              length={6}
            />

            <div className="flex items-center justify-between w-full mt-5">
              <a
                href="#"
                className={`px-5 text-base font-bold hover:underline ${isLinkDisabled ? "cursor-not-allowed text-gray-500" : "hover:text-mainYellow"}`}
                onClick={(e) => {
                  if (isLinkDisabled) {
                    e.preventDefault();
                  } else {
                    handleLinkClick();
                  }
                }}
              >
                {isLinkDisabled ? `Resend OTP (${countdown}s)` : "Resend OTP"}
              </a>
              <Button
                label="CONFIRM"
                size="large"
                className="px-5 text-base font-bold h-14 bg-mainYellow text-slate-900"
                onClick={handleSubmit}
                disabled={!isTokenValid || isSubmitDisabled}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
