import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import apiClient from "../../config/apiClient";
import { getUsernameFromToken } from "../../utils/AuthUtils";
import { formatDateToDDMMYYYY, isDateValid } from "../../utils/OtherUtils";
import { CommentDTO } from "../ProductDetailPage/hook/useGameDetails";
import { ReviewHistoryRow } from "./components/ReviewHistoryRow";

export const ReviewHistory = () => {
  const [description, setDescription] = useState<string>("");
  const [dates, setDates] = useState<Date[] | null>(null);
  const [selectedDates, setSelectedDates] = useState<Date[] | null>(null);
  const [reviews, setReviews] = useState<CommentDTO[]>([]);
  const [filteredReviews, setFilteredReviews] = useState<CommentDTO[]>([]);
  const [length, setLength] = useState<number>(5);

  const handleDateChange = (e: any) => {
    setDates(e.value);
  };

  const fetchReviews = async () => {
    const username = getUsernameFromToken();
    if (!username) return;
    try {
      const response = await apiClient.get(
        `/api/comments/get-comment-by-username?username=${username}`,
      );
      setReviews(response.data.data);
      setFilteredReviews(response.data.data);
    } catch (error) {
      console.error("Failed to fetch reviews", error);
    }
  };

  const filterReviews = () => {
    if (!dates) return setFilteredReviews(reviews);
    const filtered = reviews.filter((review) => {
      return (
        isDateValid(review.commentDate, dates[0], dates[1]) &&
        review.context.includes(description)
      );
    });
    setSelectedDates(dates);
    setFilteredReviews(filtered);
  };

  const handleDescriptionChange = (e: any) => {
    setDescription(e.target.value);
    const filtered = reviews.filter((review) => {
      let isMatch = review.context.includes(e.target.value);
      if (selectedDates) {
        isMatch =
          isMatch &&
          isDateValid(review.commentDate, selectedDates[0], selectedDates[1]);
      }
      return isMatch;
    });
    setFilteredReviews(filtered);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <>
      <div className="pl-5">
        <div className="p-10 bg-white rounded">
          <h1 className="text-3xl">My Review</h1>
          <h6 className="mt-[15px] text-sm font-light">
            Reviews you have written.
          </h6>
          <div className="mt-[30px]">
            <div className="flex items-center justify-between">
              <FloatLabel className="text-sm">
                <InputText
                  className="h-[50px] w-full border border-grayBorder bg-transparent p-5 ps-[10px]"
                  onChange={(e) => handleDescriptionChange(e)}
                />
                <label>Description</label>
              </FloatLabel>
              <div className="flex items-center gap-2">
                <FloatLabel className="text-sm">
                  <Calendar
                    value={dates}
                    selectionMode="range"
                    onChange={handleDateChange}
                    className="h-[50px] min-w-52 rounded border border-grayBorder bg-transparent px-[10px]"
                    readOnlyInput
                  />
                  <label>Date Range</label>
                </FloatLabel>
                <Button
                  icon="pi pi-filter"
                  size="large"
                  className="h-[50px] w-[50px] bg-mainYellow text-base font-bold text-slate-900"
                  onClick={filterReviews}
                />
              </div>
            </div>
          </div>
          <div className="mt-5">
            <div className="">
              <div className="mb-5 rounded bg-[#F2F2F2] px-5 pb-5 shadow-sm">
                <table className="w-full rounded-xl">
                  <thead>
                    <tr className="text-left">
                      <th className="p-5 text-xs font-light">Date</th>
                      <th className="p-5 text-xs font-light">Game</th>
                      <th className="p-5 text-xs font-light">Description</th>
                      <th className="p-5 text-xs font-light text-right">
                        Rated
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredReviews.slice(0, length).map((review) => (
                      <ReviewHistoryRow
                        key={review.sysIdComment}
                        date={formatDateToDDMMYYYY(review.commentDate)}
                        game={review.gameDTO?.gameName ?? ""}
                        description={review.context}
                        rated={review.star}
                        slug={review.gameDTO?.slug ?? ""}
                      />
                    ))}
                  </tbody>
                </table>
                <div className="flex justify-center gap-5 mt-3">
                  <Button
                    hidden={
                      filteredReviews.length <= 5 ||
                      length >= filteredReviews.length
                    }
                    label={"SHOW MORE"}
                    size="large"
                    className="mt-5 h-[50px] w-[150px] bg-gray250 text-xs font-bold text-slate-900"
                    onClick={() => setLength(length + 5)}
                  />
                  <Button
                    hidden={length <= 5}
                    label={"SHOW LESS"}
                    size="large"
                    className="mt-5 h-[50px] w-[150px] bg-gray250 text-xs font-bold text-slate-900"
                    onClick={() => setLength(length - 5)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
