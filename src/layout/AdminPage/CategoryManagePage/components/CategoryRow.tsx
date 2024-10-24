import { Link } from "react-router-dom";

type CategoryRowProps = {
  id: string;
  name: string;
  describe: string;
};

export const CategoryRow: React.FC<CategoryRowProps> = ({
  id,
  name,
  describe,
}) => {
  return (
    <>
      <tr className="border-borderRow border-b bg-white text-xs font-light">
        <td className={`px-5 py-[25px]`}>{name}</td>
        <td className="px-5 py-[25px]">{describe}</td>
        <td className={`px-5 py-[25px]`}>
          <Link
            to={`admin/category-list/update/${id}`}
            className="text-black underline"
          >
            Detail
          </Link>
        </td>
      </tr>
    </>
  );
};
