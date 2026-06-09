import { Question } from "./types";

export const mockQuestions: Question[] = [
  // ================= MODULE 1: Development Journalism & Communication (IDs 1-10) =================
  {
    id: 1,
    moduleIndex: 0,
    courseName: "Development Journalism & Communication",
    blueprintTopic: "Conceptual Foundations of DJ",
    questionText: "What distinguishes 'Development Journalism' from conventional Western journalistic paradigms?",
    options: [
      "It focuses entirely on political scandals and sensational celebrity news.",
      "It actively cooperates with national building initiatives, reporting on long-range societal developments rather than just immediate sensations.",
      "It claims complete detachment from the moral and economic outcome of the society it studies.",
      "It is solely concerned with commercial advertisement and profit-generation schemes."
    ],
    correctOptionIndex: 1,
    explanation: "Development journalism (DJ) was born in Asia and Latin America in the 1960s to bridge the gap between reporting and national growth programs. It encourages active engagement with societal progress, focusing on socio-economic obstacles, rural realities, and infrastructure failures in a supportive yet critical manner."
  },
  {
    id: 2,
    moduleIndex: 0,
    courseName: "Development Journalism & Communication",
    blueprintTopic: "Practice in Africa and Ethiopia",
    questionText: "Which of the following is a recurrent criticism leveled against the practice of Development Journalism in post-independent African countries, including Ethiopia?",
    options: [
      "It places excessive emphasis on individualistic entertainment culture.",
      "It can be manipulated by state authorities to serve as a mouthpiece for government policies, blending journalism with state propaganda.",
      "It rejects the use of any technology, focusing only on oral folklore.",
      "It forbids journalists from covering scientific innovations or farming developments."
    ],
    correctOptionIndex: 1,
    explanation: "While development journalism aims to help nation-building, its close integration with national policies in nations like Ethiopia has historically created loopholes where state authorities demand unquestioned positive coverage of government schemes, thereby weakening the press's oversight (watchdog) role."
  },
  {
    id: 3,
    moduleIndex: 0,
    courseName: "Development Journalism & Communication",
    blueprintTopic: "Participatory vs Top-Down Models",
    questionText: "In the context of Development Communication (DevCom), what designates the primary shift from 'Diffusion of Innovations' to the 'Participatory Communication' model?",
    options: [
      "A shift from a bottom-up stakeholder focus to an exclusively top-down centralized instruction delivery.",
      "A shift from linear monologues by expert elites to dialogic, horizontal engagement and empowerment of local communities.",
      "Abandoning the use of radio transmitters entirely.",
      "Ignoring the opinions of rural populations to prioritize urban elite priorities."
    ],
    correctOptionIndex: 1,
    explanation: "Traditional diffusion models (like Lerner's and Rogers' early positions) leaned heavily on a top-down unilateral dissemination of expert ideas. The participatory paradigm demands that community members define their own struggles, share local wisdom, and participate as equal communication agents."
  },
  {
    id: 4,
    moduleIndex: 0,
    courseName: "Development Journalism & Communication",
    blueprintTopic: "Media in Rura Development Projects",
    questionText: "Which medium has historically proved to be the most cost-effective and structurally adaptive tool for rural development communication in sub-Saharan African projects?",
    options: [
      "Interactive high-definition satellite television",
      "High-speed optical fiber broadbands",
      "Local community radio broadcasting and matching listener forums",
      "Print newspapers written with high academic vocabulary"
    ],
    correctOptionIndex: 2,
    explanation: "Community radio bypasses high illiteracy barriers, requires low capital costs to operate, reaches deep rural villages with regional languages, and provides listener forums which facilitate local participation, making it the premier tool of DevCom."
  },
  {
    id: 5,
    moduleIndex: 0,
    courseName: "Development Journalism & Communication",
    blueprintTopic: "Functions: Environmental Protection",
    questionText: "How can development journalists effectively promote local water conservation projects and environmental stewardship without alienating audiences?",
    options: [
      "By publishing raw spreadsheets of technical data without translations.",
      "By centering human-interest perspectives, translating dry ecological metrics into communal survival costs, and presenting viable citizen-led responses.",
      "By threatening immediate doom and blaming the entire rural population.",
      "By restricting all communications to high-cost premium mobile apps."
    ],
    correctOptionIndex: 1,
    explanation: "Effective development journalism translates dry scientific facts into local narratives. Highlighting a local farming group's successful terrace construction, for example, motivates others through proximity and localized efficacy, rather than trigger fatigue through mere catastrophe metrics."
  },
  {
    id: 6,
    moduleIndex: 0,
    courseName: "Development Journalism & Communication",
    blueprintTopic: "Theoretical Frameworks of Development",
    questionText: "The 'Modernization Theory' of development communication popular in the 1950s assumed that:",
    options: [
      "Developing nations must forge completely isolated native paths rejecting international markets.",
      "Traditional societies would naturally progress by absorbing Western values, media structures, and capital-intensive technologies.",
      "Underdevelopment was primarily caused by European colonization, requiring radical news embargoes.",
      "Media has zero direct effect on individual values or lifestyle adjustments."
    ],
    correctOptionIndex: 1,
    explanation: "Modernization theory (e.g., Daniel Lerner's 'The Passing of Traditional Society') assumed a deterministic, linear path toward modern industrialization. It argued that introducing empathy and Western-style mass media into traditional settings would naturally catalyze rapid socio-economic emulation."
  },
  {
    id: 7,
    moduleIndex: 0,
    courseName: "Development Journalism & Communication",
    blueprintTopic: "Dependency Theory Critiques",
    questionText: "What was the core assertion of 'Dependency Theory' regarding the flow of communication resources?",
    options: [
      "Global wealth flow was perfectly balanced between Western and Southern nations.",
      "The intellectual and cultural dependence of developing nations was directly generated by the structure of global core-periphery capitalism.",
      "Socio-economic growth is completely independent of international news flows.",
      "The expansion of internet lines would eliminate all geopolitical class divides automatically."
    ],
    correctOptionIndex: 1,
    explanation: "Dependency theorists (like Andre Gunder Frank) argued that underdevelopment is not a natural starting state, but an actively constructed economic reality. They asserted that global media and communications flow from the colonial core to the dependency periphery, keeping peripheral nations submissive."
  },
  {
    id: 8,
    moduleIndex: 0,
    courseName: "Development Journalism & Communication",
    blueprintTopic: "Practice in Ethiopia",
    questionText: "In Ethiopian media developmental reporting, what does 'agricultural extension communication' primarily focus on?",
    options: [
      "Promoting urban real-estate investments across metropolitan hubs.",
      "Disseminating localized farming tips, modern fertilizer guidelines, weather forecasts, and yield optimization updates.",
      "Restricting agricultural insights to academic databases.",
      "Replacing all crop farming with digital services."
    ],
    correctOptionIndex: 1,
    explanation: "As an agrarian-centered economy, Ethiopian development media focuses heavily on agrarian extension communication. It utilizes radio programs, regional bulletins, and field workshops to transmit crucial soil conservation, planting, and pest-control tips directly to smallholder farming groups."
  },
  {
    id: 9,
    moduleIndex: 0,
    courseName: "Development Journalism & Communication",
    blueprintTopic: "Oromo Traditional Communication System",
    questionText: "What represents an authentic 'indigenous communication channel' traditionally utilized for conflict resolution and democratic decision-making in Ethiopia?",
    options: [
      "The classic state-backed television debate show",
      "The Oromo Gadaa system's assembly councils and oral advisory forums",
      "The central legal newspaper publications of Addis Ababa",
      "Unregulated satellite communication networks"
    ],
    correctOptionIndex: 1,
    explanation: "Before modern mass media, traditional networks like the Oromo Gadaa assembly (Chaffee) served as indigenous democratic platforms. DevCom theories encourage integrating these trusted, culturally integrated community networks into modern developmental communication campaigns."
  },
  {
    id: 10,
    moduleIndex: 0,
    courseName: "Development Journalism & Communication",
    blueprintTopic: "Evaluating the Impact of DevCom campaigns",
    questionText: "Which evaluation approach is ideal for determining if a sanitary health communication campaign actually altered communal behavioral practices?",
    options: [
      "Simply counting how many pamphlets were printed and shipped.",
      "Deploying a systematic mixed-method approach measuring both media exposure and actual long-term behavioral compliance among the target group.",
      "Measuring the stock fluctuations of international soap companies.",
      "Relying purely on the subjective feedback of the regional government governor."
    ],
    correctOptionIndex: 1,
    explanation: "Output indicators (e.g., pamphlets distributed) are shallow metrics. Effective DevCom evaluation requires measuring outcome and impact indicators—using focus groups, localized audits, and surveys to discover if actual behavior changed as a result of exposure."
  },

  // ================= MODULE 2: Media & Information Literacy (IDs 11-20) =================
  {
    id: 11,
    moduleIndex: 1,
    courseName: "Media & Information Literacy (MIL)",
    blueprintTopic: "MIL Conceptual Meanings",
    questionText: "What is the primary educational goal of UNESCO's 'Media and Information Literacy' (MIL) package?",
    options: [
      "To discourage citizens from accessing any digital news platform.",
      "To empower citizens with the critical skills to access, critically analyze, evaluate, and act as ethical creators of media contents.",
      "To train all citizens to write complex software code.",
      "To establish state-controlled censorship filters over internet cafes."
    ],
    correctOptionIndex: 1,
    explanation: "MIL stands as a combined conceptual framework from UNESCO. Its purpose is not to restrict media consumption, but to develop critical thinking skills so that individuals can navigate information overload, spot biases, and participate in civic life in a safe, constructive way."
  },
  {
    id: 12,
    moduleIndex: 1,
    courseName: "Media & Information Literacy (MIL)",
    blueprintTopic: "Fact Checking & Verification",
    questionText: "When verify an online viral video during a crisis, which step is considered vital for a professional journalist?",
    options: [
      "Immediately downloading and sharing the video to maximize social page views.",
      "Performing metadata extraction, utilizing reverse image searches on key frames, and verifying the physical location via satellite imagery.",
      "Assuming the video is perfectly authentic if it has over 100,000 likes.",
      "Consulting an AI text-generation app to ask if the video is true."
    ],
    correctOptionIndex: 1,
    explanation: "Digital content must be rigorously authenticated. Professional tools (such as InVID or Google Reverse Image Search) coupled with geolocation mapping and weather consistency analysis allow journalists to confirm if visual footage represents the claimed place, time, and incident."
  },
  {
    id: 13,
    moduleIndex: 1,
    courseName: "Media & Information Literacy (MIL)",
    blueprintTopic: "Information Source Evaluation",
    questionText: "Which of the following describes the 'CRAAP Test' used in evaluating academic and journalistic resources details?",
    options: [
      "Confidence, Rhetoric, Authority, Action, and Popularity",
      "Currency, Relevance, Authority, Accuracy, and Purpose",
      "Censorship, Redundancy, Attribution, Analytics, and Power",
      "Credentials, Re-reads, Audio, Abstract, and Peer-reviews"
    ],
    correctOptionIndex: 1,
    explanation: "The CRAAP test is a widely recognized tool for evaluating research resources. It asks users to investigate: Is it up-to-date (Currency)? Does it fit your topic (Relevance)? Who is the creator (Authority)? Is it truthful and backed by logic (Accuracy)? Why does this site exist (Purpose)?"
  },
  {
    id: 14,
    moduleIndex: 1,
    courseName: "Media & Information Literacy (MIL)",
    blueprintTopic: "Internet & Search Engine Logic",
    questionText: "How do search engine algorithms typically determine which websites appear at the top of a user's organic search results?",
    options: [
      "They manually choose sites preferred by government authorities.",
      "They analyze spider index crawling datasets, keyword relevance, backlinks, speed, and user engagement metrics.",
      "They sort pages strictly alphabetically by their meta description titles.",
      "They require all websites to pay a standard fee to be indexed at all."
    ],
    correctOptionIndex: 1,
    explanation: "Modern search engines use automated web crawlers (spiders) to cache content, indexing pages based on complex ranking parameters such as authority, semantic matching, click-through rates, and mobile performance."
  },
  {
    id: 15,
    moduleIndex: 1,
    courseName: "Media & Information Literacy (MIL)",
    blueprintTopic: "The Deep Web and Academic Databases",
    questionText: "Why can common search engines like Google fail to fetch peer-reviewed papers located inside research databases like JSTOR or ScienceDirect?",
    options: [
      "Because academic journals do not use the standard HTTP browser network structure.",
      "Because much of their content is behind paywalls or dynamic query walls (the Deep Web) that standard crawlers are blocked from indexing directly.",
      "Because all academic papers are encrypted with private government military keys.",
      "Because academic authors explicitly forbid search engines from knowing their titles."
    ],
    correctOptionIndex: 1,
    explanation: "The Deep Web includes content that standard search engine crawlers cannot index. Databases, dynamic forms, and paywalled structures require specialized institutional authentication, keeping them out of default search index caches."
  },
  {
    id: 16,
    moduleIndex: 1,
    courseName: "Media & Information Literacy (MIL)",
    blueprintTopic: "Fact Checking: Spotting Disinformation",
    questionText: "What represents the fundamental psychological driver behind the rapid spread of viral 'fake news' on social platforms?",
    options: [
      "The widespread lack of affordable mobile data packages in urban sectors.",
      "Confirmation bias coupled with high emotional arousal (such as fear, anger, or tribal triumph) which makes users eager to share without auditing.",
      "The high mathematical difficulty of checking digital timestamps.",
      "The systematic replacement of human editors with automated fax machines."
    ],
    correctOptionIndex: 1,
    explanation: "Disinformation is engineered to trigger immediate, intense emotional reactions. When users see content that validates their pre-existing fears or biases, they undergo 'cognitive shortcutting' and share the item to gain community consensus, bypassing critical analysis."
  },
  {
    id: 17,
    moduleIndex: 1,
    courseName: "Media & Information Literacy (MIL)",
    blueprintTopic: "Social Media Echo Chambers",
    questionText: "What is the direct consequence of social media platform 'filter bubbles' on public discourse?",
    options: [
      "An increase in objective cross-political dialogue.",
      "A systematic polarization where users are exposed only to opinions that align with their own, reinforcing biases and demonizing opposing views.",
      "The complete conversion of all internet content to video format.",
      "The total eradication of all non-commercial content on social networks."
    ],
    correctOptionIndex: 1,
    explanation: "Social media business models thrive on user engagement. Algorithmic feeds learn your preferences and continuously serve similar content, isolating you from diverse perspectives and fueling political and cultural polarization."
  },
  {
    id: 18,
    moduleIndex: 1,
    courseName: "Media & Information Literacy (MIL)",
    blueprintTopic: "Evaluating Information Sources",
    questionText: "A verified checkmark on a social network page primarily signifies that:",
    options: [
      "The facts published by the page are fully audited and guaranteed to be true by local journalists.",
      "The platform has confirmed that the account belongs to the actual public figure or brand it claims to represent.",
      "The poster holds a recognized university degree in communication studies.",
      "The account is protected from any legal litigation regarding libel claims."
    ],
    correctOptionIndex: 1,
    explanation: "A verification badge indicates authenticity of identity, not truthfulness of output. Bad actors can be verified individuals who publish biased or misleading statements, meaning MIL-literate students must still evaluate their claims critically."
  },
  {
    id: 19,
    moduleIndex: 1,
    courseName: "Media & Information Literacy (MIL)",
    blueprintTopic: "Academic Database Querying",
    questionText: "Which Boolean query will fetch resources mentioning journalism in Ethiopia, but strictly omit sports reporting?",
    options: [
      "journalism OR Ethiopia NOT sports",
      "(journalism AND Ethiopia) NOT sports",
      "journalism + Ethiopia + sports_yes",
      "Ethiopian_journalism / sports"
    ],
    correctOptionIndex: 1,
    explanation: "Boolean logic employs precise operators. High-quality database querying uses parentheses to group terms: `(journalism AND Ethiopia)` secures documents containing both parameters, while the `NOT sports` operator guarantees documents mentioning sports are discarded."
  },
  {
    id: 20,
    moduleIndex: 1,
    courseName: "Media & Information Literacy (MIL)",
    blueprintTopic: "Fact Checking Mechanics",
    questionText: "When checking the authenticity of a photo used to report a current conflict in Ethiopia, what should a media analyst look for in EXIF metadata?",
    options: [
      "The font color used to add headings to the image.",
      "Original camera model, captured timestamp, lens coordinates, and post-creation conversion software details.",
      "The price of the camera at retail markets.",
      "The total social shares the image has accumulated."
    ],
    correctOptionIndex: 1,
    explanation: "EXIF metadata is embedded in digital image files. Examining it provides objective records including the date, camera parameters, and sometimes GPS location coordinates, proving whether the image is current or an edited reuse of historical files."
  },

  // ================= MODULE 3: News Writing & Investigative Reporting (IDs 21-30) =================
  {
    id: 21,
    moduleIndex: 2,
    courseName: "News Writing & Investigative Reporting",
    blueprintTopic: "News Values & Core Concepts",
    questionText: "Which news value is prominent in an immediate flash update about a sudden policy shift by the National Bank of Ethiopia?",
    options: [
      "Oddity / Unusualness",
      "Timeliness and Impact",
      "Personal profile background features",
      "Pre-historical context"
    ],
    correctOptionIndex: 1,
    explanation: "Policy shifts by national banks happen instantly (Timeliness) and directly manipulate currency value, interest margins, and household budgets nationwide (Impact)."
  },
  {
    id: 22,
    moduleIndex: 2,
    courseName: "News Writing & Investigative Reporting",
    blueprintTopic: "Investigative Stages",
    questionText: "What represents the critical first step in starting an investigative journalism project?",
    options: [
      "Publishing a rough profile of suspect individuals based on intuition.",
      "Idea generation, research validation, and formulation of a clear, verifiable working hypothesis.",
      "Confronting suspects in public before gathering any actual files.",
      "Applying for structural funding from foreign public agencies."
    ],
    correctOptionIndex: 1,
    explanation: "Investigative journalism relies on empirical processes. It begins with a hypothesis (e.g., 'Municipal funds are being diverted to a private contractor'). The journalist then gathers evidence systematically to verify or reject this hypothesis."
  },
  {
    id: 23,
    moduleIndex: 2,
    courseName: "News Writing & Investigative Reporting",
    blueprintTopic: "The news Lead",
    questionText: "What is the primary function of a hard news 'summary lead'?",
    options: [
      "To describe the weather and physical atmosphere surrounding the reporter.",
      "To deliver the most critical information (who, what, where, when, why, how) in the first sentence of the story.",
      "To introduce all the historical precedents of the central incident stretching back a century.",
      "To state the personal opinion and political bias of the reporter on the matter."
    ],
    correctOptionIndex: 1,
    explanation: "A summary lead respects the busy reader's time. It isolates the absolute climax of the event, giving the most significant facts immediately. The remaining details are parsed in descending priority using the inverted pyramid model."
  },
  {
    id: 24,
    moduleIndex: 2,
    courseName: "News Writing & Investigative Reporting",
    blueprintTopic: "Source Verification and Hygiene",
    questionText: "A reporter receives confidential leak documents showing corporate bribery. What is the most ethical path before publishing?",
    options: [
      "Immediately post the files to a personal social blog to avoid missing the news scoop.",
      "Verify the authenticity of the documents, analyze the source's motives, protect their identity, and seek active responses from the accused corporation.",
      "File a police report and surrender the source's name to demonstrate civic cooperation.",
      "Destroy the files to safeguard the company's local employment footprint."
    ],
    correctOptionIndex: 1,
    explanation: "Ethical news values require multi-source validation. A professional journalist checks leaks for fabrication, consults secondary corroborators, hides the leak source's identity, and contacts the accused party for rebuttal, ensuring a balanced, fair story."
  },
  {
    id: 25,
    moduleIndex: 2,
    courseName: "News Writing & Investigative Reporting",
    blueprintTopic: "Hard News vs Opinion",
    questionText: "Which statement exemplifies professional, objective hard news style?",
    options: [
      "The greedy minister lazily arrived hours after the brilliant community meeting finished.",
      "The regional water bureau director stated that three dams reached maximum capacity yesterday, forcing spillways to open.",
      "I believe the municipal assembly is highly incompetent for refusing to renovate the historic theater.",
      "It is incredibly obvious that the current administrative choices will lead to instant economic ruin."
    ],
    correctOptionIndex: 1,
    explanation: "Objective hard news relies on factual, non-emotional statements of event details and clear attribution of sources (' bureau director stated...'). It strictly eliminates personal opinion adjectives like 'greedy', 'lazily', or 'brilliant'."
  },
  {
    id: 26,
    moduleIndex: 2,
    courseName: "News Writing & Investigative Reporting",
    blueprintTopic: "House Style Guides",
    questionText: "Why do professional media organizations utilize rigid 'House Style Guides' (e.g., AP Stylebook)?",
    options: [
      "To force journalists to express identical political preferences.",
      "To maintain stylistic consistency across spelling, abbreviation, grammar, punctuation, and formatting, projecting organizational authority.",
      "To make the newspaper harder for competitors to match.",
      "To provide templates so journalists don't have to gather real facts anymore."
    ],
    correctOptionIndex: 1,
    explanation: "House style guides guarantee unity. Having diverse spelling of names, numbers, or designations within a single newspaper degrades credibility. Uniformity projects professional discipline and focus."
  },
  {
    id: 27,
    moduleIndex: 2,
    courseName: "News Writing & Investigative Reporting",
    blueprintTopic: "Investigative Qualities & Safety",
    questionText: "What classic investigative document audit technique is commonly referred to as 'following the money trail'?",
    options: [
      "Paying suspects in cash to confess to the media.",
      "Tracing financial transfers, government budget allocations, tax declarations, and corporate bank histories to discover illicit transactions.",
      "Physically standing outside bank doors waiting to record patrons.",
      "Taking bribes from local authorities to stop investigating private enterprises."
    ],
    correctOptionIndex: 1,
    explanation: "Financial paper trails are difficult to falsify. Tracking discrepancies in municipal budgets, tracking transactions to shell companies, or checking contract costs against market rates provides concrete, objective evidence of corruption."
  },
  {
    id: 28,
    moduleIndex: 2,
    courseName: "News Writing & Investigative Reporting",
    blueprintTopic: "News Sources: Off-the-Record",
    questionText: "If a news source agrees to speak only 'on deep background', what are the conditions for using this details?",
    options: [
      "The reporter can use the information as a direct quote and cite the source by name and official job title.",
      "The reporter can use the details for guidance and search, but cannot quote the source or identify them, not even by generic description.",
      "The information cannot be shared with the news editor, but must be published under a pseudonym.",
      "The reporter is legally required to pay the source for their testimony."
    ],
    correctOptionIndex: 1,
    explanation: "'Deep background' is highly restrictive. Unlike 'on background' (which allows attributing details to 'a senior water engineer'), 'deep background' means the information can only be used to orient the reporter's search. The source cannot be named or quoted, even indirectly."
  },
  {
    id: 29,
    moduleIndex: 2,
    courseName: "News Writing & Investigative Reporting",
    blueprintTopic: "News Values: Proximity",
    questionText: "An editor of an Awasa-based community newspaper rejects a high-quality global space exploration story to cover a localized water pipe burst. What value justifies this choice?",
    options: [
      "Prominence of astronauts",
      "Geographical Proximity and direct relevance to local readers",
      "Sensationalism",
      "Conflict of international interest"
    ],
    correctOptionIndex: 1,
    explanation: "Proximity defines news relevance. A local community in Awasa is direct affected by regional utility failures. For a local newspaper, proximity makes a local service interruption far more significant than a distant, abstract international event."
  },
  {
    id: 30,
    moduleIndex: 2,
    courseName: "News Writing & Investigative Reporting",
    blueprintTopic: "Investigative Safety & Vetting",
    questionText: "Before publishing an expose charging public figures with major crimes, why must media houses perform systematic legal vetting?",
    options: [
      "To secure permits and clearance from local police branches to publish.",
      "To evaluate libel, slander, and defamation risks, ensuring every claim is backed by bulletproof, legally defensible documentation.",
      "To check if the suspect figures would like to sponsor the media house to drop the expose.",
      "To ensure the story is translated into at least seven continental languages."
    ],
    correctOptionIndex: 1,
    explanation: "Legal vetting protects the news organization. If a charged figure files a libel lawsuit, the media house must prove in court that its statements are true. Vetting ensures that evidence is legally gathered and sufficient to defend against litigation."
  },

  // ================= MODULE 4: Feature Writing & Interviewing Style (IDs 31-40) =================
  {
    id: 31,
    moduleIndex: 3,
    courseName: "Feature Writing & Interview Styles",
    blueprintTopic: "Feature vs News Writing",
    questionText: "What represents a fundamental difference between hard news articles and feature articles?",
    options: [
      "Hard news articles must be true, while feature articles can be completely fabricated of thin air.",
      "Hard news uses the highly urgent inverted pyramid structure, while features rely on non-linear narrative, scenic descriptions, and deeper character analyses.",
      "Hard news can only be broadcast on radio, while features are restricted to physical magazines.",
      "Features refuse to reference any source quotes or direct attributions."
    ],
    correctOptionIndex: 1,
    explanation: "Features move away from the rigid restrictions of the inverted pyramid. They employ literary strategies—such as scene-by-scene construction, descriptive adjectives, dialogue, and suspense—while maintaining factual precision."
  },
  {
    id: 32,
    moduleIndex: 3,
    courseName: "Feature Writing & Interview Styles",
    blueprintTopic: "Interview Questions",
    questionText: "What type of question is ideal for retrieving spontaneous, deep thoughts from an interviewee during a feature profile?",
    options: [
      "Closed-ended questions requiring simple 'yes' or 'no' confirmations.",
      "Open-ended, probing questions beginning with 'Why' or 'How' that invite narration.",
      "Leading questions that force the subject to agree with the reporter's biases.",
      "Highly complex compound questions that combine three separate queries into one."
    ],
    correctOptionIndex: 1,
    explanation: "Open-ended questions (e.g., 'How did you navigate that failure?') allow the interviewee to express their inner motivations and recount detailed memories. This is crucial for capturing the human depth needed in feature stories."
  },
  {
    id: 33,
    moduleIndex: 3,
    courseName: "Feature Writing & Interview Styles",
    blueprintTopic: "Feature Type: Personal Profile",
    questionText: "When writing a professional 'Personal Profile' feature, a journalist should:",
    options: [
      "Write exclusively about the individual's awards and public statements.",
      "Interview the subject's colleagues, peers, and critics, and observe their daily environmental habits to portray a complex, rounded human being.",
      "Rely entirely on the subject's personal website bio to construct the story.",
      "Ensure the subject gets to write and review the final paragraphs before publication."
    ],
    correctOptionIndex: 1,
    explanation: "A profile must go beyond publicity handouts. Incorporating diverse source perspectives, counterpoints, and active real-life observations (e.g., how they speak to assistants, what books sit in their office) reveals their genuine identity."
  },
  {
    id: 34,
    moduleIndex: 3,
    courseName: "Feature Writing & Interview Styles",
    blueprintTopic: "Creative Nonfiction Techniques",
    questionText: "What does the literary journalism instruction 'Show, Don't Tell' mean in feature writing?",
    options: [
      "Using photos to replace the entire text block of the feature.",
      "Using vivid sensory details and active verbs so readers can experience the scene mentally, rather than stating conclusions directly in the text.",
      "Forcing the author to make appearances in all video coverage of the story.",
      "Leaving the article layout messy so readers have to guess the outcome."
    ],
    correctOptionIndex: 1,
    explanation: "Instead of telling the reader 'The town was poor' (telling), a writer shows this by describing 'Cracked clay walls, empty food grain sacks used as roofing, and children lining up at empty water wells' (showing). This fosters emotional connection."
  },
  {
    id: 35,
    moduleIndex: 3,
    courseName: "Feature Writing & Interview Styles",
    blueprintTopic: "Anecdotal Feature Leads",
    questionText: "An 'anecdotal lead' in a feature story serves to:",
    options: [
      "Give the total statistical data of the national budget instantly.",
      "Introduce a microscopic, engaging human scene or experience that serves as an allegory or gateway to the broader macro-topic.",
      "List all source names in alphabetical order.",
      "State the absolute conclusion of the entire article in the opening sentence."
    ],
    correctOptionIndex: 1,
    explanation: "Anecdotal leads ease readers into heavy subjects. For instance, explaining a single child's morning routine to fetch muddy water (the anecdote) provides an intimate, human entry point to a broad feature on national irrigation infrastructure."
  },
  {
    id: 36,
    moduleIndex: 3,
    courseName: "Feature Writing & Interview Styles",
    blueprintTopic: "Interview Ethics",
    questionText: "If an interviewee says something controversial, then quickly claims it was 'off-the-record' *after* they already said it, how should the reporter handle this?",
    options: [
      "The reporter is bound to drop it because 'off-the-record' statements apply retroactively.",
      "The reporter can ethically use it because off-the-record agreements must be established *prior* to sharing the details, though they should weigh public interest and personal goodwill.",
      "The reporter must notify the police about the source's claims immediately.",
      "The reporter must delete the entire interview file and start again."
    ],
    correctOptionIndex: 1,
    explanation: "Off-the-record agreements are contract-like; they cannot be applied retroactively after saying something controversial. Legally and ethically, the information is on-the-record. However, professionals weigh the safety of the source, goodwill, and public interest before publishing."
  },
  {
    id: 37,
    moduleIndex: 3,
    courseName: "Feature Writing & Interview Styles",
    blueprintTopic: "Human Interest Features",
    questionText: "Which of the following topics fits the definition of a 'Human Interest' feature?",
    options: [
      "A raw list of daily commodity exchange tariffs on coffee.",
      "An intimate narrative about a self-taught technician in Merkato who refurbishes diagnostic medical machines for local rural clinics.",
      "The verbatim legal text of a treaty signed by three neighboring countries.",
      "A corporate press release announcing the purchase of office furniture."
    ],
    correctOptionIndex: 1,
    explanation: "Human interest features focus on human experience. They deal with challenges, ingenuity, and emotional journeys, making them highly relatable and engaging for the reading public."
  },
  {
    id: 38,
    moduleIndex: 3,
    courseName: "Feature Writing & Interview Styles",
    blueprintTopic: "Feature Structure: Nut Graph",
    questionText: "What is the function of the 'nut graph' in a descriptive feature story?",
    options: [
      "It lists the names of the botanical plants studied during the research.",
      "It acts as the paragraph that explains the core thesis and significance of the story, explaining why the reader should care about the theme.",
      "It is a paragraph written with absolute slang to amuse younger readers.",
      "It represents the direct list of references and bibliography at the end."
    ],
    correctOptionIndex: 1,
    explanation: "Features often open with creative, meandering leads. The 'nut graph' (conceptualized as the nut of the story in a nutshell) follows this lead, outlining the true magnitude, relevance, and focus of the piece."
  },
  {
    id: 39,
    moduleIndex: 3,
    courseName: "Feature Writing & Interview Styles",
    blueprintTopic: "Conducting Investigative Interviews",
    questionText: "When interviewing an evasive corporate executive during an investigative feature, what is a crucial interviewing strategy?",
    options: [
      "Becoming physically aggressive and shouting accusations instantly.",
      "Asking precise, single-focus questions backed by document evidence, and patiently waiting through silence for actual answers.",
      "Allowing the executive to completely steer the conversation to irrelevant public relation achievements.",
      "Surrendering all documents to the executive to gain cooperative approval."
    ],
    correctOptionIndex: 1,
    explanation: "In investigative interviews, precision and self-control are key. Having documentation (e.g., invoices, previous statements) prevents evasion. Asking direct, narrow questions forces the subject to respond to the evidence, while silence can reveal discomfort or evasion."
  },
  {
    id: 40,
    moduleIndex: 3,
    courseName: "Feature Writing & Interview Styles",
    blueprintTopic: "Reviewing Writing Styles",
    questionText: "To write structured, high-quality features, a journalist should perform thematic analysis on the writing of peer authors to:",
    options: [
      "Directly plagiarize entire paragraphs to save editing labor.",
      "Identify narrative strategies, transition styles, scene pacing, and stylistic techniques to expand their own writing skills.",
      "Publish public critiques mock their competitors' writing habits.",
      "Verify if the peers are using unauthorized software to write."
    ],
    correctOptionIndex: 1,
    explanation: "Thematic reading of master journalists helps writers build a mental catalog of narrative styles, such as how to bridge dry statistics into human moments or transition smoothly between scenes."
  },

  // ================= MODULE 5: Broadcast Journalism & Writing for Ear/Eye (IDs 41-50) =================
  {
    id: 41,
    moduleIndex: 4,
    courseName: "Broadcast Journalism & Writing for Ear/Eye",
    blueprintTopic: "Characteristics of Broadcast Media",
    questionText: "Why is 'immediacy' considered the defining operational characteristic of radio news as compared to traditional print newspapers?",
    options: [
      "Radio news takes weeks to package and translate.",
      "Radio programs can bypass physical logistics, instantly transmitting active emergency alerts and live bulletins directly to listeners.",
      "Radio operates without any regulatory constraints from national authorities.",
      "Radio requires audience members to buy expensive paper copies every day."
    ],
    correctOptionIndex: 1,
    explanation: "Unlike newspapers, which require physical layout, printing, and delivery, radio can air live updates instantly, making it a critical tool for breaking news and emergency management."
  },
  {
    id: 42,
    moduleIndex: 4,
    courseName: "Broadcast Journalism & Writing for Ear/Eye",
    blueprintTopic: "Writing for the Ear",
    questionText: "How should numbers and metrics be formatted in a radio news broadcast script according to professional guidelines?",
    options: [
      "They should be written in long decimals containing all exact numbers (e.g., 'birr 3,456,712.45').",
      "They should be rounded off and written as they sound (e.g., 'nearly three-point-five million birr') to help the anchor read smoothly and listeners comprehend instantly.",
      "They should be completely omitted from the script to avoid confusing the audience.",
      "They should be written in complex Roman numerals."
    ],
    correctOptionIndex: 1,
    explanation: "Radio listeners cannot pause or re-read numbers. Writing 'nearly 3.5 million birr' rather than '3,456,712.45' makes the details easier to read for the anchor and simpler for the audience to digest instantly."
  },
  {
    id: 43,
    moduleIndex: 4,
    courseName: "Broadcast Journalism & Writing for Ear/Eye",
    blueprintTopic: "Broadcast news script punctuation",
    questionText: "Why do radio news scriptwriters frequently use dashes (--) or ellipses (...) instead of standard colons or complex semicolons?",
    options: [
      "Because broadcast keyboards lack standard comma or semicolon buttons.",
      "To serve as clear visual breathing cues for the anchor, indicating pauses and vocal transitions to fit conversational rhythm.",
      "Because local regulatory rules require replacing punctuation with code.",
      "To obscure the meaning of sentences from external monitors."
    ],
    correctOptionIndex: 1,
    explanation: "Broadcast scripts are made for oral delivery. Semicolons and colons can be difficult to interpret visually when reading under pressure. Dashes and ellipses represent vocal pauses, encouraging a natural, conversational delivery."
  },
  {
    id: 44,
    moduleIndex: 4,
    courseName: "Broadcast Journalism & Writing for Ear/Eye",
    blueprintTopic: "The TV Broadcast Package",
    questionText: "In a television news report package, what is B-Roll?",
    options: [
      "The secondary backup script used in case the Teleprompter fails.",
      "The supplemental visual footage that runs while the voice of the reporter or sources narrates the scene.",
      "A complete list of the camera technician names displayed at the end.",
      "A low-quality audio sound bite recorded inside moving vehicles."
    ],
    correctOptionIndex: 1,
    explanation: "B-roll provides visual support for the story. Showing a dry reservoir (B-roll) while the reporter talks about a drought makes the narrative much more engaging and credible than just displaying a talking analyst."
  },
  {
    id: 45,
    moduleIndex: 4,
    courseName: "Broadcast Journalism & Writing for Ear/Eye",
    blueprintTopic: "Broadcast Source Attribution",
    questionText: "Where must source attribution be placed in a broadcast news script compared to print news styles?",
    options: [
      "At the end of the entire multi-sentence paragraph, matching print style.",
      "At the very beginning of the sentence (e.g., 'The Police Commissioner says...'), before the claim is made.",
      "In a separate appendix file read only at midnight broadcasts.",
      "Attributions are entirely forbidden in all broadcast media scripts."
    ],
    correctOptionIndex: 1,
    explanation: "In print, you often see: 'The project is over-budget, said the mayor.' In broadcast, this structure can lead to confusion because the audience hears the claim first without context. Placing attribution at the beginning (e.g., 'Mayor Adane reports that the project is over-budget') makes the source of the claim instantly clear."
  },
  {
    id: 46,
    moduleIndex: 4,
    courseName: "Broadcast Journalism & Writing for Ear/Eye",
    blueprintTopic: "Sound Bites: Selection",
    questionText: "The ideal length of a standard radio news actuality (sound bite) should typically be:",
    options: [
      "Between 3 to 5 minutes to allow for uninterrupted long-winded policy arguments.",
      "Between 8 to 15 seconds, capturing the peak emotional, punchy, or specialized statement of the source.",
      "Exactly 60 seconds to maintain steady clock segments.",
      "Omitted entirely, keeping only the anchor's voice on-air."
    ],
    correctOptionIndex: 1,
    explanation: "Sound bites provide color, emotion, and authority. They should be brief and punchy. Long, policy-heavy explanations are better summarized by the reporter, leaving the sound bite to deliver the raw impact or personal voice."
  },
  {
    id: 47,
    moduleIndex: 4,
    courseName: "Broadcast Journalism & Writing for Ear/Eye",
    blueprintTopic: "Sound Bites: Natural Sound",
    questionText: "What does 'NAT SOUND' (Natural Sound) mean and why is it vital in both radio and TV reporting?",
    options: [
      "The noise of the studio fans when the microphones are inactive.",
      "Ambient acoustic sounds from the scene (such as a tractor engine, flowing water, or sirens) that build immersion and transport the listener to the location.",
      "Synthesized sound effects generated on PC software to make reports dramatic.",
      "Traditional folk music played behind political news summaries."
    ],
    correctOptionIndex: 1,
    explanation: "Natural sound (NAT SOUND) grounds the story in reality. Letting the audience hear the roar of a tractor engine (and fading it down as the narrator speaks) builds an immersive, authentic scene that enhances emotional engagement."
  },
  {
    id: 48,
    moduleIndex: 4,
    courseName: "Broadcast Journalism & Writing for Ear/Eye",
    blueprintTopic: "TV Script Format",
    questionText: "A standard visual-heavy TV script is divided vertically into two chambers. What goes on the left and right?",
    options: [
      "Left: Advertising sponsors. Right: Political party references.",
      "Left: Video / Camera visual directions. Right: Audio Narration scripts and source cues.",
      "Left: English translations. Right: Amharic translations.",
      "Left: Anchor name listings. Right: Technical computer server outputs."
    ],
    correctOptionIndex: 1,
    explanation: "The split-page format organizes production. The left column lists video directions (e.g., 'MS of farmer checking soil', 'CG: Aster Abebe'), while the right column contains matching audio details (narration, sound bites), ensuring perfect synchronization during editing."
  },
  {
    id: 49,
    moduleIndex: 4,
    courseName: "Broadcast Journalism & Writing for Ear/Eye",
    blueprintTopic: "Writing for the Eye: Active Voice",
    questionText: "Which of the following is written in correct broadcast active voice?",
    options: [
      "A new irrigation scheme was launched by the agricultural bureau.",
      "The agricultural bureau launches a new irrigation scheme today.",
      "An irrigation project was seen to be completed by local farming teams.",
      "It was announced yesterday that vaccines would be distributed by mobile clinics."
    ],
    correctOptionIndex: 1,
    explanation: "Active voice (Subject-Verb-Object) makes broadcast news more compelling. Writing 'The agricultural bureau launches an irrigation scheme' instead of 'An irrigation scheme was launched by the bureau' (passive voice) is direct, punchy, and uses fewer words."
  },
  {
    id: 50,
    moduleIndex: 4,
    courseName: "Broadcast Journalism & Writing for Ear/Eye",
    blueprintTopic: "Radio voicer structures",
    questionText: "In radio news reporting, what designates a 'Wraparound' package format?",
    options: [
      "An endless cycle of advertisements surrounding a major corporate announcement.",
      "A report where the anchor introduces the field reporter, who speaks, introduces a direct sound bite, completes their wrap-up, and throws back to the anchor.",
      "A news package wrapped entirely in national folk music recordings.",
      "A script that is read backward to maintain editorial secrecy."
    ],
    correctOptionIndex: 1,
    explanation: "A wraparound package 'wraps' around the sound bite. The reporter's voice provides context before and after the pre-recorded sound bite, creating a smooth and engaging transition for listeners."
  },

  // ================= MODULE 6: Intercultural & International Communication (IDs 51-60) =================
  {
    id: 51,
    moduleIndex: 5,
    courseName: "Intercultural & International Communication",
    blueprintTopic: "Culture Shock Phases",
    questionText: "Which phase of Culture Shock is typically marked by feelings of extreme alienation, irritation with local customs, homesickness, and high distress?",
    options: [
      "The Honeymoon stage",
      "The Crisis / Hostility stage",
      "The Mastery / Adaptation stage",
      "The Immediate Return stage"
    ],
    correctOptionIndex: 1,
    explanation: "Culture shock has four classic stages. After the initial novelty wears off (Honeymoon stage), individuals enter the Crisis / Hostility phase. Here, cultural differences generate real friction, leading to alienation and homesickness before recovery can begin."
  },
  {
    id: 52,
    moduleIndex: 5,
    courseName: "Intercultural & International Communication",
    blueprintTopic: "NWICO and MacBride Report",
    questionText: "The third-world call for a 'New World Information and Communication Order' (NWICO) in the late 1970s was motivated by:",
    options: [
      "The excessive cost of importing physical paper from Western companies.",
      "The structural disparity and one-way flow of global news, where Western agencies dominated world coverage and portrayed the global South negatively.",
      "A desire to ban all international communications entirely.",
      "The widespread failure of analog TV signals in rural sectors."
    ],
    correctOptionIndex: 1,
    explanation: "NWICO, backed by UNESCO and the MacBride Report, criticized the monopoly of major news agencies (e.g., AP, Reuters) over global narratives. They demanded a more balanced media model that empowered developing nations to tell their own stories."
  },
  {
    id: 53,
    moduleIndex: 5,
    courseName: "Intercultural & International Communication",
    blueprintTopic: "High vs Low Context",
    questionText: "In Edward T. Hall's cultural framework, a 'Low Context' communication style is characterized by:",
    options: [
      "Strong reliance on unspoken social hierarchies and historic family lineages.",
      "Direct, explicit language where meaning is carried almost entirely in the literal words spoken.",
      "The complete absence of written contracts or laws.",
      "Exclusive reliance on nonverbal hand gestures and eye contact."
    ],
    correctOptionIndex: 1,
    explanation: "Low-context cultures (e.g., German, Swiss, American) value directness. Messages are explicit and literal. In contrast, high-context cultures (e.g., East Asian, Middle Eastern, Ethiopian) rely on implicit meanings, nonverbal cues, and shared history."
  },
  {
    id: 54,
    moduleIndex: 5,
    courseName: "Intercultural & International Communication",
    blueprintTopic: "Intercultural Nonverbal",
    questionText: "The study of how time is structured, perceived, and utilized to communicate power across diverse cultures is technically termed:",
    options: [
      "Kinesics",
      "Proxemics",
      "Chronemics",
      "Haptics"
    ],
    correctOptionIndex: 2,
    explanation: "Chronemics is the study of how time is perceived and used in communication. It differentiates monochronic cultures (which prioritize scheduled blocks) from polychronic cultures (which view time as fluid and focus on relationships)."
  },
  {
    id: 55,
    moduleIndex: 5,
    courseName: "Intercultural & International Communication",
    blueprintTopic: "Marshall McLuhan Theory",
    questionText: "What does Marshall McLuhan's classic metaphor 'The Global Village' argue?",
    options: [
      "That technology will force all urban dwellers to return to rural agrarian farming.",
      "That electronic media would contract the planet into a single, instantly interconnected social space, enabling immediate global news flow.",
      "That international communication is impossible due to persistent language blocks.",
      "That all local cultures will merge into a single rural village without national borders."
    ],
    correctOptionIndex: 1,
    explanation: "McLuhan's 'Global Village' theory suggested that electronic media would overcome geographic boundaries, allowing people across the globe to experience and react to events simultaneously, much like the inhabitants of a small village."
  },
  {
    id: 56,
    moduleIndex: 5,
    courseName: "Intercultural & International Communication",
    blueprintTopic: "Media Imperialism",
    questionText: "The controversial concept of 'Cultural Imperialism' asserts that:",
    options: [
      "Developing nations successfully colonize Western broadcasting markets with regional folklore exports.",
      "Western media conglomerates dump disproportionate amounts of cultural imports (films, series, music) on developing nations, eroding indigenous cultures and values.",
      "All sovereign languages will naturally merge into a single global dialect.",
      "Physical wars are caused solely by incorrect translations of news wire copies."
    ],
    correctOptionIndex: 1,
    explanation: "Cultural (or Media) Imperialism theory argues that exporting Western cultural products (e.g., Hollywood movies, Western music) to developing nations can lead to the displacement of local values, promoting consumerist and individualistic viewpoints."
  },
  {
    id: 57,
    moduleIndex: 5,
    courseName: "Intercultural & International Communication",
    blueprintTopic: "Intercultural Competence",
    questionText: "What does evaluating behavior within another culture's own framework of meaning represent?",
    options: [
      "Ethnocentrism",
      "Cultural Relativism",
      "Stereotyping",
      "Assimilation"
    ],
    correctOptionIndex: 1,
    explanation: "Cultural relativism suspends judgment to understand a practice in its cultural context. This is the opposite of ethnocentrism, which judges other cultures using the standards of one's own."
  },
  {
    id: 58,
    moduleIndex: 5,
    courseName: "Intercultural & International Communication",
    blueprintTopic: "Proxemics",
    questionText: "The study of interpersonal distance thresholds and the physical space individuals require during communication is termed:",
    options: [
      "Kinesics",
      "Proxemics",
      "Paralanguage",
      "Chronemics"
    ],
    correctOptionIndex: 1,
    explanation: "Proxemics, coined by Edward T. Hall, studies how people use space. It categorizes physical distance into intimate, personal, social, and public zones, which vary significantly across cultures."
  },
  {
    id: 59,
    moduleIndex: 5,
    courseName: "Intercultural & International Communication",
    blueprintTopic: "Cultural Shock: Adaptation",
    questionText: "In the 'U-Curve' model of cultural shock adaptation, what follows after recovery?",
    options: [
      "Immediate psychological regression back to host country crisis.",
      "Bicultural adaptation and functional integration, where the individual navigates both cultures comfortably.",
      "Total loss of memory of original indigenous customs.",
      "A mandatory physical relocation to a third sovereign state."
    ],
    correctOptionIndex: 1,
    explanation: "The U-Curve model shows travel adaptation. The curve drops during the initial crisis, rises during recovery as local cues are learned, and peaks at adaptation/adjustment, where the individual achieves bicultural comfort."
  },
  {
    id: 60,
    moduleIndex: 5,
    courseName: "Intercultural & International Communication",
    blueprintTopic: "Global news flow platforms",
    questionText: "Why did third-world nations call for the creation of national news pools (like the Non-Aligned News Agencies Pool)?",
    options: [
      "To prevent internal journalists from using modern satellite tools.",
      "To bypass Western wire networks, exchanging news files directly with other developing nations and projecting constructive self-representations.",
      "To monetize their agricultural discoveries on international markets.",
      "To build physical walls to block incoming shortwave radio networks."
    ],
    correctOptionIndex: 1,
    explanation: "The Non-Aligned News Agencies Pool was a collaborative effort to counter Western media dominance. It allowed developing nations to share developmental reports directly, bypassing the gatekeeping of Western wire networks."
  },

  // ================= MODULE 7: Theories of Communication (IDs 61-70) =================
  {
    id: 61,
    moduleIndex: 6,
    courseName: "Theories of Communication",
    blueprintTopic: "Agenda Setting Mechanics",
    questionText: "According to McCombs and Shaw's Agenda-Setting research, who are the primary 'gatekeepers' dictating public priorities?",
    options: [
      "The public audience members who actively vote on social media sites.",
      "Media owners, news directors, and editors who select which stories to cover and how much visual prominence to assign them.",
      "Local software technicians maintaining the network towers.",
      "Advertisers who strictly sponsor non-news entertainment shows."
    ],
    correctOptionIndex: 1,
    explanation: "The classic Agenda-setting study showed a close link between media focus and public concern. News editors and directors act as gatekeepers, choosing what stories to highlight or 'spike', which directly influences what topics the public talks about."
  },
  {
    id: 62,
    moduleIndex: 6,
    courseName: "Theories of Communication",
    blueprintTopic: "Uses & Gratifications Theory",
    questionText: "What represents the fundamental premise of 'Uses and Gratifications Theory'?",
    options: [
      "Media is a needle that injects identical values into all passive consumers.",
      "Audiences are active agents who choose specific media products to satisfy personal, psychological, and social needs.",
      "Television is solely used as an educational medium, with no entertainment value.",
      "Political leaders dictate what media materials the public must consume every day."
    ],
    correctOptionIndex: 1,
    explanation: "Uses and Gratological (U&G) theory flips the question. Instead of asking 'what media does to passive audiences', it asks 'what active choices audiences make with media'—such as seeking surveillance, escape, personal identity, or integration."
  },
  {
    id: 63,
    moduleIndex: 6,
    courseName: "Theories of Communication",
    blueprintTopic: "Cultivation Theory: Mean World",
    questionText: "Which phenomenon describes how heavy TV viewers develop exaggerated fears of being victims of violence, even if actual crime is low?",
    options: [
      "Hypodermic reaction syndrome",
      "Mean World Syndrome",
      "Selective exposure effect",
      "Gatekeeping anxiety"
    ],
    correctOptionIndex: 1,
    explanation: "George Gerbner's Cultivation theory showed that heavy television viewers exhibit 'Mean World Syndrome'. Absorbing years of violent media content leads to a skewed perspective, making them perceive society as far more hostile than it really is."
  },
  {
    id: 64,
    moduleIndex: 6,
    courseName: "Theories of Communication",
    blueprintTopic: "Two-step flow theory",
    questionText: "In the Two-Step Flow Theory of communication, who is the critical intermediary between mass media messages and the general public?",
    options: [
      "The regional computer server technician",
      "The 'Opinion Leader' who monitors media and shares their interpretations with less active peers.",
      "The elite corporate advertiser",
      "The government public relations spokesperson"
    ],
    correctOptionIndex: 1,
    explanation: "Lazarsfeld and Katz's research showed that media impact is indirect. Mass media messages reach 'opinion leaders' (active community figures) first, who then interpret and pass those messages along to their social networks."
  },
  {
    id: 65,
    moduleIndex: 6,
    courseName: "Theories of Communication",
    blueprintTopic: "Theories: Framing",
    questionText: "In communication theory, what does 'Framing' refer to?",
    options: [
      "The physical borders surrounding a physical television screen.",
      "The semantic packaging of an event, where media highlights certain details while ignoring others to promote a specific interpretation.",
      "A technique used to capture photos with clear lighting grids.",
      "The systematic editing of sound recording clips."
    ],
    correctOptionIndex: 1,
    explanation: "Framing is often explained as: 'The frame selected dictates what is visible.' By organizing news storylines around specific themes, media can influence how the public interprets an issue, suggesting who should be blamed or credited."
  },
  {
    id: 66,
    moduleIndex: 6,
    courseName: "Theories of Communication",
    blueprintTopic: "Magic Bullet Theory",
    questionText: "Why contains the discredited 'Hypodermic Needle' (or Magic Bullet) theory of communication been largely abandoned?",
    options: [
      "Because modern media houses reject the use of vaccination advertising segments.",
      "Because it overstated media influence, treating the audience as a passive, uniform group with no defense against direct message injection.",
      "Because television replaced all radio delivery platforms.",
      "Because the theory was too difficult for academic journalists to research."
    ],
    correctOptionIndex: 1,
    explanation: "The Magic Bullet theory arose after WWI, assuming media could inject ideas directly into a passive public. Subsequent research showed that audiences possess individual biases, rely on peer advice, and utilize selective perception, which filters direct media influence."
  },
  {
    id: 67,
    moduleIndex: 6,
    courseName: "Theories of Communication",
    blueprintTopic: "Spiral of Silence",
    questionText: "According to Elizabeth Noelle-Neumann's 'Spiral of Silence' theory, why might individuals remain silent about their political views?",
    options: [
      "Because they completely lack interest in the outcome of political developments.",
      "Because they fear social isolation and ostracization if they perceive their personal opinions do not align with the dominant mass media narrative.",
      "Because regulatory laws forbid citizens from expressing any minority opinion.",
      "Because they are paid by opposing political groups to withhold their votes."
    ],
    correctOptionIndex: 1,
    explanation: "The Spiral of Silence theory posits that people monitor their social environment to assess the climate of opinion. If they feel their view is in the minority, they stay silent to avoid isolation. This feedback loop can make the dominant view seem even more widespread than it is."
  },
  {
    id: 68,
    moduleIndex: 6,
    courseName: "Theories of Communication",
    blueprintTopic: "Cognitive Dissonance",
    questionText: "How do news readers act when they encounter a facts story that directly contradicts their core religious or political beliefs?",
    options: [
      "They undergo immediate psychological conversion to the opposing perspective.",
      "They experience uncomfortable Cognitive Dissonance, and often rationalize, discredit the news source, or seek out selective confirmation.",
      "They delete their entire social media profiles.",
      "They contact the government of the country to censor the news house."
    ],
    correctOptionIndex: 1,
    explanation: "Leon Festinger's Cognitive Dissonance theory shows that people experience mental discomfort when confronted with conflicting information. To resolve this, they often seek information that confirms their beliefs while avoiding or discrediting opposing viewpoints."
  },
  {
    id: 69,
    moduleIndex: 6,
    courseName: "Theories of Communication",
    blueprintTopic: "Normative Theories: Authoritarian",
    questionText: "Which normative theory of the press justifies immediate censorship, licensing, and state guidance to protect national order?",
    options: [
      "The Libertarian theory",
      "The Social Responsibility theory",
      "The Authoritarian theory",
      "The Democratic-Participant theory"
    ],
    correctOptionIndex: 2,
    explanation: "Normative press theories describe how media *should* operate in a society. Under an Authoritarian framework, the press is expected to support government objectives, and the state uses licensing and censorship to control the flow of information."
  },
  {
    id: 70,
    moduleIndex: 6,
    courseName: "Theories of Communication",
    blueprintTopic: "Social Responsibility Press Theory",
    questionText: "What represents the fundamental premise of the 'Social Responsibility Theory' of the press?",
    options: [
      "The press has zero duties to society beyond corporate profit-making.",
      "The press must remain completely free of licensing, but has a moral duty to serve society with balanced coverage, truth, and democratic debate.",
      "The press must submit all written reviews to local authorities before printing.",
      "The press must replace all hard news coverage with charity drives."
    ],
    correctOptionIndex: 1,
    explanation: "Formulated by the Hutchins Commission in the US, this theory argues that while freedom of the press is vital, it must be paired with a commitment to the public interest. If the press fails to provide accurate, balanced coverage, it invites regulatory intervention."
  },

  // ================= MODULE 8: Public Relations & Advertising Craft (IDs 71-80) =================
  {
    id: 71,
    moduleIndex: 7,
    courseName: "Public Relations & Advertising",
    blueprintTopic: "Defining PR",
    questionText: "What differentiates the core purpose of Public Relations (PR) from Advertising?",
    options: [
      "PR is completely free, while advertising has no financial costs.",
      "Advertising buys specific, controlled media spaces to promote products, while PR builds mutual trust and manages reputation through earned media coverage.",
      "PR is designed to deceive the public, while advertising presents objective, unbiased facts.",
      "Advertising is only done on TV, while PR is limited to physical letters."
    ],
    correctOptionIndex: 1,
    explanation: "Advertising is a paid communication model where the sponsor holds complete control over the message. In contrast, PR focuses on building relationships and cultivating organic, trusted 'earned media' coverage through press releases, events, and community engagement."
  },
  {
    id: 72,
    moduleIndex: 7,
    courseName: "Public Relations & Advertising",
    blueprintTopic: "RACE Formula",
    questionText: "Under the professional RACE formula of public relations planning, what does the key acronym represent?",
    options: [
      "Reporting, Action, Conflict, and Editing",
      "Research, Action planning, Communication, and Evaluation",
      "Re-write, Authority, Community, and Engagement",
      "Rhetoric, Audience, Context, and Ethos"
    ],
    correctOptionIndex: 1,
    explanation: "The RACE formula outlines the PR planning process: 1. Research (understanding the problem/audience), 2. Action planning (designing strategies/budgets), 3. Communication (executing campaigns/messages), and 4. Evaluation (measuring results against original goals)."
  },
  {
    id: 73,
    moduleIndex: 7,
    courseName: "Public Relations & Advertising",
    blueprintTopic: "Persuasion Mechanics",
    questionText: "When a PR practitioner targets an organization's 'internal publics', who are they communicating with?",
    options: [
      "Competitors in the same corporate sector.",
      "The employees, managers, and board members within the organization itself.",
      "Regulatory court judges and national police forces.",
      "Subscribers of local news magazines."
    ],
    correctOptionIndex: 1,
    explanation: "Internal publics are the stakeholders within an organization. Keeping employees, managers, and board members informed and engaged is crucial for maintaining morale and building a unified organizational voice."
  },
  {
    id: 74,
    moduleIndex: 7,
    courseName: "Public Relations & Advertising",
    blueprintTopic: "AIDA Model",
    questionText: "In advertising planning, what does the logical sequence 'AIDA' stand for?",
    options: [
      "Authority, Innovation, Dialogue, and Action",
      "Attention, Interest, Desire, and Action",
      "Audience, Interpretation, Data, and Analytics",
      "Ambience, Information, Delivery, and Advertising"
    ],
    correctOptionIndex: 1,
    explanation: "The AIDA model outlines the consumer journey: catch their Attention (e.g. bold visual), pique their Interest (discuss key benefits), build a Desire (emotional connection/appeal), and prompt Action (a clear purchase trigger)."
  },
  {
    id: 75,
    moduleIndex: 7,
    courseName: "Public Relations & Advertising",
    blueprintTopic: "Corporate Press Releases",
    questionText: "How should a standard media press release be structured to encourage busy editors to publish it?",
    options: [
      "Written as an informal, artistic story with no clear summary or key contact information.",
      "Following the inverted pyramid structure with a compelling headline, immediate news value details, clear quotes, and standard boilerplate context.",
      "Formatted as an encrypted spreadsheet of technical statistics.",
      "Written as directly addressing the public to buy the corporate products instantly."
    ],
    correctOptionIndex: 1,
    explanation: "To secure coverage, press releases should mirror the structure of a standard news report. Placing key facts in the lead, using a strong headline, and including pre-written quotes makes it easier for busy editors to integrate the content into their publications."
  },
  {
    id: 76,
    moduleIndex: 7,
    courseName: "Public Relations & Advertising",
    blueprintTopic: "Social Marketing Applications",
    questionText: "Which campaign is an authentic application of Social Marketing?",
    options: [
      "A high-stakes billboard advertisement to buy premium domestic coffee packets.",
      "A national public health initiative to encourage polio vaccinations and nutritional diets for infants.",
      "A corporate campaign announcing the acquisition of neighboring mineral water wells.",
      "An exclusive television launch for a luxury passenger vehicle segment."
    ],
    correctOptionIndex: 1,
    explanation: "Social marketing applies commercial advertising techniques to promote prosocial behaviors (e.g., vaccination drives, water conservation, environmental cleanup) for the benefit of the community, rather than to drive private profits."
  },
  {
    id: 77,
    moduleIndex: 7,
    courseName: "Public Relations & Advertising",
    blueprintTopic: "Advertising Complaints & Ethics",
    questionText: "What represents a major ethical issue commonly faced by advertisers in developing economies?",
    options: [
      "Using standard translations for different regional dialects.",
      "Deceptive claims, unrealistic promises, and exploiting marginalized groups through manipulative gender or social stereotypes.",
      "Refusing to pay double the ad tax rates demanded by private companies.",
      "Including direct contact phone numbers in their layouts."
    ],
    correctOptionIndex: 1,
    explanation: "Ethical advertising requires truthfulness and social responsibility. Unregulated markets can see deceptive health claims, stereotyping, or promotions targeting children, which damages consumer trust and violates industry codes of conduct."
  },
  {
    id: 78,
    moduleIndex: 7,
    courseName: "Public Relations & Advertising",
    blueprintTopic: "Managing Public Opinion",
    questionText: "In PR crisis management, 'steering into the skid' refers to which strategy?",
    options: [
      "Completely ignoring the public allegations hoping the news cycle forgets them.",
      "Taking swift responsibility, being transparent, correcting misinformation with facts, and keeping the public actively updated on recovery efforts.",
      "Suing the newspaper that ran the first critical report.",
      "Sponsoring unrelated happy events in adjacent towns to distract from the issue."
    ],
    correctOptionIndex: 1,
    explanation: "Effective crisis communication requires honesty and transparency. Attempting to cover up a mistake or delay response fuels speculation, whereas taking responsibility, correcting the record, and detailing solutions helps preserve organizational credibility."
  },
  {
    id: 79,
    moduleIndex: 7,
    courseName: "Public Relations & Advertising",
    blueprintTopic: "Ethical Persuasion",
    questionText: "The 'Asymmetry' model of PR described by Grunig and Hunt is characterized by:",
    options: [
      "An equal, balanced dialogic compromise between the corporation and public communities.",
      "One-way, persuasive communication designed to alter public behavior to fit corporate aims, without the company changing its own practices.",
      "The total elimination of research surveys in evaluating campaigns.",
      "Using only traditional local songs to announce corporate projects."
    ],
    correctOptionIndex: 1,
    explanation: "In the two-way asymmetrical model, feedback is gathered through research, but only to refine messages and maximize persuasion. The organization itself does not change; it seeks only to adapt public behavior to its own goals."
  },
  {
    id: 80,
    moduleIndex: 7,
    courseName: "Public Relations & Advertising",
    blueprintTopic: "Public Relations Ethics",
    questionText: "Why is the use of 'Astroturfing' considered highly unethical in PR practices?",
    options: [
      "Because it involves planting actual plastic grass on corporate sports stadiums.",
      "Because it creates fake, simulated 'grassroots' citizen movements to support corporate interests, deceiving the media and public.",
      "Because it prevents journalists from interviewing regional rural communities.",
      "Because it demands hiring expensive foreign PR consultants."
    ],
    correctOptionIndex: 1,
    explanation: "Astroturfing is deceptive. By manufacturing fake citizen campaigns, interest groups, or online forums, organizations mask their commercial or political motivations behind a facade of independent public support."
  },

  // ================= MODULE 9: Conflict Management & Communication (IDs 81-90) =================
  {
    id: 81,
    moduleIndex: 8,
    courseName: "Conflict Management & Communication",
    blueprintTopic: "How Conflicts Arise",
    questionText: "What represents a root structural cause of systemic social conflicts in multi-cultural spaces?",
    options: [
      "A complete lack of cell phone towers in metropolitan cities.",
      "Perceived or actual competition over scarce resources, value incompatibility, structural power imbalances, and communication breakdowns.",
      "The widespread expansion of public service printing portals.",
      "Strict compliance with administrative budget requirements."
    ],
    correctOptionIndex: 1,
    explanation: "Conflict typically stems from structural and social friction points. Competition for limited resources (e.g., land, water), incompatible values, unequal power distributions, and poor communication can all spark and sustain disputes."
  },
  {
    id: 82,
    moduleIndex: 8,
    courseName: "Conflict Management & Communication",
    blueprintTopic: "Constructive vs Destructive",
    questionText: "How can conflict be framed as a 'constructive' dynamic in an corporate or community setting?",
    options: [
      "When it leads to physical fights that eliminate opposing viewpoints.",
      "When it challenges stale routines, stimulates creative problem-solving, exposes underlying concerns, and encourages progressive structural adjustments.",
      "When it forces minority representatives to resign under pressure.",
      "When it keeps everyone in a state of high anxiety and fear."
    ],
    correctOptionIndex: 1,
    explanation: "Conflict is not inherently negative. When managed constructively, disagreements can expose core problems, spark creative solutions, and encourage healthier collaboration and structural change."
  },
  {
    id: 83,
    moduleIndex: 8,
    courseName: "Conflict Management & Communication",
    blueprintTopic: "Conflict Resolution: Styles",
    questionText: "Which conflict resolution style represents a high concern for self and a high concern for others, seeking a win-win resolution?",
    options: [
      "Avoiding style",
      "Collaborating style",
      "Competing style",
      "Accommodating style"
    ],
    correctOptionIndex: 1,
    explanation: "The Thomas-Kilmann model defines collaboration as highly assertive and highly cooperative. It involves opening deep lines of communication to find a resolution that satisfies the core interests of both parties (win-win)."
  },
  {
    id: 84,
    moduleIndex: 8,
    courseName: "Conflict Management & Communication",
    blueprintTopic: "Peace Journalism Principles",
    questionText: "What distinguishes 'Peace Journalism' from standard sensationalist 'War Journalism'?",
    options: [
      "Peace journalism ignores all violent outbreaks, reporting only on positive folk art.",
      "Peace journalism focuses on root causes, highlights quiet calls for peace, avoids inflammatory labels, and explores structural solutions to structural crises.",
      "Peace journalism is paid for by international defense agencies to appease local rebels.",
      "Peace journalism censors any criticism directed at the ruling government."
    ],
    correctOptionIndex: 1,
    explanation: "Peace journalism seeks to de-escalate tensions. Instead of focusing only on casualties and blame (war journalism), it explores the historical and structural drivers of conflict, giving voice to moderate, constructive community players."
  },
  {
    id: 85,
    moduleIndex: 8,
    courseName: "Conflict Management & Communication",
    blueprintTopic: "Conflict Resolution: Mediation",
    questionText: "What is the defining role of a 'Mediator' in conflict resolution processes?",
    options: [
      "A legal arbiter who dictates a binding decision that both parties must legally follow.",
      "An impartial facilitator who helps the disputing parties communicate, identify interests, and collaboratively design their own solutions.",
      "A police chief who enforces physical boundaries on the parties.",
      "A secret witness who testifies against one of the key parties in court."
    ],
    correctOptionIndex: 1,
    explanation: "Unlike arbitrators or judges, mediators do not impose decisions. They act as neutral facilitators, help restore respectful communication, and guide the parties to uncover interests and reach a voluntary agreement."
  },
  {
    id: 86,
    moduleIndex: 8,
    courseName: "Conflict Management & Communication",
    blueprintTopic: "De-escalating Language",
    questionText: "Which statement utilizes constructive, 'de-escalating' communication design?",
    options: [
      "You are obviously attempting to destroy this project because you are completely selfish.",
      "We seem to have differing priorities on resource allocations; let us explore how we can address both our goals.",
      "Your ethnic group always acts with complete disrespect regarding administrative deadlines.",
      "I demand your immediate resignation before any dialogue can proceed."
    ],
    correctOptionIndex: 1,
    explanation: "De-escalating communication replaces personal attacks ('you' statements) with objective observations ('we seem to have differing priorities'). This shifts the focus from blame to cooperative problem-solving."
  },
  {
    id: 87,
    moduleIndex: 8,
    courseName: "Conflict Management & Communication",
    blueprintTopic: "Active Reframing",
    questionText: "What represents the communication technique of 'Active Reframing'?",
    options: [
      "Hiding true facts and presenting completely fictional representations.",
      "Stripping inflammatory personal attacks from a party's statement and restating their message to focus on their core underlying needs.",
      "Putting high-contrast borders around visual news segments.",
      "Recording host communications without their direct permission."
    ],
    correctOptionIndex: 1,
    explanation: "In dispute resolution, reframing cleanses toxic messages. Translating 'He is a lazy thief who doesn't do any work' into 'You value clear contributions and need to see equitable work distribution' helps move the dialogue beyond insults to address actual needs."
  },
  {
    id: 88,
    moduleIndex: 8,
    courseName: "Conflict Management & Communication",
    blueprintTopic: "Conflict Styles: Avoiding",
    questionText: "Under what conditions contains the 'Avoiding' conflict style considered appropriate?",
    options: [
      "When the issue is trivial, when time is highly limited, or when immediate physical danger requires emotional cooling-off spaces.",
      "When you need to make immediate, highly unpopular decisions that require total compliance.",
      "When you must build long-term, mutually trusting employee partnerships.",
      "When the other party is begging for your immediate assistance."
    ],
    correctOptionIndex: 0,
    explanation: "While avoidance is uncooperative, it serves a strategic purpose. If an issue is minor, if emotions are too high for safe dialogue, or if immediate physical safety is threatened, temporary avoidance allows for cooling-off before resuming engagement."
  },
  {
    id: 89,
    moduleIndex: 8,
    courseName: "Conflict Management & Communication",
    blueprintTopic: "Interests vs Positions",
    questionText: "In the Harvard Negotiation model, what designates the difference between a Position and an Interest?",
    options: [
      "Position is free, while Interest costs financial taxes.",
      "Position is what a party claims they must have (their demand), while Interest is the underlying motive, fear, or need driving that demand.",
      "Position represents the geographic location, while Interest is the financial percentage rate.",
      "Positions are always false, while Interests are universally true."
    ],
    correctOptionIndex: 1,
    explanation: "Differentiating positions from interests is key to resolution. A position is a concrete demand ('We want a wall here'). The interest is the underlying concern ('We need of privacy and noise reduction'). Understanding the interest allows for creative, mutually acceptable solutions."
  },
  {
    id: 90,
    moduleIndex: 8,
    courseName: "Conflict Management & Communication",
    blueprintTopic: "Conflict Resolution: Arbitration",
    questionText: "How does Arbitration differ from Mediation in institutional dispute resolution?",
    options: [
      "Arbiters are secret, while mediators are publicly visible.",
      "An arbitrator reviews the arguments and imposes a binding decision, whereas a mediator helps the parties design their own voluntary resolution.",
      "Arbitrators are unpaid volunteers, while mediators are court judges.",
      "Arbitration is restricted to agricultural projects, while mediation applies to urban disputes."
    ],
    correctOptionIndex: 1,
    explanation: "Arbitration is an evaluative process similar to a court trial. The neutral arbitrator hears both sides and renders a final, legally binding decision, whereas a mediator guides the parties to reach their own agreement."
  },

  // ================= MODULE 10: Media Law, Ethics & Translation Studies (IDs 91-100) =================
  {
    id: 91,
    moduleIndex: 9,
    courseName: "Media Law, Ethics & Translation Studies",
    blueprintTopic: "Core Principles of Journalism Ethics",
    questionText: "What represents the four universally recognized pillars of professional journalism ethics?",
    options: [
      "Profitability, Speed, Exclusivity, and Sensationalism",
      "Seek Truth and Report It, Minimize Harm, Act Independently, and Be Accountable & Transparent",
      "Censorship compliance, State advocacy, Executive deference, and Editorial secrecy",
      "Plagiarism, Copyright evasion, Libel immunity, and Source disclosure"
    ],
    correctOptionIndex: 1,
    explanation: "The Society of Professional Journalists (SPJ) outlines these four pillars. They form the foundation of ethical journalism worldwide, guiding reporters to balance truth, community harm, commercial pressures, and public accountability."
  },
  {
    id: 92,
    moduleIndex: 9,
    courseName: "Media Law, Ethics & Translation Studies",
    blueprintTopic: "Potter Box Model",
    questionText: "In the Potter Box moral reasoning framework, what is the correct chronological sequence to resolve an ethical dilemma?",
    options: [
      "Definition (Facts), Values, Philosophical Principles, and loyalties (allegiances)",
      "Action, Public Reaction, Legal Review, and Financial Audit",
      "Censorship check, Editor call, Source validation, and immediate story launch",
      "Philosophical debate, absolute silence, police consultation, and retraction"
    ],
    correctOptionIndex: 0,
    explanation: "The Potter Box is a structured decision-making tool. It guides journalists to: 1. assess the facts (Definition), 2. identify competing values (professional, personal, economic), 3. apply ethical philosophies (e.g., Golden Mean, Utilitarianism), and 4. clarify where their primary loyalty lies."
  },
  {
    id: 93,
    moduleIndex: 9,
    courseName: "Media Law, Ethics & Translation Studies",
    blueprintTopic: "Defamation Defenses",
    questionText: "What represents the absolute, invulnerable defense against a civil lawsuit for libel or defamation?",
    options: [
      "Proving that the story generated high profit margins for the publisher.",
      "Proving that the published statements are completely, empirically True.",
      "Stating that the author was in a highly angry mood when writing.",
      "Claiming that the source requested remaining completely anonymous."
    ],
    correctOptionIndex: 1,
    explanation: "Because defamation requires publishing false, reputation-damaging statements, absolute truth is a complete defense. If a statement is true, it cannot be legally classified as defamatory."
  },
  {
    id: 94,
    moduleIndex: 9,
    courseName: "Media Law, Ethics & Translation Studies",
    blueprintTopic: "Translation: Dynamic Equivalence",
    questionText: "In media translation studies, Eugene Nida's concept of 'Dynamic Equivalence' prioritizes:",
    options: [
      "A rigid, word-for-word grammatical translation that matches the source layout exactly.",
      "Translating the essential meaning and emotional impact of the text so that it triggers a similar response in the target audience.",
      "Replacing all written words with computer binary codes.",
      "Translating only the first and last sentences of a news article."
    ],
    correctOptionIndex: 1,
    explanation: "Dynamic (or functional) equivalence prioritizes meaning over literal syntax. It translates idioms and cultural references into appropriate target-language equivalents to ensure the message sounds natural and communicative."
  },
  {
    id: 95,
    moduleIndex: 9,
    courseName: "Media Law, Ethics & Translation Studies",
    blueprintTopic: "Conflicts of Interest",
    questionText: "Which scenario constitutes a clear, unethical 'Conflict of Interest' for an active business journalist?",
    options: [
      "Interviewing three distinct consumer advocates regarding utility prices.",
      "Accepting private cash payments and stock gifts from a local enterprise while writing a profile about their corporate operations.",
      "Translating an official international trade document into regional languages.",
      "Filing a public records query with a government agency."
    ],
    correctOptionIndex: 1,
    explanation: "Journalists must maintain independence. Accepting money, gifts, or favors from subjects they cover compromises their objectivity, violating professional ethics and destroying public trust."
  },
  {
    id: 96,
    moduleIndex: 9,
    courseName: "Media Law, Ethics & Translation Studies",
    blueprintTopic: "Rights & Responsibilities",
    questionText: "Under professional ethical codes, what is the journalist's responsibility regarding a juvenile suspect's identity?",
    options: [
      "Publish their name and photo immediately to warn the public.",
      "Guard their identity and avoid publication of names/photos to minimize long-term sociological harm, unless public interest outweighs this duty.",
      "Sell their photos to international news wire agencies.",
      "Report their family members' legal histories instead."
    ],
    correctOptionIndex: 1,
    explanation: "Minimizing harm is a key ethical pillar. Protecting children involved in legal or traumatic situations helps shield them from permanent social stigma and facilitates rehabilitation."
  },
  {
    id: 97,
    moduleIndex: 9,
    courseName: "Media Law, Ethics & Translation Studies",
    blueprintTopic: "Translation: Transediting",
    questionText: "In news translation, what does 'Transediting' (coined by Karen Stetting) refer to?",
    options: [
      "Automatically translating text using computer scripts without any human review.",
      "The integrated process of translating text while editing, shortening, restructuring, and rewriting it to fit local news standards.",
      "Directly translating only the advertising content of a publication.",
      "Adding fictional dialog to make translated columns exciting."
    ],
    correctOptionIndex: 1,
    explanation: "Transediting recognizes that news translation is rarely straightforward. It combines translation with editing—trimming details, explaining cultural context, and adjusting style to suit the target audience and format."
  },
  {
    id: 98,
    moduleIndex: 9,
    courseName: "Media Law, Ethics & Translation Studies",
    blueprintTopic: "Media Law: Copyright",
    questionText: "What represents the legal standard of 'Fair Use' in media copyright law?",
    options: [
      "The right to copy entire novels and reprint them for commercial profit.",
      "The legal exception allowing brief excerpts of copyrighted material to be used for commentary, news reporting, critique, or education, without explicit permit.",
      "A rule that grants physical computers ownership over all user-uploaded photos.",
      "The absolute ban on referencing any other source's findings."
    ],
    correctOptionIndex: 1,
    explanation: "Fair Use is a key exception to copyright. It permits copying small sections of text or media for criticism, news coverage, or teaching, balancing the creator's rights with the public's right to information and expression."
  },
  {
    id: 99,
    moduleIndex: 9,
    courseName: "Media Law, Ethics & Translation Studies",
    blueprintTopic: "Ethics: Minimizing Harm",
    questionText: "When reporting on a tragic suicide incident in a local community, ethical guidelines instruct journalists to:",
    options: [
      "Publish high-impact graphic photos and detailed lists of the methods used.",
      "Avoid romanticizing, sensationalizing, or reporting detailed methods, and instead provide public helpline information.",
      "State that the victim was a weak coward in the main lead paragraph.",
      "Fabricate a dramatic story about murder suspects to spice up coverage."
    ],
    correctOptionIndex: 1,
    explanation: "Ethical reporting on suicide aims to prevent copycat behavior. Standards advise against descriptive details about the method, romanticizing the death, or placement on front pages, while recommending the addition of help resources."
  },
  {
    id: 100,
    moduleIndex: 9,
    courseName: "Media Law, Ethics & Translation Studies",
    blueprintTopic: "Ethics: Plagiarism",
    questionText: "What is Plagiarism and why is it treated as a major ethical offense in media circles?",
    options: [
      "The practice of translates text into more than three distinct languages.",
      "The act of copying another person's unique ideas, statements, or reporting products without explicit attribution, passing them off as one's own.",
      "Criticizing the editorial decisions of competing media owners.",
      "Using computerized software to check grammar and spelling errors."
    ],
    correctOptionIndex: 1,
    explanation: "Plagiarism represents intellectual theft. Passing off another writer's research or phrasing as original work violates truthfulness and integrity, severely damaging a journalist's career and credibility."
  }
];
