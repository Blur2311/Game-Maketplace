import { Link } from "react-router-dom";

type SmallNewsProps = {
  img: string;
  date: string;
  title: string;
  text: string;
};

export const SmallNews: React.FC<SmallNewsProps> = (props) => {
  return (
    <>
      <div className="">
        <hr className="opacity-65" />
        <div className="mb-[30px] flex items-start gap-5 pt-5">
          <img src={props.img} alt="" className="max-w-[200px] rounded" />
          <div className="">
            <p className="mb-1 text-[9px] font-medium text-textType">
              {props.date}
            </p>
            <h2 className="my-5 text-sm font-bold">{props.title}</h2>
            <p className="my-[14px] text-sm text-textType">{props.text}</p>
            <Link
              to={""}
              className="border-b border-textType border-opacity-65 bg-transparent text-base font-normal text-white transition duration-300 hover:border-white"
            >
              Read More
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
