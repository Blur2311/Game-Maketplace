import { Link } from "react-router-dom";
import { ItemProps } from "../../../components/Item";
import { calculateSalePrice, formatCurrency } from "../../../utils/OtherUtils";

export const Top5Item: React.FC<ItemProps> = (item) => {
  return (
    <>
      <Link to={item.url}>
        <div className="flex flex-col text-white item-start">
          <div className="item-start flex w-full gap-4 rounded-lg p-[10px] hover:bg-gray200 hover:bg-opacity-50 xl:justify-start">
            <div className="overflow-hidden top5-items-image">
              <img src={item.image} alt="" className="rounded-lg" />
            </div>
            <div className="flex flex-col gap-1 xl:gap-2">
              <h6 className="text-base font-bold text-overflow-ellipsis-2-line">
                {item.name}
              </h6>
              <div className="item-center flex justify-between gap-1 md:gap-[10px]">
                <div className="rounded-full bg-mainCyan px-2 py-[2px] text-xs text-black">
                  -{item.sale}%
                </div>
                <div className="item-center flex flex-col gap-1 xl:flex-row xl:gap-[10px]">
                  <p className="text-sm line-through text-textType">
                    {formatCurrency(item.price)}
                  </p>
                  <p className="text-sm">
                    {formatCurrency(
                      Math.round(
                        calculateSalePrice(item.price, item.sale ?? 0),
                      ),
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};
