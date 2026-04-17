import 'server-only';
import { Resend } from 'resend';
import { getFollowers } from './follows';
import type { Wiki, UserProfile } from '@/types';

/**
 * Email notifications triggered when an author publishes a new wiki.
 *
 * Fire-and-forget: failures are logged but never break the publish
 * flow. Uses Resend via the AUTH_RESEND_KEY env var that's also used
 * by the magic-link auth provider. Respects per-user opt-out via the
 * `emailNotificationsDisabled` flag on UserProfile.
 */

const BATCH_SIZE = 50;
// Resend free tier allows 100 emails/day. Cap per-publish broadcasts.
const MAX_RECIPIENTS = 500;

export async function notifyFollowersOfNewWiki(
  author: UserProfile,
  wiki: Wiki
): Promise<void> {
  const apiKey = process.env.AUTH_RESEND_KEY;
  if (!apiKey) {
    console.warn('[notifications] AUTH_RESEND_KEY not set — skipping follower emails');
    return;
  }

  let followers: UserProfile[];
  try {
    followers = await getFollowers(author.id, MAX_RECIPIENTS);
  } catch (e) {
    console.error('[notifications] Failed to load followers:', e);
    return;
  }

  const recipients = followers.filter(
    (u) => u.email && !u.emailNotificationsDisabled
  );
  if (recipients.length === 0) return;

  const resend = new Resend(apiKey);
  const from = process.env.AUTH_EMAIL_FROM || 'no-reply@gptwiki.net';
  const subject = `${author.name} just published: ${wiki.title}`;
  const wikiUrl = `https://gptwiki.net/en/wiki/${wiki.id}`;
  const unsubHint = 'You can disable these emails from your GPTwiki profile settings.';

  const html = renderHtml({
    authorName: author.name,
    authorImage: author.image,
    title: wiki.title,
    summary: wiki.summary,
    url: wikiUrl,
    unsubHint,
  });
  const text = [
    `${author.name} published a new wiki on GPTwiki:`,
    '',
    wiki.title,
    wiki.summary || '',
    '',
    `Read it: ${wikiUrl}`,
    '',
    unsubHint,
  ].join('\n');

  // Send in small parallel batches, one Resend call per recipient so each
  // message has a unique To: header and Resend can track delivery.
  for (let i = 0; i < recipients.length; i += BATCH_SIZE) {
    const batch = recipients.slice(i, i + BATCH_SIZE);
    await Promise.allSettled(
      batch.map((u) =>
        resend.emails.send({
          from,
          to: u.email!,
          subject,
          html,
          text,
        })
      )
    );
  }

  console.log(
    `[notifications] sent new-wiki email to ${recipients.length} followers of ${author.id}`
  );
}

function renderHtml(args: {
  authorName: string;
  authorImage?: string;
  title: string;
  summary: string;
  url: string;
  unsubHint: string;
}): string {
  const esc = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  return `<!doctype html>
<html><body style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;background:#f8fafc;margin:0;padding:24px">
  <div style="max-width:540px;margin:0 auto;background:#fff;border-radius:16px;padding:32px;box-shadow:0 1px 3px rgba(0,0,0,0.04)">
    <div style="font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#2563eb;font-weight:600;margin-bottom:8px">GPTwiki · New wiki</div>
    <h1 style="font-size:22px;line-height:1.3;color:#111827;margin:0 0 12px">${esc(args.title)}</h1>
    <p style="color:#4b5563;margin:0 0 20px;font-size:15px;line-height:1.55">${esc(args.summary || 'Click through to read the full article.')}</p>
    <p style="color:#6b7280;margin:0 0 24px;font-size:14px">
      Written by <strong style="color:#111827">${esc(args.authorName)}</strong>, who you follow on GPTwiki.
    </p>
    <a href="${esc(args.url)}" style="display:inline-block;background:#2563eb;color:#fff;padding:12px 22px;border-radius:10px;font-size:14px;font-weight:500;text-decoration:none">Read the article →</a>
    <hr style="border:none;border-top:1px solid #e5e7eb;margin:32px 0 16px">
    <p style="color:#9ca3af;font-size:12px;margin:0">${esc(args.unsubHint)}</p>
  </div>
</body></html>`;
}
