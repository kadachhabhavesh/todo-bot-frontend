export interface Todo {
  id: number;
  task: string;
  complete: boolean;
  dueDate: string;
}

export enum MESSAGE_TYPE {
  USER = "user",
  ASSISTANT = "model",
  LOADING = "loading",
}

export const ASSISTANT_RESPONSE_LOADING_MESSAGE =
  "Analyzing data, please wait...";

export interface Message {
  id?: number;
  created_at?: string;
  message_type?: string;
  content: { isOnlyTextMessage: boolean; reply: string; todos?: Todo[] };
  role: MESSAGE_TYPE;
  session_id?: number;
}

export interface ChatContextType {
  chatHistory: Message[];
  addMessage: (message: Message) => void;
  clearChat: () => void;
  fetchChatHistory: () => void;
}

export const MAX_MESSAGE_LENGTH = 150;
