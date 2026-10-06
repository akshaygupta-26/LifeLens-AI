# LifeLens AI ✦ Intelligent Personal Life & Productivity OS

[![Platform](https://img.shields.io/badge/Platform-Web-blue?style=for-the-badge&logo=googlechrome)](http://127.0.0.1:3000/index.html)
[![Tech](https://img.shields.io/badge/Stack-HTML5%20%7C%20CSS3%20%7C%20Vanilla%20JS-F7DF1E?style=for-the-badge&logo=javascript)](file:///Users/akshaygupta/Lifelens%20Ai/script.js)
[![AI Engine](https://img.shields.io/badge/AI%20Engine-Dual%20Engine%20(Offline%20%2B%20Gemini)-8b5cf6?style=for-the-badge&logo=googlegemini)](file:///Users/akshaygupta/Lifelens%20Ai/index.html)
[![License](https://img.shields.io/badge/License-MIT-success?style=for-the-badge)](LICENSE)

> **LifeLens AI** is a state-of-the-art personal AI workspace crafted with modern glassmorphism aesthetics, dual AI inference engines (instant offline simulation + direct Google Gemini API), 6 specialized intelligence modes, and interactive productivity widgets.

---

## 🌟 Key Highlights

- **Dual AI Engine Architecture**: 
  - **Zero-Setup Offline Engine**: Works entirely offline with zero API keys, providing instant responses, structured Feynman flashcards, milestone checklists, and synthesis.
  - **Google Gemini Direct API**: Seamless integration with `gemini-1.5-flash`, `gemini-2.0-flash`, and `gemini-1.5-pro` using client-side API keys stored securely in your browser's `localStorage`.
- **6 Domain-Specific Intelligence Modes**:
  1. 💬 **AI Assistant**: Conversational reasoning, problem solving, and syntax-highlighted code generation with copy actions.
  2. 📄 **Smart Summarize**: Instant executive TL;DR cards, bulleted core insights, and prioritized action items.
  3. 📚 **Study Helper**: Deep conceptual breakdowns via the Feynman technique and **interactive 3D flip flashcards**.
  4. 💡 **Idea Generator**: Creative brainstorming with concept cards, tech stack tags, and feasibility ratings.
  5. 🎯 **Goal Planner**: Actionable milestone roadmaps with **interactive checkboxes and live progress bar updates**.
  6. 🧘 **Daily Reflection**: Gratitude journaling, mindfulness prompts, and cognitive reframing.
- **Multimodal & Voice Tools**:
  - **Speech-to-Text Voice Dictation**: Hands-free prompt input powered by the Web Speech Recognition API.
  - **Text-to-Speech Audio Playback**: High-clarity spoken narration of any AI response.
  - **Audio Feedback**: Subtle Web Audio synthesizer chimes upon message arrival.
  - **File Attachment Analysis**: Attach `.txt`, `.md`, `.json`, `.csv`, `.js`, or `.py` files up to 5MB.
- **Data Privacy & Multi-Session History**:
  - Persistent chat sessions saved in browser `localStorage`.
  - Export full conversations into **Markdown (`.md`)**, **Plain Text (`.txt`)**, or structured **JSON (`.json`)**.
- **Aesthetic Glassmorphic UI**:
  - Deep dark theme with glowing ambient background orbs.
  - Crisp light mode toggle with smooth CSS variable transitions.
  - Responsive mobile drawer navigation with backdrop blur.

---

## 📸 Intelligence Modes Overview

### 1. 📚 Study Helper & Interactive Flashcards
Transform any complex topic into bite-sized Feynman explanations accompanied by interactive flashcards:
- Click any flashcard to flip between the prompt/question and the answer.
- Visual micro-hints guide learning without spoiling the recall exercise.

### 2. 🎯 Goal Planner & Live Milestone Checklist
Turn ambitious aspirations into clear execution plans:
- Automatically renders a checklist with milestone items.
- Toggling tasks dynamically recalculates the **progress bar percentage** in real-time.

### 3. 📄 Smart Summarize & Executive Briefs
Paste articles, meeting notes, or research papers:
- Renders an **Executive Summary (TL;DR)** badge box.
- Extracts key takeaways and action items organized with high scannability.

### 4. 💡 Idea Generator & Concept Cards
Spark innovation with structured brainstorm cards:
- Concept title, star ratings, recommended tech stacks, and execution angles.

---

## 🚀 Quick Start Guide

**LifeLens AI** requires **zero build tools, zero bundlers, and zero npm dependencies**. It runs natively on pure HTML5, CSS3, and modern JavaScript.

### Option 1: Run with Python (Recommended)

```bash
# Navigate to the project directory
cd "/Users/akshaygupta/Lifelens Ai"

# Start a local HTTP server
python3 -m http.server 3000 --bind 127.0.0.1
```

Open your browser and navigate to:
```
http://127.0.0.1:3000/index.html
```

### Option 2: Run with VS Code Live Server / Any Static Server

Simply right-click [`index.html`](file:///Users/akshaygupta/Lifelens%20Ai/index.html) and select **"Open with Live Server"** or run:
```bash
npx serve .
```

---

## ⚙️ Configuring Google Gemini API (Optional)

By default, LifeLens AI operates using its built-in **Smart Offline Engine** with no configuration required.

To enable live Google Gemini AI capabilities:
1. Click the **"AI Engine"** button in the top navigation bar (or press `⌘/` / `Ctrl+/`).
2. Switch **Active Engine Provider** to **Google Gemini AI (Direct API)**.
3. Paste your Gemini API key (obtainable for free from [Google AI Studio](https://aistudio.google.com/app/apikey)).
4. Choose your preferred model (`Gemini 1.5 Flash`, `Gemini 2.0 Flash`, or `Gemini 1.5 Pro`).
5. Click **"Save & Apply"**.

> 🔒 **Security Notice**: Your API key is stored strictly within your browser's private `localStorage` and sent directly to Google's official Gemini endpoint. It is never relayed to third-party servers.

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| <kbd>Enter</kbd> | Send message |
| <kbd>Shift</kbd> + <kbd>Enter</kbd> | Insert new line in prompt box |
| <kbd>⌘K</kbd> / <kbd>Ctrl+K</kbd> | Start a new conversation |
| <kbd>⌘/</kbd> / <kbd>Ctrl+/</kbd> | Open AI Engine Settings modal |
| <kbd>Esc</kbd> | Close any open modal |

---

## 📂 File Architecture

```
Lifelens Ai/
├── index.html        # Semantic HTML5 markup, layout, modals & accessibility tags
├── style.css         # Glassmorphism design tokens, CSS variables, dark/light themes
├── script.js         # Core application logic, dual AI engines, markdown parser & widgets
└── README.md         # Documentation, feature guide, and setup instructions
```

---

## 🎨 Design System & Aesthetics

- **Color Tokens**:
  - Dark Theme Background: `#0a0b12` with elevated glass surfaces (`rgba(18, 21, 33, 0.72)`)
  - Accent Gradient: `linear-gradient(135deg, #8b5cf6 0%, #d946ef 50%, #3b82f6 100%)`
  - Typography: **Outfit** (headings), **Plus Jakarta Sans** (body text), and **JetBrains Mono** (code blocks)
- **Effects**:
  - Real-time `backdrop-filter: blur(18px)` glassmorphism
  - Animated glowing ambient radial gradients
  - Smooth micro-interactions on hover and active click states

---

## 📄 License

This project is licensed under the [MIT License](LICENSE) — free for personal and educational use.
