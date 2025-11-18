import { useEffect, useRef } from "react";
import { useChat } from "../context/ChatContext";
import { MESSAGE_TYPE } from "../constants";
import UserMessage from "./messages/UserMessage";
import AssistantMessage from "./messages/AssistantMessage";
import ResponseLoading from "./messages/ResponseLoading";

function Chat() {
  const { chatHistory } = useChat();
  const chatContainerRef = useRef<HTMLDivElement>(null);

  
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current?.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <div
      ref={chatContainerRef}
      className="flex flex-col overflow-y-auto scroll-smooth"
    >
      {chatHistory.map((message) => {
        if (message.role === MESSAGE_TYPE.USER) {
          return <UserMessage key={message.id} message={message} />;
        } else if (message.role === MESSAGE_TYPE.ASSISTANT) {
          return <AssistantMessage key={message.id} message={message} />;
        } else {
          return <ResponseLoading key={message.id} message={message} />;
        }
      })}
    </div>
  );
}

export default Chat;
