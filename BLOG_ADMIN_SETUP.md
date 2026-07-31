# JUNSU 博客后台：本地状态与上线配置

> 本文件不保存任何真实密钥、管理员令牌或 Cloudflare Access JWT。

## 当前本地实现

- 公开博客：
  - `/blog`
  - `/blog/[slug]`
- 管理后台：
  - `/admin`
  - `/admin/posts/new`
  - `/admin/posts/[id]`
  - `/admin/preview/[id]`
  - `/admin/videos`
  - `/admin/videos/new`
  - `/admin/videos/[id]`
- 后台接口：
  - `/api/admin/posts`
  - `/api/admin/posts/[id]`
  - `/api/admin/videos`
  - `/api/admin/videos/[id]`
- D1 逻辑绑定：`DB`
- 数据结构：
  - `posts`
  - `post_revisions`
  - `videos`
- 首次迁移：`drizzle/0000_wooden_blizzard.sql`
- 视频迁移：`drizzle/0001_chunky_mach_iv.sql`

本地开发环境会自动启用清晰标识的开发访问模式，并插入一篇只用于页面检查的示例文章。示例文章不会自动写入正式数据库。

## 正式上线前必须完成

1. 为正式网站创建并绑定 Cloudflare D1 数据库，绑定名称必须是 `DB`。
2. 对正式 D1 按顺序执行：
   - `drizzle/0000_wooden_blizzard.sql`
   - `drizzle/0001_chunky_mach_iv.sql`
3. 将 `admin.junsualu.com` 绑定到现有网站 Worker。
4. 在 Cloudflare Zero Trust 中创建保护 `admin.junsualu.com/*` 的 Access 应用。
5. 启用邮箱一次性验证码，只允许用户确认的管理员邮箱。
6. 在正式 Worker 中配置：
   - `ADMIN_HOST=admin.junsualu.com`
   - `ADMIN_EMAILS=`：允许登录的邮箱，多个邮箱用英文逗号分隔
   - `CF_ACCESS_TEAM_DOMAIN=`：完整的 `https://<team>.cloudflareaccess.com`
   - `CF_ACCESS_AUD=`：该 Access 应用的 AUD 标签
7. 确认 `workers.dev` 和所有预览入口不能绕过 Access 进入后台；不需要公开时应关闭，或单独启用 Access。
8. 使用允许的邮箱登录后台，测试新建草稿、预览、发布、撤回和归档。
9. 使用未授权邮箱和未携带 Access JWT 的请求测试后台及写接口，必须得到拒绝结果。

## 安全设计

- 正式环境不接受本地开发访问模式。
- 正式后台同时检查：
  - 后台主机名；
  - `Cf-Access-Jwt-Assertion`；
  - Cloudflare Access JWT 签名；
  - issuer；
  - AUD；
  - 过期时间；
  - 管理员邮箱白名单。
- 后台写接口不信任浏览器传入的身份。
- 文章只保存经过长度限制和类型白名单清理的结构化模块。
- 不执行文章正文中的 HTML 或脚本。
- 删除采用归档方式；修改前自动保存 `post_revisions` 历史快照。
- 图片和视频字节不存入 D1。

## 当前媒体限制

Cloudflare R2 尚未启用，因此第一版后台使用：

- 网站已有的 `/images/...` 路径；
- 已确认的外部 HTTPS 图片或视频网址；
- 网站已有 PDF 路径。

视频库不上传或保存视频文件。后台只保存 YouTube 视频 ID、标题、分类、简介和发布状态，公开 `/videos` 页面按发布时间自动倒序显示。

固定视频分类：

- Factory & Production
- Aluminum Fences
- Aluminum Gates
- Aluminum Pergolas
- Installation Guides

发布视频流程：

1. 先在 YouTube 上传并确认视频允许嵌入；
2. 在 `/admin/videos` 新建视频；
3. 粘贴 YouTube 链接；
4. 选择分类并填写标题、简介；
5. 保存为隐藏状态或直接发布。

以后启用 R2 或其他对象存储后，再增加后台直接上传、媒体库和自动压缩。

## 用户发布文章的流程

1. 登录 `admin.junsualu.com`。
2. 新建文章并选择一个可选起始模板。
3. 自由添加、删除、复制或移动内容模块。
4. 保存草稿。
5. 打开受保护预览。
6. 点击发布。
7. 正式博客立即读取 D1 中的已发布内容，不需要为每篇文章重新上传 GitHub。
