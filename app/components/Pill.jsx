import React, { useContext } from "react";
import { CSVContext } from "./context/CSVContext";

const Pill = ({ name, list, updateFn }) => {
  const csvContext = useContext(CSVContext);

  const removeItem = (name, updateFn, list) => {
    const updatedItems = list.filter((i) => i !== name);
    updateFn(updatedItems);
  };

  const addItem = (name) => {
    if (!list.includes(name)) {
      updateFn([...list, name]);
    } else {
      removeItem(name, updateFn, list);
    }
  };

  return (
    <div
      className={`bg-gray-700 py-1 px-2 mx-1 hover:cursor-pointer hover:bg-yellow-300 hover:text-black ${
        list.length > 0 && list.includes(name)
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
