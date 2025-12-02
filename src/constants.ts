export interface Todo {
  id: number;
  task: string;
  complete: boolean;
  dueDate?: string;
  created_at: string;
}

export enum TodosFields {
  ID = "id",
  TASK = "task",
  COMPLETE = "complete",
  DUEDATE = "dueDate",
  CTEATE_AT = "created_at",
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
  todos: Todo[];
  todosFromChat: Todo[];
  isLoadingMessages: boolean;
  isLoadingTodos: boolean;
  isAssistantMessagePendding: boolean;
  isTodosFromChat: boolean;
  updatedTodosIds: number[],
  todosAddedByChatbotIds: number[],
  loadTodosFromChat: (todos: Todo[]) => void;
  addMessage: (message: Message) => void;
  clearChat: () => void;
  fetchChatHistory: () => void;
  fetchTodos: () => void;
  updateAssistantMessageStatus: (status: boolean) => void;
  toggleTodosFrom: () => void;
  getTodos: () => Todo[];
  handleDeveloperActions: (aiResponse: ForDeveloper) => void
}

export interface AssistantApiResponse {
  isSucces: boolean;
  data: {
    type: "output" | "input";
    output: {
      isOnlyTextMessage: boolean;
      reply: string;
      todos?: Todo[];
      forDeveloper: {
        isDBChange: boolean;
        operationName: "delete" | "add" | "update";
        id:|number[];
      };
    };
  };
}

export interface ForDeveloper {
  isDBChange: boolean;
  operationName: "delete" | "add" | "update";
  id: number[];
}

export interface SortByType {
  field: TodosFields;
  ascending: boolean;
}

export interface FilterType {
  status?: { complete: boolean };
  dueDate?: { start?: Date; end?: Date };
  createOn?: { start?: Date; end?: Date };
}

export const MAX_MESSAGE_LENGTH = 150;

export const ASSISTANT_RESPONSE_LOADING_MESSAGE =
  "Analyzing data, please wait...";

export enum MESSAGE_TYPE {
  USER = "user",
  ASSISTANT = "model",
}
