import Image from "next/image";
import Header from "./components/Header";
import FileUpload from "./components/fileUploader";
import ChatInterface from "./components/chatInterface";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import CommonPrompts from "./components/CommonPrompts";
import CSVPreviewer from "./components/CSVPreviewer";

export default function Home() {
  return (
    <>
      <Header></Header>
      <Hero></Hero>
      <FileUpload></FileUpload>
      <CSVPreviewer></CSVPreviewer>
      <CommonPrompts></CommonPrompts>
      <ChatInterface></ChatInterface>
      <Footer></Footer>
    </>
  );
}
