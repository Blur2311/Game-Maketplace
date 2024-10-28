import { useState } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { Rating } from "primereact/rating";

export const Review = () => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const handleSubmit = () => {
    alert(`Review Submitted: ${reviewText}, Rating: ${rating} stars`);
  };

  return (
    <div className="w-full rounded-l text-white shadow-lg">
      <h2 className="mb-4 text-xl font-semibold">Write a Review</h2>

      <div className="mb-4">
        <InputTextarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Enter your review here..."
          rows={4}
          className="w-full rounded-lg bg-gray-800 p-2 text-white"
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-gray-400">Rating:</span>
          <Rating
            value={rating}
            onChange={(e) => setRating(e.value ?? 0)} // Provide a fallback value of 0
            stars={5}
            cancel={false}
            className="custom-rating-big"
          />
        </div>

        <Button
          label="Submit a Review"
          className="rounded-md bg-mainYellow px-4 py-2 text-sm font-medium text-gray-900 transition-colors hover:bg-yellow-600"
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};
