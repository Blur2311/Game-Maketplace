import { formatDateFromLocalDateTime } from "../../../utils/OtherUtils";

type NotificationProps = {
  id: number;
  avatar?: string;
  name: string;
  action: string;
  job?: string;
  time: string;
};

export const NotificationBar: React.FC<NotificationProps> = ({
  id,
  avatar,
  name,
  action,
  job,
  time,
}) => {
  return (
    <li
      key={id}
      className="flex w-full items-start justify-between gap-4 px-4 py-2 text-left"
    >
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full">
          <img src={avatar} alt={name} className="h-full w-full object-cover" />
        </div>

        <div className="flex flex-1 flex-col gap-2">
          <p className="text-wrap text-sm">
            <span className="font-medium">{name}</span> {action}{" "}
            {job && <span className="text-mainYellow underline">{job}</span>}
          </p>

          <p className="text-xs text-textSecond">
            {formatDateFromLocalDateTime(time)}
          </p>
        </div>
      </div>
    </li>
  );
};
