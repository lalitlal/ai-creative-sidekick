"use client";
import { createContext, useState } from "react";

export const CSVContext = createContext();

export function CSVContextProvider({ children }) {
  const [csvData, setCSVData] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedReviewHeaders, setSelectedReviewHeaders] = useState([]);
  const [fileName, setFileName] = useState("");
  const [processingData, setProcessingData] = useState(false);
  const [selectedTitleHeaders, setSelectedTitleHeaders] = useState([]);
  const [
    concatenateReviewAndTitleHeaders,
    setConcatenateReviewAndTitleHeaders,
  ] = useState(false);

  return (
    <CSVContext.Provider
      value={{
        csvData,
        setCSVData,
        selectedFiles,
        setSelectedFiles,
        selectedReviewHeaders,
        setSelectedReviewHeaders,
        selectedTitleHeaders,
        setSelectedTitleHeaders,
        fileName,
        setFileName,
        processingData,
        setProcessingData,
        concatenateReviewAndTitleHeaders,
        setConcatenateReviewAndTitleHeaders,
      }}
    >
      {children}
    </CSVContext.Provider>
  );
}
