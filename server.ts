import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const port = 3000;

async function startServer() {
  const app = express();
  app.use(express.json());

  // Initialize server-side Gemini client
  const apiKey = process.env.GEMINI_API_KEY;
  const ai = new GoogleGenAI({
    apiKey: apiKey || "",
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });

  // API Route: Ping/Health check
  app.get("/api/health", (req, res) => {
    res.json({
      status: "ok",
      hasApiKey: !!process.env.GEMINI_API_KEY,
    });
  });

  // API Route: AI-powered professional Quiz generator
  app.post("/api/gemini/quiz", async (req, res) => {
    try {
      const { moduleIndex, courseTitle, count = 10 } = req.body;

      if (moduleIndex === undefined || !courseTitle) {
        return res.status(400).json({ error: "Missing moduleIndex or courseTitle" });
      }

      if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({
          error: "GEMINI_API_KEY is not configured. Please add your key in the Secrets panel in AI Studio settings.",
        });
      }

      const prompt = `You are a distinguished University Professor of Journalism and Mass Communication in Addis Ababa, and a senior consultant for the Ethiopian Ministry of Education (MoE). 
Your task is to prepare a national exit examination paper module consisting of ${count} highly rigorous, advanced, and challenging multiple-choice questions for the course: "${courseTitle}" (Module Index: ${moduleIndex}).

Each question must resemble previous national exit examination papers in Ethiopia.
Include actual Ethiopian context, regional broadcasting scenarios, MoE standards, academic debates (e.g., Development Journalism vs. Classic Liberal Watchdog models in developing democracies, the Gadaa system forum, rural literacy campaigns, the Broadcasters Proclamation, and Ethiopian media ethical codes).

Return the questions as a structured JSON array of objects conforming to the required schema:`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction: "You only output valid JSON matching the exact requested array structure. Do not wrap in markdown code blocks.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            description: "List of highly realistic journalism exit exam questions.",
            items: {
              type: Type.OBJECT,
              properties: {
                blueprintTopic: {
                  type: Type.STRING,
                  description: "Specific sub-topic or syllabus concept from the national course blueprint.",
                },
                questionText: {
                  type: Type.STRING,
                  description: "A comprehensive, realistic multiple-choice question designed to test critical analytical skills (not just simple recall).",
                },
                options: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "Exactly four plausible options.",
                },
                correctOptionIndex: {
                  type: Type.INTEGER,
                  description: "0 to 3, representing the correct option.",
                },
                explanation: {
                  type: Type.STRING,
                  description: "A high-quality academic explanation justifying the correct answer while drawing on journalism theories, constitutional rights, or MoE blueprints.",
                },
              },
              required: ["blueprintTopic", "questionText", "options", "correctOptionIndex", "explanation"],
            },
          },
        },
      });

      const responseText = response.text || "[]";
      let questions;
      try {
        questions = JSON.parse(responseText.trim());
      } catch (jsonErr) {
        console.error("Failed to parse JSON from Gemini. Raw text:", responseText);
        // Fallback cleanup if the model included backticks or extra text
        const cleaned = responseText.replace(/```json/g, "").replace(/```/g, "").trim();
        questions = JSON.parse(cleaned);
      }

      // Add appropriate runtime ids and indices for the client
      const mappedQuestions = questions.map((item: any, idx: number) => ({
        id: Date.now() + idx + Math.floor(Math.random() * 1000),
        moduleIndex: Number(moduleIndex),
        courseName: courseTitle,
        ...item,
      }));

      res.json({ questions: mappedQuestions });
    } catch (error: any) {
      console.error("Gemini quiz generation error:", error);
      res.status(500).json({ error: error.message || "An unexpected error occurred during AI generation." });
    }
  });

  // API Route: Interactive Academic Mentor (Chat Tutor) with Search Grounding
  app.post("/api/gemini/tutor", async (req, res) => {
    try {
      const { messages, courseTitle, activeConcept } = req.body;

      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Messages array is required" });
      }

      if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({
          error: "GEMINI_API_KEY is not configured. Please add your key in the Secrets panel in AI Studio settings.",
        });
      }

      const activeContextStr = activeConcept 
        ? `The student is currently reviewing the concept "${activeConcept.term}": "${activeConcept.definition}".`
        : "";

      const systemInstruction = `You are "Professor Berhanu", a leading Academician in Journalism & Communication and an expert designer of the Ethiopian Ministry of Education national exit exams.
Your objective is to help students prepare for their upcoming high-stakes National Journalism Exit Exam.
Present yourself with high academic authority yet outstanding supportiveness, using professional, encouraging Ethiopian academic mentor vocabulary.

Provide clear, structured explanations of complex concepts (like Potter's Box, Development Journalism, Eugene Nida's translation principles, Edward T. Hall's contextual culture hierarchies, or television script writing elements) drawing on academic theories.
Reference official Ethiopian curriculum standards, regulatory bodies, and communications frameworks.

Use formatting like bold titles and bullet points. Never make up concepts.
${activeContextStr} All responses relate to the course: "${courseTitle || "Journalism & Communication national curriculum"}".`;

      // Map chat messages into Gemini format
      const formattedContents = messages.map((msg: any) => ({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }],
      }));

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: formattedContents,
        config: {
          systemInstruction,
          tools: [{ googleSearch: {} }], // Enable real-time search grounding for factual syllabus references!
        },
      });

      const text = response.text || "Professor Berhanu is analyzing your query. Please ask again.";
      
      // Extract search grounding metadata if available to link citations for the student!
      const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((chunk: any) => ({
        title: chunk.web?.title || "Search Reference",
        uri: chunk.web?.uri,
      })) || [];

      res.json({ content: text, sources });
    } catch (error: any) {
      console.error("Gemini tutor error:", error);
      res.status(500).json({ error: error.message || "An unexpected error occurred." });
    }
  });

  // API Route: Interactive Academic Textbook & Blueprint Handbook Generator (15-20 pages equivalent)
  app.post("/api/gemini/handbook", async (req, res) => {
    try {
      const { courseTitle, chapterIndex, chapterTitle, moduleIndex } = req.body;

      if (!courseTitle || chapterIndex === undefined || !chapterTitle) {
        return res.status(400).json({ error: "courseTitle, chapterIndex, and chapterTitle are required." });
      }

      if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({
          error: "GEMINI_API_KEY is not configured. Please add your key in the Secrets panel in AI Studio settings.",
        });
      }

      const prompt = `You are a distinguished, world-class Senior Professor of Journalism and Mass Communication at Addis Ababa University, Ethiopia.
Your task is to write a highly rigorous, comprehensive, and exhaustive Academic Textbook Chapter for the national college curriculum.
This is Chapter ${Number(chapterIndex) + 1}: "${chapterTitle}" for the official student study bible of the course: "${courseTitle}" (Module Index: ${moduleIndex}).

To satisfy the national Ministry of Education (MoE) certification requirements, this text MUST be extremely dense, scholarly, and detailed—totaling between 1500 and 2500 words of authentic, professional academic prose. Do NOT write placeholders, summaries, or simple bullet lists; write complete, high-impact paragraphs of continuous expert-level literature.

You must structure the chapter with the following required divisions:
1. **SYLLABUS OBJECTIVES & THEORETICAL FOUNDATIONS**: Detail the academic objectives, core communication scholars (e.g., Wilbur Schramm, Eugene Nida, George Gerbner, Edward T. Hall, Jürgen Habermas, or local champions), and theoretical foundations.
2. **ACADEMIC EXPOSITION & BLUEPRINT ANALYSIS**: Write at least 4-5 long, deeply analytical subsections of theoretical and practical definitions. Be exhaustive. Describe every concept with historical depth, models, and paradigms.
3. **ETHIOPIAN MEDIA LANDSCAPE & LEGISLATIVE CONTEXT**: Integrate specific regional broadcast challenges, historical media progress in Ethiopia (such as the early publications like 'Aimero' or the post-1991 press landscape), constitutional laws (including deep critiques of the FDRE Constitution's Article 29 and its sub-clauses on censorship), domestic proclamations (e.g., Broadcast Proclamation 562/2007, Media Proclamation No. 1238/2021, and Hate Speech and Disinformation Prevention Proclamation No. 1185/2020), and traditional Oromo Gadaa council forums.
4. **UNIVERSITY RESEARCH & CRITICAL NATIONAL DEBATES**: Synthesize actual challenges in Ethiopia, such as development journalism and the state vs. commercial watchdog debate, public trust, and minority representation.
5. **CASE STUDY & FIELDWORK GUIDANCE**: Provide a dense, narrative case study of a development project, broadcast controversy, or translation transediting challenge in Addis Ababa, Awasa, Gondar, or Oromia.
6. **GRADUATION REVIEW CHAIR EXERCISES**: Formulate exactly 3 highly complex conceptual review problems based on this chapter, accompanied by intensive scholarly answers.

Begin writing your chapter directly. Avoid any introductory or conversational chatter—output only the academic markdown header and text.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction: "You are a university compiler writing the official national curriculum handbook for Ethiopian journalism students. Speak with extreme academic authority, writing rich, dense, long-form scholarly prose.",
          tools: [{ googleSearch: {} }], // Grounding for complete accuracy
        },
      });

      const text = response.text || "Academic material could not be generated at this time.";
      
      const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((chunk: any) => ({
        title: chunk.web?.title || "Ministry Syllabus",
        uri: chunk.web?.uri,
      })) || [];

      res.json({ content: text, sources });
    } catch (error: any) {
      console.error("Gemini handbook generation error:", error);
      res.status(500).json({ error: error.message || "An unexpected error occurred during textbook compilation." });
    }
  });

  // Vite Integration for Serving UI Assets
  if (process.env.NODE_ENV !== "production") {
    console.log("Vite dev server integrating as middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Server running in production status. Serving build folder...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(port, "0.0.0.0", () => {
    console.log(`Ethiopian Journalism Exit Exam Prep Server running on http://localhost:${port}`);
  });
}

startServer();
