import React, { useState } from "react";
import { Galleria } from "primereact/galleria";

export const ImageGallery: React.FC = () => {
  const [images] = useState([
    {
      itemImageSrc: "/image2.png",
    },
    {
      itemImageSrc: "/image1.png",
    },
    {
      itemImageSrc: "/image2.png",
    },
    {
      itemImageSrc: "/image1.png",
    },
    {
      itemImageSrc: "/image2.png",
    },
    {
      itemImageSrc: "/image1.png",
    },
    {
      itemImageSrc: "/image2.png",
    },
    {
      itemImageSrc: "/image1.png",
    },
    {
      itemImageSrc: "/image2.png",
    },
    {
      itemImageSrc: "/image1.png",
    },
  ]);

  const responsiveOptions = [
    {
      breakpoint: "1024px",
      numVisible: 5,
    },
    {
      breakpoint: "768px",
      numVisible: 3,
    },
    {
      breakpoint: "560px",
      numVisible: 1,
    },
  ];

  return (
    <Galleria
      value={images}
      responsiveOptions={responsiveOptions}
      numVisible={6}
      circular
      item={(item) => (
        <img
          src={item.itemImageSrc}
          alt={item.itemImageSrc}
          className="w-full rounded-xl"
        />
      )}
      thumbnail={(item) => (
        <div className="max-h-24 max-w-24">
          <img
            src={item.itemImageSrc}
            alt={item.itemImageSrc}
            className="rounded-lg"
          />
        </div>
      )}
      className="image-gall-custom"
    />
  );
};
