/* =========================================================================
   build-single.js — junta o site num único ficheiro HTML autónomo.
   CSS e JS embebidos, imagens convertidas em data URI, e um seletor de
   empresa para percorrer as quatro versões sem trocar de link.

   Uso:  node build/build-single.js            -> dist/preview.html
   Requer o Playwright (usado só para redimensionar/recodificar as imagens).
   ========================================================================= */
const fs = require("fs");
const path = require("path");
const { chromium } = require("/opt/node22/lib/node_modules/playwright");

const ROOT = path.join(__dirname, "..");
const R = f => fs.readFileSync(path.join(ROOT, f), "utf8");

/* imagens: caminho no site -> [largura máxima, qualidade] */
const IMGS = {
  "assets/img/perfil.jpg":         [620, 0.82],
  "assets/img/padel.jpg":          [620, 0.80],
  "assets/img/rockin-founder.jpg": [540, 0.72],
  "assets/img/rockin-estadio.jpg": [900, 0.70],
  "assets/img/rockin-noite.jpg":   [900, 0.70],
};

(async () => {
  const b = await chromium.launch();
  const page = await b.newPage();

  const uris = {};
  for (const [rel, [maxW, q]] of Object.entries(IMGS)) {
    const src = "data:image/jpeg;base64," + fs.readFileSync(path.join(ROOT, rel)).toString("base64");
    uris[rel] = await page.evaluate(async ([u, maxW, q]) => {
      const img = await new Promise((res, rej) => {
        const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = u;
      });
      const s = Math.min(1, maxW / img.naturalWidth);
      const c = document.createElement("canvas");
      c.width = Math.round(img.naturalWidth * s);
      c.height = Math.round(img.naturalHeight * s);
      const x = c.getContext("2d"); x.imageSmoothingQuality = "high";
      x.drawImage(img, 0, 0, c.width, c.height);
      return c.toDataURL("image/jpeg", q);
    }, [src, maxW, q]);
  }
  await b.close();

  let data = R("assets/js/data.js");
  for (const [rel, uri] of Object.entries(uris)) data = data.split('"' + rel + '"').join(JSON.stringify(uri));
  // o PDF da tese não viaja no ficheiro único; fica só o link do RCAAP
  data = data.replace(/tesePdf:\s*"[^"]*"/, "tesePdf: null");

  const picker = `
<div class="pick" id="pick">
  <div class="pick__l" id="pickL">Empresa</div>
  <div class="pick__row" id="pickRow"></div>
</div>
<script>
(function(){
  var NOMES = { default:"Genérico", quad:"QUAD", cork:"CORK", vekt:"VEKT", volt:"VOLT" };
  function pinta(){
    var cur = window.__cv.actual();
    document.getElementById("pickL").textContent = I18N[cur.lang].troca_empresa;
    document.getElementById("pickRow").innerHTML = window.__cv.empresas().map(function(k){
      return '<button data-e="'+k+'" aria-pressed="'+(k===cur.empresa)+'">'+(NOMES[k]||k)+'</button>';
    }).join("");
  }
  document.getElementById("pickRow").addEventListener("click", function(e){
    var b = e.target.closest("button[data-e]");
    if(b){ window.__cv.setEmpresa(b.dataset.e); pinta(); }
  });
  document.getElementById("langs").addEventListener("click", function(){ setTimeout(pinta, 0); });
  window.addEventListener("DOMContentLoaded", function(){ window.__cv.setEmpresa("quad"); pinta(); });
})();
<\/script>`;

  const html = R("index.html");
  const head = html.split("<head>")[1].split("</head>")[0];
  const keep = head.split("\n")
    .filter(l => /fonts\.googleapis|preconnect|rel="icon"/.test(l))
    .join("\n");
  // no ficheiro único o título nomeia o preview; o main.js reescreve-o
  // por empresa assim que arranca
  const titulo = "<title>Quatro Marcas, Um Currículo</title>";
  const body = html.split("<body>")[1].split("</body>")[0]
    .replace(/<script src="assets\/js\/[^"]+"><\/script>/g, "")
    .trim();

  const out = [
    titulo,
    keep,
    "<style>\n" + R("assets/css/style.css") + "\n</style>",
    body,
    "<script>\n" + data + "\n<\/script>",
    "<script>\n" + R("assets/js/i18n.js") + "\n<\/script>",
    "<script>\n" + R("assets/js/main.js") + "\n<\/script>",
    picker
  ].join("\n\n");

  fs.mkdirSync(path.join(ROOT, "dist"), { recursive: true });
  fs.writeFileSync(path.join(ROOT, "dist/preview.html"), out);
  console.log("dist/preview.html", Math.round(out.length / 1024) + "KB");
})();
