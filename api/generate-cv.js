import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { name, job, experience, skills } = req.body;

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const prompt = `Stwórz profesjonalne CV w języku polskim.
  Imię i nazwisko: ${name}
  Stanowisko: ${job}
  Doświadczenie: ${experience}
  Umiejętności: ${skills}
  Format: elegancki, zwięzły, w formie sekcji z nagłówkami.`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }]
    });

    const cv = completion.choices[0].message.content;
    res.status(200).json({ cv });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Błąd generowania CV" });
  }
}
