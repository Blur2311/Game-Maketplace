import { Toast } from "primereact/toast";
import Swal from "sweetalert2";

export const handleLockedAccount = (message: string) => {
  Swal.fire({
    icon: "error",
    title: "Tài khoản đang bị khóa",
    text: message,
  });
  setTimeout(() => {
    localStorage.removeItem("token");
    window.location.reload();
  }, 3000);
};

export const handleForbiddenAccess = () => {
  window.location.href = "/signin";
};

export const showErrorToast = (
  toast: React.RefObject<Toast>,
  error: string,
) => {
  toast.current?.show({
    severity: "error",
    summary: "Lỗi",
    detail: error,
    life: 3000,
  });
};

export const showSuccessToast = (
  toast: React.RefObject<Toast>,
  message: string,
) => {
  toast.current?.show({
    severity: "success",
    summary: "Thành công",
    detail: message,
    life: 3000,
  });
};

export const showInfoToast = (
  toast: React.RefObject<Toast>,
  message: string,
) => {
  toast.current?.show({
    severity: "info",
    summary: "Lưu ý",
    detail: message,
    life: 5000,
  });
};
