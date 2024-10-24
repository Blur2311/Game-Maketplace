import { Link } from "react-router-dom";

type LinkTypeProps = {
  text: string;
  url: string;
};

export const LinkType: React.FC<LinkTypeProps> = ({ text, url }) => {
  return (
    <>
      <Link to={url} className="">
        <div className="flex h-6 items-center rounded bg-grayBorder px-2 text-sm transition duration-300 hover:bg-gray200">
          {text}
        </div>
      </Link>
    </>
  );
};
