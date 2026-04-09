import { z } from 'zod';
import { NextResponse } from 'next/server';

// ─── Primitives ──────────────────────────────────────────────────────────
export const aiModelSchema = z.enum(['claude', 'gpt', 'gemini']);

export const messageSchema = z.object({
  id: z.string().min(1).max(64),
  role: z.enum(['user', 'assistant']),
  content: z.string().min(1).max(20_000),
  timestamp: z.number().int().nonnegative(),
});

// ─── Request bodies ──────────────────────────────────────────────────────
export const wikiCreateSchema = z.object({
  title: z.string().trim().min(1).max(200),
  question: z.string().trim().min(1).max(500),
  content: z.string().max(100_000).default(''),
  summary: z.string().max(1_000).default(''),
  tags: z.array(z.string().trim().min(1).max(40)).max(10).default([]),
  aiModel: aiModelSchema,
  conversation: z.array(messageSchema).max(100).default([]),
});

export const chatRequestSchema = z.object({
  messages: z.array(messageSchema).min(1).max(100),
  model: aiModelSchema,
});

// ─── Query params ────────────────────────────────────────────────────────
export const searchQuerySchema = z.object({
  q: z.string().trim().max(200).optional(),
});

export const wikiListQuerySchema = z.object({
  userId: z.string().trim().min(1).max(128).optional(),
});

// ─── Helpers ─────────────────────────────────────────────────────────────
/**
 * Parse and validate JSON request body. Returns either the parsed data or a
 * ready-to-return NextResponse with 400 and Zod issue details.
 */
export async function parseJsonBody<T extends z.ZodTypeAny>(
  req: Request,
  schema: T
): Promise<{ data: z.infer<T>; error?: undefined } | { data?: undefined; error: NextResponse }> {
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return { error: NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 }) };
  }

  const result = schema.safeParse(raw);
  if (!result.success) {
    return {
      error: NextResponse.json(
        { error: 'Validation failed', issues: result.error.issues },
        { status: 400 }
      ),
    };
  }
  return { data: result.data };
}

/**
 * Parse search params against a Zod object schema.
 */
export function parseSearchParams<T extends z.ZodObject<z.ZodRawShape>>(
  url: URL,
  schema: T
): { data: z.infer<T>; error?: undefined } | { data?: undefined; error: NextResponse } {
  const obj: Record<string, string> = {};
  for (const [k, v] of url.searchParams.entries()) obj[k] = v;
  const result = schema.safeParse(obj);
  if (!result.success) {
    return {
      error: NextResponse.json(
        { error: 'Invalid query parameters', issues: result.error.issues },
        { status: 400 }
      ),
    };
  }
  return { data: result.data };
}
