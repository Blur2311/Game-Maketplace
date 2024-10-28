import { Link } from "react-router-dom";
import { formatCurrency } from "../../../utils/OtherUtils";

type OrderHistoryRowProps = {
  date: string;
  id: string;
  description: string;
  price: number;
  status: string;
};

export const OrderHistoryRow: React.FC<OrderHistoryRowProps> = ({
  date,
  id,
  description,
  price,
  status,
}) => {
  return (
    <>
      <tr className="border-borderRow border-b bg-white text-xs font-light">
        <td className="px-5 py-[25px]">{date}</td>
        <td className="px-5 py-[25px]">{id}</td>
        <td className="px-5 py-[25px]">{description}</td>
        <td className="px-5 py-[25px]">{formatCurrency(price)}</td>
        <td className="px-5 py-[25px]">{status}</td>
        <td className={`px-5 py-[25px]`}>
          <Link
            to={`/setting/order-history/detail/${id}`}
            className="text-black underline"
          >
            Detail
          </Link>
        </td>
      </tr>
    </>
  );
};
