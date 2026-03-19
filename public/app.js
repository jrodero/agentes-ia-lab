const chat = document.getElementById("chat");
const form = document.getElementById("chat-form");
const input = document.getElementById("message-input");

const chatModal = document.getElementById("chat-modal");
const chatOverlay = document.getElementById("chat-overlay");
const closeChatBtn = document.getElementById("close-chat-btn");
const chatTriggers = document.querySelectorAll("[data-open-chat]");
const paymentLinks = {
  stripe: document.body.dataset.stripePaymentLink || "#STRIPE_PAYMENT_LINK",
  revolut: document.body.dataset.revolutPaymentLink || "#REVOLUT_PAYMENT_LINK",
};

let sessionId = null;

function addMessage(text, sender) {
  const div = document.createElement("div");
  div.className = `message ${sender}`;
  div.textContent = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

function openChat() {
  chatModal.classList.add("is-open");
  chatModal.setAttribute("aria-hidden", "false");
  setTimeout(() => input.focus(), 80);
}

function closeChat() {
  chatModal.classList.remove("is-open");
  chatModal.setAttribute("aria-hidden", "true");
}

function initPaymentLinks() {
  document.querySelectorAll("[data-payment-link]").forEach((link) => {
    const provider = link.dataset.paymentLink;
    const href = paymentLinks[provider];

    if (href) {
      link.setAttribute("href", href);
    }
  });
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

chatTriggers.forEach((btn) => {
  btn.addEventListener("click", openChat);
});

if (chatOverlay) chatOverlay.addEventListener("click", closeChat);
if (closeChatBtn) closeChatBtn.addEventListener("click", closeChat);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeChat();
});

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
initPaymentLinks();
