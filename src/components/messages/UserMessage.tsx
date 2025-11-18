import type { Message } from "../../constants";

function UserMessage({ message }: { message: Message }) {
  return (
    <div className="bg-linear-to-r/srgb to-purple-500 from-blue-400 text-white py-2 px-3 mb-5 rounded-full text-xs max-w-3/4 mr-2 self-end relative shadow-xl">
      {message.content.reply}
      <div className="w-3 h-3 bg-purple-500 rounded-full absolute top-0 right-0"></div>
      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full absolute -top-1.5 -right-1.5"></div>
    </div>
  );
}

export default UserMessage;
