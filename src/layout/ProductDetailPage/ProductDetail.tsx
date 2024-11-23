import { Button } from "primereact/button";
import { Messages } from "primereact/messages";
import { Paginator } from "primereact/paginator";
import { Rating } from "primereact/rating";
import { useEffect, useRef, useState } from "react";
import { FiShare2 } from "react-icons/fi";
import { TbFlag3 } from "react-icons/tb";
import { Link } from "react-router-dom";
import { LinkType } from "../../components/LinkType";
import {
  clearMessages,
  showInfoMessages,
} from "../../utils/ErrorHandlingUtils";
import {
  calculateSalePrice,
  formatCurrency,
  formatDateFromLocalDate,
} from "../../utils/OtherUtils";
import { getImage } from "../../utils/ProductUtils";
import { useCart } from "../CartPage/hooks/useCart";
import { ImageGallery } from "./components/ImageGallery";
import ProductCard from "./components/ProductCard";
import { ReadMore } from "./components/ReadMore";
import { Review } from "./components/Review";
import { ReviewCard } from "./components/ReviewCard";
import useGameDetails from "./hook/useGameDetails";
import "./ProductDetail.css";

export const ProductDetail = () => {
  const { gameDetails, recommendations, comments, setComments, error } =
    useGameDetails();
  const { addGameToCart, handleBuyNow } = useCart();
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(3);
  const msgs = useRef<Messages>(null);

  useEffect(() => {
    console.log("comments", comments);
    if (!comments || comments.length === 0) {
      showInfoMessages(msgs, "Be the first to review this game!");
    } else {
      clearMessages(msgs);
    }
  }, [comments]);

  const onPageChange = (event: any) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  if (error) {
    return <div>Error loading game details.</div>;
  }

  if (!gameDetails) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="mt-2 text-white">
        <h1 className="text-[40px] font-black">{gameDetails.gameName}</h1>
        <div className="mt-[10px] flex items-center gap-2">
          <Rating
            value={gameDetails.rating}
            readOnly
            cancel={false}
            className="custom-rating gap-1"
          />
          {gameDetails.rating}
        </div>
        <div className="mb-5 mt-[30px] flex items-center gap-[30px] pb-2">
          <div className="border-b-2 border-mainCyan py-2">
            <p>Overview</p>
          </div>
        </div>
      </div>
      <div className="flex items-start">
        <div className="w-2/3 text-white">
          <ImageGallery mediaDTOs={gameDetails.media} />
          <div className="mt-[50px]">
            <p className="mb-[50px] font-light text-textType">
              {gameDetails.description}
            </p>
            <div className="mb-[50px] flex items-start">
              <div className="flex-1 pr-5">
                <p className="mb-2 text-sm font-light text-textType">Genres</p>
                <div className="flex flex-wrap items-center gap-2">
                  {gameDetails.categoryDetails &&
                    gameDetails.categoryDetails.map((category, index) => (
                      <LinkType
                        key={index}
                        text={category.categoryName}
                        url={""}
                      />
                    ))}
                </div>
              </div>
              {gameDetails.features && (
                <div className="flex-1 border-l border-grayBorder pl-5">
                  <p className="mb-2 text-sm font-light text-textType">Types</p>
                  <div className="flex flex-wrap items-center gap-2">
                    {gameDetails.features.split("\n").map((feature, index) => (
                      <LinkType key={index} text={feature} url={""} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="my-12">
            <ReadMore text={gameDetails.about} maxLength={200} />
          </div>
          <div className="">
            <div className="mb-6 flex items-center justify-between">
              <h6 className="text-xl font-semibold">
                {gameDetails.gameName} Related Products
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
            <div className="flex items-stretch justify-evenly">
              {recommendations &&
                recommendations.map((recommendation, index) => (
                  <ProductCard key={index} {...recommendation} />
                ))}
            </div>
          </div>
          <div className="mt-12">
            <Review
              gameId={gameDetails.sysIdGame}
              comments={comments}
              setComments={setComments}
            />
          </div>
          <div className="my-12">
            <div className="w-full rounded-lg text-white">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                  {gameDetails.gameName} Ratings & Reviews
                </h2>
                {comments && comments.length > 3 && (
                  <Link to="#" className="flex items-center font-light">
                    See All Reviews <i className="pi pi-external-link ml-2"></i>
                  </Link>
                )}
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {comments &&
                  comments.map((comment, index) => (
                    <ReviewCard
                      key={index}
                      username={comment.usersDTO?.username ?? "username"}
                      date={formatDateFromLocalDate(comment.commentDate)}
                      rating={comment.star}
                      text={comment.context}
                      img={comment.usersDTO?.avatar}
                    />
                  ))}
              </div>
              <div className="card justify-content-center flex">
                <Messages ref={msgs} />
              </div>
            </div>
          </div>
        </div>
        <div className="relative w-1/3 pl-14">
          <div className="sticky top-0 flex flex-col items-start gap-[15px]">
            <img
              src={getImage(gameDetails, "logo")}
              alt=""
              className="rounded"
            />
            <div className="flex w-full items-center justify-evenly gap-2">
              {gameDetails.discountPercent ? (
                <>
                  <div className="rounded-full bg-mainCyan px-2 py-[2px] text-xs text-black">
                    {gameDetails.discountPercent &&
                      "-" + gameDetails.discountPercent}
                    %
                  </div>
                  <p className="text-sm text-textType line-through">
                    {formatCurrency(gameDetails.price)}
                  </p>
                  <p className="text-base font-bold text-white">
                    {formatCurrency(
                      calculateSalePrice(
                        gameDetails.price,
                        gameDetails.discountPercent,
                      ),
                    )}
                  </p>
                </>
              ) : (
                <p className="w-full text-center text-base font-bold text-white">
                  {formatCurrency(
                    calculateSalePrice(
                      gameDetails.price,
                      gameDetails.discountPercent,
                    ),
                  )}
                </p>
              )}
            </div>
            <div className="flex w-full flex-col gap-[10px] text-white">
              <Button
                label="Buy Now"
                size="large"
                className="h-[50px] w-full rounded-[10px] bg-mainYellow text-sm font-medium transition duration-300 hover:brightness-110"
                onClick={() => handleBuyNow(gameDetails)}
              />
              <Button
                label="Add To Cart"
                size="large"
                className="h-[50px] w-full rounded-[10px] bg-grayBorder text-sm font-medium transition duration-300 hover:bg-gray200"
                onClick={() => addGameToCart(gameDetails, 1)}
              />
              <Button
                disabled
                label="Add to Wishlist"
                size="large"
                className="h-[50px] w-full rounded-[10px] bg-grayBorder text-sm font-medium transition duration-300 hover:bg-gray200"
              />
            </div>
            <div className="flex w-full flex-col text-sm font-light text-textType">
              <div className="flex items-center justify-between border-b border-bgCheckBox py-[10px]">
                <p>Rewards</p>
                <p className="text-white">Earn 5% Back</p>
              </div>
              <div className="flex items-center justify-between border-b border-bgCheckBox py-[10px]">
                <p>Release Date</p>
                <p className="text-white">
                  {formatDateFromLocalDate(
                    gameDetails.releaseDate?.toString() ?? "2024-11-11",
                  )}
                </p>
              </div>
            </div>
            <div className="mt-[15px] flex w-full gap-[10px] text-white">
              <button
                type="button"
                className="flex h-[32px] w-full items-center justify-center gap-2 rounded-[10px] bg-grayBorder text-sm font-medium transition duration-300 hover:bg-gray200"
              >
                <FiShare2 className="text-xl" />
                Share
              </button>
              <button
                type="button"
                className="flex h-[32px] w-full items-center justify-center gap-2 rounded-[10px] bg-grayBorder text-sm font-medium transition duration-300 hover:bg-gray200"
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
