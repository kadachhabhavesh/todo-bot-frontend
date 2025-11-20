import { ASSISTANT_RESPONSE_LOADING_MESSAGE } from "../../constants";

function ResponseLoading() {
  return (
    <div className="text-xs mb-5">
      <span>{ASSISTANT_RESPONSE_LOADING_MESSAGE}</span>
    </div>
  );
}

export default ResponseLoading;
