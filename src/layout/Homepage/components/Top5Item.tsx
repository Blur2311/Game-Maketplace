import { formatCurrency, calculateSalePrice } from "../../../utils/OtherUtils";

export const Top5Item = () => {
  return (
    <>
      <div className="flex flex-col items-start text-white">
        <div className="hover:bg-gray200 flex w-full items-start gap-4 rounded-lg p-[10px] hover:bg-opacity-50 xl:justify-start">
          <div className="w-full min-w-[60px] overflow-hidden xl:w-[60px]">
            <img src="/assasin.webp" alt="" className="rounded-lg" />
          </div>
          <div className="flex flex-col gap-1 xl:gap-2">
            <h6 className="text-base font-bold">Dark Soul Remastered</h6>
            <div className="flex items-center justify-between gap-1 md:gap-[10px]">
              <div className="rounded-full bg-mainCyan px-2 py-[2px] text-xs text-black">
                -80%
              </div>
              <div className="flex flex-col items-center gap-1 xl:flex-row xl:gap-[10px]">
                <p className="text-textType text-sm line-through">
                  {formatCurrency(900000)}
                </p>
                <p className="text-sm">
                  {formatCurrency(calculateSalePrice(900000, 80))}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
