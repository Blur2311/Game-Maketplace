import { Button } from "primereact/button";
import { Galleria } from "primereact/galleria";
import { useState } from "react";

type Hero = {
  content: string;
  name: string;
  image: string;
  imageThumbnail: string;
};

export const Hero = () => {
  const [items] = useState<Hero[]>([
    {
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      name: "Black Myth Wukong",
      image: "/image1.png",
      imageThumbnail: "/image1.2.jpg",
    },
    {
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      name: "Elden Ring",
      image: "/image2.png",
      imageThumbnail: "/image2.2.webp",
    },
    {
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      name: "Black Myth Wukong",
      image: "/image1.png",
      imageThumbnail: "/image1.2.jpg",
    },
    {
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      name: "Elden Ring",
      image: "/image2.png",
      imageThumbnail: "/image2.2.webp",
    },
    {
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      name: "Black Myth Wukong",
      image: "/image1.png",
      imageThumbnail: "/image1.2.jpg",
    },
    {
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      name: "Elden Ring",
      image: "/image2.png",
      imageThumbnail: "/image2.2.webp",
    },
  ]);

  const itemTemplate = (item: Hero) => {
    return (
      <div
        className={`h-full w-full rounded-3xl bg-cover bg-center font-inter shadow-navBoxshadow`}
        style={{ backgroundImage: `url("${item.image}")` }}
      >
        <div className="flex flex-col items-start justify-end w-full h-full p-5 gap-11">
          <div className="text-white">
            <h6 className="mb-3 font-medium">{item.name}</h6>
            <p className="text-base font-light max-w-80">{item.content}</p>
          </div>
          <div className="flex gap-4">
            <Button
              label="More Info"
              className="hidden w-[180px] rounded-lg bg-mainYellow px-3 py-3 text-sm hover:bg-hoverYellow sm:block"
            />
            <Button
              label="Add to Wishlist"
              icon="pi pi-plus-circle"
              className="px-3 py-3 text-sm text-white bg-transparent rounded-lg hover:bg-gray200 hover:bg-opacity-50"
            />
          </div>
        </div>
      </div>
    );
  };

  const thumbnailTemplate = (item: Hero) => {
    return (
      <div className="w-[160px] rounded-xl font-inter hover:bg-gray200 hover:bg-opacity-50 xl:w-[180px] overflow-auto">
        <div className="flex gap-4 p-[10px]">
          <img
            src={item.imageThumbnail}
            alt=""
            className="w-8 rounded-lg xl:w-10"
          />
          <p className="flex-1 text-sm font-light text-white">{item.name}</p>
        </div>
      </div>
    );
  };
  return (
    <>
      <div className="">
        <div className="flex flex-col items-center gap-5 mb-10 md:flex-row">
          <a
            href="#"
            className="flex-1 transition duration-300 hover:brightness-125"
          >
            <img src="/image1.png" alt="" className="rounded-xl" />
          </a>
          <a
            href="#"
            className="flex-1 transition duration-300 hover:brightness-125"
          >
            <img src="/image2.png" alt="" className="rounded-xl" />
          </a>
        </div>
        <Galleria
          value={items}
          item={itemTemplate}
          thumbnail={thumbnailTemplate}
          numVisible={6}
          showThumbnails
          thumbnailsPosition={"right"}
          autoPlay
          circular
          transitionInterval={5000}
          showIndicators={false}
          showItemNavigators={false}
          className="custom-galleria hidden h-[495px] w-full md:block"
        />
      </div>
    </>
  );
};
