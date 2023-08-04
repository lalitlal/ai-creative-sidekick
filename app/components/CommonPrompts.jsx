"use client";
import React, { useContext } from "react";
import { ChatContext } from "./context/ChatContext";

const CommonPrompts = () => {
  const chatContext = useContext(ChatContext);
  const promptImg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-6 h-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
      />
    </svg>
  );

  const commonPrompts = [
    "What do users love most about the product?",
    "What are negative things users mention about my product?",
    "What are negative things users mention about my product?",
    "What are negative things users mention about my product?",
    "Prompt 3",
    "Prompt 4",
  ];

  return (
    <div className="flex w-full justify-center">
      <div class="text-gray-600 body-font w-3/4">
        <div class="container px-5 py-24 mx-auto">
          <div class="flex flex-col text-center w-full mb-20">
            <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Common Prompts
            </h1>
            <p class="lg:w-2/3 mx-auto leading-relaxed text-base">
              Here are some common prompts that expert performance strategists
              use. Click on one to try it out!
            </p>
          </div>
          <div class="flex flex-wrap -m-2">
            {commonPrompts.map((prompt, index) => {
              return (
                <div
                  key={index}
                  class="p-2 lg:w-1/3 md:w-1/2 w-full hover:text-white hover:cursor-pointer hover:border-white"
                  onClick={() => {
                    chatContext.setInputText(prompt);
                  }}
                >
                  <div class="h-full w-full flex items-center border-gray-200 border p-4 hover:text-white">
                    <div>{promptImg}</div>
                    <div class="flex-grow flex px-2">
                      <div class="text-gray-500">{prompt}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommonPrompts;
