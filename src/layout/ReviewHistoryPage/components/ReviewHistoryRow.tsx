type ReviewHistoryRowProps = {
  date: string;
  game: string;
  description: string;
  rated: number;
};

export const ReviewHistoryRow: React.FC<ReviewHistoryRowProps> = ({
  date,
  game,
  description,
  rated,
}) => {
  return (
    <>
      <tr className="text-xs font-light bg-white border-b border-borderRow">
        <td className="px-5 py-[25px]">{date}</td>
        <td className="px-5 py-[25px]">{game}</td>
        <td className="px-5 py-[25px]">{description}</td>
        <td className="px-5 py-[25px]">{rated}⭐</td>
      </tr>
    </>
  );
};
