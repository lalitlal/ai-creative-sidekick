import React, { useContext } from "react";
import { trashIcon } from "../constants";
import { CSVContext } from "./context/CSVContext";

const FileDisplayer = ({ selectedFiles, setSelectedFiles }) => {
  const csvContext = useContext(CSVContext);
  const handleDeleteFile = (index) => {
    const newArr = [...selectedFiles];
    newArr.splice(index, 1);
    setSelectedFiles(newArr);
    if (newArr.length === 0) {
      csvContext.setCSVData([]);
      csvContext.setSelectedReviewHeaders([]);
      csvContext.setSelectedTitleHeaders([]);
      csvContext.setFileName("");
      csvContext.setSelectedFiles([]);
    }
  };
  return (
    <div className="w-full text-white text-left ">
      {selectedFiles?.map((file, index) => {
        return (
          <div key={index} className="flex w-full">
            <div className="border border-white p-4 my-2 bg-gray-800 w-full">
              {file.name}
            </div>
            <div
              onClick={() => handleDeleteFile(index)}
              className="hover:text-yellow-300 hover:cursor-pointer"
            >
              {trashIcon}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FileDisplayer;
