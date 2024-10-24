import React from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { formatCurrency } from "../../../utils/OtherUtils";

interface CartSummaryProps {
  subtotal: number;
  cartItemsCount: number;
}

const CartSummary: React.FC<CartSummaryProps> = ({ subtotal, cartItemsCount }) => {
  return (
    <Card className="sticky top-4">
      <h2 className="mb-4 text-xl font-bold">Summary</h2>
      <div className="space-y-4">
        <div className="flex justify-between">
          <span>Price</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between text-green-500">
          <span>Sale Discount</span>
          <span>-{formatCurrency(0)}</span>
        </div>
        <div className="flex justify-between text-gray-500">
          <span>Taxes</span>
          <span>Calculated at Checkout</span>
        </div>
        <hr />
        <div className="flex justify-between font-bold">
          <span>Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <Button label="Check Out" className="w-full text-base font-bold text-black h-14 bg-mainYellow" disabled={cartItemsCount === 0} />
      </div>
    </Card>
  );
};

export default CartSummary;