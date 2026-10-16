/* Edita els projectes aquí; es comparteixen entre la home i les pàgines. */
window.PORTFOLIO_PROJECTS = [
  { slug: "adds", name: "ADS",
    category: "GRAPHIC DESIGN · ART DIRECTION",
    description: "A selection of diverse graphic design projects.",
    background: "#FF784F",
    textColor: "#B69CFF"
  },
  { slug: "analisis-mercats", name: "MARKET RESEARCH",
    category: "MARKET RESEARCH · STRATEGY",
    description: "A collection of market analysis and research projects.",
    background: "#FFD66B",
    textColor: "#B69CFF"
  },
  { slug: "velabrava", name: "VELABRAVA",
    category: "EVENTS · BRAND EXPERIENCE",
    description: "Brand and communication project for boat parties on the Costa Brava.",
    background: "#56DBDE",
    textColor: "#FF784F"
  },
  { slug: "plis-plas", name: "PLIS PLAS",
    category: "REBRANDING · BRAND IDENTITY",
    description: "Rebranding project for Cafeteria Plis Plas.",
    background: "#C6F44F",
    textColor: "#B69CFF"
  },
  { slug: "odara-social", name: "ÒDÀRÀ SOCIAL",
    category: "SOCIAL IMPACT · LOYALTY CAMPAIGN",
    description: "Loyalty campaign for an NGO in Rio de Janeiro.",
    background: "#FFB6CE",
    textColor: "#FF784F"
  },
  { slug: "ante", name: "ANTE",
    category: "BRANDED CONTENT",
    description: "A playful branded-content concept encouraging more conscious digital spending.",
    background: "#B69CFF",
    textColor: "#C6F44F",
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
