const prompt_input = document.getElementById("prompt-input");
const generate_image = document.getElementById("generate-image");
const results = document.querySelector(".results");

generate_image.addEventListener("click", async () => {
  const prompt = prompt_input.value.trim();
  if (!prompt) return;

  results.classList.remove("has-image");
  results.innerHTML = "Generating image...";

  try {
    const response = await fetch("http://localhost:3000/generate-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    const blob = await response.blob();
    const imageUrl = URL.createObjectURL(blob);

    results.classList.add("has-image");

    results.innerHTML = `<img src="${imageUrl}" class="generated-image" alt="Generated Image">`;
  } catch (error) {
    console.error(error);
    results.innerHTML = "Error generating image";
  }
});
