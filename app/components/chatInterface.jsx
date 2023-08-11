"use client";
import React, { useContext, useState } from "react";
import { ChatContext } from "./context/ChatContext";
import { loadingCircle } from "../constants";
import DeployLLM from "./DeployLLM";
import { CSVContext } from "./context/CSVContext";

const TextBoxWithSubmit = () => {
  const csvContext = useContext(CSVContext);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const chatIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-8 h-8"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
      />
    </svg>
  );

  const chatContext = useContext(ChatContext);

  const handleSubmit = async (e) => {
    chatContext.setOutputText("");
    chatContext.setIsAskingLLM(true);

    console.log(
      csvContext.fileName,
      chatContext.inputText,
      csvContext.selectedHeaders
    );
    const fetchData = async () => {
      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            filename: csvContext.fileName,
            prompt: chatContext.inputText,
            columns: csvContext.selectedHeaders,
          }),
        });
        console.log("REPSONSE!!!", response);
        const tester = await response.json();
        console.log("REPONSE JSON", tester);
        if (!response.ok) {
          console.log("Something failed when hitting cloud run!");
          throw new Error(`Request failed with status: ${response.status}`);
        }

        const data = await response.json();
        console.log("DATA!!!", data);
        chatContext.setOutputText(data.message);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    e.preventDefault();
    // Handle submit logic here, e.g., send inputText to the server
    setIsLoading(true);

    const processRequest = async () => {
      // Assuming you have a handle to your llangchain object
      if (
        csvContext.selectedFiles.length > 0 &&
        csvContext.csvData.length > 0
      ) {
        await fetchData();
        setErrorMessage("");
      } else {
        setErrorMessage("You need to upload a CSV first.");
        setTimeout(() => {
          setErrorMessage("");
        }, 2000);
        chatContext.setOutputText("");
      }
    };

    setIsLoading(true);
    await processRequest();
    setIsLoading(false);
    chatContext.setIsAskingLLM(false);
  };

  return (
    <div>
      <div className="w-full flex justify-center py-5">
        <div className="flex w-3/4 justify-center items-center">
          <input
            type="text"
            value={chatContext.inputText}
            onChange={(e) => chatContext.setInputText(e.target.value)}
            className="border px-2 py-4 mr-2 flex-grow text-black"
            placeholder="Enter Prompt"
          />
          <button
            onClick={handleSubmit}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-4 px-4"
          >
            {isLoading ? loadingCircle : chatIcon}
          </button>
        </div>
      </div>
      {errorMessage && (
        <div className="flex flex-col text-center text-red-500 my-2">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default TextBoxWithSubmit;
