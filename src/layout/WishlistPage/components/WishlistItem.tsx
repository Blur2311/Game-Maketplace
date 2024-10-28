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
      <div className="w-full rounded bg-gray300 p-5 text-white shadow-sm">
        <div className="flex h-full items-stretch gap-4">
          <div className="">
            <img
              src={props.img}
              alt=""
              className="max-h-48 w-[130px] rounded"
            />
          </div>
          <div className="h-full flex-1">
            <div className="flex h-full flex-col justify-between">
              <div className="">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {props.type.map((item) => (
                      <LinkType text={item.text} url={item.url} />
                    ))}
                  </div>
                  {props.sale ? (
                    <div className="flex items-center gap-2">
                      <div className="rounded-full bg-mainCyan px-2 py-[2px] text-xs text-black">
                        -{props.sale}%
                      </div>
                      <p className="text-sm text-textType line-through">
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

                <div className="mt-2 flex items-center justify-between">
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
                  className="rounded-md bg-transparent px-3 py-1 text-base font-normal text-textType hover:text-white"
                />
                <Button
                  label="Add to Cart"
                  className="rounded-md bg-mainYellow px-3 py-1 text-base font-normal text-black hover:brightness-110"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
