# Gonçalo Ribeiro, currículo one-scroller

Site de candidatura em página única, traduzível para **PT / EN / ES** com um
botão no topo.

---

## Ver o site

```bash
npx http-server -p 8080     # depois abre http://localhost:8080
```

Também funciona abrindo o `index.html` diretamente no browser.
Para forçar o idioma inicial: `?lang=en` (`pt`, `en`, `es`). Sem esse
parâmetro arranca sempre em português.

---

## A linguagem visual

Um dossiê. Cada secção é uma **Parte** numerada, com carril de navegação à
esquerda e linhas de cota. Archivo em largura expandida nos títulos,
Newsreader serifada nos corpos de texto, IBM Plex Mono nas etiquetas.

Dois temas, papel claro e fundo escuro, que seguem a preferência de quem
abre. O acento é definido por tema no `style.css`, porque o mesmo verde não
tem contraste suficiente nos dois fundos.

### As bolas de fundo

`assets/js/bola.js` desenha três bolas de padel numa camada WebGL atrás do
conteúdo. A esfera é traçada por raio no fragment shader, com a textura de
feltro e a costura coladas à superfície, por isso roda mesmo em três
dimensões. Uma fotografia plana rodada leria como um autocolante a girar.

As bolas aproximam-se da câmara, nascem nas margens e derivam para fora, de
modo a passarem ao lado do texto. A cada mudança de secção levam um impulso
que lhes muda a trajetória e acelera a rotação, e o scroll acelera-as.
Dissolvem-se ao aproximar-se, como um primeiro plano fora de foco.

A camada mede o seu próprio desempenho: se a máquina não aguentar, baixa a
resolução e, em último caso, desliga-se. Com `prefers-reduced-motion` desenha
um único fotograma parado.

### Animações, uma por parte

| Parte | O que faz |
|---|---|
| Capa | Grelha de furos que reage ao cursor. O nome sobe por trás de uma máscara. |
| Números | Contadores a subir com uma linha a varrer por baixo. |
| Porquê eu | O primeiro parágrafo acende palavra a palavra conforme rolas. |
| Percurso | A régua desenha-se ao ritmo do scroll e os marcadores saltam. |
| Padel | O cartão da tese imprime-se pela lateral. |
| Competências | Secção fixada: o painel prende-se ao ecrã e as três fases trocam. |
| Portefólio | Cartões inclinam-se em 3D na direção do cursor. |
| Fora do campo | Fotos revelam-se em cascata, com parallax nas molduras. |

Em todas as partes, a régua de acento varre o topo e o título entra com um
recorte. O cursor arrasta um retrato pequeno.

Com `prefers-reduced-motion` tudo isto desliga e a página fica estática e
legível.

---

## Como editar

O conteúdo está em dois ficheiros. Não precisas de tocar em HTML.

- **`assets/js/data.js`**: dados pessoais, percurso, números, ferramentas,
  o argumento da Parte 02 e as competências da Parte 05.
- **`assets/js/i18n.js`**: todos os textos fixos da interface, nos três
  idiomas. As três línguas têm de ter exatamente as mesmas chaves.

### Fotografias, `assets/img/`

| Ficheiro | O que é |
|---|---|
| `perfil.jpg` | Retrato da capa |
| `cursor.jpg` | Recorte do rosto que segue o rato |
| `padel.jpg` | Em campo |
| `rockin-founder.jpg`, `rockin-estadio.jpg`, `rockin-noite.jpg` | Rockin'1000 |

Se um ficheiro faltar, aparece um retângulo tracejado em vez de uma imagem
partida.

### Tese

O PDF está em `assets/docs/tese.pdf` e o título e o link do RCAAP estão no
`data.js`.

---

## Build de ficheiro único

Para partilhar sem alojamento:

```bash
node build/build-single.js     # -> dist/preview.html
```

Junta CSS, JS e imagens (em data URI) num só ficheiro autónomo.

---

## Publicar num domínio próprio

O site é estático: um `index.html` e a pasta `assets`. Não há build, não há
servidor. Funciona em qualquer alojamento, e todos os caminhos são
relativos, por isso corre tanto na raiz de um domínio como num subcaminho.

### GitHub Pages, já preparado

O workflow `.github/workflows/pages.yml` reúne o `index.html` e a pasta
`assets` e publica-os a cada push. Falta um passo que só o dono do
repositório pode dar, porque a API que cria o site Pages não aceita o token
do workflow:

> **Settings → Pages → Source: `GitHub Actions` → Save**

Feito isso, corre o workflow no separador Actions (ou faz qualquer push) e o
site fica em:

```
https://goncaloribeiro99-svg.github.io/claude/
```

A partir daí cada push republica sozinho.

### Domínio próprio

Com um domínio comprado, em Settings → Pages → Custom domain. Depois é
preciso mudar duas linhas no `index.html`, as etiquetas `og:url` e
`og:image`, que têm de apontar para o domínio novo em absoluto: os leitores
de pré-visualização não resolvem caminhos relativos de forma fiável.

### Outro alojamento

Netlify, Vercel, Cloudflare Pages ou qualquer servidor estático: arrasta a
pasta com o `index.html` e o `assets`. Nada mais é preciso.

## O currículo em PDF

Está em `assets/docs/` e o caminho vive no `data.js`. O botão usa um link
normal com o atributo `download`, que funciona em qualquer alojamento.

Dentro do visor de artefactos do Claude esse link não funciona, porque o
visor não dá permissão de descarga às páginas. Por isso o `main.js` deteta
a capacidade `downloads` e, quando ela existe, entrega o ficheiro por essa
via. No alojamento normal esse caminho nunca é usado.

## PDF

O botão "Guardar em PDF" abre a impressão do browser. Há uma folha de
estilos de impressão que passa o site a fundo branco e tinta preta e corta
a navegação, as bolas e as animações.
