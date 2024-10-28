import React from "react";
import { formatCurrency } from "../../../utils/OtherUtils";

interface SummaryItemProps {
  imageUrl: string;
  title: string;
  publisher: string;
  price: number;
  quantity: number;
}

export const SummaryItem: React.FC<SummaryItemProps> = ({
  imageUrl,
  title,
  publisher,
  price,
  quantity,
}) => {
  return (
    <div className="flex items-center max-w-sm py-4">
      {/* Image */}
      <img
        src={imageUrl}
        alt={title}
        className="object-cover w-20 mr-4 rounded-md h-28"
      />

      {/* Game Info */}
      <div className="w-full">
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500">{publisher}</p>
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-gray-900">
            {formatCurrency(price)}
          </p>
          <p className="text-sm font-light text-gray-900">x{quantity}</p>
        </div>
      </div>
    </div>
  );
};
