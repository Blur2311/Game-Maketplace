import { Button } from "primereact/button";
import { Rating } from "primereact/rating";

type ReviewCardProps = {
  username: string;
  date: string;
  rating: number;
  text: string;
  img?: string;
};
export const ReviewCard: React.FC<ReviewCardProps> = (review) => (
  <div className="flex flex-col justify-between gap-5 rounded-lg bg-gray-800 p-[30px] text-white">
    <div className="">
      <div className="flex items-center mb-4">
        <div className="flex items-center justify-center w-10 h-10 mr-3 overflow-hidden bg-gray-600 rounded-full">
          {review.img ? (<img src={review.img} alt="" />) : (<i className="p-avatar-icon pi pi-user"></i>)}
        </div>
        <div>
          <h4 className="font-semibold">{review.username}</h4>
          <span className="text-sm text-gray-400">{review.date}</span>
        </div>
      </div>
      <div className="mb-4">
        <Rating
          value={review.rating}
          readOnly
          stars={5}
          cancel={false}
          className="custom-rating-big"
        />
      </div>
      <p className="mb-4 text-gray-300">{review.text}</p>
    </div>
    <Button
      label="Read Full Review"
      icon="pi pi-external-link"
      className="hidden p-button-text"
      onClick={() => window.open("#", "_blank")}
    />
  </div>
);
