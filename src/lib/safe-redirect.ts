/**
 * Sanitise a `?callbackUrl=` value into somewhere it is safe to send a user
 * after sign-in.
 *
 * The value arrives in the query string, so it is attacker-controlled: a link
 * to `/login?callbackUrl=https://evil.example/` would otherwise turn this
 * site's own sign-in page into an open redirect, which is exactly the shape
 * phishing wants — a real domain, a real login, and a hop to somewhere else at
 * the end.
 *
 * Only same-origin absolute paths survive. Anything else falls back, so the
 * caller always receives something safe to navigate to and never has to
 * remember to check.
 */
export function safeCallbackUrl(
  raw: string | null | undefined,
  fallback: string
): string {
  if (!raw) return fallback;

  // Must be an absolute path on this origin. Rejects `https://evil.example`,
  // and scheme payloads like `javascript:` or `data:`.
  if (!raw.startsWith('/')) return fallback;

  // `//evil.example` is protocol-relative — a full cross-origin URL despite
  // the leading slash. Browsers normalise backslashes to forward slashes, so
  // `/\evil.example` reaches the same place and has to go too.
  if (raw.startsWith('//') || raw.startsWith('/\\')) return fallback;

  // Control characters, newlines and raw whitespace are the classic way to
  // smuggle a value past a naive check (and past header parsers). Legitimate
  // paths carry these percent-encoded, never literal.
  for (let i = 0; i < raw.length; i++) {
    const code = raw.charCodeAt(i);
    if (code <= 0x20 || code === 0x7f) return fallback;
  }

  return raw;
}
