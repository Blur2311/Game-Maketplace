// src/utils/api.ts
import { Toast } from "primereact/toast";
import apiClient from "../config/apiClient";

// API
export const resendOtp = async (
  email: string,
  toast: React.RefObject<Toast>,
  endPoint?: string,
) => {
  let href = window.location.href;
  if (href.includes("forgot-password")) {
    endPoint = "/api/accounts/forgot-password/resend-otp";
  } else {
    endPoint = "/api/accounts/resend-registration-otp";
  }
  try {
    const response = await apiClient.post(
      endPoint,
      null,
      {
        params: { email },
      },
    );

    toast.current?.show({
      severity: response.status === 200 ? "success" : "error",
      summary: "Heads up!",
      detail:
        response.data.message ||
        "Something went wrong. Try again.",
      life: 3000,
    });
  } catch (error) {
    toast.current?.show({
      severity: "error",
      summary: "Oops!",
      detail:
        (error as any)?.response?.data?.message ??
        "Couldn't resend the code. Try again.",
      life: 3000,
    });
  }
};

export const verifyOtp = async (
  token: string | number | undefined,
  email: string,
  toast: React.RefObject<Toast>,
  navigate: any,
  endPoint?: string,
) => {
  let href = window.location.href;
  if (href.includes("forgot-password")) {
    endPoint = "/api/accounts/forgot-password/verify-otp";
  } else {
    endPoint = "/api/accounts/verify-registration-otp";
  }
  try {
    const response = await apiClient.post(
      endPoint,
      null,
      {
        params: { otp: token, email },
      },
    );

    toast.current?.show({
      severity: response.status === 200 ? "success" : "error",
      summary: "Heads up!",
      detail:
        response.data.message ||
        "Something went wrong. Try again.",
      life: 3000,
    });

    if (response.status === 200) {
      if (endPoint === "/api/accounts/forgot-password/verify-otp") {
        localStorage.setItem("email", email);
        navigate("/forgot-password/new-password");
      } else {
        toast.current?.show({
          severity: "info",
          summary: "Code is good",
          detail: "Redirecting to login...",
          life: 3000,
        });

        setTimeout(() => {
          navigate("/sign-in");
        }, 3000);
      }
    }
  } catch (error) {
    toast.current?.show({
      severity: "error",
      summary: "Oops!",
      detail:
        (error as any)?.response?.data?.message ??
        "Couldn't verify the code. Try again.",
      life: 3000,
    });
  }
};