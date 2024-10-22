import { SaleCard } from "./SaleCard";

export const Sale = () => {
  return (
    <>
      <div className="mt-16 flex flex-col items-center justify-between gap-5 sm:flex-row">
        <SaleCard
          image={"image1.png"}
          name={"Black Wukong"}
          describe={
            "Save up to 85% - grab some of your favorite titles at huge savings."
          }
          buttonName={"Detail"}
          url={""}
        />
        <SaleCard
          image={"image1.png"}
          name={"Black Wukong"}
          describe={
            "Save up to 85% - grab some of your favorite titles at huge savings."
          }
          buttonName={"Detail"}
          url={""}
        />
        <SaleCard
          image={"image1.png"}
          name={"Black Wukong"}
          describe={
            "Save up to 85% - grab some of your favorite titles at huge savings."
          }
          buttonName={"Detail"}
          url={""}
        />
      </div>
    </>
  );
};
