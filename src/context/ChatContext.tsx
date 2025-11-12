import { createContext, useContext, useState, type ReactNode } from "react";
import type { ChatContextType, Message } from "../constants";

export const chatHistoryDummy: Message[] = [
  {
    sender: "assistant",
    text: "Hi Bhavesh! I’m your To-Do Assistant. How can I help today?",
    timestamp: "2025-11-11T10:00:00Z",
  },
  {
    sender: "user",
    text: "Show my todos",
    timestamp: "2025-11-11T10:00:05Z",
  },
  {
    sender: "assistant",
    text: "Sure! Here’s what you have on your list:",
    todos: [
      { id: 1, task: "Buy groceries⚠️", done: false },
      { id: 2, task: "Finish React project✔️", done: true },
      { id: 3, task: "Call the bank✔️", done: false },
    ],
    timestamp: "2025-11-11T10:00:08Z",
  },
  {
    sender: "user",
    text: "Mark Finish React project as done",
    timestamp: "2025-11-11T10:00:15Z",
  },
  {
    sender: "assistant",
    text: "Done! Task marked as completed.",
    timestamp: "2025-11-11T10:00:17Z",
  },
  {
    sender: "user",
    text: "Add new todo — Schedule meeting with client",
    timestamp: "2025-11-11T10:00:25Z",
  },
  {
    sender: "assistant",
    text: "Added “Schedule meeting with client” to your list!",
    timestamp: "2025-11-11T10:00:27Z",
  },
  {
    sender: "assistant",
    text: "Would you like to set a due date or priority?",
    timestamp: "2025-11-11T10:00:30Z",
  },
];

export const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [chatHistory, setChatHistory] = useState<Message[]>(chatHistoryDummy);

  const addMessage = (message: Message) => {
    setChatHistory((prev) => [...prev, message]);
  };

  const clearChat = () => setChatHistory([]);

  return (
    <ChatContext.Provider value={{ chatHistory, addMessage, clearChat }}>
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