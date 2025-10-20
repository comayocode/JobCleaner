chrome.action.onClicked.addListener((tab) => {
  // Renderizar el panel en la página actual
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["panel/panel.js"]
  });
});