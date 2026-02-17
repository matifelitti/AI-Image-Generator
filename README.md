# AI Image Generator – Frontend UI

A clean and modern frontend interface for an AI Image Generator.  
This project focuses on a polished UI/UX using semantic HTML and modern CSS styling, and is connected to a Node + Express backend that calls the Hugging Face Inference API.

Repository: https://github.com/matifelitti/AI-Image-Generator

---

## 🚀 Features

- Minimal and modern UI design
- Dark-themed interface inspired by AI/SaaS products
- Responsive layout for desktop and mobile devices
- Prompt input area using a textarea
- Styled action button with hover and active states
- Results section displays generated images returned from the backend
- Backend implemented with Node.js + Express and Hugging Face Inference SDK

---

## 🛠️ Technologies Used

- Frontend: HTML5, CSS3, Vanilla JavaScript
- Backend: Node.js, Express (ESM)
- Hugging Face: @huggingface/inference (HfInference)
- Environment variables: dotenv
- CORS enabled for local development

---

## 📄 Current Status

This project includes:

- A fully styled frontend layout
- An Express backend that proxies prompt requests to the Hugging Face text-to-image endpoint
- Frontend script that POSTs prompts to the backend and displays returned PNG images
- Instructions to create a .env file with HF_TOKEN for Hugging Face API access

---

## 🔧 Installation

1. Clone the repo:
   git clone https://github.com/matifelitti/AI-Image-Generator
   cd AI-Image-Generator

2. Install backend dependencies (where server.js lives — root or backend folder depending on repo structure):
   npm install

   Ensure package.json includes:
   - express
   - cors
   - dotenv
   - @huggingface/inference

3. (Optional) Install nodemon for development:
   npm install --save-dev nodemon

4. Place frontend files (index.html, CSS, JS) inside the server's public folder (./public). The provided frontend script expects the server to serve static files and to call POST /generate-image on http://localhost:3000.

---

## ⚙️ Backend Setup (matches provided server.js)

1. Create a .env file in the project root (same folder as server.js):
   .env

2. Add your Hugging Face token and optional settings:
   HF_TOKEN=hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   PORT=3000

3. The server (server.js) behavior:
   - Uses ESM imports, dotenv, cors, and serves static files from ./public
   - POST /generate-image
     - body: { prompt: "..." }
     - Uses HfInference:
       const hf = new HfInference(process.env.HF_TOKEN);
       const image = await hf.textToImage({ model: "runwayml/stable-diffusion-v1-5", inputs: prompt });
     - Returns image/png binary in the response

4. Start the backend:
   npm run start
   (or npm run dev if you have a nodemon script)

5. Server default URL:
   http://localhost:3000

---

## .env Details

- Create .env and DO NOT commit it to version control.
- Example .env:
  HF_TOKEN=hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  PORT=3000

- Use dotenv in your server code:
  import dotenv from "dotenv";
  dotenv.config();

- Add .env to .gitignore.

---

## 📡 Frontend Integration (matches provided frontend script)

- The provided frontend script posts prompt data to:
  http://localhost:3000/generate-image

- Script behavior:
  - Reads prompt from #prompt-input
  - POSTs JSON { prompt } to /generate-image
  - Expects a PNG binary response, converts it to an object URL and displays it inside .results

- Ensure your frontend files are served from ./public so Express can serve them directly.

---

## 🔒 Security & Best Practices

- Never commit API keys or .env files to source control.
- Keep HF_TOKEN on the server only; do not expose it to the client.
- Consider request rate limiting, authentication, and usage quotas if exposing the backend publicly.

---

## 🧪 Usage

1. Place frontend files in ./public.
2. Create .env with HF_TOKEN.
3. Install dependencies and start the server (npm run start).
4. Open http://localhost:3000 in your browser.
5. Enter a prompt and click "Generate Image".
