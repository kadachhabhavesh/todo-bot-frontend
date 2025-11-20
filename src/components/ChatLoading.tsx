function ChatLoading() {
  const userWidths = ["w-5/6", "w-2/3", "w-4/5", "w-1/2"];

  // natural assistant line widths
  const assistantLineWidths = ["w-full", "w-3/4", "w-2/3", "w-1/2"];

  return (
    <div className="flex flex-col gap-4">
      {userWidths.map((width, i) => (
        <div key={i} className="flex flex-col gap-4">
          {/* USER bubble */}
          <div
            className={`
              bg-linear-to-r from-blue-400 to-purple-500 text-white 
              py-2 px-3 rounded-b-xl rounded-s-xl text-xs ${width}
              mr-2 self-end shadow-xl
            `}
          >
            <div className="flex flex-col gap-2">
              <div className="h-4 w-3/4 rounded bg-white/40 animate-pulse"></div>
            </div>
          </div>

          {/* ASSISTANT bubble — FIXED */}
          <div
            className={` bg-white
             py-2 px-3 rounded-b-xl self-start rounded-e-xl text-xs ${assistantLineWidths[i]}
              mr-2 self-end shadow-xl
            `}
          >
            <div className="flex flex-col gap-2">
              <div className={`h-3 ${assistantLineWidths[i % 4]} rounded bg-gray-300 animate-pulse`}></div>
              <div className={`h-3 ${assistantLineWidths[(i + 1) % 4]} rounded bg-gray-300 animate-pulse`}></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ChatLoading;
