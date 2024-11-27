import { Link } from "react-router-dom";
import { User } from "../../../../model/UsersModel";
import { format } from "date-fns";

type CustomerRowProps = {
  user: User;
};

export const CustomerRow: React.FC<CustomerRowProps> = ({ user }) => {
  const { sysIdUser, hoVaTen, avatar, email, dob, balance } = user;

  const formattedDob = dob ? format(new Date(dob), "dd-MM-yyyy") : "";

  const handleDetailClick = () => {
    localStorage.setItem("selectedUser", JSON.stringify(user));
  };

  return (
    <tr className="border-b border-borderRow bg-white text-xs font-light">
      <td className={`px-5 py-[25px]`}>
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full">
            <img src={avatar || ""} alt={hoVaTen} className="" />
          </div>
          <p>{hoVaTen}</p>
        </div>
      </td>
      <td className={`px-5 py-[25px]`}>{email}</td>
      <td className={`px-5 py-[25px]`}>{formattedDob}</td>
      <td className={`px-5 py-[25px]`}>
        <Link
          to={`/admin/customer/detail/${sysIdUser}`}
          className="text-black underline"
          onClick={handleDetailClick}
        >
          Detail
        </Link>
      </td>
    </tr>
  );
};