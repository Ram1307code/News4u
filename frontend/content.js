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

.ai-summary-block {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.ai-summary-headline {
    margin: 0;
    font-size: 16px;
    line-height: 1.3;
    font-weight: 800;
    color: #0f172a;
}

.ai-summary-points {
    margin: 0;
    padding-left: 18px;
    color: #1e293b;
    font-size: 13px;
}

.ai-summary-points li {
    margin: 3px 0;
}

.ai-summary-text {
    margin: 0;
    color: #0f172a;
}

.ai-output-error {
  color: #b91c1c;
  font-weight: 600;
}

.ai-chart {
    margin-top: 6px;
    border: 1px solid #dbeafe;
    border-radius: 10px;
    background: linear-gradient(180deg, #f8fbff 0%, #eef5ff 100%);
    padding: 10px;
}

.ai-chart-title {
    margin: 0 0 10px;
    font-size: 13px;
    font-weight: 700;
    color: #0f172a;
}

.ai-chart-bars {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.ai-chart-row {
    display: grid;
    grid-template-columns: minmax(100px, 1fr) minmax(120px, 3fr) auto;
    gap: 8px;
    align-items: center;
}

.ai-chart-label {
    font-size: 12px;
    font-weight: 600;
    color: #1e293b;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.ai-chart-track {
    height: 12px;
    background: #dbeafe;
    border-radius: 999px;
    overflow: hidden;
}

.ai-chart-bar {
    height: 100%;
    width: 0;
    border-radius: 999px;
    background: linear-gradient(90deg, #06b6d4 0%, #2563eb 100%);
    transition: width 500ms ease;
}

.ai-chart-value {
    font-size: 12px;
    font-weight: 700;
    color: #0f172a;
}

.ai-chart-note {
    margin-top: 8px;
    font-size: 11px;
    color: #475569;
}

.ai-extension-watermark {
    position: fixed;
    right: 14px;
    bottom: 14px;
    z-index: 2147483000;
    pointer-events: none;
    padding: 7px 12px;
    border-radius: 999px;
    border: 1px solid rgba(56, 189, 248, 0.45);
    background:
        radial-gradient(circle at 10% 10%, rgba(56, 189, 248, 0.3), transparent 44%),
        linear-gradient(135deg, rgba(15, 23, 42, 0.88), rgba(30, 41, 59, 0.88));
    color: #e0f2fe;
    font-family: "Aptos", "Segoe UI Variable", "Trebuchet MS", sans-serif;
    font-size: 11px;
    letter-spacing: 0.35px;
    box-shadow:
        0 8px 20px rgba(2, 6, 23, 0.35),
        inset 0 1px 0 rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(5px);
    animation: aiWatermarkPulse 2.4s ease-in-out infinite;
}

.ai-extension-watermark strong {
    color: #7dd3fc;
    font-weight: 800;
}

@keyframes aiWatermarkPulse {
    0%,
    100% {
        transform: translateY(0);
        box-shadow:
            0 8px 20px rgba(2, 6, 23, 0.35),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
    }

    50% {
        transform: translateY(-1px);
        box-shadow:
            0 10px 26px rgba(2, 6, 23, 0.45),
            0 0 0 1px rgba(56, 189, 248, 0.25);
    }
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

.ai-video-title-wrap {
    display: flex;
    align-items: center;
    gap: 8px;
}

.ai-video-live-tag {
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 0.8px;
    color: #fee2e2;
    background: linear-gradient(135deg, #b91c1c, #ef4444);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 999px;
    padding: 3px 7px;
    box-shadow: 0 6px 14px rgba(239, 68, 68, 0.35);
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
    aspect-ratio: 16 / 9;
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

.ai-video-modal.is-vertical {
    width: min(430px, 94vw);
}

.ai-video-screen.is-vertical {
    min-height: 520px;
    aspect-ratio: 9 / 16;
}

.ai-video-image {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    transform: scale(1);
transition: opacity 800ms ease-in-out, transform 4000ms ease;
}

.ai-video-image.is-visible {
    opacity: 0.88;
    transform: scale(1.15); 
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

.ai-video-slide.is-animating {
    animation: aiCaptionPulse 340ms ease;
}

.ai-video-revealed {
    color: #ffffff;
    text-shadow: 0 0 10px rgba(125, 211, 252, 0.35), 0 6px 20px rgba(2, 6, 23, 0.95);
}

.ai-video-pending {
    color: rgba(241, 245, 249, 0.55);
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

.ai-video-slide {
    color: #ffffff;
    text-shadow: 0 4px 20px rgba(0,0,0,0.9);
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
    transition: transform 180ms ease, box-shadow 180ms ease, background 180ms ease;
}

.ai-video-control-btn:hover {
    background: #1e293b;
    transform: translateY(-1px);
    box-shadow: 0 8px 16px rgba(2, 6, 23, 0.35);
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

@keyframes aiCaptionPulse {
    from {
        opacity: 0.78;
        transform: scale(0.985);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

@keyframes aiSpin {
    to {
        transform: rotate(360deg);
    }
}

/* Premium UI theme overrides */
.ai-buttons,
.ai-output,
.ai-video-modal,
.ai-chart {
    font-family: "Aptos", "Segoe UI Variable", "Trebuchet MS", sans-serif;
}

.ai-buttons {
    margin-top: 14px;
    padding: 10px;
    border-radius: 14px;
    border: 1px solid #dbe3ff;
    background:
        radial-gradient(circle at 0% 0%, rgba(14, 165, 233, 0.16), transparent 44%),
        radial-gradient(circle at 100% 100%, rgba(59, 130, 246, 0.16), transparent 44%),
        linear-gradient(145deg, rgba(255, 255, 255, 0.92), rgba(248, 250, 252, 0.92));
    box-shadow:
        0 16px 24px rgba(15, 23, 42, 0.08),
        inset 0 1px 0 rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(5px);
}

.ai-btn {
    border: 1px solid rgba(30, 64, 175, 0.2);
    border-radius: 12px;
    padding: 8px 12px;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.2px;
    background: linear-gradient(135deg, #ffffff 0%, #eff6ff 48%, #dbeafe 100%);
    color: #0f172a;
    box-shadow:
        0 8px 12px rgba(15, 23, 42, 0.08),
        inset 0 1px 0 rgba(255, 255, 255, 0.95);
}

.ai-btn:hover {
    background: linear-gradient(135deg, #ffffff 0%, #dbeafe 55%, #bfdbfe 100%);
    transform: translateY(-2px) scale(1.02);
    box-shadow:
        0 12px 20px rgba(30, 64, 175, 0.2),
        inset 0 1px 0 rgba(255, 255, 255, 0.98);
}

.ai-output {
    margin-top: 12px;
    border-radius: 14px;
    border: 1px solid #dbeafe;
    background:
        linear-gradient(180deg, #ffffff 0%, #f8fbff 100%);
    box-shadow:
        0 14px 22px rgba(15, 23, 42, 0.08),
        inset 0 1px 0 rgba(255, 255, 255, 0.92);
}

.ai-output-title {
    font-size: 11px;
    letter-spacing: 0.8px;
    color: #1e3a8a;
}

.ai-output-body {
    color: #0f172a;
}

.ai-chart {
    border: 1px solid #cfe0ff;
    border-radius: 12px;
    background:
        radial-gradient(circle at 80% 0%, rgba(14, 165, 233, 0.18), transparent 40%),
        linear-gradient(180deg, #ffffff 0%, #eef4ff 100%);
    box-shadow: 0 10px 18px rgba(30, 58, 138, 0.1);
}

.ai-chart-title {
    font-size: 13px;
    color: #172554;
}

.ai-chart-track {
    background: #d7e7ff;
}

.ai-chart-bar {
    background: linear-gradient(90deg, #0284c7 0%, #2563eb 55%, #4f46e5 100%);
}

.ai-video-overlay {
    background:
        radial-gradient(circle at 20% 20%, rgba(14, 165, 233, 0.14), transparent 40%),
        rgba(2, 6, 23, 0.74);
}

.ai-video-modal {
    border: 1px solid #334155;
    border-radius: 18px;
    background:
        radial-gradient(circle at 0% 0%, rgba(56, 189, 248, 0.16), transparent 32%),
        linear-gradient(165deg, #0b1220 0%, #111827 100%);
}

.ai-video-title {
    font-size: 19px;
    letter-spacing: 0.2px;
}

.ai-video-close,
.ai-video-control-btn {
    border-radius: 999px;
    border: 1px solid rgba(125, 211, 252, 0.26);
    background: linear-gradient(145deg, #0f172a, #1e293b);
}

.ai-video-slide {
    font-size: 24px;
    font-weight: 700;
    letter-spacing: 0.2px;
    text-shadow: 0 8px 26px rgba(2, 6, 23, 0.85);
}

.ai-video-screen.is-vertical .ai-video-caption {
    max-width: 92%;
    text-align: center;
    padding: 16px 14px;
}

.ai-video-screen.is-vertical .ai-video-slide {
    font-size: clamp(20px, 4vw, 29px);
    line-height: 1.35;
}

.ai-chat-overlay {
    position: fixed;
    inset: 0;
    z-index: 2147483647;
    background: rgba(2, 6, 23, 0.62);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    backdrop-filter: blur(4px);
}

.ai-chat-modal {
    width: min(560px, 95vw);
    max-height: min(720px, 88vh);
    display: grid;
    grid-template-rows: auto 1fr auto;
    border-radius: 16px;
    border: 1px solid #c7dcff;
    background:
        radial-gradient(circle at 0% 0%, rgba(56, 189, 248, 0.18), transparent 36%),
        linear-gradient(180deg, #ffffff 0%, #f3f8ff 100%);
    box-shadow: 0 28px 70px rgba(15, 23, 42, 0.22);
    overflow: hidden;
}

.ai-chat-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding: 12px 14px;
    border-bottom: 1px solid #dbeafe;
    background: rgba(255, 255, 255, 0.66);
}

.ai-chat-title {
    margin: 0;
    font-size: 15px;
    font-weight: 800;
    color: #0f172a;
}

.ai-chat-subtitle {
    margin: 4px 0 0;
    font-size: 11px;
    color: #1e40af;
}

.ai-chat-close {
    border: 1px solid #cbd5e1;
    background: #ffffff;
    color: #0f172a;
    border-radius: 999px;
    width: 32px;
    height: 32px;
    cursor: pointer;
    font-size: 14px;
}

.ai-chat-log {
    padding: 12px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.ai-chat-msg {
    max-width: 90%;
    padding: 9px 11px;
    border-radius: 12px;
    font-size: 13px;
    line-height: 1.4;
    white-space: pre-wrap;
}

.ai-chat-msg.user {
    align-self: flex-end;
    background: linear-gradient(135deg, #2563eb, #1d4ed8);
    color: #eff6ff;
    border-bottom-right-radius: 4px;
}

.ai-chat-msg.ai {
    align-self: flex-start;
    background: #ffffff;
    border: 1px solid #dbeafe;
    color: #0f172a;
    border-bottom-left-radius: 4px;
}

.ai-chat-msg.loading {
    opacity: 0.75;
    font-style: italic;
}

.ai-chat-input-wrap {
    border-top: 1px solid #dbeafe;
    padding: 10px;
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 8px;
    background: rgba(255, 255, 255, 0.75);
}

.ai-chat-input {
    border: 1px solid #cbd5e1;
    border-radius: 10px;
    padding: 10px;
    font-size: 13px;
    color: #0f172a;
}

.ai-chat-send {
    border: none;
    border-radius: 10px;
    padding: 0 14px;
    font-size: 12px;
    font-weight: 700;
    color: #e0f2fe;
    background: linear-gradient(135deg, #0284c7, #2563eb);
    cursor: pointer;
}

.ai-chat-send:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.ai-chat-suggestions {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 6px;
}

.ai-chat-chip {
    border: 1px solid #c7dcff;
    background: linear-gradient(180deg, #ffffff, #eff6ff);
    color: #1e3a8a;
    border-radius: 999px;
    font-size: 11px;
    padding: 5px 9px;
    cursor: pointer;
    transition: transform 140ms ease, box-shadow 140ms ease;
}

.ai-chat-chip:hover {
    transform: translateY(-1px);
    box-shadow: 0 8px 14px rgba(59, 130, 246, 0.2);
}

.ai-video-loading {
    position: fixed;
    inset: 0;
    z-index: 2147483646;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(2, 6, 23, 0.72);
    backdrop-filter: blur(3px);
}

.ai-video-loading-card {
    display: flex;
    align-items: center;
    gap: 10px;
    border-radius: 14px;
    border: 1px solid rgba(125, 211, 252, 0.35);
    background: linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.95));
    color: #e2e8f0;
    padding: 12px 14px;
    box-shadow: 0 18px 40px rgba(2, 6, 23, 0.35);
}

.ai-video-spinner {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 2px solid rgba(148, 163, 184, 0.35);
    border-top-color: #22d3ee;
    animation: aiSpin 900ms linear infinite;
}

@media (max-width: 640px) {
    .ai-buttons {
        gap: 6px;
        padding: 8px;
    }

    .ai-btn {
        flex: 1 1 calc(50% - 6px);
        text-align: center;
    }

    .ai-video-slide {
        font-size: 18px;
        line-height: 1.4;
    }

    .ai-video-screen.is-vertical {
        min-height: 430px;
    }

    .ai-chat-modal {
        width: 96vw;
        max-height: 90vh;
    }

    .ai-chat-input-wrap {
        grid-template-columns: 1fr;
    }

    .ai-chat-send {
        height: 38px;
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

function normalizeTone(tone) {
    return ["serious", "dramatic", "simple"].includes(tone) ? tone : "simple";
}

async function fetchProcessData(text, tone = "simple") {
    const newsText = normalizeInput(text).slice(0, 1200);
    const safeTone = normalizeTone(tone);
    const cacheKey = getCacheKey("process", `${newsText}::${safeTone}`);
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
                text: newsText,
                tone: safeTone
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
            <button class="ai-btn tone">Tone: Simple</button>
    `;

        // append to card
        card.appendChild(buttonContainer);
        card.appendChild(outputContainer);

        // extract text for this card
        const text = card.innerText;
        let selectedTone = "simple";

        const toneButton = buttonContainer.querySelector(".tone");
        const tones = ["simple", "serious", "dramatic"];
        const toneLabels = {
            simple: "Simple",
            serious: "Serious",
            dramatic: "Dramatic"
        };

        const updateToneButton = () => {
            toneButton.textContent = `Tone: ${toneLabels[selectedTone]}`;
        };

        toneButton.onclick = () => {
            const toneIndex = tones.indexOf(selectedTone);
            selectedTone = tones[(toneIndex + 1) % tones.length];
            updateToneButton();
        };

        updateToneButton();

        // Button click handlers
        buttonContainer.querySelector(".summary").onclick = () => {
            handleAction("summary", text, outputContainer, "", selectedTone);
        };

        buttonContainer.querySelector(".video").onclick = () => {
            handleAction("video", text, outputContainer, "", selectedTone);
        };

        buttonContainer.querySelector(".graph").onclick = () => {
            handleAction("graph", text, outputContainer, "", selectedTone);
        };

        buttonContainer.querySelector(".ask").onclick = () => {
            openAskChat(text);
        };
    });
}

function ensureExtensionWatermark() {
    if (document.querySelector(".ai-extension-watermark")) return;

    const badge = document.createElement("div");
    badge.className = "ai-extension-watermark";
    badge.innerHTML = "<strong>News4u</strong> extension is running";
    document.body.appendChild(badge);
}


function setOutput(outputContainer, title, content, isError = false) {
    const titleEl = outputContainer.querySelector(".ai-output-title");
    const bodyEl = outputContainer.querySelector(".ai-output-body");

    titleEl.textContent = title;
    bodyEl.textContent = content;
    bodyEl.className = isError ? "ai-output-body ai-output-error" : "ai-output-body";
    outputContainer.classList.remove("hidden");
}

function setOutputNode(outputContainer, title, node, isError = false) {
    const titleEl = outputContainer.querySelector(".ai-output-title");
    const bodyEl = outputContainer.querySelector(".ai-output-body");

    titleEl.textContent = title;
    bodyEl.className = isError ? "ai-output-body ai-output-error" : "ai-output-body";
    bodyEl.textContent = "";
    bodyEl.appendChild(node);
    outputContainer.classList.remove("hidden");
}

function toFiniteNumber(value) {
    if (typeof value === "number") {
        return Number.isFinite(value) ? value : null;
    }

    if (typeof value !== "string") return null;

    const normalized = value.replace(/[,%$\s]/g, "");
    const parsed = Number(normalized);
    return Number.isFinite(parsed) ? parsed : null;
}

function buildFallbackGraphFromText(text) {
    const safeText = normalizeInput(text);
    const words = safeText ? safeText.split(" ").filter(Boolean) : [];
    const sentenceCount = safeText ? safeText.split(/[.!?]+/).map((part) => part.trim()).filter(Boolean).length : 0;
    const avgWordLength = words.length
        ? words.reduce((sum, word) => sum + word.length, 0) / words.length
        : 0;

    return {
        title: "Article Metrics",
        labels: ["Words", "Sentences", "Avg word len"],
        values: [words.length, sentenceCount || 1, Number(avgWordLength.toFixed(1))],
        note: "Showing article metrics because no strong numeric comparison was detected."
    };
}

function normalizeGraphDataset(rawData, articleText) {
    const title =
        rawData && typeof rawData === "object" && typeof rawData.title === "string" && rawData.title.trim()
            ? rawData.title.trim()
            : "News Comparison";

    const labels = Array.isArray(rawData?.labels) ? rawData.labels : [];
    const values = Array.isArray(rawData?.values) ? rawData.values : [];

    const pairs = labels
        .map((label, index) => ({
            label: String(label || `Item ${index + 1}`),
            value: toFiniteNumber(values[index])
        }))
        .filter((item) => item.value !== null)
        .slice(0, 6);

    if (pairs.length) {
        return {
            title,
            labels: pairs.map((item) => item.label),
            values: pairs.map((item) => item.value),
            note: ""
        };
    }

    return buildFallbackGraphFromText(articleText);
}

function buildAskContext(articleText, history) {
    const recent = history.slice(-4).map((item) => `${item.role.toUpperCase()}: ${item.text}`).join("\n");

    return `
NEWS ARTICLE (primary source):
${articleText}

CHAT HISTORY (about the same article):
${recent || "None"}

STRICT RULE:
Answer ONLY using the article and history above. If the question is unrelated to this news, say you can only discuss this article.
`.trim();
}

function createSummaryNode(data) {
    const wrap = document.createElement("div");
    wrap.className = "ai-summary-block";

    const headline = document.createElement("p");
    headline.className = "ai-summary-headline";
    headline.textContent = normalizeInput(data?.headline) || "Top Story";
    wrap.appendChild(headline);

    const keyPoints = Array.isArray(data?.keyPoints)
        ? data.keyPoints.map((item) => normalizeInput(item)).filter(Boolean).slice(0, 5)
        : [];

    if (keyPoints.length) {
        const pointsList = document.createElement("ul");
        pointsList.className = "ai-summary-points";

        keyPoints.forEach((point) => {
            const li = document.createElement("li");
            li.textContent = point;
            pointsList.appendChild(li);
        });

        wrap.appendChild(pointsList);
    }

    const summary = document.createElement("p");
    summary.className = "ai-summary-text";
    summary.textContent = normalizeInput(data?.summary) || "No summary generated.";
    wrap.appendChild(summary);

    return wrap;
}

function openAskChat(articleText) {
    const existing = document.querySelector(".ai-chat-overlay");
    if (existing) existing.remove();

    const overlay = document.createElement("div");
    overlay.className = "ai-chat-overlay";

    const modal = document.createElement("div");
    modal.className = "ai-chat-modal";
    modal.innerHTML = `
      <div class="ai-chat-header">
        <div>
          <p class="ai-chat-title">Ask AI About This News</p>
          <p class="ai-chat-subtitle">Answers are limited to this selected news card.</p>
        </div>
        <button class="ai-chat-close" aria-label="Close chat">✕</button>
      </div>
      <div class="ai-chat-log"></div>
      <div class="ai-chat-input-wrap">
        <input class="ai-chat-input" type="text" placeholder="Ask a question about this news..." />
        <button class="ai-chat-send">Send</button>
      </div>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    const log = modal.querySelector(".ai-chat-log");
    const input = modal.querySelector(".ai-chat-input");
    const sendBtn = modal.querySelector(".ai-chat-send");
    const closeBtn = modal.querySelector(".ai-chat-close");
    const history = [];

    const addMsg = (role, text, extraClass = "") => {
        const msg = document.createElement("div");
        msg.className = `ai-chat-msg ${role}${extraClass ? ` ${extraClass}` : ""}`;
        msg.textContent = text;
        log.appendChild(msg);
        log.scrollTop = log.scrollHeight;
        return msg;
    };

    const addSuggestions = (questions) => {
        const normalized = Array.isArray(questions)
            ? questions.map((item) => normalizeInput(item)).filter(Boolean).slice(0, 3)
            : [];

        if (!normalized.length) return;

        const chipWrap = document.createElement("div");
        chipWrap.className = "ai-chat-suggestions";

        normalized.forEach((questionText) => {
            const chip = document.createElement("button");
            chip.type = "button";
            chip.className = "ai-chat-chip";
            chip.textContent = questionText;
            chip.addEventListener("click", () => {
                input.value = questionText;
                sendMessage();
            });
            chipWrap.appendChild(chip);
        });

        log.appendChild(chipWrap);
        log.scrollTop = log.scrollHeight;
    };

    addMsg("ai", "Ask me anything about this article. I will only answer based on this news.");

    const close = () => {
        overlay.remove();
    };

    const sendMessage = async () => {
        const question = normalizeInput(input.value);
        if (!question) return;

        input.value = "";
        addMsg("user", question);
        history.push({ role: "user", text: question });

        sendBtn.disabled = true;
        input.disabled = true;
        const loading = addMsg("ai", "Thinking...", "loading");

        try {
            const context = buildAskContext(articleText, history);
            const { data } = await fetchAskData(question, context);
            const answer = normalizeInput(data?.answer) || "I could not find an answer from this article.";
            loading.remove();
            addMsg("ai", answer);
            addSuggestions(data?.suggestedQuestions);
            history.push({ role: "ai", text: answer });
        } catch (error) {
            loading.remove();
            addMsg("ai", error.message || "Something went wrong while getting the answer.");
        } finally {
            sendBtn.disabled = false;
            input.disabled = false;
            input.focus();
        }
    };

    closeBtn.addEventListener("click", close);
    overlay.addEventListener("click", (event) => {
        if (event.target === overlay) close();
    });
    sendBtn.addEventListener("click", sendMessage);
    input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") sendMessage();
    });

    input.focus();
}

function createGraphNode(rawData, articleText) {
    const dataset = normalizeGraphDataset(rawData, articleText);
    const maxValue = Math.max(...dataset.values, 1);

    const wrap = document.createElement("div");
    wrap.className = "ai-chart";

    const title = document.createElement("p");
    title.className = "ai-chart-title";
    title.textContent = dataset.title;
    wrap.appendChild(title);

    const bars = document.createElement("div");
    bars.className = "ai-chart-bars";

    dataset.labels.forEach((label, index) => {
        const value = dataset.values[index];
        const percent = Math.max(4, Math.round((value / maxValue) * 100));

        const row = document.createElement("div");
        row.className = "ai-chart-row";

        const labelEl = document.createElement("span");
        labelEl.className = "ai-chart-label";
        labelEl.textContent = label;

        const track = document.createElement("div");
        track.className = "ai-chart-track";

        const bar = document.createElement("div");
        bar.className = "ai-chart-bar";
        track.appendChild(bar);

        const valueEl = document.createElement("span");
        valueEl.className = "ai-chart-value";
        valueEl.textContent = Number.isInteger(value) ? String(value) : value.toFixed(1);

        row.appendChild(labelEl);
        row.appendChild(track);
        row.appendChild(valueEl);
        bars.appendChild(row);

        requestAnimationFrame(() => {
            bar.style.width = `${percent}%`;
        });
    });

    wrap.appendChild(bars);

    if (dataset.note) {
        const note = document.createElement("p");
        note.className = "ai-chart-note";
        note.textContent = dataset.note;
        wrap.appendChild(note);
    }

    return wrap;
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
        .split(/[\.\n]/)
        .map((sentence) => sentence.trim())
        .filter(Boolean)
        .map((sentence) => `${sentence}.`);
}

function showVideoLoadingOverlay(tone = "simple") {
    const existing = document.querySelector(".ai-video-loading");
    if (existing) existing.remove();

    const overlay = document.createElement("div");
    overlay.className = "ai-video-loading";

    const toneLabel = tone.charAt(0).toUpperCase() + tone.slice(1);
    overlay.innerHTML = `
            <div class="ai-video-loading-card">
                <div class="ai-video-spinner"></div>
                <div>Generating AI Video... (${toneLabel} tone)</div>
            </div>
        `;

    document.body.appendChild(overlay);
    return overlay;
}

function getSlideQuery(sentence, index) {
    const stopWords = new Set([
        "the", "and", "for", "with", "that", "this", "from", "have", "were", "been", "their", "about", "into", "after", "before", "against", "between", "because", "while", "when", "where", "which", "what", "would", "could", "should", "they", "them", "there", "then", "than", "also", "over", "under", "around", "today", "news"
    ]);

    const sentenceTokens = sentence
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, " ")
        .split(/\s+/)
        .filter((word) => word.length > 3 && !stopWords.has(word));

    const dynamicKeywords = Array.from(new Set(sentenceTokens)).slice(0, 5);

    const isFinance = /(market|stocks|inflation|gdp|rupee|budget|economy|growth)/i.test(sentence);
    const isProtest = /(protest|strike|rally|demonstration|march|police|clash)/i.test(sentence);
    const isPolitics = /(election|minister|parliament|government|policy|cabinet)/i.test(sentence);

    const topicalKeywords = [
        "breaking news",
        "india",
        "live report",
        "journalism",
        "headline"
    ];

    if (isProtest) topicalKeywords.push("protest", "crowd", "street");
    if (isFinance) topicalKeywords.push("economy", "business", "market");
    if (isPolitics) topicalKeywords.push("politics", "government");

    const keywords = Array.from(new Set([...dynamicKeywords, ...topicalKeywords])).slice(0, 10);

    const query = keywords.length ? keywords.join(",") : "breaking,news,world";
    return `${query},headline,journalism,${index + 1}`;
}

function getSlideImageCandidates(sentence, index, mode = "landscape") {
    const query = encodeURIComponent(getSlideQuery(sentence, index));
    const isVertical = mode === "vertical";
    const primarySize = isVertical ? "1080x1920" : "1600x900";
    const backupSize = isVertical ? "900x1600" : "1280x720";

    return [
        `https://source.unsplash.com/${primarySize}/?${query}`,
        `https://source.unsplash.com/${backupSize}/?${query}`,
        `https://source.unsplash.com/featured/?${query}`
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
let typingInterval;
function showVideo(script, tone = "simple") {
    if (!script || typeof script !== "string") return;

    const loadingOverlay = showVideoLoadingOverlay(tone);

    const existing = document.querySelector(".ai-video-overlay");
    if (existing) {
        window.speechSynthesis.cancel();
        existing.remove();
    }

    const bgMusic = new Audio("https://www.bensound.com/bensound-music/bensound-news.mp3");
    bgMusic.loop = true;
    bgMusic.volume = 0.2;
    bgMusic.play().catch(() => { });



    const slides = createVideoSlides(script);
    if (!slides.length) return;

    const overlay = document.createElement("div");
    overlay.className = "ai-video-overlay";

    const modal = document.createElement("div");
    modal.className = "ai-video-modal";
    modal.innerHTML = `
      <div class="ai-video-header">
                <div class="ai-video-title-wrap">
                        <h3 class="ai-video-title">🎬 AI News Video</h3>
                        <span class="ai-video-live-tag">LIVE</span>
                </div>
        <button class="ai-video-close" aria-label="Close video">❌</button>
      </div>
      <div class="ai-video-screen">
                                <img class="ai-video-image" alt="AI generated visual for the news" />
                                <img class="ai-video-image" alt="AI generated visual for the news" />
                                <div class="ai-video-image-overlay"></div>
                                <div class="ai-video-caption">
                                                                                <p class="ai-video-slide"><span class="ai-video-revealed"></span><span class="ai-video-pending"></span></p>
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
                    <button class="ai-video-control-btn" data-role="speed">Speed 1x</button>
                    <button class="ai-video-control-btn" data-role="fullscreen">Fullscreen</button>
                    <button class="ai-video-control-btn" data-role="mode">Reels 9:16</button>
                </div>
      </div>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    const slideEl = modal.querySelector(".ai-video-slide");
    const revealedEl = modal.querySelector(".ai-video-revealed");
    const pendingEl = modal.querySelector(".ai-video-pending");
    const imageEls = Array.from(modal.querySelectorAll(".ai-video-image"));
    const closeBtn = modal.querySelector(".ai-video-close");
    const progressFill = modal.querySelector(".ai-video-progress-fill");
    const progressText = modal.querySelector(".ai-video-progress-text");
    const screenEl = modal.querySelector(".ai-video-screen");
    const dotsWrap = modal.querySelector(".ai-video-dots");
    const pauseBtn = modal.querySelector('[data-role="pause"]');
    const muteBtn = modal.querySelector('[data-role="mute"]');
    const speedBtn = modal.querySelector('[data-role="speed"]');
    const fullscreenBtn = modal.querySelector('[data-role="fullscreen"]');
    const modeBtn = modal.querySelector('[data-role="mode"]');

    let currentIndex = 0;
    let advanceTimeout = null;
    let textAnimationFrame = null;
    let activeUtterance = null;
    let isPaused = false;
    let isMuted = false;
    let activeImageLayer = 0;
    let renderToken = 0;
    let currentSentenceText = "";
    let targetCharIndex = 0;
    let displayedCharIndex = 0;
    let isReelsMode = false;
    let narrationRate = 1;

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
        const imageCandidates = getSlideImageCandidates(currentSentence, safeIndex, isReelsMode ? "vertical" : "landscape");

        // ✅ preload next image
        const preload = new Image();
        preload.src = imageCandidates[0];
        if (typingInterval) clearInterval(typingInterval);
        revealedEl.textContent = "";
        pendingEl.textContent = currentSentence;
        slideEl.classList.remove("is-animating");
        slideEl.style.animation = "none";
        requestAnimationFrame(() => {
            slideEl.style.animation = "aiSlideIn 300ms ease forwards";
            slideEl.classList.add("is-animating");
        });

        const nextLayer = activeImageLayer === 0 ? 1 : 0;
        const frontImage = imageEls[nextLayer];
        const backImage = imageEls[activeImageLayer];


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

        return currentSentence;
    };

    const clearAdvanceTimeout = () => {
        if (advanceTimeout) {
            clearTimeout(advanceTimeout);
            advanceTimeout = null;
        }
    };

    const clearTextAnimation = () => {
        if (textAnimationFrame) {
            cancelAnimationFrame(textAnimationFrame);
            textAnimationFrame = null;
        }
    };

    const startTextAnimation = (sentence) => {
        clearTextAnimation();

        let i = 0;
        revealedEl.textContent = "";
        pendingEl.textContent = sentence;

        const type = () => {
            if (i < sentence.length) {
                i += Math.max(1, Math.ceil(narrationRate));
                const cursor = Math.min(i, sentence.length);
                revealedEl.textContent = sentence.slice(0, cursor);
                pendingEl.textContent = sentence.slice(cursor);
                textAnimationFrame = requestAnimationFrame(type);
            }
        };

        textAnimationFrame = requestAnimationFrame(type);
    };




    const clearNarration = () => {
        if (typingInterval) {
            clearInterval(typingInterval);
            typingInterval = null;
        }

        clearAdvanceTimeout();
        clearTextAnimation();
        activeUtterance = null;
        window.speechSynthesis.cancel();
    };

    const playSlide = (index) => {
        if (index < 0 || index >= slides.length) {
            clearNarration();
            return;
        }

        currentIndex = index;
        const sentence = renderSlide(currentIndex);

        clearNarration(); // FIRST

        const utterance = new SpeechSynthesisUtterance(sentence);
        utterance.rate = narrationRate;
        utterance.pitch = 1;
        utterance.volume = isMuted ? 0 : 0.9;

        activeUtterance = utterance;

        startTextAnimation(sentence);

        window.speechSynthesis.speak(utterance);

        utterance.onend = () => {
            if (currentIndex !== index) return;

            if (index >= slides.length - 1) {
                clearAdvanceTimeout();
                return;
            }

            clearAdvanceTimeout();

            advanceTimeout = setTimeout(() => {
                if (isPaused) return;
                playSlide(index + 1);
            }, 120);
        };

        if (isPaused) {
            window.speechSynthesis.pause();
        }
    };

    const cleanup = () => {
        clearNarration();
        overlay.remove();
        loadingOverlay?.remove();
        bgMusic.pause();
    };

    const setPauseState = (paused) => {
        isPaused = paused;
        pauseBtn.textContent = isPaused ? "Resume" : "Pause";

        if (isPaused) {
            window.speechSynthesis.pause();
        } else {
            window.speechSynthesis.resume();

            if (!activeUtterance && currentIndex < slides.length - 1) {
                playSlide(currentIndex + 1);
            }
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

    const setModeState = (vertical) => {
        isReelsMode = vertical;
        modal.classList.toggle("is-vertical", isReelsMode);
        screenEl.classList.toggle("is-vertical", isReelsMode);
        modeBtn.textContent = isReelsMode ? "Landscape 16:9" : "Reels 9:16";
        renderSlide(currentIndex);
    };

    const setSpeedState = () => {
        narrationRate = narrationRate === 1 ? 1.5 : narrationRate === 1.5 ? 2 : 1;
        speedBtn.textContent = `Speed ${narrationRate}x`;

        if (activeUtterance && !isPaused) {
            playSlide(currentIndex);
        }
    };

    const toggleFullscreen = async () => {
        try {
            if (document.fullscreenElement) {
                await document.exitFullscreen();
                fullscreenBtn.textContent = "Fullscreen";
            } else {
                await modal.requestFullscreen();
                fullscreenBtn.textContent = "Exit Fullscreen";
            }
        } catch {
            fullscreenBtn.textContent = "Fullscreen";
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

    speedBtn.addEventListener("click", () => {
        setSpeedState();
    });

    fullscreenBtn.addEventListener("click", () => {
        toggleFullscreen();
    });

    modeBtn.addEventListener("click", () => {
        setModeState(!isReelsMode);
    });

    setModeState(false);
    setTimeout(() => loadingOverlay?.remove(), 500);

    playSlide(currentIndex);
}

async function handleAction(type, text, outputContainer, question = "", tone = "simple") {
    setOutput(outputContainer, "AI Output", "Generating... Please wait.");

    try {
        if (type === "ask") {
            const { data, fromCache } = await fetchAskData(question, text);
            const heading = fromCache ? "Ask AI (Cached)" : "Ask AI";
            setOutput(outputContainer, heading, data.answer || "No answer received.");
            return;
        }

        const { data, fromCache } = await fetchProcessData(text, tone);
        const cacheTag = fromCache ? " (Cached)" : "";

        if (type === "summary") {
            setOutputNode(outputContainer, `Summary${cacheTag}`, createSummaryNode(data));
            return;
        }

        if (type === "video") {
            if (!data.script) {
                setOutput(outputContainer, "Video", "No video script generated.");
                return;
            }

            setOutput(outputContainer, `Video${cacheTag}`, "Opening AI video player...");
            showVideo(data.script, tone);
            return;
        }

        if (type === "graph") {
            const graphNode = createGraphNode(data.data, text);
            setOutputNode(outputContainer, `Graph${cacheTag}`, graphNode);
            return;
        }
    } catch (error) {
        setOutput(outputContainer, "Error", error.message || "Something went wrong.", true);
    }
}


// Run after page loads
setTimeout(() => {
    addButtonsToNews();
    ensureExtensionWatermark();
}, 2000);