"use client";
import { createContext, useState } from "react";

export const CSVContext = createContext();

export function CSVContextProvider({ children }) {
  const [csvData, setCSVData] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedHeaders, setSelectedHeaders] = useState([]);
  const [fileName, setFileName] = useState("");
  const [processingData, setProcessingData] = useState(false);

  return (
    <CSVContext.Provider
      value={{
        csvData,
        setCSVData,
        selectedFiles,
        setSelectedFiles,
        selectedHeaders,
        setSelectedHeaders,
        fileName,
        setFileName,
        processingData,
        setProcessingData,
      }}
    >
      {children}
    </CSVContext.Provider>
  );
}
