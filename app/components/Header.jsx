import React from "react";
import { logo } from "../constants";

const Header = () => {
  const animationClass = "hover:text-yellow-200 hover:cursor-pointer";
  return (
    <header class="text-gray-200 body-font">
      <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a class="flex title-font font-medium items-center text-gray-300 mb-4 md:mb-0 hover:text-yellow-200">
          {logo}
          <span class="ml-3 text-xl ">Creative Sidekick</span>
        </a>
        <nav class="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          <a class={`mr-5 ${animationClass}`}>Home</a>
          <a class={`mr-5 ${animationClass}`}>Insight</a>
          <a class={`mr-5 ${animationClass}`}>Ideation (Coming Soon!)</a>
          <a class={`mr-5 ${animationClass}`}>Pricing</a>
        </nav>
        <button class="inline-flex items-center bg-gray-300 text-black border-0 py-1 px-3 focus:outline-none rounded text-base mt-4 md:mt-0 hover:text-black hover:bg-yellow-300">
          Contact Us
          <svg
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            class="w-4 h-4 ml-1"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
