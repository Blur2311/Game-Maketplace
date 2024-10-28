// ReadMore.tsx
import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

interface ReadMoreProps {
  text: string;
  maxLength?: number;
}

export const ReadMore: React.FC<ReadMoreProps> = ({
  text,
  maxLength = 150,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => setIsExpanded(!isExpanded);

  return (
    <>
      <div className="font-light text-textType shadow-inner">
        {isExpanded ? text : `${text.slice(0, maxLength)}...`}
      </div>
      <button
        onClick={toggleExpansion}
        className="mt-2 text-white focus:outline-none"
      >
        {isExpanded ? (
          <span className="flex items-center gap-2">
            Show Less <FaChevronUp />
          </span>
        ) : (
          <span className="flex items-center gap-2">
            Show More <FaChevronDown />
          </span>
        )}
      </button>
    </>
  );
};
