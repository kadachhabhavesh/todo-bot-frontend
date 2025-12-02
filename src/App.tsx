import "./index.css";
import {
  useEffect
} from "react";
import { useChat } from "./context/ChatContext";
import ChatBot from "./components/ChatContainer/ChatBot";
import MyTodos from "./components/MyTodos/MyTodos";

function App() {
  return (
    <div className="bg-background h-screen font-mono overflow-hidden grid grid-cols-10 gap-3 px-3 sm:py-3">
     <div className="min-h-full bg-white rounded-xl col-span-7">
      <MyTodos />
     </div>
     <div className="min-h-full bg-white rounded-xl col-span-3">
      <ChatBot />
     </div>
    </div>
  );
}

export default App;
