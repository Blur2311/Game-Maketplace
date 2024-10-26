import { Button } from "primereact/button";
import { TbExclamationCircle } from "react-icons/tb";

export const LastChance = () => {
  return (
    <>
      <div className="mt-16 rounded-xl bg-gray300 px-5 py-[30px] md:px-10">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-[14px] text-white">
            <TbExclamationCircle className="text-4xl" />
            <p className="text-xl font-bold">Last Chance</p>
          </div>
          <Button
            label="View More"
            className="h-10 rounded-lg border border-gray100 bg-transparent px-3 py-3 text-sm text-white hover:border-white hover:bg-gray200 hover:bg-opacity-50"
          />
        </div>
        <div className="mb-2 flex flex-col items-start justify-between gap-5 sm:flex-row">
          <div className="flex-1">
            <div className="relative overflow-hidden rounded-lg">
              <img
                src="/image1.png"
                alt=""
                className="transition duration-300 hover:brightness-125"
              />
              <div className="absolute bottom-0 left-0 right-0 flex h-6 items-center justify-center bg-mainCyan">
                <p className="text-xs font-bold text-black">BUY NOW</p>
              </div>
            </div>
            <div className="mt-[20px] flex flex-col gap-[5px] text-white">
              <p className="font-bold">Invincible Presents: Atom Eve</p>
              <p className="font-light text-textType">
                Now - Oct 24 at 10:00 PM
              </p>
            </div>
          </div>
          <div className="flex-1">
            <div className="relative overflow-hidden rounded-lg">
              <img
                src="/image1.png"
                alt=""
                className="transition duration-300 hover:brightness-125"
              />
              <div className="absolute bottom-0 left-0 right-0 flex h-6 items-center justify-center bg-mainCyan">
                <p className="text-xs font-bold text-black">BUY NOW</p>
              </div>
            </div>
            <div className="mt-[20px] flex flex-col gap-[5px] text-white">
              <p className="font-bold">Invincible Presents: Atom Eve</p>
              <p className="font-light text-textType">
                Now - Oct 24 at 10:00 PM
              </p>
            </div>
          </div>
          <div className="flex-1">
            <div className="relative overflow-hidden rounded-lg">
              <img
                src="/image1.png"
                alt=""
                className="transition duration-300 hover:brightness-125"
              />
              <div className="absolute bottom-0 left-0 right-0 flex h-6 items-center justify-center bg-mainCyan">
                <p className="text-xs font-bold text-black">BUY NOW</p>
              </div>
            </div>
            <div className="mt-[20px] flex flex-col gap-[5px] text-white">
              <p className="font-bold">Invincible Presents: Atom Eve</p>
              <p className="font-light text-textType">
                Now - Oct 24 at 10:00 PM
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
