export interface Todo {
  id: number;
  task: string;
    isComplete: boolean;
    dueDate: string;
  }

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
    lastMessageId: number;
    isLoadingMessages: boolean;
    isAssistantMessagePendding: boolean,
    addMessage: (message: Message) => void;
    clearChat: () => void;
    fetchChatHistory: () => void;
    updateAssistantMessageStatus: (status: boolean) => void;
  }

  export interface AssistantApiResponse {
    isSucces: boolean;
    data: {
      type: "output" | "input",
      output: {
      isOnlyTextMessage: boolean,
      reply: string,
      todos?: Todo[]
    }
  }
}

export const MAX_MESSAGE_LENGTH = 150;

export const ASSISTANT_RESPONSE_LOADING_MESSAGE =
  "Analyzing data, please wait...";

export enum MESSAGE_TYPE {
  USER = "user",
  ASSISTANT = "model"
}

