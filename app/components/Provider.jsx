import React from "react";
import { ChatContextProvider } from "./context/ChatContext";
import { CSVContextProvider } from "./context/CSVContext";

const Provider = ({ children }) => {
  return (
    <CSVContextProvider>
      <ChatContextProvider>{children}</ChatContextProvider>
    </CSVContextProvider>
  );
};

export default Provider;
