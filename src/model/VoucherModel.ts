export interface Voucher {
  discountPercent: number;
  active?: boolean;
  sysIdVoucher: string;
  discountName: string;
  startDate: string;
  endDate: string;
  maxDiscount: number;
  codeVoucher: string;
  description : string;
  quantity: number;
  files: File | string;
  voucherBanner: string;
}