export interface Todo {
  id: number;
  task: string;
  done: boolean;
}

export enum MESSAGE_TYPE {
    USER = "user",
    ASSISTANT = "assistant"
}

export interface Message {
  sender: MESSAGE_TYPE;
  text?: string;
  type?: "todos";
  todos?: Todo[];
  timestamp?: string;
}


export interface ChatContextType {
  chatHistory: Message[];
  addMessage: (message: Message) => void;
  clearChat: () => void;
}

export const MAX_MESSAGE_LENGTH = 150