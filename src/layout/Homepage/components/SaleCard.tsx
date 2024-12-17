import { NavLink } from "react-router-dom";
import { scrollToTop } from "../../../utils/OtherUtils";

export type SaleCardProps = {
  image: string;
  name: string;
  describe: string;
  buttonName: string;
  url: string;
  codeVoucher?: string;
};

export const SaleCard: React.FC<SaleCardProps> = ({
  image,
  name,
  describe,
  buttonName,
  url,
}) => {
  return (
    <>
      <div className="flex-1">
        <div className="flex h-full flex-col items-start justify-between">
          <div className="">
            {/* Đảm bảo chiều cao full ở đây */}
            <NavLink
              to={url}
              className="relative overflow-hidden rounded-lg"
              onClick={scrollToTop}
            >
              <img
                src={image}
                alt=""
                className="rounded-lg transition duration-300 hover:brightness-125"
              />
            </NavLink>
            <div className="mt-5 flex flex-col gap-[10px] pr-6 text-white">
              <p className="text-xl font-bold">{name}</p>
              <p className="text-sm font-light text-textType">{describe}</p>
            </div>
          </div>
          <NavLink
            to={url}
            onClick={scrollToTop}
            className="mt-8 rounded-lg bg-grayBorder px-4 py-3 text-sm text-white hover:bg-gray200 hover:bg-opacity-50"
          >
            {buttonName}
          </NavLink>
        </div>
      </div>
    </>
  );
};
