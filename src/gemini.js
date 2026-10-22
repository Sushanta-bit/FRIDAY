import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

async function main(prompt) {
  const completion = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `${prompt}\nReply briefly in 1-2 sentences.`,
      },
    ],
    model: "openai/gpt-oss-120b",
    temperature: 0.7,
    max_completion_tokens: 150,
    stream: false,
  });

  return completion.choices[0]?.message?.content || "";
}

export default main;























