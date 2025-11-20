import React, { useState, type ChangeEvent } from "react";
import { MAX_MESSAGE_LENGTH, MESSAGE_TYPE } from "../constants";
import { useChat } from "../context/ChatContext";
import { ArrowRight } from "lucide-react";
import TagList from "./TagList";
import { sendMessageToAssistant } from "../services/assistantApiService";

function ChatComposer() {
  const [message, setMessage] = useState<string>("");
  const [messageError, setMessageError] = useState<string>("");
  const { addMessage, updateAssistantMessageStatus } = useChat();

  const handleMessageChnage = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    if (MAX_MESSAGE_LENGTH - value.length < 0) return;
    setMessage(value);
    setMessageError("");
  };

  const handleSendMessageToAssistant = async (userMessage: string) => {
    addMessage({
      role: MESSAGE_TYPE.USER,
      content: {
        isOnlyTextMessage: true,
        reply: userMessage,
      },
    });
    updateAssistantMessageStatus(true);
    const assistantReply = await sendMessageToAssistant(userMessage);
    updateAssistantMessageStatus(false);
    addMessage({
      role: MESSAGE_TYPE.ASSISTANT,
      content: {
        isOnlyTextMessage: assistantReply.isOnlyTextMessage,
        reply: assistantReply.reply,
        todos: assistantReply.todos,
      },
    });
  };

  const handleSendMessage = async () => {
    if (message.trim().length === 0) {
      setMessageError("Please enter message for assistant.");
      return;
    }
    handleSendMessageToAssistant(message);
    setMessage("");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const handleTagClick = async (tagValue: string) => {
    handleSendMessageToAssistant(tagValue);
  };

  return (
    <div className="flex items-center">
      <div className="bg-gray-100 p-2 rounded-lg flex flex-col gap-2 w-full">
        <TagList onTagClick={handleTagClick} />
        <div
          className={`h-20 bg-white w-full flex flex-row items-end rounded-md shadow-2xl shadow-stone-300 border border-gray-300 relative ${
            messageError && "ring-1 ring-red-500"
          }`}
        >
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
            {MAX_MESSAGE_LENGTH - message.length}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ChatComposer;
