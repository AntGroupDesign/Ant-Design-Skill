# 图表组件 (Chart)

本文件规定图表在 Ant Design 中后台页面中的使用边界、页面区块组合方式与指标卡规范入口。基础图表能力以 Ant Design Charts 官方文档为准：https://charts.ant.design/。

> 本 Skill 不内置具体图表定义、图表 API、图表样式代码或完整图表配置。生成图表时，应引用 Ant Design Charts 官方文档与项目实际数据结构完成实现。

## 目录

| 场景 | 说明 |
| :-- | :-- |
| [图表与指标卡共性规则](#图表与指标卡共性规则) | 图表与指标卡选型、设计原则、容器、标题、视觉规格、状态、数据表达与页面区块组合规则 |
| [1. 基础图表 (Basic Charts)](#1-基础图表-basic-charts) | 折线图、柱状图、饼状图等常见图表，引用 Ant Design Charts 官方文档；纯图表区块（OnlyCharts）形态纳入下方 |
| [2. 基础指标卡 (Basic Statistic Card)](#2-基础指标卡-basic-statistic-card) | 单个核心指标，可附带趋势图或辅助信息 |
| [3. 同级指标卡 (Peer Statistic Cards)](#3-同级指标卡-peer-statistic-cards) | 多个同级核心指标横向并排，强调快速识别 |
| [4. 总分指标卡 (Total and Breakdown Statistic Card)](#4-总分指标卡-total-and-breakdown-statistic-card) | 总量与分项占比关系展示 |
| [5. 嵌套指标卡 (Nested Statistic Cards)](#5-嵌套指标卡-nested-statistic-cards) | 多个指标同时展示数值与趋势图 |
| [6. 页签联动指标卡 (Tabbed Statistic Cards)](#6-页签联动指标卡-tabbed-statistic-cards) | 多维指标通过页签切换查看 |

---

## 图表与指标卡共性规则

图表是页面内容区中的业务展示模块，不单独定义页面框架。生成含图表页面时，必须优先遵循 [`layout.md`](layout.md) 的主内容区规范、页面区块间距和 Card / 容器内部留白规则。

> **页面说明提示条**：默认不生成；仅当用户明确要求，或统计口径 / 数据延迟 / 生效规则会影响业务判断且无法用标题后缀表达时，才引用 [`layout.md` §页面说明提示条](layout.md#页面说明提示条)。

### 设计原则

- 图表服务业务判断，不作为装饰性视觉元素使用
- 页面表达顺序应先给结论，再展开趋势、结构、分布和明细
- 指标卡用于快速呈现核心结论，图表用于解释趋势和关系，表格用于承接明细追踪和操作
- 同一页面内的图表应保持统一统计口径、时间范围和视觉密度，避免用户比较时产生误读
- 当数据关系无法被图表清晰表达时，优先使用表格、列表或描述说明，不强行图表化

### 图表与指标卡选型

根据数据表达目标选择最合适的图表模块或指标卡场景：

| 判断条件 | 推荐方案 | 规范 / 模板 |
| :-- | :-- | :-- |
| 展示趋势、分类对比、占比结构、分布关系等图形化数据，或只展示图表本体不展示核心指标数值 | 基础图表 (Basic Charts) | 见"基础图表"，具体能力引用 Ant Design Charts 官方文档；页面区块模板见 `scripts/charts/00-OnlyChartsBlock.tsx` |
| 展示单个核心指标，并可附带趋势图或辅助信息 | 基础指标卡 (Basic Statistic Card) | `scripts/charts/01-BasicStatisticCard.tsx` |
| 展示多个同级核心指标，强调快速识别 | 同级指标卡 (Peer Statistic Cards) | `scripts/charts/02-IconStatisticCard.tsx` |
| 展示总量与分项占比关系 | 总分指标卡 (Total and Breakdown Statistic Card) | `scripts/charts/03-TotalStatisticCard.tsx` |
| 多个指标都需要同时展示数值和趋势图 | 嵌套指标卡 (Nested Statistic Cards) | `scripts/charts/04-NestedStatisticCard.tsx` |
| 多维指标需要通过页签切换查看 | 页签联动指标卡 (Tabbed Statistic Cards) | `scripts/charts/05-TabsStatisticCard.tsx` |

### 指标卡形态对比（含 mini chart）

基础指标卡与嵌套指标卡都使用 `StatisticCard` 的 `statistic + chart`，且 `chart` 区域均可放置 mini chart；**选型关键不在「有没有趋势图」，而在「指标数量与信息密度」**。

| 维度 | 基础指标卡 (01) | 嵌套指标卡 (04) | 同级指标卡 (02) |
| :-- | :-- | :-- | :-- |
| 卡片数量 | **1 张** | **多张** Grid / Flex 并排 | **多张** Grid / Flex 并排 |
| 典型场景 | 单个重点 KPI（部门销售额、本月 GMV） | 多指标监控（CPU / 内存 / 磁盘 / 网络） | 多指标快速扫读（访客、支付、完成率） |
| 辅助说明 | 可较丰富（完成度、目标、口径说明） | 结构更轻，主要靠标题 + 数值 + 趋势 | 可有 `description`，但以数值识别为主 |
| 标题交互 | 支持跳转箭头、右侧操作图标 | 通常只有简单标题 | 带 `statistic.icon` 增强识别 |
| mini chart | 可有，辅助**单个**指标判断 | **每张必有**，且每张绑定独立 `semanticColor` | **不含** chart 区域 |
| 卡片宽度 | 单卡建议 `maxWidth: 480`，1 张时不拉满整行 | 1–2 张靠左，3–4 张等分，5 张及以上最多 4 列换行 | 布局规则与嵌套指标卡一致 |
| 外层容器 | 单卡直接落在页面内容区 | 多张独立卡直接落在页面画布，**禁止** `StatisticCard.Group`、外层大 Card 或 `Divider` 合并 | 同上 |

**快速判断**：

- **1 个指标 + 需要较完整上下文（辅助说明、操作位、跳转）** → 基础指标卡
- **多个同级指标 + 每个都要同时看数值和轻量趋势** → 嵌套指标卡
- **多个同级指标 + 只需快速识别数值、不需要趋势** → 同级指标卡
- **多个指标需要完整坐标轴、图例、长时间分析** → 基础图表 / 图表 Grid，不得继续用嵌套指标卡

> 「嵌套」指多张独立 `StatisticCard` 以 Grid 排列后，单卡内部形成「数值在上、mini chart 在下」的上下结构；**不是**把多个指标合并进一张大卡。

### 同级指标组图表选型

当页面需要同时展示多个同级指标时，应先判断这些指标之间的关系，再选择结构。这里的同级指标指：业务层级相同、时间范围一致、用于并列比较或共同说明一个主题的一组指标，例如资源使用率、转化指标、风险状态、工单状态、渠道数据、成本指标等。

| 表达目标 | 推荐结构 | 说明 |
| :-- | :-- | :-- |
| 快速查看多个指标当前值与轻量趋势 | 指标卡 Grid + 小型趋势图 | 每个指标一张卡，小趋势图高度 56–96px |
| 对比多个指标在同一时间轴上的变化 | 单个主图表 + 多 series | 多个指标共享一套坐标轴或时间轴 |
| 多个指标各自需要独立坐标轴、单位、阈值或告警线 | 图表 Grid | 每个指标一个独立 Card，默认 2 列或 3 列 |
| 只需要看明细、状态和操作 | 表格 / 列表 | 不强行图表化 |

多指标监控、运营概览、风险概览、工单概览、渠道概览等页面，默认优先使用「指标卡 Grid + 小型趋势图」或「单个主图表 + 多 series」。只有当每个指标都需要独立坐标轴、独立阈值或独立分析语境时，才拆成多个图表区块。

### 容器规则

- 图表默认放在页面内容区的独立区块中，常用承载容器为 `className="ds-page-card"` 的 Card 或与页面设计系统一致的内容容器；页面级图表 / 指标白卡默认 `border: 0` + `box-shadow: var(--shadow)`，禁止保留 AntD / ProCard 默认描边
- 图表区块与同级模块之间使用 `layout.md` 中的页面区块间距规则
- 图表容器内部留白遵循 [`layout.md` §页面内容水平对齐](layout.md#页面内容水平对齐)：**左右** `var(--nav-space-6)`（24px），**上下** `var(--padding)`（16px）；推荐 `paddingBlock: var(--padding); paddingInline: var(--nav-space-6)` 或 `className="ds-page-card"`
- 多个图表同屏展示时，使用 Grid / Flex 组织，不为每个图表额外制造独立页面背景
- 不在图表 Card 内再嵌套独立 Card；筛选区、指标区、图表区和明细区应保持清晰区块边界
- 不使用装饰性渐变、光晕、复杂背景纹理弱化数据可读性

### 标题与操作区

- 每个图表区块应有清晰标题，必要时可补充简短说明或统计口径
- 图表右上角可放置时间范围、维度切换、刷新、导出等操作；操作项应与页面内其他工具栏控件保持一致
- 当页面已有统一筛选区时，图表内部不重复放置同类筛选控件，避免筛选来源不清
- 页面已有统一筛选区时，**禁止**在图表区块外再写游离说明（如「图表与上方筛选日期范围一致」）；统计口径应放在筛选区内部、图表标题下或表格标题区，且须落在对应 Card / 容器内
- 图表说明、空态、加载态、错误态应与 Ant Design 组件语义保持一致

### 图表视觉规格

- 单个主图表默认高度可参考 280–360px；若图表需要承载复杂坐标轴、图例或多序列数据，可适当增高
- 指标卡内小型趋势图高度可参考 56–96px，仅用于表达趋势轮廓，不承担精确读数
- 2–4 个同级指标默认使用指标卡 Grid，每张卡宽度可参考 `minmax(220px, 1fr)`；需要展示 2–6 个独立趋势图时使用图表 Grid，默认 2 列，单图高度可参考 220–280px
- 上述高度为中后台页面的默认经验区间，不作为强制值；最终高度应根据容器宽度、数据密度、图例数量和首屏信息优先级调整
- 多图表网格中，同一行图表高度必须保持一致，避免页面节奏混乱
- 多图表 Grid 子项必须设置 `min-width: 0`；图表媒体容器设置 `overflow: hidden` 时只用于约束 SVG / Canvas 本体，推荐 `aspect-ratio` 或 `max-width: 100%` 避免横向撑破 Card；tooltip 等浮层不得被该容器裁切
- 图表标题区与图表主体之间使用 `var(--margin)` 形成稳定间距；容器内部留白水平 **24px**、垂直见 `layout.md` §页面内容水平对齐
- 图例优先放在图表顶部或右侧，不得遮挡数据主体；图例过多时优先减少系列数量或改用分组展示
- 坐标轴、网格线和辅助线应弱化处理，避免与数据线、柱体或重点标记争夺视觉焦点

### 图表 Tooltip 浮层规则

图表 tooltip 属于数据读取时的临时浮层，不是图表 Card 内容本身。生成 Ant Design Charts / AntV 图表时，必须按当前项目安装的 `@ant-design/charts@^2.0.0` 对应官方文档配置 tooltip，避免被导航或容器层级遮挡。

- tooltip 优先挂载到 `document.body` 或全局 overlay 容器；若当前 Charts 版本提供 `container` / `appendTo` / `portal` 等等效 API，应使用该 API 脱离图表 Card
- tooltip 层级必须高于顶部导航 / 侧边栏基础层（`--nav-z-index-base: 1000`），建议使用 `--chart-tooltip-z-index`
- 导航下拉、收起后子菜单等导航最高浮层仍应高于图表 tooltip；禁止通过降低导航 z-index 修复 tooltip 遮挡
- 图表 Card、图表媒体容器、Canvas / SVG 包裹层不得用 `overflow: hidden` 裁切 tooltip；需要防止图表本体溢出时，只约束图表媒体本体，tooltip 走 body / overlay
- 不在 Skill 中写死某个不确定的 Charts tooltip API 字段名；具体字段名以 `@ant-design/charts@^2.0.0` 对应官方文档和项目实际版本为准

### 颜色、图例与标签规范

- 分类色优先使用 Ant Design Charts / AntV 默认调色板，禁止随意使用高饱和、低对比或装饰性颜色
- 同一业务维度在同一页面内必须保持颜色一致，例如同一渠道、状态或产品线跨图表不可换色
- 状态色必须遵循 `references/global-style.css` 的功能色语义：成功使用 `--color-success`，错误使用 `--color-error`，警告使用 `--color-warning`，处理中 / 信息使用 `--color-info`
- 饼图 / 环图分类建议控制在 5–7 项以内；分类过多时优先改为条形图、排行榜或表格
- 标签过密时优先隐藏直接标签，使用 tooltip、legend 或交互详情承接，避免文字重叠
- 重要数值可使用数据标签或标注强调，但同一图表内重点标注不宜超过 1–2 处
- 图例文案应使用业务可读名称，不直接暴露字段名、枚举值或接口 key

### 数据表达

- 图表类型由数据关系决定，不按视觉偏好随意选择
- 趋势变化优先使用折线图 / 面积图
- 分类对比优先使用柱状图 / 条形图
- 占比结构可使用饼图 / 环图，但分类过多时应改用条形图或表格
- 明细数据、可操作数据仍优先使用表格或列表，不强行图表化

### 图表实现分层

生成图表时须按展示场景选择实现方式，**禁止**使用静态 `<img>` 占位图、灰色示意 div 或纯文字占位代替真实图表。

| 场景 | 实现方式 | Skill 模板 |
| :-- | :-- | :-- |
| 完整图表区块（OnlyCharts、页签关联区主图、图表 Grid 单图） | `@ant-design/charts`（Area / Line / Column 等）；面积填充使用 G2 `l(角度)` 或 `rgba()` 渐变，**禁止** CSS `color-mix()` / `linear-gradient()` | `scripts/charts/00-OnlyChartsBlock.tsx`、`scripts/charts/05-TabsStatisticCard.tsx` |
| 指标卡内嵌 mini chart（56–96px，推荐 72px） | 轻量 **SVG sparkline**（参考 `MiniAreaSparkline`）；同色面积填充 `stopOpacity` 默认 `0.08 → 0.22` | `scripts/charts/01-BasicStatisticCard.tsx`、`scripts/charts/04-NestedStatisticCard.tsx` |
| 需要坐标轴、图例、完整 tooltip、多序列分析 | 升级为卡片外部独立图表区块，使用 `@ant-design/charts` | 见 §基础图表、§纯图表区块 |

- 完整图表与 mini chart 的配色均遵循 §指标卡内嵌迷你图表配色（通用）与 §填充渐变；mini chart 用 SVG `linearGradient`，完整 Area 用 G2 `l(270)` 等语法
- Skill 模板提供可运行参考实现；业务项目可按数据结构替换 series / `data`，但不得回退为占位图

### 加载、空态与错误态

- Loading 状态必须保留图表容器高度，避免数据请求期间页面布局跳动
- 空数据使用 Ant Design `Empty` 或轻量空态文案，说明当前筛选条件下暂无数据
- 错误态应展示错误提示和重试入口，不让用户误以为数据为 0
- 数据不足以支持某类图表时，不强行渲染误导性图表，应提示数据不足或换用表格 / 描述说明
- 局部图表失败不应阻塞整页其他模块展示；可在对应图表容器内展示局部错误态

### 页面区块组合

图表页面通常由页面标题区、筛选区、指标区、图表区和明细区组合而成。组合顺序应服务于用户阅读路径，而不是为了堆叠组件。

常见组合：

| 页面结构 | 适用场景 |
| :-- | :-- |
| 页面标题 + 筛选区 + 指标卡 + 主图表 + 明细表格 | 经营分析、数据看板、运营概览 |
| 页面标题 + 指标卡 + 多图表网格 | 指标监控、趋势对比、概览型页面 |
| 页面标题 + 筛选区 + 图表 + 列表 / 表格 | 查询分析、报表详情、可钻取页面 |
| 页面标题 + 单图表 + 说明区 | 单主题分析、趋势说明、轻量报表 |

布局规则：

- 页面标题区与首个业务区块之间遵循 `layout.md` 的 16px 间距规则
- 筛选区通常位于图表与指标卡之前，作为页面级条件入口；筛选区使用 `<Card bordered={false} className="ds-search-panel">`，与查询列表搜索卡共用同一套间距规则。AntD Card 场景下 padding 由 `.ant-card.ds-search-panel > .ant-card-body` 承担，禁止在 Card 外层和 body 上重复写 padding（见 [`components_List.md` §搜索卡 Tab 贴底间距](components_List.md#搜索卡-tab-贴底间距搜索卡--列表卡)）
- 指标卡一般位于图表之前，用于快速提供核心结论
- 主图表应占据页面主要视觉区域；辅助图表可放在下方或右侧网格中
- 图表下方如需展示明细，优先使用表格，并与图表保持清晰区块边界
- 明细表格须遵循 [`components_Table.md`](components_Table.md) 方案 B：外层 `className="ds-page-card ds-table-card-padded"`（或 `ds-table-card`），**禁止**只加 `ds-list-card` / `ds-table-card-padded` 却不承担外壳水平 24px，导致 Table 首列贴边
- 多图表网格中，同一行图表高度应统一，避免页面节奏混乱
- 看板各业务区块（筛选 / 指标 / 图表 / 明细表）同级间距由 `PageShell`（`.ds-page-shell`）的 `gap: var(--nav-space-4)` **唯一承担**；禁止在各区块外包 `div` 再叠 `marginBottom` / `marginTop` 造成 16+16 叠加

**看板推荐结构**（运营 / 经营分析页）：

```
PageShell
├─ PageHeader（可选 titleSuffix 说明刷新策略）
├─ Card（className="ds-search-panel"，筛选区 + 统计口径说明）
├─ 同级指标卡 Grid（无外层 Card，直接落画布）
├─ 图表 Grid（每项 Card + 标题 + 图表媒体区）
└─ Card.ds-page-card.ds-table-card-padded（明细表格）
```

禁止项：

- 禁止把筛选区、指标区、图表区、明细表格全部塞进一个无层次的大 Card
- 禁止在同一页面重复设置多个互相冲突的时间筛选
- 禁止把多个同级指标默认生成为多个全宽主图表，并纵向堆叠在同一个大 Card 中；单个全宽主图表应服务于一个主分析对象
- 禁止在一个图表 Card 内连续渲染多个无独立标题区、无独立容器边界的趋势图；多个图表必须使用 Grid，或合并为一个多 series 主图
- 禁止在图表网格下方、明细表上方写不属于任何区块的口径说明文案
- 禁止用饼图承载过多分类，导致标签拥挤或颜色不可辨
- 禁止为了视觉丰富而加入与业务判断无关的图表
- 禁止用 `StatisticCard` 包裹整页主图表；全宽趋势 / 对比图使用 `Card` + 标题 + 图表区（OnlyCharts 形态）

### 指标卡共性规则

指标卡是数据看板、分析页和概览页中的核心信息模块，用于呈现 1 或 N 个指标值（大部分为度量值）及其变化趋势（如同比、环比、目标完成情况等）。聚焦于关键指标的突出显示，通过数值、百分比等简洁形式呈现核心数据结果。

指标卡模板基于公开包 `@ant-design/pro-components` 的 `StatisticCard` / `ProCard` 能力实现。

- 在页面内的重要位置展示关键指标，不用于承载长文本、复杂说明或可操作明细
- **展示**：指标卡帮助用户直观、快速地定位至关心的指标，还可包含趋势图表辅助解读当前关键指标
- **下钻**：点击下钻 icon 或卡片区域，可下钻至数据详情页面，查看更细粒度的趋势变化及数据明细
- 指标卡属于页面内容区模块，必须遵循 `layout.md` 的页面区块间距和容器留白规则
- 指标卡通常位于筛选区之后、主图表之前，用于承载关键结论
- 指标卡信息层级应清晰区分：指标名称、核心数值、变化趋势、辅助说明、操作入口
- 指标卡不可替代表格明细；需要解释或追踪的数据应通过图表或表格承接
- 总模块数量控制在 5–9 个以避免信息过载
- 常以平铺或网格布局置于页面顶部，作为数据入口或总结性指标
- 若有内容撑开卡片的情况请设置内容宽度为 100% 或设置定宽
- 同一行指标卡必须等高：外层 Grid / Flex 使用 `alignItems: 'stretch'`，每张卡使用 `height: '100%'`；**纯数值同级卡禁止**用 `minHeight` 硬撑留白（会导致内容贴上、底部空一大块）；等高由 stretch 自然达成，卡片内部上下留白由 `ds-statistic-card` 垂直居中 + 对称 `padding` 承担
- 指标卡内容区 padding 统一为上下 `var(--padding)`（16px）、左右 `var(--nav-space-6)`（24px）；使用 AntD `Card` / ProCard / `StatisticCard` 时必须命中 `.ant-card-body` / `.ant-pro-card-body`，禁止 `bodyStyle={{ padding: 24 }}`、`styles.body.padding: 24` 或依赖组件默认 body padding
- 同一组指标卡必须使用相同信息槽位：标题、数值、辅助说明 / 口径说明、趋势区域要么全部出现，要么全部预留同等高度；禁止只有某一张卡多一行说明导致卡片高度不一致
- KPI 指标卡不等同于图表区块：单张 / 少量 KPI 卡禁止横向拉满整行；1–2 张时靠左排列，单卡建议 `minmax(260px, 320px)`，最大宽度不超过 360px
- 只有承载完整趋势分析、坐标轴、图例或多序列数据的模块才允许使用全宽图表区块；不得把单张 KPI 指标卡拉伸成全宽趋势图

### 指标卡内嵌迷你图表

指标卡内嵌迷你图表（mini chart / sparkline / tiny chart）是核心数值的辅助视觉，不作为完整分析图表使用；适用于迷你折线图、面积图、柱状图、条形图、小型环图、进度环等卡内小图。

- 内嵌迷你图表默认不展示坐标轴、图例、刻度文字和复杂 tooltip；若需要坐标轴、图例、多序列对比、筛选联动或完整 tooltip，应升级为卡片外部的独立图表区块
- 外层容器使用 `className="ds-statistic-mini-chart"` 或 `StatisticCard.chart` 默认容器；不得额外设置水平 `padding`，须与指标名称、核心数值共享同一左对齐线；卡片左右留白只由 `ds-statistic-card` 的 24px 内容区 padding 提供
- 迷你图表内部 plot padding 应尽量贴合画布：左 / 右 / 下默认为 0；为避免线条、柱体、面积或环图被裁切，最多保留 2–4px 安全留白
- 卡片底部留白只由 `ds-statistic-card` 的 body padding 提供；图表本体不得再叠加 16px / 24px bottom padding
- 指标卡模板中的 mini chart（`01`、`04`）默认使用 **SVG sparkline** 实现，不引入 `@ant-design/charts` 完整配置；若业务确需 Charts Tiny 系列，须关闭坐标轴 / 图例，并将 `padding` / `appendPadding` 控制在 `0` 或 `[2, 2, 2, 2]` 这类安全留白范围内；禁止使用完整图表的 `padding: 'auto'` 或大额 left / right / bottom padding

#### 指标卡内嵌迷你图表配色（通用）

迷你图类型可以是折线图、面积图、柱状图、条形图、环图等；配色规则按「一图一主色」执行，不按某一种图表类型写死。

**一图一主色（所有类型通用）**

- 每个指标单元绑定一个语义主色 `semanticColor`，优先与同级指标卡 icon / 状态色一致
- 颜色来源：`theme.token`（如 `colorPrimary`、`colorSuccess`、`colorWarning`、`colorError`）或 `global-style.css` 的 `--color-*` 功能色
- 同一枚迷你图内，线条、柱体、面积、点、环等所有图形元素必须来自同一主色或其浅色变体
- 禁止线条 / 柱体用一种语义色、主体填充 / 底色又用另一套默认色（如绿线蓝底、黄线蓝底）
- 禁止一组嵌套指标卡全部套用 Charts 默认蓝色主体

**按图表类型的表现补充**

| 类型 | 表现 |
| :-- | :-- |
| 折线图 | 实线，使用 `semanticColor`；默认不做大面积填充 |
| 面积图 / 折线+面积 | 线条实色；填充区使用同色渐变，方向为 **上浅下深**（靠近线条更透，靠近图表底部更实） |
| 柱状图 / 条形图 | 柱体使用 `semanticColor` 实色或同色浅填充；禁止柱体与指标语义色不一致 |
| 环图 / 进度环 | 进度段与 `semanticColor` 一致；底色使用同色极浅或 `--color-fill-secondary` |

**填充渐变（仅适用于有填充区域的类型）**

- 渐变方向：**上浅下深**（上更透 → 下更实），不是上深下透
- 推荐透明度区间：靠近线条约 **8%–12%**，靠近底部约 **18%–25%**；仍使用同一色相，不是换成另一种颜色
- 代码模板默认采用更轻的 `8% → 22%` 渐变（靠近线条 8%、靠近底部 22%）；若仍显厚重，优先继续降低底部透明度，而不是换成另一套色系
- 完整图表（`@ant-design/charts` Area / Column 等）填充渐变须使用 G2 支持的 `l(角度) 0:颜色 1:颜色` 或 `rgba()` 写法；**禁止**在 `style.fill` 中使用 CSS `color-mix()`，Canvas 无法解析会导致面积区不渲染

**实现方式**

- 图表类型与配置写法引用 `@ant-design/charts` 对应版本官方文档（Line / Area / Column / Tiny 等）
- Skill 只规定视觉结果与颜色来源，不在 Skill 内写死某一种图表 API 字段名
- 需要坐标轴、图例、完整 tooltip 或多序列分析时，升级为卡片外部独立图表区块

### 指标卡数值格式规范

- 金额必须使用千分位和货币符号，如 `¥527,000`；同一组指标卡货币单位必须一致
- 百分比必须统一小数位，如 `12.3%` 或 `12.30%`，同一页面不可混用精度
- 大数字可使用 `万` / `亿` 等缩写，但同一组指标卡必须保持同一单位策略
- 计数类指标使用千分位，如 `1,754`；不要在同组中混用 `1754` 和 `1,754`
- 同比 / 环比必须明确方向和口径，上升、下降、持平的颜色和 icon 语义应保持一致
- 空值统一展示为 `--`，禁止展示 `NaN`、`undefined`、空字符串或误导性的 `0`
- 数值单位应靠近数值展示，避免把单位藏在标题或说明中导致误读
- 同一组、同一层级指标卡的数值字号、字重、行高和对齐方式必须保持一致；总分指标卡中的总指标和分项指标同级处理，不单独放大总指标
- 标题、核心数值、单位必须在同一左对齐列上：`title`、`.ant-statistic-content` 均 `text-align: left`，禁止数值因 `Space`、居中容器、图标占位或自定义 `margin-left` 相对标题缩进
- 顶部同级概览型指标卡核心数值推荐统一为 `28px / 36px / 600`；单位 / suffix 使用 `14px / 22px`，与数值 baseline 对齐，禁止同级卡片混用 24px、28px、30px 等字号
- antd `Statistic` 会把小数拆成 `.ant-statistic-content-value-int` 与 `.ant-statistic-content-value-decimal` 两段 DOM；仅设 `valueStyle.fontSize` 或外层 `.ant-statistic-content-value` 不够，**必须**在 `global-style.css` 的 `.ds-statistic-card` 中同时覆盖 `value`、`value-int`、`value-decimal`，否则 `99.4%` 等小数会显得比整数小
- 使用 `StatisticCard` 时建议给卡片加 `className="ds-statistic-card"`，由 `global-style.css` 统一静态投影（`var(--shadow)`）、内容区 padding（16 / 24）、标题、数值、单位的左对齐和字号；**选择器仅作用于主 `statistic`**，不得误伤 `description` 内嵌的辅助 `Statistic`（辅助指标使用更小字号，见 `global-style.css` 内 `description` 规则）
- 同级指标卡默认不得自定义主数值 DOM；确有特殊布局时，整组必须使用同一种结构并复用 `28px / 36px / 600` 主数值与 `14px / 22px` 单位样式，禁止一部分走 `StatisticCard`、一部分走普通 `Card + div/span`

### 指标卡字段层级样式

同级指标卡、总分指标卡、基础指标卡、嵌套指标卡共享同一套字段层级；不同模板只能改变布局、图标、图表和分隔方式，不得为字段名、主数值、单位或辅助指标另起一套字重和颜色。

| 字段层级 | 推荐样式 | 颜色语义 | 适用位置 |
| :-- | :-- | :-- | :-- |
| 指标名称 / 字段名 | `14px / 22px / 400` | `colorTextSecondary` / `--color-text-secondary` | `StatisticCard.statistic.title`、总分卡分项标题、总指标标题 |
| 核心数值 | 按模板主数值层级处理，常用 `28px / 36px / 600`；同一组内保持一致 | `colorTextHeading` / `--color-text-heading` | 同级卡数值、总指标数值、分项指标数值 |
| 单位 / suffix | `14px / 22px / 400` | `colorTextTertiary` / `--color-text-tertiary` | `%`、`MB/s`、`人次` 等单位 |
| 辅助说明标签 | `12px / 20px / 400` 或 `14px / 22px / 400` | `colorTextTertiary` / `--color-text-tertiary` | `占比`、`环比`、`更新 11:26:06` 等说明标签 |
| 辅助指标值 | `14px / 22px / 400` | 默认 `colorTextSecondary`；趋势值使用 success / error / warning / primary 等语义色 | `+4.6%`、`37.0%`、`-1.0%` 等状态或占比值 |

- 指标名称是字段标签，不是区块标题；不得使用 `16px / 24px / 600`、`font-weight: 500/600` 或 `colorTextHeading` 处理，否则会和核心数值抢层级
- 只有卡片外部的区块标题、表格标题、图表标题可使用更强的 `16px / 24px / 600`
- 辅助文案整体不加粗；趋势、占比等数值可用语义色表达方向或类别，但不再额外加粗
- 总分指标卡中的总指标和分项指标必须共用上述字段样式；可通过排序第一位、标题语义、辅助说明或轻量分隔线体现总分关系，不通过更宽网格、更大字号、加粗标题或加粗辅助文案制造层级
- 自定义 DOM 指标卡必须复用上述样式，并通过 `className="ds-statistic-card"` 继承统一投影；若使用 `StatisticCard`，同样优先通过 `className="ds-statistic-card"` 继承全局规则

### 指标卡元素规则

| 模块 | 设计经验 |
| :-- | :-- |
| **状态展示** | 通过色彩直观反映指标状态，结合短文本标签说明状态含义。适用于需要即时识别异常状态的场景 |
| **图标展示** | 将抽象指标转化为具象图标，图标风格需保持统一，建议使用 `@ant-design/icons` 线型图标；同级指标卡采用 42×42 圆角矩形浅色 token 底 + 匹配语义色 icon（字号 24px），详见 [同级指标卡](#3-同级指标卡-peer-statistic-cards) |
| **数值表现** | 呈现关键指标信息，有不同的搭配方式（金额、百分比、计数等） |
| **对比组件** | 同环比组件，展示月同比、周同比等变化趋势 |
| **辅助指标** | 对当前指标下，额外的辅助指标参考 |
| **内嵌迷你图表** | 作为核心数值的辅助视觉，可使用迷你折线图、面积图、柱状图、条形图、小型环图、进度环等；不承担完整分析图表职责 |
| **字体** | 推荐 Roboto / Helvetica Neue，数字等宽，数字所占字符宽度应当一致，便于比较金额等数字位数；适用于中英文+数字混排时 |

### 指标卡布局规则

| 布局方式 | 设计经验 |
| :-- | :-- |
| **左右布局** | 适合信息维度多、需横向对比或业务流程偏"并列式"的场景 |
| **上下布局** | 适合信息层级多、需纵向延伸或业务流程偏"递进式"的场景 |

### 与页面整体布局的协调要求

- 指标卡通常作为页面顶部的结论区，位于页面级筛选区之后、主图表之前
- 指标卡组与主图表之间遵循 `layout.md` 的同级业务区块间距
- 同一组指标卡高度应保持一致，避免数值、图标或图表撑开单个卡片导致网格错位
- 顶部指标卡组底边必须在同一水平线上；禁止使用不同 `padding`、不同说明行数量或内容自然高度控制卡片高度
- 指标卡不承载复杂明细；需要解释、追踪或操作的数据，应在下方图表或表格中展开
- 指标卡数量过多时优先做分组或页签，不在首屏堆叠过多卡片

---

## 1. 基础图表 (Basic Charts)

**适用场景**：适用于展示趋势、分类对比、排名、占比结构、分布关系等图形化数据。基础图表只负责表达数据关系，不承载核心指标卡片的信息层级。

**设计说明**：基础图表能力引用 Ant Design Charts 官方文档：https://charts.ant.design/。本 Skill 只规定设计边界、选型原则和页面组合方式，不复制具体图表 API 或完整配置。

**数据关系选型**：

| 数据关系 | 推荐图表 | 说明 |
| :-- | :-- | :-- |
| 趋势变化 | 折线图 / 面积图 | 展示指标随时间变化的走势 |
| 分类对比 | 柱状图 / 条形图 | 对比不同类别之间的数值差异 |
| 排名 | 条形图 | 类别名称较长或需要横向空间时优先使用 |
| 占比结构 | 饼图 / 环图 | 分类较少且占比关系清晰时使用；分类过多改用条形图 |
| 分布 / 相关性 | 散点图 | 展示两个变量之间的关系 |
| 明细追踪 / 可操作数据 | 表格 / 列表 | 不强行图表化 |

**常见基础图表**：

| 类型 | 适用场景 | 说明 |
| :-- | :-- | :-- |
| 折线图 | 时间序列、趋势变化 | 适合展示指标随时间变化的走势 |
| 柱状图 | 分类对比、分组对比 | 适合对比不同类别之间的数值差异 |
| 条形图 | 类别名称较长或横向对比 | 适合横向空间更友好的分类排名 |
| 饼状图 / 环图 | 占比结构 | 适合分类较少、占比关系清晰的结构展示 |
| 面积图 | 趋势与累计量 | 适合强调趋势规模和总量变化 |
| 散点图 | 分布、相关性 | 适合展示两个变量之间的关系 |

**约束**：

- 不在 Skill 文档中复制 Ant Design Charts 的具体配置项
- 不在 Skill 文档中固化图表样式代码
- 按用户项目技术栈安装并引用 `@ant-design/charts`
- 以官方文档和项目数据结构为准完成图表实现
- 基础图表本身不直接绑定代码模板；当图表需要作为页面区块落地时，使用下方 [纯图表区块（OnlyCharts）](#纯图表区块-onlycharts) 模板

### 纯图表区块 (OnlyCharts)

纯图表区块（OnlyCharts）是基础图表的页面区块形态，不归入指标卡。它用于图表单独展示在卡片或内容容器中的场景，去除指标数值、趋势结论、辅助说明等指标卡信息，仅保留可视化图表本体。

**适用场景**：

- 页面中需要展示单个主图表或辅助图表
- 图表已有页面级标题、筛选区或上下文说明，不需要再附加指标数值
- 作为看板、分析页、报表页中的图表区块使用

**设计说明**：

- 图表区块可保留标题、tooltip 或简短说明，用于说明统计口径
- 图表容器和区块间距遵循"图表与指标卡共性规则"与 `layout.md`
- 图表本体使用 `@ant-design/charts` 实现（模板默认 `Area`）；面积填充须用 G2 `l(270)` + `rgba()` 渐变，遵循 §填充渐变，禁止 `color-mix()` 或 CSS `linear-gradient()`
- 不把 OnlyCharts 作为指标卡模板使用

**区块模板**：`scripts/charts/00-OnlyChartsBlock.tsx`

---

## 2. 基础指标卡 (Basic Statistic Card)

> **适用场景**：通用型数据展示场景，适合需要平衡信息密度与可读性的仪表盘首页。

**设计说明**：关键指标区域 + 图表区域，采用卡片式布局作为基础容器，通过标题、数值、辅助文本的层级结构呈现核心指标，支持基础交互如悬停反馈。仅展示**一个**核心指标；若多个同级指标都需要数值与 mini chart，改用 [嵌套指标卡](#5-嵌套指标卡-nested-statistic-cards)，选型对比见上文 [指标卡形态对比（含 mini chart）](#指标卡形态对比含-mini-chart)。

**约束**：

- 使用数值统计配置 `statistic` 和 `chart` 完成基本的指标卡
- `statistic` 中通过 `value`、`prefix`、`description` 组织核心数值与辅助信息
- `chart` 区域放置内嵌迷你图表，遵循上文「指标卡内嵌迷你图表」的容器对齐、plot padding 与配色规则；模板默认使用 `MiniAreaSparkline` SVG 组件（72px 高度、同色面积填充 `8% → 22%`），不得使用 `<img>` 占位图
- 组件来自 `@ant-design/pro-components` 的 `StatisticCard`
- 禁止使用普通 `Card + div/span` 手写基础指标卡结构，避免与 `ds-statistic-card` 的 Pro `StatisticCard` 样式规则冲突，导致标题、主数值、辅助指标和 mini chart 横向挤压
- 标题行右侧如有操作图标（如 `EllipsisOutlined`），须与指标名称一并放入 `statistic.title` 同一行（`flex` + `space-between`），**禁止**单独使用 `StatisticCard` / ProCard 的 `extra`；单独 `extra` 会生成空的 `.ant-pro-card-header`，导致左上角留白并与 body 顶部 padding 叠加
- 基础指标卡标题行表达**卡片标题**（如「部门一」），不是 14px 指标字段名：使用 `ds-card-title-row` + `ds-table-title`（`16px / 24px / 600`、`colorText`），跳转箭头与 `⋯` 跟标题同一行；核心指标本身由主数值 + `description` 承担，不要把卡片标题降格为 `StatisticCard.statistic.title` 的字段标签样式
- 基础指标卡纵向节奏属于图表模板规则，**写在本文档并由 `01-BasicStatisticCard.tsx` 模板落地**；不要写入 `global-style.css`。`global-style.css` 中的 `.ds-statistic-card` 只承担各类指标卡共用的外观（投影、body 16/24 padding、标题/主数值 typography 等）

**纵向节奏（基础指标卡）**

| 间距 | 值 | Token / 落地方式 |
| :-- | :-- | :-- |
| 卡片内容区上下 | 16px | 继承 `global-style.css` `.ds-statistic-card` body `padding-block: var(--padding)` |
| 卡片内容区左右 | 24px | 继承 `global-style.css` `.ds-statistic-card` body `padding-inline: var(--nav-space-6)` |
| 标题 → 主数值 | 8px | 继承 `global-style.css` `.ant-statistic-title { margin-bottom: var(--nav-space-2) }` |
| 主数值 → 辅助说明 | **8px** | 模板内 `description` 外包一层容器，`marginTop: token.marginXS` |
| 辅助说明 → mini chart | **16px** | 模板内 `chart` 容器 `marginTop: token.margin`，`marginBottom: 0` |
| mini chart → 卡片底边 | 16px | 仅由 body 下内边距承担；图表区不得再叠加 bottom margin / padding |

- 辅助说明两项之间的横向间距：模板内 `Space size={20}` 或等价 `gap: 20px`
- 标题行「指标名 + 跳转图标」间距：模板内 `Space size={8}`

**代码模板**：`scripts/charts/01-BasicStatisticCard.tsx`

---

## 3. 同级指标卡 (Peer Statistic Cards)

> **适用场景**：适合信息密度低、需快速传达多个同级核心数据的场景，如概览页顶部的多指标并排展示。

**设计说明**：将多个同级别指标以独立 Card 横向并排展示，每个指标一张卡片，卡片之间保留 gutter，不得合并为单一大 Card。每个指标配置具象图标增强识别度，使用 Grid / Flex 组织多个 `StatisticCard`，支持响应式布局。

**约束**：

- 每个同级指标使用独立的 `StatisticCard`，**不得**使用 `StatisticCard.Group` 合并为整块区域
- 同一组同级指标卡必须统一使用 `StatisticCard.statistic` 承载 `title / value / suffix / icon`；不得混用普通 `Card + Statistic`、`Card + div/span` 或手写 `marginTop` / `paddingBottom` 的主数值结构
- 多个独立卡片通过 Grid 或 Flex 组织，直接落在页面内容区背景（`var(--nav-color-bg-canvas)`）上；**不得**再套一层外层 Card、白色容器或大背景块包裹整组指标卡
- 卡片间距（组内）：Grid `gap` 使用 `token.marginSM`（12px）或 `var(--margin-sm)`；**同级指标卡之间应略紧**，避免与下方主内容区块的间距混淆
- 指标卡组与下方主图表 / 表格 / 列表等区块：使用 `layout.md` 同级业务区块间距 `var(--nav-space-4)`（16px），不得与组内 `gap` 同值导致「组内反而更疏」
- 默认代码模板可展示 4 张同级指标卡，但真实生成必须按指标数量自适应：1–2 张使用 `repeat(auto-fit, minmax(260px, 320px))` 并 `justifyContent: 'start'`，禁止单张 / 少量卡片拉满整行；3–4 张按实际数量等分（如 `repeat(items.length, minmax(0, 1fr))`）；5 张及以上宽屏最多 4 列并自动换行；窄屏（如 < 596px）切换为单列堆叠
- 自适应列数应写在当前模板 / 当前组件的局部 Grid 逻辑中（如 `getStatisticGridColumns(items.length, responsive)`），不要放进 `global-style.css`；`global-style.css` 只承担卡片外观、body padding、标题 / 数值字号等通用样式
- 外层 Grid 必须设置 `alignItems: 'stretch'`；每个 `StatisticCard` 设置 `bordered={false}`、`width: 100%`、`height: 100%`；**禁止**为纯数值同级卡设置统一 `minHeight`（改由 `ds-statistic-card` 垂直居中）；卡片圆角、背景、投影、无描边和 body padding 由 `ds-statistic-card` 统一承担，不得依赖 antd / ProCard 默认样式，也不得在单卡上额外硬编码 `boxShadow`、`--shadow`、`bodyStyle.padding` 或其它外观值覆盖
- 若同级指标卡中任何一项需要辅助说明（如「截至当前班次」），整组指标卡都必须通过 `description` / 占位容器预留同等高度；禁止只有单张卡出现第二行辅助说明
- 同级指标卡必须加 `className="ds-statistic-card"` 或等效样式，确保标题、数值、单位左对齐；带图标指标卡的图标不能影响文字列起点
- 每个指标通过 `statistic.icon` 配置图标，图标风格需保持统一
- 图标统一使用 `@ant-design/icons` 的线型通用图标，不使用远程图片、emoji 或风格不一致的自绘图形
- 图标容器统一为 42×42 圆角矩形浅色底色（如 antd `borderRadiusLG`），内部 icon 字号 24px；背景使用与图标语义色对应的浅色 token（如 `colorPrimaryBg` / `colorSuccessBg` / `colorWarningBg`）；内部图标使用匹配的语义色、居中显示
- 同一组同级指标卡的图标尺寸、圆角、线型粗细、语义色与底色配对应保持一致；不得混用圆形、直角方形或描边方框背景
- 语义色与图标选型参考（可按业务替换 icon，但须保持语义一致）：

| 指标类型 | 推荐 icon | 图标色 | 背景色 |
| :-- | :-- | :-- | :-- |
| 金额 / 支付 | `EuroOutlined` 等 | `colorPrimary` | `colorPrimaryBg` |
| 访客 / 活跃 | `UserOutlined` 等 | `colorWarning` | `colorWarningBg` |
| 成功 / 完成 | `CheckCircleOutlined` 等 | `colorSuccess` | `colorSuccessBg` |
| 浏览 / 辅助 | `EyeOutlined` 等 | `#722ed1`（purple-6） | `#f9f0ff`（purple-1） |

- 第四项及后续辅助指标若无合适语义 token，可使用 antd 预设 purple 色系；同一组内 purple 仅用于非核心主指标，避免与 primary / success / warning 混用超过 1 处
- 使用 `RcResizeObserver` 处理响应式布局，窄屏时从多列网格切换为单列
- 不含图表区域，聚焦数值与图标的快速传达

**代码模板**：`scripts/charts/02-IconStatisticCard.tsx`

---

## 4. 总分指标卡 (Total and Breakdown Statistic Card)

> **适用场景**：适用于需要同时呈现总体指标与分项占比的概览场景，例如总量 + 付费 / 免费、总数 + 分类拆分等。

**设计说明**：使用外层 CSS Grid 组织总指标与分项指标；总值和每个分值都是同级指标单元，一起参与等分。总分关系通过排序、标题和辅助描述表达，不通过更宽的总值区表达。

**约束**：

- 使用外层 CSS Grid 承载总指标和分项指标；禁止使用“左侧总值区 + 右侧分项区”的非等分结构
- 总指标位于最前，用于表达整体规模或汇总值，但宽度、内边距和字段层级必须与每个分项指标一致
- 总指标和每个分项指标都是同级指标单元：单元总数 = `1 + 分项数量`，每个单元等宽
- 必须使用 `className="ds-statistic-card ds-total-statistic-card"` 的外层卡片与 `className="ds-total-statistic-grid"` 的同级网格；推荐结构：`metrics = [total, ...breakdowns]`，外层 Grid 使用 `gridTemplateColumns: repeat(metrics.length, minmax(0, 1fr))`
- 外层卡片、同级网格和每个指标单元都必须设置 `box-sizing: border-box`、`min-width: 0`、`max-width: 100%`；外层卡片必须自身收口在父容器内，禁止因 `width: 100%` 叠加 padding / border / shadow 造成页面横向滚动或贴到视口右边缘
- 每个指标单元必须使用 `className="ds-total-statistic-cell"`，并设置 `min-width: 0` / `overflow: hidden`；金额、长数字、百分比等主数值使用 `className="ds-total-statistic-value"`，不得以 `width: max-content`、固定宽度或未约束 `white-space: nowrap` 撑破卡片
- 分项指标通过 `description` 展示占比、完成率等辅助指标；总指标也应使用同一辅助信息槽位，可写“整体汇总”等口径说明
- 总分指标卡只有分项指标需要色点表达类别；总指标位于首位，本身已通过排序和标题表达汇总语义，不需要色点。分项色点与分项标题可按行内 `gap: 8px` 排列，所有分项保持一致即可
- 分项图表如需使用，只能作为每个同级单元内的辅助图表；不得只给分项区另起一套图表布局
- 如需区分总分关系，可使用单元之间的轻量分割线；分割线必须挂在同级单元边界上（如 `border-inline-start`），随整行内容区 `stretch`，禁止使用独立 1px grid column 或固定高度短线
- 使用 `RcResizeObserver` 处理响应式布局，窄屏时从横向排列切换为纵向排列
- 总指标与分项指标的字段名、单位和辅助指标必须遵循「指标卡字段层级样式」；总分关系不通过额外加粗字段名、辅助文案或扩大总值区宽度表达
- 当指标单元过多、标题较长或容器宽度不足时，整体网格只允许整体切换为单列 / 纵向堆叠；禁止生成「左侧总值 + 右侧 2 / 3 列分项宫格」的混合结构，禁止把分项强行压在右侧窄列里，造成标题、金额、占比竖向挤压或整体右侧溢出

**代码模板**：`scripts/charts/03-TotalStatisticCard.tsx`

---

## 5. 嵌套指标卡 (Nested Statistic Cards)

> **适用场景**：适用于多个同级指标需要同时展示数值与趋势图表的场景，如多维度监控面板、多指标对比看板。

**设计说明**：嵌套指标卡不是把多个指标合并进一个 `StatisticCard.Group` 大卡，而是多个独立 `StatisticCard` 以同级指标卡的 Grid / Flex 方式排列。它与同级指标卡的区别只在单卡内部：每张卡同时包含 `statistic` 和受限高度的 mini chart，形成「数值在上、趋势图在下」的上下结构。它与基础指标卡的区别在于卡片数量与信息密度：基础指标卡只承载**一个**重点指标且可带更丰富的辅助说明；嵌套指标卡用于**多个**同级指标并排监控。完整对比见上文 [指标卡形态对比（含 mini chart）](#指标卡形态对比含-mini-chart)。适合在概览区用小趋势辅助判断，不适合承载完整趋势分析。

**约束**：

- 多个嵌套指标卡必须使用局部 Grid / Flex 排列，直接落在页面内容区背景（`var(--nav-color-bg-canvas)`）上；外层响应式列数写在当前模板 / 当前组件内，**不要**放进 `global-style.css`
- 禁止使用 `StatisticCard.Group` 承载整组嵌套指标卡；禁止使用 `Divider` 表达卡间分隔；禁止再套一层外层 Card、白色容器或大背景块包裹整组嵌套指标卡
- 默认代码模板可展示 4 张嵌套指标卡，但真实生成必须按指标数量自适应：1–2 张使用 `repeat(auto-fit, minmax(260px, 320px))` 并 `justifyContent: 'start'`，禁止单张 / 少量嵌套指标卡无业务主图表语义时拉满整行；3–4 张按实际数量等分；5 张及以上宽屏最多 4 列并自动换行；窄屏（如 < 596px）切换为单列堆叠
- 外层 Grid 必须设置 `alignItems: 'stretch'`；每个 `StatisticCard` 设置 `bordered={false}`、`width: 100%`、`height: 100%`；卡片间距（组内）与同级指标卡一致，Grid `gap` 使用 `token.marginSM`（12px）或 `var(--margin-sm)`
- 每张嵌套指标卡都是独立 `StatisticCard`，必须加 `className="ds-statistic-card ds-nested-statistic-card"` 或等效样式，白底、圆角、投影、无描边和 body padding 由 `ds-statistic-card` 统一承担，标题 / 数值 / mini chart 的纵向布局由 `ds-nested-statistic-card` 承担
- 每个指标卡同时配置 `statistic` 和 `chart`，图表位于数值下方；同一组嵌套指标卡必须使用相同信息槽位，避免单卡因说明行、图表高度或 padding 不一致导致底边不齐。推荐间距：卡片内容上边距 16px、左右 24px；标题到数值 8px；数值到图表 16px；图表到底部 24px
- `chart` 只允许作为内嵌迷你图表使用，高度建议固定为 72px（可在 56–96px 内按场景微调，最大不超过 120px）；不得展示完整坐标轴、图例、复杂 tooltip、告警线或长时间序列分析
- 嵌套指标卡 `chart` 的配色须遵循上文「指标卡内嵌迷你图表配色（通用）」；每张卡绑定独立 `semanticColor`，禁止多张卡共用默认蓝色填充
- 同一组嵌套指标卡中的趋势类 mini chart 优先使用带同色面积填充的面积图；除非业务明确需要对比形态，否则不要在同组内混用“有面积填充的折线”和“无面积填充的折线”，避免视觉不一致。柱状 mini chart 可用于离散区间 / 资源桶类指标，但柱宽须收窄并保持轻量
- 若每个指标都需要全宽趋势图、独立坐标轴、图例、告警线、长时间范围或完整 hover tooltip，则不应使用嵌套指标卡，应升级为 OnlyCharts / 图表 Grid / 监控趋势图 Card
- 禁止多个嵌套指标卡默认纵向全宽堆叠；禁止把嵌套指标卡生成成「多条全宽监控图列表」
- 支持 `precision`（小数位数）和 `suffix`（单位后缀）精确控制数值展示
- 使用 `RcResizeObserver` 处理响应式布局

**代码模板**：`scripts/charts/04-NestedStatisticCard.tsx`

---

## 6. 页签联动指标卡 (Tabbed Statistic Cards)

> **适用场景**：多维数据分析场景，通过标签页（Tabs）组织关联指标组，支持横向切换不同维度数据而不跳转页面。

**设计说明**：通过标签页组织关联指标组，支持横向切换不同维度数据而不跳转页面。采用顶对齐布局，活动态需高亮显示以强化当前位置。

**约束**：

- 结合 `Statistic` 可以实现带指标统计的页签
- 使用 `ProCard` 的 `tabs` 配置实现页签联动；Tab 切换使用受控 `activeKey`，由页面层根据选中 Tab 渲染下方独立区块
- 每个页签的 `label` 使用 `Statistic` 组件展示指标标题和数值
- 页签联动指标卡必须加 `className="ds-statistic-card ds-statistic-tabs"`；指标项本质是 Tabs label / 维度切换入口，不是可选对象卡片
- active 状态遵循 AntD Tabs 语义：只保留底部 2px 主色 ink bar；标题、数值和状态标签不因选中而额外变色，避免把维度切换误表达成卡片列表选中
- 禁止 active 项使用整块浅蓝背景、整卡描边、整卡阴影、主色标题 / 主色数值、`.card-selected` 或 `.card-item.card-selected`
- 支持 `status` 属性标识不同状态（default / processing / error / success）
- 页签 label 中的状态点属于辅助标识槽，不参与标题、主数值和状态 Tag 的 24px 文字对齐线；总计项不需要状态点，只有分项指标需要状态点表达状态 / 类别；推荐使用独立 `.ds-statistic-tab-status-dot` 在 label 内绝对定位到文字对齐线左侧约 12px，避免直接使用 `Statistic.status` 默认布局把标题文字向右挤
- 若页签内同时展示状态点与业务状态 Tag（如「正常 / 处理中 / 异常」），状态点只作为维度标识，业务状态 Tag 必须放在主内容列内，并与标题、主数值共享同一左对齐线；禁止把状态 Tag 放到整个 label 容器左缘，导致它与状态点对齐
- 总计项可通过右侧分割线与其他页签区分
- 页签 `label` 必须适配长数值、`suffix` 与 `status` 同时出现的场景；禁止直接在 `Statistic` 上设置固定 `width` 压缩内容
- 使用外层 label 容器控制宽度与总计分割线；总计分割线不得绑定在 `Statistic` 自身宽度上
- 数值内容保持单行展示（`white-space: nowrap`），页签过多时交给 Tabs 原生溢出 / 滚动处理，不通过压缩指标内容解决

**Tab 等分规则**：

- 各 Tab 等分均分（`flex: 1`），宽度一致，不因数值长短差异导致宽窄不一
- Tabs nav list 必须撑满容器宽度，`ant-tabs-tab`、`ant-tabs-tab-btn` 和 `.ds-statistic-tab-label` 都按 100% 宽度承接；`ant-tabs-tab` 不得保留额外左右 padding 或相邻 Tab 默认间距（须清零 `.ant-tabs-tab + .ant-tabs-tab` 的 `margin-inline-start` / `margin-left`），否则选中第二项及之后 Tab 时 active ink bar 会与总计项分割线之间出现空隙；Tabs 卡片 body 横向 padding 建议为 0，由 `.ds-statistic-tab-label` 自己提供左右 24px 内边距；第一项总计标题文字必须距离整张卡片最左侧 24px，同时在 active Tab 单元内也保持 24px 左内距；总计项如需分割线，分割线只能用绝对定位伪元素绘制，不得通过额外 padding 或独立宽度破坏等分
- `.ds-statistic-tab-label` 必须保留底部内距（建议 `padding-block-end: var(--padding)`），使状态 Tag / 主数值到底部 ink bar 的距离与卡片 body 顶部到标题的距离一致；不要通过给 ProCard body 增加底部 padding 来修正，否则 active ink bar 会离开页签指标卡底边
- active ink bar 表达的是当前 Tab 单元，不是文字内容选中线；ink bar 应覆盖当前等分 Tab 单元底部，从 Tab 单元左边界开始，不需要再为状态点或标题文字额外留空隙，也不得缩到文字宽度或跟随状态点偏移；文字的 24px 对齐线由 label 内边距保证
- 数值短的 Tab 右侧自然留白，数值长的 Tab 内容单行不换行，不撑宽 Tab
- 选中态与非选中态 Tab 宽度一致，切换时无宽度跳动

**Tab 底部收口**：

- 页签联动指标卡的联动内容已外置为独立区块时，Tabs 默认底部分割线必须去掉（`.ant-tabs-nav::before { border-bottom: 0 }`）
- Tabs nav 到页签指标卡底边不得再保留默认 `margin-bottom`、`.ant-pro-card-tabs` 底部 padding、空的 content holder / content / tabpane 高度；active ink bar 应贴在该指标卡白色卡片底边；内容到 ink bar 的底部距离由 label 内部 `padding-block-end` 承担

**关联展示内容外置**：

- 页签联动指标卡是一块独立的卡片区块，只展示 Tab + 指标数值
- **禁止**在 `tabs.children` 中放置业务内容；`children` 须设为 `null`
- 关联展示内容（图表、表格、列表等）在卡片外部作为 `.ds-page-shell` 的独立子区块，由 `gap: var(--nav-space-4)`（16px）统一承担页签指标卡与下方联动模块之间的区块间距
- 若联动内容本身包含一组指标卡、图表卡或明细卡，使用 `className="ds-statistic-linked-content"` 或等价结构组织；联动内容区与页签指标卡之间、联动内容内部各业务卡之间都必须保留 16px，禁止负 margin、绝对定位或把下方卡片嵌进 `.ds-statistic-tabs` 内造成结构混乱
- 关联展示内容卡片必须自身承担完整白卡边界和内容区留白，标题 / 关联图表 / 表格 / 列表都应共享同一 24px 左右对齐线；若使用 `ProCard`，优先把「关联展示内容 - 当前维度」标题放在 `body` 内作为普通标题行，不使用 `title` / header 造成 header padding 与 body padding 两套对齐线
- 关联展示内容中的图表须放在卡片 body 的内容区内，使用 `@ant-design/charts` 渲染（模板默认 `Area`，随 `activeKey` 切换数据），并与标题保持 16px 间距；禁止用灰色示意块、文字占位或 `<img>` 代替真实图表；禁止让图表贴住卡片左 / 右 / 底边，禁止通过负 margin 或 `height: 100%` 撑破卡片内容留白
- Tab 切换通过受控 `activeKey` 驱动页面层条件渲染下方区块

**代码模板**：`scripts/charts/05-TabsStatisticCard.tsx`
