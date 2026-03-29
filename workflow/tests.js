import { processNews } from "./index.js";
import { askAI } from "./ai.js";

const sampleNews = `
India stock market surged by 5% today after new government policies.
Experts believe this will boost investor confidence.
`;

async function test() {
  console.log("🔹 Testing processNews...\n");

  const result = await processNews(sampleNews);
  console.log(result);

  console.log("\n🔹 Testing askAI...\n");

  const answer = await askAI(
    "What is the impact of this news?",
    sampleNews
  );

  console.log(answer);
}

test();