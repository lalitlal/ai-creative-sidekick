"use client";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "./context/ChatContext";
import { loadingChatOutput } from "../constants";
import { initializeApp } from "firebase/app";
import { getFirestore, onSnapshot, doc } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup

const ChatOutput = () => {
  const chatContext = useContext(ChatContext);
  const decodedBuffer = Buffer.from(
    process.env.NEXT_PUBLIC_FIREBASE_CONFIG,
    "base64"
  );
  const decodedJSON = JSON.parse(decodedBuffer.toString());

  // export const db = getFirestore(firebase_app);
  const app = initializeApp(decodedJSON);
  const db = getFirestore(app);
  const [unsubscribePromise, setUnsubscribePromise] = useState(null); // State to hold the promise

  useEffect(() => {
    const checkStatus = async () => {
      return onSnapshot(doc(db, "responses", chatContext.chatId), (doc) => {
        console.log("WE GOT DATA!!", doc.data());
        const docData = doc.data();
        if (docData !== undefined && docData !== null) {
          chatContext.setOutputText(doc.data().response);
          chatContext.setIsAskingLLM(false);

          // Unsubscribe here when outputText is set
          if (unsubscribePromise) {
            console.log("Unsubscribed from chat id:", chatContext.chatId);
            unsubscribePromise.then((unsubscribe) => unsubscribe()); // Call the unsubscribe function
          }
        }
      });
    };

    if (chatContext.chatId) {
      chatContext.setIsAskingLLM(true);
      console.log("Subscribed to chat id:", chatContext.chatId);
      const unsubscribe = checkStatus(); // Store the promise in a variable
      setUnsubscribePromise(unsubscribe); // Set the promise in state
    }

    // Cleanup function
    return () => {
      if (unsubscribePromise) {
        console.log("Unsubscribed from chat id:", chatContext.chatId);
        unsubscribePromise.then((unsubscribe) => unsubscribe()); // Call the unsubscribe function when the component is unmounted
      }
    };
  }, [chatContext.chatId, chatContext.outputText]);

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
