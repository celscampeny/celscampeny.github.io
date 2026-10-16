/* Edita els projectes aquí; es comparteixen entre la home i les pàgines. */
window.PORTFOLIO_PROJECTS = [
  { slug: "adds", name: "ADDS",
    category: "GRAPHIC DESIGN · ART DIRECTION",
    description: "A selection of diverse graphic design projects.",
    background: "linear-gradient(132deg,#ffe59b 0%,#ffb34b 26%,#ff713e 69%,#c93937 100%)",
    textColor: "#311600"
  },
  { slug: "analisis-mercats", name: "ANÀLISIS DE MERCATS DIVERSOS",
    category: "MARKET RESEARCH · STRATEGY",
    description: "A collection of market analysis and research projects.",
    background: "linear-gradient(138deg,#ccff8a 0%,#83ff5a 28%,#28c955 66%,#0c8751 100%)",
    textColor: "#08331c"
  },
  { slug: "velabrava", name: "VELABRAVA",
    category: "EVENTS · BRAND EXPERIENCE",
    description: "Brand and communication project for boat parties on the Costa Brava.",
    background: "linear-gradient(137deg,#fff3a0 0%,#ffdc53 27%,#ffa12f 70%,#df522c 100%)",
    textColor: "#3d2205"
  },
  { slug: "plis-plas", name: "PLIS PLAS",
    category: "REBRANDING · BRAND IDENTITY",
    description: "Rebranding project for Cafeteria Plis Plas.",
    background: "linear-gradient(138deg,#ffd0ad 0%,#ffa39c 26%,#f35b7d 67%,#bb337f 100%)",
    textColor: "#3a1024"
  },
  { slug: "odara-social", name: "ÒDÀRÀ SOCIAL",
    category: "SOCIAL IMPACT · LOYALTY CAMPAIGN",
    description: "Loyalty campaign for an NGO in Rio de Janeiro.",
    background: "linear-gradient(138deg,#ffc184 0%,#ff824b 29%,#ec4a30 66%,#a82031 100%)",
    textColor: "#ffffff"
  },
  { slug: "ante", name: "ANTE",
    category: "BRANDED CONTENT",
    description: "A playful branded-content concept encouraging more conscious digital spending.",
    background: "#1e342c",
    textColor: "#f4fff7",
    cardImage: "assets/home/ante-mascot.png",
    cardImageAlt: "Illustrated purple mascot holding a euro sign",
    cardImageClass: "ante-card-graphic"
  }
];


// CONTINGUT DE LES PÀGINES INDIVIDUALS: omple els camps quan tinguis el material.
// Les imatges són rutes locals, per exemple: assets/project-cover.jpg
window.PORTFOLIO_PROJECTS.forEach(project => {
  project.year = '';
  project.role = '';
  project.coverImage = '';
  project.caseStudy = {
    challenge: '',  // Repte / punt de partida
    insight: '',    // Recerca / observació clau
    idea: '',       // Concepte / direcció creativa
    execution: '',  // Peces / procés / canals
    outcome: '',    // Resultat / aprenentatges, sense inventar xifres
    imageOne: '', imageTwo: '', imageThree: ''
  };
});
