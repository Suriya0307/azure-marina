import OpenAI from "openai";

const client = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_KEY,
  dangerouslyAllowBrowser: true,
});

export async function marinaBrain(userText) {
  const res = await fetch(
    "azure-marina-production-5c74.up.railway.app/api/chat",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userText }),
    }
  );

  const data = await res.json();
  return data.reply;
}
