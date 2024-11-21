type ChatPersonProps = {
  id: number;
  name: string;
  avatar: string;
  mess: string;
  date: string;
  isSelected: boolean;
  onSelect: (id: number) => void;
  unread: boolean;
};

export const ChatPerson: React.FC<ChatPersonProps> = (props) => {
  return (
    <>
      <li onClick={() => props.onSelect(props.id)}>
        <div
          className={`flex cursor-pointer items-center gap-2 rounded-lg p-2 ${props.isSelected ? "bg-black bg-opacity-10" : "hover:bg-black hover:bg-opacity-5"}`}
        >
          <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border-2 border-white">
            <img src={props.avatar} alt="" className="object-cover" />
          </div>

          <div className="flex-1 overflow-hidden">
            <h6
              className={`truncate text-sm text-black ${props.unread ? "font-bold" : "font-medium"}`}
            >
              {props.name}
            </h6>
            <p
              className={`flex items-center gap-2 truncate text-sm ${props.unread ? "font-medium text-black" : "text-textSecond"}`}
            >
              {props.unread && (
                <div className="h-2 w-2 rounded-full bg-mainYellow"></div>
              )}
              {props.mess}
            </p>
          </div>

          <div className="">
            <p
              className={`whitespace-nowrap text-xs ${props.unread ? "font-medium text-black" : "text-textSecond"}`}
            >
              {props.date}
            </p>
          </div>
        </div>
      </li>
    </>
  );
};
