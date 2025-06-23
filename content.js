const bookmarkImgURL = chrome.runtime.getURL("assets/AI.png");

// Use these lazily only *after* button click
let chatbotHtmlPath = null;
let chatbotCssPath = null;
let chatbotJsPath = null;

const observer = new MutationObserver(() => {
    if (onProblemsPage()) addBookmarkButton();
});
observer.observe(document.body, { childList: true, subtree: true });

function onProblemsPage() {
    return window.location.pathname.startsWith('/problems/');
}

function addBookmarkButton() {
    if (!onProblemsPage() || document.getElementById("add-bookmark-button")) return;

    const titleElement = document.querySelector(".Header_resource_heading__cpRp1");
    if (!titleElement || !titleElement.parentNode) return;

    const button = document.createElement("img");
    button.id = "add-bookmark-button";
    button.src = bookmarkImgURL;
    button.style.height = "30px";
    button.style.width = "30px";
    button.style.marginLeft = "10px";
    button.style.cursor = "pointer";
    button.title = "Open AI Chat";

    titleElement.parentNode.appendChild(button);

    button.addEventListener("click", openChatbot);
}

function openChatbot() {
    const existing = document.getElementById("ai-chatbot-container");

    if (existing) {
        existing.remove();
        return;
    }

    // ⚠️ Delay a tick to ensure context is fresh
    setTimeout(() => {
        const chatbotHtmlPath = chrome.runtime.getURL("chatbot.html");
        const chatbotCssPath = chrome.runtime.getURL("chatbot.css");
        const chatbotJsPath = chrome.runtime.getURL("chatbot.js");

        fetch(chatbotHtmlPath)
            .then(res => res.text())
            .then(html => {
                const container = document.createElement("div");
                container.id = "ai-chatbot-container";
                container.innerHTML = html;
                document.body.appendChild(container);

                const css = document.createElement("link");
                css.rel = "stylesheet";
                css.href = chatbotCssPath;
                document.head.appendChild(css);

                const script = document.createElement("script");
                script.src = chatbotJsPath;
                document.body.appendChild(script);
            })
            .catch(err => {
                console.error("Error injecting chatbot:", err);
            });
    }, 0); // zero-delay async wrapper
}

