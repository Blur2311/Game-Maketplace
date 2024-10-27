import { Link } from "react-router-dom";
import { Tooltip } from "primereact/tooltip";

type CategoryDetail = {
  sysIdCategoryDetail: number;
  sysIdGame: number;
  sysIdCategory: number;
  categoryName: string;
};

type GameRowProps = {
  sysIdGame: number;
  gameName: string;
  price: number;
  discountPercent: number | null;
  categoryDetails: CategoryDetail[];
  gameImage: string;
  description: string;
  isActive: boolean;
  quantity: number;
};

export const GameRow: React.FC<GameRowProps> = ({
  sysIdGame,
  gameName,
  price,
  discountPercent,
  categoryDetails,
  gameImage,
  description,
  isActive,
  quantity,
}) => {
  const handleDetailClick = () => {
    const gameData = {
      sysIdGame,
      gameName,
      price,
      discountPercent,
      categoryDetails,
      gameImage,
      description,
      isActive,
      quantity,
    };
    localStorage.setItem("selectedGame", JSON.stringify(gameData));
  };

  const renderCategories = () => {
    if (categoryDetails.length === 0) {
      return <span>Không có</span>;
    } else if (categoryDetails.length <= 2) {
      return categoryDetails.map((categoryDetail, index) => (
        <span key={categoryDetail.sysIdCategory} className="mr-1">
          {categoryDetail.categoryName}
          {index < categoryDetails.length - 1 && ", "}
        </span>
      ));
    } else {
      const displayedCategories = categoryDetails.slice(0, 2);
      const remainingCategories = categoryDetails.slice(2);
      const tooltipContent = remainingCategories
        .map((categoryDetail) => categoryDetail.categoryName)
        .join(", ");

      return (
        <>
          {displayedCategories.map((categoryDetail, index) => (
            <span key={categoryDetail.sysIdCategory} className="mr-1">
              {categoryDetail.categoryName}
              {index < displayedCategories.length - 1 && ", "}
            </span>
          ))}
          <span id={`tooltip-${sysIdGame}`} className="mr-1 cursor-pointer">
            ...
          </span>
          <Tooltip target={`#tooltip-${sysIdGame}`} content={tooltipContent} />
        </>
      );
    }
  };

  return (
    <>
      <tr className="border-b border-borderRow bg-white text-xs font-light">
        <td className={`px-5 py-[25px]`}>{sysIdGame}</td>
        <td className={`px-5 py-[25px]`}>{gameName}</td>
        <td className="px-5 py-[25px]">{price}</td>
        <td className={`px-5 py-[25px]`}>
          {discountPercent !== null ? `${discountPercent}%` : "N/A"}
        </td>
        <td className={`px-5 py-[25px]`}>{renderCategories()}</td>
        <td className={`px-5 py-[25px]`}>
          <Link
            to={`/admin/game-list/update/${sysIdGame}`}
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
