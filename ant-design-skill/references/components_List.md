# 列表组件 (List Components)

本节规定所有基于 Ant Design List 的通用设计规则，适用于 `antd` 原生 `List` 或 `@ant-design/pro-components` 的 `ProList`。

## 目录

| 场景 | 说明 |
| :-- | :-- |
| [列表共性规则](#列表共性规则) | 适用于所有列表组件的结构、过滤、工具栏、分页器、页面容器与间距规则 |
| [1. 基础列表 (Basic List)](#1-基础列表-basic-list) | 以列表形式展示结构化数据，每条数据包含标题、描述、状态、标签和操作等基本信息 |
| [2. 编辑列表 (Edit List)](#2-编辑列表-edit-list) | 在浏览列表的同时即时修改列表中的已有属性内容 |
| [3. 带工具栏的列表 (List with Toolbar)](#3-带工具栏的列表-list-with-toolbar) | 提供集中的操作区域（Tab 分组、全局搜索、筛选、新建等） |
| [4. 支持展开的列表 (Expandable List)](#4-支持展开的列表-expandable-list) | 通过收起展开方式渐进式呈现更多信息，适用于主-从关联数据 |
| [5. 支持选中的列表 (Selectable List)](#5-支持选中的列表-selectable-list) | 对列表项进行批量选中，唤起相关批量操作 |
| [6. 查询列表 (Query List)](#6-查询列表-query-list) | 筛选条件一次性提交查询，精准定位目标数据 |
| [7. 竖排样式列表 (Vertical List)](#7-竖排样式列表-vertical-list) | 将大量多元化信息（图片、文本、标签等）全部呈现，强调展示型 |
| [8. 卡片列表 (Card List)](#8-卡片列表-card-list) | 网格布局采用卡片样式，每个对象拥有更平等的展示机会 |

---

## 列表共性规则

以下规则适用于本文件所有列表组件，各组件不再重复说明。

> **页面说明提示条**：默认不生成；仅当用户明确要求，或存在非显而易见的业务规则 / 操作风险 / 生效时机时，才引用 [`layout.md` §页面说明提示条](layout.md#页面说明提示条)。

> **模板纯净性**：`scripts/list/` 代码模板只渲染真实业务页面 / 组件内容，禁止把本 reference 的章节标题、英文组件名或「适用场景」说明文案作为页面内容输出。列表卡内如需标题，应使用真实业务标题（如「项目列表」「实验列表」）放在 `List.header`、卡内 toolbar 或页面标题区。

> **标题引用规则**：列表页的页面总标题必须走 [`layout.md`](layout.md) 的 `.ds-page-header`；列表卡片内标题走 `list-card-title` / `Card title` / `Tabs` 等卡内结构。页面标题和列表卡标题可以同时存在，但不能互相替代。

### 列表结构与布局

列表类数据通常配合「数据过滤」、「列表工具栏」、「列表数据」、「分页器」一起出现，各个分区内的内容可以随意组合：

| 分类 | 设计说明 |
| :-- | :-- |
| **数据过滤** | 数据过滤一般包含了查询、筛选、搜索等功能，通常位于列表及列表工具栏的上方 |
| **列表工具栏** | 一般位于数据过滤的下方，有单行和双行 2 种布局模式 |
| **列表数据** | ProList 的最重要组成部分，占页面篇幅最大，位于数据过滤、列表工具栏下方，分页器上方。列表类型根据使用场景不同，分成多个组件模板 |
| **分页器** | 分页器一般位于列表的底部，与列表右侧对齐，当使用分页器时遵循 Ant Design 分页器组件。同时注意缓存用户在列表中的浏览位置，并标记列表中已浏览项，当用户返回上级页面时回到原浏览位置 |

### 数据过滤

| 分类 | 设计说明 |
| :-- | :-- |
| **查询** | 选择多个查询条件后一次性提交，获取查询结果 |
| **筛选** | 用户调整筛选项后，系统即时调整筛选结果，无需统一提交 |
| **搜索** | 更智能的查找，输入关键词一次性在多种数据属性中查询，展示结果，适合目的明确的场景 |

### 列表工具栏

| 类型 | 适用场景 | 设计说明 |
| :-- | :-- | :-- |
| **Tab 标签** | 该字段是用户筛选频率最高，子集固定且数量较少（≤4 个） | 使用 `ds-card-tab-strip` 将最高频筛选字段的子集展示在列表卡顶部，方便用户快速筛选 |
| **带筛选项** | 列表顶部的工具操作和信息相对简洁，可以清晰地在一行内展示全部筛选项 | 左侧必须为列表结果标题、当前结果标题或结果分类 Tab；筛选项、搜索、新建等控制项位于右侧，从左到右依次是筛选项、搜索框、新建、删除、设置等全局操作 |
| **单行工具栏** | 操作和信息简洁，可在一行内清晰展示 | 最左侧为列表标题；右侧从左到右依次：搜索、筛选、新建等创建型操作、刷新/批量导出等全局操作 |
| **复杂筛选** | 控件较多、需要多行或展开收起 | 不放在列表卡内部，须上移为独立搜索卡，并由搜索卡承载 `QueryFilter` |

列表卡内部工具栏分两类：普通标题 / 搜索 / 操作用 `ds-card-toolbar ds-card-toolbar-inline` 或 `list-card-toolbar`；顶部结果分类 Tab（如「全部 / 进行中 / 失败」）用 `ds-card-tab-strip + toolbar-tabs`。当列表内容放在已有顶部 padding 的页面 / 表格卡容器内时，首个 `ds-card-tab-strip` 的顶部 16px 由外层容器 padding 承担，`ds-card-tab-strip` 不再额外增加顶部 padding，只保留 32px Tab 行高和下方 16px 到列表内容的间距；纯 `ds-list-card` 壳层只承担水平 24px，顶部 16px 仍由内部 Tab Strip / Header 垂直 padding 承担。普通标题工具栏下方到首条列表 / 表格式表头必须保留 16px。Tab 数量使用 `ds-tab-count` 中性灰底样式，active 时仅弱主色强调；禁止用红 / 黄 / 绿 Badge 把普通数量做成告警状态。若筛选项需要多行、展开收起或字段 ≥5 个，必须上移为独立搜索卡承载 `QueryFilter`。禁止搜索框 / 筛选框作为列表卡左上角唯一内容；搜索、筛选、新建、刷新等控制项必须放在标题或 Tab 右侧。禁止使用负 `margin`、空占位块或手写 `marginTop` 修正 Tab / 筛选项位置。

#### 搜索与筛选分组

当列表同时存在主分类 Tab 与辅助筛选条件时，应按语义分组，而不是仅按视觉填空排列。

- 主分类 Tab（如业务类型、能力分类、状态主泳道）用于切换主要内容集合，应独立成组，通常位于搜索条件下方或列表工具栏左侧
- 搜索框、状态、级别、负责人等辅助过滤条件属于查询条件区，优先跟随搜索框右侧排列；空间不足时可换到搜索框下方，但仍应保持同组关系
- 禁止把辅助状态筛选混入主分类 Tab 行的末端，除非页面宽度不足且通过明确分组间距或分隔能表达它是另一组过滤条件
- 推荐顺序：搜索框 → 辅助筛选条件；主分类 Tab 独立成行或独立成组
- 列表工具栏、搜索卡、筛选区内的搜索框默认使用 `Input prefix={<SearchOutlined />}`，样式与同组的 `Select` / `DatePicker` 等表单控件一致，使用线框输入框；灰底 `variant="filled"` 仅用于顶部导航搜索；`Input.Search` 仅用于必须点击搜索按钮才提交的场景

### 列表文本展示

- **单行省略**：列表/表格主数据列须 `ellipsis: true`，单行展示，超出部分省略号截断；完整内容须通过 **Tooltip** 展示；**禁止**单元格多行跨行
- **字体**：主数据列中的英文与中文均使用正文默认字体（`ds-text-main`，即 `--font-family`）；**禁止**仅因含英文字母或字母数字混排而改用 `.db-font-code` 等等宽字体；等宽字体使用范围见 [`components_Table.md` §值展示规则](components_Table.md#值展示规则)

### 行背景与业务语义

列表项 / 表格式列表行的背景只表达**交互状态**（hover、选中、展开、禁用等），不表达数据本身的业务语义。高风险、异常、告警、紧急、今日、当前、最新、默认、重点等语义应放在对应字段内，通过 Tag / Badge / 语义色圆点 / 次要文本表达，禁止整条列表项铺色或默认选中。

| 场景 | 推荐展示 | 禁止做法 |
| :-- | :-- | :-- |
| 风险等级（高 / 中 / 低） | 风险等级列内用红 / 黄 / 蓝圆点 + 文案，或 `Tag color="error" / "warning" / "processing"` | 高风险行整条使用浅红背景 |
| 时间标记（今日 / 当前日 / 本周 / 最新） | 日期字段内追加次要文本或轻量 `Tag`，如 `2026-06-17 今日` | 因 `isToday` / `isCurrent` / `isLatest` 给整条加灰底或默认选中 |
| 状态（跟进中 / 待跟进 / 已化解） | 状态列内用 `Badge status`、语义圆点 + 文案 | 根据状态给整行铺色 |
| 默认 / 推荐 / 重点 / Top 项 | 对应字段内用 Tag / Badge / 次要文本标记 | 映射为 active 行、selected 行或整条强调背景 |
| 需要强调高风险数量 | PageHeader / 列表卡工具栏里显示 `4 项高风险待跟进`；若还需解释处置规则，再使用页面说明提示条 | 用整行红底替代统计提示 |

> 表格式列表须与 [`components_Table.md` §行背景与业务语义](components_Table.md#行背景与业务语义) 保持一致：默认白底 + hover 背景 + 选中背景即可，业务语义只在单元格内表达。

### 分页器

| 分类 | 设计说明 |
| :-- | :-- |
| **分页器** | 分页器一般位于列表的底部，与列表右侧对齐，当使用分页器时遵循 Ant Design 分页器组件。同时注意缓存用户在列表中的浏览位置，并标记列表中已浏览项，当用户返回上级页面时回到原浏览位置。适用于列表条数很多，加载/渲染所有数据将花费很多时间时 |

### 与页面整体布局的协调

- 组件宽度不超出页面内容区域，与页面网格系统对齐
- 组件边距继承自页面全局间距系统（Ant Design Token `margin` / `padding` 相关变量）
- 组件生成不影响导航结构的视觉完整性
- 组件位置避免与固定定位的导航元素冲突

### 页面容器结构

列表页面采用「**PageHeader 外置 + 双卡分组**」的固定布局结构，**禁止**用单一 Card 包住"搜索 + 列表 + 分页"全部内容（单卡多段会让区块语义混在一起、视觉拥挤）。

#### 三段式分组

```
┌─────────────────────────────────────────────┐
│ PageHeader（Card 外）                        │  标题 + 操作按钮组
├─────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────┐ │
│ │ 搜索卡                                   │ │  搜索框 + Tab + 高级筛选
│ └─────────────────────────────────────────┘ │
│         ↕ marginBottom: var(--nav-space-4)  │
│ ┌─────────────────────────────────────────┐ │
│ │ 列表卡                                   │ │  列表条目 + 分页
│ └─────────────────────────────────────────┘ │
└─────────────────────────────────────────────┘
        ↑ Layout 兜底色 var(--nav-color-bg-layout)
```

#### 各段规范

| 段 | 容器 | 关键样式 |
| :-- | :-- | :-- |
| **PageHeader** | 普通 `<div>`（无 Card、无边框、无阴影） | `padding: 0`（左右留白继承 `<Content>` 的 `var(--nav-space-6)`，不得再叠加 `padding-inline`；顶部 / 底部 padding 均为 0；与首个业务区块间距由 `.ds-page-shell` 的 `gap: var(--nav-space-4)` 承担）；`display: flex; justifyContent: space-between` |
| **搜索卡** | `<Card bordered={false} className="ds-search-panel">` | AntD Card 场景下 padding 必须作用在 `.ant-card-body`：水平 `padding-inline: var(--nav-space-6)`、上下默认 `var(--nav-space-5)`；**Tab 贴底时 body `padding-bottom: 0`**（见下方「搜索卡 Tab 贴底间距」）；白底 `var(--color-bg-container)`、8px 圆角 `var(--border-radius-lg)`、`boxShadow: var(--shadow)`、无描边 |
| **列表卡** | `<Card bordered={false} className="ds-list-card">` | `overflow: hidden`；AntD Card / ProCard 的 body 由 `global-style.css` 自动清零；其余同搜索卡；壳层承担水平 **24px**（方案 B），内部只保留垂直 padding |

> ⚠️ **间距叠加陷阱**：外层 `<Layout.Content>` 一般已经声明了 `padding: var(--nav-space-6)`（24px）。PageHeader 只负责标题与操作组布局，默认不得再加 `padding-inline`、`padding-top`、`padding-bottom` 或 `margin-bottom`；页面级标题的水平位置由 Content 唯一提供，标题与搜索卡 / 列表卡之间的垂直间距由 `.ds-page-shell` 的 `gap` 唯一提供。

#### PageHeader 标题行排版

- 主标题：`<Title level={4} className="ds-page-title">`，字号 / 行高 / 颜色由 `.ds-page-header .ds-page-title` 提供（20px / 28px）；详见 [`layout.md` §页面主标题 typography](layout.md#带面包屑的页面标题区)
- 副标题（页面用途 / 操作指引）：放在主标题**下方**独立第二行，使用 `<Text type="secondary">`；与主标题间距 4px（`Space direction="vertical" size={4}`）
- 标题同行后缀（刷新口径等轻量元信息）：与主标题 baseline 对齐时使用 `ds-page-title-row` + `ds-page-title-suffix`，见 [`layout.md` §页面标题同行后缀](layout.md#页面标题同行后缀titlesuffix)
- 列表页面是否展示面包屑取决于信息架构层级：菜单直接进入的一级列表页不展示；从详情页、项目空间、应用对象等上级上下文下钻出的列表页可以展示面包屑，例如「应用详情 / 实例列表」「项目详情 / 发布记录」。禁止根据“这是列表页”一刀切决定面包屑，也禁止由 Layout / ProLayout 根据菜单层级自动生成面包屑。

#### PageHeader 操作组（右上角按钮组）

遵循「**克制化**」原则——操作组要靠**层级颜色**而非 icon 堆砌区分主次：

| 按钮 | 类型 | 是否带 icon |
| :-- | :-- | :-- |
| 次要操作（如更新数据 / 分享数据） | `<Button>` 默认 | **不带 icon**，只文字 |
| 主要操作（如导出数据 / 新建） | `<Button type="primary">` | **不带 icon**，只文字 |
| 更多操作入口（…） | `<Button type="text" icon={<EllipsisOutlined />} />` | **必须** `type="text"`，去掉边框/背景，避免出现一个"空背景块"挂在最右侧 |

> 规则：**只有"更多入口"按钮**保留图标且使用 `type="text"`；其他按钮一律文字优先、不加前置 icon，以避免操作组视觉过载。

#### 卡片内外的元素划分

| 位置 | 包含元素 |
| :-- | :-- |
| **Card 外**（PageHeader 区） | 页面标题、操作按钮组（更新/分享/导出/更多等） |
| **搜索卡内** | 搜索框、Tab 标签切换、高级筛选触发与展开面板（高级筛选展开后的字段网格 + 底部「重置/查询/收起」三按钮布局规则见 `components_Form.md` §5「补充：内联高级筛选」） |
| **列表卡内** | 列表结果标题 / 结果级操作工具栏、列表条目、列表与分页之间的 `<Divider/>`、分页器 |

> **重要**：
> - PageHeader **必须外置**，禁止包进任何 Card
> - 一张 Card 只承载**一个语义区块**——禁止把搜索区和列表区放进同一张 Card
> - 列表条目**不再外包 Card**，使用 hover 背景高亮（`background: var(--nav-color-bg-canvas)`）替代卡中卡

#### 列表卡内部留白

列表卡与表格卡共用同一套「水平 24、垂直 16」内部节奏：卡片左右对齐线距外缘 **24px**，卡内工具栏 / Tabs / List / 分页之间统一 **16px**。

列表卡采用**方案 B（卡片内容区承担）**：壳层 `className="ds-list-card"` 承担外侧 `padding-inline: var(--nav-space-6)`（24px），`body padding: 0`；普通列表内部工具栏、列表条目、分页、`<Divider/>` **只保留垂直 padding**。若列表卡内嵌 Table / 表格式列表，Table 外框共用列表卡 24px 内容线，首末列文字仍保留 16px 单元格内部留白，避免贴灰色表头 / 行背景边缘。

> **禁止贴边**：忘记 `ds-list-card` 或壳层水平 padding 时，列表内容会贴到 Card 边缘；忘记清零内部水平 padding 时，会出现双倍缩进。

**水平对齐线**（距卡片外缘 **24px**，`var(--nav-space-6)`）——由 `ds-list-card` 壳层统一承担，内部区块共用同一条线：

| 区块 | 上 | 右 | 下 | 左 |
| :-- | :-- | :-- | :-- | :-- |
| 普通工具栏 | 16px | **0**（壳层承担） | 0 | **0** |
| 顶部 Tab Strip（已有容器顶部 padding） | 16px 容器 padding + 32px Tab 行 | **0** | 16px | **0** |
| 顶部 Tab Strip（纯 `ds-list-card`） | 16px 内部 padding + 32px Tab 行 | **0** | 16px | **0** |
| 列表条目 | 16px | **0** | 16px | **0** |
| 分页 | 16px | **0** | 16px | **0** |
| 无分页底部收口 | — | **0** | 16px | **0** |
| `<Divider/>` | — | **0**（与内容同宽） | — | **0** |

补充约定：

- 列表卡 `<Card>` 须加 `className="ds-list-card"`（或等价 `padding-inline: var(--nav-space-6)` 的壳层 + `body padding: 0`）；AntD Card / ProCard 场景下 `.ant-card-body` / `.ant-pro-card-body` 必须清零，避免与壳层 24px 水平内容区叠加
- 列表卡顶部有普通工具栏 / 筛选区时：工具栏容器只承担**顶部**留白，建议 `padding: var(--padding) 0 0`
- 列表卡顶部有结果分类 Tab 时：使用 `className="ds-card-tab-strip"` + `Tabs className="toolbar-tabs"`；若外层已经有顶部 padding，`ds-card-tab-strip` 只保留 32px 行高和下方 16px；纯 `ds-list-card` / Ant List header 场景仍由内部垂直 padding 提供顶部 16px。禁止再套 `ds-card-toolbar`、额外 `marginTop`、空占位块或保留 ink-bar 下划线
- 列表卡顶部如有搜索 / 筛选 / 右侧操作按钮（如导出当前结果、批量处理、刷新当前列表），左侧必须有列表结果标题、当前结果标题或结果分类 Tab，禁止出现“左侧空白、左侧只有搜索框 / 筛选框、右侧孤立按钮”的工具栏
- 第一条列表项使用自身行内距承接工具栏下方距离，列表项统一 `padding: var(--padding) 0`（**仅垂直**）
- 使用 `antd` List / ProList 时，不得依赖组件默认 `.ant-list-item { padding: 12px 0; }` 的水平分量；须显式 `padding-inline: 0` 或由 `global-style.css` 的 `.ds-list-card .ant-list-item` 覆盖
- 若列表采用表格式多列排布（如编号、标题、状态、日期、详情操作），表头行与内容行共用同一个 `gridTemplateColumns`、`columnGap`；表格式行若有灰色表头 / 行背景，首末列须保留 16px 单元格内部留白；普通列表条目仍只保留垂直 padding
- 若列表含展开箭头 / 复选框 / 序号等行首控制项，必须把控制项作为第一列写进网格；表头第一格留空，标题从第二列开始
- 操作列须固定列宽；操作链接使用 `className="list-text-btn"` 或 `Typography.Link`
- 工具栏下方禁止再额外设置 `margin-bottom` 或 `padding-bottom`，避免与第一条列表项的顶部 padding 叠加
- 普通列表条目之间的分割线由 `.list-item-hover::after` 绘制，在 `ds-list-card` 内 `left/right: 0`（与内容同宽，不再内缩 24px）；表格式列表若行内另有 16px 单元格内边距，分割线仍铺满表格内容宽度
- 外置分页区必须使用 `className="ds-list-pagination"` 或等价 `padding: var(--padding) 0`，承担「列表到分页 16px」与「分页到底部 16px」；`ds-list-pagination` 只用于外置列表分页容器，若使用 List / ProList 内置 pagination，不得再套外置分页容器或重复写 `padding-top`
- 无分页列表必须保留底部 16px：使用 `.ds-list-bottom-spacer`，或由 `global-style.css` 的 `.ant-list.ds-list-card:not(:has(.ant-list-footer))` / `.ant-list.list-surface-card:not(:has(.ant-list-footer))` 兜底；禁止最后一条列表项贴到卡片底部
- 列表卡内嵌 Table 时：Table 首末列由 `global-style.css` 在 `.ds-list-card` 下自动保留 16px 单元格内部留白（等同 `ds-table-card-padded`），避免表头 / 行内容贴边

**实现示例**（方案 B）：

```tsx
<Card bordered={false} className="ds-list-card">
  <div className="list-card-toolbar">
    <div className="list-card-title">查询结果</div>
    <Space size={8}>
      <Button>导出数据</Button>
    </Space>
  </div>

  <List
    dataSource={data}
    renderItem={(item) => (
      <List.Item className="list-item-hover" style={{ padding: 'var(--padding) 0' }}>
        {/* 列表条目内容 */}
      </List.Item>
    )}
  />

  <Divider style={{ margin: 0, width: 'auto', minWidth: 0 }} />

  <div className="ds-list-pagination">
    {/* Pagination */}
  </div>
</Card>
```

#### 列表卡结果工具栏

当列表卡内部需要放置结果级操作时（如导出当前筛选结果、批量关闭、刷新当前列表），必须使用「左标题 + 右操作」结构，避免卡片顶部出现左侧大块空白、右侧孤立按钮。

| 场景 | 放置位置 | 左侧内容 |
| :-- | :-- | :-- |
| 影响整个页面或创建新对象（如新建、全局刷新） | PageHeader 操作组 | PageHeader 主标题承担语义 |
| 作用于当前列表结果（如导出当前筛选结果、批量处理当前选中项） | 列表卡顶部 `list-card-toolbar` | 必须显示小标题，如 `查询结果`、`工单明细`、`设备列表`；可追加 `共 N 条` |
| 无任何结果级操作 | 可省略列表卡工具栏 | 第一条列表 / 表头直接承接顶部空间 |

结构要求：

- 工具栏使用 `className="list-card-toolbar"`，只承担顶部留白和左右布局，水平留白由 `ds-list-card` 壳层统一承担
- `list-card-toolbar` 后方到列表内容必须保留 16px；使用 `global-style.css` 中 `.list-card-toolbar + .ant-list / .ds-list-content / .ds-list-table` 的兜底，不要用负 margin 或把表头贴到标题下方
- 若工具栏包含结果分类 Tab / 搜索 / 筛选 / 操作按钮，外层须使用 `ds-card-tab-strip`，Tab 左、搜索 / 筛选 / 操作右，右侧操作不得跨行；若不含 Tab，仅标题 / 搜索 / 操作按钮时使用 `ds-card-toolbar ds-card-toolbar-inline`，且左侧必须有标题。工具栏内部不得再写 `marginTop`
- 左侧标题使用 `className="list-card-title"`，字号 16px、字重 600；统计说明使用 `list-card-title-meta`
- 右侧按钮不带前置 icon，除非是纯图标的更多入口；普通导出 / 刷新 / 批量操作用文字按钮
- 禁止使用空 `<div />`、`flex: 1` 占位、负 `margin` 或 `justifyContent: flex-end` 生成左侧空白工具栏

表格式多列列表对齐示例：

```tsx
const listGridColumns = '32px minmax(280px, 1fr) 112px 120px 80px';

<div style={{ display: 'grid', gridTemplateColumns: listGridColumns, columnGap: 'var(--nav-space-4)', padding: '12px var(--padding)' }}>
  <span />
  <span>标题</span>
  <span>状态</span>
  <span>日期</span>
  <span>操作</span>
</div>
<List
  dataSource={data}
  renderItem={(item) => (
    <List.Item className="list-item-hover" style={{ padding: 0 }}>
      <div style={{ display: 'grid', gridTemplateColumns: listGridColumns, columnGap: 'var(--nav-space-4)', width: '100%', padding: 'var(--padding)' }}>
        <Button type="text" size="small" className="list-text-btn" icon={<RightOutlined />} aria-label="展开" />
        <span>{item.title}</span>
        <Tag>{item.status}</Tag>
        <span>{item.date}</span>
        <Space size={8}>
          <Button type="text" size="small" className="list-text-btn">展开</Button>
        </Space>
      </div>
    </List.Item>
  )}
/>
```

> **搜索卡**左右同为 **24px**（`padding-inline: var(--nav-space-6)`）；上下默认为 `var(--nav-space-5)`（20px）。当搜索卡使用 AntD `<Card className="ds-search-panel">` 时，padding 须落在 `.ant-card-body`，禁止只写 `.ds-search-panel { padding: ... }` 导致 Card body 仍保留 AntD 默认 padding。**当 Tab 行是搜索卡最后一行**（高级筛选未展开）时，Card body 的 `padding-bottom` 须为 **0**，Tab 导航底部分割线贴卡片底边；高级筛选展开后恢复 `padding-bottom: var(--nav-space-5)`。

#### 搜索卡 Tab 贴底间距（搜索卡 ↔ 列表卡）

当页面采用「搜索卡 + 列表卡」双卡结构，且搜索卡内布局为「搜索框 → Tab 行（贴卡片底）→ 列表卡」时，**Tab 行到首条列表内容的垂直间距须与「搜索框 → Tab 行」一致（16px，`var(--nav-space-4)`）**。

**叠加陷阱**：若同时保留搜索卡 `padding-bottom: 20px`、`.ds-page-shell` 的 `gap: 16px`、首条列表项 `padding-top: 16px`，Tab 到首条列表会叠成约 **52px**，明显大于搜索框到 Tab 的 16px。

**约定**（须同时满足，由 `global-style.css` 的 `.ds-search-panel` 承担）：

| 来源 | 规则 |
| :-- | :-- |
| 搜索卡底边 | Tab 贴底时 `.ant-card.ds-search-panel > .ant-card-body { padding-bottom: 0 }`；`:has(.ds-search-advanced-filter)` 展开时恢复 `padding-bottom: var(--nav-space-5)` |
| 双卡间距 | 由 `.ds-page-shell` 的 `gap: var(--nav-space-4)` 统一承担，无需额外 margin |
| 首条列表项 | 紧邻搜索卡的列表卡内，首条条目 `padding-top` 保持默认 `var(--padding)`（16px），与 Tab 到首条列表的总间距 = shell gap 16px + 条目 padding-top 16px = 32px；若需收紧，可内联 `padding-top: 0` |

> **禁止**：在 Tab 行下方再额外 `margin-bottom`，或与首条列表项 `padding-top` 叠加出第三层间距。搜索框到 Tab 的 16px 只由 `.ds-search-tabs-row { margin-top: var(--nav-space-4) }` 承担，搜索框 / 搜索行不得再写 `marginBottom: var(--nav-space-4)`。

#### 搜索卡内 Tab 样式（下划线，非胶囊）

搜索卡内的主分类 Tab（如平台切换、业务类型）须使用 **下划线选中态**，与表格 / 列表卡内结果分类 Tab 区分开；搜索卡 Tab 保留底部分割线和 ink-bar，字号为 **14px**。

| 状态 | 样式 |
| :-- | :-- |
| **选中** | `color: var(--color-primary)`；`font-weight: 500`；保留 antd Tabs **2px** `ink-bar` |
| **未选中** | `color: var(--color-text)`；无背景块 |
| **禁用** | `color: var(--color-text-quaternary)` |
| **底部分割线** | 保留 `.ant-tabs-nav::before` 浅灰线（`var(--color-border-secondary)`） |
| **Tab 间距** | 项间 `margin-left: var(--nav-space-6)`（24px） |

**禁止**：
- ❌ 圆角胶囊 / pill 背景块（`background: var(--color-primary-bg)` + `border-radius: pill`）作为搜索卡 Tab 选中态
- ❌ 去掉底部分割线后仅用背景色区分选中（搜索卡 Tab 与卡内结果分类 Tab 不是同一类，不复用 `toolbar-tabs`）

**结构示例**（`antd` `Tabs` + 右侧高级筛选）：

```tsx
<div className="ds-search-tabs-row">
  <Tabs
    className="ds-search-tabs"
    activeKey={platform}
    onChange={setPlatform}
    items={platformOptions}
  />
  <Button type="link" className="ds-search-advanced-filter-btn">
    高级筛选 <DownOutlined />
  </Button>
</div>
```

> 样式类名与 `global-style.css` 中 `.ds-search-tabs-row` / `.ds-search-tabs` / `.ds-search-advanced-filter-btn` 对应；搜索卡容器加 `className="ds-search-panel"`。

> 表格页工具栏 / Table 首末列 / 分页的左右 **24px** 是白色卡片内部内容线；页面级 PageHeader 仍继承 Content 留白并与卡片外缘对齐，见 [`components_Table.md` §表格样式规范](components_Table.md#表格样式规范)、[`layout.md` §页面内容水平对齐](layout.md#页面内容水平对齐)。

#### 内部分隔规则

- **跨语义段之间** → 拆成两张 Card（不再用 Divider）
- **同语义段内的次级分隔**（列表条目之间、列表与分页之间）→ 条目间用 `.list-item-hover::after`；列表与分页之间用 `<Divider/>`，**方案 B 下不再 `marginInline` 内缩**（壳层已承担 24px）：

  ```tsx
  <Divider style={{ margin: 0, width: 'auto', minWidth: 0 }} />
  ```

> **要点**：必须设 `width: 'auto'` + `minWidth: 0`，覆盖 antd 默认 `min-width: 100%`；**禁止**在 `ds-list-card` 内再加 `marginInline: var(--nav-space-6)`，否则会内缩成 48px。表格式列表的 16px 单元格内边距（`var(--padding)`）只能加在 header / row 内容层，不加在 Divider 上。

#### 列表条目内部布局（带封面/缩略图场景）

适用于「竖排样式列表」「带封面的查询列表」等左文右图布局——文本主区高度不定，右侧封面图固定比例。

**几何目标**：
- 壳层 `ds-list-card` 承担水平 **24px**；条目内层只设**垂直** padding（上 16px / 下 16px，`var(--padding)`）
- 封面图 / 缩略图作为列表项右侧 `media` / `extra` 预览时，必须相对整条列表项**上下垂直居中**，不得贴顶部或贴底部；条目上下留白仍由列表项 `padding: var(--padding) 0` 承担
- 封面图**保持固定比例**，不允许被拉伸/裁切
- 文本主区高度增长时，封面图仍在条目内容高度中线附近，避免第一条 / 第二条因文本行数不同产生忽上忽下的视觉跳动

**实现模式**（外层 stretch + 内层 center + 固定尺寸图盒）：

```tsx
<List.Item className="list-item-hover" style={{ padding: 'var(--padding) 0' }}>
  <div
    style={{
      display: 'flex',
      gap: 'var(--nav-space-6)',
      alignItems: 'stretch',
      width: '100%',
    }}
  >
  {/* 左：文本主区（高度不定） */}
  <div style={{ flex: 1, minWidth: 0 }}>{/* 标题、标签、描述、meta、操作行 */}</div>

  {/* 右：封面外层容器——垂直居中 */}
  <div
    className="ds-list-item-media"
    style={{
      width: 200,
      alignSelf: 'stretch',           // 关键 2：高度跟随文本主区
      flexShrink: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',       // 关键 3：把图盒放在条目垂直中线
    }}
  >
    {/* 内层固定尺寸图盒——保持 200×140 原始比例 */}
    <div
      className="ds-list-item-media-box"
      style={{
        width: 200,
        height: 140,
        borderRadius: 'var(--nav-radius-md)',
        overflow: 'hidden',
        background: 'var(--nav-color-primary-bg)',
      }}
    >
      <img
        src={cover}
        alt={title}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
    </div>
  </div>
  </div>
</List.Item>
```

**关键要点**：
- 必须**双层容器**：外层 `alignSelf: stretch` 撑高，内层固定 `width × height` 保比例。**禁止**把 `width/height/borderRadius/overflow` 直接写在 stretch 容器上——会让 `<img>` 被拉到容器高度，按 `objectFit: cover` 裁切，导致**视觉比例失真**
- `align-items` 必须用 `stretch`（不能用 `flex-start`），否则封面容器拿不到文本主区的高度，无法做垂直居中
- 三个属性必须同时设：`alignSelf: 'stretch'` + `flexDirection: 'column'` + `justifyContent: 'center'`，缺一不可

**常见反例**：
- ❌ 把 `width/height` 写在 stretch 容器上 → 图片被拉伸，比例失真
- ❌ 用 `alignItems: 'flex-start'` + 固定 `height: 140` → 文本主区高度大于 140 时，配图悬在顶部，底部留大段空白
- ❌ 用 `marginTop: 'auto'` 在内层图盒上做底对齐 → 会让配图贴近条目下沿，列表项上下重心不稳；推荐外层 `justifyContent: center`

#### 阴影与背景 Token（必须遵守）

- 内容卡片阴影：`var(--shadow)`（页面白色业务区块统一轻投影）——**禁止**直接用 `--nav-shadow-dropdown`，否则底部黑边明显，把页面压沉
- 页面级业务卡（搜索卡、列表卡、表格卡、指标卡、图表卡）默认无描边：`border: 0` + `box-shadow: var(--shadow)`；禁止依赖 AntD Card 默认 `bordered` 描边表达层级
- 页面兜底色：`var(--nav-color-bg-layout)`（`#f0f2f5`）——**禁止**用 `--nav-color-bg-canvas`（`#f7f8fa`）做兜底，灰度不够白色 Card 飘不起来
- Card 内弱底块（hover、筛选面板）：`var(--nav-color-bg-canvas)`——和页面兜底色严格分层
- 对象选择卡 / 卡片列表项可保留细描边作为交互状态，但不得替代页面级白卡投影

#### 常见反例

1. ❌ 把 PageHeader 包进 Card → 标题被边框二次包裹，视觉过重
2. ❌ 单卡装下"搜索 + 列表 + 分页" → 区块语义混在一起、视觉拥挤
3. ❌ 内容 Card 用 `--nav-shadow-dropdown` → 底部黑边明显，把卡片压沉
4. ❌ 用 `--nav-color-bg-canvas` 同时做"页面底色"和"hover 弱底块" → 灰度不够，Card 边界感丢失
5. ❌ 列表条目外包 Card → 卡中卡，破坏层级
6. ❌ 带封面的列表条目把 `width/height` 写在 `alignSelf: stretch` 的容器上 → 图片被拉伸，比例失真（详见「列表条目内部布局」）
7. ❌ 列表卡已加 `ds-list-card` 但条目 / 分页仍写 `padding-inline: 24px` → 水平叠成 48px
8. ❌ 列表卡未加 `ds-list-card` 且条目只有垂直 padding → 内容贴到 Card 边缘
9. ❌ 搜索卡 Tab 贴底仍保留 `padding-bottom: 20px` + PageShell `gap: 16px` + 首条 `padding-top: 16px` → Tab 到首条列表约 52px，大于搜索框到 Tab 的 16px
10. ❌ 搜索卡 Tab 使用圆角胶囊背景块选中 → 与下划线 Tab 规范不符；应使用 `ds-search-tabs`（ink-bar + 底部分割线）
11. ❌ 高风险 / 告警 / 紧急 / 今日 / 最新 / 默认等业务语义让列表项整条铺色或默认选中 → 业务语义只在对应字段内用 Tag / Badge / 圆点 / 次要文本表达

---

## 1. 基础列表 (Basic List)

> **适用场景**：适用于需要以列表形式展示结构化数据的通用场景，每条数据包含标题、描述、状态、标签和操作等基本信息。例如："项目列表"、"任务列表"等标准业务数据展示场景。

> **重要**：此组件可使用 `@ant-design/pro-components` 的 `ProList`，或基于 `antd` 原生 `List` 实现。

**约束**：
- 使用 `columns` + `listSlot` API（ProList），或使用 `dataSource` + `renderItem`（antd List）
- 状态字段使用 Tag 组件预设语义颜色值，禁止写死 hex 颜色
- 操作区域使用文字链接，不加图标
- 分页默认每页 10 条，如需跳转器自行配置

**代码模板**：`scripts/list/01-BasicList.tsx`


---

## 2. 编辑列表 (Edit List)

> **适用场景**：编辑列表是高级列表的一种类型，包含了基础信息呈现和编辑功能，满足用户在浏览、查看信息的同时，可以即时修改列表中已有的属性内容，即时保存&更新列表信息，以适应动态变化需求。例如：编辑"名称和描述"内容等，编辑时可操作"保存/删除/取消"。

> **重要**：此组件可使用 `@ant-design/pro-components` 的 `ProList`，或基于 `antd` 原生 `List` 实现。

**约束**：
- 使用 `columns` + `listSlot` API（ProList），或使用 `dataSource` + `renderItem`（antd List）
- 编辑功能：ProList 通过 `editable` 配置 + `onSave` 回调实现；antd List 可用 `useState` + 条件渲染实现
- `editable: false`（ProList）或等效手段标记不可编辑字段（如 `avatar`）
- 状态字段使用 Tag 组件预设语义颜色值，禁止写死 hex 颜色
- 操作区域使用文字链接，通过 `action?.startEditable(row.id)`（ProList）或等效方式触发编辑

**代码模板**：`scripts/list/02-EditList.tsx`


---

## 3. 带工具栏的列表 (List with Toolbar)

> **适用场景**：在基础列表基础上，提供一个集中、可见的操作区域（即工具栏），如 Tab 标签进行列表分组、全局搜索、筛选、新建等操作，提升列表的交互效率，满足业务多样化需求。适用于需要对相同结构的数据进行集中的管理、查阅，如分组、筛选、新建等，数据量大、筛选条件多、复杂的场景。

> **重要**：此组件可使用 `@ant-design/pro-components` 的 `ProList`，或基于 `antd` 原生 `List` 实现。

**约束**：
- 使用 `columns` + `listSlot` API（ProList），或使用 `dataSource` + `renderItem`（antd List）
- 工具栏：ProList 通过 `toolbar` 配置实现（包括 `menu`、Tab 标签切换、`search`、`actions`）；antd List 可在 `header` / `footer` 中自定义工具栏
- Tab 标签的 `activeKey` 通过 `useState` 控制，`onChange` 回调切换
- 状态字段使用 Tag 组件预设语义颜色值，禁止写死 hex 颜色
- 操作区域使用文字链接，不加图标
- Badge 颜色使用主题色，禁止写死 hex 值

**代码模板**：`scripts/list/03-ToolbarList.tsx`


---

## 4. 支持展开的列表 (Expandable List)

> **适用场景**：列表信息量大，对列表信息进行主次划分，通过收起展开方式渐进式呈现更多信息，方便用户按需查看所需信息，同时不占据太多空间。适用于需要展示有"主-从"关联数据的、信息量大的场景，优先呈现主要信息，同时保留对次要信息的轻量快捷查看&展示。例如："人才列表与人才面试进度"、"岗位列表与岗位详情要求"。

> **重要**：此组件可使用 `@ant-design/pro-components` 的 `ProList`，或基于 `antd` 原生 `List` 实现。

**约束**：
- 使用 `columns` + `listSlot` API（ProList），或使用 `dataSource` + `renderItem`（antd List）
- 展开功能：ProList 通过 `expandable` 配置实现，`expandedRowKeys` 和 `onExpandedRowsChange` 通过 `useState` 控制受控展开；antd List 可手动控制展开收起状态
- **展开补充内容**：`expandable.expandedRowRender`（或等价容器）内的正文与辅助说明等文案 **左对齐**（`text-align: left`）
- 状态字段使用 Tag 组件预设语义颜色值，禁止写死 hex 颜色
- 操作区域使用文字链接，不加图标
- 进度展示使用 `Progress` 组件 + 百分比数值，禁止手动绘制进度条

**代码模板**：`scripts/list/04-ExpandableList.tsx`


---

## 5. 支持选中的列表 (Selectable List)

> **适用场景**：对列表项进行批量选中（标记一个或者多个选项），从而唤起相关批量操作，减少用户重复操作次数。适用于需要支持快速、批量对列表全部或者部分对象进行集中的、相同的明确指定的操作的场景，例如："批量删除历史记录"、"人员信息中，需要对某个人群进行批量发送邀请"等。

> **重要**：此组件可使用 `@ant-design/pro-components` 的 `ProList`，或基于 `antd` 原生 `List` 实现。

**约束**：
- 使用 `columns` + `listSlot` API（ProList），或使用 `dataSource` + `renderItem`（antd List）
- 行选择：ProList 通过 `rowSelection` 配置实现，`selectedRowKeys` 通过 `useState` 管理；antd List 可用 Checkbox 手动实现选中，单选 `type: 'radio'`，多选 `type: 'checkbox'`（默认）
- 状态字段使用 Tag 组件预设语义颜色值，禁止写死 hex 颜色
- 操作区域使用文字链接，不加图标

**代码模板**：`scripts/list/05-SelectableList.tsx`


---

## 6. 查询列表 (Query List)

> **适用场景**：对列表呈现信息筛选过滤，每一次筛选过滤行为需要与服务端进行交互，而非即时性呈现结果，需要先设置多个筛选条件，一次性提交，从而获取查询结果，以便精准筛出所查找的目标数据。适用于需要与服务端进行交互，无法即时对列表信息进行过滤呈现的场景，如"需要从人员列表中查询某个人员的信息"。

> **重要**：此组件可使用 `@ant-design/pro-components` 的 `ProList`，或基于 `antd` 原生 `List` 实现。

**约束**：
- 使用 `columns` + `listSlot` API（ProList），或使用 `dataSource` + `renderItem`（antd List）
- 搜索/查询：ProList 通过 `search={{}}` 配置开启，搜索条件通过 `columns` 中 `valueType: 'select'` 等配置；antd List 可手动实现筛选表单 + 数据请求
- 数据获取：ProList 通过 `request` 属性从服务端获取，支持 `params` 参数传递查询条件；antd List 可自行实现数据请求逻辑
- 状态字段：ProList 使用 `valueEnum` 配置；antd List 可通过对象映射禁止手写 Tag 颜色逻辑
- 操作区域使用文字链接，不加图标
- 分页如需跳转器自行配置
- 查询表单**单独成一张「搜索卡」**，与「列表卡」分离（详见上方「页面容器结构 - 三段式分组」）；**禁止**把查询表单和列表数据塞进同一张白色卡片
- 搜索卡容器加 `className="ds-search-panel"`；Tab 贴底时与列表卡间距、首条列表项顶距见上方「搜索卡 Tab 贴底间距」
- 搜索卡内可包含：搜索框 / Tab 切换 / 高级筛选触发与展开面板；高级筛选展开面板加 `className="ds-search-advanced-filter"`，底色用 `var(--nav-color-bg-canvas)`，与外层兜底 `--nav-color-bg-layout` 形成层级
- 搜索卡内主分类 Tab 使用 **下划线选中态**（`className="ds-search-tabs"`），**禁止**圆角胶囊背景块；详见「搜索卡内 Tab 样式」
- **高级筛选入口按钮**：使用 `<Button type="link" className="ds-search-advanced-filter-btn">`，**不带前置 icon**，文案右侧追加方向箭头（收起态用 `<DownOutlined />`、展开态用 `<UpOutlined />`），通过箭头方向切换暗示当前状态；样式 `paddingInline: 0`，避免与搜索卡右内边距重复留白

**代码模板**：`scripts/list/06-QueryList.tsx`


---

## 7. 竖排样式列表 (Vertical List)

> **适用场景**：列表需要呈现大量信息，将所有信息（含文字、图片、标签、长文本描述、相关数字等）按照一定的信息组织方式，全部呈现出来，侧重突出内容的丰富度，引导用户按照一定浏览顺序阅读。适用于需要将大量多元化信息（如图片、文本、标签等）按照一定分类全部呈现的场景，强调展示型，例如："运营类-内容广场"等。

> **重要**：此组件可使用 `@ant-design/pro-components` 的 `ProList`，或基于 `antd` 原生 `List` 实现。

**约束**：
- 使用 `columns` + `listSlot` API（ProList），或使用 `dataSource` + `renderItem`（antd List）
- 竖排布局：ProList 通过 `itemLayout="vertical"` 配置实现；antd List 可手动实现竖排布局
- 插槽分配：ProList 用 `listSlot.aside` 放右侧大图、`listSlot.content` 放长文本描述；antd List 可手动分配内容到各区域
- 标签使用 Tag 预设语义颜色，数量不超过 3 个
- 底部统计区：采用行内 SVG（`stroke: currentColor`，尺寸 16×16），与文案间距 `6px`，整体区间距 `24px`，颜色 `rgba(0,0,0,0.45)`
- **右侧封面图布局**：必须遵循「页面容器结构 - 列表条目内部布局」节的「外层 stretch + 内层 center + 固定尺寸图盒」三层模式——封面图相对整条列表项上下居中、图片保持原始比例（200×140 或同等比例），不可直接把 `width/height` 写在 stretch 容器上

**代码模板**：`scripts/list/07-VerticalList.tsx`


---

## 8. 卡片列表 (Card List)

> **适用场景**：网格布局无特定浏览顺序，采用卡片的样式，将信息在固定卡片中呈现出来，每个对象拥有更平等的展示机会，突出对象本身。卡片里展示文本信息、状态、进度和操作，卡片本身支持点击、选中、取消选中等。适用于强调展示型，需要突出每个对象内容本身时使用，不强要求引导用户阅读顺序，例如："应用卡片"等。

> **重要**：此组件可使用 `@ant-design/pro-components` 的 `ProList`，或基于 `antd` 原生 `Card` + `List` 实现。

**约束**：
- 使用 `columns` + `listSlot` API（ProList），或使用 `dataSource` + `renderItem`（antd List）
- 卡片网格布局：ProList 通过 `grid` 配置实现，如 `grid={{ gutter: 16, column: 2 }}`；antd List 可用 CSS Grid / Flex 实现卡片网格
- 行选择：ProList 通过 `rowSelection` 配置实现；antd 可手动实现卡片选中状态
- Card List 仅规定网格、卡片外观、Card body 留白、hover / selected 状态；卡片内部业务信息结构由具体场景自定义
- `card-item` 是对象选择卡，允许保留细描边表达可选 / 选中状态，但内容区仍遵循页面级卡片规则：Card body 上下 `var(--padding)`（16px）、左右 `var(--nav-space-6)`（24px）；不得依赖 AntD Card 默认 padding，也不得单独增大 `padding-top` / `padding-bottom` 为业务内容、操作按钮、角标或状态浮层让位
- 状态字段使用 Tag 组件预设语义颜色值，禁止写死 hex 颜色
- 卡片标题区如同时存在标题、发布状态 Tag、分类 Tag 和右侧操作按钮，发布状态 / 分类这类紧凑 Tag 可以紧跟标题同一行展示，不要强制另起一行；标题与紧凑 Tag 必须放在可收缩标题组内，右侧按钮放在独立操作区，操作区 `flex: 0 0 auto` / `white-space: nowrap`，标题文本 `min-width: 0` + `text-overflow: ellipsis`，Tag `flex: 0 0 auto`，禁止长标题或多个 Tag 挤压右侧「编辑 / 安装 / 文档」等操作按钮；若标签数量过多或文案较长，只保留 1–2 个关键 Tag 在标题行，其余放入次级 meta 行或底部标签区；该标题行布局属于卡片列表模板局部结构，不要求新增 `global-style.css` 类，复用时可在模板内 inline 或抽局部组件 / CSS Module
- 操作区域使用文字链接，不加图标
- 分页如需切换器自行配置
- 业务场景可使用 `.xxx-card` 扩展内部样式，但应保留 Card List 外壳的 padding、border、radius、shadow 与状态规则
- **Hover 投影**：hover 用 `var(--nav-shadow-card-hover)`（`0 2px 6px -1px rgba(0,0,0,0.10), 0 4px 12px rgba(0,0,0,0.08)`）配合 `translateY(-2px)` 浮起；**保持默认描边**（`--color-border-secondary`），**禁止** hover 时切换为主题色描边；**禁止** `--shadow` / `--shadow-hover` / `--nav-shadow-dropdown` 及主题色光晕双层叠加

**代码模板**：`scripts/list/08-CardList.tsx`
