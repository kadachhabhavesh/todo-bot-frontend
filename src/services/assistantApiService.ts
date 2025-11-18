const parseJsonResponse = async (
  response: Response
): Promise<{
  status: number;
  ok: boolean;
  json: any;
}> => {
  try {
    const json = await response.json();
    return {
      status: response.status,
      ok: response.ok,
      json,
    };
  } catch (error) {
    console.error("Failed to parse JSON:", error);
    throw error;
  }
};

export const sendMessageToAssistant = async (userMessage: string) => {
  console.log("userMessage-2", userMessage);
  try {
    const assistantResponse = await fetch(`${import.meta.env.VITE_API_URL}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input: userMessage }),
    }).then(parseJsonResponse);
    console.log("Assistant API response:", assistantResponse);
    return assistantResponse.json.data.output;
  } catch (error) {
    console.log("Error while calling api", error);
  }
};
