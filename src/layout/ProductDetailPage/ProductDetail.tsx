import { Rating } from "primereact/rating";
import { ImageGallery } from "./components/ImageGallery";
import "./ProductDetail.css";
import { LinkType } from "../../components/LinkType";
import { formatCurrency, calculateSalePrice } from "../../utils/OtherUtils";
import { Button } from "primereact/button";
import { IoChevronDownOutline } from "react-icons/io5";
import { FiShare2 } from "react-icons/fi";
import { TbFlag3 } from "react-icons/tb";
import ProductCard from "./components/ProductCard";
import { Paginator } from "primereact/paginator";
import { useState } from "react";
import { Review } from "./components/Review";
import { ReviewCard } from "./components/ReviewCard";
import { ReadMore } from "./components/ReadMore";

export const ProductDetai = () => {
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(3);

  const onPageChange = (event: any) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  const reviews = [
    {
      username: "TheGamer",
      date: "20-11-2024",
      rating: 3,
      text: "It's beautiful, frantic, challenging, and a delight to play.",
    },
    {
      username: "IGN",
      date: "20-11-2024",
      rating: 4,
      text: "Despite some frustrating technical issues, Black Myth: Wukong is a great action game with fantastic combat, exciting bosses, tantalizing secrets, and a beautiful world.",
    },
    {
      username: "PC Gamer",
      date: "20-11-2024",
      rating: 5,
      text: "Black Myth: Wukong blossoms with an eccentric cast of characters and expressive combat all wrapped up in the rich world of its source material.",
    },
  ];
  return (
    <>
      <div className="mt-2 text-white">
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
      </div>
      <div className="flex items-start">
        <div className="w-2/3 text-white">
          <ImageGallery />
          <div className="mt-[50px]">
            <p className="mb-[50px] font-light text-textType">
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
          <div className="my-12">
            <ReadMore
              text={
                "Black Myth: Wukong is an action RPG rooted in Chinese mythology. You shall set out as the Destined One to venture into the challenges and marvels ahead, to uncover the obscured truth beneath the veil of a glorious legend from the past. Black Myth: Wukong is an action RPG rooted in Chinese mythology. The story is based on Journey to the West, one of the Four Great Classical Novels of Chinese literature. You shall set out as the Destined One to venture into the challenges and marvels ahead, to uncover the obscured truth beneath the veil of a glorious legend from the past."
              }
              maxLength={200}
            />
          </div>
          <div className="">
            <div className="mb-6 flex items-center justify-between">
              <h6 className="text-xl font-semibold">
                Black Myth: Wukong Related Products & Add-Ons
              </h6>
              <Paginator
                first={first} // bắt đầu từ đâu
                rows={rows} // bao nhiêu cột hiển thị
                totalRecords={100} // Độ dài dữ liệu
                template=" PrevPageLink  NextPageLink"
                onPageChange={onPageChange}
                className="custom-pagi-browser bg-bgMainColor px-0"
              />
            </div>
            <div className="flex items-start justify-between">
              <ProductCard />
              <ProductCard />
              <ProductCard />
            </div>
          </div>
          <div className="mt-12">
            <Review />
          </div>
          <div className="my-12">
            <div className="w-full rounded-lg text-white">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                  Black Myth: Wukong Ratings & Reviews
                </h2>
                <a href="#" className="flex items-center font-light">
                  See All Reviews <i className="pi pi-external-link ml-2"></i>
                </a>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {reviews.map((review, index) => (
                  <ReviewCard
                    key={index}
                    username={review.username}
                    date={review.date}
                    rating={review.rating}
                    text={review.text}
                    // img={""}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="relative w-1/3 pl-14">
          <div className="sticky top-0 flex flex-col items-start gap-[15px]">
            <img src="sideimage.avif" alt="" className="rounded" />
            <LinkType text={"Steam Games"} url={""} />
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-mainCyan px-2 py-[2px] text-xs text-black">
                -80%
              </div>
              <p className="text-sm text-textType line-through">
                {formatCurrency(110000)}
              </p>
              <p className="text-base font-bold text-white">
                {formatCurrency(calculateSalePrice(110000, 80))}
              </p>
            </div>
            <div className="flex w-full flex-col gap-[10px] text-white">
              <Button
                label="Buy Now"
                size="large"
                className="h-[50px] w-full rounded-[10px] bg-mainYellow text-sm font-medium transition duration-300 hover:brightness-110"
                // onClick={handleLogin}
                // disabled={isLockedOut}
              />
              <Button
                label="Add To Cart"
                size="large"
                className="h-[50px] w-full rounded-[10px] bg-grayBorder text-sm font-medium transition duration-300 hover:bg-gray200"
                // onClick={handleLogin}
                // disabled={isLockedOut}
              />
              <Button
                label="Add to Wishlist"
                size="large"
                className="h-[50px] w-full rounded-[10px] bg-grayBorder text-sm font-medium transition duration-300 hover:bg-gray200"
                // onClick={handleLogin}
                // disabled={isLockedOut}
              />
            </div>
            <div className="flex w-full flex-col text-sm font-light text-textType">
              <div className="flex items-center justify-between border-b border-bgCheckBox py-[10px]">
                <p>Rewards</p>
                <p className="text-white">Earn 5% Back</p>
              </div>
              <div className="flex items-center justify-between border-b border-bgCheckBox py-[10px]">
                <p>Release Date</p>
                <p className="text-white">08/20/24</p>
              </div>
            </div>
            <a
              href="#"
              className="flex items-center gap-1 text-sm font-light text-white hover:underline"
            >
              See All Editions and Add-Ons
              <IoChevronDownOutline className="text-xl" />
            </a>
            <div className="mt-[15px] flex w-full gap-[10px] text-white">
              <button
                type="button"
                className="flex h-[32px] w-full items-center justify-center gap-2 rounded-[10px] bg-grayBorder text-sm font-medium transition duration-300 hover:bg-gray200"
                // onClick={handleLogin}
                // disabled={isLockedOut}
              >
                <FiShare2 className="text-xl" />
                Share
              </button>
              <button
                type="button"
                className="flex h-[32px] w-full items-center justify-center gap-2 rounded-[10px] bg-grayBorder text-sm font-medium transition duration-300 hover:bg-gray200"
                // onClick={handleLogin}
                // disabled={isLockedOut}
              >
                <TbFlag3 className="text-xl" />
                Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
