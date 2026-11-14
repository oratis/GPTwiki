/** Keep a battle's original identity when its anonymous creator signs in later. */
export function battleVoterId(
  creatorId: string | undefined,
  signedInId: string | null,
  anonymousId: string | null
): string | null {
  return creatorId && (creatorId === signedInId || creatorId === anonymousId) ? creatorId : null;
}
