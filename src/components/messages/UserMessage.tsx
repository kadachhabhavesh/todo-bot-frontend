import type { Message } from "../../constants";

function UserMessage({ message }: { message: Message }) {
  return (
    <div className="bg-linear-to-r/srgb to-purple-500 from-blue-400 text-white py-2 px-3 mb-5 rounded-b-xl rounded-s-xl text-xs max-w-3/4 mr-2 self-end relative shadow-xl">
      {message.content.reply}
    </div>
  );
}

export default UserMessage;
