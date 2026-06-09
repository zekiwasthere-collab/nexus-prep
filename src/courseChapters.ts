export interface CourseChapter {
  title: string;
  syllabusGoals: string;
}

export const courseChapters: Record<number, CourseChapter[]> = {
  0: [
    { title: "Theoretical Foundations of Development Communication", syllabusGoals: "Define key evolutionary steps of development reporting from modernization theory to today's active participatory models." },
    { title: "The Ethiopian Media Landscape & Legislative Frameworks", syllabusGoals: "Analyze Broadcast Proclamation 562/2007, FDRE Constitution Article 29 on press freedom, and traditional forums." },
    { title: "Critical National Development Debates & Environmental Journalism", syllabusGoals: "Synthesize development policies, farming cooperatives, minority representation, and investigative limits." }
  ],
  1: [
    { title: "UNESCO's MIL Framework & Algorithmic Echo Chambers", syllabusGoals: "Deconstruct global media literacy metrics and understand how social platform filters polarize public debates." },
    { title: "Digital Forensic Auditing & Fact-Checking Workflows", syllabusGoals: "Identify structural mechanisms of online disinformation, malinformation, and learn metadata verification techniques." },
    { title: "Scholarly Queries & Academic Search Systems", syllabusGoals: "Techniques for querying JSTOR, ScienceDirect, and separating objective facts from opinion pieces using Boolean constructs." }
  ],
  2: [
    { title: "Core News Values, Inverted Pyramids & Summary Leads", syllabusGoals: "Analyze how proximity, prominence, and impact govern news selection, and master hard news summary configurations." },
    { title: "The Chronology of Investigative Revelations & Sourcing Hygiene", syllabusGoals: "Trace how undercover observations, financial auditing, and confidential leak handlers build investigative proofs." },
    { title: "Legal Defamation Limits & Organization Style Guides", syllabusGoals: "Study civil and criminal libel boundaries, truth defenses, and maintain consistency using professional stylebooks." }
  ],
  3: [
    { title: "Literary Journalism, Feature Formats & Creative Narrative Hooks", syllabusGoals: "Distinguish features from hard news, explore travelogues or personal profiles, and master scene-by-scene structures." },
    { title: "Journalistic Interviews & Questioning Methodologies", syllabusGoals: "Design active listening pathways, deconstruct closed-ended vs. open-ended prompts, and handle difficult elite sources." },
    { title: "Humorous and Anecdotal Features & Personal Profiles", syllabusGoals: "Identify descriptive leads, apply active character-showing techniques, and write balanced biographical highlights." }
  ],
  4: [
    { title: "Writing for the Ear: conversational grammar & Scripting Rules", syllabusGoals: "Format radio news scripts, apply SVO syntax constraints, and simplify complex metrics for swift comprehension." },
    { title: "Acoustic Copy Formats & Natural Sound Layering", syllabusGoals: "Examine actualities, readers, wrapper configurations, and learn why NAT sound drives professional immersion." },
    { title: "Television Visual Coding & B-Roll Overlay Dynamics", syllabusGoals: "Integrate visual assets with corresponding audio lines, manage camera shot sequences, and write dual-column visual news." }
  ],
  5: [
    { title: "Intercultural Communication, Nonverbal Variations & Cultural Shock", syllabusGoals: "Study cross-cultural kinesics, nonverbal behaviors, and navigate honeymoons, distress crises, and recoveries." },
    { title: "The Geopolitics of News: Cultural Hegemony & Global Flows", syllabusGoals: "Deconstruct unilateral global communications, the Northwest news monopolies, and critical third-world NWICO arguments." },
    { title: "High vs. Low Context Frameworks & Interpersonal Adaptations", syllabusGoals: "Analyze Edward T. Hall's contextual variables and learn adaptation strategies across distinct cultural networks." }
  ],
  6: [
    { title: "Classic Mass Communication Models & The Multi-Step Flow", syllabusGoals: "Deconstruct Shannon-Weaver linear lines, Lazarsfeld's Two-step models, and evaluate how peer influence guides mass adoption." },
    { title: "Agenda-setting, Framing & Priming Media Mechanisms", syllabusGoals: "Understand how editors act as gatekeepers, shape public attention, and establish benchmark rating frameworks." },
    { title: "Gerbner's Cultivation Theory, Uses & Gratifications", syllabusGoals: "Explain Mean World Syndrome, cultural mainstreaming of attitudes, and focus on active audience utility selections." }
  ],
  7: [
    { title: "The Persuasion Sciences: PR RACE Formula & Brand Management", syllabusGoals: "Contrast public relations with advertising, and detail the four phases of RACING organizational communication campaigns." },
    { title: "AIDA Hierarchy, Creative Ad Layouts & Consumer Psychology", syllabusGoals: "Synthesize Attention, Interest, Desire, and Action transitions within successful print and digital marketing campaigns." },
    { title: "Sustained Social Marketing & Corporate Code Ethics", syllabusGoals: "Analyze marketing campaigns aimed at social good, behavioral transformations, and critique deceptive greenwashing traps." }
  ],
  8: [
    { title: "Systemic Social Hostilities & Hostility Development Stages", syllabusGoals: "Understand systemic and institutional dynamics that trigger hostilities, and study escalation characteristics." },
    { title: "Thomas-Kilmann TKI Resolution Modes & Peaceful Dialogues", syllabusGoals: "Contrast competing, collaborating, compromising, and avoiding responses, and learn methods for horizontal negotiations." },
    { title: "Peace Journalism vs. War Journalism Paradigms", syllabusGoals: "Apply structured peace-reporting principles, trace structural causes, and hear quiet moderators over binary counts." }
  ],
  9: [
    { title: "The FDRE Constitution Article 29 on censorship & Media Laws", syllabusGoals: "Perform regulatory studies on Broadcast Proclamation 562/2007 and analyze Hate Speech Proclamation 1185/2020." },
    { title: "The Potter Box Ethical Blueprint & Moral Principles", syllabusGoals: "Apply definitions, check values, verify principles (Kant, Utilitarianism), and balance loyalties to resolve dilemmas." },
    { title: "Media Translation Paradigms: Dynamic Equivalence & Transediting", syllabusGoals: "Critique literal translations, understand dynamic equivalents, and edit foreign press agency feeds perfectly." }
  ]
};
