import { Button } from "primereact/button";
import { Galleria } from "primereact/galleria";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiClient from "../../../config/apiClient";
import { getImage } from "../../../utils/ProductUtils";

type Hero = {
  content: string;
  name: string;
  image: string;
  imageThumbnail: string;
  slug?: string;
};

export const Hero = () => {
  const [items, setItems] = useState<Hero[]>([
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

  useEffect(() => {
    loadTop6Items();
  }, []);

  const loadTop6Items = async () => {
    let requestParams = {
      field: "quantitySold",
      page: 0,
      size: 6,
    };
    const result = await apiClient
      .get(`/api/games/p/sort`, {
        params: requestParams,
      })
      .then((response) => {
        return response.data.data;
      })
      .catch((error) => {
        console.error(error);
      });
    const newItems: Hero[] = [];
    await result.forEach((item: any) => {
      let image = getImage(item, "p1");
      let thumbnail = getImage(item, "thumbnail");
      newItems.push({
        content: item.description,
        name: item.gameName,
        image: image ?? "/image1.png",
        imageThumbnail: thumbnail ?? "/image1.2.jpg",
        slug: `/product/${item.slug}`,
      });
    });
    setItems(newItems);
  };

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
            <Link to={item.slug ?? "/"}>
              <Button
                label="More Info"
                className="hidden w-[180px] rounded-lg bg-mainYellow px-3 py-3 text-sm hover:bg-hoverYellow sm:block"
              />
            </Link>
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
      <div className="w-[160px] overflow-auto rounded-xl font-inter hover:bg-gray200 hover:bg-opacity-50 xl:w-[180px]">
        <div className="flex gap-4 p-[10px]">
          <img
            src={item.imageThumbnail}
            alt=""
            className="rounded-lg hero-thumbnail-img xl:w-10"
          />
          <p className="flex-1 hero-mini-game-description">{item.name}</p>
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
          className="hidden w-full custom-galleria md:block"
        />
      </div>
    </>
  );
};
