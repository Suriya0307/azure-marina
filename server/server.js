import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import OpenAI from "openai";
import fetch from "node-fetch"; // needed for ElevenLabs API calls in Node 18-
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors()); // allow frontend to call backend
app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); // serve frontend files if needed

// --- OpenAI client ---
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // make sure .env has OPENAI_API_KEY
});

// --- Test route ---
app.get("/test", (req, res) => {
  res.send("Server is working!");
});

// --- Chat endpoint ---
app.post("/api/chat", async (req, res) => {
  const { userText } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are Marina, the calm ocean companion. Speak softly and briefly.",
        },
        { role: "user", content: userText },
      ],
    });

    const reply = completion.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error("OpenAI Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// --- ElevenLabs TTS endpoint ---
app.post("/api/voice", async (req, res) => {
  const { text } = req.body;

  try {
    const response = await fetch(
      "https://api.elevenlabs.io/v1/text-to-speech/EXAVITQu4vr4xnSDxMaL", // default Sarah voice
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "xi-api-key": process.env.ELEVEN_API_KEY, // make sure .env has ELEVEN_API_KEY
        },
        body: JSON.stringify({
          text,
          model_id: "eleven_turbo_v2",
        }),
      }
    );

    const audioBuffer = await response.arrayBuffer();
    res.setHeader("Content-Type", "audio/mpeg");
    res.send(Buffer.from(audioBuffer));
  } catch (error) {
    console.error("ElevenLabs Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// --- Start server ---
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(
    "OpenAI Key:",
    process.env.OPENAI_API_KEY ? "Loaded ✅" : "Missing ❌"
  );
  console.log(
    "ElevenLabs Key:",
    process.env.ELEVEN_API_KEY ? "Loaded ✅" : "Missing ❌"
  );
});
