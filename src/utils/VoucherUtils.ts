import { toast } from "react-toastify";
import { isTokenValid } from "./AuthUtils";
import { confirmDialog } from "primereact/confirmdialog";
import apiClient from "../config/apiClient";

export type Voucher = {
  sysIdVoucher: number;
  codeVoucher: string;
  discountName: string;
  discountPercent: number;
  startDate: string;
  endDate: string;
  description: string;
  voucherDetails: any | null;
  voucherBanner: string;
  quantity: number;
  maxDiscount: number;
  active: boolean;
};

export const sendVoucherToUser = async (codeVoucher: string) => {
  if (!isTokenValid()) {
    toast.warn("You have to log in to perform this action");
    return;
  }

  let isNotUsed = await validateVoucher(codeVoucher);
  if (!isNotUsed) {
    return;
  }

  confirmDialog({
    message: "Voucher details will be sent to you. You may need to check your email for the voucher.",
    header: "Confirmation",
    icon: "pi pi-exclamation-triangle",
    acceptClassName: "custom-accept-button",
    rejectClassName: "custom-reject-button",
    acceptLabel: "Receive",
    rejectLabel: "Cancel",
    accept: async () => {
      try {
        toast.info("It may take a minute for you to receive the email, hang on tight!");
        const response = await apiClient.post(`/api/vouchers/send/${codeVoucher}`);
        if (response.status === 200) {
          toast.success("You can check your email for the voucher right now!");
        } else {
          toast.error("Something went wrong.");
        }
      } catch (error: any) {
        toast.error(error.response.data.message ?? "Something went wrong.");
      }
    },
  });
};

export const validateVoucher = async (codeVoucher: string): Promise<boolean> => {
  try {
    const response = await apiClient.post(`/api/vouchers/validate/${codeVoucher}`);
    return response.status === 200;
  } catch (error) {
    toast.error("You may have used this voucher, don't be so greedy tho..");
    return false;
  }
}