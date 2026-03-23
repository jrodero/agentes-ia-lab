const chat = document.getElementById("chat");
const form = document.getElementById("chat-form");
const input = document.getElementById("message-input");

const chatModal = document.getElementById("chat-modal");
const chatOverlay = document.getElementById("chat-overlay");
const closeChatBtn = document.getElementById("close-chat-btn");
const chatTriggers = document.querySelectorAll("[data-open-chat]");
const topbar = document.querySelector(".topbar");
const topbarMenuToggle = document.getElementById("topbar-menu-toggle");
const topbarLinks = Array.from(document.querySelectorAll(".topbar-link"));
const pageSections = Array.from(document.querySelectorAll("section[id]"));
const paymentLinks = {
  stripe: document.body.dataset.stripePaymentLink || "#STRIPE_PAYMENT_LINK",
  revolut: document.body.dataset.revolutPaymentLink || "#REVOLUT_PAYMENT_LINK",
};

let sessionId = null;
let chatHistoryEntryActive = false;

function addMessage(text, sender) {
  const div = document.createElement("div");
  div.className = `message ${sender}`;
  div.textContent = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

function openChat() {
  closeTopbarMenu();

  if (!chatModal.classList.contains("is-open")) {
    window.history.pushState({ chatOpen: true }, "", window.location.href);
    chatHistoryEntryActive = true;
  }

  chatModal.classList.add("is-open");
  chatModal.setAttribute("aria-hidden", "false");
  setTimeout(() => input.focus(), 80);
}

function closeChat({ fromPopstate = false } = {}) {
  if (!fromPopstate && chatHistoryEntryActive) {
    window.history.back();
    return;
  }

  chatModal.classList.remove("is-open");
  chatModal.setAttribute("aria-hidden", "true");
  chatHistoryEntryActive = false;
}

function toggleTopbarMenu() {
  if (!topbar || !topbarMenuToggle) return;

  const isOpen = topbar.classList.toggle("is-menu-open");
  topbarMenuToggle.setAttribute("aria-expanded", String(isOpen));
}

function closeTopbarMenu() {
  if (!topbar || !topbarMenuToggle) return;

  topbar.classList.remove("is-menu-open");
  topbarMenuToggle.setAttribute("aria-expanded", "false");
}

function updateTopbarScrollState() {
  if (!topbar) return;

  topbar.classList.toggle("is-scrolled", window.scrollY > 18);
}

function setActiveTopbarLink(sectionId) {
  if (!sectionId) return;

  topbarLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${sectionId}`;
    link.classList.toggle("is-active", isActive);

    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

function initSectionSpy() {
  if (!pageSections.length || !topbarLinks.length) return;

  if (!("IntersectionObserver" in window)) {
    setActiveTopbarLink(pageSections[0].id);
    return;
  }

  const visibleSections = new Map();

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          visibleSections.set(entry.target.id, entry.intersectionRatio);
        } else {
          visibleSections.delete(entry.target.id);
        }
      });

      let activeSection = null;
      let bestRatio = 0;

      visibleSections.forEach((ratio, id) => {
        if (ratio >= bestRatio) {
          bestRatio = ratio;
          activeSection = id;
        }
      });

      if (!activeSection && window.scrollY < 160) {
        activeSection = "inicio";
      }

      if (activeSection) {
        setActiveTopbarLink(activeSection);
      }
    },
    {
      rootMargin: "-28% 0px -55% 0px",
      threshold: [0.2, 0.35, 0.5, 0.7],
    }
  );

  pageSections.forEach((section) => observer.observe(section));
  setActiveTopbarLink(window.location.hash.replace("#", "") || "inicio");
}

function initPaymentLinks() {
  document.querySelectorAll("[data-payment-link]").forEach((link) => {
    const provider = link.dataset.paymentLink;
    const href = paymentLinks[provider];
    const isActive = /^https?:\/\//i.test(href || "");

    if (isActive) {
      link.setAttribute("href", href);
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener noreferrer");
      link.setAttribute("data-payment-status", "Abrir checkout");
      link.classList.remove("is-disabled");
      link.removeAttribute("aria-disabled");
      link.removeAttribute("tabindex");
    } else {
      link.removeAttribute("href");
      link.removeAttribute("target");
      link.removeAttribute("rel");
      link.setAttribute("data-payment-status", "No activo");
      link.setAttribute("aria-disabled", "true");
      link.setAttribute("tabindex", "-1");
      link.classList.add("is-disabled");
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

if (topbarMenuToggle) {
  topbarMenuToggle.addEventListener("click", toggleTopbarMenu);
}

topbarLinks.forEach((link) => {
  link.addEventListener("click", closeTopbarMenu);
});

if (chatOverlay) chatOverlay.addEventListener("click", closeChat);
if (closeChatBtn) closeChatBtn.addEventListener("click", closeChat);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeChat();
  if (e.key === "Escape") closeTopbarMenu();
});

window.addEventListener("popstate", () => {
  if (chatModal.classList.contains("is-open")) {
    closeChat({ fromPopstate: true });
  }
});

window.addEventListener("scroll", updateTopbarScrollState, { passive: true });

window.addEventListener("resize", () => {
  if (window.innerWidth > 760) {
    closeTopbarMenu();
  }
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
updateTopbarScrollState();
initSectionSpy();
