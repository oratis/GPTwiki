# gptwiki.net 接入 Cloudflare 迁移指南

> 用户主体在海外，目标：DDoS/WAF 防护、全球 CDN 加速、隐藏 origin IP、为后续 Workers/Images 铺路。
> 当前 DNS 在阿里云万网（`dns31/32.hichina.com`），TLS 由 Cloud Run 自动签 LetsEncrypt，邮箱挂腾讯企业邮箱（`mxbiz1/2.qq.com`）。

---

## 现状快照（迁移前再跑一次，对比备份）

```bash
# 完整 DNS 备份
for type in A AAAA CNAME MX TXT NS SRV CAA; do
  echo "=== $type ==="
  dig +noall +answer gptwiki.net $type
  dig +noall +answer www.gptwiki.net $type
done > /tmp/gptwiki-dns-backup-$(date +%Y%m%d).txt

# TLS 证书 & 响应头
echo | openssl s_client -servername gptwiki.net -connect gptwiki.net:443 2>/dev/null \
  | openssl x509 -noout -issuer -subject -dates
curl -sI https://gptwiki.net | head -15
```

执行迁移前确认：
- [ ] 备份文件已生成 `/tmp/gptwiki-dns-backup-YYYYMMDD.txt`
- [ ] 阿里云域名控制台账号可登录
- [ ] 腾讯企业邮箱管理后台账号可登录（核对 SPF/DKIM 用）
- [ ] Cloud Run 服务正常运行（`gptwiki` @ `us-central1`）

---

## 阶段 1：Cloudflare 加站点 + 配 DNS（不切流量）

### 1.1 注册并添加 zone

1. https://dash.cloudflare.com/sign-up
2. Dashboard → **Add a site** → 输入 `gptwiki.net`
3. 选 **Free 套餐**（足够目前体量；后续上 Image Resizing / Advanced WAF 再升 Pro $20/月）
4. Cloudflare 自动扫描现有 DNS

### 1.2 在 CF DNS 面板调整成目标记录

| 类型  | 名称    | 内容                                                | 代理   | 说明                                       |
| ----- | ------- | --------------------------------------------------- | ------ | ------------------------------------------ |
| CNAME | `@`     | `ghs.googlehosted.com`                              | 🟠 Proxied | CF 免费版自动 CNAME flattening             |
| CNAME | `www`   | `ghs.googlehosted.com`                              | 🟠 Proxied |                                            |
| MX    | `@`     | `mxbiz1.qq.com` (优先级 5)                          | ⚪ DNS only | CF 不代理 SMTP                             |
| MX    | `@`     | `mxbiz2.qq.com` (优先级 10)                         | ⚪ DNS only |                                            |
| TXT   | `@`     | `google-site-verification=Lqz2o1ZqKc_FFT--GGPas2NUiejJY7FcO7u0m3UVIwM` | – | Search Console 验证       |
| TXT   | `@`     | `v=spf1 include:spf.mail.qq.com ~all`               | – | **必须从腾讯企业邮箱后台核对**             |
| TXT   | `mail._domainkey` | `v=DKIM1; ...`                            | – | **必须从腾讯企业邮箱后台核对**             |

**核心规则**：
- 网站流量（`@` 和 `www`）**必须 Proxied（橙色云）**，否则接入无意义
- 邮件相关（MX/SPF/DKIM）**必须 DNS only（灰色云）**
- 删掉原 A 记录 `198.18.0.109`，改 CNAME → `ghs.googlehosted.com`
- 这一步**只在 CF 配置完成，但 NS 还没换，外网解析依然走阿里云**，没有任何风险

---

## 阶段 2：切 NS 到 Cloudflare（生效起点）

### 2.1 选窗口期

选海外用户低峰时段（北京时间凌晨 4-7 点，对应北美晚间），DNS 传播期间可能有最长几小时的解析不一致。

### 2.2 改 NS

1. Cloudflare 会显示两个 NS，类似 `anya.ns.cloudflare.com` / `tom.ns.cloudflare.com`
2. 登录阿里云域名控制台 → 域名 `gptwiki.net` → **DNS 修改**（注意：是域名管理 → DNS 服务器，不是云解析里的 DNS）
3. 用 CF 给的两条**完全替换** `dns31/32.hichina.com`
4. 如阿里云开了 DNSSEC，**先关 DNSSEC** 再换 NS
5. 保存

### 2.3 等待传播 & 确认接管

```bash
# 每隔几分钟跑一次，看 NS 已切换
dig +short gptwiki.net NS
# 期望输出 *.ns.cloudflare.com（约 5 分钟 - 几小时）
```

Cloudflare 检测到接管会发邮件，dashboard zone 状态从 Pending 变 Active。

---

## 阶段 3：CF 关键配置（NS 接管后立刻调，20 分钟内完成）

### 3.1 SSL/TLS

- **SSL/TLS → Overview → Encryption mode: `Full (strict)`** ← 必做
  - Cloud Run 已有 LE 有效证书，可以 strict
  - **绝对不能用 Flexible**（CF→origin 走 HTTP 会导致重定向死循环 + 数据泄露）
- **Edge Certificates → Always Use HTTPS: ON**
- **Edge Certificates → Automatic HTTPS Rewrites: ON**
- **Edge Certificates → Minimum TLS Version: TLS 1.2**
- **Edge Certificates → HSTS: 先关着**。完全跑通 1-2 周后再开（一旦开启浏览器锁 HTTPS 半年起步，配错无法快速回滚）

### 3.2 Speed（避免破坏 React/SSE）

- **Optimization → Content Optimization → Rocket Loader: OFF** ← **必关！**
  - Rocket Loader 会改写 `<script>` 加载顺序，破坏 React hydration 和 `/api/chat` 的 SSE 流式输出
- **Auto Minify**：HTML 可开，**JS/CSS 关闭**（Next.js 产物已 minified，再处理可能引入 bug）
- **Network → HTTP/3 (with QUIC): ON**
- **Network → WebSockets: ON**
- **Network → 0-RTT Connection Resumption: ON**
- **Network → gRPC: ON**

### 3.3 Caching

**Caching → Configuration → Browser Cache TTL: `Respect Existing Headers`**

进 **Rules → Cache Rules**（免费版 10 条），按顺序新建：

| # | 规则名             | 条件                                                                       | 动作                                                   |
| - | ------------------ | -------------------------------------------------------------------------- | ------------------------------------------------------ |
| 1 | Bypass auth        | URI Path starts with `/api/auth/`                                          | **Bypass cache**                                       |
| 2 | Bypass chat        | URI Path eq `/api/chat`                                                    | **Bypass cache**（SSE 流式必须 bypass）                |
| 3 | Bypass other APIs  | URI Path starts with `/api/` AND NOT (`/api/sitemap*` OR `/api/og*` OR `/api/feed`) | Bypass cache                                  |
| 4 | Cache sitemap/feed | URI Path eq `/sitemap.xml` OR `/robots.txt` OR starts `/api/sitemap` OR eq `/api/feed` | Cache eligible, Edge TTL 1 hour            |
| 5 | Cache OG image     | URI Path starts with `/api/og`                                             | Cache eligible, Edge TTL 1 day                         |
| 6 | Cache embed iframe | URI Path starts with `/embed/`                                             | Cache eligible, Edge TTL 1 hour                        |
| 7 | Cache Next static  | URI Path starts with `/_next/static/`                                      | Cache eligible, Edge TTL 1 month, Browser TTL 1 year   |
| 8 | Cache Next image   | URI Path starts with `/_next/image`                                        | Cache eligible, Edge TTL 1 week                        |

**规则顺序很重要**：Cache Rules 自上而下匹配，第一条命中就停止。把所有 Bypass 放前面。

### 3.4 Security / WAF

- **WAF → Managed Rules**：启用 "Cloudflare Managed Ruleset"（免费版自带 OWASP 基础规则）
- **Bots → Bot Fight Mode: ON**（免费版基础反爬，会挑战可疑 UA）
- **Settings → Security Level: Medium**（默认）

**Rate Limiting Rules**（免费版 1 条免费，给最敏感的端点）：

| 规则名         | 条件                          | 限制                | 动作                  |
| -------------- | ----------------------------- | ------------------- | --------------------- |
| Chat anti-abuse | URI Path eq `/api/chat` AND Method eq `POST` | 10 req / 60s / IP | Block 10 min |

> 项目自带的 `src/lib/rate-limit.ts` 是 in-memory 单实例限流，Cloud Run 多实例会失效；CF 这一层是真正的分布式限流。

**Custom Rules**（免费版 5 条）建议：
- 阻挡常见漏洞扫描器 UA：`(http.user_agent contains "sqlmap") or (http.user_agent contains "nikto") or (http.user_agent contains "masscan")` → Block
- 阻挡空 UA POST：`(http.request.method eq "POST") and (http.user_agent eq "")` → Managed Challenge

### 3.5 Embed iframe 兼容

[next.config.ts](../next.config.ts) 给 `/embed/*` 设了 `X-Frame-Options: ALLOWALL` 和 `frame-ancestors *;`。

- CF 默认透传 origin 响应头，**不需要**额外配置
- **不要**给 `/embed/*` 开 "Browser Integrity Check"（一般问题不大，遇嵌入失败再针对 `/embed/*` 加 Page Rule 关掉）

---

## 阶段 4：上线验证清单

```bash
# 1. 流量真的过 CF
curl -sI https://gptwiki.net | grep -iE 'cf-ray|server'
# 期望：cf-ray: xxxxx-XXX 和 server: cloudflare

# 2. TLS 正常
curl -sI https://gptwiki.net | head -3
# 期望：HTTP/2 307（root 重定向 /en）

# 3. 多语言重定向
curl -sI https://gptwiki.net | grep -i location              # → /en
curl -sI -H "Accept-Language: zh" https://gptwiki.net | grep -i location  # → /zh

# 4. 静态资源边缘缓存命中
curl -sI https://gptwiki.net/_next/static/<sha>.js | grep -i cf-cache-status
# 第二次请求应为 HIT

# 5. API 没被缓存
curl -sI https://gptwiki.net/api/search | grep -i cf-cache-status
# 期望：BYPASS

# 6. OG image 被缓存
curl -sI "https://gptwiki.net/api/og?title=test" | grep -i cf-cache-status
# 第二次应为 HIT
```

浏览器手测：

- [ ] `/en/chat` 发一条消息，token 逐字流出（**不是**等很久整段出现 — 如果整段出现，检查 Rocket Loader / Cache Rules）
- [ ] Google / GitHub / 邮箱 magic link 三种登录都跑通
- [ ] 给 gptwiki 注册账号的邮箱发测试，Gmail 收件箱里看"原始邮件"，SPF/DKIM/DMARC 都 PASS
- [ ] codepen / jsfiddle 嵌入 `<iframe src="https://gptwiki.net/embed/<id>">` 渲染正常
- [ ] 首页 Popular Wikis 缩略图正常显示

---

## 阶段 5：隐藏 Origin IP（接入跑稳 1 周后做）

接入 CF 后，`dig gptwiki.net` 只看到 CF IP。但 Cloud Run 给的 `gptwiki-coo5zea2na-uc.a.run.app` URL **仍可直接访问**，攻击者可通过证书透明度日志（crt.sh）找到 Cloud Run URL 绕过 CF。

### 5.1 应用层防绕过（10 分钟，立刻可做）

在 [src/proxy.ts](../src/proxy.ts) 顶部加 CF header 校验。CF 经过 origin 时一定会注入 `CF-Connecting-IP`、`CF-Ray`、`CF-IPCountry`，直连 Cloud Run URL 不会有：

```ts
const REQUIRE_CLOUDFLARE = process.env.REQUIRE_CLOUDFLARE === 'true';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ... 现有 bypass 逻辑 ...

  // 阻挡绕过 CF 直连 Cloud Run（仅对面向用户的页面 + API 强制）
  if (REQUIRE_CLOUDFLARE && !request.headers.get('cf-ray')) {
    // 放行 health check / Cloud Run 内部探活
    if (pathname.startsWith('/_next/static')) return;
    return new NextResponse('Direct origin access blocked', { status: 403 });
  }

  // ... 现有重定向逻辑 ...
}
```

部署后到 Cloud Run 控制台把 `REQUIRE_CLOUDFLARE=true` 加进环境变量。

**注意**：这种方案 attacker 可以伪造 `cf-ray` header 绕过。要做到伪造也无效，需要：
- CF 端配置 Transform Rule 注入一个**私密 header**（如 `X-Origin-Auth: <random>`）
- proxy.ts 校验这个 header 的值

更安全的版本：

```ts
const ORIGIN_AUTH = process.env.ORIGIN_AUTH_SECRET;

if (ORIGIN_AUTH && request.headers.get('x-origin-auth') !== ORIGIN_AUTH) {
  return new NextResponse('Forbidden', { status: 403 });
}
```

CF 端 Transform Rules → Modify Request Header → 对所有匹配的请求添加 `X-Origin-Auth: <随机字符串>`。同时 Cloud Run 设环境变量 `ORIGIN_AUTH_SECRET=<同一个字符串>`。

### 5.2 网络层隔离（成本高，可选）

完全杜绝绕过的方案：
1. Cloud Run 服务设 ingress = "Internal and Cloud Load Balancing"
2. 前面挂一个 Google Cloud HTTPS Load Balancer
3. LB 的 Cloud Armor 策略配 allowlist：只允许 [Cloudflare 出口 IP 段](https://www.cloudflare.com/ips/)
4. CF 回源指向 LB 的 IP

**成本**：Cloud LB 静态 IP $7.20/月 + 转发规则 + 流量费。除非业务规模够大或合规要求，先不做。

---

## 阶段 6：后续 Cloudflare 全家桶（可选）

接入完成后，未来可以渐进启用：

- **Cloudflare Web Analytics**（免费、无 cookie、GDPR 友好）：替代 / 并行 GA4
- **Cloudflare Images** ($5/月起)：替代 next/image 的 `_next/image` 优化器
  - 把 GCS 的图片源切到 CF Images，前端用 CF Images 的 URL
  - 释放 Cloud Run 出口流量成本
- **Cloudflare Workers**：把某些边缘逻辑（如 A/B 路由、动态 OG 生成）下沉到边缘
  - DNS 已经在 CF，加 Worker 只是 dashboard 操作
- **Turnstile**：CAPTCHA 替代品，给登录 / 发布接口加无感验证
- **Cloudflare R2**：与 GCS 并行做镜像存储（如要降 GCS 出口费用）

---

## 回滚方案

### 快速回滚（30 秒生效，推荐）

CF dashboard → DNS → 把 `@` 和 `www` 的橙色云点成灰色云（DNS only）
- 流量绕过 CF 直回 Cloud Run，CF 仅做 DNS 解析
- DNS 仍在 CF 但所有问题立解（适用于 CF 配置错误的场景）

### 完全回滚（几小时传播）

1. 阿里云域名控制台把 NS 改回 `dns31.hichina.com` / `dns32.hichina.com`
2. 用 `/tmp/gptwiki-dns-backup-*.txt` 在阿里云云解析重建所有 DNS 记录
3. 等全球 NS 缓存过期（最长 48 小时，通常 1-2 小时）

---

## 风险与权衡

| 风险                                     | 缓解                                                |
| ---------------------------------------- | --------------------------------------------------- |
| CF 国内无节点，回源走港新日，国内变慢    | 用户主体在海外，可接受。国内用户多了再考虑国内 CDN |
| CF Free 边缘缓存有 TTL 上限（30 天）     | `_next/static` 配 1 month；超过会回源，影响极小    |
| Rocket Loader / Auto Minify 默认开       | 阶段 3.2 明确关闭，已写入清单                       |
| HSTS 配错锁死浏览器                      | 1-2 周观察后再开，且先用短 max-age                  |
| Cloud Run 直连 URL 仍可访问              | 阶段 5.1 通过 header 校验阻断；规模大再上 LB        |
| Cache Rules 误把 `/api/*` 缓存住         | 阶段 3.3 规则顺序：先 Bypass 后 Cache               |
| 腾讯企业邮箱 DKIM / SPF 漏迁导致进垃圾箱 | 阶段 1.2 强调从腾讯后台核对；阶段 4 用 Gmail 验证   |

---

## 一页纸执行清单（窗口期照着做）

```
□ 1. 跑现状快照 + DNS 备份（5 min）
□ 2. CF 加 zone、配 DNS 记录（10 min，不影响线上）
□ 3. 阿里云改 NS（1 min）
□ 4. 等 NS 接管（5 min - 几小时）
□ 5. NS 接管后 20 分钟内：
    □ SSL = Full strict
    □ Always Use HTTPS = ON
    □ Rocket Loader = OFF
    □ Auto Minify JS/CSS = OFF
    □ Cache Rules 8 条（先 Bypass 后 Cache）
    □ Rate Limit /api/chat
    □ WAF Managed Rules = ON
□ 6. 验证清单全跑（10 min）
□ 7. 监控 1-2 周
□ 8. 加阶段 5.1 application-layer origin protection
□ 9. 开 HSTS（确认稳定后）
```

---

## 参考链接

- Cloudflare DNS for Cloud Run: https://cloud.google.com/run/docs/mapping-custom-domains
- Cloudflare IP ranges: https://www.cloudflare.com/ips/
- CF Cache Rules docs: https://developers.cloudflare.com/cache/how-to/cache-rules/
- CF Rate Limiting: https://developers.cloudflare.com/waf/rate-limiting-rules/
- 腾讯企业邮箱 SPF/DKIM 配置: https://open.work.weixin.qq.com/help2/pc/16809
