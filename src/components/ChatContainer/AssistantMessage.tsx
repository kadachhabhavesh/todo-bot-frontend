import type { Message } from "../../constants";
import ChatTodoTable from "./ChatTodoTable";

function AssistantMessage({ message }: { message: Message }) {
  const messageTime = () => {
    const time = new Date(message.created_at!);
    const [hours, minutes] = [time.getHours(), time.getMinutes()];
    return (
      (hours > 9 ? hours : "0" + hours) +
      ":" +
      (minutes > 9 ? minutes : "0" + minutes)
    );
  };

  return (
    <div
      className={`${
        message.content.todos ? "max-w-full" : "max-w-2/3"
      } w-fit bg-assistant-message py-1 px-2 mb-5 rounded-e-xl rounded-b-xl text-xs ml-2 relative shadow-xl`}
    >
      {message.content.reply}
      {!message.content.isOnlyTextMessage &&
        message.content.todos &&
        message.content.todos.length > 0 && (
          <ChatTodoTable todos={message.content.todos} />
        )}
      {/* <p className="block text-end text-gray-400 font-semibold">{messageTime()}</p> */}
    </div>
  );
}

export default AssistantMessage;
