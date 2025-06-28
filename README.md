# 🧠 AI Helper for Maang.in

An intelligent Chrome Extension that integrates a floating AI chatbot directly into Maang.in's coding platform to assist users with problem-specific queries using the Gemini API.

---

## 🚀 Features

- 🔹 **Floating AI Chatbot UI** embedded on coding problem pages  
- 🔹 **Gemini API integration** for real-time, contextual code assistance  
- 🔹 **Problem-aware prompt design** to ensure only relevant queries are answered  
- 🔹 **Typing animation**, code formatting, and modern UI with CSS effects  
- 🔹 **SPA support** using `MutationObserver` to handle route changes dynamically  

---

## 📦 Installation

1. Clone or download the extension folder
2. Open Chrome and go to `chrome://extensions`
3. Enable **Developer Mode** (top right)
4. Click **"Load unpacked"** and select the extension directory

---

## 🔧 Tech Stack

- HTML, CSS, JavaScript
- Gemini API (via `fetch`)
- DOM manipulation & `MutationObserver`
- Chrome Extension Manifest v3

---

## 📌 Note

This chatbot is designed to assist **only within the context of the current coding problem**.  
If you ask anything unrelated, it will politely reject the query.

---
