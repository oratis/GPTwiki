import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get('title') || 'GPTwiki';
  const subtitle = searchParams.get('subtitle') || 'AI-Powered Collaborative Wiki';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: '80px',
          background: 'linear-gradient(135deg, #1e3a5f 0%, #0f172a 50%, #1e1b4b 100%)',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Logo area */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '12px',
              background: '#3b82f6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
              color: 'white',
              fontWeight: 700,
            }}
          >
            W
          </div>
          <span style={{ fontSize: '32px', color: '#94a3b8', fontWeight: 600 }}>
            GPTwiki
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: title.length > 40 ? '48px' : '56px',
            fontWeight: 800,
            color: 'white',
            lineHeight: 1.2,
            maxWidth: '900px',
            marginBottom: '24px',
            wordBreak: 'break-word',
          }}
        >
          {title.length > 80 ? title.substring(0, 80) + '...' : title}
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: '24px',
            color: '#94a3b8',
            maxWidth: '800px',
            lineHeight: 1.4,
          }}
        >
          {subtitle.length > 120 ? subtitle.substring(0, 120) + '...' : subtitle}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: 'absolute',
            bottom: '60px',
            left: '80px',
            right: '80px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', gap: '24px', fontSize: '18px', color: '#64748b' }}>
            <span>gptwiki.net</span>
            <span>Claude / GPT-4o / Gemini</span>
          </div>
          <div
            style={{
              fontSize: '16px',
              color: '#3b82f6',
              padding: '8px 20px',
              border: '1px solid #3b82f6',
              borderRadius: '8px',
            }}
          >
            Open Source
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
