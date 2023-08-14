"use client";
import React, { useContext } from "react";
import { ChatContext } from "./context/ChatContext";
import { loadingChatOutput, loadingCircle } from "../constants";

const ChatOutput = () => {
  const chatContext = useContext(ChatContext);
  return (
    <>
      {chatContext.isAskingLLM && (
        <div className="w-full flex justify-center items-center text-center mx-auto py-4">
          <div className="flex flex-col items-center w-3/4 h-48 overflow-y-scroll border border-white">
            {loadingChatOutput}
          </div>
        </div>
      )}
      {chatContext.outputText && (
        <div className="w-full flex justify-center text-left py-4">
          <div className="w-3/4 h-48 overflow-y-scroll border border-white">
            {chatContext.outputText}
          </div>
        </div>
      )}
    </>
  );
};

export default ChatOutput;
