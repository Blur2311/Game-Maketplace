import { Toast } from "primereact/toast";
import Swal from "sweetalert2";

export const handleLockedAccount = (message: string) => {
  Swal.fire({
    icon: "error",
    title: "Account Locked",
    text: message,
  });
  setTimeout(() => {
    localStorage.removeItem("token");
    window.location.reload();
  }, 3000);
};

export const handleForbiddenAccess = () => {
  window.location.href = "/403";
};

export const showErrorToast = (
  toast: React.RefObject<Toast>,
  error: string,
) => {
  toast.current?.show({
    severity: "error",
    summary: "Error",
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
    summary: "Success",
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
    summary: "Note",
    detail: message,
    life: 5000,
  });
};