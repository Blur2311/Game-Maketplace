import { Button } from "primereact/button";

type SaleCardProps = {
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
        <div className="flex h-full flex-col items-start justify-between">
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
              <p className="text-textType text-sm font-light">{describe}</p>
            </div>
          </div>
          <Button
            label={buttonName}
            className="hover:bg-gray200 bg-grayBorder mt-8 rounded-lg px-4 py-3 text-sm text-white hover:bg-opacity-50"
          />
        </div>
      </div>
    </>
  );
};
