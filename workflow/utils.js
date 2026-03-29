export function formatResponse(aiData) {
  return {
    summary: aiData.summary || "",
    timeline: aiData.timeline || "",
    script: aiData.script || "",
    data: aiData.data || { labels: [], values: [] }
  };
}