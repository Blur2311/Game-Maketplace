import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { Rating } from "primereact/rating";
import { useState } from "react";
import { toast } from "react-toastify";
import apiClient from "../../../config/apiClient";
import { getDecodeToken } from "../../../utils/AuthUtils";
import { CommentDTO } from "../hook/useGameDetails";

interface ReviewProps {
  gameId: number;
}

export const Review: React.FC<ReviewProps> = ({ gameId }) => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const isCommentValid = () => {
    if (getDecodeToken() === null) {
      toast.warn("Please login to submit a review");
      return false;
    }
    if (!reviewText) {
      toast.warn("Please enter a review");
      return false;
    }
    if (!rating) {
      toast.warn("Please select a rating");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!isCommentValid()) return;
    const comment: CommentDTO = {
      usersDTO: {username: getDecodeToken()?.sub ?? ''},
      context: reviewText,
      commentDate: new Date().toISOString(),
      gameId,
      star: rating,
    };

    try {
      await apiClient.post("/api/comments", comment);
      toast.success("Review submitted successfully");
      setReviewText('');
      setRating(0);      
    } catch (error: any) {
      console.error("Error submitting review:", error);
      toast.error(error.response.data.message ?? "Failed to submit review");
    }
  };

  return (
    <div className="w-full text-white rounded-l shadow-lg">
      <h2 className="mb-4 text-xl font-semibold">Write a Review</h2>

      <div className="mb-4">
        <InputTextarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Enter your review here..."
          rows={4}
          className="w-full p-2 text-white bg-gray-800 rounded-lg"
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-gray-400">Rating:</span>
          <Rating
            value={rating}
            onChange={(e) => setRating(e.value ?? 0)}
            stars={5}
            cancel={false}
            className="custom-rating-big"
          />
        </div>

        <Button
          label="Submit a Review"
          disabled={!reviewText || !rating}
          className="px-4 py-2 text-sm font-medium text-gray-900 transition-colors rounded-md bg-mainYellow hover:bg-yellow-600"
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};
