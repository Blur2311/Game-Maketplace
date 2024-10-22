import { GoChevronRight } from "react-icons/go";

import { Top5Item } from "./Top5Item";

export const Top5 = () => {
  return (
    <>
      <div className="mt-16 flex items-start overflow-scroll">
        <div className="border-grayBorder flex-1 border-r">
          <div className="px-4">
            <button className="group mb-4 flex items-center text-white">
              <span className="mr-2 text-xl font-bold">Top Seller</span>
              <GoChevronRight className="text-2xl transition-transform duration-300 group-hover:translate-x-2" />
            </button>
            <Top5Item />
            <Top5Item />
            <Top5Item />
            <Top5Item />
            <Top5Item />
          </div>
        </div>
        <div className="border-grayBorder flex-1 border-r">
          <div className="px-4">
            <button className="group mb-4 flex items-center text-white">
              <span className="mr-2 text-xl font-bold">Top Trending</span>
              <GoChevronRight className="text-2xl transition-transform duration-300 group-hover:translate-x-2" />
            </button>
            <Top5Item />
            <Top5Item />
            <Top5Item />
            <Top5Item />
            <Top5Item />
          </div>
        </div>
        <div className="flex-1">
          <div className="px-4">
            <button className="group mb-4 flex items-center text-white">
              <span className="mr-2 text-xl font-bold">Top Rated</span>
              <GoChevronRight className="text-2xl transition-transform duration-300 group-hover:translate-x-2" />
            </button>
            <Top5Item />
            <Top5Item />
            <Top5Item />
            <Top5Item />
            <Top5Item />
          </div>
        </div>
      </div>
    </>
  );
};
