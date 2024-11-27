import { Link } from "react-router-dom";
import { calculateSalePrice, formatCurrency } from "../utils/OtherUtils";
export type ItemProps = {
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
            className="mb-[10px] h-[254px] w-[190px] rounded-lg object-cover transition duration-300 hover:brightness-125"
          />
        </Link>
        <p className="text-xs text-textType">{item.type}</p>
        <Link to={item.url}>
          <h6 className="text-overflow-ellipsis-1-line my-[5px] line-clamp-2 max-w-[190px] text-base font-bold">
            {item.name}
          </h6>
        </Link>
        <div
          className={`mt-[10px] flex items-center justify-between gap-1`}
          // onClick={() =>
          //   addToCart({ slug: item.url.replace("/product?game=", ""), quantity: 1 })
          // }
        >
          {item.sale ? (
            <>
              <div className="rounded-full bg-mainCyan max-block-fit px-2 py-[2px] text-xs text-black">
                -{item.sale}%
              </div>
              <p className="text-sm line-through text-textType">
                {formatCurrency(item.price)}
              </p>
              <p className="text-sm">
                {formatCurrency(
                  Math.round(calculateSalePrice(item.price, item.sale)),
                )}
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
