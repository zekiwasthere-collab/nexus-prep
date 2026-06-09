import { CourseModule } from "./types";

export const courseModules: CourseModule[] = [
  {
    index: 0,
    id: "dev_journalism",
    title: "Development Journalism & Communication",
    shortDesc: "Understand the roles, historical development, and practices of development journalism in Africa and Ethiopia.",
    academicUnit: "Unit 1: Theory & Application",
    objectives: [
      "Identify the terms development, communication, development journalism and development communication",
      "Scrutinize the practice of development journalism in Africa in general and Ethiopia in particular",
      "Point out the main mass media used in development projects and rural communication",
      "Explore the functions of development journalism for environmental protection and urban development"
    ],
    keyConcepts: [
      {
        term: "Development Journalism (DJ)",
        definition: "A type of journalism that focuses on reporting that aids the constructive growth of a country, focusing on social, economic, and infrastructure problems rather than political sensations.",
        bulletPoints: [
          "Developed in Asia/Africa in the 1960s post-independence",
          "Focuses on long-range development plans and failures",
          "Emphasizes nation-building and collaborative progress"
        ]
      },
      {
        term: "Development Communication (DevCom)",
        definition: "The planned and systematic use of communication media and processes to facilitate social development, educate communities, and promote public participation.",
        bulletPoints: [
          "Information dissemination: top-down instructions",
          "Participatory communication: bottom-up community empowerment",
          "Integrating traditional folklore media (Oromoo forum, etc.) with modern broadcast"
        ]
      },
      {
        term: "Ethiopian Context of DJ",
        definition: "Ethiopia's media landscape has heavily integrated development journalism stances in state media to promote flagship projects like the GERD, farming cooperatives, and literacy.",
        bulletPoints: [
          "State media heavily aligned with nation-building objectives",
          "Tension between the watchdog investigative role and corporate advocacy",
          "Emphasis on rural empowerment and environmental preservation schemes"
        ]
      }
    ],
    summaryNote: "Development Journalism rejects the classic Western stance of pure detached reporting when dealing with developing nations' core crises. Instead of merely reporting that a bridge collapsed, development journalists investigate how the community participated in its erection, what resources were lost, and how communication can mobilize rehabilitation efforts. Key criticisms of the practice argue it can sometimes degenerate into government propaganda if journalists lose their critical investigative autonomy."
  },
  {
    index: 1,
    id: "mil_literacy",
    title: "Media & Information Literacy (MIL)",
    shortDesc: "Demystify search engine logic, online journal querying, social media fact-checking, and debunking fake news.",
    academicUnit: "Unit 2: Information Technology & Literacy",
    objectives: [
      "Define and explain the meaning of Media and Information Literacy",
      "Clarify the concepts of fact-checking social media content and spotting misinformation",
      "Describe the Historical Development of internet, search engines, and indexing databases",
      "Access online academic journals and peer-reviewed Ethiopian resources safely"
    ],
    keyConcepts: [
      {
        term: "MIL Framework",
        definition: "The combined capacity to access, analyze, evaluate, and produce media and information in multiple formats, critical for the digital citizen.",
        bulletPoints: [
          "Information Access: Locating credible online journals",
          "Evaluating: Distinguishing facts from opinions or propaganda",
          "Creation: Responsibly contributing post content without harm"
        ]
      },
      {
        term: "Information vs. Mis/Disinformation",
        definition: "Understanding different categories of false details on modern platforms.",
        bulletPoints: [
          "Misinformation: False information shared without harmful intent",
          "Disinformation: Deliberate, manufactured lies to deceive the public",
          "Malinformation: True details taken out of context to cause harm"
        ]
      },
      {
        term: "Search Engine Optimization & Querying",
        definition: "Techniques and limits regarding search crawls, online indexers, and academic directories.",
        bulletPoints: [
          "Boolean search operators (AND, OR, NOT) narrow down journal databases",
          "Web crawlers index keywords but miss deep scholarly subscriptions (the deep web)",
          "Algorithmic echo chambers bias personal recommendation feeds"
        ]
      }
    ],
    summaryNote: "Media and Information Literacy is a defensive shield against toxic electronic trends. In modern Ethiopia, the proliferation of social networks has made content verification a prerequisite for journalists. A qualified graduate must utilize reverse image searching, geolocation verification, cross-source auditing, and digital forensic tools before republishing any viral material."
  },
  {
    index: 2,
    id: "news_writing",
    title: "News Writing & Investigative Reporting",
    shortDesc: "Master news values, story structures, news sources, and the rigorous stages of investigative reporting.",
    academicUnit: "Unit 3: Journalism Practical Core",
    objectives: [
      "Explain the key elements that make news (news values) in professional standards",
      "Analyze the inverted pyramid structure, lead writing, and body paragraphs",
      "Understand what investigative reporting is and detail its development stages",
      "Identify news sources, verify credibility, and maintain balance/fairness"
    ],
    keyConcepts: [
      {
        term: "News Values (Core Elements)",
        definition: "Characteristics of an event that make it worthy of transforming into a published news story.",
        bulletPoints: [
          "Proximity: Geographic or psychological closeness to the reader",
          "Prominence: Renowned individuals, places, or landmarks",
          "Timeliness / Recency: Highly urgent, current updates",
          "Impact / Consequence: Direct relevance to national or communal welfare"
        ]
      },
      {
        term: "Investigative Journalism Flow",
        definition: "A system of uncovering secrets that powerful interests strive to hide from the populace.",
        bulletPoints: [
          "Stage 1: Idea generation and preliminary feasibility analysis",
          "Stage 2: Formulating hypotheses and tracing primary human sources",
          "Stage 3: Undercover observations or intensive document auditing",
          "Stage 4: Writing, legal vetting, and publication"
        ]
      },
      {
        term: "Inverted Pyramid Structure",
        definition: "The classic format for hard news where the most critical facts are prioritized at the top, tapering down to background details.",
        bulletPoints: [
          "The Lead: First paragraph answering Who, What, Where, When, Why, and How",
          "The Body: Essential supporting testimony and source attributions",
          "The Tail: Nice-to-know background context"
        ]
      }
    ],
    summaryNote: "Standard news reporting answers what is happening, while Investigative reporting uncovers why it happened, who is benefiting, and who is suffering under a cloud of secrecy. An investigative reporter must possess resilience, an audit-oriented mindset, protective source hygiene (confidentiality), and deep adherence to public interest ethics."
  },
  {
    index: 3,
    id: "feature_writing",
    title: "Feature Writing & Interview Styles",
    shortDesc: "Explore literary journalism, features versus news, interviewing techniques, and personal profiles.",
    academicUnit: "Unit 4: Advanced Writing Formats",
    objectives: [
      "Differentiate news writing from feature writing styles and creative nonfiction",
      "Identify traditional and modern feature types (profiles, travelogues, anecdotes)",
      "Develop techniques for conducting highly productive journalistic interviews",
      "Formulate active observation habits and narrative hook methods"
    ],
    keyConcepts: [
      {
        term: "The Feature Concept",
        definition: "Longer-form narrative writing that goes beyond immediate headlines to analyze people, trends, ideas, or deep background stories.",
        bulletPoints: [
          "Focuses on emotional impact, human interest, and descriptive writing style",
          "Uses descriptive narrative leads instead of rapid hard news leads",
          "Permits creative license in vocabulary, though facts remain sacred"
        ]
      },
      {
        term: "Interview Dynamics",
        definition: "A structured conversation designed to retrieve specific details, quotes, and perspectives.",
        bulletPoints: [
          "Open-ended questions: Invite detailed responses (e.g., 'How did that feel?')",
          "Closed-ended questions: Secure rigid factual verifications (e.g., 'Were you there?')",
          "Active listening: Spotting body language cues, pauses, and evading answers"
        ]
      },
      {
        term: "Personal Profiles",
        definition: "A subset of features that illuminates the character, history, and motivations of an individual rather than just their public achievements.",
        bulletPoints: [
          "Requires secondary interviews with acquaintances, peers, or adversaries",
          "Relies on showing, not just telling (e.g., describing physical habits or environment)",
          "Connects the personal trials of the subject to broader societal themes"
        ]
      }
    ],
    summaryNote: "While a hard news report is like a fast-moving bullet, a feature is like a guided tour. Features use sensory descriptions, dialogue, scenes, and character development to capture depth. In interview prep, a reporter must outline major themes but remain flexible to run after surprising details shared by the interviewee."
  },
  {
    index: 4,
    id: "broadcast_reporting",
    title: "Broadcast Media & Reporting Techniques",
    shortDesc: "Master writing for the ear (radio) and eye (television) with professional editing and recording techniques.",
    academicUnit: "Unit 5: Broadcast Arts",
    objectives: [
      "Define the distinctive characteristics of radio and television media",
      "Acknowledge the rules of writing for the ear: conversational syntax and simplicity",
      "Apply effective recording, editing, and broadcast audio copy guidelines",
      "Integrate natural sound (NAT SDP) and sound bites (Actualities) in reporting"
    ],
    keyConcepts: [
      {
        term: "Writing for the Ear",
        definition: "Crafting broadcast scripts to be easily understood upon a single, instantaneous hearing, characterized by conversational, fast structures.",
        bulletPoints: [
          "Short, simple sentences (Subject-Verb-Object construct)",
          "Names and titles precede corresponding actions (e.g., 'Mayor Adane announced...')",
          "Avoid multi-clause sentences or heavy punctuation marks"
        ]
      },
      {
        term: "Radio Copy Elements",
        definition: "The core components of a radio news package that build auditory immersion.",
        bulletPoints: [
          "Actuality / Sound Bite: The recorded voice of a news source speaking directly",
          "Reader: A script delivered solely by the studio anchor without external audio",
          "Wraparound / Voicer: Anchor introduce, reporter reports, inserts actuality, finishes"
        ]
      },
      {
        term: "Television Visual Syntax",
        definition: "Balancing the spoken script with high-impact visual sequences.",
        bulletPoints: [
          "B-Roll: Secondary background visual footage that overlays the reporter's narration",
          "Talking Head / SOT: Sound-on-tape interviews displayed on-screen",
          "Script columns: Video descriptions on the left, matching audio lines on the right"
        ]
      }
    ],
    summaryNote: "In print, readers can re-scan a confusing paragraph. In broadcast, listeners do not have that luxury—once a sentence is spoken, it is gone. Hence, broadcast writers use words like 'says' instead of 'said' to represent immediacy, favor present-tense verbs, omit unnecessary numbers, and avoid tongue-twister phrases."
  },
  {
    index: 5,
    id: "intercultural_comm",
    title: "Intercultural & International Communication",
    shortDesc: "Deconstruct nonverbal actions, cultural shock steps, diverse context theories, and the flow of global news.",
    academicUnit: "Unit 6: Global & Cultural Context",
    objectives: [
      "Explain nonverbal communication variations across distinct global communities",
      "Recognize the phases of cultural shock and systematic intercultural adaptation",
      "Critically evaluate international communication theories like the Global Village",
      "Examine the unequal flow of news between developing and developed empires"
    ],
    keyConcepts: [
      {
        term: "Culture Shock Phases",
        definition: "The cumulative psychological hurdles encountered by people crossing into unfamiliar cultural spaces.",
        bulletPoints: [
          "1. Honeymoon: Early excitement, romanticizing differences",
          "2. Crisis / Distress: Feeling alienated, homesick, or highly frustrated",
          "3. Recovery: Learning local cues, resolving basic interactions",
          "4. Mastery / Adaptation: Complete cultural integration and bilingual comfort"
        ]
      },
      {
        term: "Global News Flow Disparity",
        definition: "The systematic imbalance of international communications criticized severely by third-world nations in the MacBride Report.",
        bulletPoints: [
          "North-South Flow: Major Western agencies dominate international headlines",
          "One-Way Traffic: Developing nations portrayed mostly with disaster/corruption themes",
          "NWICO call: Requesting an egalitarian media allocation model"
        ]
      },
      {
        term: "High vs. Low Context Culture",
        definition: "A theory by Edward T. Hall describing how context dictates interpersonal interactions.",
        bulletPoints: [
          "High Context: Implicit messages, heavy nonverbal cues, shared historical heritage",
          "Low Context: Highly direct statements, literal meanings, explicit written agreements"
        ]
      }
    ],
    summaryNote: "Intercultural communication is not merely about translating words—it is about recognizing the unwritten codes of power, context, and spiritual history. The 'Global Village' concept popularized by Marshall McLuhan posits that electronic media contracts the planet into an instantly linked village, but critics note that some villages get to build the digital highways while others remain voiceless roadside watchers."
  },
  {
    index: 6,
    id: "comm_theories",
    title: "Theories of Communication",
    shortDesc: "Deconstruct mass communication effects, psychological filters, and development theories in action.",
    academicUnit: "Unit 7: Intellectual Frameworks",
    objectives: [
      "Synthesize classic mass communication models (Two-step flow, Agenda Setting)",
      "Explain Cultivation Theory, Uses & Gratifications, and Priming methods",
      "Apply theories to analyze television programs, modern campaigns, or local films",
      "Contrast Western communication theories with community participatory models"
    ],
    keyConcepts: [
      {
        term: "Agenda-Setting Theory",
        definition: "The hypothesis that mass media do not tell the audience *what to think*, but rather dramatically dictate *what themes to think about*.",
        bulletPoints: [
          "Gatekeeping: Editors select which stories are published or spiked",
          "Framing: Defining how an event is explained to trigger public sympathy",
          "Priming: Establishing baseline standards for evaluation of public officials"
        ]
      },
      {
        term: "Two-Step Flow Theory",
        definition: "A model showing that communication flows from media to opinion leaders, and then from opinion leaders to the wider public.",
        bulletPoints: [
          "Laid down by Lazarsfeld, Berelson, and Gaudet in 1944",
          "Highlights the power of personal influence over direct media influence",
          "Limits the classic 'Hypodermic Needle' all-powerful effect model"
        ]
      },
      {
        term: "Cultivation Theory",
        definition: "Developed by George Gerbner, arguing that heavy exposure to television cultivates a distorted, fearful perception of social reality.",
        bulletPoints: [
          "Mean World Syndrome: Tendency to see the world as highly hostile",
          "Mainstreaming: Blurring of distinct community perspectives into homogeneous views",
          "Resonance: When real-world experiences match television violence"
        ]
      }
    ],
    summaryNote: "Theories of communication provide the diagnostic glasses to analyze social trends. A journalism graduate uses these frameworks to understand how audiences resist, select, or absorb media details. For instance, the 'Uses and Gratifications' model flips the question: instead of asking what media does to people, it asks what active choices people make to gratify their social utility."
  },
  {
    index: 7,
    id: "pr_advertising",
    title: "Public Relations & Advertising Craft",
    shortDesc: "Synthesize persuasion mechanics, public opinion trends, copy editing, and branding ethics.",
    academicUnit: "Unit 8: Corporate & Public Communications",
    objectives: [
      "Differentiate Public relations aims from pure marketing and advertising campaigns",
      "Identify the core elements of a standard, persuasive advertising module",
      "Explain public opinion, persuasion mechanisms, and corporate brand management",
      "Manage social and ethical complaints directed at exploitative advertisements"
    ],
    keyConcepts: [
      {
        term: "The PR Formula (RACE)",
        definition: "A structured methodology used by practitioners to execute public communication programs.",
        bulletPoints: [
          "Research: Diagnosing the organizational challenge or public attitude",
          "Action planning: Outlining campaigns, key goals, and budgets",
          "Communication execution: Deploying press packets, events, and releases",
          "Evaluation: Measuring audience reach and feedback quality"
        ]
      },
      {
        term: "Advertising Elements (AIDA)",
        definition: "The cognitive hierarchy representing the journey of a customer reacting to marketing material.",
        bulletPoints: [
          "Attention: Snatching focus with a powerful headline or visual shock",
          "Interest: Discussing features that align with personal consumer benefits",
          "Desire: Moving the prospect to want the product using emotional appeals",
          "Action: Clear trigger pointing where or how to execute purchase"
        ]
      },
      {
        term: "Social Marketing",
        definition: "Using classic marketing techniques to sell progress, health, or safety ideas rather than commercial products.",
        bulletPoints: [
          "Example: HIV awareness campaigns, tree-planting drives, or garbage cleanup",
          "Prioritizes societal welfare over private corporate margins",
          "Uses behavioral theories to drive community adaptation"
        ]
      }
    ],
    summaryNote: "Advertising buys commercial slot space to persuade instantly; Public Relations earns credibility through relationships, news coverage, and sustained mutual trust. The modern practitioner must balance creative copy-writing skills with rigorous code-of-conduct ethics to prevent greenwashing or deceptive advertising."
  },
  {
    index: 8,
    id: "conflict_management",
    title: "Conflict Management & Communication",
    shortDesc: "Learn strategies for defusing escalations, understanding conflict dynamics, and building win-win outcomes.",
    academicUnit: "Unit 9: Specialized Social Journalism",
    objectives: [
      "Identify how systemic social or institutional conflicts arise and evolve",
      "Contrast constructive versus destructive conflict dynamics in communities",
      "Delineate basic vocabularies like arbitration, mediation, and reconciliation",
      "Design communicative approaches to resolve hostilities in a cooperative way"
    ],
    keyConcepts: [
      {
        term: "Conflict Resolution Styles",
        definition: "The Thomas-Kilmann conflict mode instrument (TKI) which charts five typical reactions to opposing aims.",
        bulletPoints: [
          "Competing: Assertive and uncooperative (win-lose)",
          "Collaborating: Working together to discover custom options (win-win)",
          "Compromising: Finding quick, middle-ground concessions",
          "Avoiding: Postponing engagement or walking away from differences"
        ]
      },
      {
        term: "The Role of Communication",
        definition: "How active messaging can act as an accelerant or a fireproofing shield in community disputes.",
        bulletPoints: [
          "Peace Journalism: Highlighting solutions, human aspects, and systemic causes over blood counts",
          "De-escalating language: Avoiding labels, inflammatory words, and assumptions",
          "Active reframing: Translating angry accusations into underlying core needs"
        ]
      },
      {
        term: "Reframing Positions vs. Interests",
        definition: "The critical negotiation paradigm separating demands from actual underlying needs.",
        bulletPoints: [
          "Position: What the party claims they absolutely must have (e.g., 'We want this office')",
          "Interest: The underlying reason driving their claim (e.g., 'We need a quiet workspace')"
        ]
      }
    ],
    summaryNote: "Conflict is an inevitable feature of pluralistic societies. The goal of Conflict Management is not to suppress all disagreements, but to prevent them from escalating into destructive violence. Journalists have a powerful choice: they can practice 'War Journalism' which divides the field into 'us vs. them', or 'Peace Journalism' which explores structural dynamics, hears quiet moderates, and opens platforms for reconciliation."
  },
  {
    index: 9,
    id: "law_ethics_translation",
    title: "Media Law, Ethics & Translation Studies",
    shortDesc: "Deconstruct legal barriers (defamation, copyright), code of ethics, moral reasoning, and media translation.",
    academicUnit: "Unit 10: Legal, Moral & Translation Foundations",
    objectives: [
      "Understand media law development, constitutional press rights, and copyright limits",
      "Explain the fundamental ethical duties: truthfulness, autonomy, minimizing harm",
      "Operate moral reasoning frameworks (e.g., Potter Box) to sort ethical dilemmas",
      "Demonstrate translation methodologies for adapting international and local media texts"
    ],
    keyConcepts: [
      {
        term: "Libel and Defamation",
        definition: "The civil or criminal offense of publishing false statements that maliciously damage an individual's reputation.",
        bulletPoints: [
          "Truth is the absolute defense against defamation claims",
          "Public figures face higher criteria to prove malice in court",
          "Slander is verbal defamation, whereas libel is written/broadcasted"
        ]
      },
      {
        term: "Ethics Framework: The Potter Box",
        definition: "A classic blueprint for ethical decision-making that guides moral analysis through four chronological chambers.",
        bulletPoints: [
          "1. Definition: Appreciating all empirical facts of the dilemma",
          "2. Values: Listing key visual, financial, or professional codes involved",
          "3. Principles: Reflecting on philosophical approaches (e.g., Utilitarianism)",
          "4. Loyalties: Determining who the journalist ultimately owes allegiance to"
        ]
      },
      {
        term: "Media Translation Mechanics",
        definition: "Adapting print and broadcast copy from a source language to a target language without corrupting the intended flavor.",
        bulletPoints: [
          "Literal translation: Focuses solely on word-for-word accuracy (often yields awkward syntax)",
          "Dynamic equivalence: Translates meaning, culture, and sensory impact appropriately",
          "Transediting: Translating while editing for length, visual limit, or broadcast flow"
        ]
      }
    ],
    summaryNote: "While Media Law is enforced by courts with fines and prison terms, Media Ethics is enforced by the conscience, community peer accountability, and press councils. Ethically compromised reporting destroys public respect, leaving the press useless as a democratic guardian. In translation, a journalist acts as a cultural bridge, ensuring reports are faithful to the source and native to the target audience's ear."
  }
];
