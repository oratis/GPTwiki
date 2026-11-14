// Local editorial packaging only; never contacts a database or publishes.
import assert from 'node:assert/strict';
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { dataLiteracy } from '../data-literacy';
import { readRelease, releaseKeys, validateDraft } from '../../scripts/lib/editorial-release';

const release = 'content/releases/20261114-120000.json';
const keys = releaseKeys(dataLiteracy);
assert.equal(keys.length, 4);
assert.equal(dataLiteracy.length, 8);
assert.deepEqual(dataLiteracy.flatMap(validateDraft), []);
const titles = new Set(dataLiteracy.map(d => `${d.language}:${d.title}`));
assert.equal(titles.size, 8);
const localImages = new Set<string>();

for (const d of dataLiteracy) {
  assert.equal(d.content.split('\n')[0], `# ${d.title}`);
  const images = [...d.content.matchAll(/!\[([^\]]+)\]\(([^)]+)\)/g)];
  assert.equal(images.length, 2, `${d.topicKey}/${d.language}: expected two diagrams`);
  for (const [, alt, path] of images) {
    assert(alt.length > 40);
    assert(path.startsWith(`/editorial/data-literacy/${d.topicKey}-`));
    assert(path.endsWith(`.${d.language}.svg`));
    const svg = readFileSync(`public${path}`, 'utf8');
    assert(svg.includes('viewBox="0 0 1440 810"'));
    assert(svg.includes('<title id="title">') && svg.includes('<desc id="desc">'));
    assert(!/<script|<foreignObject|\bon\w+=|href\s*=/i.test(svg));
    localImages.add(path);
  }
  const sources = new Set(d.sources?.map(s => s.url));
  assert(sources.size >= 2);
  for (const [, url] of d.content.matchAll(/\]\((https:\/\/[^)]+)\)/g)) assert(sources.has(url), `Unregistered inline reference: ${url}`);
}
assert.equal(localImages.size, 16);

// Check other dated releases. Existing English clusters and the backlog are
// reviewed separately; our English array also enters editorialTopicCatalog().
for (const file of readdirSync('content/releases').filter(f => f.endsWith('.json') && `content/releases/${f}` !== release)) {
  for (const d of readRelease(`content/releases/${file}`)) {
    assert(!keys.includes(d.topicKey!), `Existing release topic: ${d.topicKey}`);
    assert(!titles.has(`${d.language}:${d.title}`), `Existing release title: ${d.title}`);
  }
}

const e = (s: string) => s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const components: Components = {
  img: ({ src, alt }) => {
    if (typeof src !== 'string') return null;
    const path = `../../public${src}`;
    return createElement('span', { className: 'figure' },
      createElement('a', { href: path }, createElement('img', { src: path, alt, width: 1440, height: 810, loading: 'lazy' })),
      createElement('span', { className: 'caption' }, alt));
  },
};
const articles = dataLiteracy.map(d => `<article id="${d.topicKey}-${d.language}" lang="${d.language}">
<div class="eyebrow">${d.language === 'zh' ? '中文' : 'ENGLISH'} · ${e(d.topicKey!)} · <a href="#index">目录 / Index</a></div>
${renderToStaticMarkup(createElement(ReactMarkdown, { remarkPlugins: [remarkGfm], components }, d.content))}
<aside><h2>${d.language === 'zh' ? '参考资料' : 'References'}</h2><ul>${d.sources!.map(s => `<li><a href="${e(s.url)}">${e(s.title)}</a></li>`).join('')}</ul></aside></article>`).join('\n');
const html = `<!doctype html><html lang="zh"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>GPTwiki · 读懂数据 · 双语审阅稿</title><style>
*{box-sizing:border-box}body{margin:0;background:#f5f7fc;color:#18284b;font:18px/1.85 system-ui,-apple-system,"PingFang SC",sans-serif}header,article{max-width:1040px;margin:32px auto;padding:48px 60px;background:white;border:1px solid #dbe3ef;border-radius:20px}h1{font-size:36px;line-height:1.3;letter-spacing:-.025em;margin:12px 0 28px}h2{font-size:26px;line-height:1.45;margin:48px 0 16px}a{color:#3730a3;text-underline-offset:3px}p{margin:18px 0}table{display:block;overflow-x:auto;border-collapse:collapse;font-size:16px;margin:24px 0;width:100%}th,td{border:1px solid #dbe3ef;padding:10px 14px;text-align:left}th{background:#edf2ff}li{margin:8px 0}.eyebrow{font-size:13px;letter-spacing:.04em;color:#52617a}.figure{display:block;margin:30px 0}.figure img{display:block;width:100%;height:auto;aspect-ratio:16/9;border-radius:12px}.caption{display:block;font-size:14px;color:#52617a;line-height:1.6;margin:12px 0}aside{border-top:1px solid #dbe3ef;margin-top:36px}aside h2{margin-top:28px}.intro{color:#52617a}.index{display:grid;grid-template-columns:1fr 1fr;gap:12px 28px;list-style:none;padding:0}.index li{border-left:3px solid #3730a3;padding-left:16px}strong{color:#18284b}@media(max-width:700px){header,article{padding:24px 20px;margin:16px 10px;border-radius:14px}body{font-size:16px}h1{font-size:28px}h2{font-size:23px}.index{grid-template-columns:1fr}th,td{padding:8px;font-size:14px}}@media print{body{background:white}header,article{border:0;margin:0;padding:24px;break-before:page}.figure{break-inside:avoid}}
</style><header id="index"><div class="eyebrow">GPTwiki Editorial · 2026-11-14</div><h1>读懂数据：四个主题，八篇图文文章</h1><p class="intro">中英文完整审阅稿。每篇含两张原创教学图表，点击图片可查看矢量原图。算例均为假设数据；方法来源见文内链接和文末参考资料。本地内容包，尚未发布。</p><ul class="index">${keys.map(key => ['zh', 'en'].map(lang => {const d = dataLiteracy.find(x => x.topicKey === key && x.language === lang)!;return `<li><a href="#${key}-${lang}">${e(d.title)}</a></li>`;}).join('')).join('')}</ul></header>${articles}</html>\n`;
mkdirSync('content/data-literacy', { recursive: true });
writeFileSync('content/data-literacy/review.html', html);

if (process.argv.includes('--write-release')) {
  // Never silently rewrite a snapshot whose reviewed bytes may be published.
  const json = JSON.stringify(dataLiteracy, null, 2) + '\n';
  if (existsSync(release)) assert.equal(readFileSync(release, 'utf8'), json, 'Release differs. Review and explicitly replace the unpublished snapshot.');
  else writeFileSync(release, json, { flag: 'wx' });
}
if (existsSync(release)) assert.deepEqual(readRelease(release), dataLiteracy, 'Source/release mismatch');
console.log(JSON.stringify({ topics: keys.length, editions: dataLiteracy.length, figures: localImages.size, release: existsSync(release) ? release : 'not yet written', preview: 'content/data-literacy/review.html' }, null, 2));
