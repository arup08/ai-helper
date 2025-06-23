// Send message on Enter key
document.getElementById("chatbot-input").addEventListener("keydown", async (e) => {
    if (e.key === "Enter") {
        await sendMessage();
    }
});

async function sendMessage() {
    const input = document.getElementById("chatbot-input");
    const message = input.value.trim();
    if (!message) return;

    addMessage(message, "user");
    input.value = "";

    // Show typing indicator
    showTypingIndicator();

    // Extract coding problem context
    const context = extractProblemContext();

    // Get AI response
    const response = await getAIResponse(message, context);

    // Hide typing indicator
    hideTypingIndicator();

    // Add response (with code support)
    addMessage(response, "ai");
}

function addMessage(content, sender = 'ai') {
    const container = document.getElementById("chatbot-messages");
    const message = document.createElement("div");
    message.classList.add("message", sender);

    const bubble = document.createElement("div");
    bubble.classList.add("message-bubble");

    // Detect and format ```code blocks```
    const codeBlockPattern = /```(?:[a-z]*)\n([\s\S]*?)```/g;
    let formatted = content.replace(codeBlockPattern, (_, code) => {
        return `<pre><code>${escapeHTML(code)}</code></pre>`;
    });

    bubble.innerHTML = formatted;
    message.appendChild(bubble);
    container.appendChild(message);
    container.scrollTop = container.scrollHeight;
}

// Escapes HTML inside code
function escapeHTML(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

function showTypingIndicator() {
    document.getElementById("typing-indicator").style.display = "block";
    const container = document.getElementById("chatbot-messages");
    container.scrollTop = container.scrollHeight;
}

function hideTypingIndicator() {
    document.getElementById("typing-indicator").style.display = "none";
}

function closeChatbot() {
    const container = document.getElementById("ai-chatbot-container");
    if (container) {
        container.style.animation = "slideDown 0.3s cubic-bezier(0.4, 0, 1, 1)";
        setTimeout(() => container.remove(), 300);
    }
}

function extractProblemContext() {
    const title = document.querySelector("h4.coding_problem_info_heading__G9ueL")?.innerText || "Unknown Problem";
    const descContainer = document.querySelector(".coding_desc_container__gdB9M");
    const description = descContainer?.innerText || "No description available.";

    return `
You are helping with the following coding problem only:

Title: ${title}

${description}

---
❗ Only answer questions related to this coding problem.
If the user asks anything else, reply: "Please ask questions related to this coding problem only."`;
}

async function getAIResponse(userInput, context) {
    const apiKey = API_KEY; 

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    try {
        const res = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            { text: `${context}\n\nUser: ${userInput}` }
                        ]
                    }
                ]
            })
        });

        const data = await res.json();
        const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        return reply || "No response from Gemini.";
    } catch (error) {
        console.error("Gemini API error:", error);
        return "Error contacting Gemini AI.";
    }
}
