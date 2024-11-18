import { Link } from "react-router-dom";
import {
  formatCurrency,
  formatDateFromLocalDate,
} from "../../../../utils/OtherUtils";
import { IoArrowForward } from "react-icons/io5";
import {
  IoIosCheckmarkCircle,
  IoIosCloseCircle,
  IoIosTime,
} from "react-icons/io";

type DiscountRowProps = {
  amount: number;
  status?: boolean;
  id: string;
  name: string;
  dateStart: string;
  dateEnd: string;
};

export const DiscountRow: React.FC<DiscountRowProps> = ({
  amount,
  status,
  id,
  name,
  dateStart,
  dateEnd,
}) => {
  return (
    <>
      <tr className="border-b border-borderRow bg-white text-xs font-light">
        <td className={`px-5 py-[25px]`}>
          <div className="flex items-center gap-2">
            <div className="">
              <p>{name}</p>
            </div>
          </div>
        </td>
        <td className={`px-5 py-[25px]`}>{formatCurrency(amount)}</td>
        <td className={`px-5 py-[25px]`}>
          {formatDateFromLocalDate(dateStart)}
        </td>
        <td className={`px-5 py-[25px]`}>{formatDateFromLocalDate(dateEnd)}</td>
        <td className={`px-5 py-[25px]`}>
          <div className="flex">
            <div
              className={`flex h-6 items-center justify-center gap-1 rounded-full border px-2 font-medium`}
            >
              {status != null ? (
                status ? (
                  <IoIosCheckmarkCircle size={16} className="text-green-500" />
                ) : (
                  <IoIosCloseCircle size={16} className="text-red-500" />
                )
              ) : (
                <IoIosTime size={16} className="text-yellow-500" />
              )}

              <span>
                {status != null ? (status ? "Active" : "Expired") : "Pending"}
              </span>
            </div>
          </div>
        </td>
        <td className={`px-5 py-[25px]`}>
          <div className="flex">
            <Link
              to={`/admin/invoice/detail/${id}`}
              className={"rounded-lg p-2 hover:bg-gray-100"}
            >
              <IoArrowForward size={24} />
            </Link>
          </div>
        </td>
      </tr>
    </>
  );
};
