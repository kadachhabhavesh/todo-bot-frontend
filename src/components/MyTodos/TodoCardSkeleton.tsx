function TodoCardSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="bg-white shadow-md rounded-xl p-4 border border-gray-200 animate-pulse">
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
      ))}
    </div>
  );
}

export default TodoCardSkeleton;
