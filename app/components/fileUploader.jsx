"use client";
import React, { useContext, useEffect, useState } from "react";
// import FileDisplayer from "./FileDisplayer";
import { CSVContext } from "./context/CSVContext";
import { loadingCircle } from "../constants";
import FileDisplayer from "./FileDisplayer";

const FileUpload = () => {
  //   const [selectedFiles, setSelectedFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const csvContext = useContext(CSVContext);

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    csvContext.setSelectedFiles([...csvContext.selectedFiles, ...files]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    csvContext.setSelectedFiles([...csvContext.selectedFiles, ...files]);
  };

  const handleUpload = () => {
    setIsLoading(true);
    if (csvContext.selectedFiles.length === 0) {
      setErrorMessage("Please select at least one file.");
      setIsLoading(false);
      return;
    }

    // Handle file upload logic here
    // You can use libraries like Axios, Fetch, etc. to send files to the server
    const processFile = async () => {
      const file = csvContext.selectedFiles[0];
      const fileUrl = URL.createObjectURL(file);
      const response = await fetch(fileUrl);
      const text = await response.text();
      const lines = text.split("\n");
      const _data = lines.map((line) => line.split(","));
      csvContext.setCSVData(_data);
    };

    processFile();
    setIsLoading(false);
    // csvContext.setSelectedFiles([]);
    setErrorMessage("");
  };

  const displayAllFiles = () => {
    return (
      <ul className="list-disc list-inside justify-start text-left">
        {csvContext.selectedFiles.map((file, index) => (
          <li key={index}>{file.name}</li>
        ))}
      </ul>
    );
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <div className="flex justify-center mx-10 w-full">
        <div
          className="border-2 h-auto w-3/4 text-center border-dashed border-gray-400 p-4 mb-4 cursor-pointer"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className="items-center h-full justify-center align-middle flex flex-col">
            {csvContext.selectedFiles.length === 0 ? (
              <div>Drag and drop files here</div>
            ) : (
              <FileDisplayer
                selectedFiles={csvContext.selectedFiles}
                setSelectedFiles={csvContext.setSelectedFiles}
              ></FileDisplayer>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <input
          type="file"
          id="fileInput"
          multiple
          onChange={handleFileSelect}
          className="hidden"
          accept=".jpg, .jpeg, .png, .pdf, .csv"
        />
        <label
          htmlFor="fileInput"
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 cursor-pointer mx-2"
          //   onClick={handleFileSelect}
        >
          Select Files
        </label>
        <div
          onClick={handleUpload}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 cursor-pointer mx-2"
        >
          {isLoading ? loadingCircle : <div>Parse Files</div>}
        </div>
        <div className="flex-col">
          {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
};
export default FileUpload;
