import type { Message } from "../../constants";

function ResponseLoading({ message }: { message: Message }) {
  return (
    <div className="text-xs mb-5">
      <span>{message.content.reply}</span>
    </div>
  );
}

export default ResponseLoading;
