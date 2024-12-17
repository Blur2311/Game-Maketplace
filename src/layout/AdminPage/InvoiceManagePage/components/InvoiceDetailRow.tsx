import { formatCurrency } from "../../../../utils/OtherUtils";

type InvoiceDetailRowProps = {
  item: string;
  unitAmount: number;
  qty: number;
};

export const InvoiceDetailRow: React.FC<InvoiceDetailRowProps> = ({
  item,
  unitAmount,
  qty,
}) => {
  return (
    <>
      <tr className="border-b border-borderRow bg-white text-xs font-light">
        <td className={`px-5 py-[25px]`}>{item}</td>
        <td className={`px-5 py-[25px]`}>{formatCurrency(unitAmount)}</td>
        <td className={`px-5 py-[25px]`}>{qty}</td>
        <td className={`px-5 py-[25px] text-right`}>
          {formatCurrency(unitAmount * qty)}
        </td>
      </tr>
    </>
  );
};
