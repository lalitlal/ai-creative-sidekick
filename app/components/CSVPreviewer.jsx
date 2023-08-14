"use client";
import React, { useContext, useEffect, useState } from "react";
import { CSVContext } from "./context/CSVContext";
import Pill from "./Pill";
import DeployLLM from "./DeployLLM";
import { loadingHeaders } from "../constants";
import NewPill from "./NewPill";

const CSVPreviewer = () => {
  const csvContext = useContext(CSVContext);
  const [headers, setHeaders] = useState([]);

  useEffect(() => {
    setHeaders(csvContext.csvData[0]);
    // csvContext.csvData.slice(1);
  }, [csvContext.csvData, csvContext.processingData]);
  return (
    // csvContext.selectedFiles.length > 0 && (
    // csvContext.csvData.length > 0 && (

    <>
      {csvContext.processingData && (
        <div className="w-full flex justify-center text-center">
          {/* {" "}
          YOU NEED TO FIX THIS */}
          <div className="w-3/4 border flex flex-wrap justify-center items-center text-center py-8">
            {loadingHeaders}
          </div>
        </div>
      )}
      {headers ? (
        <div className="flex-col flex w-full text-center justify-center mt-3">
          <div className="sm:text-2xl text-xl font-medium title-font text-gray-300">
            Select which column(s) you want to combine for the reviews.
          </div>
          <div className="w-full flex justify-center text-center">
            <div className="w-3/4 border flex flex-wrap justify-center items-center text-center py-8">
              <NewPill
                options={headers}
                selectedOptions={csvContext.selectedReviewHeaders}
                setSelectedOptions={csvContext.setSelectedReviewHeaders}
              ></NewPill>
              {csvContext.processingData && loadingHeaders}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      {headers ? (
        <div className="flex-col flex w-full text-center justify-center mt-3">
          <div className="sm:text-2xl text-xl font-medium title-font text-gray-300">
            Select which column(s) you want to combine for the title.
          </div>{" "}
          <div className="w-full flex justify-center text-center">
            <div className="w-3/4 border flex flex-wrap justify-center items-center text-center py-8">
              {/* {headers?.map((header, i) => (
                  <div className="flex items-center text-center mb-4" key={i}>
                    <Pill
                      name={header}
                      list={csvContext.selectedTitleHeaders}
                      updateFn={csvContext.setSelectedTitleHeaders}
                    />
                  </div>
                ))} */}
              <NewPill
                options={headers}
                selectedOptions={csvContext.selectedTitleHeaders}
                setSelectedOptions={csvContext.setSelectedTitleHeaders}
              ></NewPill>
              {csvContext.processingData && loadingHeaders}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      {headers ? (
        <div className="flex-col flex w-full text-center justify-center mt-3">
          <div className="w-full flex justify-center text-center sm:text-2xl text-xl font-medium title-font text-gray-300">
            <input
              type="checkbox"
              checked={csvContext.concatenateReviewAndTitleHeaders}
              onChange={() => {
                csvContext.setConcatenateReviewAndTitleHeaders(
                  !csvContext.concatenateReviewAndTitleHeaders
                );
              }}
              className="mr-2 hover:cursor-pointer"
            />
            Do you want to concatenate reviews and titles?
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default CSVPreviewer;
