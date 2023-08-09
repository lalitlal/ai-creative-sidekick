"use client";
import React from "react";

const DeployLLM = () => {
  const handleDeploy = () => {
    console.log("DEPLOYING LLM!");
  };
  return (
    <div className="w-full flex fkex-col justify-center text-center mt-4">
      <div
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 cursor-pointer mx-2"
        onClick={() => {
          handleDeploy();
        }}
      >
        DeployLLM
      </div>
    </div>
  );
};

export default DeployLLM;
