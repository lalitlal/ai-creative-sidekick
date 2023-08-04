"use client";
import { createContext, useState } from "react";

export const CSVContext = createContext();

export function CSVContextProvider({ children }) {
  const [csvData, setCSVData] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);

  return (
    <CSVContext.Provider
      value={{ csvData, setCSVData, selectedFiles, setSelectedFiles }}
    >
      {children}
    </CSVContext.Provider>
  );
}
