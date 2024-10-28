import { BigNews } from "./components/BigNews";
import { SmallNews } from "./components/SmallNews";

export const News = () => {
  return (
    <>
      <div className="text-white">
        <h4 className="mb-3 mt-4 text-lg font-semibold">Code Oxi News</h4>
        <div className="flex items-stretch gap-5">
          <BigNews
            img={"/deadlock1.webp"}
            date={"7D AGO"}
            title={"We played Valve's secret new shooter, Deadlock"}
            text={
              "It's like Overwatch, Dota 2, and Team Fortress 2 all baked into a pie."
            }
          />
          <BigNews
            img={"/deadlock1.webp"}
            date={"10D AGO"}
            title={"We played Valve’s secret new shooter, Deadlock"}
            text={
              "SONIC X SHADOW GENERATIONS’ developers discuss bringing the series’ second-most popular character back into the spotlight."
            }
          />
        </div>
        <div className="mt-[60px]">
          <SmallNews
            img={"/deadlock1.webp"}
            date={"7D AGO"}
            title={"We played Valve's secret new shooter, Deadlock"}
            text={
              "It's like Overwatch, Dota 2, and Team Fortress 2 all baked into a pie."
            }
          />
          <SmallNews
            img={"/deadlock1.webp"}
            date={"10D AGO"}
            title={"We played Valve’s secret new shooter, Deadlock"}
            text={
              "SONIC X SHADOW GENERATIONS’ developers discuss bringing the series’ second-most popular character back into the spotlight."
            }
          />
        </div>
      </div>
    </>
  );
};
