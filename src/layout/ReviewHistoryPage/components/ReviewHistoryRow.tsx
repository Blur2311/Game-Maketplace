import { Link } from "react-router-dom";

type ReviewHistoryRowProps = {
  date: string;
  game: string;
  description: string;
  rated: number;
  slug: string;
};

export const ReviewHistoryRow: React.FC<ReviewHistoryRowProps> = ({
  date,
  game,
  description,
  rated,
  slug,
}) => {
  return (
    <>
      <tr className="text-xs font-light bg-white border-b border-borderRow">
        <td className="px-5 py-[25px] align-text-top">{date}</td>
        <Link to={`/product?game=${slug}`}>
          <td className="px-5 py-[25px] align-text-top">{game}</td>
        </Link>
        <td className="px-5 py-[25px] align-text-top">{description}</td>
        <td className="px-5 py-[25px] text-right align-text-top">{rated}⭐</td>
      </tr>
    </>
  );
};
