"use client";
import { createContext, useState } from "react";

export const ChatContext = createContext();

export function ChatContextProvider({ children }) {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isAskingLLM, setIsAskingLLM] = useState(false);
  const [chatId, setChatId] = useState(undefined);

  return (
    <ChatContext.Provider
      value={{
        inputText,
        setInputText,
        outputText,
        setOutputText,
        isAskingLLM,
        setIsAskingLLM,
        chatId,
        setChatId,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
