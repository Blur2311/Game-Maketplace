import { Galleria } from "primereact/galleria";
import React, { useState } from "react";
import { MediaDTO } from "../../../utils/CartUtils";

interface Image {
  itemImageSrc: string;
}

interface ImageGalleryProps {
  images: Image[];
}

const convertMediaDTOToImageGalleryProps = (
  mediaDTOs: MediaDTO[],
): ImageGalleryProps => {
  const images: Image[] = mediaDTOs
    .filter((media) => media.mediaName.startsWith("p"))
    .map((media) => ({
      itemImageSrc: media.mediaUrl,
    }));

  return { images };
};

interface ImageGalleryComponentProps {
  mediaDTOs: MediaDTO[];
}

export const ImageGallery: React.FC<ImageGalleryComponentProps> = ({
  mediaDTOs,
}) => {
  const [currentImages] = useState<ImageGalleryProps>(
    convertMediaDTOToImageGalleryProps(mediaDTOs),
  );

  const responsiveOptions = [
    {
      breakpoint: "1440px",
      numVisible: 6,
    },
    {
      breakpoint: "1024px",
      numVisible: 5,
    },
    {
      breakpoint: "768px",
      numVisible: 3,
    },
    {
      breakpoint: "468px",
      numVisible: 2,
    },
  ];

  return (
    <Galleria
      value={currentImages.images}
      responsiveOptions={responsiveOptions}
      circular
      item={(item) => (
        <>
          <div className="">
            <img
              src={item.itemImageSrc}
              alt={item.itemImageSrc}
              className="rounded-xl object-cover"
            />
          </div>
        </>
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
