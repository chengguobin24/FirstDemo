# JUNSU 网站项目交接文档

> 更新时间：2026-07-29  
> 项目：JUNSU Aluminum Systems 英文 B2B 官网  
> 用途：交接给下一个 Codex 对话或开发人员。开始任何修改前，请先完整阅读本文。

## 1. 最重要的用户要求

1. **当前只允许本地修改。**
2. 在用户明确说“上传 GitHub”“重新上线”或“部署”之前：
   - 不提交 Git；
   - 不推送 GitHub；
   - 不触发 Cloudflare 部署；
   - 不点击 Cloudflare 中会保存并部署配置的按钮。
3. 用户会先在本地检查，确认没有问题后再单独发出上线指令。
4. 不要删除或覆盖用户已有图片、PDF、页面内容和未提交修改。
5. 不要在代码、Markdown、终端输出或回复中暴露任何真实 API Key、Turnstile Secret、Access JWT 或其他密钥。

## 2. 项目基本信息

- 本地目录：`C:\Users\Lenovo\Documents\Codex\2026-07-11\chrome-plugin-chrome-openai-bundled-file`
- GitHub：`https://github.com/chengguobin24/FirstDemo`
- 当前分支：`main`
- 当前 HEAD：`0e39d8b`
- HEAD 提交：`Update JUNSU website for production`
- 正式域名：`https://www.junsualu.com`
- Cloudflare Worker 旧备用地址：`https://junsu-aluminum-systems.chengguobin24.workers.dev`
- 技术栈：Next.js 16、React 19、TypeScript、Vinext、Vite、Cloudflare Workers
- 包管理器：npm
- Node.js：`>=22.13.0`
- Sites 项目 ID 已记录在 `.openai/hosting.json`，不要重新创建 Sites 项目。

## 3. 当前总体状态

网站原来的正式版本已经上线，域名、HTTPS、Resend 询盘邮件曾在正式网站真实测试成功。

从正式版本之后又进行了大量**尚未提交、尚未上传、尚未部署**的本地修改，包括：

- 正式版 Turnstile 代码；
- 三份产品 PDF；
- 围栏、平开门和凉亭的 PDF 预览/下载入口；
- 询盘表单视觉调整；
- About 页面排版调整；
- Blog 公开页面；
- D1 博客数据结构；
- `/admin` 文章后台；
- Cloudflare Access 后台认证代码；
- 删除 Projects 页面；
- 顶部电话和 WhatsApp；
- 博客分享按钮；
- 全站右侧悬浮询盘按钮。

因此，**GitHub/正式网站目前不是本地最新状态**。不要把线上旧版本误认为本地代码已经部署。

## 4. 当前 Git 工作区

当前仍在 `main` 分支，存在大量未提交修改和新增文件。这些修改属于用户本轮本地优化成果，不能还原或清理。

主要已修改文件包括：

- `.env.example`
- `.openai/hosting.json`
- `app/api/inquiry/route.ts`
- `app/globals.css`
- `app/sitemap.ts`
- 多个产品详情组件
- `components/InquiryForm.tsx`
- `components/SiteHeader.tsx`
- `components/SiteFooter.tsx`
- `components/SiteShell.tsx`
- `components/TurnstileWidget.tsx`
- `lib/site-data.ts`
- `package.json`
- `package-lock.json`
- `worker/index.ts`

主要新增内容包括：

- `app/blog/`
- `app/admin/`
- `app/api/admin/`
- `components/AdminEditor.tsx`
- `components/AdminHeader.tsx`
- `components/BlogBlocks.tsx`
- `components/ShareBar.tsx`
- `components/FloatingInquiryButton.tsx`
- `db/`
- `drizzle/`
- `lib/admin-auth.ts`
- `lib/blog-db.ts`
- `lib/blog-demo.ts`
- `lib/blog-templates.ts`
- `lib/blog-types.ts`
- `lib/cloudflare-context.ts`
- `public/catalogs/`
- `tests/`

开始下一轮工作时先运行：

```powershell
git status
git diff --stat
git diff
```

不要使用 `git reset --hard`、`git checkout --` 或其他清理命令。

## 5. 当前公开页面

当前本地构建包含：

- `/`
- `/about`
- `/products`
- `/products/[slug]`
- `/products/aluminum-fences`
- `/products/aluminum-fences/open-slat-fences`
- `/products/aluminum-fences/privacy-fences`
- `/products/aluminum-fences/semi-privacy-fences`
- `/products/aluminum-gates/swing-gates`
- `/products/aluminum-gates/folding-gates`
- `/products/aluminum-gates/sliding-gates`
- `/oem-odm`
- `/videos`
- `/blog`
- `/blog/[slug]`
- `/search`
- `/contact`（重定向到首页询盘表单）

### Projects 删除状态

已完成以下清理：

- 删除 `app/projects/page.tsx`；
- 删除顶部导航 Projects；
- 删除页脚 Projects；
- 删除搜索索引中的 Projects；
- 删除 sitemap 中的 `/projects`；
- 删除旧 `applicationGallery` 数据数组；
- 当前代码中没有 `/projects` 或 `applicationGallery` 引用。

没有删除产品详情页中的客户安装案例，也没有删除产品图片文件。

## 6. 导航、联系信息与全站询盘入口

顶部导航当前为：

- Home
- Products
- OEM / ODM
- Videos
- Blog
- About

顶部右侧已删除 `START A PROJECT`，替换为：

- Tel：`+86 198 3680 9129`
- WhatsApp：`+86 191 3989 9423`

功能：

- 电话点击使用 `tel:`；
- WhatsApp 点击打开 `https://wa.me/8619139899423`；
- 手机菜单中也显示电话和 WhatsApp；
- 字体已经增大，当前号码约 11px，标签约 9.5px。

全站普通页面右侧中间有固定悬浮询盘按钮：

- 桌面端为右侧方形信封按钮；
- 手机端为右下角圆形按钮；
- 点击跳转至 `/#quote`；
- `/admin` 后台不会显示普通网站页头、页脚或悬浮按钮。

## 7. 博客分享按钮

博客详情页分享区当前为纵向排列，每行一个图标和文字：

- LinkedIn
- WhatsApp
- Facebook
- Email
- Copy link

功能：

- LinkedIn、WhatsApp、Facebook 打开对应分享地址；
- Email 使用 `mailto:`；
- Copy link 使用 Clipboard API，成功后显示 `Link copied`。

品牌与功能图标目前通过 `api.iconify.design` 的远程 SVG 地址加载。用户已认可当前外观，但这会产生第三方图标网络依赖。若正式上线前需要完全自主托管，可把这些 SVG 合规地下载到 `public/icons/` 后改为本地路径。

## 8. 询盘表单和邮件

主要文件：

- 表单：`components/InquiryForm.tsx`
- Turnstile：`components/TurnstileWidget.tsx`
- 后端接口：`app/api/inquiry/route.ts`

已完成：

- 表单输入从单条横线改为更明显的文本框视觉，但保持原有整体尺寸；
- 删除用户确认勾选框及其文字；
- 支持姓名、公司、邮箱、电话/WhatsApp、项目说明和附件；
- 凉亭详情页有额外的安装尺寸、屋顶类型和操作方式字段；
- 附件最大 10 MB；
- 支持 PDF、DWG、DXF、JPG、JPEG、PNG、WebP；
- 同源检查；
- 蜜罐字段；
- 最短填写时间；
- 文本长度限制和 HTML 转义；
- Resend 邮件发送；
- Reply-To 使用客户邮箱；
- 邮件服务失败时返回明确错误。

重要区别：

- 旧正式版本的 Resend 邮件已经真实测试成功；
- 当前本地新代码加入了强制 Turnstile 服务端验证；
- 如果正式环境缺少 `TURNSTILE_SECRET_KEY` 或 token，当前新接口会拒绝提交；
- 因此新代码部署后必须立即做一次正式表单测试。

## 9. Turnstile 状态

代码已完成：

- 使用 Cloudflare Turnstile 可见验证框；
- 正常用户通常自动完成，无算术验证码；
- 前端获得验证结果后才能提交；
- 服务端调用 Cloudflare `siteverify`；
- 服务端校验 success、action 和正式环境 hostname；
- action 固定为 `turnstile-spin-v2`；
- token 过期或提交后会重置。

用户已在 Cloudflare 界面中填写过：

- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
- `TURNSTILE_SECRET_KEY`

但当时 Cloudflare 页面没有独立“保存”按钮，只显示与部署有关的操作。**是否已经在线上生效尚未确认。**

上线前必须提醒用户：

1. 确认两个变量存在于正确的正式项目/环境；
2. Secret 必须是加密密钥；
3. Turnstile 主机名覆盖 `junsualu.com` 和实际使用的 `www.junsualu.com`；
4. 如果 Cloudflare 只能通过“部署”保存，必须等用户正式允许上线后再点击；
5. 部署后测试自动验证、询盘提交和 Resend 收件。

详见 `DEPLOY_CHECKLIST.md`。

## 10. 产品 PDF

三份压缩 PDF 已放入：

```text
public/catalogs/junsu-aluminum-fence-catalog.pdf  约 3.21 MB
public/catalogs/junsu-garden-gate-catalog.pdf     约 6.50 MB
public/catalogs/junsu-pergola-catalog.pdf         约 4.15 MB
```

已完成：

- 围栏详情页：在线预览、下载；
- 平开门详情页：在线预览、下载；
- 凉亭详情页：在线预览、下载；
- 凉亭原说明文字区域已按用户要求替换为按钮。

当前未启用 R2，PDF 直接放在 `public/catalogs/`，因此：

- PDF 会跟随网站构建；
- 每次部署网站都会把这些静态 PDF 包含在部署内容中；
- 没有银行卡/R2 时这是当前可用方案；
- 如果以后 PDF 或视频显著增多，再迁移到其他对象存储或视频平台。

## 11. Blog 公开页面

已经完成：

- `/blog` 博客列表；
- `/blog/[slug]` 博客详情；
- Blog 已加入顶部导航、页脚、搜索索引和 sitemap；
- 支持 SEO title、description、slug、分类、封面图；
- 支持草稿、发布、归档状态；
- 支持灵活文章模块，而不是固定文章模板。

文章模块包括：

- 标题；
- 段落；
- 单图；
- 图文组合；
- 图库；
- 表格；
- 清单；
- 步骤；
- 提示框；
- 引用；
- 视频；
- 下载；
- 产品链接；
- 询盘 CTA；
- FAQ。

本地环境会提供用于页面检查的演示文章。正式文章需要写入 D1。

## 12. Admin 后台

当前本地路由：

- `/admin`
- `/admin/posts/new`
- `/admin/posts/[id]`
- `/admin/preview/[id]`
- `/api/admin/posts`
- `/api/admin/posts/[id]`
- `/admin/videos`
- `/admin/videos/new`
- `/admin/videos/[id]`
- `/api/admin/videos`
- `/api/admin/videos/[id]`

后台当前范围为文章管理和 YouTube 视频库管理，不是全站设置后台。

已实现：

- 文章列表；
- 新建；
- 编辑；
- 保存草稿；
- 受保护预览；
- 发布；
- 撤回/归档；
- 灵活模块编辑器；
- 修改前保存 revision 快照；
- 删除采用归档方式；
- 服务端清理结构化文章数据；
- 不执行文章中的任意 HTML 或脚本；
- 视频列表、新建、编辑、隐藏、发布和归档；
- YouTube 链接/视频 ID 校验；
- 固定视频分类；
- 后台播放器预览；
- 视频不需要手动排序，分类内按发布时间自动倒序。
- 文章和视频后台首页均已精简为搜索框、新建按钮和内容列表；
- 搜索支持标题、分类、状态以及 `Jul 29`、`7/29`、`2026-07-29` 等日期写法。

### 本地为什么没有登录页

这是有意设计：

- 非 production 环境自动使用 `local-admin@junsu.dev`；
- 本地直接进入文章管理，页面显示 `Local preview`；
- 本地模拟密码没有安全价值，因此没有增加假登录；
- 正式环境在进入 `/admin` 前由 Cloudflare Access 邮箱验证码拦截。

### 正式后台仍未完成的外部配置

代码已完成，但正式运行还需要：

1. 创建/确认正式 D1；
2. D1 绑定名称必须为 `DB`；
3. 按顺序执行：
   - `drizzle/0000_wooden_blizzard.sql`
   - `drizzle/0001_chunky_mach_iv.sql`
4. 配置 `admin.junsualu.com`；
5. 在 Cloudflare Zero Trust 创建保护 `admin.junsualu.com/*` 的 Access 应用；
6. 启用邮箱一次性验证码；
7. 配置允许的管理员邮箱；
8. 配置：
   - `ADMIN_HOST`
   - `ADMIN_EMAILS`
   - `CF_ACCESS_TEAM_DOMAIN`
   - `CF_ACCESS_AUD`
9. 防止 workers.dev 和预览域名绕过 Access；
10. 用授权和未授权账号分别测试页面与 API。

详细说明见 `BLOG_ADMIN_SETUP.md`。

## 13. D1、R2 和媒体状态

`.openai/hosting.json` 当前逻辑配置：

```json
{
  "d1": "DB",
  "r2": null
}
```

含义：

- 代码已经声明博客和视频库使用名为 `DB` 的 D1 绑定；
- 不能仅凭此文件认定正式 Cloudflare D1 已创建、迁移或绑定；
- R2 没有启用；
- 后台目前不能直接上传博客图片或视频文件；
- 后台媒体字段使用现有 `/images/...`、现有 PDF 路径或确认过的外部 HTTPS URL。
- 视频库只在 D1 保存 YouTube ID、标题、分类、简介和状态，不保存视频文件。

## 14. 视频状态

`/videos` 已改为从 D1 读取已发布的 YouTube 视频，真实视频仍尚未加入。

固定分类：

- Factory & Production
- Aluminum Fences
- Aluminum Gates
- Aluminum Pergolas
- Installation Guides

功能：

- 后台粘贴 YouTube 普通链接、短链接或视频 ID；
- 自动提取和校验视频 ID；
- 分类内按发布时间自动倒序；
- 公开页面支持分类切换；
- 点击封面后才加载 `youtube-nocookie.com` 隐私增强播放器；
- 提供 `Watch on YouTube` 备用链接；
- 不使用 R2，不把视频文件放入 Git 或网站部署包；
- 不需要 YouTube API Key。

## 15. WhatsApp 尚未统一的地方

顶部联系方式已使用真实号码：

```text
https://wa.me/8619139899423
```

但以下页面仍存在空号码占位 `https://wa.me/`，需要下一个对话统一替换：

- `app/oem-odm/page.tsx`
- `components/PergolaDetail.tsx`
- `app/products/aluminum-fences/FenceDetail.tsx`
- `app/products/aluminum-gates/folding-gates/page.tsx`
- `app/products/aluminum-gates/sliding-gates/page.tsx`
- `app/products/aluminum-gates/swing-gates/page.tsx`

博客分享按钮中的 `https://wa.me/?text=...` 是通用分享功能，不应替换为公司号码。

## 16. 其他已完成的本地视觉修改

- About 页面 “Three teams, one coordinated response.” 已调整为横向排列并减少下方空白；
- 围栏详情页增加 PDF 操作区；
- 凉亭详情页结构已与围栏/大门风格进一步统一；
- 询盘框改为可见文本框样式；
- 删除询盘同意勾选框；
- Blog 导航名称使用正确拼写 `Blog`；
- 删除独立 Projects 展示，仅保留产品详情页客户安装案例；
- 顶部电话/WhatsApp 字体已放大；
- 分享按钮已改为纵排和彩色品牌图标；
- 悬浮询盘按钮已改为简洁信封图标。

## 17. 环境变量名称

代码当前使用或支持：

```env
NEXT_PUBLIC_SITE_URL=

RESEND_API_KEY=
CONTACT_TO_EMAIL=
CONTACT_FROM_EMAIL=

NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=

ADMIN_HOST=
ADMIN_EMAILS=
CF_ACCESS_TEAM_DOMAIN=
CF_ACCESS_AUD=

NEXT_PUBLIC_SWING_GATE_CATALOG_PREVIEW_URL=
NEXT_PUBLIC_SWING_GATE_CATALOG_DOWNLOAD_URL=
```

不要在交接文档、GitHub 或 `.env.example` 中写入真实 Secret。

## 18. 当前验证结果

2026-07-29，在删除旧 Projects 数据后运行：

```powershell
npm test
```

结果：

- ESLint 通过；
- Vinext production build 通过；
- D1 Worker 绑定自动测试通过；
- 博客文章模块渲染测试通过；
- Admin API 服务端认证测试通过；
- 视频后台 API 认证测试通过；
- YouTube 隐私增强延迟加载测试通过；
- 视频 D1 迁移测试通过；
- 5 项测试全部通过；
- 构建结果中不存在 `/projects` 路由。

## 19. 已知技术风险

### Next.js 版本

当前为：

```text
next 16.2.6
eslint-config-next 16.2.6
```

此前本地 `npm audit` 报告过生产依赖安全公告，并建议升级到较新的修复版本。一次升级尝试因网络/安装中断没有完成，之后已用 `npm ci` 恢复依赖，当前构建正常。

上线前建议：

1. 在稳定网络环境运行最新 `npm audit`；
2. 将 Next.js 和 `eslint-config-next` 同步升级到兼容的修复版本；
3. 不要只修改 `package.json`；
4. 更新 lockfile 后重新运行 `npm test`；
5. 不要在尚未验证时推送生产。

### 外部图标

顶部和分享区部分图标通过 `api.iconify.design` 加载。如果目标市场访问该服务不稳定，正式上线前可改成本地 SVG/PNG 资源。

## 20. 上线前必须逐项确认

只有用户明确允许上线后才执行：

1. 查看并确认全部 Git diff；
2. 确认没有真实密钥或本地临时文件；
3. 统一产品页 WhatsApp 占位链接；
4. 完成/确认 Next.js 安全升级；
5. 确认 Turnstile 两个变量已保存到正式环境；
6. 确认 Turnstile hostname；
7. 创建并迁移正式 D1；
8. 配置正式 Cloudflare Access；
9. 检查 workers.dev/预览后台绕过风险；
10. 运行 `npm test`；
11. 用户确认本地视觉效果；
12. 提交并推送 GitHub；
13. 等待 Cloudflare 构建成功；
14. 正式网站测试：
    - 首页和全部导航；
    - PDF 预览与下载；
    - 桌面端和手机端；
    - Turnstile；
    - 询盘提交；
    - Resend 收件；
    - Blog；
    - Admin 授权登录；
    - 未授权后台访问；
    - sitemap、robots、canonical 和 404。

## 21. 下一个对话的建议起点

下一个对话开始后：

1. 先阅读本文件；
2. 再阅读：
   - `BLOG_ADMIN_SETUP.md`
   - `DEPLOY_CHECKLIST.md`
3. 运行 `git status` 和 `git diff --stat`；
4. 不要还原当前本地修改；
5. 如果继续优化，优先处理：
   - 统一产品页 WhatsApp 号码；
   - 上传首个真实 YouTube 视频并通过后台发布；
   - 检查外部图标是否需要本地化；
   - 完成 Next.js 安全升级；
6. 如果用户要求上线，先完成第 20 节全部检查，再执行 GitHub/Cloudflare 操作。

## 22. 交接结论

当前本地网站主体、产品详情、PDF、询盘表单、自动 Turnstile、Blog、文章后台、YouTube 视频后台、D1 数据结构、分享按钮、电话/WhatsApp 和悬浮询盘入口均已实现，并通过本地构建、浏览器检查与自动测试。

仍未完成的核心事项是：

- 首个真实 YouTube 视频上传与后台发布；
- 产品页 WhatsApp 占位链接统一；
- 正式 D1 创建与迁移；
- 正式 Cloudflare Access 登录配置；
- Turnstile 变量是否已在线上保存的确认；
- Next.js 安全升级；
- 用户明确授权后的 GitHub 推送与正式部署。

在用户明确允许之前，继续保持所有工作仅在本地。
