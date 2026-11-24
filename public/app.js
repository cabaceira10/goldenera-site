(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Inglês: cada texto em português e a sua tradução ---------- */
  const EN = {
    "Trabalho": "Work", "Planos": "Plans", "Clientes": "Clients", "Falar connosco": "Talk to us",
    "O teu negócio vai dar que falar.": "Your business is about to get people talking.",
    "Gravamos, publicamos e anunciamos por ti. Conteúdo, redes sociais e anúncios para negócios locais que querem mais notoriedade e mais clientes.":
      "We film, post and advertise for you. Content, social media and ads for local businesses that want more visibility and more customers.",
    "Reels com guião": "Scripted reels",
    "Escrevemos os vídeos a pensar no que os teus clientes perguntam. Nada de improviso no dia.": "We write every video around what your customers ask. No improvising on the day.",
    "Gestão de redes": "Social media management",
    "Publicamos por ti, com regularidade. A tua página nunca fica parada.": "We post for you, consistently. Your page never goes quiet.",
    "Anúncios": "Ads",
    "Levamos os teus vídeos a quem ainda não te conhece.": "We put your videos in front of people who don't know you yet.",
    "Um dia de gravação": "One shoot day",
    "Um dia por mês no teu negócio chega para um mês inteiro de conteúdo.": "One day a month at your business is enough for a whole month of content.",
    "Provavelmente já nos viste no teu feed": "You've probably seen us in your feed",
    "Uma pessoa real do teu negócio, a falar para quem está do outro lado do ecrã. É isto que faz os clientes lembrarem-se de ti.":
      "A real person from your business, talking to whoever is on the other side of the screen. That's what makes customers remember you.",
    "Dois planos. Um objetivo: mais clientes à tua porta.": "Two plans. One goal: more customers at your door.",
    "Presença": "Presence",
    "Para estares nas redes todas as semanas, com conteúdo que mostra o teu negócio como ele é.": "To show up on social media every week, with content that shows your business as it really is.",
    "8 reels por mês, com guião escrito por nós ou por ti": "8 reels a month, scripted by us or by you",
    "Um dia de gravação por mês no teu negócio": "One shoot day a month at your business",
    "Edição completa, com legendas e grafismo": "Full editing, with captions and graphics",
    "Gestão das redes sociais: publicamos por ti": "Social media management: we post for you",
    "Fotos para posts e stories, quando o teu negócio pede": "Photos for posts and stories, when your business needs them",
    "Pedir proposta": "Request a proposal",
    "Crescimento": "Growth",
    "Tudo o que está no Presença, mais anúncios que levam o teu negócio a quem ainda não te conhece.": "Everything in Presence, plus ads that take your business to people who don't know you yet.",
    "Tudo do plano Presença": "Everything in the Presence plan",
    "Criação e gestão de anúncios no Instagram e no Facebook": "Instagram and Facebook ad creation and management",
    "Anúncios a apontar para quem te pode comprar": "Ads aimed at the people who can buy from you",
    "Como funciona": "How it works",
    "<b>Conversa.</b> Falamos no WhatsApp, conhecemos o teu negócio e o que te traz clientes.": "<b>Conversation.</b> We talk on WhatsApp and get to know your business and what brings you customers.",
    "<b>Guiões.</b> Escrevemos os vídeos do mês, ou trabalhamos a partir das tuas ideias, e enviamos-tos antes de gravar.": "<b>Scripts.</b> We write the month's videos, or work from your ideas, and send them to you before the shoot.",
    "<b>Um dia de gravação.</b> Vamos ao teu negócio e gravamos tudo de uma vez.": "<b>One shoot day.</b> We come to your business and film everything in one go.",
    "<b>Publicação.</b> Editamos os vídeos e publicamos por ti ao longo do mês. Se tiveres o plano Crescimento, também criamos e gerimos os anúncios.": "<b>Publishing.</b> We edit the videos and post them for you throughout the month. On the Growth plan, we also create and manage your ads.",
    "Eventos que continuam a ser falados no dia seguinte.": "Events people keep talking about the next day.",
    "Corporativos, desportivos, lançamentos, inaugurações, festas. Seja qual for o evento, filmamos e fotografamos com o mesmo nível dos nossos reels e entregamos tudo editado, pronto a publicar enquanto ainda se fala dele.":
      "Corporate, sports, launches, openings, parties. Whatever the event, we film and photograph it to the same standard as our reels and deliver everything edited, ready to post while people are still talking about it.",
    "Vídeo do evento e reels curtos para as redes": "Event video and short reels for social media",
    "Fotografia editada": "Edited photography",
    "Entrega rápida, para publicares no momento certo": "Fast delivery, so you can post at the right moment",
    "Pedir orçamento para um evento": "Request a quote for an event",
    "O que dizem os nossos clientes": "What our clients say",
    "Negócios que confiam em nós para mostrar o que fazem.": "Businesses that trust us to show what they do.",
    "“Desde que começámos a trabalhar com a GoldenEra, a nossa página cresceu de forma consistente e, mais importante, as inscrições aumentaram. O conteúdo mensal que produzem reflete exatamente o que somos.”":
      "“Since we started working with GoldenEra, our page has grown steadily and, more importantly, enrolments went up. The monthly content they produce reflects exactly who we are.”",
    "<b>OK Condutor</b>Escola de condução": "<b>OK Condutor</b>Driving school",
    "“Ficou muito bem! Dá outra apresentação aos vídeos. Estou realmente satisfeito, e obrigado por teres isto pronto antes de sábado.”":
      "“It turned out really well! It gives the videos a whole new presentation. I'm truly happy, and thank you for having it ready before Saturday.”",
    "<b>Telmo Cordeiro</b>Dream Maker Imobiliária": "<b>Telmo Cordeiro</b>Dream Maker Real Estate",
    "Pronto para dar que falar?": "Ready to get people talking?",
    "Falar no WhatsApp": "Message us on WhatsApp"
  };

  // Guarda o português original de cada elemento que tem tradução
  const translatable = $$("h1,h2,h3,p,li,a,span,footer").filter(el => {
    const pt = el.innerHTML.trim();
    if (EN[pt] === undefined) return false;
    el.dataset.pt = pt;
    return true;
  });

  const WA = {
    pt: {
      geral: "Olá! Vi o site da GoldenEra e gostei do vosso trabalho. Tenho um negócio e queria saber mais sobre como podem ajudar-me nas redes sociais.",
      evento: "Olá! Vi o site da GoldenEra e queria pedir um orçamento para filmarem e fotografarem um evento."
    },
    en: {
      geral: "Hi! I saw the GoldenEra website and liked your work. I have a business and would like to know how you can help me on social media.",
      evento: "Hi! I saw the GoldenEra website and would like a quote for filming and photographing an event."
    }
  };
  const WA_NUMBER = "351910491092";

  let lang = "";
  try { lang = localStorage.getItem("ge-lang") || ""; } catch (e) {}
  const q = new URLSearchParams(location.search).get("lang");
  if (q === "pt" || q === "en") lang = q;
  if (!lang) lang = (navigator.languages || [navigator.language || "pt"]).some(l => l.toLowerCase().startsWith("pt")) ? "pt" : "en";

  function applyLang() {
    document.documentElement.lang = lang === "en" ? "en" : "pt-PT";
    translatable.forEach(el => { el.innerHTML = lang === "en" ? EN[el.dataset.pt] : el.dataset.pt; });
    $$("[data-lang]").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.lang === lang)));
    $$("[data-wa]").forEach(a => {
      const text = WA[lang][a.dataset.wa === "evento" ? "evento" : "geral"];
      a.href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
    });
    document.title = lang === "en"
      ? "GoldenEra · Content, social media and ads for local businesses"
      : "GoldenEra · Conteúdo, redes sociais e anúncios para negócios locais";
  }
  $$("[data-lang]").forEach(b => b.addEventListener("click", () => {
    lang = b.dataset.lang;
    try { localStorage.setItem("ge-lang", lang); } catch (e) {}
    applyLang();
  }));

  /* ---------- Telemóveis: pré-visualizações curtas e silenciosas ---------- */
  /* A fila passa devagar para a esquerda, sem fim: a lista aparece duas vezes seguidas */
  const PHONES = ["ph-atlaris", "ph-padel-hl", "ph-okc-2", "ph-fishify-promo", "ph-redbeam", "ph-mafrilaz",
                  "ph-atlaris-2", "ph-padel-1", "ph-fishify", "ph-1", "ph-padel-bolo"];
  const phoneHTML = (c, dup) => `
    <div class="phone"${dup ? ' aria-hidden="true"' : ""}><span class="phone__frame"><span class="phone__screen">
      <video muted loop playsinline preload="none" poster="assets/clips/${c}.webp" data-src="assets/clips/${c}.mp4" aria-hidden="true"></video>
    </span></span></div>`;
  $("[data-list=phones]").innerHTML = `<div class="phones__track">${PHONES.map(c => phoneHTML(c, false)).join("")}${PHONES.map(c => phoneHTML(c, true)).join("")}</div>`;

  /* Vídeos tocam quando estão à vista. Como a fila anda, carregam e arrancam uma largura
     de ecrã antes de entrarem, para já estarem a tocar quando aparecem (no telemóvel isto conta). */
  /* A fila corta o que está fora dela, por isso medimos a partir da própria fila (alargada
     uma largura para cada lado) e, à parte, se a fila está no ecrã. */
  const strip = $("[data-list=phones]");
  const vids = $$("video[data-src]");
  let stripOn = false;
  const sync = v => {
    if (v._near && stripOn) {
      if (!v.src) { v.src = v.dataset.src; v.load(); }
      if (!reduceMotion && v.paused) { v.muted = true; v.play().catch(() => {}); }
    } else if (!v.paused) v.pause();
  };
  vids.forEach(v => { v.muted = true; v.addEventListener("loadeddata", () => sync(v)); });
  /* A fila anda por animação, e alguns telemóveis não avisam quando um vídeo entra.
     Por isso vemos a posição de cada vídeo de meio em meio segundo. */
  const check = () => {
    const w = innerWidth;
    vids.forEach(v => { const r = v.getBoundingClientRect(); v._near = r.right > -w && r.left < 2 * w; sync(v); });
  };
  let timer = 0;
  const setOn = on => {
    stripOn = on;
    clearInterval(timer);
    if (on) { check(); timer = setInterval(check, 500); } else vids.forEach(sync);
  };
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(([e]) => setOn(e.isIntersecting), { rootMargin: "200px 0px" }).observe(strip);
  } else setOn(true);
  document.addEventListener("visibilitychange", () => { if (!document.hidden && stripOn) check(); });

  $("#year").textContent = new Date().getFullYear();
  applyLang();
})();
