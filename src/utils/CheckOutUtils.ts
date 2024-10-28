import { FaCreditCard } from "react-icons/fa";
import { CartItem } from "./CartUtils";

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