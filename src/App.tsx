import "./index.css";
import {
  useEffect
} from "react";
import { useChat } from "./context/ChatContext";
import ChatComposer from "./components/ChatComposer";
import Chat from "./components/Chat";

function App() {
  const { fetchChatHistory } = useChat();

  useEffect(() => {
    fetchChatHistory();
  }, []);

  return (
    <div className="bg-background h-screen flex justify-center items-center font-mono overflow-hidden px-3 sm:py-5 -mb-6">
      <div className="w-[450px] h-full grid grid-rows-[80%_20%]">
        <Chat />
        <ChatComposer />
      </div>
    </div>
  );
}

export default App;
