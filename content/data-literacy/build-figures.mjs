// Original, deterministic editorial figures. Run: node content/data-literacy/build-figures.mjs
// No network, generated artwork, or third-party image content is used.
import { mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const out = fileURLToPath(new URL('../../public/editorial/data-literacy/', import.meta.url));
mkdirSync(out, { recursive: true });
const C = { ink: '#18284b', muted: '#52617a', line: '#dbe3ef', blue: '#3730a3', cyan: '#087f8c', amber: '#a74717', pale: '#edf2ff', warm: '#fff1e6' };
const esc = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const t = (x, y, s, size = 30, fill = C.ink, anchor = 'start', weight = 400) => `<text x="${x}" y="${y}" font-size="${size}" fill="${fill}" text-anchor="${anchor}" font-weight="${weight}">${esc(s)}</text>`;
const rect = (x, y, w, h, fill, r = 0, stroke = 'none') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${stroke}"/>`;
const line = (x1, y1, x2, y2, stroke = C.line, width = 2, dash = '') => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${width}"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`;
const circle = (x, y, r, fill) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" stroke="white" stroke-width="2"/>`;
const pill = (x, y, w, text, fill = C.pale, ink = C.blue) => rect(x, y, w, 54, fill, 12) + t(x + w / 2, y + 36, text, 28, ink, 'middle', 600);
const frames = () => rect(56, 190, 636, 510, 'white', 20, C.line) + rect(748, 190, 636, 510, 'white', 20, C.line);
const manifest = [];

function save(key, locale, title, subtitle, description, body, source) {
  const credit = locale === 'en' ? 'GPTwiki • Original teaching data' : 'GPTwiki · 原创教学数据';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1440" height="810" viewBox="0 0 1440 810" role="img" aria-labelledby="title desc" lang="${locale}">
<title id="title">${esc(title)}</title><desc id="desc">${esc(description)}</desc>
<style>text{font-family:Arial,"PingFang SC","Noto Sans CJK SC","Microsoft YaHei",sans-serif}</style>
${rect(0, 0, 1440, 810, '#f5f7fc')}${rect(0, 0, 14, 810, C.blue)}
${t(56, 58, locale === 'en' ? 'READING DATA / A VISUAL GUIDE' : '读懂数据 / 图解指南', 22, C.blue, 'start', 700)}
${t(56, 119, title, 43, C.ink, 'start', 700)}${t(56, 161, subtitle, 27, C.muted)}
${body}
${line(56, 732, 1384, 732)}${t(56, 772, credit, 22, C.muted)}${t(1384, 772, source, 22, C.muted, 'end')}
</svg>\n`;
  const name = `${key}.${locale}.svg`;
  writeFileSync(`${out}/${name}`, svg);
  manifest.push({ file: name, locale, title, description, width: 1440, height: 810 });
}

for (const locale of ['en', 'zh']) {
  const zh = locale === 'zh';
  let body = frames();
  for (const [left, baseline, ymax] of [[56, 0, 60], [748, 45, 55]]) {
    const plotX = left + 98, plotY = 300, plotW = 450, plotH = 275;
    const y = value => plotY + plotH * (1 - (value - baseline) / (ymax - baseline));
    body += t(left + 32, 238, baseline === 0 ? (zh ? '零基线：比较完整柱长' : 'Zero baseline: full lengths') : (zh ? '截断基线：夸大视觉差异' : 'Cropped: exaggerated contrast'), 29, baseline ? C.amber : C.blue, 'start', 700);
    for (const val of baseline ? [45, 50, 55] : [0, 20, 40, 60]) body += line(plotX, y(val), plotX + plotW, y(val)) + t(plotX - 18, y(val) + 10, `${val}%`, 26, C.muted, 'end');
    for (const [i, val] of [48, 52].entries()) {
      const x = plotX + 82 + i * 200;
      body += rect(x, y(val), 110, y(baseline) - y(val), i ? C.cyan : C.blue);
      body += t(x + 55, y(val) - 15, `${val}%`, 34, C.ink, 'middle', 700) + t(x + 55, 614, i ? 'B' : 'A', 30, C.ink, 'middle');
    }
    body += pill(left + 42, 636, 550, baseline ? (zh ? '可见柱长比：7 ÷ 3 ≈ 2.33' : 'Visible length ratio: 7 ÷ 3 ≈ 2.33') : (zh ? '真实数值比：52 ÷ 48 ≈ 1.083' : 'Value ratio: 52 ÷ 48 ≈ 1.083'), baseline ? C.warm : C.pale, baseline ? C.amber : C.blue);
  }
  save('reading-chart-scales-baselines', locale, zh ? '同一组数值，两种视觉印象' : 'Same values. Two visual impressions.', zh ? '满意率从 48% 升至 52%：增加 4 个百分点，相对增长约 8.3%。' : 'Satisfaction rises from 48% to 52%: +4 percentage points, about +8.3% relative.', zh ? '左右均为 A 期 48%、B 期 52%。左图纵轴从零开始；右图从 45% 开始，使两根柱子的可见长度之比变成 7 比 3。' : 'Both panels show A at 48% and B at 52%. The left axis starts at zero; the right starts at 45%, making the visible bar heights have a ratio of 7 to 3.', body, zh ? '方法参考：ONS 坐标轴指南' : 'Method: ONS axes guidance');

  body = frames();
  for (const [left, log] of [[56, false], [748, true]]) {
    const x = i => left + 100 + i * 150;
    const y = value => 590 - (log ? Math.log2(value / 10) / 3 : value / 80) * 280;
    body += t(left + 32, 238, log ? (zh ? '对数刻度：等距表示翻倍' : 'Log scale: equal steps = ×2') : (zh ? '线性刻度：等距表示等量' : 'Linear: equal steps = equal gains'), 29, log ? C.cyan : C.blue, 'start', 700);
    body += t(left + 32, 277, zh ? '计数' : 'Count', 24, C.muted);
    for (const val of log ? [10, 20, 40, 80] : [0, 20, 40, 60, 80]) body += line(left + 100, y(val), left + 550, y(val)) + t(left + 80, y(val) + 8, val, 26, C.muted, 'end');
    const vals = [10, 20, 40, 80];
    body += `<polyline points="${vals.map((val, i) => `${x(i)},${y(val)}`).join(' ')}" fill="none" stroke="${log ? C.cyan : C.blue}" stroke-width="5"/>`;
    for (const [i, val] of vals.entries()) body += circle(x(i), y(val), 9, log ? C.cyan : C.blue) + t(x(i), y(val) - 20, val, 28, C.ink, 'middle', 700) + t(x(i), 625, i, 26, C.muted, 'middle');
    body += t(left + 325, 675, zh ? '时间（等间隔）' : 'Time (equal intervals)', 27, C.muted, 'middle');
  }
  save('reading-chart-scales-growth', locale, zh ? '同样的翻倍过程：弯曲与直线' : 'The same doubling process: curve or line', zh ? '四个时点的数值：10 → 20 → 40 → 80。原始数据没有改变。' : 'Four observations: 10 → 20 → 40 → 80. Only the vertical scale changes.', zh ? '左图为线性刻度，10、20、40、80 向上弯曲；右图为以 2 为底的对数刻度，形成直线。' : 'Values 10, 20, 40, 80 bend upward on a linear axis and form a straight line on a base-2 logarithmic axis.', body, zh ? '方法参考：ONS 坐标轴指南' : 'Method: ONS axes guidance');

  body = rect(56, 190, 1328, 510, 'white', 20, C.line);
  const deliveryRows = [[18,19,20,20,21,22,22,23,24], [18,19,20,20,21,22,22,23,90]];
  const sx = val => 330 + val * 9.5;
  for (const [i, values] of deliveryRows.entries()) {
    const yy = 360 + i * 220, placed = [];
    body += t(88, yy - 35, zh ? (i ? '出现严重延迟' : '原来的九笔') : (i ? 'One long delay' : 'Original nine'), 28, C.ink, 'start', 700);
    body += t(88, yy + 7, zh ? (i ? '均值 ≈ 28.3' : '均值 = 21') : (i ? 'Mean ≈ 28.3' : 'Mean = 21'), 27, C.amber);
    body += t(88, yy + 48, zh ? '中位数 = 21' : 'Median = 21', 27, C.cyan);
    body += line(sx(0), yy + 25, sx(100), yy + 25);
    for (const val of [0,20,40,60,80,100]) body += line(sx(val), yy + 22, sx(val), yy + 32) + t(sx(val), yy + 63, val, 26, C.muted, 'middle');
    for (const val of values) {
      // Stack nearby observations as needed so all nine marks stay visible.
      let dotY = yy;
      while (placed.some(([x, y]) => Math.hypot(x - sx(val), y - dotY) < 27)) dotY -= 30;
      placed.push([sx(val), dotY]);
      body += circle(sx(val), dotY, 12, val === 90 ? C.amber : C.blue);
    }
    body += line(sx(21), yy - 103, sx(21), yy + 25, C.cyan, 3, '6 5');
    if (i) body += line(sx(255/9), yy - 80, sx(255/9), yy + 25, C.amber, 3, '6 5') + t(sx(90), yy - 28, '90', 30, C.amber, 'middle', 700);
  }
  body += t(1280, 677, zh ? '配送时间 / 分钟' : 'Delivery time / minutes', 26, C.muted, 'end');
  save('mean-median-outliers-shift', locale, zh ? '一笔订单延迟，均值随之移动' : 'One delayed order moves the mean', zh ? '唯一变化：24 分钟 → 90 分钟。圆点对应每一笔订单。' : 'Only one observation changes: 24 minutes → 90 minutes. One dot = one order.', zh ? '上行 18、19、20、20、21、22、22、23、24 的均值和中位数均为 21。下行末项改为 90，均值约 28.3，中位数仍为 21。' : 'The first row is 18,19,20,20,21,22,22,23,24 with mean and median 21. Replacing 24 by 90 changes the mean to about 28.3 while the median stays at 21.', body, zh ? '方法参考：NIST 位置指标' : 'Method: NIST measures of location');

  body = rect(56, 190, 1328, 510, 'white', 20, C.line);
  const px = val => 330 + val * 24;
  for (const [i, values] of [[19,20,20,20,21], [2,3,20,37,38]].entries()) {
    const yy = 340 + i * 230, count = new Map();
    body += t(88, yy - 20, zh ? (i ? 'B 组：很分散' : 'A 组：很集中') : (i ? 'Set B: spread out' : 'Set A: clustered'), 29, C.ink, 'start', 700);
    body += t(88, yy + 25, zh ? (i ? '极差 = 36' : '极差 = 2') : (i ? 'Range = 36' : 'Range = 2'), 27, C.muted);
    body += line(px(0), yy + 24, px(40), yy + 24);
    for (const v of [0,10,20,30,40]) body += t(px(v), yy + 62, v, 26, C.muted, 'middle');
    body += line(px(20), yy - 100, px(20), yy + 24, C.cyan, 3, '6 5');
    for (const v of values) { const stack = count.get(v) || 0; count.set(v, stack + 1); body += circle(px(v), yy - stack * 30, 12, C.blue); }
  }
  body += t(1290, 677, zh ? '配送时间 / 分钟' : 'Delivery time / minutes', 26, C.muted, 'end');
  save('mean-median-outliers-spread', locale, zh ? '均值和中位数相同，体验仍可不同' : 'Same center. Very different experiences.', zh ? '两组均值 = 20，中位数 = 20；每个圆点代表一笔订单。' : 'Both sets: mean = 20, median = 20. Every dot represents one delivery.', zh ? 'A 组为 19、20、20、20、21；B 组为 2、3、20、37、38。两组中心相同，但范围不同。' : 'Set A contains 19,20,20,20,21. Set B contains 2,3,20,37,38. Both have mean and median 20 but very different ranges.', body, zh ? '方法参考：NIST 离散指标' : 'Method: NIST measures of scale');

  body = rect(56, 190, 1328, 510, 'white', 20, C.line);
  body += t(570, 250, zh ? '标记为需要复核' : 'Flagged for review', 30, C.ink, 'middle', 700) + t(1070, 250, zh ? '放行' : 'Passed', 30, C.ink, 'middle', 700);
  body += t(88, 376, zh ? '真实有缺陷' : 'Actual defect', 28, C.ink, 'start', 700) + t(88, 420, zh ? '共 100 件' : '100 parts', 27, C.muted);
  body += t(88, 576, zh ? '真实合格' : 'Actually acceptable', zh ? 28 : 25, C.ink, 'start', 700) + t(88, 620, zh ? '共 9,900 件' : '9,900 parts', 27, C.muted);
  for (const [x,y,n,label,bg,color] of [
    [330,285,'90',zh?'真正例 TP':'True positives / TP',C.pale,C.blue],
    [830,285,'10',zh?'假负例 FN':'False negatives / FN',C.warm,C.amber],
    [330,485,'198',zh?'假正例 FP':'False positives / FP',C.warm,C.amber],
    [830,485,'9,702',zh?'真负例 TN':'True negatives / TN','#e7f5f3',C.cyan],
  ]) body += rect(x,y,480,180,bg,16) + t(x+240,y+88,n,60,color,'middle',700) + t(x+240,y+140,label,29,color,'middle');
  save('classifier-base-rates-matrix', locale, zh ? '把 10,000 次判断拆成四格' : 'Break 10,000 decisions into four outcomes', zh ? '行看真实状态，列看检测决定。颜色只是辅助，数量均明确标出。' : 'Rows show reality; columns show the decision. Read the labelled counts.', zh ? '有缺陷且被标记 90，缺陷漏检 10，合格误报 198，合格正确放行 9702。' : '90 defects flagged, 10 defects missed, 198 acceptable parts flagged, 9702 acceptable parts passed.', body, zh ? '方法参考：Google 混淆矩阵' : 'Method: Google confusion matrix');

  body = rect(56,190,1328,510,'white',20,C.line);
  body += rect(88,220,22,22,C.blue) + t(123,242,zh?'真实缺陷':'Real defects',27,C.ink) + rect(450,220,22,22,C.amber) + t(485,242,zh?'误报的合格品':'False alarms',27,C.ink);
  for (const [i,prevalence,tp,fp] of [[0,1,90,198],[1,10,900,180]]) {
    const y = 330+i*200, p = tp/(tp+fp), start=350, width=950;
    body += t(88,y+24,zh?`缺陷占比 ${prevalence}%`:`${prevalence}% defective`,30,C.ink,'start',700) + t(88,y+68,zh?`告警 ${tp+fp} 件`:`${tp+fp} alerts`,27,C.muted);
    body += rect(start,y,width*p,95,C.blue) + rect(start+width*p,y,width*(1-p),95,C.amber);
    body += t(start+width*p/2,y+60,tp,37,'white','middle',700) + t(start+width*p+width*(1-p)/2,y+60,fp,37,'white','middle',700);
    body += t(start,y+137,zh?`告警中的真问题：${i?'83.3%':'31.25%'}`:`Real defects among alerts: ${i?'83.3%':'31.25%'}`,30,C.blue,'start',700);
  }
  save('classifier-base-rates-alerts', locale, zh ? '同样的条件率，不同的告警组成' : 'Same detection rates. Different alert quality.', zh ? '假设召回率 = 90%，假正例率 = 2%；每根条都表示本组 100% 的告警。' : 'Assume recall = 90% and false-positive rate = 2%. Each bar shows 100% of alerts.', zh ? '1% 缺陷时，90 个真告警和 198 个误报，精确率 31.25%；10% 缺陷时，900 个真告警和 180 个误报，精确率约 83.3%。' : 'At 1% defects, 90 true alerts and 198 false alarms give 31.25% precision. At 10% defects, 900 true alerts and 180 false alarms give about 83.3%.', body, zh ? '定义参考：Google 分类指标' : 'Definitions: Google classification metrics');

  body = rect(56,190,1328,510,'white',20,C.line);
  body += rect(88,220,22,22,C.blue) + t(123,242,zh?'通勤学生':'Commuters',27,C.ink) + rect(450,220,22,22,C.cyan) + t(485,242,zh?'住校学生':'Campus residents',27,C.ink);
  for (const [i,p,labels] of [[0,.8,['800 / 80%','200 / 20%']],[1,.5,['100 / 50%','100 / 50%']]]) {
    const yy=330+i*220,x=350,w=950;
    body += t(88,yy+32,zh?(i?'回答者':'目标总体'):(i?'Respondents':'Target population'),29,C.ink,'start',700) + t(88,yy+77,i?'n = 200':'N = 1,000',27,C.muted);
    body += rect(x,yy,w*p,110,C.blue) + rect(x+w*p,yy,w*(1-p),110,C.cyan);
    body += t(x+w*p/2,yy+68,labels[0],32,'white','middle',700) + t(x+w*p+w*(1-p)/2,yy+68,labels[1],i?32:28,'white','middle',700);
  }
  save('sampling-bias-large-surveys-composition', locale, zh ? '收到的回答，不一定像目标总体' : 'The respondents do not match the population', zh ? '每根条表示本组 100% 的人数；标签同时给出人数和占比。' : 'Each bar represents 100% of its own group. Labels show counts and shares.', zh ? '总体 1000 人中，通勤 800、住校 200；回答者 200 人中，两组各 100。住校学生被过度代表。' : 'The population has 800 commuters and 200 residents. The survey has 100 respondents from each group, overrepresenting residents.', body, zh ? '方法参考：Statistics Canada 抽样指南' : 'Method: Statistics Canada sampling guidance');

  body = frames();
  for (const [left,weighted] of [[56,false],[748,true]]) {
    body += t(left+32,241,zh?(weighted?'按总体比例加权':'按回答人数直接汇总'):(weighted?'Use population shares':'Count respondents equally'),30,weighted?C.cyan:C.blue,'start',700);
    body += t(left+32,294,zh?'组内支持率保持不变':'Keep within-group support fixed',26,C.muted);
    body += pill(left+32,327,572,weighted?'0.80 × 20% = 16%':'0.50 × 20% = 10%');
    body += t(left+318,426,'+',34,C.muted,'middle');
    body += pill(left+32,448,572,weighted?'0.20 × 80% = 16%':'0.50 × 80% = 40%','#e7f5f3',C.cyan);
    body += t(left+318,589,weighted?'32%':'50%',76,weighted?C.cyan:C.blue,'middle',700);
    body += t(left+318,651,zh?(weighted?'与设定的总体支持率一致':'这 200 位回答者的支持率'):(weighted?'Matches our invented population':'Support among these respondents'),26,C.muted,'middle');
  }
  save('sampling-bias-large-surveys-weights', locale, zh ? '加权修正的是群体比例' : 'Weighting repairs the mix of groups', zh ? '教学假设：通勤组支持率 20%，住校组 80%；各组回答者代表各自群体。' : 'Assume representative responses within groups: 20% commuter support, 80% resident support.', zh ? '回答者权重各一半，合计支持率 50%；总体权重为通勤 80%、住校 20%，合计支持率 32%。加权有效依赖组内代表性假设。' : 'Equal group weights give 50% support. Population weights of 80% and 20% give 32%. This correction depends on within-group representativeness.', body, zh ? '方法参考：U.S. Census Bureau 非抽样误差' : 'Method: U.S. Census Bureau nonsampling error');
}

writeFileSync(new URL('./figures.json', import.meta.url), JSON.stringify(manifest, null, 2) + '\n');
console.log(`Wrote ${manifest.length} original SVG diagrams to ${out}`);
