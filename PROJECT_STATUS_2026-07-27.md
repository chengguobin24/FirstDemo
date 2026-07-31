# JUNSU 网站项目进度与后续交接

> 更新时间：2026-07-27  
> 适用项目：JUNSU Aluminum Systems 企业官网  
> 本文件用于把当前工作交接给下一个 Codex 任务或开发人员。开始修改前，请先完整阅读本文件。

## 1. 项目基本信息

- 本地项目目录：`C:\Users\Lenovo\Documents\Codex\2026-07-11\chrome-plugin-chrome-openai-bundled-file`
- GitHub 仓库：`https://github.com/chengguobin24/FirstDemo`
- 当前分支：`main`
- 当前本地最新提交：`0e39d8b Update JUNSU website for production`
- 正式域名：`https://www.junsualu.com`
- Cloudflare Worker 备用地址：`https://junsu-aluminum-systems.chengguobin24.workers.dev`
- Worker 名称：`junsu-aluminum-systems`
- 技术栈：Next.js 16、React 19、TypeScript、Vinext、Vite、Cloudflare Workers
- 包管理器：`npm`
- Node.js 要求：`>=22.13.0`

## 2. 已经完成的工作

### 网站与页面

- 已完成面向海外 B2B 客户的 JUNSU Aluminum Systems 英文官网。
- 已完成并上线主要页面：
  - HOME
  - PRODUCTS
  - 围栏产品与详情页
  - 平开门、折叠门、滑动门详情页
  - 铝合金凉亭详情页
  - OEM / ODM
  - PROJECTS
  - VIDEOS
  - ABOUT
  - CONTACT
  - SEARCH
- 已配置响应式布局、产品图片、项目图片、基础动画和移动端适配。
- 已配置基础 SEO：
  - 页面 metadata
  - `robots.txt`
  - `sitemap.xml`
  - canonical URL
  - Open Graph 分享图
  - favicon
- 当前页面头部和底部显示的 `JS` 标志是 HTML/CSS 文字标志，不是公司正式 Logo 图片。

### GitHub 与 Cloudflare 部署

- 本地项目已连接 GitHub 仓库 `chengguobin24/FirstDemo`。
- Cloudflare Workers 已连接 GitHub 的 `main` 分支。
- Cloudflare 当前构建命令：`npm run build`
- Cloudflare 当前部署命令：`npx wrangler deploy --config dist/server/wrangler.json`
- 推送到 GitHub `main` 后，Cloudflare 会自动构建并部署。
- Worker 默认域名可以访问。
- 自定义域名 `www.junsualu.com` 已绑定并可以正常访问。
- HTTPS 已启用，HTTP 请求会跳转到 HTTPS。

### 询盘表单和邮件通知

- 网站询盘接口位于：`app/api/inquiry/route.ts`
- 询盘表单组件位于：`components/InquiryForm.tsx`
- 已接入 Resend 邮件 API。
- Resend 发信子域名 `mail.junsualu.com` 已完成 DNS 验证。
- Resend API Key 已创建，并以 Cloudflare 加密密钥保存。
- 已在 Cloudflare Worker 中配置以下运行时变量：
  - `RESEND_API_KEY`：加密密钥
  - `CONTACT_FROM_EMAIL`：询盘发件地址
  - `CONTACT_TO_EMAIL`：询盘接收地址
- 用户已经实际提交表单测试，邮件能够正常收到。
- 邮件的 `Reply-To` 会使用访客在表单中填写的邮箱，可以直接回复客户。
- 表单支持最大 10 MB 附件。
- 允许的附件扩展名：PDF、DWG、DXF、JPG、JPEG、PNG、WEBP。
- 已实现基础安全措施：
  - 必填字段检查
  - 邮箱格式检查
  - 同源请求检查
  - 隐藏蜜罐字段
  - 最短填写时间检查
  - 文本清理和 HTML 转义
  - 附件类型和大小检查

### HTTPS 与 DNS

- `www.junsualu.com` 已成功解析到 Cloudflare Worker。
- Cloudflare 的“始终使用 HTTPS”已经开启。
- Resend 所需的 MX、SPF、DKIM DNS 记录已经授权添加并验证成功。
- 网站 DNS 与邮件发送 DNS 使用不同子域，不互相冲突：
  - 网站：`www.junsualu.com`
  - 邮件发送：`mail.junsualu.com`

## 3. 当前仓库状态

在 2026-07-27 检查时：

```text
当前分支：main
Git 远程：origin -> https://github.com/chengguobin24/FirstDemo.git
最新提交：0e39d8b Update JUNSU website for production
未提交修改：package-lock.json
```

重要：

- `package-lock.json` 当前存在本地未提交修改。
- 下一个任务开始时，必须先运行 `git diff -- package-lock.json` 查明变化原因。
- 在确认之前，不要删除、覆盖或还原该文件。
- 不要使用 `git reset --hard` 或 `git checkout --` 清理工作区。
- 本文件创建时没有修改网站程序，也没有推送 GitHub。

## 4. 当前环境变量

代码需要或支持以下环境变量：

```env
NEXT_PUBLIC_SITE_URL=https://www.junsualu.com

RESEND_API_KEY=
CONTACT_TO_EMAIL=
CONTACT_FROM_EMAIL=

NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=

NEXT_PUBLIC_SWING_GATE_CATALOG_PREVIEW_URL=
NEXT_PUBLIC_SWING_GATE_CATALOG_DOWNLOAD_URL=
```

安全规则：

- 不要把任何真实 API Key 写进代码、Markdown、`.env.example` 或 GitHub。
- `RESEND_API_KEY` 和 `TURNSTILE_SECRET_KEY` 必须保存为 Cloudflare 加密密钥。
- 本交接文档只记录变量名称，不记录实际密钥值。

## 5. 尚未完成或需要确认的事项

### 优先级高

1. **检查 `package-lock.json` 未提交修改**
   - 先查看差异。
   - 确认它是否由正确的 `npm install` 产生。
   - 确认后再决定是否提交。

2. **配置正式公司 Logo**
   - 当前网页 Logo 仍然是文字 `JS`。
   - 需要用户提供透明背景 PNG、WebP 或正式 SVG。
   - 需要同步更新：
     - 顶部 Logo：`components/SiteHeader.tsx`
     - 底部 Logo：`components/SiteFooter.tsx`
     - 浏览器图标：`public/favicon.png`
     - 社交分享图：`public/og.png`
     - PWA 图标配置：`app/manifest.ts`

3. **确认 Cloudflare Turnstile 是否已经正式启用**
   - 代码已经接入 Turnstile。
   - 需要确认 Cloudflare Worker 中是否已经同时配置：
     - `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
     - `TURNSTILE_SECRET_KEY`
   - 如果没有配置，表单仍可发送，但没有启用 Turnstile 人机验证。

4. **配置真实 WhatsApp 链接**
   - 早期页面中的 WhatsApp 链接可能仍是占位地址 `https://wa.me/`。
   - 需要用户提供带国家区号的完整号码后统一替换。

### 优先级中

5. **接入产品 PDF 目录**
   - 平开门 PDF 目录尚未正式接入。
   - 推荐把大 PDF 上传到 Cloudflare R2，不要直接放进 `public`。
   - 配置公开预览和下载 URL 后，再填写：
     - `NEXT_PUBLIC_SWING_GATE_CATALOG_PREVIEW_URL`
     - `NEXT_PUBLIC_SWING_GATE_CATALOG_DOWNLOAD_URL`

6. **网站上线后的全面检查**
   - 检查所有导航和 CTA。
   - 检查移动端。
   - 检查所有表单场景和附件上传。
   - 检查 404 页面。
   - 检查 sitemap、robots、canonical 和分享图。
   - 检查图片 alt 文本和页面加载速度。
   - 检查 Cloudflare 构建日志和 Worker 错误日志。

7. **监控免费额度**
   - Cloudflare Workers 免费套餐主要限制为每天 100,000 次动态请求。
   - Resend 免费套餐主要限制为每天 100 封、每月 3,000 封事务邮件。
   - 流量增长后需要在 Cloudflare 和 Resend 后台检查 Usage。

### 后续可选功能

8. **增加后台和博客发布功能**
   - 当前项目没有正式启用数据库，`.openai/hosting.json` 中 `d1` 和 `r2` 都是 `null`。
   - 推荐方案：
     - Cloudflare D1：保存博客文章、草稿和 SEO 数据
     - Cloudflare R2：保存博客图片
     - Cloudflare Access：保护 `/admin`
     - `/admin`：文章编辑、草稿、发布、撤回
     - `/blog`：文章列表
     - `/blog/[slug]`：文章详情
   - 后台完成后，普通博客发布不需要再推送 GitHub；只有程序和页面结构修改才需要推送 GitHub。

9. **增强询盘可靠性**
   - 流量增加后可以添加 Cloudflare Queue。
   - 对 Resend 的限流或暂时失败增加排队、重试和失败记录。
   - 可以增加询盘数据库记录，防止邮件服务短时异常导致信息丢失。

10. **统计与运营**
    - 可增加 Cloudflare Web Analytics。
    - 可增加 Google Search Console。
    - 可增加 Bing Webmaster Tools。
    - 可根据实际业务需要增加隐私政策、Cookie 说明和表单数据保留说明。

## 6. 日常修改和部署流程

每次修改建议按照以下流程：

```powershell
git status
git diff
npm install
npm run dev
npm run build
git status
git add <确认需要提交的文件>
git commit -m "描述本次修改"
git push origin main
```

注意：

- 如果依赖没有变化，不需要每次都运行 `npm install`。
- 推送前必须保证 `npm run build` 成功。
- 不要提交 `.env`、密钥、临时文件、`.next` 或 `dist`。
- 推送到 `main` 后，在 Cloudflare 后台确认构建成功。
- 部署成功后检查 `https://www.junsualu.com`，不要只检查 Worker 备用域名。
- 不要直接在 Cloudflare 在线代码编辑器中长期修改程序，否则下一次 GitHub 部署可能覆盖这些修改。

## 7. 主要代码位置

```text
app/
  api/inquiry/route.ts            询盘邮件 API
  layout.tsx                      全站 metadata、favicon、分享配置
  sitemap.ts                      sitemap
  robots.ts                       robots
  page.tsx                        首页入口
  products/                       产品总览和产品详情
  about/                          ABOUT 页面
  oem-odm/                        OEM / ODM 页面
  projects/                       项目页面
  videos/                         视频页面
  contact/                        联系页面

components/
  InquiryForm.tsx                 询盘表单
  TurnstileWidget.tsx             Turnstile 前端组件
  SiteHeader.tsx                  顶部导航和当前文字 Logo
  SiteFooter.tsx                  底部信息和当前文字 Logo
  OriginalHome.tsx                首页主要内容

public/
  favicon.png                     浏览器图标
  og.png                          社交分享图
  images/                         网站图片

worker/index.ts                   Cloudflare Worker 入口
vite.config.ts                    Vinext/Vite/Cloudflare 本地构建配置
.env.example                      环境变量示例
.openai/hosting.json              项目 ID；当前 D1/R2 未启用
```

## 8. 给下一个任务的执行要求

1. 先阅读本文件。
2. 运行 `git status` 和 `git diff`。
3. 先处理或确认 `package-lock.json` 的未提交修改。
4. 不要删除用户已有图片、页面或未提交文件。
5. 不要重新创建 Cloudflare Worker、GitHub 仓库或 Resend 域名。
6. 已有正式部署、域名和邮件链路应继续复用。
7. 不要在任何输出中显示 API Key。
8. 修改产品技术参数前必须获得用户确认，不要推测尺寸、认证、产能或质保。
9. 完成代码修改后至少运行 `npm run build`。
10. 只有用户明确要求时，才执行 Git 提交、推送或生产部署。

## 9. 建议的下一任务起点

如果用户没有指定新的功能，建议按照以下顺序继续：

1. 检查并确认 `package-lock.json` 的差异。
2. 获取并替换正式公司 Logo。
3. 确认 Turnstile 两个密钥是否已经配置并进行真实表单测试。
4. 配置真实 WhatsApp 号码。
5. 接入 R2 产品 PDF。
6. 做一次完整的桌面端、移动端、SEO、链接和表单上线检查。
7. 再决定是否开发 D1 + R2 + Cloudflare Access 的博客后台。

---

交接结论：网站主体、GitHub 自动部署、自定义域名、HTTPS、Resend 域名验证和询盘邮件发送已经打通并通过真实测试。下一阶段重点不是重新部署，而是保护现有稳定版本，补齐 Logo、Turnstile、WhatsApp、PDF、监控和可选博客后台。
