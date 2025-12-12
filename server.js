import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Loading API Key
const GEMINI_KEY = process.env.GEMINI_API_KEY;

// POST route - MovieDetails.jsx will call this
app.post("/api/gemini", async (req, res) => {
    try {
        const { movieTitle, plot } = req.body;

        const prompt = `
            Provide a short AI-generated summary for the movie "${movieTitle}".
            Also list 2-3 OTT platforms where users can watch it.
            Use a clean JSON format:
            {
                "summary": "",
                "platforms": [{ "name": "", "url": "" }]
            } 
        `;

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_KEY}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }],
                }),
            }
        );

        const data = await response.json();
        const aiText =
            data?.candidates?.[0]?.content?.parts?.[0]?.text || "No AI output";

        res.json({ aiText });
    } catch (err) {
        console.error("Gemini error:", err);
        res.status(500).json({ error: "AI request failed" });
    }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Backend running at http://localhost:${PORT}`);
});