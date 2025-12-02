import {
  CalendarArrowUp,
  CalendarClock,
  CheckCheck,
  Ellipsis,
  List,
} from "lucide-react";
import TableBodySkeleton from "./TableBodySkeleton";
import { type Todo, type SortByType } from "../../constants";
import { useChat } from "../../context/ChatContext";
function TodoTable({
  isLoadingTodos,
  todos,
}: {
  isLoadingTodos: boolean;
  todos: Todo[];
  sortBy: SortByType;
}) {
  const { updatedTodosIds, todosAddedByChatbotIds } = useChat();

  return (
    <div className="max-h-[70vh] overflow-y-auto ">
      <table className="w-full">
        <thead className="bg-gray-200 sticky top-0">
          <tr className="rounded-3xl">
            <th className="p-2 rounded-bl-md font-light text-gray-600">
              <div className="flex items-center gap-2">
                <List size={20} />
                <span>Todo</span>
              </div>
            </th>
            <th className="p-2 font-light text-gray-600">
              <div className="flex items-center gap-2">
                <CheckCheck size={20} />
                <span>Complete</span>
              </div>
            </th>
            <th className="p-2 font-light text-gray-600">
              <div className="flex items-center gap-2">
                <CalendarClock size={20} />
                <span>Due Date</span>
              </div>
            </th>
            <th className="p-2 font-light text-gray-600">
              <div className="flex items-center gap-2">
                <CalendarArrowUp size={20} />
                <span>Create on</span>
              </div>
            </th>
            <th className="rounded-r-md"></th>
          </tr>
        </thead>
        <tbody>
          {isLoadingTodos && <TableBodySkeleton />}
          {!isLoadingTodos && todos && todos.length === 0 && (
            <tr className="w-full">
              <td
                colSpan={4}
                className="text-center py-10 font-semibold text-2xl text-gray-400"
              >
                Empty todo list
              </td>
            </tr>
          )}
          {todosAddedByChatbotIds &&
            todosAddedByChatbotIds.length > 0 &&
            todosAddedByChatbotIds.map(() => <TodoLoadingRow />)}
          {!isLoadingTodos &&
            todos &&
            todos.length > 0 &&
            todos.map(({ id, task, complete, dueDate, created_at }) => {
              return updatedTodosIds.includes(id) ? (
                <TodoLoadingRow />
              ) : (
                <tr
                  key={id}
                  className="[&_td]:p-1 border-b-2 border-gray-200 text-gray-600"
                >
                  <td>{task}</td>
                  <td className="text-center">
                    {complete ? (
                      <span className="bg-green-500 rounded-sm text-xs text-white px-2 pt-0.5 pb-1">
                        Complete
                      </span>
                    ) : (
                      <span className="bg-yellow-500 rounded-sm text-xs text-white px-2 pt-0.5 pb-1">
                        Pendding
                      </span>
                    )}
                  </td>
                  <td className="text-center">
                    {dueDate ? (
                      new Date(dueDate).toLocaleDateString("en-GB")
                    ) : (
                      <span>-</span>
                    )}
                  </td>
                  <td className="text-center">
                    {new Date(created_at).toLocaleDateString("en-GB")}
                  </td>
                  <td className="text-center">
                    <Ellipsis className="cursor-pointer" />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default TodoTable;

const TodoLoadingRow = () => {
  return (
    <tr className="animate-pulse border-b-2 border-gray-200">
      <td className="px-4 py-3 w-6/12">
        <div className="h-4 bg-gray-300 rounded"></div>
      </td>
      <td className="px-4 py-3">
        <div className="h-4 bg-gray-300 rounded"></div>
      </td>
      <td className="px-4 py-3">
        <div className="h-4 bg-gray-300 rounded"></div>
      </td>
      <td className="px-4 py-3">
        <div className="h-4 bg-gray-300 rounded"></div>
      </td>
      <td className="px-4 py-3 w-16">
        <div className="h-4 bg-gray-300 rounded"></div>
      </td>
    </tr>
  );
};
