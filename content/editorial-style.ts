/**
 * Shared Seedream visual style for ALL editorial quality-tier batches.
 * One consistent look — isometric glass-and-light illustration, indigo/
 * violet/cyan on a near-white ground — makes the series recognizable at
 * a glance on listing pages. Appended to every per-topic subject prompt.
 *
 * Changing this affects FUTURE generations only: hero images are cached
 * in GCS per topicKey, so already-published batches keep their art.
 */
export const EDITORIAL_STYLE =
  'Minimalist isometric editorial illustration for a modern encyclopedia. ' +
  'Soft gradients, deep indigo and violet palette with cyan accents, clean very light background, ' +
  'subtle depth and shadows, no text, no letters, no numbers, no logos, no watermarks, modern, precise, calm.';
