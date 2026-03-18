const chat = document.getElementById("chat");
const form = document.getElementById("chat-form");
const input = document.getElementById("message-input");

let sessionId = null;

function addMessage(text, sender) {
  const div = document.createElement("div");
  div.className = `message ${sender}`;
  div.textContent = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

async function initChat() {
  try {
    const res = await fetch("/api/init");
    const data = await res.json();
    sessionId = data.sessionId;
    addMessage(data.message, "bot");
  } catch (error) {
    addMessage("No se pudo iniciar el chat.", "bot");
  }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const message = input.value.trim();
  if (!message) return;

  addMessage(message, "user");
  input.value = "";

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sessionId, message }),
    });

    const data = await res.json();

    if (data.error) {
      addMessage(`Error: ${data.error}`, "bot");
      return;
    }

    addMessage(data.reply, "bot");
  } catch (error) {
    addMessage("Error de conexión con el servidor.", "bot");
  }
});

initChat();
