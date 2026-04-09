import Anthropic from '@anthropic-ai/sdk';
import type { Message } from '@/types';

export function streamClaude(messages: Message[], apiKey?: string): ReadableStream {
  const encoder = new TextEncoder();

  return new ReadableStream({
    async start(controller) {
      try {
        const client = new Anthropic({ apiKey: apiKey || process.env.ANTHROPIC_API_KEY });
        const stream = client.messages.stream({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 4096,
          system: 'You are a knowledgeable assistant helping users create wiki articles. Provide clear, well-structured, and accurate answers. Use Markdown formatting when appropriate.',
          messages: messages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        });

        for await (const event of stream) {
          if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }

        controller.close();
      } catch (error) {
        controller.error(error);
      }
    },
  });
}
