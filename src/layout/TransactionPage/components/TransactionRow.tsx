import { formatCurrency } from "../../../utils/OtherUtils";

type TransactionRowProps = {
  date: string;
  description: string;
  withdraw: boolean;
  amount: number;
  balance: number;
};

export const TransactionRow: React.FC<TransactionRowProps> = ({
  date,
  description,
  withdraw,
  amount,
  balance,
}) => {
  return (
    <>
      <tr className="border-borderRow border-b bg-white text-xs font-light">
        <td className="px-5 py-[25px]">{date}</td>
        <td className="px-5 py-[25px]">{description}</td>
        <td
          className={`px-5 py-[25px] ${withdraw ? "text-red-600" : "text-green-600"}`}
        >
          {withdraw
            ? `- ${formatCurrency(amount)}`
            : `+ ${formatCurrency(amount)}`}
        </td>
        <td className="px-5 py-[25px]">{formatCurrency(balance)}</td>
      </tr>
    </>
  );
};
