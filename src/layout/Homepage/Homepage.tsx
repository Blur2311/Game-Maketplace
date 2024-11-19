import { CarouselHome } from "./components/CarouselHome";
import { ChatSupport } from "./components/ChatSupport";
import { Hero } from "./components/Hero";
import { LastChance } from "./components/LastChance";
import { Top5 } from "./components/Top5";

export const Homepage: React.FC = () => {
  return (
    <>
      <Hero />
      <CarouselHome name="Discover Something New" field="releaseDate" />
      <LastChance />
      <CarouselHome name="Trending" field="rating" />
      {/* <Sale /> */}
      <Top5 />
      <CarouselHome name="Recently Updated" field="discountPercent" />
      {/* <NewsHome /> */}
      {/* <div className="flex flex-col items-stretch justify-between gap-5 mt-16 mb-32 sm:flex-row">
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
      </div> */}
      <ChatSupport />
    </>
  );
};
