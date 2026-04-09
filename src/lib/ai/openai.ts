import OpenAI from 'openai';
import type { Message } from '@/types';

export function streamOpenAI(messages: Message[], apiKey?: string): ReadableStream {
  const encoder = new TextEncoder();

  return new ReadableStream({
    async start(controller) {
      try {
        const client = new OpenAI({ apiKey: apiKey || process.env.OPENAI_API_KEY });
        const stream = await client.chat.completions.create({
          model: 'gpt-4o',
          stream: true,
          messages: [
            {
              role: 'system',
              content: 'You are a knowledgeable assistant helping users create wiki articles. Provide clear, well-structured, and accurate answers. Use Markdown formatting when appropriate.',
            },
            ...messages.map((m) => ({
              role: m.role as 'user' | 'assistant',
              content: m.content,
            })),
          ],
        });

        for await (const chunk of stream) {
          const text = chunk.choices[0]?.delta?.content;
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
