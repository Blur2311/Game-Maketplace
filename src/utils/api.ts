// src/utils/api.ts
import apiClient from "../apiClient";
import { Toast } from "primereact/toast";

export const loginUser = async (
  username: string,
  password: string,
  toast: React.RefObject<Toast>
) => {
  try {
    const requestBody = { username, password };
    const response = await apiClient.post(`/api/auth/login`, requestBody);

    toast.current?.show({
      severity: "success",
      summary: "Đăng nhập thành công!",
      detail: "Chào mừng bạn quay trở lại!",
      life: 3000,
    });

    return response.data.data.token;
  } catch (error) {
    toast.current?.show({
      severity: "error",
      summary: "Lỗi",
      detail:
        (error as any)?.response?.data?.message ??
        "Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại.",
      life: 3000,
    });
    throw error;
  }
};

export const resendOtp = async (email: string, toast: React.RefObject<Toast>) => {
  try {
    const response = await apiClient.post(
      `/api/accounts/resend-registration-otp`,
      null,
      {
        params: { email },
      }
    );

    toast.current?.show({
      severity: response.status === 200 ? "success" : "error",
      summary: "Thông báo",
      detail:
        response.data.message ||
        "Đã xảy ra lỗi khi xác thực email. Vui lòng thử lại.",
      life: 3000,
    });
  } catch (error) {
    toast.current?.show({
      severity: "error",
      summary: "Lỗi",
      detail:
        (error as any)?.response?.data?.message ??
        "Đã xảy ra lỗi khi gửi lại mã xác thực email. Vui lòng thử lại.",
      life: 3000,
    });
  }
};

export const verifyOtp = async (
  token: string | number | undefined,
  email: string,
  toast: React.RefObject<Toast>,
  navigate: any
) => {
  try {
    const response = await apiClient.post(
      `/api/accounts/verify-registration-otp`,
      null,
      {
        params: { otp: token, email },
      }
    );

    toast.current?.show({
      severity: response.status === 200 ? "success" : "error",
      summary: "Thông báo",
      detail:
        response.data.message ||
        "Đã xảy ra lỗi khi xác thực email. Vui lòng thử lại.",
      life: 3000,
    });

    if (response.status === 200) {
      toast.current?.show({
        severity: "info",
        summary: "Mã xác thực hợp lệ",
        detail: "Đang chuyển hướng đến trang đăng nhập...",
        life: 3000,
      });

      setTimeout(() => {
        navigate('/signin');
      }, 3000);
    }
  } catch (error) {
    toast.current?.show({
      severity: "error",
      summary: "Lỗi",
      detail:
        (error as any)?.response?.data?.message ??
        "Đã xảy ra lỗi khi xác thực email. Vui lòng thử lại.",
      life: 3000,
    });
  }
};