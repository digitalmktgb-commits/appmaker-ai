export default async function handler(req, res) {
  const { ideia } = req.body;

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4.1-mini",
      input: `Responda APENAS com JSON válido.

Ideia:
${ideia}`,
    }),
  });

  const data = await response.json();

  res.status(200).json(data);
}