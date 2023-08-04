"use client";
import React, { useContext, useEffect } from "react";
import { CSVContext } from "./context/CSVContext";

const CSVPreviewer = () => {
  const csvContext = useContext(CSVContext);
  const headers = csvContext.csvData[0];
  const rows = csvContext.csvData.slice(1);
  return (
    csvContext.selectedFiles.length > 0 &&
    csvContext.csvData.length > 0 && (
      <>
        <div className="w-full flex justify-center text-center py-4">
          <div className="w-3/4 h-48 overflow-scroll border border-white">
            <table>
              <thead className="border border-b text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  {headers?.map((header, i) => (
                    <th className="px-3 py-3" key={i}>
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows?.map((rowData, i) => {
                  return (
                    <tr
                      className="border border-b bg-white dark:bg-gray-800 dark:border-gray-700"
                      key={i}
                    >
                      {rowData?.map((data, i) => {
                        return (
                          <td key={i} className="px-3 py-4">
                            {data}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </>
    )
  );
};

export default CSVPreviewer;
