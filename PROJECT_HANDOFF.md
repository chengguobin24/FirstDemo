# JUNSU 独立站开发交接与设计偏好

> 新对话/新任务开始时，请先完整阅读本文件，再检查当前工作区和相关页面源码。不要根据早期模板重新设计已经确认的页面。

## 1. 项目概况

- 品牌暂用：`JUNSU Aluminum Systems`
- 业务方向：面向海外 B2B 客户的铝合金围栏、大门、凉亭及 OEM/ODM 服务。
- 主要客户：进口商、经销商、工程承包商、海外品牌商、建筑与设计公司。
- 主要市场：欧洲优先，其次美洲。
- 网站语言：英文；与用户沟通使用中文。
- 品牌定位：高端设计感与制造能力并重，强调项目定制、图纸确认、生产透明度和出口交付。

## 2. 技术栈与运行方式

- Next.js 16 App Router
- React 19
- TypeScript
- Vinext + Vite
- Cloudflare Workers 兼容构建
- Sites 托管项目，配置文件为 `.openai/hosting.json`
- 当前 Sites `project_id` 已存在；`d1` 与 `r2` 当前均为 `null`
- 样式以全局 CSS 与 CSS Modules 为主，没有引入重量级 UI 组件库

常用命令：

```bash
npm run dev
npm run build
npm run test
npm run lint
```

重要：这个项目使用 `npm` 和 `package-lock.json`，不要运行 `pnpm install` 或 `pnpm run build`。之前误用 pnpm 会移动现有依赖目录，虽然已经恢复，但后续必须继续使用 npm。

最近一次验证：`npm run build` 已成功通过；平开门图 1–4、折叠门图 5–6、滑动门图 7–8 的首屏差异化内容可按 `?image=` 参数切换。围栏、大门与凉亭的末张配置图已改为不可点击的指南卡。

## 3. 用户的工作方式

1. 如果用户说“先讨论”“先告诉我是否明白”“先不要修改代码”，绝对不要直接改代码。
2. 只有用户明确说“按这个方案执行”“进行修改”“开始编写”后才实施。
3. 对不确定的产品参数先提问，不要编造尺寸、跨度、认证、专利、产能或质保。
4. 用户会通过截图逐步调整页面，应准确区分“删除一屏”“删除一栏”“只替换图片区域”等范围。
5. 修改前先检查现有源码和当前未提交改动，禁止重置或覆盖用户已有工作。
6. 用户更关注最终视觉效果，不希望看到技术实现细节堆砌；汇报应简洁、先说结果。
7. 页面设计完成后必须执行构建验证；涉及视觉和交互时应实际预览。

## 4. 用户审美与布局偏好

### 总体审美

- 高级、克制、建筑杂志感、现代 B2B 工业品牌风格。
- 主色为暖白、米色、深黑/墨黑与少量铜棕色强调。
- 喜欢大幅图片与清晰留白，但不喜欢为了“高级”而制造大片无意义黑色区域。
- 排版应紧凑、有节奏，不要把简单内容拉成过长页面。
- 信息要集中体现产品与能力，避免重复的 CTA、重复的大标题和条条框框。
- 正文易读，字号适中；标题可以有对比，但不要每屏都使用夸张的大屏叙事。

### 布局习惯

- 产品详情页首屏偏好：左侧产品图，右侧黑体加粗标题、完整产品介绍和询盘按钮。
- 产品详情页通常控制为少量高质量板块：首屏介绍、样式/颜色、参数与材料图、应用、FAQ。
- 参数区偏好左侧紧凑表格，右侧由不同大小矩形图片组成的拼贴，不超出一屏。
- 应用场景用大图与小图组合，不要大量同尺寸卡片。
- 表单只保留在 HOME 页面；其他页面按钮统一跳转到 `/#quote`。
- 电话和 WhatsApp 已统一为 `+86 135 2556 8065`，咨询链接使用 `https://wa.me/8613525568065`；页头邮箱为 `junsu@junsutech.com`。
- 曾经出现图片被 `cover` 裁切的问题：技术图、目录图、完整产品图应优先使用 `object-fit: contain`；场景照片才适合 `cover`。

### 动效偏好

- 全站图片与文案使用克制的入场动画，参考高端独立站的淡入与轻微位移。
- 动效不能导致刷新后内容消失；即使 JavaScript 或观察器失败，内容也必须可见。
- 横向产品长廊应持续、平滑地向左自动移动，不要一张一张跳动。
- 横向长廊保留鼠标/触摸拖动，去掉左右箭头。
- 尊重 `prefers-reduced-motion`。

## 5. 网站结构与已完成页面

主要导航：

- HOME
- PRODUCTS
- OEM / ODM
- PROJECTS
- VIDEOS
- ABOUT
- START A PROJECT → `/#quote`

### HOME

- 主要实现位于 `components/OriginalHome.tsx` 和 `components/OriginalHome.module.css`。
- HOME 保留完整询盘表单，锚点为 `#quote`。
- 其他页面不应再复制整套底部询盘表单。

### PRODUCTS

- 产品总览：`app/products/page.tsx`
- 产品分类顶部已压缩为简洁的 `PRODUCT CATEGORIES` 方向，避免冗长标题说明。
- 铝合金大门图库跳转规则：
  - 第 1–4 张 → `/products/aluminum-gates/swing-gates`
  - 第 5–6 张 → `/products/aluminum-gates/folding-gates`
  - 第 7–9 张 → `/products/aluminum-gates/sliding-gates`
- 大门图库的真实产品图会通过 `?image=gate-01` 至 `?image=gate-08` 传递用户点击的图片；三类详情页首屏必须显示用户刚刚点击的对应图片。直接访问无参数详情页时显示该门型默认主图，canonical 仍保持不带查询参数的语义化路由。
- 围栏 `fence-options-compact.png`、大门 `gate-09.png` 与凉亭 `pergola-06.png` 是样式/配置指南图，不是单个产品。它们在产品总览中保留原网格位置，但使用不可点击的 `<figure>`，没有普通产品编号、跳转、放大悬停或独立详情页入口。围栏原始正方形文件 `fence-options.png` 继续保留；网站使用 1600×900 的紧凑重排版本，九个图块均直接取自原图，不得用生成式图片替换其结构细节。
- 三个产品分类标题区均明确说明图库只是代表性项目与设计方向，不是固定或完整目录；指南卡分别说明围栏隐私与间距、大门开启与布局、凉亭安装与配置需要按项目确认。
- 指南卡的图片与黑色说明区必须使用两个独立布局区域；图片只在上方视窗内以 `object-fit: contain` 等比缩小，不能让绝对定位图片横跨说明区，否则正方形/竖版的围栏与大门配置图会被说明区遮挡。

### 铝合金凉亭详情页

- 动态入口：`app/products/[slug]/page.tsx`
- 主要组件：
  - `components/PergolaDetail.tsx`
  - `components/PergolaDetail.module.css`
  - `components/PergolaAccessorySelector.tsx`
  - `components/ModelProfilePreview.tsx`
- 详情页按确认顺序重组，删除了大量多余屏幕，但保留核心展示内容。
- 顶部开启方式为两类：旋转百叶与可伸缩/折叠百叶；不能按固定尺寸限制开启方式。
- 配件预览包括：LED 灯带、顶部风扇、顶部加热器、防风屏、风速传感器。
- 默认显示颜色选配图；点击配件名称显示对应配件图；再次点击同一配件或点击空白区域回到颜色图。
- 颜色区域已改为真实按钮，右侧切换灰、白、咖啡、黑色凉亭图，不把文字和色卡烘焙在图片中。
- 型材 147、163、175、180、220 使用小图，点击后在屏幕中央弹窗完整显示；不是悬停放大。
- 弹窗图片必须完整 `contain`，高度和宽度不能超过视口。
- 产品尺寸提示语表达：凉亭为定制产品，展示尺寸只是标准参考，需联系团队确认。
- 详情页询盘按钮跳 HOME 的 `/#quote`，不是详情页内部表单。

### 平开门详情页

- 路由：`/products/aluminum-gates/swing-gates`
- 文件：
  - `app/products/aluminum-gates/swing-gates/page.tsx`
  - `app/products/aluminum-gates/swing-gates/StyleCarousel.tsx`
  - `app/products/aluminum-gates/swing-gates/swing-gates.module.css`
- 页面结构：
  1. 左图右文首屏
  2. SEO 产品说明 + 样式自动长廊 + 色卡
  3. 左侧参数表 + 右侧材料/工厂图片拼贴
  4. Application 图片区
  5. FAQ + Inquiry/WhatsApp
- 平开门只分为单开与双开，不再使用“四开门”作为独立类别。
- 长廊共 7 张样式图，平滑向左循环，支持拖动，无箭头。
- 长廊下方英文关键词：
  - Custom-Made
  - Durable
  - Easy to Install
  - Factory Direct
  - 6063-T5 Aluminum
  - Smart Lock Equipped
  - Smart Entry System
- PDF 目录区域已预留在线预览和下载按钮，环境变量：

```env
NEXT_PUBLIC_SWING_GATE_CATALOG_PREVIEW_URL=
NEXT_PUBLIC_SWING_GATE_CATALOG_DOWNLOAD_URL=
```

- 用户提供的 `Garden gate.pdf` 约 27 MB、161 页，已验证可读，但尚未接入网站。
- 计划使用 Cloudflare R2，且只在用户点击预览/下载时请求，不随网页加载。
- 当前尚未创建 R2；不要把 27 MB PDF 放进 `public`。

### 折叠门详情页

- 路由：`/products/aluminum-gates/folding-gates`
- 文件：
  - `app/products/aluminum-gates/folding-gates/page.tsx`
  - `app/products/aluminum-gates/folding-gates/FoldingStyleCarousel.tsx`
- 已按平开门布局完成首版，`npm run build` 已通过。
- 当前只使用产品总览中的图 5、图 6；图片不足处使用可替换结构，不能虚构新的产品照片。
- 仍建议在下一次继续开发前做浏览器视觉检查。

折叠门真实产品信息：

- 向两侧折叠。
- 无轨悬臂式折叠结构。
- 不支持手动开启，只做自动/电动系统。
- 可配置遥控器、手机控制、车辆感应与智能开启系统。
- 尺寸根据洞口尺寸与现场条件定制，不写固定最大宽高。
- 6063-T5 铝合金，型材壁厚 2.0 mm。
- 五金均采用不锈钢。
- 使用阿尔卡诺（Alcano）电机。
- 电机提供 3 年质保；没有确认整门或涂层质保，不要擅自扩大。
- 表面处理：粉末喷涂或氟碳涂层/氟碳漆。
- 核心优势：节省开启空间、结构稳定、是不平整安装区域的优先选择。
- 所有产品强调耐腐蚀设计，可减少沿海地区用户后期维护成本。
- 主要应用：住宅车道、别墅入口、庭院、空间受限或地面不平整的入口。

### 滑动门详情页

- 路由：`/products/aluminum-gates/sliding-gates`。
- 文件：
  - `app/products/aluminum-gates/sliding-gates/page.tsx`
  - `app/products/aluminum-gates/sliding-gates/SlidingStyleCarousel.tsx`
- 已按平开门与折叠门的视觉模板完成，同时使用独立的 SEO 标题、描述、正文、FAQ、Product JSON-LD 与 sitemap 路由。
- 首屏黑体标题为 `Smart Aluminum Sliding Gates`；平开门与折叠门标题分别调整为 `Durable Aluminum Swing Gates` 和 `Space-Saving Aluminum Folding Gates`，避免三个页面重复使用 Custom 作为核心修饰词。
- 提供地轨式和无轨悬臂式两种滑动结构，均为单侧平移。
- 只提供电动系统，并配备智能开启系统；支持遥控器、手机控制和车辆感应。
- 使用 Alcano 电机，电机质保 3 年。
- 6063-T5 铝合金，型材壁厚 2.0 mm，不锈钢五金。
- 表面处理为粉末喷涂或氟碳涂层/氟碳漆。
- 尺寸根据洞口与现场条件定制，不写固定最大宽高。
- 主要应用：住宅车道、别墅入口和商业场景入口。
- 产品总览第 7–8 张链接到该页面，并会把点击图片作为首屏主图。第 9 张为全品类大门配置指南，不再链接到滑动门详情页，也不再生成滑动门专属首屏、SEO、样式长廊或 Application 内容。

### 大门详情页首屏按图片差异化

- 保留平开门、折叠门、滑动门各自一个主 SEO 路由和 canonical；产品总览点击图片后，`?image=gate-xx` 同时切换首屏图片、右侧 eyebrow、H1、配置摘要、三段正文和特色标签。
- 三个门型页面已使用 `generateMetadata` 按 `?image=gate-xx` 同步切换浏览器标签页/搜索结果的 SEO title 与 meta description。八张真实产品图片均有独立标题和摘要；无图片参数时使用门型主页面的通用 metadata。
- 图片参数页仍分别 canonical 到平开门、折叠门或滑动门主 URL，避免近似参数页面互相竞争收录；本地已核对九组 title 和 canonical 输出。
- 内容原则约为 30% 同门型真实事实、70% 当前图片的设计与应用特色；不为降低重复度虚构尺寸、认证、结构或功能。
- 平开门：
  - 图 1：单扇行人入口、紧凑洞口、竖向条板。
  - 图 2：智能锁/键盘准备、装饰隐私、别墅行人入口。
  - 图 3：车行与步行入口协调、双扇系统、配套行人门。
  - 图 4：现代双扇、半开放竖条、住宅车道。
- 折叠门：
  - 图 5：开放式竖条、节省开启空间、庭院入口。
  - 图 6：百叶隐私、无轨悬臂折叠、现代别墅入口。
- 滑动门：
  - 图 7：一体化步行通道、全隐私竖条、自动车道门。
  - 图 8：装饰性几何细节、别墅车道、智能滑动入口。
  - 图 9：全品类大门开启与配置指南，只在产品总览作为不可点击的指南卡展示，不归入滑动门详情内容。
- 特色标签样式位于 `app/products/aluminum-gates/swing-gates/swing-gates.module.css` 的 `.heroTags`，三种门型共用。

### 围栏详情页

- 已完成统一围栏详情模板，并保持约 50% 公用内容；四个路由分别使用独立首屏、正文重点、应用场景、前两项 FAQ 与 SEO：
  - `/products/aluminum-fences`
  - `/products/aluminum-fences/open-slat-fences`
  - `/products/aluminum-fences/privacy-fences`
  - `/products/aluminum-fences/semi-privacy-fences`
- 主要文件：
  - `app/products/aluminum-fences/FenceDetail.tsx`
  - `app/products/aluminum-fences/fence-content.ts`
  - `app/products/aluminum-fences/FenceStyleCarousel.tsx`
  - `app/products/aluminum-fences/fence-detail.module.css`
- 产品总览图片映射：图 1–2 为半隐私围栏，图 3–4 为普通间隔/开放式防护围栏，图 5 为隐私围栏，图 6 为围栏样式与隐私配置指南。图 1–5 通过 `?image=fence-xx` 保留所点击图片作为详情页首屏主图；图 6 不可点击，也不再作为围栏综合页默认首屏，综合页默认使用图 1。
- 已确认的围栏事实：6063-T5 铝合金；仅粉末喷涂；支持横向或竖向布局；缝隙可按客户要求确认；全隐私围栏可无可见缝隙；百叶围栏属于半隐私；围栏面板插入立柱槽；支持立柱预埋式安装；可与大门统一方向和颜色。
- 主要应用：住宅边界、别墅庭院、景观分隔和商业边界；按用户要求不写泳池周边。
- 围栏型材壁厚和立柱尺寸尚未确认，页面中不得虚构或写占位参数；等待用户提供后再补充参数表。
- 四个页面均已加入独立 metadata、canonical、Product JSON-LD 和 sitemap 路由；桌面端与 390 px 手机端浏览器检查通过，无横向溢出，轮播正常。
- 围栏图 1–5 已按大门详情页逻辑增加图片级首屏内容：点击产品总览图片后，`?image=fence-xx` 同步切换首屏图片、eyebrow、H1、配置摘要、三段正文、三项特色标签、metadata title 与 meta description。图 1–2 分别使用不同的半隐私/百叶围栏内容，图 3–4 分别使用竖向和横向开放式围栏内容，图 5 使用实心横向隐私围栏内容。
- 图片参数仍 canonical 到对应围栏类型主路由；没有参数时保留该类型通用首屏与通用 metadata，错误类型的图片参数不会跨围栏类别套用内容。
- 原“Project-specific spacing”右侧三张 CSS 示意图已替换为两张不规则工厂拼贴，左侧改为自然覆盖 `custom aluminum fence panels`、`adjustable slat spacing`、`louvered fence`、`privacy fence`、`open-slat boundary fence` 与 `OEM fence programs` 等采购型长尾词的类型化文案。
- 工厂拼贴图片：
  - `public/images/products/fences/factory-louver-spacing-samples.png`：由用户图 1 编辑得到，仅移除地面红色数字，用于展示可控百叶间距。
  - `public/images/products/fences/factory-custom-fence-samples.png`：用户图 3 原图，用于展示工厂生产的多种竖向、横向和装饰围栏样品。

### OEM / ODM

- 文件：`app/oem-odm/page.tsx` 与 `app/oem-odm/oem-page.module.css`。
- 页面参考过 OWEADO 的信息组织思路，但不能照搬视觉与文案。
- 首屏使用 16:9 住宅大门/凉亭场景图，确保文字清楚可读。
- 内容保持精炼，不做冗长能力列表。
- 已包含四项优势轮播，图标使用 CSS/图标样式，不单独生成位图图标。
- 合作流程使用 `public/images/oem-odm/junsu-cooperation-process.png`。
- 流程顺序为：上排 1–4 从左到右，下排 5–8 从右到左。
- OEM/ODM 能力事实：
  - 收到完整尺寸和需求后，3 天提供初步设计方案。
  - 根据客户图纸评估是否可生产，并协助结构设计。
  - 新款开发需单独商议。
  - 材料样品本身可免费，但运费由客户承担。
  - 可定制颜色、配件、Logo、说明书、说明视频、木箱包装和安装资料。
  - 生产过程中每推进一步可提供照片。
  - MOQ 与生产周期在数量和方案确认后确定。
  - 用户已要求删除保密协议/NDA 相关卖点。

### ABOUT

- 文件：`app/about/page.tsx` 与 `app/about/about.module.css`。
- 用户不希望 ABOUT 继续使用千篇一律的大屏叙事和卡片栅格，已经改为更连续的故事与制造伙伴表达，并加入 FAQ。
- 公开信息：公司成立于 2000 年，工厂位于河南郑州。
- 用户曾提供 15,000 平方米、300 人、5 条生产线，但后来明确不希望突出尺寸、人数和生产线数字；不要把这些数字作为首屏核心卖点。
- 可用图片方向：工厂外观、车间、设备、设计人员与 CAD、团队合影。
- 可讲的真实服务故事：客户无法卸货，公司业务员寻找国内物流并多次协调方案，最终帮助货物完成到家卸货。
- 没有公开认证和专利，不得虚构。
- 可以写试装与拍照确认。

### PROJECTS / VIDEOS / RESOURCES

- 已有基础页面和内容框架。
- VIDEOS 用于后续上传安装视频。
- RESOURCES 暂为资料申请与 FAQ，不要生成不存在的公开下载文件。

## 6. 大门产品通用事实

- 产品以住宅/庭院入户大门为主。
- 大门总体分类：平开门、折叠门、滑动门。
- 主要材料：6063-T5 铝合金。
- 型材壁厚：2.0 mm。
- 宽度和高度：按客户要求和现场条件定制。
- 表面处理：粉末喷涂和氟碳喷涂/氟碳涂层。
- 可定制颜色。
- 可支持电机和智能控制，具体能力按门型分别确认。
- 出口包装：拆装式/knock-down 包装。
- 可提供 CAD 图纸、安装资料；安装视频未来放在 VIDEOS 页面。
- 用户不希望在详情页展示大量款式，只需要样式长廊和色卡，不做复杂在线配置器。

## 7. SEO 写作规则

- 使用语义化 URL，例如：
  - `/products/aluminum-gates/swing-gates`
  - `/products/aluminum-gates/folding-gates`
  - `/products/aluminum-gates/sliding-gates`
- 使用美式拼写 `aluminum`，因为目标关键词和市场习惯如此。
- 每个详情页必须有独立的：
  - Metadata title
  - Meta description
  - Canonical URL
  - Product JSON-LD
  - Sitemap 路由
- 关键词要自然进入标题、首屏介绍、参数、应用场景、FAQ 和图片 alt，不要机械堆词。
- SEO 同时服务采购决策：材料、结构、表面处理、开启方式、定制能力、应用场景和询盘所需资料都应清楚。
- 沿海耐腐蚀与减少维护成本是重要差异点，可用于大门页面 SEO，但不要写无法证明的寿命年限。
- 不写未经确认的认证、专利、承重、风压、最大跨度、防火等级等数据。

## 8. 询盘系统现状

- HOME 询盘表单组件：`components/InquiryForm.tsx`
- 接口：`app/api/inquiry/route.ts`
- 当前代码已经预留 Resend 邮件通知与 Cloudflare Turnstile 防垃圾验证。
- 需要上线前配置：

```env
NEXT_PUBLIC_SITE_URL=
RESEND_API_KEY=
CONTACT_TO_EMAIL=
CONTACT_FROM_EMAIL=
TURNSTILE_SECRET_KEY=
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
```

- 用户的目标不是建设邮箱系统，而是接收客户提交的询盘。
- 上线前必须确认接收邮箱、发件域名、Turnstile、隐私政策和附件处理策略。
- 不要在用户未明确要求时擅自改动询盘后端。

## 9. PDF / Cloudflare R2 计划

- 大型 PDF 不进入 `public`，避免单文件限制与部署体积问题。
- 使用 Cloudflare R2 存放 PDF。
- PDF 只在客户点击 “Online Preview” 或 “Download PDF” 后加载，不影响正常页面首屏速度。
- 当前 R2 尚未创建，`.openai/hosting.json` 中仍是：

```json
{
  "d1": null,
  "r2": null
}
```

- 最简单方案：用户在 Cloudflare 创建 R2 bucket、上传 PDF、绑定公开文件域名，然后将 URL 配入 Sites 环境变量。
- 没有 R2 URL 或授权时应停止，不要改成把 PDF 打包进网站。

## 10. 图片管理原则

- 已有主要目录：
  - `public/images/product-gallery/`
  - `public/images/products/`
  - `public/images/oem-odm/`
- 图片文件名应语义化、稳定，避免中文、空格和随机临时名。
- AI 修改图片时优先保持真实产品结构，不能为了美观改变关键机械结构。
- 用户要求工厂照片不出现人物时必须移除人物；场景需要保持真实，不要生成明显虚假的工厂能力。
- 新图片先检查尺寸、清晰度与构图，再接入页面。
- 对技术图和目录图，完整展示优先于铺满容器。

## 11. 当前工作区注意事项

- 当前工作区存在大量未提交修改和新增文件，它们都是用户长期迭代的成果。
- 禁止使用 `git reset --hard`、`git checkout --` 或任何方式丢弃现有改动。
- 不要因为文件未被 Git 跟踪就认为可以删除。
- `tmp/` 中可能有 PDF 检查渲染文件，不属于最终网站资产，发布前应单独检查，不要误当产品图片。
- 如果出现 CSS Module 找不到，应先检查真实文件名；此前曾因误删/改名造成页面无法加载。
- 页面入场动画曾造成“刷新 0.5 秒后内容全部消失”，修改动画代码时必须确保无脚本兜底可见。

## 12. 下一步建议顺序

1. 用户提供围栏型材壁厚、立柱尺寸等具体参数后，补充四个围栏详情页的共用参数表；不得提前推测数值。
2. 用户补充更多折叠门或滑动门图片后，替换长廊及 Application 中的重复图或示意图。
3. 用户创建 R2 后，接入平开门 PDF 在线预览与下载；以后再接入另外两个目录。
4. 配置真实 WhatsApp 号码、询盘接收邮箱、Resend 和 Turnstile。
5. 上线前统一检查 metadata、canonical、sitemap、图片 alt、移动端与所有 CTA。
6. 项目仍处于局部修改阶段；用户明确要求在主动提出前不要提交、推送到 GitHub或发布新版本。

## 13. 给下一位开发者的简短指令

先读本文件，再读将要修改的页面和共用组件；先确认用户是在讨论还是已经授权执行。保持暖白、深黑、铜棕的高级克制风格，避免重复大屏、大片无意义黑色和过度卡片化。所有产品事实以用户确认资料为准，缺失数据先问。每次只改用户指出的范围，保留现有未提交工作，并在完成后用 `npm run build` 验证。

## 14. 2026-07-21 最新进度与下一对话起点

### 全站居中版心

- 用户认为原页面内容铺得太满，要求桌面端左右保留明显空隙、内容向中间集中。
- 当前共享规则位于 `app/globals.css`：
  - `--site-content-max: 1680px`
  - `--site-content-gutter: 12vw`
  - 浏览器宽度达到 `1360px` 后，普通页面根容器使用 `width: min(calc(100% - 12vw), 1680px)` 并居中。
  - HOME 首屏通过 `site-home-page` 与 `site-home-hero` 保持全宽，用于以后展示视频。
  - 平板与手机没有强制增加 12vw 留白，避免双栏内容被压窄。
- 原始状态已在 `app/globals.css` 注释中记录：普通页面此前没有 `max-width`，主要依赖 `--pad: clamp(24px, 5vw, 86px)`。
- 如果用户要求恢复，只需撤销这一组共享版心规则，不要重置工作区。

### HOME、OEM/ODM 与配色简化

- 用户认为旧页面白色、暖色、黑色频繁切换且卡片过多。
- 围栏和大门详情页颜色没有统一重做；主要调整范围是 HOME、OEM/ODM 和旧 ABOUT。
- HOME：
  - 首屏图片遮罩保留。
  - 后续内容改为柔和白/浅暖灰背景，黑色文字和少量铜棕色强调。
  - 原深色 ABOUT 区已改成浅色。
  - 产品文字区、询盘表单取消明显白色卡片、阴影和封闭外框。
  - 三项客户类型改为等宽、等高、文字居中；`READ OUR STORY` 黑色按钮放大并居中。
- OEM/ODM：
  - 优势轮播取消卡片阴影、浮起和封闭白底，改用细分隔线。
  - 方案区减少卡片感，背景统一为柔和白与浅暖灰。
  - 三项商业说明改为三列，并放大标签和国际样品运费脚注；手机端改为单列。
- 主要文件：
  - `components/OriginalHome.module.css`
  - `app/oem-odm/oem-page.module.css`

### 围栏与大门详情页首屏控件

- 围栏详情页三项特色标签已改为等宽、等高、居中对齐，黑色 `SEND AN INQUIRY` 按钮放大并居中。
- 平开门、折叠门、滑动门详情页已同步相同规则。
- 手机端特色标签切换为单列。
- 主要文件：
  - `app/products/aluminum-fences/FenceDetail.tsx`
  - `app/products/aluminum-fences/fence-detail.module.css`
  - `app/products/aluminum-gates/swing-gates/swing-gates.module.css`

### ABOUT 页面已完全重写为 4 屏框架

- 用户明确要求淘汰旧 ABOUT，突出工厂实力与服务实力，整页不超过 5 屏，避免卡片化。
- 当前页面已替换为 4 个连续板块：
  1. 公司基本信息、主要产品、服务人群 + 工厂首屏图。
  2. 工厂实力短文 + 6 张工厂图片占位。
  3. 技术、销售、生产三支团队的连续三栏图片区，每张图上覆盖团队支持文案。
  4. 联系文案 + 现有询盘表单。
- 当前文件：
  - `app/about/page.tsx`
  - `public/about.css`
- 已删除旧 ABOUT 的制造地图、故事长屏、FAQ 与旧图文结构；不要恢复旧设计，除非用户明确要求。
- ABOUT 当前公开事实与措辞：
  - 成立于 2000 年。
  - 位于中国郑州。
  - 产品为铝制围栏、大门和凉亭系统。
  - 服务进口商、经销商、承包商、海外品牌和建筑项目团队。
  - 不公开工厂面积、员工人数、生产线数量或具体客户信息。
- 三支团队职责已经用户确认：
  - 技术团队：图纸、尺寸、接口和可生产方向支持。
  - 销售团队：需求整理、沟通、进度更新和交付协调。
  - 生产团队：加工、组装、检查和出口包装。

### ABOUT 首屏工厂图片

- 用户提供原始低分辨率工厂外观图，并允许调整尺寸、清晰度和真实质感。
- 已用内置图片编辑功能生成 16:9 横向版本，保留厂房顶部公司 Logo；用户特别强调 Logo 不能删除。
- 网站当前使用：
  - `public/images/about/junsu-factory-exterior-hero-v2.png`
- 第一次生成的不带 Logo 版本没有接入网站，不得使用。
- 后续如果再次编辑，必须保留 Logo 的位置、形状、颜色与可见性，并避免添加人物、车辆、设备、文字或虚构厂区设施。

### 下一对话首先需要的素材

- 用户稍后会按顺序提供：
  1. 工厂图片 01–06。
  2. 技术团队图片。
  3. 销售团队图片。
  4. 生产团队图片。
- 收到图片后：
  - 按上述顺序替换 ABOUT 占位区域。
  - 先检查图片尺寸、方向和清晰度。
  - 为每张图编写准确、自然的英文 SEO `alt`，不要虚构设备、工序或人物身份。
  - 团队图片需要保留图片上的团队支持文字叠层。
  - 工厂图区只展示图片；标题和总述文案位于图片上方，不给每张图增加卡片式文案。

### 当前验证和用户工作习惯

- 本轮最后一次 `npm.cmd run build` 已成功通过，`/about` 路由存在。
- 用户明确要求后续页面修改完成后无需由 Codex 打开预览；用户会自行查看并反馈效果。除非用户重新要求，不要主动进行浏览器视觉预览。
- 不要提交、推送 GitHub 或发布网站；必须等用户主动提出。
- 当前仍有大量未提交工作，禁止覆盖、重置或清理现有修改。
