import {
  CalendarArrowUp,
  CalendarClock,
  CheckCheck,
  Grip,
  List,
} from "lucide-react";
import TodoCardSkeleton from "./TodoCardSkeleton";
import type { Todo, SortByType } from "../../constants";
import { useChat } from "../../context/ChatContext";

function TodoCardList({
  isLoadingTodos,
  todos,
}: {
  isLoadingTodos: boolean;
  todos: Todo[];
  sortBy: SortByType;
}) {
  const { updatedTodosIds } = useChat();

  return (
    <div className="max-h-[70vh] overflow-y-auto px-2 border-2 border-gray-200 rounded-r-md rounded-b-md">
      {isLoadingTodos && <TodoCardSkeleton />}

      {!isLoadingTodos && todos.length === 0 && (
        <div className="text-center py-10 font-semibold text-2xl text-gray-400">
          Empty todo list
        </div>
      )}

      {!isLoadingTodos && todos.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-2">
          {todos.map(({ id, task, complete, dueDate, created_at }, i) => {
            return updatedTodosIds.includes(id) ? (
              <div
                key={i}
                className="bg-white shadow-md rounded-xl p-4 border border-gray-200 animate-pulse"
              >
                {/* Title */}
                <div className="flex justify-between">
                  <div className="h-4 w-2/3 bg-gray-300 rounded-md"></div>
                  <div className="h-5 w-5 bg-gray-300 rounded"></div>
                </div>

                {/* Status badge */}
                <div className="mt-4 h-4 w-1/3 bg-gray-300 rounded-md"></div>

                {/* Date rows */}
                <div className="mt-4 space-y-3">
                  <div className="h-3 w-1/2 bg-gray-300 rounded-md"></div>
                  <div className="h-3 w-2/5 bg-gray-300 rounded-md"></div>
                </div>
              </div>
            ) : (
              <div
                key={id}
                className="bg-white shadow-md rounded-xl p-4 border border-gray-200 flex flex-col gap-3"
              >
                {/* Header */}
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                    <List size={18} />
                    {task}
                  </h3>
                  <Grip className="cursor-pointer text-gray-500" />
                </div>

                {/* Status */}
                <div className="flex items-center gap-2">
                  <CheckCheck size={18} className="text-gray-500" />
                  {complete ? (
                    <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded">
                      Complete
                    </span>
                  ) : (
                    <span className="bg-yellow-500 text-white text-xs px-2 py-0.5 rounded">
                      Pending
                    </span>
                  )}
                </div>

                {/* Dates */}
                <div className="flex flex-col gap-1 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <CalendarClock size={16} className="text-gray-500" />
                    <span>
                      Due:{" "}
                      {dueDate
                        ? new Date(dueDate).toLocaleDateString("en-GB")
                        : "-"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <CalendarArrowUp size={16} className="text-gray-500" />
                    <span>
                      Created:{" "}
                      {new Date(created_at).toLocaleDateString("en-GB")}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default TodoCardList;
