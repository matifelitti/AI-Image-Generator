const prompt_input = document.getElementById("prompt-input");
const generate_image = document.getElementById("generate-image");
const results = document.querySelector(".results");

const HF_API_TOKEN = "";

const HF_MODEL =
  "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0";

generate_image.addEventListener("click", async () => {
  const prompt = prompt_input.value.trim();
  if (!prompt) return;

  results.innerHTML = "Generating image...";

  try {
    const response = await fetch(HF_MODEL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HF_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: prompt,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to generate image");
    }

    const blob = await response.blob();
    const imageUrl = URL.createObjectURL(blob);

    results.innerHTML = `
      <img 
        src="${imageUrl}" 
        alt="Generated Image"
        style="max-width:100%; border-radius:1rem;"
      />
    `;
  } catch (error) {
    console.error(error);
    results.innerHTML = "Error generating image. Try again.";
  }
});
