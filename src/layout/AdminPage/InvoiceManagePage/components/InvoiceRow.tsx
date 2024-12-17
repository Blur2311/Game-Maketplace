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

type InvoiceRowProps = {
  amount: number;
  status?: boolean;
  id: number;
  name: string;
  avatar: string;
  date: string;
};

export const InvoiceRow: React.FC<InvoiceRowProps> = ({
  amount,
  status,
  id,
  name,
  avatar,
  date,
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
        <td className={`px-5 py-[25px]`}>{formatDateFromLocalDate(date)}</td>
        <td className={`px-5 py-[25px]`}>
          <div className="flex">
            <div
              className={`flex h-6 items-center justify-center gap-1 rounded-full border px-2 font-medium`}
            >
              {status ? (
                <IoIosCheckmarkCircle size={16} className="text-green-500" />
              ) : (
                <IoIosCloseCircle size={16} className="text-yellow-500" />
              )}

              <span>{status ? "Completed" : "Pending"}</span>
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
