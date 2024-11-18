import { formatCurrency } from "../../../../utils/OtherUtils";

type TopSaleItemProps = {
  image: string;
  name: string;
  type: string;
  amount: number;
  top: number;
};

export const TopSaleItem: React.FC<TopSaleItemProps> = (props) => {
  return (
    <>
      <tr className="text-sm">
        <td className="p-4">
          <div className="flex items-center gap-4">
            <div className="h-[60px] w-[60px] overflow-hidden rounded-lg">
              <img
                src={props.image}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
            <div className="">
              <div>
                <p className="text-textSecond">{props.type}</p>
                <h6 className="font-medium">{props.name}</h6>
              </div>
            </div>
          </div>
        </td>
        <td className="p-4 font-medium">{formatCurrency(props.amount)}</td>
        <td className="p-4">
          <div className="flex justify-center">
            <div className="rounded-xl bg-gray250 px-2 py-1">
              <h6>#{props.top}</h6>
            </div>
          </div>
        </td>
      </tr>
    </>
  );
};
