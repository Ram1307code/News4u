// Inject styles
const style = document.createElement("style");
style.innerHTML = `
.ai-buttons {
  margin-top: 10px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.ai-btn {
  padding: 6px 10px;
  border: none;
  border-radius: 6px;
  background: #0f172a;
  color: white;
  font-size: 12px;
  cursor: pointer;
  transition: 0.2s;
}

.ai-btn:hover {
  background: #2563eb;
  transform: scale(1.05);
}

.ai-output {
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  background: #f8fafc;
  color: #0f172a;
  font-size: 13px;
  line-height: 1.45;
  white-space: pre-wrap;
}

.ai-output.hidden {
  display: none;
}

.ai-output-title {
  margin: 0 0 6px;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  color: #334155;
}

.ai-output-body {
  margin: 0;
}

.ai-output-error {
  color: #b91c1c;
  font-weight: 600;
}

.ai-video-overlay {
    position: fixed;
    inset: 0;
    z-index: 2147483647;
    background: rgba(2, 6, 23, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(4px);
}

.ai-video-modal {
    width: min(720px, 92vw);
    background: linear-gradient(165deg, #0b1220 0%, #111827 100%);
    border: 1px solid #1f2937;
    border-radius: 16px;
    box-shadow: 0 30px 80px rgba(0, 0, 0, 0.45);
    color: #f8fafc;
    padding: 16px;
    position: relative;
    overflow: hidden;
}

.ai-video-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
}

.ai-video-title {
    margin: 0;
    font-size: 18px;
    font-weight: 700;
    color: #e2e8f0;
}

.ai-video-close {
    border: none;
    border-radius: 8px;
    width: 34px;
    height: 34px;
    font-size: 17px;
    line-height: 1;
    cursor: pointer;
    background: #1f2937;
    color: #f8fafc;
}

.ai-video-close:hover {
    background: #374151;
}

.ai-video-screen {
    position: relative;
    min-height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    border-radius: 12px;
    border: 1px solid #1e293b;
    background: radial-gradient(circle at 20% 20%, rgba(37, 99, 235, 0.25), transparent 45%),
        radial-gradient(circle at 80% 80%, rgba(16, 185, 129, 0.2), transparent 45%),
        #0f172a;
    padding: 20px;
    isolation: isolate;
}

.ai-video-image {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    transform: scale(1);
    transition: opacity 550ms ease, transform 2500ms ease;
}

.ai-video-image.is-visible {
    opacity: 0.88;
    transform: scale(1.08);
}

.ai-video-image-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(2, 6, 23, 0.18) 0%, rgba(2, 6, 23, 0.72) 100%);
}

.ai-video-caption {
    position: relative;
    z-index: 1;
    max-width: 90%;
    padding: 14px 16px;
    border-radius: 12px;
    background: rgba(2, 6, 23, 0.45);
    border: 1px solid rgba(148, 163, 184, 0.3);
    backdrop-filter: blur(3px);
}

.ai-video-slide {
    margin: 0;
    font-size: 22px;
    font-weight: 600;
    line-height: 1.45;
    color: #f1f5f9;
    opacity: 0;
    transform: translateY(8px);
    animation: aiSlideIn 300ms ease forwards;
}

.ai-video-footer {
    margin-top: 12px;
}

.ai-video-progress-track {
    width: 100%;
    height: 8px;
    background: #1f2937;
    border-radius: 999px;
    overflow: hidden;
}

.ai-video-progress-fill {
    width: 0;
    height: 100%;
    background: linear-gradient(90deg, #22d3ee 0%, #3b82f6 100%);
    transition: width 350ms ease;
}

.ai-video-progress-text {
    margin-top: 8px;
    font-size: 12px;
    color: #cbd5e1;
    text-align: right;
}

.ai-video-controls {
    margin-top: 10px;
    display: flex;
    gap: 8px;
}

.ai-video-control-btn {
    border: 1px solid #334155;
    background: #0f172a;
    color: #e2e8f0;
    border-radius: 999px;
    padding: 6px 12px;
    font-size: 12px;
    cursor: pointer;
}

.ai-video-control-btn:hover {
    background: #1e293b;
}

.ai-video-dots {
    margin-top: 10px;
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
}

.ai-video-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #334155;
    opacity: 0.7;
    transition: transform 200ms ease, background 200ms ease;
}

.ai-video-dot.is-active {
    background: #38bdf8;
    transform: scale(1.3);
}

@keyframes aiSlideIn {
    from {
        opacity: 0;
        transform: translateY(8px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
`;
document.head.appendChild(style);

const CACHE_PREFIX = "news4u-ai-cache-v1";
const PROCESS_CACHE_TTL_MS = 24 * 60 * 60 * 1000;
const ASK_CACHE_TTL_MS = 12 * 60 * 60 * 1000;
const inMemoryCache = new Map();
const pendingRequests = new Map();

function normalizeInput(text) {
    return (text || "").trim().replace(/\s+/g, " ");
}

function hashText(input) {
    let hash = 0;
    const text = normalizeInput(input);
    for (let i = 0; i < text.length; i += 1) {
        hash = (hash << 5) - hash + text.charCodeAt(i);
        hash |= 0;
    }
    return Math.abs(hash).toString(36);
}

function getCacheKey(type, rawKey) {
    return `${CACHE_PREFIX}:${type}:${hashText(rawKey)}`;
}

function getFromCache(cacheKey, ttlMs) {
    const memoryValue = inMemoryCache.get(cacheKey);
    if (memoryValue && Date.now() - memoryValue.timestamp < ttlMs) {
        return memoryValue.value;
    }

    try {
        const serialized = localStorage.getItem(cacheKey);
        if (!serialized) return null;

        const parsed = JSON.parse(serialized);
        if (!parsed || Date.now() - parsed.timestamp > ttlMs) {
            localStorage.removeItem(cacheKey);
            return null;
        }

        inMemoryCache.set(cacheKey, parsed);
        return parsed.value;
    } catch {
        return null;
    }
}

function setToCache(cacheKey, value) {
    const payload = {
        timestamp: Date.now(),
        value
    };

    inMemoryCache.set(cacheKey, payload);
    try {
        localStorage.setItem(cacheKey, JSON.stringify(payload));
    } catch {
        // Ignore storage quota or browser restrictions and keep in-memory cache only.
    }
}

async function fetchProcessData(text) {
    const newsText = normalizeInput(text).slice(0, 1200);
    const cacheKey = getCacheKey("process", newsText);
    const cached = getFromCache(cacheKey, PROCESS_CACHE_TTL_MS);

    if (cached) {
        return { data: cached, fromCache: true };
    }

    if (pendingRequests.has(cacheKey)) {
        const sharedData = await pendingRequests.get(cacheKey);
        return { data: sharedData, fromCache: true };
    }

    const requestPromise = (async () => {
        const res = await fetch("http://localhost:3000/process", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                text: newsText
            })
        });

        const responseBody = await res.json();
        if (!res.ok) {
            throw new Error(responseBody.error || "Failed to process news");
        }

        setToCache(cacheKey, responseBody);
        return responseBody;
    })();

    pendingRequests.set(cacheKey, requestPromise);
    try {
        const freshData = await requestPromise;
        return { data: freshData, fromCache: false };
    } finally {
        pendingRequests.delete(cacheKey);
    }
}

async function fetchAskData(question, context) {
    const normalizedQuestion = normalizeInput(question);
    const normalizedContext = normalizeInput(context).slice(0, 1000);
    const askKey = `${normalizedQuestion}::${normalizedContext}`;
    const cacheKey = getCacheKey("ask", askKey);
    const cached = getFromCache(cacheKey, ASK_CACHE_TTL_MS);

    if (cached) {
        return { data: cached, fromCache: true };
    }

    if (pendingRequests.has(cacheKey)) {
        const sharedData = await pendingRequests.get(cacheKey);
        return { data: sharedData, fromCache: true };
    }

    const requestPromise = (async () => {
        const res = await fetch("http://localhost:3000/ask", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                question: normalizedQuestion,
                context: normalizedContext
            })
        });

        const responseBody = await res.json();
        if (!res.ok) {
            throw new Error(responseBody.error || "Failed to get Ask AI response");
        }

        setToCache(cacheKey, responseBody);
        return responseBody;
    })();

    pendingRequests.set(cacheKey, requestPromise);
    try {
        const freshData = await requestPromise;
        return { data: freshData, fromCache: false };
    } finally {
        pendingRequests.delete(cacheKey);
    }
}


// Main function to inject buttons
function addButtonsToNews() {
    const newsCards = document.querySelectorAll("div.eachStory");

    newsCards.forEach((card) => {
        // prevent duplicate buttons
        if (card.querySelector(".ai-buttons")) return;

        // create container
        const buttonContainer = document.createElement("div");
        buttonContainer.className = "ai-buttons";

        const outputContainer = document.createElement("div");
        outputContainer.className = "ai-output hidden";
        outputContainer.innerHTML = `
      <p class="ai-output-title">AI Output</p>
      <div class="ai-output-body"></div>
    `;

        // buttons UI
        buttonContainer.innerHTML = `
      <button class="ai-btn summary">🧠 Summary</button>
      <button class="ai-btn video">🎥 Video</button>
      <button class="ai-btn graph">📊 Graph</button>
      <button class="ai-btn ask">💬 Ask AI</button>
    `;

        // append to card
        card.appendChild(buttonContainer);
        card.appendChild(outputContainer);

        // extract text for this card
        const text = card.innerText;

        // Button click handlers
        buttonContainer.querySelector(".summary").onclick = () => {
            handleAction("summary", text, outputContainer);
        };

        buttonContainer.querySelector(".video").onclick = () => {
            handleAction("video", text, outputContainer);
        };

        buttonContainer.querySelector(".graph").onclick = () => {
            handleAction("graph", text, outputContainer);
        };

        buttonContainer.querySelector(".ask").onclick = () => {
            const question = prompt("Ask anything about this news:");
            if (question) handleAction("ask", text, outputContainer, question);
        };
    });
}


function setOutput(outputContainer, title, content, isError = false) {
    const titleEl = outputContainer.querySelector(".ai-output-title");
    const bodyEl = outputContainer.querySelector(".ai-output-body");

    titleEl.textContent = title;
    bodyEl.textContent = content;
    bodyEl.className = isError ? "ai-output-body ai-output-error" : "ai-output-body";
    outputContainer.classList.remove("hidden");
}

function formatGraphData(data) {
    if (!Array.isArray(data)) {
        return JSON.stringify(data, null, 2);
    }

    return data
        .map((item, index) => {
            if (typeof item === "string") return `${index + 1}. ${item}`;
            if (typeof item === "number") return `${index + 1}. ${item}`;
            return `${index + 1}. ${JSON.stringify(item)}`;
        })
        .join("\n");
}

function createVideoSlides(script) {
    return script
        .split(".")
        .map((sentence) => sentence.trim())
        .filter(Boolean)
        .map((sentence) => `${sentence}.`);
}

function getSlideQuery(sentence, index) {
    const stopWords = new Set([
        "the", "and", "for", "with", "that", "this", "from", "have", "were", "been", "their", "about", "into", "after", "before", "against", "between", "because", "while", "when", "where", "which", "what", "would", "could", "should", "they", "them", "there", "then", "than", "also", "over", "under", "around", "today", "news"
    ]);

    const keywords = sentence
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, " ")
        .split(/\s+/)
        .filter((word) => word.length > 3 && !stopWords.has(word))
        .slice(0, 4);

    const query = keywords.length ? keywords.join(",") : "breaking,news,world";
    return `${query},headline,journalism,${index + 1}`;
}

function getSlideImageCandidates(sentence, index) {
    const unsplashQuery = encodeURIComponent(getSlideQuery(sentence, index));

    return [
        `https://source.unsplash.com/featured/1280x720/?${unsplashQuery}`,
        `https://source.unsplash.com/1280x720/?${unsplashQuery}`,
        `https://source.unsplash.com/1600x900/?${unsplashQuery}`
    ];
}

function loadImageWithFallback(imageEl, urls) {
    return new Promise((resolve, reject) => {
        let urlIndex = 0;

        const tryNext = () => {
            if (urlIndex >= urls.length) {
                reject(new Error("Image loading failed"));
                return;
            }

            const nextUrl = urls[urlIndex];
            urlIndex += 1;

            imageEl.onload = () => resolve(nextUrl);
            imageEl.onerror = () => tryNext();
            imageEl.src = nextUrl;
        };

        tryNext();
    });
}

function showVideo(script) {
    if (!script || typeof script !== "string") return;

    const existing = document.querySelector(".ai-video-overlay");
    if (existing) {
        window.speechSynthesis.cancel();
        existing.remove();
    }

    const slides = createVideoSlides(script);
    if (!slides.length) return;

    const overlay = document.createElement("div");
    overlay.className = "ai-video-overlay";

    const modal = document.createElement("div");
    modal.className = "ai-video-modal";
    modal.innerHTML = `
      <div class="ai-video-header">
        <h3 class="ai-video-title">🎬 AI News Video</h3>
        <button class="ai-video-close" aria-label="Close video">❌</button>
      </div>
      <div class="ai-video-screen">
                                <img class="ai-video-image" alt="AI generated visual for the news" />
                                <img class="ai-video-image" alt="AI generated visual for the news" />
                                <div class="ai-video-image-overlay"></div>
                                <div class="ai-video-caption">
                                        <p class="ai-video-slide"></p>
                                </div>
      </div>
      <div class="ai-video-footer">
        <div class="ai-video-progress-track">
          <div class="ai-video-progress-fill"></div>
        </div>
        <div class="ai-video-progress-text"></div>
                <div class="ai-video-dots"></div>
                <div class="ai-video-controls">
                    <button class="ai-video-control-btn" data-role="pause">Pause</button>
                    <button class="ai-video-control-btn" data-role="mute">Mute</button>
                </div>
      </div>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    const slideEl = modal.querySelector(".ai-video-slide");
    const imageEls = Array.from(modal.querySelectorAll(".ai-video-image"));
    const closeBtn = modal.querySelector(".ai-video-close");
    const progressFill = modal.querySelector(".ai-video-progress-fill");
    const progressText = modal.querySelector(".ai-video-progress-text");
    const dotsWrap = modal.querySelector(".ai-video-dots");
    const pauseBtn = modal.querySelector('[data-role="pause"]');
    const muteBtn = modal.querySelector('[data-role="mute"]');

    let currentIndex = 0;
    let slideTimer = null;
    const slideDurationMs = 2500;
    let isPaused = false;
    let isMuted = false;
    let activeImageLayer = 0;
    let renderToken = 0;

    slides.forEach(() => {
        const dot = document.createElement("span");
        dot.className = "ai-video-dot";
        dotsWrap.appendChild(dot);
    });

    const dots = Array.from(dotsWrap.querySelectorAll(".ai-video-dot"));

    const setActiveDot = (index) => {
        dots.forEach((dot, dotIndex) => {
            dot.classList.toggle("is-active", dotIndex === index);
        });
    };

    const renderSlide = (index) => {
        const token = ++renderToken;
        const safeIndex = Math.max(0, Math.min(index, slides.length - 1));
        const currentSentence = slides[safeIndex];
        slideEl.textContent = currentSentence;
        slideEl.style.animation = "none";
        requestAnimationFrame(() => {
            slideEl.style.animation = "aiSlideIn 300ms ease forwards";
        });

        const nextLayer = activeImageLayer === 0 ? 1 : 0;
        const frontImage = imageEls[nextLayer];
        const backImage = imageEls[activeImageLayer];
        const imageCandidates = getSlideImageCandidates(currentSentence, safeIndex);

        loadImageWithFallback(frontImage, imageCandidates)
            .then(() => {
                if (token !== renderToken) return;
                frontImage.classList.add("is-visible");
                backImage.classList.remove("is-visible");
                activeImageLayer = nextLayer;
            })
            .catch(() => {
                if (token !== renderToken) return;
                frontImage.classList.remove("is-visible");
            });

        const percent = ((safeIndex + 1) / slides.length) * 100;
        progressFill.style.width = `${percent}%`;
        progressText.textContent = `Slide ${safeIndex + 1} / ${slides.length}`;
        setActiveDot(safeIndex);
    };

    const startAutoPlay = () => {
        if (slideTimer || slides.length <= 1) return;
        slideTimer = setInterval(() => {
            if (isPaused) return;

            currentIndex += 1;
            if (currentIndex >= slides.length) {
                currentIndex = slides.length - 1;
                clearInterval(slideTimer);
                slideTimer = null;
                return;
            }

            renderSlide(currentIndex);
        }, slideDurationMs);
    };

    const stopAutoPlay = () => {
        if (slideTimer) {
            clearInterval(slideTimer);
            slideTimer = null;
        }
    };

    const cleanup = () => {
        stopAutoPlay();
        window.speechSynthesis.cancel();
        overlay.remove();
    };

    const setPauseState = (paused) => {
        isPaused = paused;
        pauseBtn.textContent = isPaused ? "Resume" : "Pause";

        if (isPaused) {
            window.speechSynthesis.pause();
        } else {
            window.speechSynthesis.resume();
            startAutoPlay();
        }
    };

    const setMuteState = (muted) => {
        isMuted = muted;
        muteBtn.textContent = isMuted ? "Unmute" : "Mute";
        if (isMuted) {
            window.speechSynthesis.pause();
        } else if (!isPaused) {
            window.speechSynthesis.resume();
        }
    };

    closeBtn.addEventListener("click", cleanup);
    overlay.addEventListener("click", (event) => {
        if (event.target === overlay) cleanup();
    });

    pauseBtn.addEventListener("click", () => {
        setPauseState(!isPaused);
    });

    muteBtn.addEventListener("click", () => {
        setMuteState(!isMuted);
    });

    renderSlide(currentIndex);
    startAutoPlay();

    const utterance = new SpeechSynthesisUtterance(script);
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 0.9;

    // Reset any in-progress narration before speaking a new script.
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);

    utterance.onend = () => {
        stopAutoPlay();
    };
}

async function handleAction(type, text, outputContainer, question = "") {
    setOutput(outputContainer, "AI Output", "Generating... Please wait.");

    try {
        if (type === "ask") {
            const { data, fromCache } = await fetchAskData(question, text);
            const heading = fromCache ? "Ask AI (Cached)" : "Ask AI";
            setOutput(outputContainer, heading, data.answer || "No answer received.");
            return;
        }

        const { data, fromCache } = await fetchProcessData(text);
        const cacheTag = fromCache ? " (Cached)" : "";

        if (type === "summary") {
            setOutput(outputContainer, `Summary${cacheTag}`, data.summary || "No summary generated.");
            return;
        }

        if (type === "video") {
            if (!data.script) {
                setOutput(outputContainer, "Video", "No video script generated.");
                return;
            }

            setOutput(outputContainer, `Video${cacheTag}`, "Opening AI video player...");
            showVideo(data.script);
            return;
        }

        if (type === "graph") {
            setOutput(outputContainer, `Graph Data${cacheTag}`, formatGraphData(data.data));
            return;
        }
    } catch (error) {
        setOutput(outputContainer, "Error", error.message || "Something went wrong.", true);
    }
}


// Run after page loads
setTimeout(addButtonsToNews, 2000);