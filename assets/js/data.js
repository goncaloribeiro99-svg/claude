/* =========================================================================
   data.js: todo o conteúdo do site vive aqui.
   Para editar textos ou números, mexe só neste ficheiro.
   ========================================================================= */

const PROFILE = {
  nome: "Gonçalo Ribeiro",
  idade: 26,
  cidade: "Porto, Portugal",
  email: "goncaloribeiro99@gmail.com",
  telefone: "+351 925 710 394",
  telefoneRaw: "351925710394",
  linkedin: "https://www.linkedin.com/in/goncalonunesribeiro/",
  instagramAcademia: "https://www.instagram.com/padelhomept/",

  foto: "assets/img/perfil.jpg",
  fotoPadel: "assets/img/padel.jpg",
  fotoCursor: "assets/img/cursor.jpg",

  teseTitulo: "Análise dos Motivos de Prática Desportiva e do Nível de Satisfação Intrínseca do Consumidor de Padel Português",
  teseInstituicao: "IPAM, Instituto Português de Administração de Marketing, Porto",
  teseUrl: "https://comum.rcaap.pt/entities/publication/fba10b16-0315-412e-97c7-863eba6212d1",
  tesePdf: "assets/docs/tese.pdf"
};

/* ---------- Galeria "Fora do campo": Rockin'1000, Estádio de Leiria ---------- */
const GALERIA = [
  { src: "assets/img/rockin-founder.jpg", classe: "g-tall2", chave: "gal_founder" },
  { src: "assets/img/rockin-estadio.jpg", classe: "",        chave: "gal_estadio" },
  { src: "assets/img/rockin-noite.jpg",   classe: "",        chave: "gal_noite"   }
  // rockin-palco.jpg está fora: é uma captura de ecrã, tem as riscas e as
  // setas do visualizador por cima. Se arranjares o original limpo, mete-o
  // com o mesmo nome e acrescenta aqui:
  // ,{ src: "assets/img/rockin-palco.jpg", classe: "", chave: "gal_palco" }
];

/* ---------- Números da capa (contadores animados) ---------- */
const STATS = [
  { valor: 25000, sufixo: "+", chave: "stat_views" },
  { valor: 13000, sufixo: "",  chave: "stat_padelhome" },
  { valor: 3,     sufixo: "+", chave: "stat_anos" },
  { valor: 3,     sufixo: "",  chave: "stat_idiomas" },
  { valor: 2020,  sufixo: "",  chave: "stat_padel", raw: true }
];

/* ---------- Percurso profissional ---------- */
const PERCURSO = [
  {
    empresa: "Fibrion Health Solutions",
    periodo: "jun 2023 a ",
    periodoFim: { pt: "presente", en: "present", es: "presente" },
    local: "Porto e Gondomar",
    destaque: true,
    cargo: { pt: "Marketing Manager", en: "Marketing Manager", es: "Marketing Manager" },
    desc: {
      pt: "Estruturei a operação de marketing de raiz, numa empresa que começou do zero. Responsável por Marketing, Recursos Humanos e Eventos: publicidade online, planeamento, produção de feiras e supervisão de stands.",
      en: "I built the marketing operation from the ground up at a company starting from zero. Responsible for Marketing, HR and Events: online advertising, planning, trade show production and booth supervision.",
      es: "Estructuré la operación de marketing desde cero, en una empresa que empezaba de cero. Responsable de Marketing, Recursos Humanos y Eventos: publicidad online, planificación, producción de ferias y supervisión de stands."
    },
    tags: ["Meta Ads", "Eventos e feiras", "Recursos Humanos", "Go-to-market"]
  },
  {
    empresa: "Padel Home",
    periodo: "2026 a ",
    periodoFim: { pt: "presente", en: "present", es: "presente" },
    local: "Porto",
    destaque: true,
    cargo: { pt: "Marketing em regime freelance, academia de padel", en: "Freelance marketing, padel academy", es: "Marketing freelance, academia de pádel" },
    desc: {
      pt: "Academia de padel nova. Construí a presença digital do zero: posicionamento, linha editorial e produção de vídeo. Um vídeo alcançou 13 mil visualizações com a conta a ter apenas um mês.",
      en: "A brand new padel academy. I built the digital presence from zero: positioning, editorial line and video production. One video reached 13 thousand views with the account only a month old.",
      es: "Academia de pádel nueva. Construí la presencia digital desde cero: posicionamiento, línea editorial y producción de vídeo. Un vídeo alcanzó 13 mil visualizaciones con la cuenta con solo un mes."
    },
    tags: ["Conteúdo", "Vídeo", "Padel"]
  },
  {
    empresa: "Padel Nuestro Portugal",
    periodo: "fev 2025 a abr 2026",
    local: "Porto",
    destaque: true,
    cargo: { pt: "Content Manager", en: "Content Manager", es: "Content Manager" },
    desc: {
      pt: "Responsável pela criação de conteúdo nas redes sociais do maior retalhista especializado em padel. Conteúdo de loja, de produto e de comunidade. O que funciona, funciona porque é sobre o jogo e não sobre o catálogo.",
      en: "Responsible for social media content for the largest padel specialist retailer. Store, product and community content. What works, works because it is about the game and not about the catalogue.",
      es: "Responsable de la creación de contenido en las redes sociales del mayor retailer especializado en pádel. Contenido de tienda, de producto y de comunidad. Lo que funciona, funciona porque va del juego y no del catálogo."
    },
    tags: ["Copywriting", "Redes sociais", "Retalho de padel"]
  },
  {
    empresa: "MSO Medical Solutions",
    periodo: "fev 2023 a jun 2023",
    local: "Aveiro",
    cargo: { pt: "Product Marketer, estágio", en: "Product Marketer, internship", es: "Product Marketer, prácticas" },
    desc: {
      pt: "Marketing de produto num ambiente técnico e regulado: posicionamento, materiais de apoio à venda e estratégia de produto.",
      en: "Product marketing in a technical, regulated environment: positioning, sales support materials and product strategy.",
      es: "Marketing de producto en un entorno técnico y regulado: posicionamiento, materiales de apoyo a la venta y estrategia de producto."
    },
    tags: ["Estratégia de produto"]
  },
  {
    empresa: "CPMPharma",
    periodo: "abr 2020 a set 2020",
    local: "Porto",
    cargo: { pt: "Marketing, aprendiz", en: "Marketing, apprentice", es: "Marketing, aprendiz" },
    desc: {
      pt: "Primeira passagem por marketing: estratégia de produto e apoio à operação comercial.",
      en: "First step into marketing: product strategy and commercial support.",
      es: "Primer paso en marketing: estrategia de producto y apoyo a la operación comercial."
    },
    tags: []
  }
];

/* ---------- Portefólio de projetos ---------- */
const PROVA = [
  { kpi: "25 000+",       chave: "prova_1", link: null },
  { kpi: "13 000",        chave: "prova_2", link: "https://www.instagram.com/padelhomept/" },
  { kpi: "Padel Nuestro", chave: "prova_3", link: "https://www.instagram.com/reel/DVZVAviDmRg/" }
];

/* ---------- Ferramentas ---------- */
const FERRAMENTAS = [
  "Meta Ads", "Canva", "Microsoft 365", "AI Agents (Claude)",
  "SEO e Google", "Produção de vídeo (Adobe)", "Copywriting",
  "Gestão de eventos e feiras", "Recrutamento e Recursos Humanos",
  "Go-to-market do zero"
];

/* ---------- Parte 02: o argumento ---------- */
const ARGUMENTO = {
  pt: {
    titulo: "Marketing que percebe de padel, porque joga padel",
    paras: [
      "Trabalho em marketing há mais de três anos e jogo padel desde 2020. Não são duas coisas separadas no meu percurso: a minha tese de mestrado foi das primeiras em Portugal a cruzar marketing e padel.",
      "Já criei conteúdos para a Padel Nuestro, o maior retalhista especializado em padel, sediado em Espanha. Estruturei de raiz a operação de marketing de uma empresa em fase de lançamento e, atualmente, estou a construir a presença digital de uma nova academia de padel.",
      "Conheço este mercado dos dois lados. Do lado de quem comunica a modalidade e do lado de quem a pratica todas as semanas. É essa leitura do consumidor de padel que trago para uma equipa."
    ],
    bullets: [
      "Conteúdo que percebe o jogo e não apenas o produto",
      "Operação completa, da estratégia ao vídeo publicado",
      "Trilingue: português nativo, inglês fluente, espanhol funcional"
    ]
  },
  en: {
    titulo: "Marketing that understands padel, because it plays padel",
    paras: [
      "I have worked in marketing for over three years and played padel since 2020. These are not two separate things in my career: my master's thesis was among the first in Portugal to cross marketing and padel.",
      "I have created content for Padel Nuestro, the largest padel specialist retailer, based in Spain. I built the marketing operation of a company at launch stage from the ground up and I am currently building the digital presence of a new padel academy.",
      "I know this market from both sides. From the side that communicates the sport and from the side that plays it every week. That reading of the padel consumer is what I bring to a team."
    ],
    bullets: [
      "Content that understands the game and not only the product",
      "A complete operation, from strategy to published video",
      "Trilingual: native Portuguese, fluent English, working Spanish"
    ]
  },
  es: {
    titulo: "Marketing que entiende de pádel, porque juega al pádel",
    paras: [
      "Trabajo en marketing desde hace más de tres años y juego al pádel desde 2020. No son dos cosas separadas en mi trayectoria: mi tesis de máster fue de las primeras en Portugal en cruzar marketing y pádel.",
      "He creado contenidos para Padel Nuestro, el mayor retailer especializado en pádel, con sede en España. Estructuré desde cero la operación de marketing de una empresa en fase de lanzamiento y actualmente construyo la presencia digital de una nueva academia de pádel.",
      "Conozco este mercado por los dos lados. Por el de quien comunica el deporte y por el de quien lo practica cada semana. Esa lectura del consumidor de pádel es la que aporto a un equipo."
    ],
    bullets: [
      "Contenido que entiende el juego y no solo el producto",
      "Una operación completa, de la estrategia al vídeo publicado",
      "Trilingüe: portugués nativo, inglés fluido, español funcional"
    ]
  }
};

/* ---------- Parte 05: competências (alimenta a secção fixada) ---------- */
const COMPETENCIAS = {
  pt: [
    { f: "Hard skills", t: "Competências técnicas", i: [
      "Estratégia e planeamento de marketing",
      "Campanhas pagas em Meta Ads, SEO e métricas",
      "Produção e edição de vídeo em Adobe",
      "Copywriting e definição de linha editorial"
    ] },
    { f: "Soft skills", t: "Competências transversais", i: [
      "Autonomia para montar uma operação do zero",
      "Comunicação com equipas, clientes e fornecedores",
      "Adaptação a contextos técnicos e regulados",
      "Organização de eventos, feiras e stands"
    ] },
    { f: "Formação e idiomas", t: "Base académica", i: [
      "Mestrado em Marketing pelo IPAM Porto",
      "Dissertação sobre o consumidor português de padel",
      "Português nativo, inglês fluente, espanhol funcional"
    ] }
  ],
  en: [
    { f: "Hard skills", t: "Technical skills", i: [
      "Marketing strategy and planning",
      "Paid campaigns on Meta Ads, SEO and metrics",
      "Video production and editing in Adobe",
      "Copywriting and editorial line definition"
    ] },
    { f: "Soft skills", t: "Transferable skills", i: [
      "Autonomy to build an operation from the ground up",
      "Communication with teams, clients and suppliers",
      "Adapting to technical and regulated contexts",
      "Organising events, trade shows and booths"
    ] },
    { f: "Education and languages", t: "Academic base", i: [
      "Master's in Marketing from IPAM Porto",
      "Dissertation on the Portuguese padel consumer",
      "Native Portuguese, fluent English, working Spanish"
    ] }
  ],
  es: [
    { f: "Hard skills", t: "Competencias técnicas", i: [
      "Estrategia y planificación de marketing",
      "Campañas de pago en Meta Ads, SEO y métricas",
      "Producción y edición de vídeo en Adobe",
      "Copywriting y definición de línea editorial"
    ] },
    { f: "Soft skills", t: "Competencias transversales", i: [
      "Autonomía para montar una operación desde cero",
      "Comunicación con equipos, clientes y proveedores",
      "Adaptación a contextos técnicos y regulados",
      "Organización de eventos, ferias y stands"
    ] },
    { f: "Formación e idiomas", t: "Base académica", i: [
      "Máster en Marketing por el IPAM Oporto",
      "Tesis sobre el consumidor portugués de pádel",
      "Portugués nativo, inglés fluido, español funcional"
    ] }
  ]
};
