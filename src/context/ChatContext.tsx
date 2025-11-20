import { createContext, useContext, useState, type ReactNode } from "react";
import {
  type ChatContextType,
  type Message,
} from "../constants";

import {
  createClient
} from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_API_URL,
  import.meta.env.VITE_SUPABASE_API_KEY
);

export const ChatContext = createContext<ChatContextType | undefined>(
  undefined
);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [isAssistantMessagePendding, setIsAssistantMessagePendding] = useState<boolean>(false);
  const [lastMessageId, setLastMessageId] = useState<number | undefined>(undefined);
  const [isLoadingMessages, setIsLoadingMessages] = useState<boolean>(false);

  const addMessage = (message: Message) => {
    setChatHistory((prev) => [...prev, message]);
  };

  const clearChat = () => setChatHistory([]);

  const fetchChatHistory = async () => {
    setIsLoadingMessages(true);
    let fetchedChatHistory: Message[];
    if (lastMessageId) {
      const { data } = await supabase
        .from("chat_messages")
        .select("*")
        .in("message_type", ["input", "output"])
        .lt("id", lastMessageId)
        .order("id", { ascending: false })
        .limit(10);
      fetchedChatHistory = data!.reverse() ?? [];
      setIsLoadingMessages(false);
    } else {
      setIsLoadingMessages(true);
      const { data } = await supabase
        .from("chat_messages")
        .select("*")
        .in("message_type", ["input", "output"])
        .order("id", { ascending: false })
        .limit(10);
      fetchedChatHistory = data!.reverse() ?? [];
      setIsLoadingMessages(false);
    }
    
    fetchedChatHistory?.forEach((message: Message) => {
      if (message.message_type === "input") {
        message.content = { isOnlyTextMessage: true, reply: message.content };
        return message;
      } else if (message.message_type === "output") {
        message.content = JSON.parse(message.content).output;
        return message;
      }
    });
    if(fetchedChatHistory.length>0){
      setLastMessageId(fetchedChatHistory[0].id!);
      setChatHistory((prevChatHistory) => [
        ...fetchedChatHistory,
        ...prevChatHistory,
      ]);
    }
  };

  const updateAssistantMessageStatus = (status: boolean) => {
    setIsAssistantMessagePendding(status);
  }

  return (
    <ChatContext.Provider
      value={{
        chatHistory,
        lastMessageId: lastMessageId!,
        isLoadingMessages,
        addMessage,
        clearChat,
        fetchChatHistory,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
