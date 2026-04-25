export default async function handler(req, res) {
  try {
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

    // 👇 TRATAMENTO DE ERRO (faltava isso)
    if (!response.ok) {
      const errorText = await response.text();
      console.error("ERRO OPENAI:", errorText);

      return res.status(500).json({
        error: "Erro na OpenAI",
        details: errorText,
      });
    }

    const data = await response.json();

    return res.status(200).json(data);

  } catch (error) {
    console.error("ERRO GERAL:", error);

    return res.status(500).json({
      error: "Erro interno do servidor",
    });
  }
}