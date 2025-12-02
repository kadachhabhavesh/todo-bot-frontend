import { useState } from "react";
import type { Todo } from "../../constants";
import { ArrowBigLeftDash } from "lucide-react";
import { useChat } from "../../context/ChatContext";

function ChatTodoTable({ todos }: { todos: Todo[] }) {
  const { loadTodosFromChat } = useChat()
  const [popupPosition, setPopupPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const handleTodoClick = (
    event: React.MouseEvent<HTMLTableElement>,
    id: number
  ) => {
    const parentRect = (event.currentTarget as HTMLElement)
      .closest("div")!
      .getBoundingClientRect();

    setPopupPosition({
      x: event.clientX - parentRect.left,
      y: event.clientY - parentRect.top,
    });
  };

  const handleTodosMove = ()=>{
    loadTodosFromChat(todos)
  }

  return (
    <div className="bg-white rounded-lg flex flex-col gap-1 mt-1 p-1">
      {
        <table className="min-w-full border border-gray-200 text-gray-700 text-xs rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th></th>
              <th className="py-1 px-2 border-b text-left">Done</th>
              <th className="py-1 px-2 border-b text-left">Task</th>
              <th className="py-1 px-2 border-b text-left">Due Date</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo, index) => (
              <tr
                key={index}
                // onClick={(e) => {
                //   handleTodoClick(e, todo.id);
                // }}
                className={`hover:bg-gray-50 cursor-pointer ${
                  todo.complete ? "text-green-600" : "text-gray-700"
                }`}
              >
                <td></td>
                <td className="py-1 px-2 border-b text-center">
                  {todo.complete ? "✔️" : "❌"}
                </td>
                <td className="py-1 px-2 border-b">{todo.task}</td>
                <td className="py-1 px-2 border-b text-gray-500 text-nowrap">
                  {todo.dueDate || "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      }
      {popupPosition && (
        <div
          className={`bg-gray-400 p-2 rounded-b-xl rounded-e-xl`}
          style={{
            left: popupPosition!.x,
            top: popupPosition!.y,
            position: "absolute",
          }}
        >
          <span className="cursor-pointer">PopUp menu</span>
        </div>
      )}
      <button
        onClick={handleTodosMove}
        className="bg-teal-700 text-white text-sm w-fit self-end px-3 py-1 rounded-md flex gap-2 items-center cursor-pointer"
      >
        <ArrowBigLeftDash size={20} /> <span>MOVE</span>
      </button>
    </div>
  );
}

export default ChatTodoTable;
