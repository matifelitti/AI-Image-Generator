import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { HfInference } from "@huggingface/inference";

dotenv.config();

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const hf = new HfInference(process.env.HF_TOKEN);

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.post("/generate-image", async (req, res) => {
  try {
    console.log("Request received");
    console.log("Body:", req.body);
    console.log("Using token:", process.env.HF_TOKEN ? "YES" : "NO");

    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const image = await hf.textToImage({
      model: "runwayml/stable-diffusion-v1-5",
      inputs: prompt,
    });

    const buffer = Buffer.from(await image.arrayBuffer());

    res.set("Content-Type", "image/png");
    res.send(buffer);
  } catch (error) {
    console.error("HF ERROR:", error);
    res.status(500).json({ error: "Image generation failed" });
  }
});

app.listen(PORT, () => {
  console.log(`🔥 Server running on http://localhost:${PORT}`);
});
