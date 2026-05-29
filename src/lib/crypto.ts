import { createCipheriv, createDecipheriv, createHash, randomBytes } from 'crypto';

// App-level encryption for secrets at rest (user-provided provider API keys).
// AES-256-GCM with a key derived from API_KEY_ENCRYPTION_SECRET. This avoids a
// KMS dependency while ensuring a Firestore read/export never yields spendable
// third-party credentials in plaintext.
//
// Stored format: "enc:v1:<iv_b64>:<authTag_b64>:<ciphertext_b64>".
// Backward compatible: values without the "enc:v1:" prefix are treated as
// legacy plaintext and returned as-is by decryptSecret, so existing keys keep
// working and get encrypted the next time they're written.

const PREFIX = 'enc:v1:';

function getKey(): Buffer | null {
  const secret = process.env.API_KEY_ENCRYPTION_SECRET;
  if (!secret) return null;
  // Derive a fixed 32-byte key from the configured secret.
  return createHash('sha256').update(secret).digest();
}

let warned = false;
function warnOnce() {
  if (!warned) {
    warned = true;
    console.warn(
      '[crypto] API_KEY_ENCRYPTION_SECRET is not set — provider API keys are stored in plaintext. Set it to encrypt them at rest.'
    );
  }
}

/** Encrypt a secret for storage. Returns plaintext unchanged if no key is configured. */
export function encryptSecret(plaintext: string): string {
  const key = getKey();
  if (!key) {
    warnOnce();
    return plaintext;
  }
  const iv = randomBytes(12);
  const cipher = createCipheriv('aes-256-gcm', key, iv);
  const ciphertext = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
  const authTag = cipher.getAuthTag();
  return `${PREFIX}${iv.toString('base64')}:${authTag.toString('base64')}:${ciphertext.toString('base64')}`;
}

/** Decrypt a stored secret. Legacy plaintext (no prefix) is returned unchanged. */
export function decryptSecret(stored: string): string {
  if (!stored.startsWith(PREFIX)) return stored; // legacy plaintext
  const key = getKey();
  if (!key) {
    warnOnce();
    return stored; // can't decrypt without the key; surface the raw value
  }
  const [ivB64, tagB64, dataB64] = stored.slice(PREFIX.length).split(':');
  if (!ivB64 || !tagB64 || !dataB64) return stored;
  try {
    const decipher = createDecipheriv('aes-256-gcm', key, Buffer.from(ivB64, 'base64'));
    decipher.setAuthTag(Buffer.from(tagB64, 'base64'));
    const plaintext = Buffer.concat([
      decipher.update(Buffer.from(dataB64, 'base64')),
      decipher.final(),
    ]);
    return plaintext.toString('utf8');
  } catch (e) {
    console.error('[crypto] Failed to decrypt secret:', e);
    return '';
  }
}
