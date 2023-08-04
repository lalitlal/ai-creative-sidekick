"use client";
import { createContext, useState } from "react";

export const ChatContext = createContext();

export function ChatContextProvider({ children }) {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");

  return (
    <ChatContext.Provider
      value={{ inputText, setInputText, outputText, setOutputText }}
    >
      {children}
    </ChatContext.Provider>
  );
}
