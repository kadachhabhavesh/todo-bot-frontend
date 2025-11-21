import { useCallback, useEffect, useRef } from "react";
import { useChat } from "../context/ChatContext";
import { MESSAGE_TYPE } from "../constants";
import UserMessage from "./messages/UserMessage";
import AssistantMessage from "./messages/AssistantMessage";
import ResponseLoading from "./messages/ResponseLoading";
import ChatLoading from "./ChatLoading";

function Chat() {
  const { chatHistory, isAssistantMessagePendding, isLoadingMessages, fetchChatHistory } =
    useChat();

  const chatContainerRef = useRef<HTMLDivElement>(null);

  const loadingRef = useRef(false);

  const handleScroll = useCallback(async () => {
    const container = chatContainerRef.current;

    if (!container || loadingRef.current) return;

    if (container.scrollTop <= 50) {
      loadingRef.current = true;
      const prevHeight = container.scrollHeight;
      await fetchChatHistory();
      loadingRef.current = false;
    }
  }, [fetchChatHistory]);

  useEffect(() => {
    const container = chatContainerRef.current;
    if (!container) return;
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div
      ref={chatContainerRef}
      className="flex flex-col overflow-y-auto scroll-smooth"
    >
      {isLoadingMessages && <ChatLoading />}
      {chatHistory.map((message) => {
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
