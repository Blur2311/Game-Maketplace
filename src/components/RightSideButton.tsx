import { NavLink } from "react-router-dom";

type RightSideButtonProps = {
  Icon: React.ElementType;
  link: string;
};

export const RightSideButton: React.FC<RightSideButtonProps> = ({
  Icon,
  link,
}) => {
  return (
    <>
      <NavLink
        to={link}
        className="rounded-lg bg-mainYellow px-4 py-[10px] transition duration-300 hover:brightness-105"
      >
        <div className="flex items-center gap-2">
          <Icon className="text-xl text-white" />
          <p className="text-center text-sm font-medium text-white">New</p>
        </div>
      </NavLink>
    </>
  );
};
