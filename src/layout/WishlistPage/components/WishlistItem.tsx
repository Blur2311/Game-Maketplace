import { Button } from "primereact/button";
import { LinkTypeProps, LinkType } from "../../../components/LinkType";
import { calculateSalePrice, formatCurrency } from "../../../utils/OtherUtils";

type WishlistItemProps = {
  img: string;
  name: string;
  type: LinkTypeProps[];
  price: number;
  sale?: number;
  quantity: number;
};

export const WishlistItem: React.FC<WishlistItemProps> = (props) => {
  return (
    <>
      <div className="w-full p-5 text-white rounded shadow-sm bg-gray300">
        <div className="flex items-stretch h-full gap-4">
          <div className="">
            <img
              src={props.img}
              alt=""
              className="max-h-48 w-[130px] rounded"
            />
          </div>
          <div className="flex-1 h-full">
            <div className="flex flex-col justify-between h-full">
              <div className="">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {props.type.map((item) => (
                      <LinkType text={item.text} url={item.url} />
                    ))}
                  </div>
                  {props.sale ? (
                    <div className="flex items-center gap-2">
                      <div className="rounded-full bg-mainCyan max-block-fit px-2 py-[2px] text-xs text-black">
                        -{props.sale}%
                      </div>
                      <p className="text-sm line-through text-textType">
                        {formatCurrency(props.price)}
                      </p>
                      <p className="font-semibold">
                        {formatCurrency(
                          Math.round(
                            calculateSalePrice(props.price, props.sale),
                          ),
                        )}
                      </p>
                    </div>
                  ) : (
                    <p className="font-semibold">
                      {formatCurrency(props.price)}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between mt-2">
                  <h6 className="font-semibold">{props.name}</h6>
                  {props.sale && (
                    <p className="mt-2 text-xs font-normal text-textType">
                      Sale ends 10/17/2024 at 10:00 PM
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-end gap-4">
                <Button
                  label="Remove"
                  className="px-3 py-1 text-base font-normal bg-transparent rounded-md text-textType hover:text-white"
                />
                <Button
                  label="Add to Cart"
                  className="px-3 py-1 text-base font-normal text-black rounded-md bg-mainYellow hover:brightness-110"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
