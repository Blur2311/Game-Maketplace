import { Toast } from "primereact/toast";
import apiClient from "../config/apiClient";

export const LOCKOUT_THRESHOLD = 5;
export const LOCKOUT_DURATION = 30 * 60 * 1000;

//API CRUD
export const loginUser = async (
  username: string,
  password: string,
  toast: React.RefObject<Toast>,
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

// OTHERS
export const getLoginAttempts = () => {
  return parseInt(localStorage.getItem("loginAttempts") || "0", 10);
};

export const getLastFailedLoginTime = () => {
  return parseInt(localStorage.getItem("lastFailedLoginTime") || "0", 10);
};

export const setLoginAttempts = (attempts: number) => {
  localStorage.setItem("loginAttempts", attempts.toString());
};

export const setLastFailedLoginTime = (time: number) => {
  const timeDifference = time - getLastFailedLoginTime();

  if (timeDifference > LOCKOUT_DURATION) {
    setLoginAttempts(1);
  }
  localStorage.setItem("lastFailedLoginTime", time.toString());
};
