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
      <tr className="border-borderRow border-b bg-white text-xs font-light">
        <td className="px-5 py-[25px]">{date}</td>
        <td className="px-5 py-[25px]">{game}</td>
        <td className="px-5 py-[25px]">{description}</td>
        <td className="px-5 py-[25px]">{rated}</td>
      </tr>
    </>
  );
};
