import { Galleria } from "primereact/galleria";
import React, { useState } from "react";
import { MediaDTO } from "../../../utils/CartUtils";


interface Image {
  itemImageSrc: string;
}

interface ImageGalleryProps {
  images: Image[];
}

const convertMediaDTOToImageGalleryProps = (mediaDTOs: MediaDTO[]): ImageGalleryProps => {
  const images: Image[] = mediaDTOs
    .filter(media => media.mediaName.startsWith('p'))
    .map(media => ({
      itemImageSrc: media.mediaUrl,
    }));

  return { images };
};

interface ImageGalleryComponentProps {
  mediaDTOs: MediaDTO[];
}

export const ImageGallery: React.FC<ImageGalleryComponentProps> = ({ mediaDTOs }) => {
  const [currentImages] = useState<ImageGalleryProps>(convertMediaDTOToImageGalleryProps(mediaDTOs));


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
      value={currentImages.images}
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
