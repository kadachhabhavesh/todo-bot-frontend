import { useEffect, useRef } from "react";
import { useChat } from "../../context/ChatContext";
import { MESSAGE_TYPE } from "../../constants";
import UserMessage from "./UserMessage";
import AssistantMessage from "./AssistantMessage";
import ResponseLoading from "./ResponseLoading";
import ChatLoading from "./ChatLoading";

function Chat() {
  const {
    chatHistory,
    isAssistantMessagePendding,
    isLoadingMessages,
    fetchChatHistory,
  } = useChat();

  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (async () => {
      await fetchChatHistory();
    })();
  }, []);

  useEffect(() => {
    const container = chatContainerRef.current;
    if (!container) return;
    requestAnimationFrame(() => {
      container.scrollTop = container.scrollHeight;
    });
  }, [chatHistory]);

  return (
    <div
      ref={chatContainerRef}
      className="flex flex-col overflow-y-auto scroll-smooth h-full relative"
    >
    
      {isLoadingMessages && <ChatLoading />}
      {!isLoadingMessages && chatHistory.length === 0 && (<>
        <div className="w-48 h-48 bg-teal-100 rounded-lg absolute z-0 rotate-12 left-1/2 top-1/2 -translate-1/2 -translate-1/2"></div>
        <div className="w-full h-full flex items-center justify-center relative">
          <span className="text-4xl text-center font-serif text-gray-700 font-bold z-20">
            Ready to process
            <br /> your tasks.
          </span>
        </div>
        </>
      )}
      {chatHistory &&
        chatHistory.map((message) => {
          if (message.role === MESSAGE_TYPE.USER) {
            return <UserMessage key={message.id} message={message} />;
          } else if (message.role === MESSAGE_TYPE.ASSISTANT) {
            return <AssistantMessage key={message.id} message={message} />;
          }
        })}
      {isAssistantMessagePendding && <ResponseLoading />}
    </div>
  );
}

export default Chat;
