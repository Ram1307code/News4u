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

export async function getAIResponse(text) {
  const prompt = MAIN_PROMPT(text); 

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
        // ✅ BUMPED THIS UP so the JSON doesn't get cut off halfway!
        generationConfig: {
          maxOutputTokens: 2000, 
          temperature: 0.2
        }
      })
    }
  );

  const data = await res.json();

  console.log("FULL RESPONSE:", JSON.stringify(data, null, 2));

  if (data.error) {
    throw new Error(data.error.message);
  }

  const raw = data.candidates[0].content.parts[0].text;
  return JSON.parse(cleanJSON(raw));
}

export async function askAI(question, context) {
  const prompt = `
Context:
${context}

Answer simply in 1-2 sentences:
${question}
`;

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
        // ✅ BUMP THIS UP so it doesn't get cut off mid-sentence!
        generationConfig: {
          maxOutputTokens: 800, 
          temperature: 0.4
        }
      })
    }
  );

  const data = await res.json();

  if (data.error) {
    throw new Error(data.error.message);
  }

  return data.candidates[0].content.parts[0].text;
}