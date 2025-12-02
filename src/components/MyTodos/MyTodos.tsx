import {
  ArrowDownUp,
  Check,
  ChevronDown,
  ChevronUp,
  GalleryVertical,
  Grid2x2Plus,
  ListTree,
  Plus,
  Settings2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useChat } from "../../context/ChatContext";
import TodosTable from "./TodoTable";
import TodoCardList from "./TodoCardList";
import { TodosFields, type FilterType, type SortByType } from "../../constants";

enum View {
  TABLE = "table",
  CARD = "card",
}

function MyTodos() {
  const {
    todos,
    fetchTodos,
    toggleTodosFrom,
    getTodos,
    isTodosFromChat,
    isLoadingTodos,
  } = useChat();
  const [isSortByPopupVisible, setIsSortByPopupVisible] =
    useState<boolean>(false);
  const [isFilterPopupVisible, setIsFilterPopupVisible] =
    useState<boolean>(false);
  const [view, setView] = useState<View>(View.TABLE);
  const [sortBy, setSortBy] = useState<SortByType>({
    field: TodosFields.ID,
    ascending: false,
  });
  const [filterOptions, setFilterOptions] = useState<FilterType>();

  const filteredTodos = getTodos().filter(
    ({ complete, dueDate, created_at }) => {
      if (filterOptions) {
        if (
          filterOptions.status &&
          ((filterOptions.status.complete && !complete) ||
            (!filterOptions.status.complete && complete))
        ) {
          return false;
        }

        if (
          filterOptions.dueDate &&
          filterOptions.dueDate.start &&
          dueDate &&
          filterOptions.dueDate.start.getTime() > new Date(dueDate).getTime()
        ) {
          return false;
        }

        if (
          filterOptions.dueDate &&
          filterOptions.dueDate.end &&
          dueDate &&
          filterOptions.dueDate.end.getTime() < new Date(dueDate).getTime()
        ) {
          return false;
        }

        if (
          filterOptions.createOn &&
          filterOptions.createOn.start &&
          created_at &&
          filterOptions.createOn.start.getTime() >
            new Date(created_at).getTime()
        ) {
          return false;
        }

        if (
          filterOptions.createOn &&
          filterOptions.createOn.end &&
          created_at &&
          filterOptions.createOn.end.getTime() < new Date(created_at).getTime()
        ) {
          return false;
        }
      }
      return true;
    }
  );

  const sortedTodos = [...filteredTodos].sort((a, b) => {
    if (TodosFields.TASK === sortBy.field) {
      return sortBy.ascending
        ? a.task.localeCompare(b.task)
        : b.task.localeCompare(a.task);
    } else if (TodosFields.COMPLETE === sortBy.field) {
      if (sortBy.ascending)
        return a.complete === true
          ? b.complete === false
            ? -1
            : 1
          : b.complete === true
          ? 1
          : 1;
      else
        return a.complete === true
          ? b.complete === false
            ? 1
            : 0
          : b.complete === true
          ? -1
          : 0;
    } else if (TodosFields.DUEDATE === sortBy.field) {
      const d1 = a.dueDate ? new Date(a.dueDate).getTime() : 0;
      const d2 = b.dueDate ? new Date(b.dueDate).getTime() : 0;
      return sortBy.ascending ? d1 - d2 : d2 - d1;
    } else if (TodosFields.CTEATE_AT === sortBy.field) {
      const d1 = a.created_at ? new Date(a.created_at).getTime() : 0;
      const d2 = b.created_at ? new Date(b.created_at).getTime() : 0;
      return sortBy.ascending ? d1 - d2 : d2 - d1;
    }
    return 0;
  });

  const toggleSortByPopup = () => {
    setIsSortByPopupVisible((preState) => !preState);
  };
  const showSortByPopup = () => {
    setIsFilterPopupVisible(false);
    setIsSortByPopupVisible(true);
  };
  const hideSortByPopup = () => {
    setIsSortByPopupVisible(false);
  };

  const toggleFilterPopup = () => {
    setIsFilterPopupVisible((preState) => !preState);
  };

  const showFilterPopup = () => {
    setIsSortByPopupVisible(false);
    setIsFilterPopupVisible(true);
  };

  const hideFilterPopup = () => {
    setIsFilterPopupVisible(false);
  };

  const clearAllSortBy = () => {
    setSortBy({ field: TodosFields.ID, ascending: true });
  };
  
  const clearAllFilter = () => {
    setFilterOptions({});
  };

  const handleSortByItemClick = (todoField: TodosFields) => {
    setSortBy((preState: SortByType) => {
      return {
        field: todoField,
        ascending: preState.field === todoField ? !preState.ascending : true,
      };
    });
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const setFilters = (
    complete?: boolean,
    dueDateStart?: Date,
    dueDateEnd?: Date,
    createOnStart?: Date,
    createOnEnd?: Date
  ) => {
    setFilterOptions((preState) => ({
      ...preState,
      ...(complete !== undefined ? { status: { complete } } : {}),
      ...(dueDateStart ? { dueDate: { start: dueDateStart } } : {}),
      ...(dueDateEnd ? { dueDate: { end: dueDateEnd } } : {}),
      ...(createOnStart ? { createOn: { start: createOnStart } } : {}),
      ...(createOnEnd ? { createOn: { end: createOnEnd } } : {}),
    }));
  };

  const toggleView = () => {
    setView((preView) => (preView === View.TABLE ? View.CARD : View.TABLE));
  };

  return (
    <div className="p-2">
      <h1 className="text-xl">My Todos</h1>
      <p className="text-gray-600 text-sm">
        You have {todos.map(todo=>!todo.complete).length} todos pendding. Stay focused and complete
        them on time.
      </p>

      <div className="flex justify-between my-2">
        <div className="flex gap-2">
          <button
            className={`text-gray-700 border-2 border-gray-200 rounded-md px-3 flex gap-1 items-center cursor-pointer hover:scale-[101%] hover:shadow-sm ${
              View.TABLE === view && "bg-gray-200"
            }`}
            onClick={toggleView}
          >
            <ListTree size={16} />
            <span>List</span>
          </button>
          <button
            className={`text-gray-700 border-2 border-gray-200 rounded-md px-3 flex gap-1 items-center cursor-pointer hover:scale-[101%] hover:shadow-sm ${
              View.CARD === view && "bg-gray-200"
            }`}
            onClick={toggleView}
          >
            <GalleryVertical size={16} /> <span>Card</span>
          </button>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <button
              onClick={toggleFilterPopup}
              // onMouseEnter={showFilterPopup}
              // onMouseLeave={hideFilterPopup}
              className="text-gray-700 border-2 border-gray-300 rounded-md px-3 flex gap-1 items-center cursor-pointer hover:scale-[101%] hover:shadow-sm"
            >
              <Settings2 size={16} /> <span>Filter</span>
            </button>
            {isFilterPopupVisible && (
              <div className="min-w-60 bg-white border-2 border-gray-300 rounded-md absolute top-7 right-0 z-10 shadow-xs p-2">
                <div className="border-b-2 border-gray-300 py-2">
                  <span className="text-gray-700">status:</span>
                  <button
                    onClick={() => setFilters(true)}
                    className={`border rounded-md px-2 text-xs ml-2 font-semibold cursor-pointer hover:bg-green-500 hover:text-white ${
                      filterOptions?.status?.complete
                        ? "bg-green-500 text-white"
                        : "text-green-500"
                    }`}
                  >
                    Complete
                  </button>
                  <button
                    onClick={() => setFilters(false)}
                    className={`border rounded-md px-2 text-xs ml-2 font-semibold  cursor-pointer hover:bg-yellow-500 hover:text-white ${
                      filterOptions?.status?.complete === false
                        ? "bg-yellow-500 text-white"
                        : "text-yellow-500"
                    }`}
                  >
                    Pendding
                  </button>
                </div>
                <div className="border-b-2 border-gray-300 py-2">
                  <span className="text-gray-700">due date:</span>
                  <div>
                    <div className="flex flex-col gap-2">
                      {/* Start Date */}
                      <div className="flex items-center justify-between">
                        <label className="text-gray-600 text-sm">Start:</label>
                        <input
                          type="date"
                          onChange={(e) =>
                            setFilters(undefined, new Date(e.target.value))
                          }
                          className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:ring-1 focus:ring-blue-400 outline-none"
                        />
                      </div>

                      {/* End Date */}
                      <div className="flex items-center justify-between">
                        <label className="text-gray-600 text-sm">End:</label>
                        <input
                          type="date"
                          onChange={(e) =>
                            setFilters(
                              undefined,
                              undefined,
                              new Date(e.target.value)
                            )
                          }
                          className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:ring-1 focus:ring-blue-400 outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border-b-2 border-gray-300 py-2">
                  <span className="text-gray-700">Create on:</span>
                  <div>
                    <div className="flex flex-col gap-2">
                      {/* Start Date */}
                      <div className="flex items-center justify-between">
                        <label className="text-gray-600 text-sm">Start:</label>
                        <input
                          type="date"
                          onChange={(e) =>
                            setFilters(
                              undefined,
                              undefined,
                              undefined,
                              new Date(e.target.value)
                            )
                          }
                          className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:ring-1 focus:ring-blue-400 outline-none"
                        />
                      </div>

                      {/* End Date */}
                      <div className="flex items-center justify-between">
                        <label className="text-gray-600 text-sm">End:</label>
                        <input
                          type="date"
                          onChange={(e) =>
                            setFilters(
                              undefined,
                              undefined,
                              undefined,
                              undefined,
                              new Date(e.target.value)
                            )
                          }
                          className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:ring-1 focus:ring-blue-400 outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between p-1">
                  <button
                    onClick={clearAllFilter}
                    className="text-blue-500 text-sm font-semibold cursor-pointer hover:bg-blue-100 py-0.5 px-2 rounded-md"
                  >
                    Clear All
                  </button>
                  <button
                    onClick={hideFilterPopup}
                    className="text-red-500 text-sm font-semibold cursor-pointer hover:bg-red-100 py-0.5 px-2 rounded-md"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="relative">
            <button
              onClick={toggleSortByPopup}
              // onMouseEnter={showSortByPopup}
              // onMouseLeave={hideSortByPopup}
              className="text-gray-700 border-2 border-gray-300 rounded-md px-3 flex gap-1 items-center cursor-pointer hover:scale-[101%] hover:shadow-sm"
            >
              <ArrowDownUp size={16} /> <span>Sort By</span>
            </button>
            {isSortByPopupVisible && (
              <div
                onMouseLeave={hideSortByPopup}
                className="absolute top-8 right-0 z-20 w-48 bg-white rounded-md border-2 border-gray-300 shadow-xl px-1"
              >
                <div className="px-2 py-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Sort by
                </div>
                <div className="pb-2 border-b-2 border-gray-300">
                  <ul>
                    <SortByItem
                      displayText="Task Name"
                      sortBy={sortBy}
                      todoField={TodosFields.TASK}
                      handleSortByItemClick={handleSortByItemClick}
                    />
                    <SortByItem
                      displayText="Status"
                      sortBy={sortBy}
                      todoField={TodosFields.COMPLETE}
                      handleSortByItemClick={handleSortByItemClick}
                    />
                    <SortByItem
                      displayText="Due Date"
                      sortBy={sortBy}
                      todoField={TodosFields.DUEDATE}
                      handleSortByItemClick={handleSortByItemClick}
                    />
                    <SortByItem
                      displayText="Creation Date"
                      sortBy={sortBy}
                      todoField={TodosFields.CTEATE_AT}
                      handleSortByItemClick={handleSortByItemClick}
                    />
                  </ul>
                </div>
                <button
                  onClick={clearAllSortBy}
                  className="text-blue-500 text-sm font-semibold cursor-pointer hover:bg-blue-100 py-0.5 px-2 rounded-md m-2"
                >
                  Clear All
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="border-2 border-gray-300 text-gray-700 rounded-md px-2 py-1 flex justify-between cursor-not-allowed hover:scale-[101%] hover:shadow-sm my-2">
        <div className="flex gap-2">
          <Grid2x2Plus />
          <span className="">Todo</span>
        </div>
        <Plus />
      </div>

      <div className="flex justify-between">
        <div className="flex">
          <button
            className={`text-gray-700 border-2 border-gray-200 rounded-md rounded-b-none px-3 py-1 flex gap-1 items-center cursor-pointer hover:scale-[101%] hover:shadow-s ${
              isTodosFromChat ? "" : "bg-gray-200"
            }`}
            onClick={toggleTodosFrom}
          >
            <span>All todos</span>
          </button>
          <button
            className={`text-gray-700 border-2 border-gray-200 rounded-md rounded-b-none px-3 flex gap-1 items-center cursor-pointer hover:scale-[101%] hover:shadow-sm ${
              isTodosFromChat ? "bg-gray-200" : ""
            }`}
            onClick={toggleTodosFrom}
          >
            <span>Todos from chat</span>
          </button>
        </div>
      </div>

      {View.TABLE === view ? (
        <TodosTable
          isLoadingTodos={isLoadingTodos}
          todos={sortedTodos}
          sortBy={sortBy}
        />
      ) : (
        <TodoCardList
          isLoadingTodos={isLoadingTodos}
          todos={sortedTodos}
          sortBy={sortBy}
        />
      )}
    </div>
  );
}

export default MyTodos;

const SortByItem = ({
  displayText,
  sortBy,
  todoField,
  handleSortByItemClick,
}: any) => {
  const isActive = sortBy.field === todoField;

  return (
    <li>
      <button
        onClick={() => handleSortByItemClick(todoField)}
        className={`group flex items-center justify-between w-full px-2 py-2 text-sm rounded-md transition-colors cursor-pointer mb-1
          ${
            isActive
              ? "bg-gray-200 text-gray-700"
              : "text-gray-700 hover:bg-gray-200"
          }
        `}
      >
        <div className="flex items-center gap-2">
          <div className="w-4 flex justify-center">{isActive && <Check />}</div>
          <span
            className={`font-medium capitalize ${isActive && "font-semibold"}`}
          >
            {displayText}
          </span>
        </div>
        {isActive && (
          <span className="opacity-100">
            {sortBy.ascending ? <ChevronUp /> : <ChevronDown />}
          </span>
        )}
      </button>
    </li>
  );
};
