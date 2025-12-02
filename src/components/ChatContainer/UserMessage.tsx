import type { Message } from "../../constants";

function UserMessage({ message }: { message: Message }) {
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
    <div className="bg-[#167d7f] text-white py-2 px-3 mb-5 rounded-b-xl rounded-s-xl text-xs max-w-3/4 mr-2 self-end relative shadow-xl">
      {message.content.reply}
      {/* <p className="block text-end text-white font-semibold">
        {messageTime()}
      </p> */}
    </div>
  );
}

export default UserMessage;
