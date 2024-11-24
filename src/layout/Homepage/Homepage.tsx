import { CarouselHome } from "./components/CarouselHome";
import { ChatSupport } from "./components/ChatSupport";
import { Hero } from "./components/Hero";
import { LastChance } from "./components/LastChance";
import { SaleCard } from "./components/SaleCard";
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
      <div className="mb-32 mt-16 flex flex-col items-stretch justify-between gap-5 sm:flex-row">
        <SaleCard
          image={"sale.jpeg"}
          name={"Sales & Specials"}
          describe={
            "Save big on hit titles and hidden gems. There's always something on sale at the our Store!"
          }
          buttonName={"Browse"}
          url={"/browser"}
        />
        <SaleCard
          image={"game.jpeg"}
          name={"Games"}
          describe={
            "Explore free and free-to-play games from our collection. Come back every Thursday for a new free game!"
          }
          buttonName={"Browse"}
          url={"/browser"}
        />
        <SaleCard
          image={"app.jpeg"}
          name={"New Releases"}
          describe={
            "Check out the latest and greatest game releases! Get your hands on brand new titles every week."
          }
          buttonName={"Browse"}
          url={"/browser"}
        />
      </div>
      <ChatSupport />
    </>
  );
};
