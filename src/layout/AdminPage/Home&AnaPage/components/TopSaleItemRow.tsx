import { Link } from "react-router-dom";
import { formatCurrency } from "../../../../utils/OtherUtils";

type TopSaleItemProps = {
  image: string;
  name: string;
  type: string;
  amount: number;
  top: number;
  gameId: number;
};

export const TopSaleItem: React.FC<TopSaleItemProps> = (props) => {
  return (
    <>
      <tr className="text-sm">
        <td className="p-4">
          <Link to={`/admin/game/detail/${props.gameId}`}>
            <div className="flex items-center gap-4">
              <div className="h-[82px] w-[60px] overflow-hidden rounded-lg">
                <img
                  src={props.image}
                  alt=""
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="">
                <div>
                  <p className="text-textSecond">{props.type}</p>
                  <h6 className="font-medium">{props.name}</h6>
                </div>
              </div>
            </div>
          </Link>
        </td>
        <td className="p-4 font-medium">{formatCurrency(props.amount)}</td>
        <td className="p-4">
          <div className="flex justify-center">
            <div className="px-2 py-1 rounded-xl bg-gray250">
              <h6>#{props.top}</h6>
            </div>
          </div>
        </td>
      </tr>
    </>
  );
};
