// EDITE AQUI antes de publicar: número de WhatsApp (formato 55DDDNUMERO, só dígitos) e mensagem padrão.
const WHATSAPP_CONFIG = {
  number: "5500000000000",
  message: "Olá! Gostaria de saber se tenho direito à isenção do Imposto de Renda."
};

// Conteúdo dinâmico do Hero por público (Seção 1 do briefing: Opções A-D).
const HERO_VARIANTS = {
  militares: {
    headline: "Você pode estar pagando Imposto de Renda sem necessidade.",
    subheadline: "Militares reformados e da reserva com diagnósticos específicos têm o direito legal à isenção total do IRPF. Descubra como proteger seu patrimônio."
  },
  pensionistas: {
    headline: "Você pode ter direito à Isenção do Imposto de Renda.",
    subheadline: "Pensionistas que possuem doenças previstas em lei não precisam pagar IRPF. Saiba como reivindicar seu direito e parar de perder dinheiro."
  },
  doencas: {
    headline: "Sua doença pode garantir um direito que você ainda desconhece.",
    subheadline: "O diagnóstico de uma doença grave é um momento delicado, mas a lei garante benefícios para ajudar no seu tratamento. A isenção do IRPF é um deles."
  },
  geral: {
    headline: "Descubra se você tem direito à Isenção do Imposto de Renda.",
    subheadline: "Aposentados, pensionistas e militares reformados podem ter direito à isenção e à restituição de valores pagos indevidamente."
  }
};

// Detecta a variante via parâmetro explícito (?v=militares) ou palavras-chave nos parâmetros UTM.
function detectHeroVariant() {
  const params = new URLSearchParams(window.location.search);

  const explicit = (params.get("v") || params.get("variant") || "").toLowerCase();
  if (HERO_VARIANTS[explicit]) return explicit;

  const haystack = [
    params.get("utm_campaign"),
    params.get("utm_content"),
    params.get("utm_term"),
    params.get("utm_source")
  ].filter(Boolean).join(" ").toLowerCase();

  if (/militar/.test(haystack)) return "militares";
  if (/pens(a|ã)o|pensionist/.test(haystack)) return "pensionistas";
  if (/doenc|doenç|grave|c[aâ]ncer/.test(haystack)) return "doencas";

  return "geral";
}

function applyHeroVariant() {
  const variant = HERO_VARIANTS[detectHeroVariant()];
  const headlineEl = document.getElementById("hero-headline");
  const subheadlineEl = document.getElementById("hero-subheadline");
  if (headlineEl) headlineEl.textContent = variant.headline;
  if (subheadlineEl) subheadlineEl.textContent = variant.subheadline;
}

function wireWhatsAppLinks() {
  const href = `https://wa.me/${WHATSAPP_CONFIG.number}?text=${encodeURIComponent(WHATSAPP_CONFIG.message)}`;
  document.querySelectorAll(".btn-whatsapp").forEach((el) => el.setAttribute("href", href));
}

// Header fica transparente sobre a hero e só recebe fundo/blur após rolar a página.
function wireHeaderScrollState() {
  const header = document.querySelector(".site-header");
  if (!header) return;
  const updateHeaderState = () => header.classList.toggle("is-scrolled", window.scrollY > 10);
  updateHeaderState();
  window.addEventListener("scroll", updateHeaderState, { passive: true });
}

document.addEventListener("DOMContentLoaded", () => {
  applyHeroVariant();
  wireWhatsAppLinks();
  wireHeaderScrollState();
});
