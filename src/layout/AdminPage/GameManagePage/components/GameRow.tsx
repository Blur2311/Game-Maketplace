import { Link } from "react-router-dom";
import { Tooltip } from "primereact/tooltip";
import { formatCurrency } from "../../../../utils/OtherUtils";
import { IoIosCheckmark } from "react-icons/io";
import { LuClock3 } from "react-icons/lu";
import { Game } from "../../../../model/GameModel";

export const GameRow: React.FC<Game> = ({
  sysIdGame,
  gameName,
  price,
  discountPercent,
  categoryDetails,
  gameImage,
  description,
  isActive,
  quantity,
  media,
  slug,
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
      media,
      slug,
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
        <td className="px-5 py-[25px]">{formatCurrency(price)}</td>
        <td className={`px-5 py-[25px]`}>
          {isActive ? (
            <div className="flex">
              <div className="flex items-center gap-2 rounded-full py-1 pe-3 ps-2 text-gray-800 shadow-adminBoxshadow">
                <div className="flex h-4 w-4 items-center justify-center rounded-full bg-green-400">
                  <IoIosCheckmark className="text-base text-white" />
                </div>
                <span className="text-xs font-medium">Published</span>
              </div>
            </div>
          ) : (
            <div className="flex">
              <div className="flex items-center gap-2 rounded-full py-1 pe-3 ps-2 text-gray-800 shadow-adminBoxshadow">
                <div className="flex h-4 w-4 items-center justify-center rounded-full">
                  <LuClock3 className="text-base text-black" />
                </div>
                <span className="text-xs font-medium">Draft</span>
              </div>
            </div>
          )}
        </td>
        <td className={`px-5 py-[25px]`}>{renderCategories()}</td>
        <td className={`px-5 py-[25px]`}>
          <Link
            to={`/admin/game/detail/${sysIdGame}`}
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
