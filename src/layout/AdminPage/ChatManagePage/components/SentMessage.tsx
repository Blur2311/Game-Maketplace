import { timeAgo } from "../../../../utils/OtherUtils";

type SentMessageProps = {
  avatar: string;
  name: string;
  message: string;
  img?: string;
  date: string;
};

export const SentMessage: React.FC<SentMessageProps> = (props) => {
  return (
    <>
      <div className="flex items-end">
        <div className="ml-auto flex max-w-[500px] flex-row-reverse items-start gap-4">
          <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border-2 border-white">
            <img src={props.avatar} alt="" className="object-cover" />
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <div className="rounded-[20px] bg-mainYellow px-4 py-2 shadow-adminBoxshadow">
              <div className="flex flex-col gap-2 text-white">
                <h6 className="text-sm font-medium">{props.name}</h6>
                {props.img && (
                  <div className="flex h-[200px] w-[200px] items-center justify-center overflow-hidden">
                    <img src={props.img} alt="" className="object-cover" />
                  </div>
                )}
                <p>{props.message}</p>
              </div>
            </div>

            <div className="justify-content-end flex px-4">
              <p className="truncate text-xs">{timeAgo(props.date)}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
