# Gonçalo Ribeiro — CV one-scroller

Site de candidatura em página única, adaptado a cada empresa e traduzível para
**PT / EN / ES** com um botão no topo.

---

## Como funciona

Um único site. A empresa é escolhida pelo link que envias:

| Empresa | Link a enviar |
|---|---|
| QUAD | `.../index.html?e=quad` |
| CORK Padel | `.../index.html?e=cork` |
| VEKT | `.../index.html?e=vekt` |
| VOLT Padel | `.../index.html?e=volt` |
| Genérico | `.../index.html` |

Cada versão muda: a cor de destaque, o nome no topo, a secção **"Porquê eu, porquê aqui"**,
o **plano dos primeiros 90 dias** e o assunto do email do botão de contacto.

Podes forçar o idioma inicial: `?e=volt&lang=en` (`pt`, `en`, `es`).
Sem esse parâmetro, **arranca sempre em português** — o botão do topo troca a qualquer momento.

---

## Ver o site localmente

```bash
npx http-server -p 8080     # depois abre http://localhost:8080
```

(Também funciona abrindo o `index.html` directamente no browser.)

---

## O que falta pores

### 1. Fotografias — `assets/img/`

Enquanto não existirem, aparece um retângulo tracejado a dizer onde falta o ficheiro.

| Ficheiro | O que é |
|---|---|
| `assets/img/perfil.jpg` | Retrato (quadrado, mín. 800×800) |
| `assets/img/padel.jpg` | Tu em campo (vertical 4:5) |
| `assets/img/rockin1000.jpg` | Rockin'1000 (vertical 4:5) |

### 2. Tese

O link para o RCAAP já está ligado. Se quiseres o título exato no texto,
preenche `teseTitulo` em `assets/js/data.js`.
Se tiveres o PDF, mete-o em `assets/docs/tese.pdf`.

### 3. Logótipos das marcas — `assets/logos/` (opcional)

Não incluí logótipos de terceiros. Se quiseres um no topo de cada versão,
guarda o ficheiro e preenche `logo:` na empresa respetiva em `data.js`.

---

## Como editar

Todo o conteúdo está em dois ficheiros. Não precisas de tocar em HTML.

- **`assets/js/data.js`** — dados pessoais, percurso, números, ferramentas e as empresas
  (texto do pitch, plano 90 dias, cores).
- **`assets/js/i18n.js`** — todos os textos fixos da interface, nos três idiomas.

### Adicionar uma empresa nova

Em `data.js`, copia um bloco de `EMPRESAS` e muda a chave:

```js
padelnuestro: {
  nome: "Padel Nuestro", nomeCurto: "PN",
  accent: "#E30613", accent2: "#FF6B6B", logo: null, site: null,
  pitch: { pt:{titulo:"…", paras:["…"], bullets:["…"]}, en:{…}, es:{…} },
  plano: { pt:[{f:"Dias 1—30", t:"…", i:["…"]}], en:[…], es:[…] }
}
```

O link passa a ser `?e=padelnuestro`.

> As cores de cada marca são uma aproximação minha. Se tiveres os códigos
> oficiais, troca `accent` / `accent2`.

---

## Publicar

**GitHub Pages** — Settings → Pages → Source: branch `main`, pasta `/root`.
Fica em `https://<utilizador>.github.io/<repo>/?e=quad`.

**Netlify / Vercel** — arrasta a pasta. Não há build.

---

## PDF

O botão "Guardar em PDF" abre a impressão do browser. Há uma folha de estilos
de impressão que converte o site para fundo branco e tinta preta, corta a
navegação e as animações. Escolhe "Guardar como PDF" no diálogo.
