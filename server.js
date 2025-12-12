import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Route for movie title rewrite
app.get("/ai/:title", async (req, res) => {
    try {
        const title = req.params.title;

        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash"  // 👈 FIXED MODEL NAME
        });

        const result = await model.generateContent(
            `Rewrite movie title in clean format: ${title}`
        );

        res.json({ answer: result.response.text() });
    } catch (error) {
        console.error("Gemini error:", error);
        res.status(500).json({ error: "AI Error" });
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));
