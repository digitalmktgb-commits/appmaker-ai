import { useState, useEffect } from "react";
import initialData from "../data/app.json";

const API_KEY = "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"
async function gerarApp(ideia: string, setAppData: any) {
  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: `Responda APENAS com JSON válido, sem texto antes ou depois.

Formato:
{
  "nome": "",
  "descricao": "",
  "telas": [
    {
      "nome": "",
      "descricao": "",
      "componentes": []
    }
  ],
  "funcionalidades": [],
  "fluxo": []
}

Ideia:
${ideia}`,
      }),
    });

    const data = await response.json();
    console.log("RESPOSTA COMPLETA:", data);

    let texto = data.output?.[0]?.content?.[0]?.text || "";

    texto = texto.replace(/```json/g, "").replace(/```/g, "").trim();

    const match = texto.match(/{[\s\S]*}/);

    if (!match) {
      console.error("Não encontrou JSON válido");
      return;
    }

    console.log("JSON LIMPO:", match[0]);

    const json = JSON.parse(match[0]);

    setAppData(json);
  } catch (e) {
    console.error("ERRO GERAL:", e);
  }
}

export default function AppRenderer() {
  const [appData, setAppData] = useState(initialData);
  const [telaAtual, setTelaAtual] = useState(appData.telas?.[0]);

  useEffect(() => {
    if (appData.telas?.length) {
      setTelaAtual(appData.telas[0]);
    }
  }, [appData]);

  return (
    <div style={{ padding: 20 }}>
      <input
        type="text"
        placeholder="Digite sua ideia de app"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            gerarApp((e.target as HTMLInputElement).value, setAppData);
          }
        }}
        style={{ padding: 10, width: "100%", marginBottom: 10 }}
      />

      <h1>{appData?.nome}</h1>
      <p>{appData?.descricao}</p>

      <h2>Menu</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        {appData?.telas?.map((tela: any, index: number) => (
          <button
            key={index}
            onClick={() => setTelaAtual(tela)}
            style={{
              padding: "8px 12px",
              borderRadius: 8,
              border: "1px solid #ccc",
              cursor: "pointer",
              background:
                telaAtual?.nome === tela.nome ? "#ddd" : "#fff",
            }}
          >
            {tela.nome}
          </button>
        ))}
      </div>

      <div
        style={{
          marginTop: 20,
          border: "1px solid #ccc",
          padding: 20,
          borderRadius: 10,
        }}
      >
        <h2>{telaAtual?.nome}</h2>
        <p>{telaAtual?.descricao}</p>

        <strong>Componentes:</strong>
        <ul>
          {telaAtual?.componentes?.map((comp: string, i: number) => (
            <li key={i}>{comp}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}