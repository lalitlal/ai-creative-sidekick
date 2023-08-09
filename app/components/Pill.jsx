import React, { useContext } from "react";
import { CSVContext } from "./context/CSVContext";

const Pill = ({ name }) => {
  const csvContext = useContext(CSVContext);

  const removeItem = (name) => {
    const updatedItems = csvContext.selectedHeaders.filter((i) => i !== name);
    csvContext.setSelectedHeaders(updatedItems);
  };

  const addItem = (name) => {
    if (!csvContext.selectedHeaders.includes(name)) {
      csvContext.setSelectedHeaders([...csvContext.selectedHeaders, name]);
    } else {
      removeItem(name);
    }
  };

  return (
    <div
      className={`bg-gray-700 py-1 px-2 mx-1 hover:cursor-pointer hover:bg-yellow-300 hover:text-black ${
        csvContext.selectedHeaders.length > 0 &&
        csvContext.selectedHeaders.includes(name)
          ? "bg-yellow-300 text-black"
          : "bg-gray-700 text-white"
      }`}
    >
      <div
        onClick={() => {
          addItem(name);
        }}
      >
        {name}
      </div>
    </div>
  );
};

export default Pill;
