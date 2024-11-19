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
import { Voucher } from "../../../../model/VoucherModel";

type VoucherRowProps = Voucher;

export const VoucherRow: React.FC<VoucherRowProps> = ({
  discountPercent,
  active,
  sysIdVoucher,
  discountName,
  startDate,
  endDate,
}) => {
  return (
    <>
      <tr className="border-b border-borderRow bg-white text-xs font-light">
        <td className={`px-5 py-[25px]`}>
          <div className="flex items-center gap-2">
            <div className="">
              <p>{discountName}</p>
            </div>
          </div>
        </td>
        <td className={`px-5 py-[25px]`}>{formatCurrency(discountPercent)}</td>
        <td className={`px-5 py-[25px]`}>
          {formatDateFromLocalDate(startDate)}
        </td>
        <td className={`px-5 py-[25px]`}>{formatDateFromLocalDate(endDate)}</td>
        <td className={`px-5 py-[25px]`}>
          <div className="flex">
            <div
              className={`flex h-6 items-center justify-center gap-1 rounded-full border px-2 font-medium`}
            >
               {active ? (
                <>
                  <IoIosCheckmarkCircle size={16} className="text-green-500" />
                  <span>Active</span>
                </>
              ) : (
                <>
                  <IoIosCloseCircle size={16} className="text-red-500" />
                  <span>Inactive</span>
                </>
              )}
            </div>
          </div>
        </td>
        <td className={`px-5 py-[25px]`}>
          <div className="flex">
            <Link
              to={`/admin/voucher/detail/${sysIdVoucher}`}
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