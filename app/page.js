import Image from "next/image";
import Header from "./components/Header";
import FileUpload from "./components/fileUploader";
import ChatInterface from "./components/chatInterface";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import CommonPrompts from "./components/CommonPrompts";
import CSVPreviewer from "./components/CSVPreviewer";
import DeployLLM from "./components/DeployLLM";
import ChatOutput from "./components/ChatOutput";

export default function Home() {
  return (
    <>
      <div className="fixed top-0 left-0 w-full p-4 mb-12 z-[50] bg-slate-700">
        <Header></Header>
      </div>
      <div className="my-48">
        <Hero></Hero>
        <FileUpload></FileUpload>
        {/* <CSVPreviewer></CSVPreviewer> */}
        <CommonPrompts></CommonPrompts>
        <ChatOutput></ChatOutput>
      </div>
      <div className="fixed bottom-0 left-0 w-full p-4 mt-12 z-[50] bg-slate-700">
        <ChatInterface></ChatInterface>
        {/* <div className="h-24 overflow-y-scroll">
        </div> */}
      </div>
      {/* <Footer></Footer> */}
      {/* <DeployLLM></DeployLLM> */}
    </>
  );
}
