import { ASSISTANT_RESPONSE_LOADING_MESSAGE } from "../../constants";

function ResponseLoading() {
  return (
    // <div className="text-xs mb-5">
    //   <span>{ASSISTANT_RESPONSE_LOADING_MESSAGE}</span>
    // </div>

    <div className=" bg-assistant-message py-2 px-3 mb-3 rounded-b-xl self-start rounded-e-xl text-xs mr-2 shadow-xl w-3/4">
      <div className="flex flex-col gap-2">
        <div
          className={`h-3 
          w-full rounded bg-gray-300 animate-pulse`}
        ></div>
        <div
          className={`h-3 
          w-3/4 rounded bg-gray-300 animate-pulse`}
        ></div>
      </div>
    </div>
  );
}

export default ResponseLoading;
