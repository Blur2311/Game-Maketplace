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