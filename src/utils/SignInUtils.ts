import { Toast } from "primereact/toast";
import apiClient from "../config/apiClient";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  sub: string;
  role: string;
  iat: number;
  exp: number;
}

export const LOCKOUT_THRESHOLD = 5;
export const LOCKOUT_DURATION = 30 * 60 * 1000;

export const loginUser = async (
  username: string,
  password: string,
  toast: React.RefObject<Toast>,
) => {
  try {
    const requestBody = { username, password };
    const response = await apiClient.post(`/api/auth/login`, requestBody);

    const token = response.data.data.token;
    localStorage.setItem("token", token);
    const decodedToken: DecodedToken = jwtDecode(token);

    toast.current?.show({
      severity: "success",
      summary: "Login successful!",
      detail: "Welcome back!",
      life: 3000,
    });

    return decodedToken;
  } catch (error) {
    toast.current?.show({
      severity: "error",
      summary: "Error",
      detail:
        (error as any)?.response?.data?.message ?? "Login failed. Try again.",
      life: 3000,
    });
    throw error;
  }
};

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