export function formatResponse(aiData) {
  const keyPoints = Array.isArray(aiData.keyPoints)
    ? aiData.keyPoints.map((item) => String(item).trim()).filter(Boolean).slice(0, 5)
    : [];

  return {
    headline: aiData.headline || "",
    summary: aiData.summary || "",
    keyPoints,
    timeline: aiData.timeline || "",
    script: aiData.script || "",
    data: aiData.data || { labels: [], values: [] }
  };
}