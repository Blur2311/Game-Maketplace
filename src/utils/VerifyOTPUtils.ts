// src/utils/api.ts
import apiClient from "../config/apiClient";
import { Toast } from "primereact/toast";

// API
export const resendOtp = async (
  email: string,
  toast: React.RefObject<Toast>,
) => {
  try {
    const response = await apiClient.post(
      `/api/accounts/resend-registration-otp`,
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
) => {
  try {
    const response = await apiClient.post(
      `/api/accounts/verify-registration-otp`,
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