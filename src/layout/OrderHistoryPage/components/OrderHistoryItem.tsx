import { LinkType, LinkTypeProps } from "../../../components/LinkType";
import { formatCurrency } from "../../../utils/OtherUtils";

type OrderHistoryDetailItemProps = {
  img: string;
  name: string;
  type: LinkTypeProps[];
  price: number;
  quantity: number;
};

export const OrderHistoryDetailItem: React.FC<OrderHistoryDetailItemProps> = (
  props,
) => {
  return (
    <>
      <div className="rounded bg-[#F2F2F2] p-5 shadow-sm">
        <div className="flex items-end justify-between">
          <div className="flex items-start gap-4">
            <div className="h-full">
              <img
                src={props.img}
                alt=""
                className="max-h-56 w-[150px] rounded"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                {props.type.map((item) => (
                  <LinkType text={item.text} url={item.url} />
                ))}
              </div>
              <h6 className="font-semibold">{props.name}</h6>
              <p className="mt-2 text-sm font-normal">
                {formatCurrency(props.price)}
              </p>
              <p className="mt-2 text-sm font-normal">
                Quantity: x{props.quantity}
              </p>
            </div>
          </div>
          <p className="text-lg font-bold">
            Total: {formatCurrency(props.price * props.quantity)}
          </p>
        </div>
      </div>
    </>
  );
};
