"use client";
import React, { useContext, useEffect, useState } from "react";
// import FileDisplayer from "./FileDisplayer";
import { CSVContext } from "./context/CSVContext";
import { loadingCircle } from "../constants";
import FileDisplayer from "./FileDisplayer";
import { parse } from "papaparse";

const FileUpload = () => {
  //   const [selectedFiles, setSelectedFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const csvContext = useContext(CSVContext);

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    csvContext.setSelectedFiles(files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    csvContext.setSelectedFiles([...csvContext.selectedFiles, ...files]);
  };

  const papaParseCallback = (data, filename) => {
    if (data.length > 1) {
      if (data[0][0] === "") {
        data.shift();
      }
      csvContext.setCSVData(data);
      csvContext.setFileName(filename);
    }
  };

  const handleUpload = async () => {
    if (csvContext.selectedFiles.length === 0) {
      setErrorMessage("Please select at least one file.");
      csvContext.setProcessingData(false);
      setTimeout(() => {
        setErrorMessage("");
      }, 2000);
      return;
    }
    // Handle file upload logic here
    // You can use libraries like Axios, Fetch, etc. to send files to the server
    const processFile = async () => {
      const file = csvContext.selectedFiles[0];
      const fileUrl = URL.createObjectURL(file);
      const response = await fetch(fileUrl);
      const text = await response.text();
      // const lines = text.split("\n");
      // const _data = lines.map((line) => line.split(","));
      const csvParse = parse(text, {
        worker: true,
        complete: function (results) {
          papaParseCallback(results.data, file.name);
        },
      });

      const response_upload = await fetch("/api/drive", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fileData: text, fileName: file.name }),
      });

      if (!response_upload.ok) {
        console.log("Something failed when hitting GCStorage!");
        throw new Error(
          `Request failed with status: ${response_upload.status}, ${response_upload.message}`
        );
      }
      // csvContext.setCSVData(_data);
      // csvContext.setFileName(file.name);
    };

    csvContext.setProcessingData(true);
    csvContext.setSelectedReviewHeaders([]);
    csvContext.setSelectedTitleHeaders([]);
    csvContext.setFileName("");
    csvContext.setCSVData([]);
    csvContext.setConcatenateReviewAndTitleHeaders(false);
    await processFile();
    csvContext.setProcessingData(false);
    setErrorMessage("");
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
          {csvContext.procesingData ? (
            <div>{loadingCircle}</div>
          ) : (
            <div>Parse Files</div>
          )}
        </div>
        <div className="flex-col">
          {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
};
export default FileUpload;
