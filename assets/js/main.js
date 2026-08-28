/* =========================================================================
   main.js — render, idioma, empresa e animações
   ========================================================================= */

const LANGS = ["pt","en","es"];
const params = new URLSearchParams(location.search);

/* ---- Empresa a partir de ?e=quad|cork|vekt|volt ---- */
const empresaKey = (params.get("e") || "default").toLowerCase();
const EMPRESA = EMPRESAS[empresaKey] || EMPRESAS.default;

/* ---- Idioma: ?lang= > escolha guardada > PT.
   O idioma do browser NÃO é usado: estes links vão para empresas
   portuguesas e o arranque deve ser sempre em português. ---- */
function idiomaInicial(){
  const q = (params.get("lang") || "").toLowerCase();
  if (LANGS.includes(q)) return q;
  try { const s = localStorage.getItem("gr_lang"); if (LANGS.includes(s)) return s; } catch(e){}
  return "pt";
}
let lang = idiomaInicial();

/* ---- Utilitários ---- */
const $  = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));
const esc = s => String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const comEmpresa = (txt) => String(txt).replace(/\{empresa\}/g, EMPRESA.nome);

/* Imagem com fallback para placeholder tracejado.
   O texto do placeholder viaja em data-ph e o handler é ligado em JS
   (um onerror inline partia-se com apóstrofos, ex.: Rockin'1000). */
function foto(src, alt, phHtml){
  if (!src) return `<div class="ph">${phHtml}</div>`;
  return `<img src="${esc(src)}" alt="${esc(alt)}" loading="lazy" data-ph="${esc(phHtml)}">`;
}

function ligarFallbackImagens(){
  $$("img[data-ph]").forEach(img => {
    const falhou = () => {
      if (!img.parentNode) return;
      const d = document.createElement("div");
      d.className = "ph";
      d.innerHTML = img.dataset.ph;
      img.replaceWith(d);
    };
    img.addEventListener("error", falhou, { once:true });
    if (img.complete && img.naturalWidth === 0) falhou();
  });
}

/* ---- Aplicar cores da empresa ---- */
function aplicarMarca(){
  const r = document.documentElement.style;
  r.setProperty("--accent", EMPRESA.accent);
  r.setProperty("--accent2", EMPRESA.accent2);
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", EMPRESA.accent);
}

/* =========================================================================
   RENDER
   ========================================================================= */
function render(){
  const t = I18N[lang];
  const p = EMPRESA.pitch[lang];
  const plano = EMPRESA.plano[lang];

  document.documentElement.lang = t.htmlLang;
  document.title = `${PROFILE.nome} — ${t.candidatura} ${EMPRESA.nomeCurto}`;

  /* --- topbar --- */
  $("#topbarId").innerHTML = `<b>${esc(PROFILE.nome)}</b> · ${esc(t.candidatura)} ${esc(EMPRESA.nomeCurto)}`;
  $("#ctaTop").textContent = t.hero_cta_falar;
  $("#ctaTop").href = `mailto:${PROFILE.email}?subject=${encodeURIComponent(t.candidatura + " — " + PROFILE.nome + " — " + EMPRESA.nome)}`;
  $$("#langs button").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.lang === lang)));

  /* --- hero --- */
  $("#hero").innerHTML = `
    <div class="hero__glow"></div>
    <div class="wrap hero__grid">
      <div class="rv">
        <div class="kicker">${esc(comEmpresa(t.hero_kicker))}</div>
        <h1>Gonçalo<span class="l2">Ribeiro</span></h1>
        <p class="hero__role">${esc(t.hero_role)}</p>
        <div class="hero__meta">
          <span>${esc(t.hero_meta_local)}</span>
          <span>${esc(t.hero_meta_idade)}</span>
          <span>${esc(t.hero_meta_desloc)}</span>
        </div>
        <div class="hero__cta">
          <a class="btn btn--fill" href="mailto:${PROFILE.email}?subject=${encodeURIComponent(t.candidatura + " — " + PROFILE.nome + " — " + EMPRESA.nome)}">${esc(t.hero_cta_falar)}</a>
          <a class="btn" href="${PROFILE.linkedin}" target="_blank" rel="noopener">${esc(t.hero_cta_linkedin)}</a>
          <button class="btn" onclick="window.print()">${esc(t.hero_cta_pdf)}</button>
        </div>
      </div>
      <div class="hero__photo rv">
        <div class="frame">${foto(PROFILE.foto, PROFILE.nome, t.hero_foto_ph)}</div>
        <div class="quote">“${esc(t.hero_quote)}”<br><span style="color:var(--ink-faint)">— ${esc(t.hero_quote_autor)}</span></div>
      </div>
    </div>`;

  /* --- marquee (duplicado para loop contínuo) --- */
  const palavras = t.marquee.concat(t.marquee).map(w => `<span>${esc(w)}</span>`).join("");
  $("#marquee").innerHTML = `<div class="marquee__track">${palavras}</div>`;

  /* --- stats --- */
  $("#stats").innerHTML = STATS.map(s => `
    <div class="stat rv">
      <div class="stat__v" data-alvo="${s.valor}" data-sufixo="${s.sufixo}" data-raw="${s.raw?1:0}">0</div>
      <div class="stat__l">${esc(t[s.chave])}</div>
    </div>`).join("");

  /* --- porquê / pitch --- */
  $("#why").innerHTML = `
    <div class="wrap">
      <div class="sec-head rv">
        <span class="sec-num">01 / ${esc(t.nav.why)}</span>
        <h2>${esc(t.sec_why)}</h2>
        <p>${esc(comEmpresa(t.sec_why_sub))}</p>
      </div>
      <div class="pitch rv">
        <h3>${esc(p.titulo)}</h3>
        ${p.paras.map(x => `<p>${esc(x)}</p>`).join("")}
        <ul>${p.bullets.map(b => `<li>${esc(b)}</li>`).join("")}</ul>
      </div>
    </div>`;

  /* --- percurso --- */
  $("#percurso").innerHTML = `
    <div class="wrap">
      <div class="sec-head rv">
        <span class="sec-num">02 / ${esc(t.nav.percurso)}</span>
        <h2>${esc(t.sec_percurso)}</h2>
        <p>${esc(t.sec_percurso_sub)}</p>
      </div>
      <div class="timeline">
        ${PERCURSO.map(j => `
          <div class="job rv ${j.destaque ? "job--hot" : ""}">
            <div class="job__top">
              <span class="job__co">${esc(j.empresa)}</span>
              <span class="job__when">${esc(j.periodo)}${j.periodoFim ? esc(j.periodoFim[lang]) : ""} · ${esc(j.local)}</span>
            </div>
            <div class="job__role">${esc(j.cargo[lang])}</div>
            <p class="job__desc">${esc(j.desc[lang])}</p>
            <div class="tags">${j.tags.map(x => `<span class="tag">${esc(x)}</span>`).join("")}</div>
          </div>`).join("")}
      </div>
    </div>`;

  /* --- padel --- */
  const teseBloco = PROFILE.teseTitulo ? `
      <div class="tese">
        <div class="tese__k">${esc(t.padel_tese_kicker)}</div>
        <h4>“${esc(PROFILE.teseTitulo)}”</h4>
        <div class="tese__btns">
          ${PROFILE.teseUrl ? `<a class="btn" href="${PROFILE.teseUrl}" target="_blank" rel="noopener">${esc(t.padel_tese)}</a>` : ""}
          ${PROFILE.tesePdf ? `<a class="btn" href="${PROFILE.tesePdf}" target="_blank" rel="noopener">${esc(t.padel_tese_pdf)}</a>` : ""}
        </div>
      </div>` : "";
  $("#padel").innerHTML = `
    <div class="wrap">
      <div class="sec-head rv">
        <span class="sec-num">03 / ${esc(t.nav.padel)}</span>
        <h2>${esc(t.sec_padel)}</h2>
      </div>
      <div class="split">
        <div class="rv">
          <p>${esc(t.padel_p1)}</p>
          <p>${esc(t.padel_p2)}</p>
          ${teseBloco}
          <p>${esc(t.padel_dados)}</p>
          <p>${esc(t.padel_p3)}</p>
          <div class="badges">
            <span class="badge">${esc(t.padel_badge_1)}</span>
            <span class="badge">${esc(t.padel_badge_2)}</span>
            <span class="badge">${esc(t.padel_badge_3)}</span>
          </div>
        </div>
        <div class="split__media rv"><div class="frame">${foto(PROFILE.fotoPadel, "Padel", t.padel_foto_ph)}</div></div>
      </div>
    </div>`;

  /* --- prova --- */
  $("#prova").innerHTML = `
    <div class="wrap">
      <div class="sec-head rv">
        <span class="sec-num">04 / ${esc(t.nav.prova)}</span>
        <h2>${esc(t.sec_prova)}</h2>
        <p>${esc(t.sec_prova_sub)}</p>
      </div>
      <div class="cards">
        ${PROVA.map(x => {
          const inner = `<div class="card__kpi">${esc(x.kpi)}</div><p>${esc(t[x.chave])}</p>
            ${x.link ? `<span class="card__link">${esc(t.prova_ver)} →</span>` : ""}`;
          return x.link
            ? `<a class="card rv" href="${x.link}" target="_blank" rel="noopener">${inner}</a>`
            : `<div class="card rv">${inner}</div>`;
        }).join("")}
      </div>
    </div>`;

  /* --- plano 90 dias --- */
  $("#plano").innerHTML = `
    <div class="wrap">
      <div class="sec-head rv">
        <span class="sec-num">05 / ${esc(t.nav.plano)}</span>
        <h2>${esc(t.sec_plano)}</h2>
        <p>${esc(comEmpresa(t.sec_plano_sub))}</p>
      </div>
      <div class="plan">
        ${plano.map((f,i) => `
          <div class="phase rv">
            <div class="phase__n">${i+1}</div>
            <div class="phase__f">${esc(f.f)}</div>
            <h4>${esc(f.t)}</h4>
            <ul>${f.i.map(x => `<li>${esc(x)}</li>`).join("")}</ul>
          </div>`).join("")}
      </div>
    </div>`;

  /* --- ferramentas --- */
  $("#tools").innerHTML = `
    <div class="wrap">
      <div class="sec-head rv">
        <span class="sec-num">06 / ${esc(t.sec_tools)}</span>
        <h2>${esc(t.sec_tools)}</h2>
      </div>
      <div class="tools rv">${FERRAMENTAS.map(f => `<span class="tool">${esc(f)}</span>`).join("")}</div>
    </div>`;

  /* --- fora do campo --- */
  $("#off").innerHTML = `
    <div class="wrap">
      <div class="sec-head rv">
        <span class="sec-num">07 / ${esc(t.sec_off)}</span>
        <h2>${esc(t.sec_off)}</h2>
      </div>
      <div class="split split--rev">
        <div class="rv">
          <div class="gal">
            ${GALERIA.map(g => `
              <figure class="${g.classe}">
                <img src="${esc(g.src)}" alt="${esc(t[g.chave])}" loading="lazy">
                <figcaption>${esc(t[g.chave])}</figcaption>
              </figure>`).join("")}
          </div>
        </div>
        <div class="rv">
          <h3>${esc(t.off_h)}</h3>
          <p>${esc(t.off_p1)}</p>
          <p>${esc(t.off_p2)}</p>
          <p>${esc(t.off_p3)}</p>
        </div>
      </div>
    </div>`;

  /* --- contacto --- */
  $("#contacto").innerHTML = `
    <div class="wrap">
      <div class="sec-head rv">
        <span class="sec-num">08 / ${esc(t.nav.contacto)}</span>
        <h2>${esc(t.sec_contacto)}</h2>
        <p>${esc(t.contacto_p)}</p>
      </div>
      <div class="rv">
        <a class="mailto" href="mailto:${PROFILE.email}?subject=${encodeURIComponent(t.candidatura + " — " + PROFILE.nome + " — " + EMPRESA.nome)}">${esc(PROFILE.email)}</a>
        <div class="contact__links">
          <a class="btn btn--fill" href="https://wa.me/${PROFILE.telefoneRaw}" target="_blank" rel="noopener">${esc(t.contacto_wpp)} · ${esc(PROFILE.telefone)}</a>
          <a class="btn" href="${PROFILE.linkedin}" target="_blank" rel="noopener">LinkedIn</a>
          <a class="btn" href="${PROFILE.instagramAcademia}" target="_blank" rel="noopener">${esc(t.contacto_ig)}</a>
          <button class="btn" onclick="window.print()">${esc(t.hero_cta_pdf)}</button>
        </div>
      </div>
      <footer>
        <span>${esc(comEmpresa(t.footer_feito))}</span>
        <span>${esc(t.footer_ano)}</span>
      </footer>
    </div>`;

  ligarFallbackImagens();
  ligarAnimacoes();
}

/* =========================================================================
   ANIMAÇÕES
   ========================================================================= */
let obs, obsStats;

function ligarAnimacoes(){
  if (obs) obs.disconnect();
  if (obsStats) obsStats.disconnect();

  obs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting){
        setTimeout(() => e.target.classList.add("in"), i * 70);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: .12, rootMargin: "0px 0px -60px 0px" });
  $$(".rv").forEach(el => obs.observe(el));

  obsStats = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting){ contar(e.target); obsStats.unobserve(e.target); }
    });
  }, { threshold: .4 });
  $$(".stat__v").forEach(el => obsStats.observe(el));
}

function contar(el){
  const alvo = Number(el.dataset.alvo);
  const sufixo = el.dataset.sufixo || "";
  const raw = el.dataset.raw === "1";
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches){
    el.textContent = (raw ? alvo : alvo.toLocaleString("pt-PT")) + sufixo;
    return;
  }
  const dur = 1400, t0 = performance.now();
  (function passo(now){
    const k = Math.min(1, (now - t0) / dur);
    const eased = 1 - Math.pow(1 - k, 3);
    const v = Math.round(alvo * eased);
    el.textContent = (raw ? v : v.toLocaleString("pt-PT")) + (k === 1 ? sufixo : "");
    if (k < 1) requestAnimationFrame(passo);
  })(t0);
}

/* --- barra de progresso + topbar sólida --- */
function onScroll(){
  const h = document.documentElement;
  const max = h.scrollHeight - h.clientHeight;
  const pct = max > 0 ? (h.scrollTop / max) * 100 : 0;
  $("#progress").style.width = pct + "%";
  $("#topbar").classList.toggle("solid", h.scrollTop > 60);
}

/* =========================================================================
   ARRANQUE
   ========================================================================= */
function trocarIdioma(novo){
  if (!LANGS.includes(novo) || novo === lang) return;
  lang = novo;
  try { localStorage.setItem("gr_lang", lang); } catch(e){}
  const y = window.scrollY;
  render();
  // o re-render substitui o DOM; devolve o leitor ao sítio onde estava
  // behavior:"instant" ignora o scroll-behavior:smooth do CSS
  requestAnimationFrame(() => window.scrollTo({ top: y, behavior: "instant" }));
}

document.addEventListener("DOMContentLoaded", () => {
  aplicarMarca();
  $("#langs").addEventListener("click", (e) => {
    const b = e.target.closest("button[data-lang]");
    if (b) trocarIdioma(b.dataset.lang);
  });
  render();
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
});
