import { Link } from "react-router-dom";
import {
  formatCurrency,
  formatDateFromLocalDate,
} from "../../../../utils/OtherUtils";
import { IoArrowForward, IoCloseCircle } from "react-icons/io5";
import { TbClockHour3Filled } from "react-icons/tb";
import { FaCircleCheck } from "react-icons/fa6";
import {
  IoIosCheckmarkCircle,
  IoIosCloseCircle,
  IoIosTime,
} from "react-icons/io";

type InvoiceRowProps = {
  amount: number;
  status?: boolean;
  id: string;
  name: string;
  avatar: string;
  dateStart: string;
  dateEnd: string;
};

export const InvoiceRow: React.FC<InvoiceRowProps> = ({
  amount,
  status,
  id,
  name,
  avatar,
  dateStart,
  dateEnd,
}) => {
  return (
    <>
      <tr className="border-b border-borderRow bg-white text-xs font-light">
        <td className={`px-5 py-[25px]`}>
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full">
              <img src={avatar} alt="" className="" />
            </div>
            <div className="">
              <h6 className="font-medium">{id}</h6>
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
