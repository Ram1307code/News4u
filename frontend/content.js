// Inject styles
const style = document.createElement("style");
style.innerHTML = `
.ai-buttons {
  margin-top: 10px;
  display: flex;
  gap: 8px;
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
`;
document.head.appendChild(style);


// Main function to inject buttons
function addButtonsToNews() {
  const newsCards = document.querySelectorAll("div.eachStory");

  newsCards.forEach((card) => {
    // prevent duplicate buttons
    if (card.querySelector(".ai-buttons")) return;

    // create container
    const buttonContainer = document.createElement("div");
    buttonContainer.className = "ai-buttons";

    // buttons UI
    buttonContainer.innerHTML = `
      <button class="ai-btn summary">🧠 Summary</button>
      <button class="ai-btn video">🎥 Video</button>
      <button class="ai-btn graph">📊 Graph</button>
      <button class="ai-btn ask">💬 Ask AI</button>
    `;

    // append to card
    card.appendChild(buttonContainer);

    // extract text for this card
    const text = card.innerText;

    // Button click handlers
    buttonContainer.querySelector(".summary").onclick = () => {
      handleAction("summary", text);
    };

    buttonContainer.querySelector(".video").onclick = () => {
      handleAction("video", text);
    };

    buttonContainer.querySelector(".graph").onclick = () => {
      handleAction("graph", text);
    };

    buttonContainer.querySelector(".ask").onclick = () => {
      const question = prompt("Ask anything about this news:");
      if (question) handleAction("ask", text, question);
    };
  });
}


async function handleAction(type, text, question = "") {

  if (type === "ask") {
    const res = await fetch("http://localhost:3000/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        question,
        context: text.slice(0, 1000)
      })
    });

    const data = await res.json();
    alert(data.answer);
    return;
  }

  // process news
  const res = await fetch("http://localhost:3000/process", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      text: text.slice(0, 1200)
    })
  });

  const data = await res.json();

  if (type === "summary") {
    alert(data.summary);
  }

  if (type === "video") {
    alert(data.script);
  }

  if (type === "graph") {
    alert(JSON.stringify(data.data));
  }
}


// Run after page loads
setTimeout(addButtonsToNews, 2000);