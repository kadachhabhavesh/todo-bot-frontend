import { createContext, useContext, useState, type ReactNode } from "react";
import {
  ASSISTANT_RESPONSE_LOADING_MESSAGE,
  MESSAGE_TYPE,
  type ChatContextType,
  type Message,
} from "../constants";
import {
  createClient,
  type PostgrestSingleResponse,
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

  const addMessage = (message: Message) => {
    setChatHistory((prev) => [...prev, message]);
  };

  const clearChat = () => setChatHistory([]);

  const fetchChatHistory = async () => {
    const { data }: PostgrestSingleResponse<Message[]> = await supabase
      .from("chat_messages")
      .select("*")
      .in("message_type", ["input", "output"])
      .order("id",{ ascending: true });
      
    data?.forEach((message: Message) => {
      if (message.message_type === "input") {
        message.content = { isOnlyTextMessage: true, reply: message.content };
        return message;
      } else if (message.message_type === "output") {
        message.content = JSON.parse(message.content).output;
        return message;
      }
    });
    
    setChatHistory(data ?? []);
  };

  const updateAssistantMessageStatus = (status: boolean) => {
    setIsAssistantMessagePendding(status);
  }

  return (
    <ChatContext.Provider
      value={{ chatHistory, isAssistantMessagePendding, addMessage, clearChat, fetchChatHistory, updateAssistantMessageStatus }}
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
