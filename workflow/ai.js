import { MAIN_PROMPT } from "./prompts.js";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

// ⚠️ Use your newly generated API key!
const API_KEY = process.env.GEMINI_API_KEY;

function cleanJSON(text) {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  return text.substring(start, end + 1);
}

async function callGemini(prompt, maxOutputTokens = 1200, temperature = 0.3) {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ],
        generationConfig: {
          maxOutputTokens,
          temperature
        }
      })
    }
  );

  const data = await res.json();
  if (data.error) {
    throw new Error(data.error.message);
  }

  return data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
}

export async function getAIResponse(text, tone = "simple") {
  const prompt = MAIN_PROMPT(text, tone);
  const raw = await callGemini(prompt, 2200, 0.25);
  return JSON.parse(cleanJSON(raw));
}

export async function askAI(question, context) {
  const prompt = `
Context:
${context}

Question:
${question}

Return ONLY valid JSON with this exact shape:
{
  "answer": "A direct 1-2 sentence answer based on the context.",
  "suggestedQuestions": [
    "Follow-up question 1",
    "Follow-up question 2",
    "Follow-up question 3"
  ]
}

Rules:
- Keep suggestedQuestions focused on the same context.
- suggestedQuestions must be exactly 3 items.
- No markdown code fences.
`;

  const raw = await callGemini(prompt, 1000, 0.35);

  try {
    const parsed = JSON.parse(cleanJSON(raw));
    const suggestedQuestions = Array.isArray(parsed.suggestedQuestions)
      ? parsed.suggestedQuestions.map((item) => String(item).trim()).filter(Boolean).slice(0, 3)
      : [];

    while (suggestedQuestions.length < 3) {
      suggestedQuestions.push([
        "Why is this important?",
        "What happens next?",
        "Who is affected most?"
      ][suggestedQuestions.length]);
    }

    return {
      answer: String(parsed.answer || "").trim() || "I could not generate an answer right now.",
      suggestedQuestions
    };
  } catch {
    return {
      answer: raw.trim() || "I could not generate an answer right now.",
      suggestedQuestions: [
        "Why is this important?",
        "What happens next?",
        "Who is affected most?"
      ]
    };
  }
}