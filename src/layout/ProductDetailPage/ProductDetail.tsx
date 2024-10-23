import { ImageGallery } from "./components/ImageGallery";

export const ProductDetai = () => {
  return (
    <>
      <div className="mt-2 flex items-start">
        <div className="w-3/4">
          <ImageGallery />
        </div>
        <div className="w-1/4 pl-16"></div>
      </div>
    </>
  );
};
