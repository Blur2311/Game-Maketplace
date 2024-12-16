import React from "react";
import { Button } from "primereact/button";
import { formatCurrency } from "../../../utils/OtherUtils";

interface CartSummaryProps {
  cal: { total: number; discount: number };
  cartItemsCount: number;
  onCheckOut: () => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({
  cal,
  cartItemsCount,
  onCheckOut,
}) => {
  return (
    <div className="flex flex-col text-white">
      <h2 className="mb-5 text-xl font-black">Summary</h2>
      <div className="mt-[15px] space-y-4 text-sm font-light">
        <div className="flex justify-between">
          <span>Price</span>
          <span>{formatCurrency(cal.total)}</span>
        </div>
        <div className="flex justify-between">
          <span>Sale Discount</span>
          <span>-{formatCurrency(cal.discount)}</span>
        </div>
        <div className="flex justify-between">
          <span>Taxes</span>
          <span>Calculated at Checkout</span>
        </div>
      </div>
      <div className="mt-5 flex justify-between border-t border-bgCheckBox pt-5 text-sm font-medium">
        <span>Subtotal</span>
        <span>{formatCurrency(cal.total - cal.discount)}</span>
      </div>
      <Button
        label="Check Out"
        className="mt-5 h-12 w-full rounded-[10px] bg-mainYellow text-sm font-medium text-black"
        disabled={cartItemsCount === 0}
        onClick={onCheckOut}
      />
    </div>
  );
};

export default CartSummary;
