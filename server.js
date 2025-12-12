// server.js (partial) — replace only the /api/gemini route
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const GEMINI_KEY = process.env.GEMINI_API_KEY;
console.log("Gemini 1 key:", process.env.GEMINI_API_KEY);

app.post("/api/gemini", async (req, res) => {
    try {
        const { movieTitle, plot } = req.body;

        const prompt = `
Provide a short summary for the movie "${movieTitle}".
Also list 2–3 OTT platforms (with names and URLs) where it can be watched.
Return only valid JSON, like:

{
  "summary": "",
  "platforms": [
    { "name": "", "url": "" }
  ]
}
`;

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/chat-bison-001:generateText?key=${GEMINI_KEY}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt: { text: prompt }, maxOutputTokens: 500 }),
            }
        );

        if (!response.ok) {
            const text = await response.text();
            console.error("AI provider error:", response.status, text);
            return res.status(502).json({ error: "AI provider error", details: text });
        }

        const data = await response.json();

        const aiText = data?.outputText || null;

        if (!aiText) {
            return res.json({ aiText: null, message: "No text returned" });
        }

        let structured = null;
        try {
            const trimmed = aiText.trim();
            if (trimmed.startsWith("{") && trimmed.endsWith("}")) {
                structured = JSON.parse(trimmed);
            }
        } catch (err) {
            console.warn("Failed to parse AI text as JSON");
        }

        return res.json({ aiText, structured });
    } catch (err) {
        console.error("Server error:", err);
        return res.status(500).json({ error: "AI request failed", detail: err.message });
    }
});



// rest of server...
const PORT = 5000;
app.listen(PORT, () => console.log(`Backend running at http://localhost:${PORT}`));
