import { Button } from "primereact/button";

export type SaleCardProps = {
  image: string;
  name: string;
  describe: string;
  buttonName: string;
  url: string;
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
        <div className="flex flex-col items-start justify-between h-full">
          <div className="">
            {/* Đảm bảo chiều cao full ở đây */}
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={image}
                alt=""
                className="transition duration-300 hover:brightness-125"
              />
            </div>
            <div className="mt-5 flex flex-col gap-[10px] pr-6 text-white">
              <p className="text-xl font-bold">{name}</p>
              <p className="text-sm font-light text-textType text-overflow-ellipsis-1-line">{describe}</p>
            </div>
          </div>
          <Button
            label={buttonName}
            className="px-4 py-3 mt-8 text-sm text-white rounded-lg hover:bg-gray200 bg-grayBorder hover:bg-opacity-50"
          />
        </div>
      </div>
    </>
  );
};
