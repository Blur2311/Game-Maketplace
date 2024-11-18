import { Link } from "react-router-dom";
import { Category } from "../../../../model/CategoryModel"; // Import Category từ CategoryModel

type CategoryRowProps = Omit<Category, 'categoryDetails'>;


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
