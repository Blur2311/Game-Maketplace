import { Link } from "react-router-dom";
import { ItemProps } from "../../../components/Item";
import {
  calculateSalePrice,
  formatCurrency,
  scrollToTop,
} from "../../../utils/OtherUtils";

export const Top5Item: React.FC<ItemProps> = (item) => {
  return (
    <>
      <Link to={item.url} className="" onClick={scrollToTop}>
        <div className="item-start flex min-w-64 flex-col text-white">
          <div className="item-start flex w-full gap-4 rounded-lg p-[10px] hover:bg-gray200 hover:bg-opacity-50 xl:justify-start">
            <div className="min-w-fit overflow-hidden">
              <img
                src={item.image}
                alt=""
                className="top5-items-image rounded-lg"
              />
            </div>
            <div className="flex flex-1 flex-col gap-1 xl:gap-2">
              <h6 className="text-overflow-ellipsis-2-line text-base font-bold">
                {item.name}
              </h6>
              <div className="item-center flex justify-between gap-1 md:gap-[8px]">
                {item.sale !== 0 ? (
                  <div className="max-block-fit rounded-full bg-mainCyan px-2 py-[2px] text-xs text-black">
                    -{item.sale}%
                  </div>
                ) : (
                  <></>
                )}
                <div className="item-center flex flex-col gap-1 xl:flex-row xl:gap-[8px]">
                  {item.sale !== 0 ? (
                    <p className="text-sm text-textType line-through">
                      {formatCurrency(item.price)}
                    </p>
                  ) : (
                    <></>
                  )}
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
