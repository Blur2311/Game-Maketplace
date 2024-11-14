import { Link } from "react-router-dom";

type CategoryRowProps = {
  sysIdCategory: number;
  categoryName: string;
  description: string | null;
};

export const CategoryRow: React.FC<CategoryRowProps> = ({
  sysIdCategory,
  categoryName,
  description,
}) => {
  const handleDetailClick = () => {
    const categoryData = {
      sysIdCategory,
      categoryName,
      description,
    };
    localStorage.setItem("selectedCategory", JSON.stringify(categoryData));
  };

  return (
    <>
      <tr className="border-b border-borderRow bg-white text-xs font-light">
        <td className={`px-5 py-[25px]`}>{sysIdCategory}</td>
        <td className={`px-5 py-[25px]`}>{categoryName}</td>
        <td className="px-5 py-[25px]">{description}</td>
        <td className={`px-5 py-[25px]`}>
          <Link
            to={`/admin/category/detail/${sysIdCategory}`}
            className="text-black underline"
            onClick={handleDetailClick}
          >
            Detail
          </Link>
        </td>
      </tr>
    </>
  );
};
