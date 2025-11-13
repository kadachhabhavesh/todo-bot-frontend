const parseJsonReponse = (response) => {
  try {
    return new Promise((resolve, reject) =>
      response.json().then((json) => ({
        status: response.statusCode,
        ok: response.ok,
        json,
      }))
    );
  } catch (error) {
    console.log();
  }
};

export const sendMessageToAssistant = async () => {
  try {
    const assistantResponse =await  fetch(import.meta.env.VITE_API_URL, {
      method: "POST",
    }).then(parseJsonReponse);
    return assistantResponse.json;
  } catch (error) {
    console.log("Error while calling api", error.message);
  }
};
