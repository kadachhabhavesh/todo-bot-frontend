import { ArrowRight } from "lucide-react";
import "./index.css";
import { MAX_MESSAGE_LENGTH, MESSAGE_TYPE } from "./constants";
import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type MouseEvent,
} from "react";
import { useChat } from "./context/ChatContext";

function App() {
  const [message, setMessage] = useState<string>("");
  const [messageError, setMessageError] = useState<string>("");
  const { chatHistory, addMessage } = useChat();
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const handleMessageChnage = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target
    if(MAX_MESSAGE_LENGTH-value.length < 0) return
    setMessage(value);
    setMessageError("")
  };

  const handleSendMessage = () => {
    if (message.trim().length === 0) {
      setMessageError("Please enter message for assistant.");
      return;
    }
    addMessage({
      sender: MESSAGE_TYPE.USER,
      text: message,
      timestamp: Date.now().toString(),
    });
    setMessage("");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };
  const handleTagClick = (event: MouseEvent<HTMLButtonElement>) => {
    addMessage({
      sender: MESSAGE_TYPE.USER,
      text: event.target.innerHTML,
      timestamp: Date.now().toString(),
    });
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current?.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <div className="bg-background h-screen flex justify-center items-center font-mono overflow-hidden -mb-6">
      <div className="w-[450px] h-full grid grid-rows-[75%_25%] pt-5">
        <div
          ref={chatContainerRef}
          className="flex flex-col gap-5 overflow-y-auto scroll-smooth"
        >
          {chatHistory.map((message) =>
            message.sender === MESSAGE_TYPE.ASSISTANT ? (
              <div className="bg-assistant-message py-2 px-3 rounded-2xl text-xs max-w-3/4 w-fit ml-2 relative shadow-xl">
                {message.text}
                {message.todos && (
                  <div className="bg-white rounded-lg flex flex-col gap-1 mt-1 p-1">
                    {message.todos.map((todo) => (
                      <span>{todo.task}</span>
                    ))}
                  </div>
                )}
                <div className="w-3 h-3 bg-assistant-message rounded-full absolute top-0 left-0"></div>
                <div className="w-1.5 h-1.5 bg-assistant-message rounded-full absolute -top-1.5 -left-1.5"></div>
              </div>  
            ) : (
              <div className="bg-linear-to-r/srgb to-purple-500 from-blue-400 text-white py-2 px-3 rounded-full text-xs max-w-3/4 mr-2 self-end relative shadow-xl">
                {message.text}
                <div className="w-3 h-3 bg-purple-500 rounded-full absolute top-0 right-0"></div>
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full absolute -top-1.5 -right-1.5"></div>
              </div>
            )
          )}
          {/* chat composer */}
        </div>
        <div className="flex items-center">
          <div
            className="bg-gray-100 p-2 rounded-lg flex flex-col gap-2 w-full"
          >
            <div className="text-xs text-gray-600 flex flex-wrap gap-2">
              <button
                onClick={handleTagClick}
                className="bg-gray-200 px-1.5 rounded-full cursor-pointer"
              >
                list pendding tasks.
              </button>
              <button
                onClick={handleTagClick}
                className="bg-gray-200 px-1.5 rounded-full cursor-pointer"
              >
                list tasks of next five days.
              </button>
            </div>
            <div className={`h-20 bg-white w-full flex flex-row items-end rounded-md shadow-2xl shadow-stone-300 border border-gray-300 relative ${messageError && "ring-1 ring-red-500"}`}>
              <textarea
                onChange={handleMessageChnage}
                onKeyDown={handleKeyDown}
                value={message}
                className="w-full h-full p-2 rounded-md focus:outline-none resize-none placeholder:text-sm text-sm"
                placeholder="Ask, write or search for you todos..."
              ></textarea>
              <button
                onClick={handleSendMessage}
                className="aspect-square flex justify-center items-center absolute right-1 bottom-1 bg-black rounded-full px-1 cursor-pointer shadow-xl hover:shadow-2xl inset-shadow-sm inset-shadow-white"
              >
                <ArrowRight className="text-white w-5" />
              </button>
              <p className="absolute left-2 bottom-1 text-sm text-gray-500">
                {MAX_MESSAGE_LENGTH-message.length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
