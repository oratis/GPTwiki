import { GoogleGenerativeAI } from '@google/generative-ai';
import type { Message } from '@/types';

/** Kept verbatim from the other providers so the models are given the same brief. */
const SYSTEM_INSTRUCTION =
  'You are a knowledgeable assistant helping users create wiki articles. ' +
  'Provide clear, well-structured, and accurate answers. Use Markdown formatting when appropriate.';

export function streamGemini(messages: Message[], apiKey?: string): ReadableStream {
  const encoder = new TextEncoder();

  return new ReadableStream({
    async start(controller) {
      try {
        const client = new GoogleGenerativeAI(apiKey || process.env.GOOGLE_AI_API_KEY || '');
        // `systemInstruction` goes here, at construction — NOT on `startChat`.
        //
        // The SDK's `StartChatParams` types it as `string | Part | Content`, but
        // only the `GenerativeModel` constructor actually runs
        // `formatSystemInstruction` over it (generative-ai dist/index.js:1362).
        // `startChat` spreads the caller's params *last* over the already
        // formatted value (:1401), so a raw string passed there reaches the API
        // unwrapped and every call 400s with:
        //
        //   Invalid value at 'system_instruction' (…v1beta.Content)
        //
        // The type says one thing and the runtime does another, so this is not
        // a mistake TypeScript can catch — hence the comment rather than a
        // tidier one-liner. It had broken *every* Gemini call on the site
        // (chat, wiki threads, and arena battles alike), which went unnoticed
        // because no one had completed a battle and the other surfaces default
        // to a different model.
        const model = client.getGenerativeModel({
          model: 'gemini-2.0-flash',
          systemInstruction: SYSTEM_INSTRUCTION,
        });

        const history = messages.slice(0, -1).map((m) => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }],
        }));

        const chat = model.startChat({ history });

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
