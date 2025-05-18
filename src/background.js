chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const source = new URL(sender.url);
  if (request.action === "fetchData") {
    switch (source.host) {
      case "www.cnn.com":
        return summarizeText(request, sendResponse);
      default:
        break;
    }
  }
});

function summarizeText(request, sendResponse) {
  const url = "https://api.cerebras.ai/v1/chat/completions";
  const requestBody = {
    model: "llama-4-scout-17b-16e-instruct",
    stream: false, // No need to stream with 2600 tokens/second
    messages: [
      {
        role: "user",
        content:
          "Summarize the key facts in the following news article. Omit any subjectivity or emotion. Your summary should be shorter than 50 words. Keep your sentences short and free of jargon. Respond with just the summary text and no preamble.\n\n" +
          "<articleText>\n" +
          request.data +
          "</articleText>",
      },
    ],
    temperature: 0,
    seed: 0,
    top_p: 1,
  };

  const cerebrasApiKey = "<YOUR-API-KEY>";
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${cerebrasApiKey}`,
  };

  fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(requestBody),
  })
    .then((response) => response.json())
    .then((result) => {
      const summary = result.choices[0]?.message?.content;
      if (summary && result.choices[0]?.finish_reason === "stop") {
        const withoutThinkingTokens = summary.split("</think>")?.[1] ?? summary;
        sendResponse(withoutThinkingTokens.trim());
      }
    })
    .catch((error) => console.error(error));
  return true;
}
