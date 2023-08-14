import React, { useContext, useState } from "react";
import { CSVContext } from "./context/CSVContext";
import { dropdownLogo } from "../constants";

const DropdownWithCheckboxes = ({
  options,
  selectedOptions,
  setSelectedOptions,
}) => {
  const csvContext = useContext(CSVContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckboxChange = (option) => {
    setSelectedOptions((prevSelectedOptions) => {
      if (prevSelectedOptions.includes(option)) {
        return prevSelectedOptions.filter((item) => item !== option);
      } else {
        return [...prevSelectedOptions, option];
      }
    });
  };

  return (
    <div className="">
      <button
        onClick={toggleDropdown}
        className="bg-slate-700 py-2 px-4 border flex w-full "
      >
        Select Headers {dropdownLogo}
      </button>
      {isOpen && (
        <div className="mt-2 bg-slate-600 border rounded shadow overflow-y-scroll h-48 w-full">
          {options.map((option) => (
            <label
              key={option}
              className="flex items-center p-2 hover:bg-slate-700 hover:cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedOptions.includes(option)}
                onChange={() => handleCheckboxChange(option)}
                className="mr-2"
              />
              {option}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownWithCheckboxes;
