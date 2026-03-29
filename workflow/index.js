import { getAIResponse, askAI } from "./ai.js";
import { formatResponse } from "./utils.js";

export async function processNews(text, tone = "simple") {
  const aiData = await getAIResponse(text, tone);
  return formatResponse(aiData);
}

// ✅ ADD THIS LINE
export { askAI };