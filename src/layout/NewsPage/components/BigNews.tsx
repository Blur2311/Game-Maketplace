import { Link } from "react-router-dom";

type BigNewsProps = {
  img: string;
  date: string;
  title: string;
  text: string;
};

export const BigNews: React.FC<BigNewsProps> = (props) => {
  return (
    <>
      <div className="flex-1">
        <div className="flex h-full flex-col items-start justify-between">
          <div className="">
            <Link to={"/news/detail/1"}>
              <img src={props.img} alt="" className="rounded" />
            </Link>
            <p className="mb-1 mt-[15px] text-[9px] font-medium text-textType">
              {props.date}
            </p>
            <Link to={"/news/detail/1"}>
              <h2 className="mt-5 text-sm font-bold">{props.title}</h2>
            </Link>
            <p className="my-4 text-sm text-textType">{props.text}</p>
          </div>
          <Link
            to={"/news/detail/1"}
            className="border-b border-textType border-opacity-65 bg-transparent text-base font-normal text-white transition duration-300 hover:border-white"
          >
            Read More
          </Link>
        </div>
      </div>
    </>
  );
};
