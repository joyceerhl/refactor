const url = new URL(document.URL);
if (url.hostname === "www.cnn.com") {
  summarizeText();
}

function summarizeText() {
  const content = extractCNNArticleContent();

  if (content) {
    chrome.runtime.sendMessage(
      { action: "fetchData", data: content },
      (summary) => {
        if (summary) {
          handleSummary(summary);
        }
      }
    );
  }
}

function extractCNNArticleContent() {
  return document
    .querySelector(".article__content")
    ?.textContent?.trim()
    .split("\n")
    .filter((line) => !!line)
    .join("\n");
}

function handleSummary(summary) {
  const summaryElement = document.createElement("div");
  summaryElement.textContent = summary;
  const headline = document.querySelector(".headline__sub-text");
  if (headline) {
    headline.insertBefore(summaryElement, headline.firstChild);
  }
}
