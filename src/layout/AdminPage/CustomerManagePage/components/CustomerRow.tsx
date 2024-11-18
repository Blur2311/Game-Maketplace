import { Link } from "react-router-dom";
import { formatDate } from "../../../../utils/OtherUtils";

type CustomerRowProps = {
  name: string;
  avatar: string;
  email: string;
  date: string;
};

export const CustomerRow: React.FC<CustomerRowProps> = ({
  name,
  avatar,
  email,
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
            <p>{name}</p>
          </div>
        </td>
        <td className={`px-5 py-[25px]`}>{email}</td>
        <td className={`px-5 py-[25px]`}>{formatDate(date)}</td>
        <td className={`px-5 py-[25px]`}>
          <Link
            to={`/admin/customer/detail/${name}`}
            className="text-black underline"
            // onClick={handleDetailClick}
          >
            Detail
          </Link>
        </td>
      </tr>
    </>
  );
};
