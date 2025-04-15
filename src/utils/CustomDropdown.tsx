import React, { FC } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useDropdownContext } from "../Context/Context";
import useAnimationCleanup from "../Hooks/useAnimationCleanup";

type OptionType = {
  id: number | null;
  name: string;
  league_image_path: string;
  league_name: string;
} | null;

type CustomDropdownProps = {
  options: OptionType[];
  selected: OptionType;
  setSelected: React.Dispatch<React.SetStateAction<OptionType>>;
  dropDownStyle?: string;
  side?: string | null;
  dropDownOpen?: boolean | undefined;
};

const CustomDropdown: FC<CustomDropdownProps> = ({
  options,
  selected,
  setSelected,
  dropDownStyle,
  side,
  dropDownOpen,
}) => {
  const { closeDropdown, toggleDropdown, setSide } = useDropdownContext();
  const { isVisible } = useAnimationCleanup(dropDownOpen, 300);

  const handleSelect = (option: OptionType) => {
    setSelected(option);
    closeDropdown();
  };

  return (
    <div className="relative w-full h-full">
      <div
        className="text-white p-2 rounded-md cursor-pointer flex flex-wrap items-center gap-2 bg-dark-bg justify-between h-full"
        onClick={() => {
          toggleDropdown();
          setSide(side || null);
        }}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            toggleDropdown();
            setSide(side || null);
          }
          if (e.key === "Escape") {
            closeDropdown();
          }
        }}
      >
        <div className="flex items-center gap-3">
        <div className="h-6 w-6 sm:h-7 sm:w-7 rounded-full overflow-clip bg-gray-100 flex justify-center items-center">
            <img
              src={`${selected?.league_image_path}`}
              alt=""
              className="h-5 w-5"
            />
          </div>
          <div className="flex flex-col text-xs">
            <span>{selected?.name || "Select an option"}</span>
            <span className="text-gray-400">{selected?.league_name}</span>
          </div>
        </div>
        <span
          className={`text-gray-400 transition-transform duration-300 ${
            dropDownOpen ? "rotate-180" : ""
          }`}
        >
          <IoIosArrowDown />
        </span>
      </div>

      {isVisible && (
        <div
          className={`${
            dropDownOpen
              ? "animate-dropdown opacity-100"
              : "animate-dropdown-reverse opacity-0 pointer-events-none"
          } ${dropDownStyle} w-full max-w-[200px] bg-dark-bg text-white rounded-md shadow-lg z-10 h-fit max-h-[400px] overflow-y-scroll scroll_bar divide-y divide-dark`}
        >
          {options?.map((option, index) => (
            <button
              key={index}
              className={`${
                option?.id === selected?.id ? "bg-gray-700/50" : ""
              } p-3 hover:bg-gray-700 cursor-pointer flex items-center gap-4 w-full outline-none focus:bg-gray-700`}
              onClick={() => handleSelect(option)}
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  closeDropdown();
                }
              }}
            >
              <div className="h-5 w-5 sm:h-6 sm:w-6 rounded-full overflow-clip bg-gray-100 flex justify-center items-center">
                <img
                  src={`${option?.league_image_path}`}
                  className="h-4 w-4 sm:h-5 sm:w-5"
                  alt=""
                />
              </div>
              <div className="flex flex-col items-start">
                <div className="text-xs sm:text-base">{option?.name}</div>
                <div className="text-gray-400 text-[10px] sm:text-xs text-left">{option?.league_name}</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
