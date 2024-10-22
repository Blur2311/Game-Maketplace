import { CarouselHome } from "./components/CarouselHome";
import { Hero } from "./components/Hero";
import { LastChance } from "./components/LastChance";
import { NewsHome } from "./components/NewsHome";
import { Sale } from "./components/Sale";
import { SaleCard } from "./components/SaleCard";
import { Top5 } from "./components/Top5";

export const Homepage: React.FC = () => {
  return (
    <>
      <Hero />
      <CarouselHome name="Discover Something New" />
      <LastChance />
      <CarouselHome name="Trending" />
      <Sale />
      <Top5 />
      <CarouselHome name="Recently Updated" />
      <NewsHome />
      <div className="mb-32 mt-16 flex flex-col items-stretch justify-between gap-5 sm:flex-row">
        <SaleCard
          image={"sale.jpeg"}
          name={"Sales & Specials"}
          describe={
            "Save big on hit titles and hidden gems. There's always something on sale at the Epic Games Store!"
          }
          buttonName={"Browse"}
          url={""}
        />
        <SaleCard
          image={"game.jpeg"}
          name={"Games"}
          describe={
            "Explore free and free-to-play games from our collection. Come back every Thursday for a new free game!"
          }
          buttonName={"Browse"}
          url={""}
        />
        <SaleCard
          image={"app.jpeg"}
          name={"Apps"}
          describe={
            "Enjoy some of the best Apps for music, gaming, creating, and more!"
          }
          buttonName={"Browse"}
          url={""}
        />
      </div>
    </>
  );
};
