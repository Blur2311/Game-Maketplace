import { GoChevronRight } from "react-icons/go";

import { useEffect, useState } from "react";
import { ItemProps } from "../../../components/Item";
import { fetchTop } from "../../../utils/ProductUtils";
import { Top5Item } from "./Top5Item";

export const Top5 = () => {
  const [topSeller, setTopSeller] = useState<ItemProps[]>([]);
  const [topTrending, setTopTrending] = useState<ItemProps[]>([]);
  const [topRated, setTopRated] = useState<ItemProps[]>([]);

  const renderTops = (items: ItemProps[]) => {
    return items.map((item, index) => {
      return (
        <Top5Item
          key={index}
          name={item.name}
          type={item.type}
          price={item.price}
          sale={item.sale}
          image={item.image}
          url={item.url}
          wrapper="tops"
        />
      );
    });
  };

  useEffect(() => {
    fetchTop("quantitySold", 5).then((result) => setTopSeller(result));
    fetchTop("sysIdGame", 5).then((result) => setTopTrending(result));
    fetchTop("rating", 5).then((result) => setTopRated(result));
  }, []);

  return (
    <>
      <div className="flex items-start mt-16 overflow-scroll md:overflow-auto">
        <div className="flex-1 border-r border-grayBorder xl:max-w-[33%]">
          <div className="px-4">
            <button className="flex items-center mb-4 text-white group">
              <span className="mr-2 text-xl font-bold">Top Seller</span>
              <GoChevronRight className="text-2xl transition-transform duration-300 group-hover:translate-x-2" />
            </button>
            {renderTops(topSeller)}
          </div>
        </div>
        <div className="flex-1 border-r border-grayBorder xl:max-w-[33%]">
          <div className="px-4">
            <button className="flex items-center mb-4 text-white group">
              <span className="mr-2 text-xl font-bold">Top Trending</span>
              <GoChevronRight className="text-2xl transition-transform duration-300 group-hover:translate-x-2" />
            </button>
            {renderTops(topTrending)}
          </div>
        </div>
        <div className="flex-1 xl:max-w-[33%]">
          <div className="px-4">
            <button className="flex items-center mb-4 text-white group">
              <span className="mr-2 text-xl font-bold">Top Rated</span>
              <GoChevronRight className="text-2xl transition-transform duration-300 group-hover:translate-x-2" />
            </button>
            {renderTops(topRated)}
          </div>
        </div>
      </div>
    </>
  );
};
