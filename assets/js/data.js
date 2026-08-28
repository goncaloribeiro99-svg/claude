/* =========================================================================
   data.js — TODO o conteúdo do site vive aqui.
   Para editar textos, números ou empresas, mexe só neste ficheiro.
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
  // Larga o ficheiro em assets/img/ com este nome exato (ou muda o caminho).
  foto: "assets/img/perfil.jpg",
  fotoPadel: "assets/img/padel.jpg",
  fotoMusica: "assets/img/rockin1000.jpg",
  // Deixa a null enquanto não tiveres o PDF em assets/docs/tese.pdf
  tesePdf: null,
  // Tese de mestrado — repositório RCAAP
  teseUrl: "https://comum.rcaap.pt/entities/publication/fba10b16-0315-412e-97c7-863eba6212d1",
  // Põe aqui o título exato da tese quando o confirmares (fica null = usa texto genérico)
  teseTitulo: null
};

/* ---------- Números do hero (contadores animados) ---------- */
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
    periodo: "jun 2023 — " ,
    periodoFim: { pt: "presente", en: "present", es: "presente" },
    local: "Porto / Gondomar",
    destaque: true,
    cargo: { pt: "Marketing Manager", en: "Marketing Manager", es: "Marketing Manager" },
    desc: {
      pt: "Montei a operação de marketing de raiz, numa empresa que começou do zero. Responsável por Marketing, RH e Eventos: publicidade online, mapas e planeamento, produção de feiras e supervisão de stands.",
      en: "Built the marketing operation from scratch at a company starting from zero. Responsible for Marketing, HR and Events: online advertising, planning, trade-show production and booth supervision.",
      es: "Monté la operación de marketing desde cero, en una empresa que empezaba de cero. Responsable de Marketing, RRHH y Eventos: publicidad online, planificación, producción de ferias y supervisión de stands."
    },
    tags: ["Meta Ads", "Eventos & Feiras", "RH", "Go-to-market"]
  },
  {
    empresa: "Padel Home PT",
    periodo: "2026 — ",
    periodoFim: { pt: "presente", en: "present", es: "presente" },
    local: "Porto",
    destaque: true,
    cargo: { pt: "Marketing (freelance) — academia de padel", en: "Marketing (freelance) — padel academy", es: "Marketing (freelance) — academia de pádel" },
    desc: {
      pt: "Academia de padel nova. Construí a presença digital do zero: posicionamento, linha editorial e produção de vídeo. Um vídeo com 13 mil views com a conta a ter apenas 1 mês de vida.",
      en: "A brand-new padel academy. Built the digital presence from zero: positioning, editorial line and video production. One video hit 13k views with the account only 1 month old.",
      es: "Academia de pádel nueva. Construí la presencia digital desde cero: posicionamiento, línea editorial y producción de vídeo. Un vídeo con 13 mil visualizaciones con la cuenta con solo 1 mes de vida."
    },
    tags: ["Conteúdo", "Vídeo", "Padel"]
  },
  {
    empresa: "Padel Nuestro Portugal",
    periodo: "fev 2025 — abr 2026",
    local: "Porto",
    destaque: true,
    cargo: { pt: "Content Manager", en: "Content Manager", es: "Content Manager" },
    desc: {
      pt: "Responsável pela criação de conteúdo nas redes sociais do maior retalhista de padel do mundo em Portugal. Conteúdo de loja, produto e comunidade — o que funciona, funciona porque é sobre o jogo, não sobre o catálogo.",
      en: "Responsible for social content for the Portuguese arm of the world's largest padel retailer. Store, product and community content — what works, works because it is about the game, not the catalogue.",
      es: "Responsable de la creación de contenido en las redes del mayor retailer de pádel del mundo en Portugal. Contenido de tienda, producto y comunidad — lo que funciona, funciona porque va del juego, no del catálogo."
    },
    tags: ["Copywriting", "Social Media", "Retalho de padel"]
  },
  {
    empresa: "MSO Medical Solutions",
    periodo: "fev 2023 — jun 2023",
    local: "Aveiro",
    cargo: { pt: "Product Marketer (estágio)", en: "Product Marketer (internship)", es: "Product Marketer (prácticas)" },
    desc: {
      pt: "Marketing de produto em ambiente técnico e regulado: posicionamento, materiais de apoio à venda e estratégia de produto.",
      en: "Product marketing in a technical, regulated environment: positioning, sales-support materials and product strategy.",
      es: "Marketing de producto en entorno técnico y regulado: posicionamiento, materiales de apoyo a la venta y estrategia de producto."
    },
    tags: ["Estratégia de produto"]
  },
  {
    empresa: "CPMPHARMA",
    periodo: "abr 2020 — set 2020",
    local: "Porto",
    cargo: { pt: "Marketing (aprendiz)", en: "Marketing (apprentice)", es: "Marketing (aprendiz)" },
    desc: {
      pt: "Primeira passagem por marketing: estratégia de produto e apoio à operação comercial.",
      en: "First step into marketing: product strategy and commercial support.",
      es: "Primer paso en marketing: estrategia de producto y apoyo a la operación comercial."
    },
    tags: []
  }
];

/* ---------- Prova de trabalho ---------- */
const PROVA = [
  {
    kpi: "25 000+",
    chave: "prova_1",
    link: null
  },
  {
    kpi: "13 000",
    chave: "prova_2",
    link: "https://www.instagram.com/padelhomept/"
  },
  {
    kpi: "Padel Nuestro",
    chave: "prova_3",
    link: "https://www.instagram.com/reel/DVZVAviDmRg/"
  }
];

/* ---------- Ferramentas ---------- */
const FERRAMENTAS = [
  "Meta Ads", "Microsoft 365", "AI Agents (Claude)", "SEO / Google",
  "Produção de vídeo", "Copywriting", "Gestão de eventos & feiras",
  "Recrutamento / RH", "Go-to-market do zero"
];

/* =========================================================================
   EMPRESAS — cada chave é um ?e=<chave> no link que envias.
   accent / accent2: cores da marca. Muda à vontade.
   logo: caminho para assets/logos/<ficheiro>. Deixa null para usar wordmark.
   ========================================================================= */
const EMPRESAS = {
  default: {
    nome: "padel português",
    nomeCurto: "Padel PT",
    accent: "#00E5A0", accent2: "#00A3FF", logo: null, site: null,
    pitch: {
      pt: {
        titulo: "Marketing que percebe de padel — porque joga padel",
        paras: [
          "Trabalho em marketing há mais de três anos e jogo padel desde 2020. Não são duas coisas separadas no meu CV: a minha tese de mestrado foi das primeiras em Portugal a cruzar marketing e padel.",
          "Já fiz conteúdo para o maior retalhista de padel do mundo em Portugal, montei a operação de marketing de uma empresa a começar do zero, e estou neste momento a construir a presença digital de uma academia nova.",
          "O que trago não é um portefólio bonito. É saber o que faz um jogador parar o scroll — porque também sou um."
        ],
        bullets: [
          "Conteúdo que percebe o jogo, não só o produto",
          "Operação completa: da estratégia ao vídeo publicado",
          "Trilingue: PT nativo, EN fluente, ES funcional"
        ]
      },
      en: {
        titulo: "Marketing that understands padel — because it plays padel",
        paras: [
          "Three-plus years in marketing and playing padel since 2020. These are not two separate lines on my CV: my master's thesis was among the first in Portugal to cross marketing and padel.",
          "I have produced content for the world's largest padel retailer in Portugal, built a marketing operation from scratch at a company starting from zero, and I am currently building the digital presence of a new academy.",
          "What I bring is not a pretty portfolio. It is knowing what makes a player stop scrolling — because I am one."
        ],
        bullets: [
          "Content that understands the game, not just the product",
          "Full operation: from strategy to published video",
          "Trilingual: native PT, fluent EN, working ES"
        ]
      },
      es: {
        titulo: "Marketing que entiende de pádel — porque juega al pádel",
        paras: [
          "Más de tres años en marketing y jugando al pádel desde 2020. No son dos cosas separadas en mi CV: mi tesis de máster fue de las primeras en Portugal en cruzar marketing y pádel.",
          "He creado contenido para el mayor retailer de pádel del mundo en Portugal, monté la operación de marketing de una empresa que empezaba de cero, y ahora construyo la presencia digital de una academia nueva.",
          "Lo que traigo no es un portafolio bonito. Es saber qué hace que un jugador pare el scroll — porque yo también lo soy."
        ],
        bullets: [
          "Contenido que entiende el juego, no solo el producto",
          "Operación completa: de la estrategia al vídeo publicado",
          "Trilingüe: PT nativo, EN fluido, ES funcional"
        ]
      }
    },
    plano: {
      pt: [
        { f: "Dias 1—30", t: "Ouvir e auditar", i: ["Auditoria de conteúdo e concorrência", "Perceber o cliente real vs. o cliente comunicado", "Definir 3 formatos repetíveis"] },
        { f: "Dias 31—60", t: "Produzir", i: ["Primeira série de conteúdo no ar", "Testes pagos de baixo orçamento", "Métricas base definidas"] },
        { f: "Dias 61—90", t: "Escalar", i: ["Dobrar no que funcionou", "Calendário trimestral fechado", "Parcerias com clubes e academias"] }
      ],
      en: [
        { f: "Days 1—30", t: "Listen and audit", i: ["Content and competitor audit", "Understand the real customer vs. the communicated one", "Define 3 repeatable formats"] },
        { f: "Days 31—60", t: "Produce", i: ["First content series live", "Low-budget paid tests", "Baseline metrics in place"] },
        { f: "Days 61—90", t: "Scale", i: ["Double down on what worked", "Quarterly calendar locked", "Partnerships with clubs and academies"] }
      ],
      es: [
        { f: "Días 1—30", t: "Escuchar y auditar", i: ["Auditoría de contenido y competencia", "Entender el cliente real vs. el comunicado", "Definir 3 formatos repetibles"] },
        { f: "Días 31—60", t: "Producir", i: ["Primera serie de contenido en el aire", "Tests pagados de bajo presupuesto", "Métricas base definidas"] },
        { f: "Días 61—90", t: "Escalar", i: ["Doblar en lo que funcionó", "Calendario trimestral cerrado", "Alianzas con clubes y academias"] }
      ]
    }
  },

  quad: {
    nome: "QUAD",
    nomeCurto: "QUAD",
    accent: "#D9B24C", accent2: "#F2E3B3", logo: null, site: null,
    pitch: {
      pt: {
        titulo: "A QUAD fabrica em Portugal. Isso devia estar no feed, não só na ficha de produto.",
        paras: [
          "A QUAD tem uma coisa que quase nenhuma marca do circuito tem: fábrica própria, em Portugal, com artesãos e tecnologia na mesma sala. Isso é a melhor história de marca que existe neste setor — e neste momento vive sobretudo no site.",
          "Uma gama que vai da FPF Edition à Dragon II do FC Porto, mais pickleball, calçado e vestuário, é território de marca de lifestyle. Isso exige alguém que saiba fazer conteúdo de produto sem parecer catálogo — foi exatamente o que fiz na Padel Nuestro Portugal.",
          "Sou do Porto, jogo padel federado, e a minha tese de mestrado foi sobre marketing no padel. Não preciso que me expliquem a modalidade nem o jogador."
        ],
        bullets: [
          "Série \"Feito em Portugal\": a fábrica como conteúdo recorrente",
          "Edições especiais (FCP, FPF) tratadas como lançamentos, não como stock",
          "Ponte com clubes e academias — onde o jogador testa antes de comprar"
        ]
      },
      en: {
        titulo: "QUAD manufactures in Portugal. That belongs in the feed, not only on the product page.",
        paras: [
          "QUAD has something almost no brand on the circuit has: its own factory, in Portugal, with craftspeople and technology in the same room. That is the strongest brand story in this sector — and right now it mostly lives on the website.",
          "A range running from the FPF Edition to the FC Porto Dragon II, plus pickleball, footwear and apparel, is lifestyle-brand territory. That needs someone who can make product content that does not read like a catalogue — exactly what I did at Padel Nuestro Portugal.",
          "I am from Porto, I play federated padel, and my master's thesis was on marketing in padel. Nobody needs to explain the sport or the player to me."
        ],
        bullets: [
          "\"Made in Portugal\" series: the factory as recurring content",
          "Special editions (FCP, FPF) treated as launches, not as stock",
          "A bridge to clubs and academies — where players test before they buy"
        ]
      },
      es: {
        titulo: "QUAD fabrica en Portugal. Eso debería estar en el feed, no solo en la ficha de producto.",
        paras: [
          "QUAD tiene algo que casi ninguna marca del circuito tiene: fábrica propia, en Portugal, con artesanos y tecnología en la misma sala. Es la mejor historia de marca del sector — y ahora mismo vive sobre todo en la web.",
          "Una gama que va de la FPF Edition a la Dragon II del FC Porto, más pickleball, calzado y ropa, es territorio de marca lifestyle. Eso exige alguien que sepa hacer contenido de producto sin parecer catálogo — exactamente lo que hice en Padel Nuestro Portugal.",
          "Soy de Oporto, juego pádel federado y mi tesis de máster fue sobre marketing en el pádel. No hace falta explicarme ni el deporte ni el jugador."
        ],
        bullets: [
          "Serie \"Hecho en Portugal\": la fábrica como contenido recurrente",
          "Ediciones especiales (FCP, FPF) tratadas como lanzamientos, no como stock",
          "Puente con clubes y academias — donde el jugador prueba antes de comprar"
        ]
      }
    },
    plano: {
      pt: [
        { f: "Dias 1—30", t: "Entrar na fábrica", i: ["Auditoria do conteúdo atual e da concorrência ibérica", "2 dias de filmagem na fábrica — banco de imagens próprio", "Mapear a gama por perfil de jogador, não por modelo"] },
        { f: "Dias 31—60", t: "Pôr a história a andar", i: ["Série \"Feito em Portugal\" no ar (formato repetível)", "Conteúdo de teste de raquete com jogadores reais", "Primeiros testes Meta Ads segmentados por nível de jogo"] },
        { f: "Dias 61—90", t: "Transformar em vendas", i: ["Plano de lançamento para a próxima edição especial", "Programa de embaixadores em clubes do Norte", "Relatório de canal + calendário do trimestre seguinte"] }
      ],
      en: [
        { f: "Days 1—30", t: "Get inside the factory", i: ["Audit current content and Iberian competitors", "2 filming days at the factory — build an owned image bank", "Map the range by player profile, not by model"] },
        { f: "Days 31—60", t: "Put the story in motion", i: ["\"Made in Portugal\" series live (repeatable format)", "Racket-testing content with real players", "First Meta Ads tests segmented by playing level"] },
        { f: "Days 61—90", t: "Turn it into sales", i: ["Launch plan for the next special edition", "Ambassador programme across northern clubs", "Channel report + next quarter's calendar"] }
      ],
      es: [
        { f: "Días 1—30", t: "Entrar en la fábrica", i: ["Auditoría del contenido actual y de la competencia ibérica", "2 días de rodaje en la fábrica — banco de imágenes propio", "Mapear la gama por perfil de jugador, no por modelo"] },
        { f: "Días 31—60", t: "Poner la historia a andar", i: ["Serie \"Hecho en Portugal\" en el aire (formato repetible)", "Contenido de prueba de pala con jugadores reales", "Primeros tests de Meta Ads segmentados por nivel de juego"] },
        { f: "Días 61—90", t: "Convertir en ventas", i: ["Plan de lanzamiento para la próxima edición especial", "Programa de embajadores en clubes del norte", "Informe de canal + calendario del trimestre siguiente"] }
      ]
    }
  },

  cork: {
    nome: "CORK Padel",
    nomeCurto: "CORK",
    accent: "#C97B36", accent2: "#E8C79A", logo: null, site: null,
    pitch: {
      pt: {
        titulo: "Cortiça, feito à mão, e não há duas raquetes iguais. Isto conta-se, não se anuncia.",
        paras: [
          "A CORK tem a história de origem mais forte do padel português: o Nicolau Silva a restaurar raquetes até criar a sua, o Pedro Plantier — fundador da Federação e primeiro campeão nacional — a juntar-se ao projeto, e a cortiça como material que ninguém mais usa assim.",
          "Fábrica em Fátima, flagship em Lisboa, e uma arena própria em Santa Catarina da Serra. A Cork Padel Arena não é só um espaço: é um palco de conteúdo permanente que a maioria das marcas tem de alugar. A parceria com o Sporting mostra que a marca já joga ao nível de instituições.",
          "Trabalhei conteúdo para a Padel Nuestro Portugal e estou a construir a presença de uma academia do zero. Sei filmar dentro de um campo e sei o que um jogador quer ver antes de trocar de raquete."
        ],
        bullets: [
          "A antivibração explicada em vídeo, não em bullet points técnicos",
          "A Arena como estúdio: conteúdo semanal sem custo de produção externo",
          "Da Classic à Supreme — cada família com uma narrativa própria"
        ]
      },
      en: {
        titulo: "Cork, handmade, and no two rackets alike. That gets told, not advertised.",
        paras: [
          "CORK has the strongest origin story in Portuguese padel: Nicolau Silva restoring rackets until he built his own, Pedro Plantier — Federation founder and first national champion — joining the project, and cork as a material nobody else uses this way.",
          "A factory in Fátima, a flagship in Lisbon, and its own arena in Santa Catarina da Serra. The Cork Padel Arena is not just a venue: it is a permanent content stage most brands have to rent. The Sporting partnership shows the brand already plays at institutional level.",
          "I have produced content for Padel Nuestro Portugal and I am building an academy's presence from zero. I know how to film inside a court and what a player wants to see before switching rackets."
        ],
        bullets: [
          "Anti-vibration explained on video, not in technical bullet points",
          "The Arena as a studio: weekly content with no external production cost",
          "From Classic to Supreme — a distinct narrative per family"
        ]
      },
      es: {
        titulo: "Corcho, hecho a mano, y no hay dos palas iguales. Eso se cuenta, no se anuncia.",
        paras: [
          "CORK tiene la historia de origen más fuerte del pádel portugués: Nicolau Silva restaurando palas hasta crear la suya, Pedro Plantier — fundador de la Federación y primer campeón nacional — sumándose al proyecto, y el corcho como material que nadie más usa así.",
          "Fábrica en Fátima, flagship en Lisboa y una arena propia en Santa Catarina da Serra. La Cork Padel Arena no es solo un espacio: es un escenario de contenido permanente que la mayoría de marcas tiene que alquilar. La alianza con el Sporting demuestra que la marca ya juega a nivel institucional.",
          "He trabajado contenido para Padel Nuestro Portugal y estoy construyendo la presencia de una academia desde cero. Sé grabar dentro de una pista y sé qué quiere ver un jugador antes de cambiar de pala."
        ],
        bullets: [
          "La antivibración explicada en vídeo, no en bullets técnicos",
          "La Arena como estudio: contenido semanal sin coste de producción externa",
          "De la Classic a la Supreme — cada familia con su propia narrativa"
        ]
      }
    },
    plano: {
      pt: [
        { f: "Dias 1—30", t: "Aprender o ofício", i: ["Dias na fábrica de Fátima e na flagship de Lisboa", "Auditoria: o que a marca diz vs. o que o jogador percebe", "Definir a linha editorial por família de raquete"] },
        { f: "Dias 31—60", t: "Usar a Arena", i: ["Rotina de gravação mensal na Cork Padel Arena", "Série sobre cortiça e antivibração para não-técnicos", "Ativação da parceria Sporting em conteúdo"] },
        { f: "Dias 61—90", t: "Abrir portas", i: ["Programa de testes em clubes (raquete na mão do jogador)", "Funil de conversão flagship + online", "Calendário trimestral e relatório de resultados"] }
      ],
      en: [
        { f: "Days 1—30", t: "Learn the craft", i: ["Days at the Fátima factory and the Lisbon flagship", "Audit: what the brand says vs. what the player understands", "Define the editorial line per racket family"] },
        { f: "Days 31—60", t: "Use the Arena", i: ["Monthly shooting routine at the Cork Padel Arena", "Series on cork and anti-vibration for non-technical players", "Turn the Sporting partnership into content"] },
        { f: "Days 61—90", t: "Open doors", i: ["Club testing programme (racket in the player's hand)", "Flagship + online conversion funnel", "Quarterly calendar and results report"] }
      ],
      es: [
        { f: "Días 1—30", t: "Aprender el oficio", i: ["Días en la fábrica de Fátima y en la flagship de Lisboa", "Auditoría: lo que dice la marca vs. lo que entiende el jugador", "Definir la línea editorial por familia de pala"] },
        { f: "Días 31—60", t: "Usar la Arena", i: ["Rutina de grabación mensual en la Cork Padel Arena", "Serie sobre corcho y antivibración para no técnicos", "Activación de la alianza con el Sporting en contenido"] },
        { f: "Días 61—90", t: "Abrir puertas", i: ["Programa de pruebas en clubes (pala en la mano del jugador)", "Embudo de conversión flagship + online", "Calendario trimestral e informe de resultados"] }
      ]
    }
  },

  vekt: {
    nome: "VEKT",
    nomeCurto: "VEKT",
    accent: "#FF5A1F", accent2: "#FFB08A", logo: null, site: null,
    pitch: {
      pt: {
        titulo: "Procurei a VEKT e encontrei pouco. É exatamente aí que está o trabalho.",
        paras: [
          "Fui pesquisar a VEKT com atenção e a informação pública é escassa. Isso não é uma crítica — é um diagnóstico. Uma marca portuguesa de overgrips tem entre mãos o produto de maior repetição de compra do padel, e quase nenhuma presença a explicá-lo.",
          "O overgrip é o único ponto de contacto físico entre o jogador e o jogo. Muda a espessura, a aderência, o suor, a sensação. É um produto barato de comprar, caro de explicar e fácil de fidelizar — o triângulo perfeito para conteúdo educativo e distribuição via clubes.",
          "Jogo padel desde 2020, sou federado, e a minha tese de mestrado cruzou marketing e padel. Sei falar deste produto na linguagem de quem o gasta de duas em duas semanas."
        ],
        bullets: [
          "Construir a marca de raiz: identidade, presença e voz",
          "Conteúdo educativo sobre grip — a categoria que ninguém explica",
          "Distribuição em academias e clubes: o sítio onde o grip se acaba"
        ]
      },
      en: {
        titulo: "I researched VEKT and found little. That is exactly where the work is.",
        paras: [
          "I looked into VEKT carefully and public information is scarce. That is not a criticism — it is a diagnosis. A Portuguese overgrip brand holds the highest repeat-purchase product in padel, and almost no presence explaining it.",
          "The overgrip is the only physical contact point between player and game. It changes thickness, grip, sweat, feel. Cheap to buy, expensive to explain and easy to build loyalty around — the perfect triangle for educational content and club distribution.",
          "I have played padel since 2020, I am federated, and my master's thesis crossed marketing and padel. I can talk about this product in the language of someone who burns through one every two weeks."
        ],
        bullets: [
          "Build the brand from the ground up: identity, presence and voice",
          "Educational content on grip — the category nobody explains",
          "Distribution through academies and clubs: where grips run out"
        ]
      },
      es: {
        titulo: "Investigué VEKT y encontré poco. Ahí está exactamente el trabajo.",
        paras: [
          "Busqué VEKT con atención y la información pública es escasa. No es una crítica — es un diagnóstico. Una marca portuguesa de overgrips tiene entre manos el producto de mayor recompra del pádel, y casi ninguna presencia que lo explique.",
          "El overgrip es el único punto de contacto físico entre el jugador y el juego. Cambia el grosor, el agarre, el sudor, la sensación. Barato de comprar, caro de explicar y fácil de fidelizar — el triángulo perfecto para contenido educativo y distribución por clubes.",
          "Juego pádel desde 2020, soy federado, y mi tesis de máster cruzó marketing y pádel. Sé hablar de este producto en el idioma de quien lo gasta cada dos semanas."
        ],
        bullets: [
          "Construir la marca desde la raíz: identidad, presencia y voz",
          "Contenido educativo sobre grip — la categoría que nadie explica",
          "Distribución en academias y clubes: donde el grip se acaba"
        ]
      }
    },
    plano: {
      pt: [
        { f: "Dias 1—30", t: "Definir a marca", i: ["Posicionamento e voz — o que a VEKT é e não é", "Auditoria de concorrentes ibéricos e internacionais", "Kit base: perfis, bio, identidade de conteúdo"] },
        { f: "Dias 31—60", t: "Ocupar a categoria", i: ["Série educativa: grip, suor, espessura, quando trocar", "Testes com jogadores federados e amadores", "Primeiros parceiros: academias e lojas"] },
        { f: "Dias 61—90", t: "Repetir a compra", i: ["Campanha de subscrição/pack para jogadores frequentes", "Presença em torneios locais", "Métricas base + plano do trimestre seguinte"] }
      ],
      en: [
        { f: "Days 1—30", t: "Define the brand", i: ["Positioning and voice — what VEKT is and is not", "Audit of Iberian and international competitors", "Base kit: profiles, bio, content identity"] },
        { f: "Days 31—60", t: "Own the category", i: ["Educational series: grip, sweat, thickness, when to change", "Tests with federated and amateur players", "First partners: academies and shops"] },
        { f: "Days 61—90", t: "Drive repeat purchase", i: ["Subscription/pack campaign for frequent players", "Presence at local tournaments", "Baseline metrics + next-quarter plan"] }
      ],
      es: [
        { f: "Días 1—30", t: "Definir la marca", i: ["Posicionamiento y voz — qué es y qué no es VEKT", "Auditoría de competidores ibéricos e internacionales", "Kit base: perfiles, bio, identidad de contenido"] },
        { f: "Días 31—60", t: "Ocupar la categoría", i: ["Serie educativa: grip, sudor, grosor, cuándo cambiar", "Tests con jugadores federados y amateurs", "Primeros socios: academias y tiendas"] },
        { f: "Días 61—90", t: "Repetir la compra", i: ["Campaña de suscripción/pack para jugadores frecuentes", "Presencia en torneos locales", "Métricas base + plan del trimestre siguiente"] }
      ]
    }
  },

  volt: {
    nome: "VOLT Padel",
    nomeCurto: "VOLT",
    accent: "#E4FF1A", accent2: "#B8CC00", logo: null, site: null,
    pitch: {
      pt: {
        titulo: "A VOLT é do Porto e está em 60 países. Eu sou do Porto e trabalho em três idiomas.",
        paras: [
          "Desde 2016 que a VOLT escolheu o caminho mais difícil: ser minimalista num setor que grita. Tipografia monoespaçada, estética limpa, o conceito de voltagem como identidade. Isso é uma decisão de marca rara — e exige conteúdo à altura, porque minimalismo mal executado lê-se como silêncio.",
          "Presença em mais de 60 países significa que o conteúdo tem de funcionar em português, inglês e espanhol. Falo os três. Este site que estás a ler troca de idioma no botão em cima — é a demonstração, não a promessa.",
          "Trabalhei conteúdo para a Padel Nuestro Portugal, montei o marketing da Fibrion do zero e estou a construir a presença de uma academia nova. Jogo padel federado desde 2020 e a minha tese de mestrado foi sobre marketing no padel."
        ],
        bullets: [
          "Conteúdo minimalista que ainda assim para o scroll",
          "Três idiomas nativos ao processo, não traduzidos à pressa",
          "Da 900 V5 à 950 V5: comunicar tecnologia sem virar ficha técnica"
        ]
      },
      en: {
        titulo: "VOLT is from Porto and sells in 60 countries. I am from Porto and I work in three languages.",
        paras: [
          "Since 2016 VOLT has taken the harder route: being minimalist in a sector that shouts. Monospaced type, clean aesthetics, voltage as identity. That is a rare brand decision — and it demands content to match, because badly executed minimalism reads as silence.",
          "A presence in 60+ countries means content has to work in Portuguese, English and Spanish. I speak all three. The site you are reading switches language with the button at the top — that is the demonstration, not the promise.",
          "I have produced content for Padel Nuestro Portugal, built Fibrion's marketing from zero and I am building a new academy's presence. I have played federated padel since 2020 and my master's thesis was on marketing in padel."
        ],
        bullets: [
          "Minimalist content that still stops the scroll",
          "Three languages native to the process, not rushed translations",
          "From the 900 V5 to the 950 V5: communicating tech without a spec sheet"
        ]
      },
      es: {
        titulo: "VOLT es de Oporto y está en 60 países. Yo soy de Oporto y trabajo en tres idiomas.",
        paras: [
          "Desde 2016 VOLT eligió el camino difícil: ser minimalista en un sector que grita. Tipografía monoespaciada, estética limpia, el concepto de voltaje como identidad. Es una decisión de marca rara — y exige contenido a la altura, porque el minimalismo mal ejecutado se lee como silencio.",
          "Presencia en más de 60 países significa que el contenido tiene que funcionar en portugués, inglés y español. Hablo los tres. Esta web que estás leyendo cambia de idioma con el botón de arriba — es la demostración, no la promesa.",
          "He trabajado contenido para Padel Nuestro Portugal, monté el marketing de Fibrion desde cero y construyo la presencia de una academia nueva. Juego pádel federado desde 2020 y mi tesis de máster fue sobre marketing en el pádel."
        ],
        bullets: [
          "Contenido minimalista que aun así para el scroll",
          "Tres idiomas nativos al proceso, no traducidos a las prisas",
          "De la 900 V5 a la 950 V5: comunicar tecnología sin ser ficha técnica"
        ]
      }
    },
    plano: {
      pt: [
        { f: "Dias 1—30", t: "Entender o código", i: ["Auditoria da identidade e do conteúdo atual", "Mapear os 3 mercados prioritários fora de Portugal", "Guia editorial: como soa a VOLT em PT/EN/ES"] },
        { f: "Dias 31—60", t: "Produzir com jogadores", i: ["Conteúdo com atletas da marca — formato repetível", "Série técnica: formato diamante vs. lágrima, sem jargão", "Testes pagos por mercado"] },
        { f: "Dias 61—90", t: "Internacionalizar", i: ["Plano de lançamento multi-idioma para a próxima gama", "Rede de distribuidores como canal de conteúdo", "Relatório por mercado + calendário trimestral"] }
      ],
      en: [
        { f: "Days 1—30", t: "Learn the code", i: ["Audit of identity and current content", "Map the 3 priority markets outside Portugal", "Editorial guide: how VOLT sounds in PT/EN/ES"] },
        { f: "Days 31—60", t: "Produce with players", i: ["Content with brand athletes — repeatable format", "Technical series: diamond vs. teardrop, no jargon", "Paid tests per market"] },
        { f: "Days 61—90", t: "Go international", i: ["Multi-language launch plan for the next range", "Distributor network as a content channel", "Per-market report + quarterly calendar"] }
      ],
      es: [
        { f: "Días 1—30", t: "Entender el código", i: ["Auditoría de la identidad y del contenido actual", "Mapear los 3 mercados prioritarios fuera de Portugal", "Guía editorial: cómo suena VOLT en PT/EN/ES"] },
        { f: "Días 31—60", t: "Producir con jugadores", i: ["Contenido con atletas de la marca — formato repetible", "Serie técnica: formato diamante vs. lágrima, sin jerga", "Tests pagados por mercado"] },
        { f: "Días 61—90", t: "Internacionalizar", i: ["Plan de lanzamiento multi-idioma para la próxima gama", "Red de distribuidores como canal de contenido", "Informe por mercado + calendario trimestral"] }
      ]
    }
  }
};
