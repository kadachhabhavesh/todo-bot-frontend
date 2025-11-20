import type { Message } from "../../constants";

function AssistantMessage({ message }: { message: Message }) {
  return (
    <div className="w-fit max-w-full bg-assistant-message py-2 px-3 mb-5 rounded-2xl text-xs ml-2 relative shadow-xl">
      {message.content.reply}
      {!message.content.isOnlyTextMessage && (
        <div className="bg-white rounded-lg flex flex-col gap-1 mt-1 p-1">
          <table className="min-w-full border border-gray-200 text-gray-700 text-xs rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-1 px-2 border-b text-left">Done</th>
                <th className="py-1 px-2 border-b text-left">Task</th>
                <th className="py-1 px-2 border-b text-left">Due Date</th>
              </tr>
            </thead>
            <tbody>
              {message.content.todos!.map((todo, index) => (
                <tr
                  key={index}
                  className={`hover:bg-gray-50 ${
                    todo.complete ? "text-green-600" : "text-gray-700"
                  }`}
                >
                  <td className="py-1 px-2 border-b text-center">
                    {todo.complete ? "✔️" : "❌"}
                  </td>
                  <td className="py-1 px-2 border-b">{todo.task}</td>
                  <td className="py-1 px-2 border-b text-gray-500">
                    {todo.dueDate || "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AssistantMessage;
