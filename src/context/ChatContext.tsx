import { createContext, useContext, useState, type ReactNode } from "react";
import { type ChatContextType, type Todo, type Message, type ForDeveloper } from "../constants";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_API_URL,
  import.meta.env.VITE_SUPABASE_API_KEY
);

export const ChatContext = createContext<ChatContextType | undefined>(
  undefined
);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todosFromChat, setTodosFromChat] = useState<Todo[]>([]);
  const [isAssistantMessagePendding, setIsAssistantMessagePendding] =
    useState<boolean>(false);
  const [isLoadingMessages, setIsLoadingMessages] = useState<boolean>(false);
  const [isLoadingTodos, setIsLoadingTodos] = useState<boolean>(false);
  const [isTodosFromChat, setIsTodosFromChat] = useState<boolean>(false);
  const [updatedTodosIds, setUpdatedTodosIds] = useState<number[]>([]);
  const [todosAddedByChatbotIds, setTodosAddedByChatBot] = useState<number[]>([])

  const getTodos = () => {
    return isTodosFromChat ? todosFromChat : todos;
  };

  const clearChat = () => setChatHistory([]);

  const addMessage = (message: Message) => {
    setChatHistory((prev) => [...prev, message]);
  };

  const fetchTodos = async () => {
    setIsLoadingTodos(true);
    const { data } = await supabase
      .from("todos")
      .select("*")
      .order("id", { ascending: true });
    setTodos(data || []);
    setIsLoadingTodos(false);
  };

  const fetchChatHistory = async () => {
    let fetchedChatHistory = [];
    setIsLoadingMessages(true);
    setIsLoadingMessages(true);
    const { data } = await supabase
      .from("chat_messages")
      .select("*")
      .in("message_type", ["input", "output"])
      .order("id", { ascending: true });
    fetchedChatHistory = data ?? [];
    setIsLoadingMessages(false);

    fetchedChatHistory?.forEach((message: Message) => {
      if (message.message_type === "input") {
        message.content = { isOnlyTextMessage: true, reply: message.content };
        return message;
      } else if (message.message_type === "output") {
        message.content = JSON.parse(message.content).output;
        return message;
      }
    });

    if (fetchedChatHistory.length > 0) {
      setChatHistory((prevChatHistory) => [
        ...fetchedChatHistory,
        ...prevChatHistory,
      ]);
    }
  };

  const loadTodosFromChat = (todos: Todo[]) => {
    const formattedTodos = todos.map((todo) => ({
      id: todo.id,
      task: todo.task,
      complete: todo.complete,
      dueDate: todo.dueDate,
      created_at: todo.created_at,
    }));
    setTodosFromChat(formattedTodos);
    setIsTodosFromChat(true);
  };

  const toggleTodosFrom = () => {
    setIsTodosFromChat((prevState) => !prevState);
  };

  const updateAssistantMessageStatus = (status: boolean) => {
    setIsAssistantMessagePendding(status);
  };

  const fetchUpdatedTodos = async (todoIds: number[]) => {
    const { data }: { data: any } = await supabase
      .from("todos")
      .select("*")
      .in("id", todoIds);
    return data;
  };

  const handleDeveloperActions = async (aiResponse: ForDeveloper) => {
    const { isDBChange, operationName, id } = aiResponse;
    if (isDBChange) {
      switch (operationName) {
        case "add": {
          setTodosAddedByChatBot(id);
          await new Promise((res)=>{
            setTimeout(()=>res(""),1000)
          })
          const newTodos = await fetchUpdatedTodos(id);
          setTodos((preState) => [...newTodos, ...preState]);
          setTodosAddedByChatBot([])
          setUpdatedTodosIds([]);
          break;
        }
        case "update": {
          setUpdatedTodosIds(id);
          const updatedTodos = await fetchUpdatedTodos(id);
          setTodos((preState) => [
            ...preState.filter((todo) => !id.includes(todo.id)),
            ...updatedTodos,
          ]);
          setUpdatedTodosIds([]);
          break;
        }
        case "delete":
          console.log("delete task");
          setTodos((preState) =>
            preState.filter((todo: Todo) => !id.includes(todo.id))
          );
          break;
      }
    }
  };

  return (
    <ChatContext.Provider
      value={{
        todos,
        chatHistory,
        todosFromChat,
        isLoadingTodos,
        isLoadingMessages,
        isAssistantMessagePendding,
        isTodosFromChat,
        updatedTodosIds,
        todosAddedByChatbotIds,
        updateAssistantMessageStatus,
        addMessage,
        clearChat,
        fetchTodos,
        fetchChatHistory,
        loadTodosFromChat,
        toggleTodosFrom,
        getTodos,
        handleDeveloperActions,
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
