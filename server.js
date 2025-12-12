// server.js (partial) — replace only the /api/gemini route
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const GEMINI_KEY = process.env.GEMINI_API_KEY;

app.post("/api/gemini", async (req, res) => {
    try {
        const { movieTitle, plot } = req.body;

        if (!GEMINI_KEY) {
            console.error("Missing GEMINI_API_KEY");
            return res.status(500).json({ error: "Server misconfiguration: missing API key" });
        }

        const prompt = `
Provide a short AI-generated summary for the movie "${movieTitle}".
Also list 2-3 OTT platforms where users can watch it.
Return only valid JSON exactly in this shape (no extra commentary):

{
  "summary": "...",
  "platforms": [
    { "name": "Netflix", "url": "https://..." },
    { "name": "Amazon Prime", "url": "https://..." }
  ]
}

If you don't know a platform, put "unknown" as the url.
`;

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_KEY}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    // keep the same request shape you were using
                    contents: [{ parts: [{ text: prompt }] }],
                }),
            }
        );

        // if non-2xx -> fetch body might be an error text, log it and return 502
        if (!response.ok) {
            const text = await response.text();
            console.error("Gemini returned non-OK:", response.status, text);
            return res.status(502).json({ error: "AI provider error", status: response.status, body: text });
        }

        const data = await response.json();
        // debug log — comment these out in production
        console.debug("Raw Gemini response:", JSON.stringify(data).slice(0, 2000));

        // Try multiple common places where text might live
        const candidates = data?.candidates ?? data?.outputs ?? data?.output ?? null;

        let aiText = null;

        // 1) new style: data.candidates[0].content[0].text
        aiText = aiText || (data?.candidates?.[0]?.content?.[0]?.text);

        // 2) old style: data.candidates[0].content.parts[0].text
        aiText = aiText || (data?.candidates?.[0]?.content?.parts?.[0]?.text);

        // 3) some responses put text at data.output[0].content[0].text or data.outputText
        aiText = aiText || (data?.output?.[0]?.content?.[0]?.text);
        aiText = aiText || data?.outputText;
        aiText = aiText || data?.text;
        aiText = aiText || data?.result?.outputText;

        // 4) If still missing, try joining all content pieces (fallback)
        if (!aiText && Array.isArray(candidates)) {
            try {
                const joined = candidates
                    .map((c) => {
                        if (c?.content) {
                            if (Array.isArray(c.content)) {
                                return c.content.map((p) => p?.text ?? "").join("\n");
                            } else if (c.content.parts) {
                                return c.content.parts.map((p) => p?.text ?? "").join("\n");
                            }
                        }
                        return "";
                    })
                    .join("\n\n");
                aiText = joined || null;
            } catch (e) {
                // ignore
            }
        }

        if (!aiText) {
            console.warn("No text found in Gemini response. Full response:", JSON.stringify(data).slice(0, 2000));
            return res.json({ aiText: null, message: "No textual content found in AI response" });
        }

        // If model returned JSON string, try to parse it
        let aiJson = null;
        try {
            const trimmed = aiText.trim();
            if ((trimmed.startsWith("{") && trimmed.endsWith("}")) || (trimmed.startsWith("[") && trimmed.endsWith("]"))) {
                aiJson = JSON.parse(trimmed);
            }
        } catch (parseErr) {
            // it's fine if parsing fails; we'll return raw text as fallback
            console.debug("AI text not valid JSON, returning raw text");
        }

        // If we have structured JSON, prefer sending structured fields
        if (aiJson && typeof aiJson === "object") {
            // try to normalize into summary + platforms for frontend convenience
            const summary = aiJson.summary ?? aiJson.description ?? aiJson.text ?? null;
            const platforms = aiJson.platforms ?? aiJson.streaming ?? aiJson.services ?? null;
            return res.json({ aiText, aiJson, summary, platforms });
        }

        // Otherwise send raw text
        return res.json({ aiText, aiJson: null });
    } catch (err) {
        console.error("Gemini route error:", err);
        return res.status(500).json({ error: "AI request failed", detail: err?.message ?? String(err) });
    }
});

// rest of server...
const PORT = 5000;
app.listen(PORT, () => console.log(`Backend running at http://localhost:${PORT}`));
