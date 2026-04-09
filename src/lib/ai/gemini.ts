import { GoogleGenerativeAI } from '@google/generative-ai';
import type { Message } from '@/types';

export function streamGemini(messages: Message[], apiKey?: string): ReadableStream {
  const encoder = new TextEncoder();

  return new ReadableStream({
    async start(controller) {
      try {
        const client = new GoogleGenerativeAI(apiKey || process.env.GOOGLE_AI_API_KEY || '');
        const model = client.getGenerativeModel({ model: 'gemini-2.0-flash' });

        const history = messages.slice(0, -1).map((m) => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }],
        }));

        const chat = model.startChat({
          history,
          systemInstruction: 'You are a knowledgeable assistant helping users create wiki articles. Provide clear, well-structured, and accurate answers. Use Markdown formatting when appropriate.',
        });

        const lastMessage = messages[messages.length - 1];
        const result = await chat.sendMessageStream(lastMessage.content);

        for await (const chunk of result.stream) {
          const text = chunk.text();
          if (text) {
            controller.enqueue(encoder.encode(text));
          }
        }

        controller.close();
      } catch (error) {
        controller.error(error);
      }
    },
  });
}
