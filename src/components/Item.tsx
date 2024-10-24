import { Link } from "react-router-dom";
import { formatCurrency, calculateSalePrice } from "../utils/OtherUtils";
type ItemProps = {
  name: string;
  image: string;
  type: string;
  price: number;
  sale?: number;
  wrapper: string;
  url: string;
};

export const Item: React.FC<ItemProps> = (item) => {
  return (
    <>
      <div className={`${item.wrapper} text-white`}>
        <Link to={item.url}>
          <img
            src={item.image}
            alt=""
            className="mb-[10px] h-[266px] w-full rounded-lg transition duration-300 hover:brightness-125"
          />
        </Link>
        <p className="text-xs text-textType">{item.type}</p>
        <Link to={item.url}>
          <h6 className="my-[5px] text-base font-bold">{item.name}</h6>
        </Link>
        <div className={`mt-[10px] flex items-center justify-between gap-1`}>
          {item.sale ? (
            <>
              <div className="rounded-full bg-mainCyan px-2 py-[2px] text-xs text-black">
                -{item.sale}%
              </div>
              <p className="text-sm text-textType line-through">
                {formatCurrency(item.price)}
              </p>
              <p className="text-sm">
                {formatCurrency(calculateSalePrice(item.price, item.sale))}
              </p>
            </>
          ) : (
            <p className="text-sm text-textType">
              {formatCurrency(item.price)}
            </p>
          )}
        </div>
      </div>
    </>
  );
};
