import { Toast } from "primereact/toast";
import { FaCreditCard } from "react-icons/fa";
import apiClient from "../config/apiClient";
import { User } from "./AuthUtils";
import { CartItem } from "./CartUtils";
import { showErrorToast, showInfoToast, showSuccessToast } from "./ErrorHandlingUtils";
import { formatCurrency } from "./OtherUtils";

/**
 * Handles actions after payment based on URL parameters.
 * @param {React.RefObject<Toast>} toast - Reference to the Toast component.
 */
export const handleAfterPayment = (toast: React.RefObject<Toast>) => {
  let href = window.location.href;
  if (href.includes("/checkout?success")) {
    showSuccessToast(toast, "Payment successful, redirecting to inventory...");
    localStorage.removeItem("cart");
    setTimeout(() => {
      window.location.href = "/profile";
    }, 2500);
  } else if (href.includes("/checkout?error")) {
    showErrorToast(toast, "Payment failed");
  } else if (href.includes("/checkout?recharge=success")) {
    showSuccessToast(toast, "Recharge successful");
  } else if (href.includes("/checkout?recharge=error")) {
    showErrorToast(toast, "Recharge failed");
  }
};

/**
 * Validates and applies a discount code.
 * @param {string} discountCode - The discount code to validate.
 * @param {number} subTotal - The subtotal amount.
 * @param {number} tax - The tax percentage.
 * @param {React.RefObject<Toast>} toast - Reference to the Toast component.
 * @param {Function} setDiscount - Function to set discount state.
 * @param {Function} setTotal - Function to set total state.
 */
export const checkDiscountCode = async (
  discountCode: string,
  subTotal: number,
  tax: number,
  toast: React.RefObject<Toast>,
  setDiscount: Function,
  setTotal: Function
) => {
  try {
    const response = await apiClient.post(`/api/vouchers/validate/${discountCode}`);
    if (response.data.status === "OK") {
      const voucher = response.data.data;
      const discountPercent = voucher.discountPercent;
      let discountAmount = subTotal * (discountPercent / 100);
      discountAmount = discountAmount > voucher.maxDiscount ? voucher.maxDiscount : discountAmount;
      const newTotal = subTotal - discountAmount;
      const afterTaxes = Math.round(newTotal * (1 + tax / 100));
      setDiscount({
        discountPercent,
        discountAmount,
        usedDiscountCode: discountCode,
      });
      setTotal({ total: newTotal, subTotal, afterTaxes: afterTaxes });
      showSuccessToast(
        toast,
        "Discount code applied - " + discountPercent + "% off, capped at " + formatCurrency(voucher.maxDiscount)
      );
    } else {
      const afterTaxes = Math.round(subTotal * (1 + tax / 100));
      resetVoucher(setDiscount, setTotal, subTotal, afterTaxes);
      showErrorToast(toast, "Invalid discount code");
    }
  } catch (error) {
    const afterTaxes = Math.round(subTotal * (1 + tax / 100));
    resetVoucher(setDiscount, setTotal, subTotal, afterTaxes);
    showErrorToast(toast, "Failed to apply discount code");
  }
};

/**
 * Resets the voucher state.
 * @param {Function} setDiscount - Function to set discount state.
 * @param {Function} setTotal - Function to set total state.
 * @param {number} subTotal - The subtotal amount.
 * @param {number} afterTaxes - The total amount after taxes.
 */
export const resetVoucher = (
  setDiscount: Function,
  setTotal: Function,
  subTotal: number,
  afterTaxes: number
) => {
  setDiscount({
    discountPercent: 0,
    discountAmount: 0,
    usedDiscountCode: null,
  });
  setTotal({ total: subTotal, subTotal, afterTaxes });
};

/**
 * Handles user balance payment.
 * @param {User} currentUser - The current user.
 * @param {number} afterTaxes - The total amount after taxes.
 * @param {string} usedDiscountCode - The used discount code.
 * @param {Array} cartItems - The items in the cart.
 * @param {React.RefObject<Toast>} toast - Reference to the Toast component.
 * @param {Function} navigate - Function to navigate to another route.
 */
export const handleUserBalancePayment = async (
  currentUser: User,
  afterTaxes: number,
  usedDiscountCode: string,
  cartItems: Array<any>,
  toast: React.RefObject<Toast>,
  navigate: Function
) => {
  try {
    const currentISODateTime = new Date().toISOString();
    let payload: Order = {
      orderCode: currentUser.username + currentISODateTime,
      orderDate: currentISODateTime,
      totalPayment: -afterTaxes,
      voucherCode: usedDiscountCode,
      username: currentUser.username ?? "",
      userId: currentUser.sysIdUser ?? 0,
      orders: cartItems,
    };
    // console.log(payload);

    showInfoToast(toast, "This process would take a minute, please wait...", 7777);
    const response = await apiClient.post(`/api/orders/handle-payment`, payload);
    if (response.data.status === "OK") {
      showSuccessToast(toast, "Payment successful, redirecting to inventory...");
      showInfoToast(toast, "Game keys will be sent to your email");
      localStorage.removeItem("cart");
      setTimeout(() => {
        navigate("/profile");
      }, 3000);
    } else {
      showErrorToast(toast, "Payment failed");
    }
  } catch (error) {
    showErrorToast(toast, "Payment failed");
  }
};

/**
 * Handles credit card payment.
 * @param {User} currentUser - The current user.
 * @param {number} afterTaxes - The total amount after taxes.
 */
export const handleCreditCardPayment = async (
  currentUser: User,
  afterTaxes: number
) => {
  let amount = Math.round(afterTaxes);
  let payload = {
    amount: amount,
    bankCode: "NCB",
    name: currentUser.username,
    successUrl: window.location.href + "?success",
    errorUrl: window.location.href + "?error",
  };
  const response = await apiClient.post(`/api/transactions/vn-pay`, payload);
  window.location.href = response.data;
};

/**
 * Handles placing an order based on the selected payment option.
 * @param {string} selectedOption - The selected payment option.
 * @param {Function} handleUserBalancePayment - Function to handle user balance payment.
 * @param {Function} handleCreditCardPayment - Function to handle credit card payment.
 */
export const handlePlaceOrder = (
  selectedOption: string,
  handleUserBalancePayment: Function,
  handleCreditCardPayment: Function
) => {
  if (selectedOption === "currentBalance") {
    handleUserBalancePayment();
  } else if (selectedOption === "creditCard") {
    handleCreditCardPayment();
  }
};

export const paymentOptions = [
  {
    label: "Credit Card",
    IconComponent: FaCreditCard,
    value: "creditCard",
  },
  {
    label: "MOMO",
    IconComponent: "/momo.png",
    value: "MOMO",
  },
  {
    label: "VNPAY",
    IconComponent: "/vnpay.jpg",
    value: "VNPAY",
  },
];

export type Order = {
  orderCode: string;
  totalPayment: number;
  voucherCode: string;
  username: string;
  userId: number;
  orderDate: string;
  orders: CartItem[];
};

export const recharge = async (afterTaxes: number, currentUser: User) => {
  let amount = Math.round(afterTaxes - (currentUser?.balance ?? 0));
  let payload = {
    amount: amount,
    bankCode: "NCB",
    name: currentUser?.username,
    successUrl: window.location.href + "?recharge=success",
    errorUrl: window.location.href + "?recharge=error",
  };
  const response = await apiClient.post(`/api/transactions/vn-pay`, payload);
  window.location.href = response.data;
};