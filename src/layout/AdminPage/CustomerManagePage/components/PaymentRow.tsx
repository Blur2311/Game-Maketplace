import { Link } from "react-router-dom";
import { formatCurrency, formatDate } from "../../../../utils/OtherUtils";
import { Tooltip } from "primereact/tooltip";

type PaymentRowProps = {
  amount: number;
  status?: boolean;
  id: string;
  date: string;
};

export const PaymentRow: React.FC<PaymentRowProps> = ({
  amount,
  status,
  id,
  date,
}) => {
  return (
    <>
      <tr className="border-b border-borderRow bg-white text-xs font-light">
        <td className={`px-5 py-[25px]`}>{formatCurrency(amount)}</td>
        <td className={`px-5 py-[25px]`}>
          <div className="flex">
            <div
              className={`flex h-6 items-center justify-center rounded-full px-2 font-medium ${status != null ? (status ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700") : "bg-yellow-100 text-yellow-700"}`}
            >
              <span>
                {status != null
                  ? status
                    ? "Completed"
                    : "Refunded"
                  : "Pending"}
              </span>
            </div>
          </div>
        </td>
        <td className={`px-5 py-[25px]`}>
          <Tooltip target=".link-tooltip" content={`Detail Invoice`} />

          <Link
            to={`/admin/invoice/detail/${id}`}
            className="link-tooltip text-black hover:underline" // Thêm class cho Tooltip
          >
            {id}
          </Link>
        </td>
        <td className={`px-5 py-[25px]`}>{formatDate(date)}</td>
      </tr>
    </>
  );
};