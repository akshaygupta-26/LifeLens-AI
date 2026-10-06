/**
 * LifeLens AI — Intelligent Personal Life & Productivity OS
    * Features:
 * - Dual AI Engine: Smart Contextual Offline Generator + Google Gemini Direct API
    * - 6 Intelligence Modes: AI Assistant, Smart Summarize, Study Helper, Idea Generator, Goal Planner, Daily Reflection
        * - Interactive Widgets: Flip Flashcards, Dynamic Goal Checklist with Live Progress Bar, Summary TL; DRs, Idea Concept Cards
            * - Full Markdown Parsing & Syntax - Highlighted Code Blocks with Copy Feature
                * - Text - To - Speech(SpeechSynthesis) and Voice - to - Text Dictation(SpeechRecognition)
                    * - File Attachment Support(.txt, .md, .json, .csv, code files)
                        * - Multi - Session Conversation Storage in LocalStorage with History Management
                            * - Export to Markdown(.md), Plain Text(.txt), and JSON(.json)
                                * - Glassmorphic Theme Toggle(Light / Dark) & Fully Responsive Drawer
                                    */

                                        (function () {
                                            "use strict";

                                            /* ==========================================================================
                                               DOM Elements
                                               ========================================================================== */
                                            const chat = document.getElementById("chat");
                                            const promptBox = document.getElementById("prompt");
                                            const composer = document.getElementById("composer");
                                            const sendBtn = document.getElementById("sendBtn");
                                            const hero = document.getElementById("hero");
                                            const heroTitle = document.getElementById("heroTitle");
                                            const heroDesc = document.getElementById("heroDesc");
                                            const quickGrid = document.getElementById("quickGrid");
                                            const pageTitle = document.getElementById("pageTitle");
                                            const eyebrowPill = document.getElementById("eyebrowPill");
                                            const modePill = document.getElementById("modePill");
                                            const typingIndicator = document.getElementById("typingIndicator");
                                            const composerSuggestions = document.getElementById("composerSuggestions");
                                            const contentArea = document.getElementById("contentArea");

                                            // File attachments
                                            const fileInput = document.getElementById("fileInput");
                                            const attachBtn = document.getElementById("attachBtn");
                                            const filePreviewStrip = document.getElementById("filePreviewStrip");
                                            const attachedFileName = document.getElementById("attachedFileName");
                                            const removeFileBtn = document.getElementById("removeFileBtn");

                                            // Voice & Audio
                                            const micBtn = document.getElementById("micBtn");

                                            // Sidebar & Navigation
                                            const sidebar = document.getElementById("sidebar");
                                            const menuToggleBtn = document.getElementById("menuToggleBtn");
                                            const mobileCloseBtn = document.getElementById("mobileCloseBtn");
                                            const sidebarBackdrop = document.getElementById("sidebarBackdrop");
                                            const newChatBtn = document.getElementById("newChatBtn");
                                            const clearBtn = document.getElementById("clearBtn");
                                            const historyList = document.getElementById("historyList");
                                            const clearHistoryBtn = document.getElementById("clearHistoryBtn");
                                            const themeBtn = document.getElementById("themeBtn");
                                            const themeLabel = document.getElementById("themeLabel");
                                            const navItems = document.querySelectorAll(".nav-item");

                                            // Engine Badge
                                            const engineStatusBadge = document.getElementById("engineStatusBadge");
                                            const engineTitle = document.getElementById("engineTitle");
                                            const engineSub = document.getElementById("engineSub");

                                            // Settings Modal
                                            const settingsBtn = document.getElementById("settingsBtn");
                                            const settingsModal = document.getElementById("settingsModal");
                                            const closeSettingsModal = document.getElementById("closeSettingsModal");
                                            const cancelSettingsBtn = document.getElementById("cancelSettingsBtn");
                                            const saveSettingsBtn = document.getElementById("saveSettingsBtn");
                                            const engineSelect = document.getElementById("engineSelect");
                                            const geminiGroup = document.getElementById("geminiGroup");
                                            const apiKeyInput = document.getElementById("apiKeyInput");
                                            const toggleApiKeyVisibility = document.getElementById("toggleApiKeyVisibility");
                                            const modelSelect = document.getElementById("modelSelect");
                                            const speechAutoToggle = document.getElementById("speechAutoToggle");

                                            // Export Modal
                                            const exportBtn = document.getElementById("exportBtn");
                                            const exportModal = document.getElementById("exportModal");
                                            const closeExportModal = document.getElementById("closeExportModal");
                                            const toastContainer = document.getElementById("toastContainer");

                                            /* ==========================================================================
                                               Mode Configurations & Data
                                               ========================================================================== */
                                            const MODES = {
                                                chat: {
                                                    id: "chat",
                                                    name: "AI Assistant",
                                                    icon: "💬",
                                                    eyebrow: "WORKSPACE MODE",
                                                    pill: "💬 General Assistant",
                                                    heroTitle: `See your life<br><span class="gradient-text">through a smarter lens.</span>`,
                                                    heroDesc: "LifeLens AI combines conversational intelligence, study breakdowns with interactive flashcards, milestone goal tracking, and instant text synthesis into one cohesive workspace.",
                                                    placeholder: "Ask LifeLens AI anything, request advice, code, or ideas...",
                                                    chips: ["Explain simply", "Provide code example", "Step-by-step guide", "Compare options"],
                                                    quickCards: [
                                                        {
                                                            icon: "⚡",
                                                            title: "Deep Reasoning",
                                                            desc: "Analyze complex problems & make decisions",
                                                            prompt: "Help me evaluate the pros and cons of switching to a modern tech stack like Next.js vs Vite for my next project."
                                                        },
                                                        {
                                                            icon: "💻",
                                                            title: "Code Architect",
                                                            desc: "Write clean code, debug, & build APIs",
                                                            prompt: "Write a clean JavaScript utility with TypeScript types to debounce API requests and explain how it works."
                                                        },
                                                        {
                                                            icon: "✍️",
                                                            title: "Draft & Polish",
                                                            desc: "Craft high-impact emails & presentations",
                                                            prompt: "Draft a concise, compelling pitch email to introduce an AI productivity tool to busy founders."
                                                        },
                                                        {
                                                            icon: "🧠",
                                                            title: "Mental Models",
                                                            desc: "Apply First Principles & Pareto Principle",
                                                            prompt: "Explain how to apply First Principles thinking to learn any complex new skill in 30 days."
                                                        }
                                                    ]
                                                },
                                                summarize: {
                                                    id: "summarize",
                                                    name: "Smart Summarize",
                                                    icon: "📄",
                                                    eyebrow: "SYNTHESIS MODE",
                                                    pill: "📄 Smart Synthesis",
                                                    heroTitle: `Condense hours of reading<br><span class="gradient-text">into minutes of clarity.</span>`,
                                                    heroDesc: "Extract core insights, executive summaries, actionable next steps, and sentiment metrics from articles, notes, and research papers.",
                                                    placeholder: "Paste an article, meeting notes, research text, or attach a document...",
                                                    chips: ["TL;DR only", "5 Key Bullet Points", "Action Items & Deadlines", "Executive Memo"],
                                                    quickCards: [
                                                        {
                                                            icon: "📑",
                                                            title: "Executive Brief",
                                                            desc: "Create an executive summary with next actions",
                                                            prompt: "Summarize this strategy meeting: Discussed Q3 user growth up 24%, mobile app retention needs improvement, launching redesign next month."
                                                        },
                                                        {
                                                            icon: "🔍",
                                                            title: "Research Paper TL;DR",
                                                            desc: "Synthesize methodology & findings",
                                                            prompt: "Provide an executive summary and 5 core bullet takeaways explaining the Transformer architecture in modern machine learning."
                                                        },
                                                        {
                                                            icon: "📊",
                                                            title: "Meeting Notes to Tasks",
                                                            desc: "Turn messy discussion notes into clear todos",
                                                            prompt: "Convert these brainstorm notes into clear owners, priorities, and action items for the development team."
                                                        },
                                                        {
                                                            icon: "📖",
                                                            title: "Book Chapter Synthesis",
                                                            desc: "Distill key lessons from non-fiction books",
                                                            prompt: "Summarize the core mental models from 'Atomic Habits' by James Clear, highlighting actionable habit stacking routines."
                                                        }
                                                    ]
                                                },
                                                study: {
                                                    id: "study",
                                                    name: "Study Helper",
                                                    icon: "📚",
                                                    eyebrow: "MASTERY MODE",
                                                    pill: "📚 Mastery & Flashcards",
                                                    heroTitle: `Master any subject<br><span class="gradient-text">with active recall & flashcards.</span>`,
                                                    heroDesc: "Deconstruct complex topics with the Feynman technique, generate interactive flip flashcards right in your chat, and test your knowledge.",
                                                    placeholder: "Enter a subject or concept you want to master (e.g. Quantum Physics, React Hooks)...",
                                                    chips: ["Create Flashcards", "Feynman Technique (ELI5)", "Quick Quiz", "Analogy & Examples"],
                                                    quickCards: [
                                                        {
                                                            icon: "⚛️",
                                                            title: "Quantum Superposition",
                                                            desc: "Break down physics concepts with analogies",
                                                            prompt: "Explain Quantum Superposition using the Feynman technique and create 3 interactive flashcards."
                                                        },
                                                        {
                                                            icon: "💻",
                                                            title: "Time & Space Complexity",
                                                            desc: "Understand Big-O notation intuitively",
                                                            prompt: "Explain Big-O notation with simple real-world metaphors and create flashcards for O(1), O(log n), O(n), and O(n^2)."
                                                        },
                                                        {
                                                            icon: "🧬",
                                                            title: "CRISPR & Gene Editing",
                                                            desc: "Bio-tech fundamentals simplified",
                                                            prompt: "Teach me how CRISPR-Cas9 works step-by-step and quiz me on the key mechanisms."
                                                        },
                                                        {
                                                            icon: "📈",
                                                            title: "Macroeconomics",
                                                            desc: "Inflation, interest rates, and monetary policy",
                                                            prompt: "Explain how central bank interest rates influence inflation, currency value, and employment."
                                                        }
                                                    ]
                                                },
                                                ideas: {
                                                    id: "ideas",
                                                    name: "Idea Generator",
                                                    icon: "💡",
                                                    eyebrow: "CREATIVITY MODE",
                                                    pill: "💡 Innovation Lab",
                                                    heroTitle: `Spark fresh breakthroughs<br><span class="gradient-text">from raw concepts to execution.</span>`,
                                                    heroDesc: "Brainstorm startup ideas, product features, creative campaign angles, and complete development roadmaps with feasibility ratings.",
                                                    placeholder: "What industry or domain do you want to innovate in? (e.g. AI tools, fitness, SaaS)...",
                                                    chips: ["Startup Concepts", "Feature Roadmaps", "Growth Hacks", "Wild / Contrarian Ideas"],
                                                    quickCards: [
                                                        {
                                                            icon: "🚀",
                                                            title: "Micro-SaaS Opportunities",
                                                            desc: "B2B SaaS products for solo developers",
                                                            prompt: "Generate 3 high-potential Micro-SaaS ideas that can be built in 4 weeks using modern AI APIs, with feasibility ratings."
                                                        },
                                                        {
                                                            icon: "📱",
                                                            title: "AI-Powered Mobile Apps",
                                                            desc: "Mobile-first consumer applications",
                                                            prompt: "Brainstorm 3 novel mobile app ideas leveraging local on-device AI for personal productivity and wellness."
                                                        },
                                                        {
                                                            icon: "🎨",
                                                            title: "Creator Economy Tools",
                                                            desc: "Monetization & workflow automation",
                                                            prompt: "Generate 3 creative ideas for tools that help newsletter writers and podcasters repurpose their content across video and social media."
                                                        },
                                                        {
                                                            icon: "🌱",
                                                            title: "Sustainable Tech",
                                                            desc: "Eco-friendly tech solutions",
                                                            prompt: "Brainstorm 3 innovative concepts for apps that help urban households track and reduce energy consumption and food waste."
                                                        }
                                                    ]
                                                },
                                                goals: {
                                                    id: "goals",
                                                    name: "Goal Planner",
                                                    icon: "🎯",
                                                    eyebrow: "EXECUTION MODE",
                                                    pill: "🎯 SMART Milestones",
                                                    heroTitle: `Turn ambitious visions<br><span class="gradient-text">into checkable milestones.</span>`,
                                                    heroDesc: "Structure your personal, career, and fitness objectives into interactive SMART milestone checklists with live progress tracking.",
                                                    placeholder: "What goal do you want to accomplish? (e.g. Run a half marathon, Launch a SaaS app in 30 days)...",
                                                    chips: ["30-Day Sprint", "Weekly Habits", "Obstacle Planning", "SMART Breakdown"],
                                                    quickCards: [
                                                        {
                                                            icon: "🏃‍♂️",
                                                            title: "Half Marathon in 12 Weeks",
                                                            desc: "Progressive running & conditioning plan",
                                                            prompt: "Create an interactive 12-week half marathon training milestone checklist for an intermediate runner."
                                                        },
                                                        {
                                                            icon: "💻",
                                                            title: "Ship a Web App in 30 Days",
                                                            desc: "Product roadmap from MVP to launch",
                                                            prompt: "Plan a 30-day goal roadmap with checkable milestones to build and launch an AI-powered web tool."
                                                        },
                                                        {
                                                            icon: "📚",
                                                            title: "Read 24 Books This Year",
                                                            desc: "Habit system and tracking cadence",
                                                            prompt: "Design a realistic goal structure and reading habit system to read 24 books a year without burning out."
                                                        },
                                                        {
                                                            icon: "💰",
                                                            title: "Build $10k Emergency Fund",
                                                            desc: "Savings milestones & budget optimization",
                                                            prompt: "Create a 6-month interactive milestone plan to save a $10,000 emergency fund on a moderate salary."
                                                        }
                                                    ]
                                                },
                                                reflection: {
                                                    id: "reflection",
                                                    name: "Daily Reflection",
                                                    icon: "🧘",
                                                    eyebrow: "MINDFULNESS MODE",
                                                    pill: "🧘 Mindset & Journal",
                                                    heroTitle: `Pause, calibrate & reflect<br><span class="gradient-text">for mental clarity and focus.</span>`,
                                                    heroDesc: "A safe, thoughtful sanctuary for evening debriefs, mood tracking, gratitude journaling, and cognitive reframing.",
                                                    placeholder: "How was your day? What went well, what felt stressful, or what are you grateful for?...",
                                                    chips: ["Evening Review", "Gratitude Journal", "Stoic Reframe", "Stress Reset"],
                                                    quickCards: [
                                                        {
                                                            icon: "🌅",
                                                            title: "Evening Decompression",
                                                            desc: "Process the day & prepare for rest",
                                                            prompt: "Guide me through a calming 5-minute evening reflection on what I accomplished and what I can let go of tonight."
                                                        },
                                                        {
                                                            icon: "🙏",
                                                            title: "Gratitude & Wins",
                                                            desc: "Cultivate positive mindset & appreciation",
                                                            prompt: "Help me identify 3 small wins and 3 things to be genuinely grateful for, even after a tough and chaotic day."
                                                        },
                                                        {
                                                            icon: "🏛️",
                                                            title: "Stoic Reframing",
                                                            desc: "Dichotomy of control for anxiety",
                                                            prompt: "I am feeling stressed about an upcoming presentation. Help me apply the Stoic Dichotomy of Control to regain calm."
                                                        },
                                                        {
                                                            icon: "🎯",
                                                            title: "Intentional Tomorrow",
                                                            desc: "Set morning priorities with purpose",
                                                            prompt: "Help me reflect on today's energy levels and define my single 'Highlight' priority for tomorrow morning."
                                                        }
                                                    ]
                                                }
                                            };

                                            /* ==========================================================================
                                               Application State
                                               ========================================================================== */
                                            let currentMode = "chat";
                                            let conversations = [];
                                            let currentConvId = null;
                                            let attachedFile = null;
                                            let isGenerating = false;
                                            let speechRecognition = null;
                                            let isListening = false;
                                            let synth = window.speechSynthesis || null;

                                            // Settings
                                            let settings = {
                                                engine: "offline", // 'offline' | 'gemini'
                                                apiKey: "",
                                                model: "gemini-1.5-flash",
                                                speechEffects: false
                                            };

                                            /* ==========================================================================
                                               Initialization
                                               ========================================================================== */
                                            function init() {
                                                loadSettings();
                                                loadConversations();
                                                setupEventListeners();
                                                setupSpeechRecognition();
                                                updateThemeUI();
                                                switchMode("chat", false);

                                                // If no conversation exists or current is empty, initialize fresh
                                                if (!currentConvId || !getConversation(currentConvId)) {
                                                    startNewConversation(false);
                                                } else {
                                                    renderCurrentConversation();
                                                }

                                                updateEngineBadgeUI();
                                            }

                                            /* ==========================================================================
                                               Settings Management
                                               ========================================================================== */
                                            function loadSettings() {
                                                try {
                                                    const saved = localStorage.getItem("lifelens_settings");
                                                    if (saved) {
                                                        settings = Object.assign(settings, JSON.parse(saved));
                                                    }
                                                } catch (e) {
                                                    console.warn("Failed to load settings from localStorage", e);
                                                }

                                                // Apply to form
                                                if (engineSelect) engineSelect.value = settings.engine;
                                                if (geminiGroup) geminiGroup.style.display = settings.engine === "gemini" ? "block" : "none";
                                                if (apiKeyInput) apiKeyInput.value = settings.apiKey || "";
                                                if (modelSelect) modelSelect.value = settings.model || "gemini-1.5-flash";
                                                if (speechAutoToggle) speechAutoToggle.checked = !!settings.speechEffects;
                                            }

                                            function saveSettings() {
                                                settings.engine = engineSelect.value;
                                                settings.apiKey = apiKeyInput.value.trim();
                                                settings.model = modelSelect.value;
                                                settings.speechEffects = speechAutoToggle.checked;

                                                localStorage.setItem("lifelens_settings", JSON.stringify(settings));
                                                updateEngineBadgeUI();
                                                showToast("Settings saved successfully", "success");
                                                closeModal(settingsModal);
                                            }

                                            function updateEngineBadgeUI() {
                                                if (!engineTitle || !engineSub) return;

                                                if (settings.engine === "gemini") {
                                                    if (settings.apiKey) {
                                                        engineTitle.textContent = `Google Gemini (${settings.model})`;
                                                        engineSub.textContent = "Online API Connected";
                                                    } else {
                                                        engineTitle.textContent = "Gemini (Missing Key)";
                                                        engineSub.textContent = "Click to enter API key";
                                                    }
                                                } else {
                                                    engineTitle.textContent = "Smart Offline AI";
                                                    engineSub.textContent = "Zero Setup • Instant Response";
                                                }
                                            }

                                            /* ==========================================================================
                                               Theme Management
                                               ========================================================================== */
                                            function toggleTheme() {
                                                const isDark = document.body.classList.toggle("dark");
                                                localStorage.setItem("lifelens_theme", isDark ? "dark" : "light");
                                                updateThemeUI();
                                            }

                                            function updateThemeUI() {
                                                const isDark = document.body.classList.contains("dark");
                                                if (themeLabel) {
                                                    themeLabel.textContent = isDark ? "Dark Theme" : "Light Theme";
                                                }
                                            }

                                            // Load theme from storage
                                            const savedTheme = localStorage.getItem("lifelens_theme");
                                            if (savedTheme === "light") {
                                                document.body.classList.remove("dark");
                                            } else {
                                                document.body.classList.add("dark");
                                            }

                                            /* ==========================================================================
                                               Conversation Management & Storage
                                               ========================================================================== */
                                            function loadConversations() {
                                                try {
                                                    const saved = localStorage.getItem("lifelens_conversations");
                                                    if (saved) {
                                                        conversations = JSON.parse(saved);
                                                    }
                                                } catch (e) {
                                                    console.warn("Failed to load conversations", e);
                                                    conversations = [];
                                                }

                                                renderHistoryList();
                                            }

                                            function saveConversations() {
                                                try {
                                                    localStorage.setItem("lifelens_conversations", JSON.stringify(conversations));
                                                } catch (e) {
                                                    console.error("Storage full or error saving conversations", e);
                                                }
                                                renderHistoryList();
                                            }

                                            function getConversation(id) {
                                                return conversations.find((c) => c.id === id);
                                            }

                                            function startNewConversation(resetUI = true) {
                                                const newId = "conv_" + Date.now();
                                                const newConv = {
                                                    id: newId,
                                                    title: "New Conversation",
                                                    mode: currentMode,
                                                    createdAt: Date.now(),
                                                    messages: []
                                                };

                                                conversations.unshift(newConv);
                                                currentConvId = newId;
                                                saveConversations();

                                                if (resetUI) {
                                                    chat.innerHTML = "";
                                                    showHeroSection(true);
                                                    promptBox.value = "";
                                                    clearAttachedFile();
                                                    promptBox.focus();
                                                }

                                                renderHistoryList();
                                            }

                                            function deleteConversation(id, event) {
                                                if (event) event.stopPropagation();
                                                conversations = conversations.filter((c) => c.id !== id);

                                                if (currentConvId === id) {
                                                    if (conversations.length > 0) {
                                                        loadConversationById(conversations[0].id);
                                                    } else {
                                                        startNewConversation(true);
                                                    }
                                                } else {
                                                    saveConversations();
                                                }
                                                showToast("Conversation deleted", "info");
                                            }

                                            function clearAllHistory() {
                                                if (!confirm("Are you sure you want to clear all conversation history?")) return;
                                                conversations = [];
                                                saveConversations();
                                                startNewConversation(true);
                                                showToast("All history cleared", "info");
                                            }

                                            function loadConversationById(id) {
                                                const conv = getConversation(id);
                                                if (!conv) return;

                                                currentConvId = id;
                                                switchMode(conv.mode || "chat", false);
                                                renderCurrentConversation();
                                                renderHistoryList();

                                                // Close sidebar on mobile
                                                if (window.innerWidth <= 768) {
                                                    closeMobileSidebar();
                                                }
                                            }

                                            function renderHistoryList() {
                                                if (!historyList) return;

                                                if (conversations.length === 0) {
                                                    historyList.innerHTML = `<div class="history-empty">No conversations yet</div>`;
                                                    return;
                                                }

                                                historyList.innerHTML = "";

                                                conversations.forEach((conv) => {
                                                    const item = document.createElement("div");
                                                    item.className = `history-item ${conv.id === currentConvId ? "active" : ""}`;

                                                    const modeInfo = MODES[conv.mode || "chat"] || MODES.chat;

                                                    item.innerHTML = `
                <span style="font-size: 0.9rem; margin-right: 6px;">${modeInfo.icon}</span>
                <span class="history-item-content" title="${escapeHTML(conv.title)}">${escapeHTML(conv.title)}</span>
                <button class="history-item-del" title="Delete conversation">&times;</button>
            `;

                                                    item.addEventListener("click", () => loadConversationById(conv.id));

                                                    const delBtn = item.querySelector(".history-item-del");
                                                    delBtn.addEventListener("click", (e) => deleteConversation(conv.id, e));

                                                    historyList.appendChild(item);
                                                });
                                            }

                                            function renderCurrentConversation() {
                                                const conv = getConversation(currentConvId);
                                                chat.innerHTML = "";

                                                if (!conv || conv.messages.length === 0) {
                                                    showHeroSection(true);
                                                    return;
                                                }

                                                showHeroSection(false);

                                                conv.messages.forEach((msg) => {
                                                    renderMessageBubble(msg);
                                                });

                                                scrollToBottom();
                                            }

                                            function showHeroSection(show) {
                                                if (hero) hero.style.display = show ? "block" : "none";
                                                if (quickGrid) quickGrid.style.display = show ? "grid" : "none";
                                            }

                                            /* ==========================================================================
                                               Mode Switching
                                               ========================================================================== */
                                            function switchMode(modeKey, updateCurrentConv = true) {
                                                if (!MODES[modeKey]) return;

                                                currentMode = modeKey;
                                                const config = MODES[modeKey];

                                                // Update active class on nav
                                                navItems.forEach((btn) => {
                                                    if (btn.dataset.mode === modeKey) {
                                                        btn.classList.add("active");
                                                    } else {
                                                        btn.classList.remove("active");
                                                    }
                                                });

                                                // Update Header Titles
                                                if (pageTitle) pageTitle.textContent = config.name;
                                                if (eyebrowPill) eyebrowPill.textContent = config.eyebrow;
                                                if (modePill) modePill.textContent = config.pill;

                                                // Update Hero
                                                if (heroTitle) heroTitle.innerHTML = config.heroTitle;
                                                if (heroDesc) heroDesc.textContent = config.heroDesc;

                                                // Update Textarea Placeholder
                                                if (promptBox) promptBox.placeholder = config.placeholder;

                                                // Render Quick Cards
                                                renderQuickCards(config.quickCards);

                                                // Render Suggestion Chips
                                                renderSuggestionChips(config.chips);

                                                // Update conversation mode if empty
                                                if (updateCurrentConv && currentConvId) {
                                                    const conv = getConversation(currentConvId);
                                                    if (conv && conv.messages.length === 0) {
                                                        conv.mode = modeKey;
                                                        saveConversations();
                                                    }
                                                }
                                            }

                                            function renderQuickCards(cards) {
                                                if (!quickGrid) return;
                                                quickGrid.innerHTML = "";

                                                cards.forEach((card) => {
                                                    const cardEl = document.createElement("div");
                                                    cardEl.className = "quick-card";
                                                    cardEl.innerHTML = `
                <span class="quick-card-icon">${card.icon}</span>
                <strong>${escapeHTML(card.title)}</strong>
                <small>${escapeHTML(card.desc)}</small>
            `;
                                                    cardEl.addEventListener("click", () => {
                                                        promptBox.value = card.prompt;
                                                        autoResizeTextarea();
                                                        promptBox.focus();
                                                    });
                                                    quickGrid.appendChild(cardEl);
                                                });
                                            }

                                            function renderSuggestionChips(chips) {
                                                if (!composerSuggestions) return;
                                                composerSuggestions.innerHTML = "";

                                                chips.forEach((chipText) => {
                                                    const chip = document.createElement("button");
                                                    chip.type = "button";
                                                    chip.className = "suggestion-chip";
                                                    chip.innerHTML = `<span>✦</span><span>${escapeHTML(chipText)}</span>`;
                                                    chip.addEventListener("click", () => {
                                                        const currentVal = promptBox.value.trim();
                                                        promptBox.value = currentVal ? `${currentVal} (${chipText})` : `${chipText}: `;
                                                        autoResizeTextarea();
                                                        promptBox.focus();
                                                    });
                                                    composerSuggestions.appendChild(chip);
                                                });
                                            }

                                            /* ==========================================================================
                                               Message Rendering & Widgets
                                               ========================================================================== */
                                            function renderMessageBubble(msg) {
                                                const wrapper = document.createElement("div");
                                                wrapper.className = `message-wrapper ${msg.role}`;

                                                const isUser = msg.role === "user";
                                                const avatar = isUser ? "👤" : "✦";
                                                const sender = isUser ? "You" : "LifeLens AI";
                                                const timeFormatted = msg.time || new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

                                                let fileBadgeHtml = "";
                                                if (msg.file) {
                                                    fileBadgeHtml = `
                <div class="attached-tag-badge">
                    <span>📎</span>
                    <span>${escapeHTML(msg.file.name)}</span>
                </div>
            `;
                                                }

                                                const parsedContent = isUser ? escapeHTML(msg.text) : renderMarkdown(msg.text);

                                                wrapper.innerHTML = `
            <div class="message-avatar">${avatar}</div>
            <div class="message-bubble-wrap">
                <div class="message-header">
                    <span class="sender-name">${sender}</span>
                    <span class="message-time">${timeFormatted}</span>
                </div>
                <div class="message">
                    ${fileBadgeHtml}
                    <div class="message-body">${parsedContent}</div>
                </div>
                ${!isUser ? `
                    <div class="message-actions">
                        <button type="button" class="msg-action-btn copy-msg-btn" title="Copy response">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                            <span>Copy</span>
                        </button>
                        <button type="button" class="msg-action-btn speak-msg-btn" title="Read aloud">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
                            <span>Speak</span>
                        </button>
                    </div>
                ` : ""}
            </div>
        `;

                                                chat.appendChild(wrapper);

                                                // Bind interactive events within the new message
                                                bindInteractiveWidgets(wrapper, msg);
                                            }

                                            function bindInteractiveWidgets(container, msg) {
                                                // 1. Copy button
                                                const copyBtn = container.querySelector(".copy-msg-btn");
                                                if (copyBtn) {
                                                    copyBtn.addEventListener("click", () => {
                                                        navigator.clipboard.writeText(msg.text).then(() => {
                                                            showToast("Response copied to clipboard", "success");
                                                        });
                                                    });
                                                }

                                                // 2. Speak button
                                                const speakBtn = container.querySelector(".speak-msg-btn");
                                                if (speakBtn) {
                                                    speakBtn.addEventListener("click", () => {
                                                        speakText(msg.text, speakBtn);
                                                    });
                                                }

                                                // 3. Code block copy buttons
                                                container.querySelectorAll(".copy-code-btn").forEach((btn) => {
                                                    btn.addEventListener("click", () => {
                                                        const pre = btn.closest(".code-block-container").querySelector("pre code");
                                                        if (pre) {
                                                            navigator.clipboard.writeText(pre.innerText).then(() => {
                                                                const original = btn.innerHTML;
                                                                btn.innerHTML = "<span>✓ Copied</span>";
                                                                setTimeout(() => (btn.innerHTML = original), 2000);
                                                            });
                                                        }
                                                    });
                                                });

                                                // 4. Flashcard flip interaction
                                                container.querySelectorAll(".flashcard").forEach((card) => {
                                                    card.addEventListener("click", () => {
                                                        card.classList.toggle("flipped");
                                                        const hint = card.querySelector(".flashcard-hint");
                                                        if (hint) {
                                                            hint.textContent = card.classList.contains("flipped") ? "Click to see front" : "Click to flip card ↺";
                                                        }
                                                    });
                                                });

                                                // 5. Goal milestones checkbox tracking
                                                const trackerCard = container.querySelector(".goal-tracker-card");
                                                if (trackerCard) {
                                                    const checkboxes = trackerCard.querySelectorAll(".goal-checkbox");
                                                    const fillBar = trackerCard.querySelector(".goal-progress-bar-fill");
                                                    const badge = trackerCard.querySelector(".goal-progress-badge");

                                                    function updateProgress() {
                                                        const total = checkboxes.length;
                                                        if (total === 0) return;
                                                        let checkedCount = 0;
                                                        checkboxes.forEach((cb) => {
                                                            const item = cb.closest(".goal-milestone-item");
                                                            if (cb.checked) {
                                                                checkedCount++;
                                                                if (item) item.classList.add("completed");
                                                            } else {
                                                                if (item) item.classList.remove("completed");
                                                            }
                                                        });

                                                        const pct = Math.round((checkedCount / total) * 100);
                                                        if (fillBar) fillBar.style.width = `${pct}%`;
                                                        if (badge) badge.textContent = `${pct}% Done (${checkedCount}/${total})`;
                                                    }

                                                    checkboxes.forEach((cb) => {
                                                        cb.addEventListener("change", updateProgress);
                                                    });

                                                    // Initial calculation
                                                    updateProgress();
                                                }
                                            }

                                            /* ==========================================================================
                                               Message Sending & Dispatching
                                               ========================================================================== */
                                            async function handleSendMessage(text) {
                                                text = text.trim();
                                                if ((!text && !attachedFile) || isGenerating) return;

                                                // Ensure active conversation
                                                if (!currentConvId || !getConversation(currentConvId)) {
                                                    startNewConversation(false);
                                                }

                                                const conv = getConversation(currentConvId);

                                                // Hide Hero
                                                showHeroSection(false);

                                                // Capture attached file if any
                                                const msgFile = attachedFile ? { ...attachedFile } : null;

                                                // Format message object
                                                const userMsg = {
                                                    role: "user",
                                                    text: text || `[Attached: ${msgFile.name}]`,
                                                    file: msgFile,
                                                    time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                                                };

                                                conv.messages.push(userMsg);

                                                // Set conversation title from first message
                                                if (conv.messages.length === 1) {
                                                    conv.title = text ? (text.length > 32 ? text.substring(0, 32) + "..." : text) : msgFile.name;
                                                    conv.mode = currentMode;
                                                }

                                                saveConversations();
                                                renderMessageBubble(userMsg);
                                                scrollToBottom();

                                                // Clear Composer input and attached file
                                                promptBox.value = "";
                                                autoResizeTextarea();
                                                clearAttachedFile();

                                                // Lock and Show Typing Indicator
                                                setGeneratingState(true);

                                                try {
                                                    let aiResponseText = "";

                                                    if (settings.engine === "gemini" && settings.apiKey) {
                                                        aiResponseText = await callGeminiAPI(conv, text, msgFile);
                                                    } else {
                                                        // If user selected Gemini but forgot API key, notify gently
                                                        if (settings.engine === "gemini" && !settings.apiKey) {
                                                            showToast("No Gemini API key provided. Using Smart Offline Engine instead.", "info");
                                                        }
                                                        aiResponseText = await generateOfflineResponse(currentMode, text, msgFile);
                                                    }

                                                    // Simulate slight natural typewriter cadence for offline or render stream
                                                    await streamResponse(aiResponseText, conv);
                                                } catch (error) {
                                                    console.error("AI Generation Error:", error);
                                                    const errorMsg = {
                                                        role: "ai",
                                                        text: `⚠️ **Generation Notice**: ${error.message || "An unexpected error occurred while processing your request. Please try again or switch to the Built-in Offline Engine."}`,
                                                        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                                                    };
                                                    conv.messages.push(errorMsg);
                                                    saveConversations();
                                                    renderMessageBubble(errorMsg);
                                                    showToast("Failed to complete response", "error");
                                                } finally {
                                                    setGeneratingState(false);
                                                    scrollToBottom();
                                                }
                                            }

                                            function setGeneratingState(generating) {
                                                isGenerating = generating;
                                                if (sendBtn) sendBtn.disabled = generating;
                                                if (typingIndicator) typingIndicator.style.display = generating ? "flex" : "none";
                                            }

                                            async function streamResponse(fullText, conv) {
                                                setGeneratingState(false);

                                                const aiMsg = {
                                                    role: "ai",
                                                    text: fullText,
                                                    time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                                                };

                                                conv.messages.push(aiMsg);
                                                saveConversations();
                                                renderMessageBubble(aiMsg);
                                                scrollToBottom();

                                                if (settings.speechEffects) {
                                                    playChimeSound();
                                                }
                                            }

                                            /* ==========================================================================
                                               Google Gemini API Integration
                                               ========================================================================== */
                                            async function callGeminiAPI(conv, newPrompt, file) {
                                                const model = settings.model || "gemini-1.5-flash";
                                                const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(settings.apiKey)}`;

                                                // Build system prompt based on mode
                                                const systemInstructions = {
                                                    chat: "You are LifeLens AI, an exceptionally thoughtful, structured, and insightful personal AI companion. Provide clear explanations, well-formatted Markdown with code blocks where helpful, and practical takeaways.",
                                                    summarize: "You are LifeLens AI in Smart Summarize mode. Provide: 1. Executive TL;DR box. 2. 5-7 Key Takeaways with bullet points. 3. Actionable Next Steps. 4. Synthesis metrics (Tone, Estimated reading time). Always use clean Markdown headers.",
                                                    study: "You are LifeLens AI in Study Helper mode. Explain concepts with the Feynman technique. Include at least 2-3 flashcard pairs using this exact format: :::flashcard Front: Question or concept ::: Back: Clear answer or explanation :::. Also include a quick check quiz.",
                                                    ideas: "You are LifeLens AI in Idea Generator mode. Provide 3 high-impact, innovative project or startup ideas. For each idea include: Title, Pitch, Tech Stack/Tools, Feasibility Rating (1 to 5 stars), and a 4-phase execution roadmap.",
                                                    goals: "You are LifeLens AI in Goal Planner mode. Break down the user's goal using SMART criteria. Always include an interactive checkable milestone list using markdown checkboxes `- [ ] Milestone step`. Provide actionable pacing and obstacle strategies.",
                                                    reflection: "You are LifeLens AI in Daily Reflection mode. Provide an empathetic, grounding, stoic or mindful reflection. Include: 1. Perspective Reframing. 2. Gratitude questions. 3. Micro-habit for tomorrow. 4. Calming evening mantra."
                                                };

                                                const systemText = systemInstructions[currentMode] || systemInstructions.chat;

                                                // Build context history
                                                const contents = [];

                                                // Add history up to last 10 messages
                                                const recentMessages = conv.messages.slice(-10);
                                                recentMessages.forEach((m) => {
                                                    contents.push({
                                                        role: m.role === "user" ? "user" : "model",
                                                        parts: [{ text: m.text }]
                                                    });
                                                });

                                                // Add file context if present
                                                let promptWithContext = newPrompt;
                                                if (file && file.content) {
                                                    promptWithContext = `[Attached Document: ${file.name}]\n${file.content}\n\nUser Question/Instruction:\n${newPrompt}`;
                                                }

                                                while (contents.length && contents[0].role !== "user") contents.shift();
                                                if (contents.length && contents[contents.length - 1].role === "user") {
                                                    contents[contents.length - 1].parts = [{ text: promptWithContext }];
                                                } else {
                                                    contents.push({ role: "user", parts: [{ text: promptWithContext }] });
                                                }

                                                const requestBody = {
                                                    contents: contents,
                                                    systemInstruction: {
                                                        parts: [{ text: systemText }]
                                                    },
                                                    generationConfig: {
                                                        temperature: 0.7,
                                                        maxOutputTokens: 2048
                                                    }
                                                };

                                                const response = await fetch(url, {
                                                    method: "POST",
                                                    headers: {
                                                        "Content-Type": "application/json"
                                                    },
                                                    body: JSON.stringify(requestBody)
                                                });

                                                if (!response.ok) {
                                                    const errData = await response.json().catch(() => ({}));
                                                    const errMsg = errData.error?.message || `HTTP ${response.status} ${response.statusText}`;
                                                    throw new Error(`Gemini API Error: ${errMsg}`);
                                                }

                                                const data = await response.json();
                                                const candidate = data.candidates?.[0];
                                                const textResponse = candidate?.content?.parts?.map((p) => p.text).join("") || "No response received from Gemini.";

                                                return textResponse;
                                            }

                                            /* ==========================================================================
                                               Intelligent Offline AI Engine
                                               ========================================================================== */
                                            async function generateOfflineResponse(mode, prompt, file) {
                                                // Simulate brief realistic AI reasoning delay (400 - 800ms)
                                                await new Promise((resolve) => setTimeout(resolve, 600));

                                                const p = (prompt || "").trim();
                                                const lower = p.toLowerCase();
                                                const fileContent = file ? file.content : "";
                                                const combinedText = fileContent ? `${p} ${fileContent}` : p;

                                                switch (mode) {
                                                    case "summarize":
                                                        return generateOfflineSummary(combinedText, file);

                                                    case "study":
                                                        return generateOfflineStudy(combinedText);

                                                    case "ideas":
                                                        return generateOfflineIdeas(combinedText);

                                                    case "goals":
                                                        return generateOfflineGoals(combinedText);

                                                    case "reflection":
                                                        return generateOfflineReflection(combinedText);

                                                    case "chat":
                                                    default:
                                                        return generateOfflineChat(combinedText, lower);
                                                }
                                            }

                                            // --- 1. Offline Summarizer ---
                                            function generateOfflineSummary(text, file) {
                                                const words = text ? text.split(/\s+/).filter(Boolean) : [];
                                                const wordCount = words.length;
                                                const estReadingTime = Math.max(1, Math.ceil(wordCount / 200));

                                                let subject = "Input Material";
                                                if (file) subject = file.name;
                                                else if (text.length > 40) subject = text.substring(0, 35).trim() + "...";

                                                return `### 📄 Smart Executive Synthesis: ${subject}

:::tldr
**Core Takeaway**: ${generateSummaryCore(text)}
:::

#### ⚡ Key Insights & Takeaways
* **Primary Objective**: Clarified fundamental principles and strategic goals for immediate implementation.
* **Structural Cohesion**: Streamlined complex concepts into high-density actionable pillars without sacrificing nuance.
* **Operational Efficiency**: Eliminates redundant overhead, saving an estimated **${Math.max(15, estReadingTime * 3)} minutes** of review time.
* **Risk Mitigation**: Outlined prerequisite requirements to preempt bottlenecks early in execution.

#### 🎯 Recommended Action Items
1. **Validation**: Review baseline milestones against the current team timeline.
2. **Prioritization**: Execute high-leverage immediate wins before secondary enhancements.
3. **Distribution**: Share this synthesized brief with stakeholders to establish alignment.

| Synthesis Metric | Value |
| :--- | :--- |
| **Source Volume** | ~${wordCount || 120} words |
| **Reading Time Saved** | ~${Math.max(3, estReadingTime * 2)} min |
| **Tone & Style** | Analytical, Action-Oriented |
| **Confidence Level** | High (Structured Extraction) |`;
                                            }

                                            function generateSummaryCore(text) {
                                                if (!text || text.length < 20) {
                                                    return "A clear, condensed overview distilling central tenets into high-impact actionable items.";
                                                }
                                                return `Focused analysis of ${text.slice(0, 80).replace(/\n/g, " ")}... prioritizing high-yield outcomes and execution velocity.`;
                                            }

                                            // --- 2. Offline Study Helper ---
                                            function generateOfflineStudy(text) {
                                                const topic = extractKeyTopic(text, "Core Concept Mastery");

                                                return `### 📚 Study & Mastery Guide: ${topic}

> *"If you can't explain it simply, you don't understand it well enough."* — Richard Feynman

#### 🧠 Feynman Breakdown (Explained Simply)
Imagine **${topic}** as a modular LEGO framework. Rather than memorizing isolated rules, understand the root relationship:
* **The Foundation**: Every complex problem breaks down into simple building blocks governed by consistent laws.
* **The Analogy**: Think of it like a railway network—each switch routing data or energy smoothly where it's needed most without traffic bottlenecks.
* **The Pitfall to Avoid**: Don't confuse familiarity with mastery. Always test yourself by recreating the concept without looking at notes.

#### 🃏 Interactive Flashcards (Click to Flip)
:::flashcard Front: What is the core mechanism of ${topic}? ::: Back: It operates on modular logic, systematically balancing input parameters with output performance. :::
:::flashcard Front: Why is ${topic} critical in practice? ::: Back: It reduces friction, enforces predictable outcomes, and scales smoothly under high-demand constraints. :::
:::flashcard Front: What is the most common mistake made when learning ${topic}? ::: Back: Treating symptoms instead of identifying the underlying first-principles root cause. :::

#### 📝 Quick Self-Check Quiz
1. **Question**: Which parameter determines whether ${topic} executes reliably?
   * *Answer*: Consistency in initial constraints and active verification.
2. **Question**: How can you apply active recall to this topic today?
   * *Answer*: Close this window and sketch out the 3 main stages from memory on a blank sheet of paper.`;
                                            }

                                            // --- 3. Offline Idea Generator ---
                                            function generateOfflineIdeas(text) {
                                                const domain = extractKeyTopic(text, "Next-Gen Productivity");

                                                return `### 💡 Innovation Blueprint: ${domain}

Here are 3 high-impact, viable concept angles designed for rapid execution and differentiation:

:::idea
**1. LensFlow — Intelligent Context Orchestrator**
*Rating*: ⭐⭐⭐⭐⭐ (High Feasibility & Demand)
*Tech Stack*: TypeScript, Local Vector Store, Gemini API, Tailwind CSS
*Concept*: An ambient desktop workspace that automatically surfaces relevant past research, snippets, and action tasks based on the active browser tab.
:::

:::idea
**2. PulseSync — Autonomous Habit & Energy Pacer**
*Rating*: ⭐⭐⭐⭐☆ (Medium Feasibility, High Stickiness)
*Tech Stack*: Progressive Web App, Web Audio API, IndexedDB
*Concept*: Dynamic circadian time-blocker that adjusts focus intervals (25m vs 50m) based on subjective cognitive fatigue inputs and biometric cues.
:::

:::idea
**3. MicroScribe — Zero-Latency Research Synthesizer**
*Rating*: ⭐⭐⭐⭐⭐ (Fast MVP Turnaround)
*Tech Stack*: Node.js, Web Scraping, Markdown Engine
*Concept*: A browser extension converting 45-minute YouTube lectures and academic PDFs into 2-minute actionable flashcards and audio summaries.
:::

#### 🗺️ 4-Phase Execution Roadmap
* **Phase 1 (Days 1–5)**: Prototype core MVP loop using vanilla web technologies and local storage.
* **Phase 2 (Days 6–12)**: Solicit feedback from 10 target users; refine friction points in onboarding.
* **Phase 3 (Days 13–20)**: Introduce automated export, keyboard shortcuts, and cloud sync.
* **Phase 4 (Days 21–30)**: Public launch on Product Hunt and GitHub with demo video.`;
                                            }

                                            // --- 4. Offline Goal Planner ---
                                            function generateOfflineGoals(text) {
                                                const goalName = extractKeyTopic(text, "Productivity Milestone");

                                                return `### 🎯 SMART Milestone Blueprint: ${goalName}

#### 📋 Goal Criteria Breakdown
* **Specific**: Transform abstract ambitions into daily measurable actions.
* **Measurable**: Track quantitative milestones from 0% to 100% completion.
* **Achievable**: Chunked into 4 focused sprint stages to maintain momentum.
* **Relevant**: Aligns directly with personal growth and high-leverage outcomes.
* **Time-Bound**: Structured for tangible completion within a 30-day window.

:::goals
**Sprint Tracker: ${goalName}**
- [ ] Phase 1: Define baseline metrics and eliminate top 2 environmental distractions
- [ ] Phase 2: Establish dedicated daily 45-minute deep work focus block
- [ ] Phase 3: Complete first prototype / mid-point review checklist
- [ ] Phase 4: Stress-test consistency across 7 consecutive days
- [ ] Phase 5: Final review, metric evaluation, and celebrating the milestone win
:::

#### 🛡️ Anti-Procrastination Strategy
* **The 2-Minute Rule**: If friction arises, commit to only starting for 120 seconds.
* **Pre-Commitment**: Prepare tomorrow's workspace tonight to eliminate decision fatigue.`;
                                            }

                                            // --- 5. Offline Daily Reflection ---
                                            function generateOfflineReflection(text) {
                                                return `### 🧘 Mindful Daily Calibration

> *"You have power over your mind — not outside events. Realize this, and you will find strength."* — Marcus Aurelius

#### 🌿 Perspective Reframe
Take a slow, deep breath. Whatever happened today:
* **The Good**: Acknowledge your small wins—showing up consistently counts far more than chaotic perfection.
* **The Challenge**: View friction not as an obstacle, but as the raw material that strengthens your mental resilience.

#### 🌟 3 Guided Prompts For Tonight
1. **What is one thing that went better than expected today?**
2. **What energy drain can you choose not to carry into tomorrow?**
3. **Who is someone whose presence or work made your day easier?**

#### 🌙 Micro-Habit For Tomorrow Morning
* Place a tall glass of water beside your desk tonight.
* Spend the first 10 minutes tomorrow offline before opening notifications or emails.

**Closing Mantra**: *"I release today's unfinished work with peace. Tomorrow brings fresh clarity and quiet focus."*`;
                                            }

                                            // --- 6. Offline AI Assistant (Conversational & Coding) ---
                                            function generateOfflineChat(text, lower) {
                                                // Greetings
                                                if (/^(hi|hello|hey|greetings|hola)\b/.test(lower)) {
                                                    return `Hello! 👋 I'm **LifeLens AI**, your intelligent personal OS and productivity companion.

Here are a few ways we can work together right now:
* 💬 **Reasoning & Problem Solving**: Ask me complex questions or explore ideas.
* 📄 **Smart Summarize**: Paste long texts, PDFs, or articles for an instant TL;DR and action items.
* 📚 **Study Helper**: Learn any subject using the Feynman technique and interactive flashcards.
* 💡 **Idea Generator**: Brainstorm innovative software, business, and creative concepts.
* 🎯 **Goal Planner**: Break any ambitious project into checkable milestones.

How can I help you excel today?`;
                                                }

                                                // Code Requests
                                                if (lower.includes("code") || lower.includes("javascript") || lower.includes("python") || lower.includes("function") || lower.includes("html") || lower.includes("css")) {
                                                    return `Here is a clean, robust implementation tailored for modern web applications:

\`\`\`javascript
/**
 * LifeLens Utility: High-performance Async Debounce with Cancellation
 * @param {Function} fn - The callback to execute after the delay
 * @param {number} delayMs - Delay in milliseconds
 */
function createDebouncedTask(fn, delayMs = 300) {
    let timerId = null;

    const debounced = (...args) => {
        if (timerId) clearTimeout(timerId);
        return new Promise((resolve) => {
            timerId = setTimeout(async () => {
                const result = await fn(...args);
                resolve(result);
            }, delayMs);
        });
    };

    debounced.cancel = () => {
        if (timerId) {
            clearTimeout(timerId);
            timerId = null;
        }
    };

    return debounced;
}

// Example Usage:
const searchEndpoint = createDebouncedTask(async (query) => {
    console.log("Executing search for:", query);
    return { status: 200, query };
}, 400);

searchEndpoint("LifeLens AI");
\`\`\`

#### Key Architecture Points:
1. **Memory Safety**: Prevents hanging timers via the `.cancel()` method.
2. **Promise-Driven**: Resolves asynchronously so you can \`await\` the eventual execution.
3. **Zero Dependencies**: Pure vanilla JavaScript with minimal overhead.`;
                                                }

                                                // Questions / Knowledge
                                                const topic = extractKeyTopic(text, "Your Inquiry");
                                                return `### Comprehensive Breakdown: ${topic}

Thank you for bringing this up. When approaching **${topic}**, it helps to analyze it across three key dimensions:

#### 1. Core Principles & Context
At its foundation, success in this area relies on **clarity of constraints** and **consistent feedback loops**. Rather than tackling everything at once, isolate the highest-leverage variables first.

#### 2. Actionable Implementation Steps
* **Step 1 — Baseline Diagnostic**: Measure your starting parameters before changing workflows.
* **Step 2 — Incremental Refactoring**: Apply small 1% improvements to prevent friction and overwhelm.
* **Step 3 — Active Review**: Check progress against clear checkpoints every 48 hours.

#### 3. Proactive Insights
> **Key Rule of Thumb**: Focus on systems rather than brute-force willpower. When the environment is calibrated properly, high performance becomes the path of least resistance.

Feel free to ask for code samples, a step-by-step goal plan, or a study breakdown on this!`;
                                            }

                                            function extractKeyTopic(text, fallback) {
                                                if (!text) return fallback;
                                                const cleaned = text.replace(/^(can you|please|help me|explain|how to|write|create|plan|summarize)\s+/i, "").trim();
                                                if (cleaned.length < 3) return fallback;
                                                const firstSentence = cleaned.split(/[.?!\n]/)[0];
                                                return firstSentence.length > 40 ? firstSentence.substring(0, 38) + "..." : firstSentence;
                                            }

                                            /* ==========================================================================
                                               Custom Markdown & Widget Parser
                                               ========================================================================== */
                                            function renderMarkdown(md) {
                                                if (!md) return "";
                                                const stash = [];
                                                const hold = (kind, h) => "\u0001" + kind + (stash.push(h) - 1) + "\u0001";
                                                const inline = (s) => {
                                                    s = s.replace(/`([^`]+)`/g, (_, c) => hold("c", `<code>${c}</code>`));
                                                    s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
                                                    return s.replace(/(^|[^*])\*([^*\n]+)\*/g, "$1<em>$2</em>");
                                                };
                                                let html = escapeHTML(md);

                                                // Code blocks (stashed so later markdown rules can't mangle them)
                                                html = html.replace(/```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g, (_, lang, code) =>
                                                    hold("b", `<div class="code-block-container"><div class="code-block-header"><span>${lang ? lang.toUpperCase() : "CODE"}</span><button type="button" class="copy-code-btn" title="Copy code snippet"><span>Copy</span></button></div><pre><code>${code.trim()}</code></pre></div>`));

                                                // Flashcards
                                                html = html.replace(/:::flashcard Front:\s*([\s\S]*?)\s*:::\s*Back:\s*([\s\S]*?)\s*:::/g, (_, f, b) =>
                                                    hold("f", `<div class="flashcard"><div class="flashcard-badge"><span>Flashcard</span><span class="flashcard-hint">Click to flip ↺</span></div><div class="flashcard-content">${inline(f.trim())}</div><div class="flashcard-back">${inline(b.trim())}</div></div>`));
                                                html = html.replace(/(?:\u0001f\d+\u0001\s*)+/g, (m) => hold("b", `<div class="flashcards-container">${m.trim()}</div>`));

                                                // Goal tracker
                                                html = html.replace(/:::goals\s*([\s\S]*?)\s*:::/g, (_, content) => {
                                                    let title = "Milestone Checklist", items = "";
                                                    content.trim().split("\n").forEach((line) => {
                                                        line = line.trim();
                                                        if (line.startsWith("**") && line.endsWith("**")) title = line.replace(/\*\*/g, "");
                                                        else if (/^- \[[ x]\]/.test(line)) {
                                                            const on = line.startsWith("- [x]");
                                                            items += `<label class="goal-milestone-item"><input type="checkbox" class="goal-checkbox" ${on ? "checked" : ""}><span class="goal-milestone-text">${inline(line.replace(/^- \[[ x]\]\s*/, ""))}</span></label>`;
                                                        }
                                                    });
                                                    return hold("b", `<div class="goal-tracker-card"><div class="goal-header"><span class="goal-title">${title}</span><span class="goal-progress-badge">0% Done</span></div><div class="goal-progress-bar-wrap"><div class="goal-progress-bar-fill"></div></div><div class="goal-milestones-list">${items}</div></div>`);
                                                });

                                                // TL;DR box
                                                html = html.replace(/:::tldr\s*([\s\S]*?)\s*:::/g, (_, c) =>
                                                    hold("b", `<div class="summary-tldr-box"><div class="summary-tldr-header"><span>✦</span><span>Executive Summary (TL;DR)</span></div><p style="margin: 0; font-size: 0.95rem;">${inline(c.trim())}</p></div>`));

                                                // Idea cards
                                                html = html.replace(/:::idea\s*([\s\S]*?)\s*:::/g, (_, content) => {
                                                    let title = "Concept", rating = "⭐⭐⭐⭐☆", stack = "", desc = "";
                                                    content.trim().split("\n").forEach((line) => {
                                                        line = line.trim();
                                                        const low = line.toLowerCase();
                                                        if (line.startsWith("**") && line.endsWith("**")) title = line.replace(/\*\*/g, "");
                                                        else if (low.startsWith("*rating*:")) rating = line.replace(/\*rating\*:\s*/i, "");
                                                        else if (low.startsWith("*tech stack*:")) stack = line.replace(/\*tech stack\*:\s*/i, "");
                                                        else if (low.startsWith("*concept*:")) desc = line.replace(/\*concept\*:\s*/i, "");
                                                        else if (line) desc += " " + line;
                                                    });
                                                    return hold("i", `<div class="idea-card"><div class="idea-card-header"><span class="idea-title">${title}</span><span class="idea-rating">${rating}</span></div>${stack ? `<span class="idea-stack-tag">${stack}</span>` : ""}<p class="idea-desc">${inline(desc.trim())}</p></div>`);
                                                });
                                                html = html.replace(/(?:\u0001i\d+\u0001\s*)+/g, (m) => hold("b", `<div class="ideas-grid">${m.trim()}</div>`));

                                                // Block-level pass
                                                const out = [];
                                                let para = [], list = null, quote = [], table = [];
                                                const flush = () => {
                                                    if (para.length) out.push(`<p>${para.join("<br>")}</p>`);
                                                    if (list) out.push(`<${list.t}>${list.items.map((i) => `<li>${i.h}${i.sub.length ? `<ul>${i.sub.map((s) => `<li>${s}</li>`).join("")}</ul>` : ""}</li>`).join("")}</${list.t}>`);
                                                    if (quote.length) out.push(`<blockquote>${quote.join("<br>")}</blockquote>`);
                                                    if (table.length) {
                                                        const rows = table.filter((r) => !/^\|[\s:|-]+\|$/.test(r)).map((r) => r.slice(1, -1).split("|").map((c) => inline(c.trim())));
                                                        const [head, ...body] = rows;
                                                        out.push(`<div class="table-wrapper"><table><thead><tr>${head.map((c) => `<th>${c}</th>`).join("")}</tr></thead><tbody>${body.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`);
                                                    }
                                                    para = []; list = null; quote = []; table = [];
                                                };

                                                html.split("\n").forEach((raw) => {
                                                    const t = raw.trim();
                                                    let m;
                                                    if (!t) return flush();
                                                    if (/^\u0001[a-z]\d+\u0001$/.test(t)) { flush(); return out.push(t); }
                                                    if ((m = t.match(/^(#{1,3})\s+(.*)$/))) { flush(); return out.push(`<h${m[1].length}>${inline(m[2])}</h${m[1].length}>`); }
                                                    if (/^-{3,}$/.test(t)) { flush(); return out.push("<hr>"); }
                                                    if ((m = t.match(/^&gt;\s?(.*)$/))) { if (!quote.length) flush(); return quote.push(inline(m[1])); }
                                                    if (t.startsWith("|") && t.endsWith("|")) { if (!table.length) flush(); return table.push(t); }
                                                    const ul = t.match(/^[-*]\s+(.*)$/), ol = t.match(/^\d+\.\s+(.*)$/);
                                                    if (ul || ol) {
                                                        const type = ol ? "ol" : "ul", text = inline((ul || ol)[1]);
                                                        if (ul && list && list.t === "ol" && /^\s{2,}/.test(raw)) return list.items[list.items.length - 1].sub.push(text);
                                                        if (!list || list.t !== type) { flush(); list = { t: type, items: [] }; }
                                                        return list.items.push({ h: text, sub: [] });
                                                    }
                                                    if (list || quote.length || table.length) flush();
                                                    para.push(inline(t));
                                                });
                                                flush();

                                                let result = out.join("");
                                                for (let i = 0; i < 4 && /\u0001/.test(result); i++) {
                                                    result = result.replace(/\u0001[a-z](\d+)\u0001/g, (_, n) => stash[n]);
                                                }
                                                return result;
                                            }

                                            function escapeHTML(str) {
                                                if (!str) return "";
                                                return str
                                                    .replace(/&/g, "&amp;")
                                                    .replace(/</g, "&lt;")
                                                    .replace(/>/g, "&gt;")
                                                    .replace(/"/g, "&quot;")
                                                    .replace(/'/g, "&#039;");
                                            }

                                            /* ==========================================================================
                                               Speech & Audio Support
                                               ========================================================================== */
                                            function setupSpeechRecognition() {
                                                const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
                                                if (!SpeechRecognition) {
                                                    if (micBtn) micBtn.title = "Voice recognition not supported in this browser";
                                                    return;
                                                }

                                                speechRecognition = new SpeechRecognition();
                                                speechRecognition.continuous = false;
                                                speechRecognition.interimResults = true;
                                                speechRecognition.lang = "en-US";

                                                speechRecognition.onstart = function () {
                                                    isListening = true;
                                                    if (micBtn) micBtn.classList.add("active");
                                                    showToast("Listening... Speak clearly into your mic", "info");
                                                };

                                                speechRecognition.onresult = function (event) {
                                                    let transcript = "";
                                                    for (let i = event.resultIndex; i < event.results.length; i++) {
                                                        transcript += event.results[i][0].transcript;
                                                    }
                                                    if (transcript) {
                                                        promptBox.value = transcript;
                                                        autoResizeTextarea();
                                                    }
                                                };

                                                speechRecognition.onerror = function (event) {
                                                    console.warn("Speech recognition error:", event.error);
                                                    isListening = false;
                                                    if (micBtn) micBtn.classList.remove("active");
                                                    showToast(`Voice Error: ${event.error}`, "error");
                                                };

                                                speechRecognition.onend = function () {
                                                    isListening = false;
                                                    if (micBtn) micBtn.classList.remove("active");
                                                };
                                            }

                                            function toggleMic() {
                                                if (!speechRecognition) {
                                                    showToast("Voice recognition is not supported in this browser", "error");
                                                    return;
                                                }

                                                if (isListening) {
                                                    speechRecognition.stop();
                                                } else {
                                                    try {
                                                        speechRecognition.start();
                                                    } catch (e) {
                                                        speechRecognition.stop();
                                                    }
                                                }
                                            }

                                            function speakText(text, buttonElement) {
                                                if (!synth) {
                                                    showToast("Text-to-speech not supported in this browser", "error");
                                                    return;
                                                }

                                                if (synth.speaking) {
                                                    synth.cancel();
                                                    if (buttonElement) {
                                                        const label = buttonElement.querySelector("span");
                                                        if (label) label.textContent = "Speak";
                                                    }
                                                    return;
                                                }

                                                // Clean markdown symbols for natural speech
                                                const cleanSpeech = text
                                                    .replace(/```[\s\S]*?```/g, "Code block omitted.")
                                                    .replace(/`([^`]+)`/g, "$1")
                                                    .replace(/[#*_~>\[\]\(\)]/g, "")
                                                    .replace(/:::[^:]*:::/g, "");

                                                const utterance = new SpeechSynthesisUtterance(cleanSpeech);
                                                utterance.rate = 1.0;
                                                utterance.pitch = 1.0;

                                                if (buttonElement) {
                                                    const label = buttonElement.querySelector("span");
                                                    if (label) label.textContent = "Stop";
                                                }

                                                utterance.onend = function () {
                                                    if (buttonElement) {
                                                        const label = buttonElement.querySelector("span");
                                                        if (label) label.textContent = "Speak";
                                                    }
                                                };

                                                utterance.onerror = function () {
                                                    if (buttonElement) {
                                                        const label = buttonElement.querySelector("span");
                                                        if (label) label.textContent = "Speak";
                                                    }
                                                };

                                                synth.speak(utterance);
                                            }

                                            function playChimeSound() {
                                                try {
                                                    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                                                    const osc = audioCtx.createOscillator();
                                                    const gain = audioCtx.createGain();

                                                    osc.type = "sine";
                                                    osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
                                                    osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.15); // A5

                                                    gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
                                                    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.25);

                                                    osc.connect(gain);
                                                    gain.connect(audioCtx.destination);

                                                    osc.start();
                                                    osc.stop(audioCtx.currentTime + 0.25);
                                                } catch (e) {
                                                    // Audio context blocked or unsupported
                                                }
                                            }

                                            /* ==========================================================================
                                               File Attachment Handling
                                               ========================================================================== */
                                            function handleFileSelected(file) {
                                                if (!file) return;

                                                // Size check (max 5MB)
                                                if (file.size > 5 * 1024 * 1024) {
                                                    showToast("File is too large. Max size is 5MB.", "error");
                                                    return;
                                                }

                                                const reader = new FileReader();
                                                reader.onload = function (e) {
                                                    attachedFile = {
                                                        name: file.name,
                                                        size: file.size,
                                                        content: e.target.result
                                                    };

                                                    if (attachedFileName) {
                                                        const formattedSize = file.size > 1024 ? `${Math.round(file.size / 1024)} KB` : `${file.size} B`;
                                                        attachedFileName.textContent = `${file.name} (${formattedSize})`;
                                                    }

                                                    if (filePreviewStrip) filePreviewStrip.style.display = "block";
                                                    showToast(`Attached: ${file.name}`, "success");
                                                };

                                                reader.onerror = function () {
                                                    showToast("Failed to read attached file", "error");
                                                };

                                                reader.readAsText(file);
                                            }

                                            function clearAttachedFile() {
                                                attachedFile = null;
                                                if (fileInput) fileInput.value = "";
                                                if (filePreviewStrip) filePreviewStrip.style.display = "none";
                                            }

                                            /* ==========================================================================
                                               Export Conversation
                                               ========================================================================== */
                                            function exportConversation(format) {
                                                const conv = getConversation(currentConvId);
                                                if (!conv || conv.messages.length === 0) {
                                                    showToast("No messages in current conversation to export", "info");
                                                    closeModal(exportModal);
                                                    return;
                                                }

                                                const safeTitle = conv.title.replace(/[^a-zA-Z0-9_-]/g, "_").toLowerCase();
                                                const dateStr = new Date().toISOString().slice(0, 10);
                                                let content = "";
                                                let mime = "text/plain";
                                                let ext = ".txt";

                                                if (format === "markdown") {
                                                    ext = ".md";
                                                    mime = "text/markdown";
                                                    content = `# ${conv.title}\n*Mode: ${conv.mode || "chat"} | Exported on: ${new Date().toLocaleString()}*\n\n---\n\n`;

                                                    conv.messages.forEach((m) => {
                                                        const roleName = m.role === "user" ? "You" : "LifeLens AI";
                                                        content += `### ${roleName} (${m.time || ""})\n\n${m.text}\n\n---\n\n`;
                                                    });
                                                } else if (format === "json") {
                                                    ext = ".json";
                                                    mime = "application/json";
                                                    content = JSON.stringify(conv, null, 2);
                                                } else {
                                                    // Plain text
                                                    ext = ".txt";
                                                    mime = "text/plain";
                                                    content = `LIFELENS AI CONVERSATION TRANSCRIPT\nTitle: ${conv.title}\nDate: ${new Date().toLocaleString()}\n\n========================================\n\n`;

                                                    conv.messages.forEach((m) => {
                                                        const roleName = m.role === "user" ? "YOU" : "LIFELENS AI";
                                                        content += `[${m.time || ""}] ${roleName}:\n${m.text}\n\n----------------------------------------\n\n`;
                                                    });
                                                }

                                                const blob = new Blob([content], { type: mime });
                                                const downloadUrl = URL.createObjectURL(blob);
                                                const a = document.createElement("a");
                                                a.href = downloadUrl;
                                                a.download = `lifelens_${safeTitle}_${dateStr}${ext}`;
                                                document.body.appendChild(a);
                                                a.click();
                                                document.body.removeChild(a);
                                                URL.revokeObjectURL(downloadUrl);

                                                showToast(`Exported as ${ext.toUpperCase()}`, "success");
                                                closeModal(exportModal);
                                            }

                                            /* ==========================================================================
                                               UI Modals, Toasts & Utilities
                                               ========================================================================== */
                                            function openModal(modalEl) {
                                                if (!modalEl) return;
                                                modalEl.style.display = "flex";
                                            }

                                            function closeModal(modalEl) {
                                                if (!modalEl) return;
                                                modalEl.style.display = "none";
                                            }

                                            function showToast(message, type = "info") {
                                                if (!toastContainer) return;

                                                const toast = document.createElement("div");
                                                toast.className = `toast ${type}`;

                                                const icon = type === "success" ? "✓" : type === "error" ? "⚠️" : "✦";

                                                toast.innerHTML = `
            <span class="toast-icon">${icon}</span>
            <span class="toast-text">${escapeHTML(message)}</span>
        `;

                                                toastContainer.appendChild(toast);

                                                setTimeout(() => {
                                                    toast.classList.add("toast-fadeout");
                                                    setTimeout(() => {
                                                        if (toast.parentNode) toast.parentNode.removeChild(toast);
                                                    }, 300);
                                                }, 3200);
                                            }

                                            function autoResizeTextarea() {
                                                if (!promptBox) return;
                                                promptBox.style.height = "auto";
                                                promptBox.style.height = Math.min(promptBox.scrollHeight, 160) + "px";
                                            }

                                            function scrollToBottom() {
                                                if (contentArea) {
                                                    contentArea.scrollTop = contentArea.scrollHeight;
                                                }
                                                window.scrollTo({
                                                    top: document.body.scrollHeight,
                                                    behavior: "smooth"
                                                });
                                            }

                                            function toggleMobileSidebar() {
                                                if (!sidebar) return;
                                                sidebar.classList.toggle("open");
                                                if (sidebarBackdrop) {
                                                    sidebarBackdrop.classList.toggle("active", sidebar.classList.contains("open"));
                                                }
                                            }

                                            function closeMobileSidebar() {
                                                if (!sidebar) return;
                                                sidebar.classList.remove("open");
                                                if (sidebarBackdrop) sidebarBackdrop.classList.remove("active");
                                            }

                                            /* ==========================================================================
                                               Event Listeners
                                               ========================================================================== */
                                            function setupEventListeners() {
                                                // Composer Form Submit
                                                composer.addEventListener("submit", function (e) {
                                                    e.preventDefault();
                                                    handleSendMessage(promptBox.value);
                                                });

                                                // Prompt Textarea Keyboard & Resize
                                                promptBox.addEventListener("input", autoResizeTextarea);
                                                promptBox.addEventListener("keydown", function (e) {
                                                    if (e.key === "Enter" && !e.shiftKey) {
                                                        e.preventDefault();
                                                        handleSendMessage(promptBox.value);
                                                    }
                                                });

                                                // Global Keyboard Shortcut (Cmd+K / Ctrl+K for new chat, Esc for modal)
                                                document.addEventListener("keydown", function (e) {
                                                    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                                                        e.preventDefault();
                                                        startNewConversation(true);
                                                    }
                                                    if (e.key === "Escape") {
                                                        closeModal(settingsModal);
                                                        closeModal(exportModal);
                                                        closeMobileSidebar();
                                                    }
                                                });

                                                // Navigation Mode Switch
                                                navItems.forEach((btn) => {
                                                    btn.addEventListener("click", function () {
                                                        const modeKey = this.dataset.mode;
                                                        switchMode(modeKey, true);
                                                        if (window.innerWidth <= 768) {
                                                            closeMobileSidebar();
                                                        }
                                                    });
                                                });

                                                // New Chat Button
                                                newChatBtn.addEventListener("click", () => startNewConversation(true));

                                                // Clear Current Chat Button
                                                clearBtn.addEventListener("click", () => {
                                                    if (!confirm("Clear messages in this conversation?")) return;
                                                    const conv = getConversation(currentConvId);
                                                    if (conv) {
                                                        conv.messages = [];
                                                        saveConversations();
                                                    }
                                                    chat.innerHTML = "";
                                                    showHeroSection(true);
                                                    showToast("Conversation cleared", "info");
                                                });

                                                // Clear All History Button
                                                clearHistoryBtn.addEventListener("click", clearAllHistory);

                                                // Theme Toggle
                                                themeBtn.addEventListener("click", toggleTheme);

                                                // Mobile Sidebar Controls
                                                if (menuToggleBtn) menuToggleBtn.addEventListener("click", toggleMobileSidebar);
                                                if (mobileCloseBtn) mobileCloseBtn.addEventListener("click", closeMobileSidebar);
                                                if (sidebarBackdrop) sidebarBackdrop.addEventListener("click", closeMobileSidebar);

                                                // Voice Mic Button
                                                if (micBtn) micBtn.addEventListener("click", toggleMic);

                                                // File Attachment
                                                if (attachBtn && fileInput) {
                                                    attachBtn.addEventListener("click", () => fileInput.click());
                                                    fileInput.addEventListener("change", (e) => {
                                                        if (e.target.files && e.target.files[0]) {
                                                            handleFileSelected(e.target.files[0]);
                                                        }
                                                    });
                                                }
                                                if (removeFileBtn) removeFileBtn.addEventListener("click", clearAttachedFile);

                                                // Drag & Drop File Upload on Window
                                                window.addEventListener("dragover", (e) => e.preventDefault());
                                                window.addEventListener("drop", (e) => {
                                                    e.preventDefault();
                                                    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                                                        handleFileSelected(e.dataTransfer.files[0]);
                                                    }
                                                });

                                                // Settings Modal Open / Close
                                                if (settingsBtn) settingsBtn.addEventListener("click", () => openModal(settingsModal));
                                                if (engineStatusBadge) engineStatusBadge.addEventListener("click", () => openModal(settingsModal));
                                                if (closeSettingsModal) closeSettingsModal.addEventListener("click", () => closeModal(settingsModal));
                                                if (cancelSettingsBtn) cancelSettingsBtn.addEventListener("click", () => closeModal(settingsModal));
                                                if (saveSettingsBtn) saveSettingsBtn.addEventListener("click", saveSettings);

                                                // Engine Select in Modal
                                                if (engineSelect) {
                                                    engineSelect.addEventListener("change", function () {
                                                        geminiGroup.style.display = this.value === "gemini" ? "block" : "none";
                                                    });
                                                }

                                                // Toggle API Key Visibility
                                                if (toggleApiKeyVisibility) {
                                                    toggleApiKeyVisibility.addEventListener("click", function () {
                                                        if (apiKeyInput.type === "password") {
                                                            apiKeyInput.type = "text";
                                                            this.textContent = "🙈";
                                                        } else {
                                                            apiKeyInput.type = "password";
                                                            this.textContent = "👁";
                                                        }
                                                    });
                                                }

                                                // Export Modal Open / Close
                                                if (exportBtn) exportBtn.addEventListener("click", () => openModal(exportModal));
                                                if (closeExportModal) closeExportModal.addEventListener("click", () => closeModal(exportModal));

                                                // Export Format Buttons
                                                document.querySelectorAll(".export-choice-btn").forEach((btn) => {
                                                    btn.addEventListener("click", function () {
                                                        const format = this.dataset.format;
                                                        exportConversation(format);
                                                    });
                                                });

                                                // Close modals on overlay backdrop click
                                                [settingsModal, exportModal].forEach((modal) => {
                                                    if (modal) {
                                                        modal.addEventListener("click", function (e) {
                                                            if (e.target === this) closeModal(this);
                                                        });
                                                    }
                                                });
                                            }

                                            /* Start App */
                                            if (document.readyState === "loading") {
                                                document.addEventListener("DOMContentLoaded", init);
                                            } else {
                                                init();
                                            }
                                        })();