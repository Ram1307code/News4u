import { getAIResponse } from "./ai.js";
import { formatResponse } from "./utils.js";

export async function processNews(text) {
  const aiData = await getAIResponse(text);
  return formatResponse(aiData);
}