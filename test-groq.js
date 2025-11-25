import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function run() {
  const chat = await groq.chat.completions.create({
    model: "mixtral-8x7b-32768",
    messages: [
      { role: "user", content: "Olá, tudo bem? Responde só 'funcionou'." }
    ]
  });

  console.log(chat.choices[0].message.content);
}

run();

