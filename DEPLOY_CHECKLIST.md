# JUNSU 上线前检查清单

> 本文件只记录配置项目，不记录任何真实密钥。

## 必须在上传 GitHub / 正式部署前提醒并确认

- Cloudflare 网站项目的“变量和机密”中已配置：
  - `NEXT_PUBLIC_TURNSTILE_SITE_KEY`：普通文本变量
  - `TURNSTILE_SECRET_KEY`：加密密钥
- Cloudflare 页面如果只提供“部署”按钮，该按钮会同时保存配置并使其在线上生效；在用户明确要求上线前不要点击。
- Turnstile 主机名覆盖实际使用的正式域名（包括 `junsualu.com`，如网站使用 `www`，还需确认 `www.junsualu.com`）。
- 部署完成后，在正式网站实际提交一次询盘，确认：
  - Turnstile 自动验证成功；
  - 询盘提交成功；
  - Resend 邮件能够正常收到；
  - 错误或缺失的 Turnstile token 会被服务器拒绝。

## 博客后台上线前确认

- 按 `BLOG_ADMIN_SETUP.md` 创建并绑定正式 D1，绑定名称为 `DB`。
- 对正式 D1 按顺序执行已检查的迁移文件：
  - `drizzle/0000_wooden_blizzard.sql`
  - `drizzle/0001_chunky_mach_iv.sql`
- 配置 `admin.junsualu.com` 和 Cloudflare Access 邮箱验证码登录。
- 配置 `ADMIN_HOST`、`ADMIN_EMAILS`、`CF_ACCESS_TEAM_DOMAIN`、`CF_ACCESS_AUD`。
- 确认正式后台没有启用本地开发访问模式。
- 确认 Worker 默认地址和预览地址不能绕过 Access。
- 用授权与未授权身份分别测试后台页面和全部写接口。
- 测试 `/admin/videos` 新建、隐藏、发布、分类和归档。
- 确认公开 `/videos` 只显示已发布记录，并能正常加载 YouTube 隐私增强播放器。

## 发布限制

- 用户明确要求：在其主动说明“重新上传 GitHub / 上线”之前，只进行本地修改。
- 未得到明确上线指令时，不提交、不推送 GitHub、不触发 Cloudflare 正式部署。
