/* =========================================================================
   main.js: render das chapas, idioma e sistema de animação.
   Conteúdo em data.js; textos da interface em i18n.js.
   ========================================================================= */
(function(){
"use strict";

var LANGS = ["pt","en","es"];
var params = new URLSearchParams(location.search);
var RM = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
var FINE = window.matchMedia("(pointer:fine)").matches;

var $  = function(s,r){ return (r||document).querySelector(s); };
var $$ = function(s,r){ return Array.prototype.slice.call((r||document).querySelectorAll(s)); };
var clamp = function(v,a,b){ return v<a?a:(v>b?b:v); };
var esc = function(s){
  return String(s).replace(/[&<>"']/g, function(c){
    return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];
  });
};

/* ---------- idioma ---------- */
function idiomaInicial(){
  var q = (params.get("lang")||"").toLowerCase();
  if (LANGS.indexOf(q) >= 0) return q;
  try { var g = localStorage.getItem("gr_lang"); if (LANGS.indexOf(g) >= 0) return g; } catch(e){}
  return "pt"; // os links vão para empresas portuguesas: arranca sempre em PT
}
var lang = idiomaInicial();

/* =========================================================================
   RENDER
   ========================================================================= */
var PLATES = ["capa","ficha","argumento","percurso","padel","competencias","prova","ferramentas","fora","contacto"];

function num(i){ return (i<10?"0":"") + i; }

function cabeca(i, key, titulo, sub){
  var t = I18N[lang];
  return '<div class="ph rv">'
    + '<div class="ph__tag" data-scramble>' + esc(t.chapa) + " " + num(i) + " · " + esc(t.plates[key]) + '</div>'
    + '<h2>' + esc(titulo) + '</h2>'
    + (sub ? '<p class="ph__sub">' + esc(sub) + '</p>' : '')
    + '</div>';
}

function render(){
  var t = I18N[lang], p = ARGUMENTO[lang], plano = COMPETENCIAS[lang];
  var assunto = encodeURIComponent(t.candidatura + ": " + PROFILE.nome);
  var mailto = "mailto:" + PROFILE.email + "?subject=" + assunto;

  document.documentElement.lang = t.htmlLang;
  document.title = PROFILE.nome + ", " + t.candidatura;

  $("#topId").innerHTML = "<b>" + esc(PROFILE.nome) + "</b> · " + esc(t.hero_kicker);
  var cta = $("#topCta"); cta.textContent = t.hero_cta_falar; cta.href = mailto;
  $$("#langs button").forEach(function(b){ b.setAttribute("aria-pressed", String(b.dataset.lang === lang)); });

  $("#rail").innerHTML = PLATES.map(function(k,i){
    return '<a href="#p' + i + '" data-r="p' + i + '">' + num(i) + " · " + esc(t.plates[k]).toUpperCase() + '</a>';
  }).join("");

  var H = [];

  /* ---- 00 capa ---- */
  H.push('<section class="plate hero" id="p0">'
    + '<canvas id="grid" aria-hidden="true"></canvas>'
    + '<div class="shell hero__in">'
      + '<div>'
        + '<div class="eyebrow rv">' + esc(t.hero_kicker) + '</div>'
        + '<h1 class="name"><span class="ln"><i>Gonçalo</i></span><span class="ln"><i class="thin">Ribeiro</i></span></h1>'
        + '<p class="lede rv" data-d="2">' + esc(t.hero_role) + '</p>'
        + '<div class="hero__cta rv" data-d="3">'
          + '<a class="btn btn--solid" id="magnet" href="' + mailto + '">' + esc(t.hero_cta_falar) + '</a>'
          + '<a class="btn" href="#p2">' + esc(t.sec_why) + '</a>'
        + '</div>'
      + '</div>'
      + '<figure class="portrait rv" data-d="1" style="margin:0">'
        + '<div class="fr"><img src="' + esc(PROFILE.foto) + '" alt="' + esc(PROFILE.nome) + '"></div>'
        + '<figcaption><span>' + esc(t.hero_meta_local) + '</span><span>' + esc(t.hero_meta_idade) + '</span></figcaption>'
      + '</figure>'
    + '</div>'
    + '<div class="shell"><div class="cue"><i></i> ' + esc(t.rolar) + '</div></div>'
  + '</section>');

  /* ---- 01 ficha ---- */
  H.push('<section class="plate" id="p1"><div class="shell">'
    + cabeca(1, "ficha", t.sec_ficha, t.sec_ficha_sub)
    + '<div class="figs">'
    + STATS.map(function(s){
        return '<div class="fig"><div class="fig__n" data-to="' + s.valor + '" data-suf="' + s.sufixo
             + '" data-raw="' + (s.raw?1:0) + '">0</div><div class="fig__l">' + esc(t[s.chave]) + '</div></div>';
      }).join("")
    + '</div>'
    + '<div class="dim"><span>' + esc(t.hero_meta_local) + '</span><i class="dim__l"></i><span>' + esc(t.hero_meta_desloc) + '</span></div>'
  + '</div></section>');

  /* ---- 02 argumento (o 1.º parágrafo acende palavra a palavra) ---- */
  H.push('<section class="plate" id="p2"><div class="shell">'
    + cabeca(2, "argumento", t.sec_why, "")
    + '<h3 class="claim rv">' + esc(p.titulo) + '</h3>'
    + '<div class="body">'
    + p.paras.map(function(x,i){
        return i === 0 ? '<p class="lit" data-lit>' + esc(x) + '</p>'
                       : '<p class="rv"' + (i>1?' data-d="1"':'') + '>' + esc(x) + '</p>';
      }).join("")
    + '</div>'
    + '<ul class="keys">'
    + p.bullets.map(function(b,i){
        return '<li class="rv" data-d="' + i + '"><b>' + num(i+1) + '</b><span>' + esc(b) + '</span></li>';
      }).join("")
    + '</ul>'
  + '</div></section>');

  /* ---- 03 percurso ---- */
  H.push('<section class="plate" id="p3"><div class="shell">'
    + cabeca(3, "percurso", t.sec_percurso, t.sec_percurso_sub)
    + '<div class="tl"><div class="tl__rule"><i></i></div>'
    + PERCURSO.map(function(j){
        var quando = j.periodo + (j.periodoFim ? j.periodoFim[lang] : "");
        return '<article class="job' + (j.destaque ? " job--now" : "") + '">'
          + '<span class="job__dot"></span>'
          + '<div class="job__hd"><span class="job__co">' + esc(j.empresa) + '</span>'
          + '<span class="job__dt">' + esc(quando) + '</span></div>'
          + '<div class="job__rl">' + esc(j.cargo[lang]) + ' · ' + esc(j.local) + '</div>'
          + '<p class="job__tx">' + esc(j.desc[lang]) + '</p>'
        + '</article>';
      }).join("")
    + '</div>'
  + '</div></section>');

  /* ---- 04 padel ---- */
  var tese = PROFILE.teseTitulo ? ('<div class="tese">'
      + '<div class="tese__k">' + esc(t.padel_tese_kicker) + '</div>'
      + '<p class="tese__t">“' + esc(PROFILE.teseTitulo) + '”</p>'
      + '<div class="tese__b">'
        + (PROFILE.teseUrl ? '<a class="btn" href="' + esc(PROFILE.teseUrl) + '" target="_blank" rel="noopener">' + esc(t.padel_tese) + '</a>' : "")
        + (PROFILE.tesePdf ? '<a class="btn" href="' + esc(PROFILE.tesePdf) + '" target="_blank" rel="noopener">' + esc(t.padel_tese_pdf) + '</a>' : "")
      + '</div></div>') : "";

  H.push('<section class="plate" id="p4"><div class="shell">'
    + cabeca(4, "padel", t.sec_padel)
    + '<div class="split"><div>'
      + '<div class="body" style="max-width:60ch">'
        + '<p class="rv">' + esc(t.padel_p1) + '</p>'
        + '<p class="rv" data-d="1">' + esc(t.padel_p2) + '</p>'
        + '<p class="rv" data-d="2">' + esc(t.padel_p3b) + '</p>'
      + '</div>'
      + tese
      + '<div class="body" style="max-width:60ch"><p class="rv">' + esc(t.padel_dados) + '</p>'
      + '<p class="rv" data-d="1">' + esc(t.padel_p3) + '</p></div>'
      + '<div class="chips"><span class="chip">' + esc(t.padel_badge_1) + '</span>'
      + '<span class="chip">' + esc(t.padel_badge_2) + '</span>'
      + '<span class="chip">' + esc(t.padel_badge_3) + '</span></div>'
    + '</div>'
    + '<div class="shot rv" data-d="1"><img src="' + esc(PROFILE.fotoPadel) + '" alt="' + esc(t.sec_padel) + '" data-par="0.06"></div>'
    + '</div>'
  + '</div></section>');

  /* ---- 05 plano (chapa fixada) ---- */
  H.push('<section class="pin" id="p5"><div class="pin__track" id="track"><div class="pin__stage">'
    + '<div class="shell" style="width:100%">'
      + '<div class="ph" style="margin-bottom:32px">'
        + '<div class="ph__tag" data-scramble>' + esc(t.chapa) + ' 05 · '
          + esc(t.plates.competencias) + '</div>'
        + '<h2 style="font-size:clamp(1.8rem,4.2vw,3rem)">'
          + esc(t.sec_comp_h2) + '</h2>'
      + '</div>'
      + '<div class="stage">'
        + '<div class="stage__num" id="nums">'
        + plano.map(function(_,i){ return '<b data-i="' + i + '">' + num(i+1) + '</b>'; }).join("")
        + '</div>'
        + '<div class="steps" id="steps">'
        + plano.map(function(f,i){
            return '<div class="step" data-i="' + i + '">'
              + '<div class="step__d">' + esc(f.f) + '</div><h3>' + esc(f.t) + '</h3>'
              + '<ul>' + f.i.map(function(x){ return '<li>' + esc(x) + '</li>'; }).join("") + '</ul>'
            + '</div>';
          }).join("")
        + '</div>'
      + '</div>'
      + '<div class="pin__bar"><i id="pinbar"></i></div>'
    + '</div>'
  + '</div></div></section>');

  /* ---- 06 prova ---- */
  H.push('<section class="plate" id="p6"><div class="shell">'
    + cabeca(6, "prova", t.sec_prova, t.sec_prova_sub)
    + '<div class="proof">'
    + PROVA.map(function(x,i){
        var dentro = '<div class="pcard__k">' + esc(x.kpi) + '</div><p>' + esc(t[x.chave]) + '</p>'
                   + (x.link ? '<span class="pcard__go">' + esc(t.prova_ver) + ' →</span>' : "");
        var attrs = 'class="pcard rv" data-d="' + i + '" data-tilt';
        return x.link ? '<a ' + attrs + ' href="' + x.link + '" target="_blank" rel="noopener">' + dentro + '</a>'
                      : '<div ' + attrs + '>' + dentro + '</div>';
      }).join("")
    + '</div>'
  + '</div></section>');

  /* ---- 07 ferramentas ---- */
  H.push('<section class="plate" id="p7"><div class="shell">'
    + cabeca(7, "ferramentas", t.sec_tools)
    + '<div class="tools rv">' + FERRAMENTAS.map(function(f){ return '<span class="tool">' + esc(f) + '</span>'; }).join("") + '</div>'
  + '</div></section>');

  /* ---- 08 fora do campo ---- */
  H.push('<section class="plate" id="p8"><div class="shell">'
    + cabeca(8, "fora", t.sec_off_h2)
    + '<div class="split">'
      + '<div class="gal">'
      + GALERIA.map(function(g,i){
          return '<figure' + (i === 0 ? ' class="tall"' : '') + '>'
            + '<img src="' + esc(g.src) + '" alt="' + esc(t[g.chave]) + '" data-par="0.05">'
            + '<figcaption>' + esc(t[g.chave]) + '</figcaption></figure>';
        }).join("")
      + '</div>'
      + '<div class="body" style="max-width:52ch">'
        + '<p class="rv">' + esc(t.off_p1) + '</p>'
        + '<p class="rv" data-d="1">' + esc(t.off_p2) + '</p>'
        + '<p class="rv" data-d="2">' + esc(t.off_p3) + '</p>'
      + '</div>'
    + '</div>'
  + '</div></section>');

  /* ---- 09 contacto ---- */
  H.push('<section class="plate end" id="p9"><div class="shell">'
    + cabeca(9, "contacto", t.sec_contacto, t.contacto_p)
    + '<a class="mail" href="' + mailto + '">' + esc(PROFILE.email) + '</a>'
    + '<div class="ends">'
      + '<a class="btn btn--solid" href="https://wa.me/' + PROFILE.telefoneRaw + '" target="_blank" rel="noopener">' + esc(t.contacto_wpp) + ' · ' + esc(PROFILE.telefone) + '</a>'
      + '<a class="btn" href="' + PROFILE.linkedin + '" target="_blank" rel="noopener">LinkedIn</a>'
      + '<a class="btn" href="' + PROFILE.instagramAcademia + '" target="_blank" rel="noopener">' + esc(t.contacto_ig) + '</a>'
      + '<button class="btn" id="pdf">' + esc(t.hero_cta_pdf) + '</button>'
    + '</div>'
    + '<div class="foot"><span></span><span>' + esc(t.footer_ano) + '</span></div>'
  + '</div></section>');

  $("#main").innerHTML = H.join("");
  $("#pdf").addEventListener("click", function(){ window.print(); });
  motor();
}

/* =========================================================================
   MOTOR DE ANIMAÇÃO
   ========================================================================= */
var ios = [];      // observadores do render actual
var refs = {};     // referências recalculadas a cada render
var loopOn = false;

function motor(){
  ios.forEach(function(o){ o.disconnect(); });
  ios = [];

  /* --- entrada das chapas.
     O recorte da galeria vive nos filhos: um alvo totalmente recortado tem
     área de interseção nula e o observador nunca dispararia. --- */
  var io = new IntersectionObserver(function(es){
    es.forEach(function(e){
      if(!e.isIntersecting) return;
      e.target.classList.add("on");
      io.unobserve(e.target);
    });
  },{ threshold:.15, rootMargin:"0px 0px -8% 0px" });
  $$(".rv, .fig, .job, .tese, .gal, .plate").forEach(function(el){ io.observe(el); });
  ios.push(io);

  /* --- nome a subir por trás da máscara --- */
  if(!RM){
    $$(".name .ln > i").forEach(function(el,i){
      el.style.transform = "translateY(102%)"; el.style.filter = "blur(7px)"; el.style.opacity = "0";
      setTimeout(function(){
        el.style.transition = "transform 1.15s cubic-bezier(.16,1,.3,1), filter .95s ease, opacity .8s ease";
        el.style.transform = "none"; el.style.filter = "none"; el.style.opacity = "1";
      }, 130 + i*135);
    });
    setTimeout(function(){ $$(".hero .rv").forEach(function(el){ el.classList.add("on"); }); }, 320);
  } else {
    $$(".hero .rv").forEach(function(el){ el.classList.add("on"); });
  }

  /* --- contadores --- */
  var ioN = new IntersectionObserver(function(es){
    es.forEach(function(e){
      if(!e.isIntersecting) return;
      ioN.unobserve(e.target);
      var el = e.target, to = +el.dataset.to, suf = el.dataset.suf || "", raw = el.dataset.raw === "1";
      var fmt = function(v){ return raw ? String(v) : v.toLocaleString("pt-PT"); };
      if(RM){ el.textContent = fmt(to) + suf; return; }
      var st = performance.now();
      (function tick(n){
        var k = clamp((n-st)/1500, 0, 1), e2 = 1 - Math.pow(1-k, 4);
        el.textContent = fmt(Math.round(to*e2)) + (k===1 ? suf : "");
        if(k<1) requestAnimationFrame(tick);
      })(st);
    });
  },{ threshold:.6 });
  $$(".fig__n").forEach(function(el){ ioN.observe(el); });
  ios.push(ioN);

  /* --- parágrafo que acende palavra a palavra --- */
  refs.lit = $$("[data-lit]").map(function(p){
    var words = p.textContent.trim().split(/\s+/);
    p.textContent = "";
    var spans = words.map(function(w,i){
      var s = document.createElement("span");
      s.textContent = w + (i < words.length-1 ? " " : "");
      p.appendChild(s); return s;
    });
    return { el:p, spans:spans, n:-1 };
  });

  /* --- etiquetas que calibram --- */
  var CH = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/·";
  var ioS = new IntersectionObserver(function(es){
    es.forEach(function(e){
      if(!e.isIntersecting) return;
      ioS.unobserve(e.target);
      if(RM) return;
      var el = e.target, real = el.textContent, len = real.length, f = 0;
      var id = setInterval(function(){
        f++;
        var lock = Math.floor(len * (f/16)), out = "";
        for(var i=0;i<len;i++){
          var c = real[i];
          out += (i < lock || c === " " || c === "·") ? c : CH[(Math.random()*CH.length)|0];
        }
        el.textContent = out;
        if(f >= 16){ clearInterval(id); el.textContent = real; }
      }, 26);
    });
  },{ threshold:.9 });
  $$("[data-scramble]").forEach(function(el){ ioS.observe(el); });
  ios.push(ioS);

  /* --- botão magnético --- */
  var mag = $("#magnet");
  if(mag && FINE && !RM){
    mag.addEventListener("pointermove", function(e){
      var r = mag.getBoundingClientRect();
      mag.style.transform = "translate(" + ((e.clientX-r.left-r.width/2)*.28) + "px," + ((e.clientY-r.top-r.height/2)*.34) + "px)";
    });
    mag.addEventListener("pointerleave", function(){
      mag.style.transition = "transform .5s cubic-bezier(.34,1.56,.64,1)";
      mag.style.transform = "none";
      setTimeout(function(){ mag.style.transition = ""; }, 500);
    });
  }

  /* --- inclinação dos cartões --- */
  if(FINE && !RM){
    $$("[data-tilt]").forEach(function(c){
      c.addEventListener("pointermove", function(e){
        var r = c.getBoundingClientRect();
        var mx = (e.clientX-r.left)/r.width - .5, my = (e.clientY-r.top)/r.height - .5;
        c.style.transform = "perspective(900px) rotateY(" + (mx*5.5) + "deg) rotateX(" + (-my*5.5) + "deg) translateY(-3px)";
      });
      c.addEventListener("pointerleave", function(){
        c.style.transition = "transform .55s cubic-bezier(.2,.8,.2,1)";
        c.style.transform = "";
        setTimeout(function(){ c.style.transition = "transform .55s cubic-bezier(.2,.8,.2,1), border-color .35s ease"; }, 550);
      });
    });
  }

  /* --- referências do laço de scroll --- */
  refs.rails  = $$("#rail a");
  refs.plates = refs.rails.map(function(a){ return document.getElementById(a.dataset.r); });
  refs.rule   = $(".tl__rule i");
  refs.track  = $("#track");
  refs.steps  = $$("#steps .step");
  refs.nums   = $$("#nums b");
  refs.pinbar = $("#pinbar");
  refs.pars   = $$("[data-par]");
  refs.phase  = -1;
  if(refs.secAnt === undefined) refs.secAnt = -1;
  /* A altura da pista define quanto scroll dura a fixação: uma janela por
     painel. Em ecrãs estreitos os painéis não cabem no ecrã fixado, por
     isso a fixação desliga e eles empilham, todos legíveis. */
  refs.pinned = !RM && window.matchMedia("(min-width:861px)").matches;
  /* Só fixa se os painéis couberem mesmo no ecrã. Mede-se o conteúdo mais
     o espaçamento real do palco, com a classe .pin--flat removida para a
     medição não sair enviesada por um render anterior. */
  var pin = $(".pin"), palco = $(".pin__stage");
  if(pin) pin.classList.remove("pin--flat");
  if(refs.pinned && palco){
    var cs = getComputedStyle(palco);
    var preciso = $(".pin__stage .shell").offsetHeight
                + parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom);
    if(preciso > window.innerHeight) refs.pinned = false;
  }
  if(pin) pin.classList.toggle("pin--flat", !refs.pinned);
  if(refs.track) refs.track.style.height = refs.pinned ? (85 * refs.steps.length) + "svh" : "";
  if(refs.pinned){
    refs.steps.forEach(function(s){ s.classList.toggle("on", s.dataset.i === "0"); });
    refs.nums.forEach(function(b){ b.classList.toggle("on", b.dataset.i === "0"); });
  } else {
    refs.steps.forEach(function(s){ s.classList.add("on"); });
    refs.nums.forEach(function(b){ b.classList.remove("on"); });
  }

  grelha();
  if(!loopOn){ loopOn = true; requestAnimationFrame(frame); }
}

/* ---------- face perfurada da pala, na capa ---------- */
var G = { dots:[], px:-999, py:-999, tx:-999, ty:-999, t0:0 };
function cores(){
  var cs = getComputedStyle(document.documentElement);
  G.dot = cs.getPropertyValue("--dot").trim() || "rgba(0,0,0,.25)";
  G.acc = cs.getPropertyValue("--accent").trim();
}
function construir(){
  if(!G.cv) return;
  var r = G.hero.getBoundingClientRect(), DPR = Math.min(2, window.devicePixelRatio||1);
  G.cv.width = r.width*DPR; G.cv.height = r.height*DPR;
  G.cv.style.width = r.width+"px"; G.cv.style.height = r.height+"px";
  G.cx.setTransform(DPR,0,0,DPR,0,0);
  G.dots = [];
  var gap = r.width < 700 ? 30 : 34;
  for(var y=gap/2; y<r.height; y+=gap)
    for(var x=gap/2; x<r.width; x+=gap) G.dots.push([x,y]);
}
function grelha(){
  G.cv = $("#grid"); G.hero = $("#p0");
  if(!G.cv) return;
  G.cx = G.cv.getContext("2d");
  G.t0 = performance.now();
  cores(); construir();
  if(RM){
    G.cx.fillStyle = G.dot; G.cx.globalAlpha = .45;
    G.dots.forEach(function(d){ G.cx.beginPath(); G.cx.arc(d[0],d[1],1,0,6.2832); G.cx.fill(); });
    return;
  }
  G.hero.addEventListener("pointermove", function(e){
    var r = G.hero.getBoundingClientRect();
    G.tx = e.clientX-r.left; G.ty = e.clientY-r.top;
    if(G.px < -500){ G.px = G.tx; G.py = G.ty; }
  });
  G.hero.addEventListener("pointerleave", function(){ G.tx = -999; G.ty = -999; G.t0 = performance.now(); });
}
function pintar(now){
  if(RM || !G.cv || !G.cv.isConnected) return;
  var r = G.hero.getBoundingClientRect();
  if(r.bottom < 0) return;
  G.px += (G.tx-G.px)*.085; G.py += (G.ty-G.py)*.085;
  var vx = G.px, vy = G.py;
  if(G.tx < -500){ // sem rato: um ponto virtual que respira sozinho
    var s = (now-G.t0)/1000;
    vx = r.width*(0.5 + 0.34*Math.cos(s*0.42));
    vy = r.height*(0.5 + 0.30*Math.sin(s*0.31));
  }
  G.cx.clearRect(0,0,r.width,r.height);
  var R = Math.min(r.width,r.height)*0.42;
  for(var i=0;i<G.dots.length;i++){
    var dx = G.dots[i][0]-vx, dy = G.dots[i][1]-vy;
    var k = clamp(1 - Math.sqrt(dx*dx+dy*dy)/R, 0, 1);
    G.cx.beginPath();
    G.cx.arc(G.dots[i][0], G.dots[i][1], 0.85 + k*k*2.5, 0, 6.2832);
    G.cx.fillStyle = k > .34 ? G.acc : G.dot;
    G.cx.globalAlpha = k > .34 ? (0.18 + k*0.62) : 0.5;
    G.cx.fill();
  }
  G.cx.globalAlpha = 1;
}

/* ---------- laço único de scroll ---------- */
function frame(now){
  var vh = window.innerHeight, doc = document.documentElement;
  var max = doc.scrollHeight - vh, sy = window.scrollY || doc.scrollTop;

  $("#bar").style.width = (max>0 ? (sy/max)*100 : 0) + "%";
  $("#top").classList.toggle("solid", sy > 40);

  var cur = 0, i;
  for(i=0;i<refs.plates.length;i++)
    if(refs.plates[i] && refs.plates[i].getBoundingClientRect().top <= vh*0.42) cur = i;
  for(i=0;i<refs.rails.length;i++)
    refs.rails[i].setAttribute("aria-current", i === cur ? "true" : "false");
  if(cur !== refs.secAnt){
    refs.secAnt = cur;
    if(window.Bola) Bola.kick();
  }
  if(window.Bola) Bola.scroll(sy);

  if(refs.rule){
    var tl = refs.rule.parentNode.getBoundingClientRect();
    refs.rule.style.height = (clamp((vh*0.78 - tl.top)/(tl.height + vh*0.18), 0, 1)*100) + "%";
  }

  if(!RM){
    refs.lit.forEach(function(o){
      var r = o.el.getBoundingClientRect();
      var n = Math.round(clamp((vh*0.86 - r.top)/(r.height + vh*0.30), 0, 1) * o.spans.length);
      if(n === o.n) return;
      if(n > o.n){ for(var i=o.n+1;i<=n && i<o.spans.length;i++) if(o.spans[i]) o.spans[i].classList.add("on"); }
      else { for(var j=o.n;j>n;j--) if(o.spans[j]) o.spans[j].classList.remove("on"); }
      o.n = n;
    });
    refs.pars.forEach(function(im){
      var r = im.getBoundingClientRect();
      if(r.bottom < -200 || r.top > vh+200) return;
      var c = (r.top + r.height/2 - vh/2)/vh;
      im.style.transform = "scale(1.14) translateY(" + (c * -parseFloat(im.dataset.par) * 100) + "px)";
    });
  }

  if(refs.track && refs.pinned){
    var tr = refs.track.getBoundingClientRect(), span = refs.track.offsetHeight - vh;
    var kp = clamp((-tr.top)/(span>0?span:1), 0, 1);
    if(refs.pinbar) refs.pinbar.style.width = (kp*100) + "%";
    var nfases = refs.steps.length;
    var ph = Math.min(nfases-1, Math.floor(kp*nfases));
    if(ph !== refs.phase){
      refs.phase = ph;
      refs.steps.forEach(function(s){ s.classList.toggle("on", +s.dataset.i === ph); });
      refs.nums.forEach(function(b){ b.classList.toggle("on", +b.dataset.i === ph); });
    }
  }

  pintar(now);
  requestAnimationFrame(frame);
}

/* ---------- cursor ---------- */
function cursor(){
  var ring = $("#ring");
  if(!ring || !FINE || RM) return;
  /* o retrato vem dos dados para o build de ficheiro único o poder embeber */
  var foto = document.createElement("img");
  foto.src = PROFILE.fotoCursor; foto.alt = "";
  ring.appendChild(foto);
  var rx=0, ry=0, tx=0, ty=0, on=false;
  window.addEventListener("pointermove", function(e){
    tx = e.clientX; ty = e.clientY;
    if(!on){ rx=tx; ry=ty; on=true; ring.style.opacity=".85"; }
  });
  document.addEventListener("pointerover", function(e){
    if(e.target.closest("a, button, [data-tilt]")){ ring.style.width="46px"; ring.style.height="46px"; }
  });
  document.addEventListener("pointerout", function(e){
    if(e.target.closest("a, button, [data-tilt]")){ ring.style.width="26px"; ring.style.height="26px"; }
  });
  (function loop(){
    rx += (tx-rx)*.19; ry += (ty-ry)*.19;
    ring.style.transform = "translate(" + (rx-ring.offsetWidth/2) + "px," + (ry-ring.offsetHeight/2) + "px)";
    requestAnimationFrame(loop);
  })();
}

/* =========================================================================
   ARRANQUE
   ========================================================================= */
function trocarIdioma(novo){
  if(LANGS.indexOf(novo) < 0 || novo === lang) return;
  lang = novo;
  try { localStorage.setItem("gr_lang", lang); } catch(e){}
  var y = window.scrollY;
  render();
  requestAnimationFrame(function(){ window.scrollTo({ top:y, behavior:"instant" }); });
}

/* API para o build de ficheiro único (seletor de empresa no preview) */
window.__cv = { actual: function(){ return { lang:lang }; }, setLang: trocarIdioma };

document.addEventListener("DOMContentLoaded", function(){
  cursor();
  if(window.Bola) Bola.init();
  $("#langs").addEventListener("click", function(e){
    var b = e.target.closest("button[data-lang]");
    if(b) trocarIdioma(b.dataset.lang);
  });
  window.addEventListener("resize", construir);
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function(){
    setTimeout(cores, 60);
  });
  render();
});
})();
