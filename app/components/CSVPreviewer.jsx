"use client";
import React, { useContext, useEffect } from "react";
import { CSVContext } from "./context/CSVContext";
import Pill from "./Pill";
import DeployLLM from "./DeployLLM";

const CSVPreviewer = () => {
  const csvContext = useContext(CSVContext);
  const headers = csvContext.csvData[0];
  const rows = csvContext.csvData.slice(1);
  return (
    csvContext.selectedFiles.length > 0 &&
    csvContext.csvData.length > 0 && (
      <>
        {/* <div className="w-full flex justify-center text-center py-4">
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
        </div> */}
        {headers ? (
          <div className="flex-col flex w-full text-center justify-center mt-3">
            Select which headers you want the sidekick to focus on.
          </div>
        ) : (
          ""
        )}

        <div className="w-full flex justify-center text-center">
          <div className="w-3/4 border flex flex-wrap justify-center items-center text-center py-8">
            {headers?.map((header, i) => (
              <div className="flex items-center text-center mb-4" key={i}>
                <Pill name={header} />
              </div>
            ))}
          </div>
        </div>
      </>
    )
  );
};

export default CSVPreviewer;
