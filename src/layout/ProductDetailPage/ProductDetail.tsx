import { Rating } from "primereact/rating";
import { ImageGallery } from "./components/ImageGallery";
import "./ProductDetail.css";
import { LinkType } from "./components/LinkType";

export const ProductDetai = () => {
  return (
    <>
      <div className="mt-2 flex items-start">
        <div className="w-2/3 text-white">
          <h1 className="text-[40px] font-black">Black Myth: Wukong</h1>
          <div className="mt-[10px] flex items-center gap-2">
            <Rating
              value={4}
              readOnly
              cancel={false}
              className="custom-rating gap-1"
            />
            4.9
          </div>
          <div className="mb-5 mt-[30px] flex items-center gap-[30px] pb-2">
            <div className="border-b-2 border-mainCyan py-2">
              <p>Overview</p>
            </div>
            <div className="cursor-pointer py-2">
              <p>Add-Ons</p>
            </div>
          </div>
          <ImageGallery />
          <div className="mt-[50px]">
            <p className="mb-[50px] font-light">
              Black Myth: Wukong is an action RPG rooted in Chinese mythology.
              You shall set out as the Destined One to venture into the
              challenges and marvels ahead, to uncover the obscured truth
              beneath the veil of a glorious legend from the past.
            </p>
            <div className="mb-[50px] flex items-start">
              <div className="flex-1 pr-5">
                <p className="mb-2 text-sm font-light text-textType">Genres</p>
                <div className="flex flex-wrap items-center gap-2">
                  <LinkType text={"Action"} url={""} />
                  <LinkType text={"Adventure"} url={""} />
                  <LinkType text={"RPG"} url={""} />
                </div>
              </div>

              <div className="flex-1 border-l border-grayBorder pl-5">
                <p className="mb-2 text-sm font-light text-textType">Types</p>
                <div className="flex flex-wrap items-center gap-2">
                  <LinkType text={"Steam Games"} url={""} />
                  <LinkType text={"Entertainment"} url={""} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/3 pl-14"></div>
      </div>
    </>
  );
};
