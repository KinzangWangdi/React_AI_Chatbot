import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPEN_AI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export class Assistant {
  #model;

  constructor(model = "gpt-3.5-turbo") {
    this.#model = model;
  }

  async chat(content, history) {
    const messages = [...history, { role: "user", content }];
    let attempt = 0;
    const maxRetries = 3;

    while (attempt < maxRetries) {
      try {
        const result = await openai.chat.completions.create({
          model: this.#model,
          messages,
        });
        return result.choices[0].message.content;
      } catch (error) {
        if (error.status === 429 && attempt < maxRetries - 1) {
          const wait = 1000 * Math.pow(2, attempt); // Exponential backoff
          await new Promise((res) => setTimeout(res, wait));
          attempt++;
        } else {
          throw error;
        }
      }
    }
  }
}