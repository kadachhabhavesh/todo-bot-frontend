import { ArrowRight } from "lucide-react";
import "./index.css";

function App() {
  return (
    <div className="bg-gray-200 h-dvh flex justify-center items-center p-2">
      <div className="w-[450px] h-full grid grid-rows-12">
        <div className="row-span-10">
          {/* {chatMessages.map((message) => (
          <div>{message.text}</div>
        ))} */}
          {/* chat composer */}
          <h1 className="font-hand">BHAVESH kadachha</h1>
        </div>
        <div className="row-span-2">
          <div className="h-20 bg-white w-full flex flex-row items-end rounded-md shadow-xl relative">
            <textarea
              className="w-full h-full p-2 rounded-md focus:outline-none resize-none"
              placeholder="Ask, write or search for you todos..."
            ></textarea>
            <button className="aspect-square flex justify-center items-center absolute right-1 bottom-1 bg-black rounded-full px-1 cursor-pointer">
              <ArrowRight className="text-white w-5" />
            </button>
              <p className="absolute left-1 bottom-1 text-sm text-gray-500">0</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
