import { Link } from "react-router-dom";
import { LinkType, LinkTypeProps } from "../../../components/LinkType";
import { formatCurrency } from "../../../utils/OtherUtils";

type OrderHistoryDetailItemProps = {
  img: string;
  name: string;
  type: LinkTypeProps[];
  price: number;
  quantity: number;
  slug: string;
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
              <Link to={`/product?game=${props.slug}`}>
                <img
                  src={props.img}
                  alt=""
                  className="max-h-56 w-[150px] rounded"
                />
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                {props.type.map((item, index) => (
                  <LinkType key={index} text={item.text} url={item.url} />
                ))}
              </div>
              <Link to={`/product?game=${props.slug}`}>
                <h6 className="font-semibold">{props.name}</h6>
              </Link>
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
