/**
 * Who counts as the platform owner — the single account exempt from free-tier
 * metering, on both the chat path and the arena path.
 *
 * This lives in one module because it did not used to: `resolve-key.ts` and
 * `arena/battle-keys.ts` each carried their own
 * `process.env.PLATFORM_OWNER_EMAIL || '<a personal address>'`, so the
 * exemption had two definitions that could drift, and a private address was
 * duplicated across a public MIT repo.
 *
 * There is deliberately no default. An unset variable means nobody is exempt.
 * The alternative — a hardcoded address — hands un-metered use of *this*
 * deployment's provider keys to an account the deployment's operator does not
 * control, which is exactly backwards for a repo people fork.
 *
 * Env is read per call rather than captured at module load, matching
 * `free-quota.ts`. That keeps the value honest under a changed environment and
 * keeps this unit testable without module-cache tricks.
 */
function ownerEmail(): string | null {
  return process.env.PLATFORM_OWNER_EMAIL?.trim() || null;
}

/**
 * True only when an owner is configured AND the user has an email AND the two
 * match.
 *
 * The explicit guards matter more than they look. Written as a bare
 * `email === OWNER_EMAIL`, an unconfigured deployment and a user with no email
 * on file are both nullish, so they compare equal and that user silently
 * becomes the owner. The inverse form (`email !== OWNER_EMAIL`, which
 * `battle-keys.ts` used to decide whether to charge quota) fails the same way
 * in the other direction: it stops metering the very user it cannot identify.
 * Both callers now go through here.
 */
export function isPlatformOwner(email: string | null | undefined): boolean {
  const owner = ownerEmail();
  if (!owner || !email) return false;
  return email === owner;
}

/** Whether this deployment has an owner exemption configured at all. */
export function hasPlatformOwner(): boolean {
  return ownerEmail() !== null;
}
