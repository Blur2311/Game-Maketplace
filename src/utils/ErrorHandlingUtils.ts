import { Messages } from "primereact/messages";
import { Toast } from "primereact/toast";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { isTokenValid } from "./AuthUtils";

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
  if (!isTokenValid()) {
    localStorage.removeItem("token");
    toast.warn("Expired session, please login again");
  }
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

export const showInfoMessages = (msgs: React.RefObject<Messages>, message: string) => {
  msgs.current?.clear();
  msgs.current?.show({ sticky: true, severity: 'info', summary: 'Info', detail: message, closable: false });
}

export const clearMessages = (msgs: React.RefObject<Messages>) => {
  if (msgs.current) {
    msgs.current.clear();
  }
};