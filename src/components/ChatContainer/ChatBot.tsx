import Chat from "./Chat";
import ChatComposer from "../ChatComposer";


function ChatBot() {
  return (
    <div className="w-full h-full overflow-hidden grid grid-rows-[80%_20%] p-2">
      <Chat />
      <ChatComposer />
    </div>
  );
}

export default ChatBot;
