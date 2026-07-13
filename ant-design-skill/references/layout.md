# 页面布局 (Layout)

本文件收录企业级中后台产品的页面布局规范，包含导航框架、主内容区布局、页面区块间距和各布局的适用场景、约束规则。

## 目录

- [布局共性规则](#布局共性规则)
- [导航共性规则](#导航共性规则)
- [1. 侧边导航（SideLayout）](#1-侧边导航-sidelayout)
- [2. 顶部导航（TopLayout）](#2-顶部导航-toplayout)
- [3. 混合导航（MixedLayout）](#3-混合导航-mixedlayout)

---

## 布局共性规则

以下规则适用于本文件所有页面布局的内容容器、页面区块、动画、字体、层级与响应式行为，各组件不再重复说明。

页面说明提示条属于页面级布局能力，跨表格 / 表单 / 列表 / 图表等页面类型统一见本节「页面说明提示条」。

### 设计原则

- 页面框架服务于高频操作、信息扫描和稳定定位，不作为装饰性视觉元素使用
- 导航负责系统定位与功能切换，主内容区负责承载业务任务，两者职责不得混用
- 布局复杂度优先通过信息架构、分组和导航层级解决，不通过额外背景、光效或装饰卡片堆叠解决
- 不得为了“美化”改变既定导航结构、背景、动效、状态色、间距或模板 DOM
- 所有视觉参数优先来自 `references/global-style.css` 与本文件约定的 CSS 变量；文档中的 hex / rgba 当前值仅作说明，模板不得硬编码

### 布局结构不变量

- 根容器必须撑满视口高度，页面背景由 `var(--nav-color-bg-canvas)` 统一承载
- 导航层负责固定定位与层级控制，主内容区根据导航高度、侧边栏宽度同步偏移
- SideLayout / MixedLayout 含侧边栏时，主内容区必须随侧边栏 208px / 64px 宽度变化同步调整
- 页面滚动应发生在主内容区或业务内容容器内，顶部导航、侧边栏和收起触发器不得随内容滚动漂移
- 同一页面不得同时混用两套导航结构；只能从 SideLayout、TopLayout、MixedLayout 中选择一种

#### 新项目 vs 存量项目的导航生成规则

生成前必须先判断交付边界，避免 0 到 1 新项目缺少导航，也避免在存量项目里重复生成第二套导航。

- **0 到 1 新建中后台应用 / 平台 / 系统**：默认必须生成导航布局与主内容区；按本文件导航选择规则从 SideLayout、TopLayout、MixedLayout 中选择一种
- **已有项目新增页面 / 模块**：先复用项目现有 Layout / 导航 / 路由壳，只生成主内容区；禁止重复生成顶部导航、侧边栏、用户区或全局搜索
- **已有项目但没有导航壳**：若需求属于管理后台、平台、控制台、企业管理系统等系统级页面，应补充导航布局；若只是组件、弹窗、区块或嵌入内容，不强制补导航
- **用户明确要求单页 demo / 裸页面 / 局部组件 / 嵌入模块**：按用户边界交付，不强制生成导航，但主内容区仍须遵循页面背景、留白、卡片、标题和 Design Token 规则
- **禁止事项**：不得在同一页面同时生成两套导航；不得把业务页面标题误当成导航；不得因只生成一个看板页就省略 0 到 1 中后台应用所需的导航壳

### 主内容区规范

- 内边距：`var(--nav-space-6)` (24px)
- 最小高度：`calc(100vh - var(--nav-header-height))`
- 背景：`var(--nav-color-bg-canvas)`，与导航背景保持一致
- 过渡动画：侧边栏收起/展开时，内容区 `margin-left` 同步变化

#### 页面标题唯一来源

菜单名称用于导航定位，页面标题用于说明当前业务任务，二者不得默认绑定。

- `SideLayout` / `MixedLayout` 只负责导航框架、侧边栏、内容区偏移与收起展开，不应自动把 `activeMenu` 渲染成业务页面主标题
- **默认**：业务页面自己渲染页面总标题，统一使用 `.ds-page-header`
- **可选**：布局壳可通过显式 `pageTitle` / `pageSubtitle` 渲染兜底页面总标题
- 业务页面 `.ds-page-header` 与布局壳 `pageTitle` / `pageSubtitle` **只能二选一**；同一页面只能有一个主标题来源
- 若确需布局层渲染标题，必须通过显式 `pageTitle` / `pageSubtitle` 等 props 传入；禁止直接使用当前菜单名生成 `<h1>` / `Title`
- 两种标题来源的视觉必须完全一致，均使用 `.ds-page-header` + `<Title level={4} className="ds-page-title">`
- 禁止同时在布局层和业务页面层各写一个主标题，避免出现「导航菜单名 + 页面任务名」重复堆叠
- 禁止用原生 `<h1>` / `<p>` 拼页面总标题；禁止把 `className="ds-page-title"` 挂在外层 `div` 上

#### 页面总标题 DOM 结构

页面总标题固定使用以下结构。右侧全局操作、轻量统计或辅助说明放入 `ds-page-header-extra`；没有右侧内容时可省略该 `Space`。

```tsx
<div className="ds-page-header">
  <Space direction="vertical" size={4}>
    <Title level={4} className="ds-page-title">工单列表</Title>
    <Text type="secondary">一屏完成日常巡检与批量处置</Text>
  </Space>
  <Space className="ds-page-header-extra">...</Space>
</div>
```

禁止生成以下错误结构：

```tsx
<div className="ds-page-title">
  <h1>工单列表</h1>
  <p>...</p>
</div>
```

#### Pro PageContainer（嵌入 ProLayout 时）

ProComponents 在 ProLayout 场景下会在 **三层**叠加默认 padding（均为 `padding-inline: 40px`），与上文 **24px** 对齐线冲突：

| 层级 | 选择器 | Pro 默认 |
| :-- | :-- | :-- |
| ProLayout 内容区 | `.ant-pro-layout-content` | 左右 40px、上下 32px |
| PageContainer 内置标题 | `.ant-pro-page-container-warp-page-header`、`.ant-page-header` | 左右 40px |
| PageContainer 子内容 | `.ant-pro-page-container-children-container` | 左右 40px、底 32px |

**处理**（已写入 `global-style.css`，**生成页面必须在入口引入**，否则仍会看到 40px 绿边）：

```css
.ant-pro-layout-content,
.ant-pro-page-container-children-container,
.ant-pro-page-container-children-container-no-header,
.ant-pro-page-container-warp-page-header,
.ant-pro-page-container .ant-page-header {
  padding-inline: 0 !important;
}

.ant-pro-layout-content,
.ant-pro-page-container-children-container,
.ant-pro-page-container-children-container-no-header {
  padding-block: 0 !important;
}

.ant-pro-page-container-warp-page-header,
.ant-pro-page-container .ant-page-header {
  padding-block-start: 0 !important;
  padding-block-end: 0 !important;
}
```

**生成约束**：

- 页面留白只由主内容区 `<Content>` / `.content` 的 `padding: var(--nav-space-6)` 与业务壳层（`.ds-page-shell` / `ds-page-card` / `ds-list-card`）承担
- **推荐**用 `PageShell` + `PageHeader`（`.ds-page-header`）组织标题与业务区块
- 使用 `ProLayout` + `PageContainer` 时，除引入 `global-style.css` 外，可在根节点叠加 `ProConfigProvider` token 双保险：`pageContainer.paddingInlinePageContainerContent: 0`、`paddingBlockPageContainerContent: 0`
- 使用 `ProLayout` / `PageContainer` 生成一级入口页时，必须关闭默认面包屑，例如 `breadcrumbRender={false}`；只有业务页面明确是下钻 / 详情 / 编辑 / 流程语义时，才允许显式渲染 Breadcrumb

#### 页面区块间距

主内容区内的页面级模块必须使用 token 控制间距，避免随手写非体系化数值。

- 页面标题区与首个业务区块之间：`var(--nav-space-4)` (16px)，由页面壳层 `.ds-page-shell` 的 `gap: var(--nav-space-4)` 唯一承担
- PageHeader **禁止**设置 `padding-bottom` / `margin-bottom`；不得与壳层 `gap` 叠加造成双重留白
- 同级功能模块之间：默认 `var(--nav-space-4)` (16px)；模块内容复杂或视觉重量较大时使用 `var(--nav-space-5)` (20px)
- 页面大区块之间：`var(--nav-space-4)` (16px)，由页面壳层 `.ds-page-shell` 的 `gap` 统一承担
- **页面内容容器**（Card / 表单 / 图表 / 描述列表 / 表格 / 列表等业务白卡片）留白须按**水平 / 垂直分档**，见下文「[页面内容水平对齐](#页面内容水平对齐)」
- 若页面标题区下方存在页面说明提示条（`.ds-page-inline-alert`），标题区、说明条与首个业务区块之间同样使用 `var(--nav-space-4)` (16px)，由页面壳层 `.ds-page-shell` 的 `gap` 统一承担
- 禁止直接写 `marginTop: 12/18/30`、`padding: 15/22` 等非 token 数值；如需特殊间距，必须优先从 `--nav-space-*`、`--margin-*`、`--padding-*` 中选择

#### 页面内容水平对齐

页面级 PageHeader 与页面内容容器**外缘**共用同一条水平对齐线；该对齐线由 `<Content>` / `.content` 的 `padding: var(--nav-space-6)` 提供。PageHeader 默认不得再设置 `padding-inline`。Card / 表格 / 列表内部的 `padding-inline: var(--nav-space-6)` 只用于容器内部内容线，不得反向套用到页面标题区。

| 维度 | Token | 值 | 说明 |
| :-- | :-- | :-- | :-- |
| **水平（页面外缘）** | `var(--nav-space-6)` | **24px** | 由 Content 提供；PageHeader 继承该留白，与通用 Card、表单区块、图表、表格 / 列表业务卡外缘统一 |
| **水平（容器内部）** | `var(--nav-space-6)` | **24px** | 仅用于 Card / 表格 / 列表等白色内容容器内部内容线，不用于 PageHeader 叠加缩进 |
| **垂直（上下）** | `var(--padding)` | **16px** | 卡片顶 / 底、表单项区、工具栏 ↔ Table、页面大区块之间 |

**推荐写法**（通用 Card / 表单 / 图表外壳）：

```tsx
style={{
  paddingBlock: 'var(--padding)',                        // 上下 16px
  paddingInline: 'var(--nav-space-6)',                 // 左右 24px
}}
```

或使用 `global-style.css` 工具类 `className="ds-page-card"`（白色内容容器，包含背景、圆角、`var(--shadow)` 阴影与上述 padding，并清除 AntD / ProCard 默认描边）。若 `ds-page-card` 用在 AntD `Card` / ProCard 上，外层只承担白卡外观，真实内容区 padding 必须命中 `.ant-card-body` / `.ant-pro-card-body`，仍为上下 16px、左右 24px。**表格卡片**同样使用 `ds-page-card`，并**必须**叠加 `ds-table-card-padded` 清零 Table 首末列，见 [`components_Table.md`](components_Table.md)。

**禁止**：页面内容 Card 水平方向使用 `var(--padding)`（16px）。

**页面级白卡外观**：`ds-page-card`、`ds-search-panel`、`ds-list-card`、`ds-table-card`、`ds-statistic-card` 等页面业务容器统一使用白底、8px 圆角、`var(--shadow)` 轻投影，默认 `border: 0`。只有对象选择卡、可选卡片列表等交互型子卡允许使用描边表达可选 / 选中状态。

**页面级内容卡 padding 唯一来源**：普通 `div.ds-page-card` 由外层承担 `padding: 16px 24px`；AntD `Card` / ProCard / StatisticCard 场景必须把同样的 padding 打到 body 内容层。该规则适用于通用 Card、列表卡、表格卡、指标卡、图表卡、描述分组卡和对象选择卡；对象选择卡只例外描边状态，不例外内容区 padding。表单内部字段布局、StepsForm、嵌入表单弱分组与 QueryFilter 字段栅格按 `components_Form.md` 表单专属规则执行。禁止同时在外层、body、toolbar、List item、Table wrapper、Table 首末列上重复写水平 padding。

| 位置 | 水平 | 垂直 | 说明 |
| :-- | :-- | :-- | :-- |
| 主内容区 `<Content>` | **24px** | **24px** | `var(--nav-space-6)` |
| PageHeader | **0**（继承 Content 的 24px） | **0**（无 bottom padding） | 禁止设置 `padding-inline` / `padding-bottom` / `margin-bottom`；与首个业务区块间距由 `.ds-page-shell` 的 `gap` 承担 |
| 通用 Card / 表单区块 / 图表 | **24px 内部留白** | **16px**（上下一致） | Card 外缘与 PageHeader 对齐，Card 内部内容再使用 24px |
| 表格 / 列表卡内工具栏、Tab、Table 首末列、分页 | **24px 内部留白** | 见各组件 | 与通用 Card 内部内容线一致 |

完整实现（Table / 列表均默认方案 B、`ds-table-card-padded` / `ds-list-card`、ProTable `ds-table-card-with-tabs`、CSS 选择器）见 [`components_Table.md` §表格样式规范](components_Table.md#表格样式规范)、[`components_List.md` §列表卡内部留白](components_List.md#列表卡内部留白)。

#### 带面包屑的页面标题区

一级入口页默认不展示面包屑：包括菜单直接进入的列表页、表格页、看板页、查询页、配置页等。面包屑只用于存在明确上级路径、下钻来源或返回语义的页面，例如详情页、编辑页、流程页、创建页，以及从对象详情或项目空间继续下钻出的列表 / 表格页（如「应用详情 / 实例列表」「项目详情 / 发布记录」）。页面是否展示面包屑由信息架构层级决定，不由列表 / 表格 / 表单等组件形态决定。

禁止 Layout 层、ProLayout、PageContainer 根据菜单层级、`activeMenu`、`pathname` 或 route 自动生成全局面包屑。Breadcrumb 必须由业务页面显式声明；一级入口页必须关闭 ProLayout / PageContainer 默认面包屑（如 `breadcrumbRender={false}`），只保留 `.ds-page-header` 标题区。

使用 `ds-page-header ds-page-header-with-breadcrumb` 时，面包屑、标题行和下方业务卡片外缘必须共用 `<Content>` / `.content` 提供的 **24px 页面左对齐线**，不得给 `Breadcrumb` / `PageHeader` 单独设置 `padding-left`、`margin-left`，也不得包进 Card。

| 位置 | 间距 | 来源 |
| :-- | :-- | :-- |
| 内容区顶部 → 面包屑 | **24px** | 由 `<Content>` / `.content` 的 `padding: var(--nav-space-6)` 提供，不在 PageHeader 内重复设置 |
| 面包屑 → 标题行 | **8px** | `.ds-page-header-with-breadcrumb { gap: var(--nav-space-2) }` |
| 标题行 → 首个业务区块 | **16px** | `.ds-page-shell { gap: var(--nav-space-4) }` 统一承担 |

Breadcrumb 必须使用 `/` 分隔，AntD 写法固定 `separator="/"`。右侧全局操作、轻量统计或辅助说明必须放在标题行右侧 `ds-page-header-extra`，与标题行同一行上下居中并靠右；不得放到面包屑行，也不得在标题与业务卡片之间单独插入汇总条。下例表示从上级对象或上级页面进入当前页，不代表一级菜单页需要面包屑。

```tsx
<div className="ds-page-header ds-page-header-with-breadcrumb">
  <Breadcrumb
    className="ds-page-breadcrumb"
    separator="/"
    items={[
      { title: '应用列表' },
      { title: '应用详情' },
      { title: '实例列表' },
    ]}
  />

  <div className="ds-page-title-line">
    <div className="ds-page-title-main">
      <Title level={4} className="ds-page-title">发布流程详情页</Title>
      <Text className="ds-page-title-suffix">辅助说明</Text>
    </div>

    <Space className="ds-page-header-extra" size={8}>
      <Text type="secondary">待审批 5 条 · 合计 ¥24,910.50</Text>
      <Button type="primary">批量通过</Button>
    </Space>
  </div>
</div>
```

**页面主标题 typography**：

| 属性 | Token / 值 | 说明 |
| :-- | :-- | :-- |
| 字号 | `var(--font-size-heading-4)` | **20px** |
| 行高 | `calc(var(--font-size-heading-4) + 8px)` | **28px** |
| 颜色 | `var(--nav-color-text-active)` | 由 `.ds-page-header .ds-page-title` / `.ds-page-title-row .ds-page-title` 提供 |

须放在 `.ds-page-header`、`.ds-page-title-row` 或 `.ds-page-title-main` 内，并配合 `<Title level={4} className="ds-page-title">` 使用；**禁止**复用到卡内标题、表格标题、区块标题（分别使用 `ds-table-title` 等专用类）；禁止在页面层单独写死 `font-size`。

#### 页面标题区 extra

页面标题区右侧 `extra` 用于放置**全局操作按钮**与**轻量统计文案**（如待办条数、筛选合计、当前口径摘要），与标题、副标题同一行展示。

| 判断条件 | 是否放 extra | 说明 |
| :-- | :-- | :-- |
| 重置、新建、导出、批量操作等按钮 | **放 extra** | 主操作与次操作使用 `Space` 排列 |
| 待办数量、合计金额等 1～2 项轻量数字 | **可放 extra** | 使用 `Text type="secondary"` + `strong` 强调数字；**禁止**占用工具栏与表格之间的独立汇总条 |
| 勾选行后的批量反馈 | **不放 extra** | 使用 `components_Table.md` §批量操作提示条 |
| 需常驻大段说明或规则 | **不放 extra** | 使用 §页面说明提示条 |

> 列表页工具栏与表格之间禁止插入汇总条，见 [`components_Table.md` §工具栏与表格之间禁止插入汇总条](components_Table.md#工具栏与表格之间禁止插入汇总条)。

#### 页面标题同行后缀（titleSuffix）

适用于看板 / 监控页等需在**主标题右侧**紧跟一句轻量元信息（如「数据 T+1 更新、每天上午 9 点刷新」）的场景，与副标题、页面说明提示条分工如下：

| 信息类型 | 推荐位置 | 说明 |
| :-- | :-- | :-- |
| 一句刷新策略 / 延迟口径 | **标题同行后缀** | 与 Title baseline 对齐，`Text type="secondary"`，字号 `var(--font-size-sm)` |
| 页面用途 / 操作指引（一行） | **副标题**（Title 下方） | 独立第二行，不与标题挤在同一行 |
| 业务规则 / 匹配逻辑（需常驻） | **页面说明提示条** | 见 §页面说明提示条 |
| 重置 / 导出等操作 | **extra** | 见上节 |

**结构示意**：

```tsx
<div className="ds-page-title-row">
  <Title level={4} className="ds-page-title">运营数据看板</Title>
  <Text type="secondary" className="ds-page-title-suffix">
    数据 T+1 更新、每天上午 9 点刷新
  </Text>
</div>
```

- `ds-page-title-row`：`display: flex; align-items: baseline; gap: var(--nav-space-3); flex-wrap: wrap`
- `ds-page-title`：仅允许出现在 `.ds-page-header` / `.ds-page-title-row` 内；`var(--font-size-heading-4)`（20px），行高 28px，颜色 `var(--nav-color-text-active)`；须配合 `<Title level={4}>`；禁止复用到卡内 / 表格 / 区块标题
- `ds-page-title-suffix`：次要色、`var(--font-size-sm)`，**不得**使用副标题字号或加粗
- 禁止把刷新策略写成副标题后又重复出现在页面说明提示条中

#### 嵌入表单宽面板扩展

适用于 `components_Form.md` §4 嵌入模式表单中的宽面板增强形态。与通用页面区块间距的关系：

| 位置 | Token | 值 | 对应 class |
| :-- | :-- | :-- | :-- |
| 表单 PagePanel 外圈 | `--padding-lg` | 24px | `.embed-form-page-panel` |
| 每个大区块 Card 内 | `--padding-lg` | 24px | `.embed-form-section` |
| 左侧 Anchor ↔ 右侧表单 | `--nav-space-6` | 24px | `.embed-form-layout` 的 `gap` |
| Group 内双列间距 | `--nav-space-6` | 24px | Grid `column-gap` |

**禁止**：Anchor 导航容器使用 `border-right` 等与表单区的竖线分隔；区块间仅用 Token 间距区分。

#### 页面说明提示条

页面级说明提示条（Page Info Alert）可用于**任意页面类型**（表格、列表、表单、图表、描述列表等），但它是**可选增强，不是默认页面结构**。生成页面时默认省略；只有存在非显而易见的业务规则、操作风险、审批 / 生效时机，或用户明确要求说明条时才生成。与表格专属的「批量操作提示条」（见 `components_Table.md` § 批量操作提示条）职责不同，**不得混用**。

**页面信息层级**（自上而下）：

```
页面标题区（Title + 副标题）
    ↓  var(--nav-space-4)（16px），与同级模块间距一致
[可选] 页面说明提示条（info，可关闭）
    ↓  var(--nav-space-4)（16px）
[可选] 动态反馈区（如生效顺序预览、统计口径摘要）——业务相关，非共性组件
    ↓  var(--nav-space-4)（16px）或 var(--nav-space-5)（20px，视视觉重量）
业务区块（表格 / 表单 / 图表 / 列表 / 描述列表 Card…）
```

**何时使用**

| 判断条件 | 是否使用 | 说明 |
| :-- | :-- | :-- |
| 页面含非显而易见的匹配 / 审批 / 生效规则 | **使用** info 条 | 如告警优先级、审批流顺序、配置生效范围 |
| 页面副标题已一句话概括全部规则 | **省略** info 条 | 避免与副标题重复堆叠 |
| 页面用途、数据来源、刷新频率、更新时间 | **不用 Alert** | 放页面副标题或标题同行后缀 |
| 普通查询说明、筛选条件说明 | **不用 Alert** | 由筛选表单 label / placeholder / 按钮语义承担 |
| 统计数量、风险数量、待办数量 | **不用 Alert** | 放 PageHeader extra、工具栏文字或指标卡 |
| 字段解释、指标解释 | **通常不用 Alert** | 放字段 tooltip、说明文案或详情说明 |
| 当前操作暂时受限 | **使用** warning 条 | 如筛选模式下不可拖拽排序；位于工具栏与业务区块之间 |
| 需展示实时变化的数据反馈 | **不用 Alert** | 使用独立预览 Card / 文本区，与静态说明条分离 |

**类型选型**

| 类型 | `Alert` type | 位置 | 何时出现 | 是否可关闭 |
| :-- | :-- | :-- | :-- | :-- |
| **页面说明** | `info` | 页面标题下方 | 常驻（用户关闭前） | **可关闭**（`closable`） |
| **操作约束** | `warning` | 工具栏下方或受限操作区上方 | 仅操作受限时 | 不可关闭；条件消失后自动隐藏 |

**文案结构**（info 条，`message` 单行，**禁止** `message` + `description` 双行堆高）：

1. **业务规则** — 匹配 / 生效 / 统计口径（一句）
2. **操作指引** — 如何调整（一句，分号衔接）
3. **生效说明** — 保存 / 提交后何时生效（一句，可省略若显而易见）

示例（告警治理）：`告警按列表自上而下匹配，序号越小越优先；拖拽左侧手柄调整顺序，保存后生效。`

**长文案处理**：

- 页面说明提示条必须保持单行紧凑，高度约 38px；长文案通过 `white-space: nowrap; overflow: hidden; text-overflow: ellipsis` 省略
- 若说明超过一行才能表达清楚，应拆分到页面副标题、独立说明 Card / 抽屉帮助中；**不得**用 Alert `description` 或 `<br />` 把提示条撑成两行
- 关闭按钮与图标必须垂直居中；禁止因为文案换行导致关闭按钮贴顶或图标偏上

**样式规范**

| 样式属性 | 值 | 实现方式 |
| :-- | :-- | :-- |
| 布局 | 单行紧凑 | 仅 `message`，禁止 `description` |
| 内边距 | `8px 12px` | `className="ds-page-inline-alert"`（见 `global-style.css`） |
| 高度 | 约 38px | 单行行高 22px + 上下 8px |
| 长文案 | 单行省略 | `.ant-alert-message` 需 `min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis` |
| 文案字号 / 行高 | 14px / 22px | `.ds-text-main` |
| 图标与文案 | 垂直居中 | `.ds-page-inline-alert` 内置 `align-items: center` |
| 与标题区 / 首个业务区块间距 | `var(--nav-space-4)`（16px） | 页面壳层 `.ds-page-shell` 的 `gap: var(--nav-space-4)` 统一承担 |

**交互规范**

- info 条默认 **`closable`**；关闭状态可持久化（如 `localStorage`），避免老用户每次进入重复打扰
- 关闭后，在页面**副标题**末尾提供 **`Button type="link"`**「查看说明」入口，便于新人或误关用户恢复
- warning 条仅在约束条件成立时渲染，条件解除后移除，**不做**持久化关闭
- 动态反馈（如「当前生效顺序：A → B → C」）使用独立容器，**不**并入 Alert 的 `description`

**代码示例**

```tsx
{!infoDismissed && (
  <Alert
    type="info"
    showIcon
    closable
    className="ds-page-inline-alert"
    onClose={handleDismissInfo}
    message={
      <span className="ds-text-main" style={{ fontSize: 13, lineHeight: '22px' }}>
        告警按列表自上而下匹配，序号越小越优先；拖拽左侧手柄调整顺序，保存后生效。
      </span>
    }
  />
)}
```

> 各业务组件规范（`components_Table.md`、`components_Form.md`、`components_List.md`、`components_Chart.md`、`components_DescriptionList.md`）涉及页面级说明时，均引用本节，不在各文件重复定义 info 条规则。表格内勾选后出现的批量操作提示条仍见 `components_Table.md` § 批量操作提示条。

#### 嵌入现有后台：主内容区继承

分步表单、详情子页等从业务模块内跳转的页面，应嵌入既有后台布局，**禁止**拆成独立应用壳或重复生成全局导航。

> 本节适用于「已有项目且已有 Layout / 导航 / 路由壳」的场景；新建完整中后台应用或存量项目缺少导航壳时，先按上文「新项目 vs 存量项目的导航生成规则」判断是否需要补导航。

- 只生成主内容区页面，不重新生成顶部导航、侧边导航、用户区、全局搜索等应用框架
- 页面标题、说明提示条、表单 / 列表 / 详情内容应对齐既有后台的内容容器宽度、左右留白和区块间距
- 从模块列表进入的新建、编辑、继续填写等页面，不在侧栏新增同级菜单项；仍保持业务模块的导航归属
- 与分步表单配合时，页面内仅放 `PageHeader` + 页面说明提示条 + `StepsForm`；全局进度、缺件、处理方等看板信息应放在列表页、详情页或工单中心，不在表单页重复

### 过渡动画规范

所有交互状态的过渡动画统一使用：

```css
transition: var(--nav-transition);
```

其中 `var(--nav-transition)` 定义为：
```css
--nav-transition: 0.24s cubic-bezier(0.2, 0, 0, 1);
```

适用场景：
- 侧边栏收起/展开
- 菜单项 hover/active 状态变化
- 展开箭头旋转动画

### 字体规范

- 默认字体栈：`-apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif`
- 标题字号：18px（分组标题）、16px（Logo 名称）
- 正文字号：14px
- 行高：22px
- 一级菜单选中态字重：500/600

### z-index 层级规范

| 层级 | 用途 | 值 |
|------|------|-----|
| 顶部导航/侧边栏 | 基础导航层 | 1000 |
| 收起触发器 | 覆盖侧边栏边界 | 1001 |
| 图表 Tooltip / 数据浮层 | 数据读取临时浮层 | 1060 |
| 收起后子菜单气泡 / 导航下拉 | 导航最高浮层 | 1100 |

### 响应式规范

- 适配所有分辨率
- 移动端侧边栏以滑出面板（Drawer）形式呈现
- 断点参考如下；若模板已有具体实现，以 `scripts/layout/` 对应模板为准

| 断点 | 行为 |
|------|------|
| ≤1120px | 搜索框宽度缩小为 180px |
| ≤760px | 隐藏 Logo 文字、搜索框、用户名等次要元素 |
| ≤760px | 侧边栏以滑出面板 / Drawer 形式呈现 |
| ≤760px | 主内容区取消侧边栏偏移，使用移动端内边距 |

---

## 导航共性规则

以下规则适用于本文件所有导航组件，各组件不再重复说明。

### 图标规范

- **React + Ant Design 项目**：侧边栏/顶部栏菜单 icon 统一使用 `@ant-design/icons` 的 **Outlined 线型图标**（如 `DatabaseOutlined`），尺寸 **16px**（`font-size: 16px`），通过 `className="side-icon"` 包裹
- **纯静态 HTML / 无 React 环境**：可使用内联 SVG 线型图标作为降级方案
- **禁止使用 emoji**
- icon 尺寸：菜单级 16px；个人相关区域 28px/32px

### 选中态规范

- 一级/二级/三级菜单选中态高度统一为 **40px**
- 选中态背景色使用 `global-style.css` 变量，禁止硬编码颜色
- 侧边菜单 hover 背景必须使用 `var(--nav-color-sider-hover)`，当前值为 `rgba(0, 0, 0, 0.04)`
- 侧边菜单 active 背景必须使用 `var(--nav-color-sider-active)`（引用 hover token，当前与 hover 同色）
- 侧边菜单 active 背景禁止使用 `var(--nav-color-primary-bg)` 或硬编码浅蓝色

### 侧边栏交互 CSS token

| Token | 值 | 用途 |
|-------|---|------|
| `--nav-color-sider-hover` | `rgba(0, 0, 0, 0.04)` | 菜单项 hover 背景 |
| `--nav-color-sider-active` | `var(--nav-color-sider-hover)` | 菜单项选中态背景（一级/二级/三级通用） |
| `--nav-color-sider-text` | `rgba(0, 0, 0, 0.65)` | 菜单默认文字颜色 |
| `--nav-color-sider-text-active` | `rgba(0, 0, 0, 0.85)` | 菜单激活态文字颜色 |
| `--nav-color-sider-icon-active` | `rgba(0, 0, 0, 0.65)` | 菜单激活态图标颜色（深于文字） |
| `--nav-color-sider-divider` | `rgba(0, 0, 0, 0.06)` | 侧边栏分隔线 |
| `--nav-transition` | `0.24s cubic-bezier(0.2, 0, 0, 1)` | 侧边栏收起/展开过渡 |

**交互行为规范**：
- **hover**：背景变为 `--nav-color-sider-hover`，文字变为 `--nav-color-sider-text-active`
- **active（当前菜单）**：背景变为 `--nav-color-sider-active`，文字 + 图标同步变深（`--nav-color-sider-text-active` + `--nav-color-sider-icon-active`）
- **has-active-child（子菜单高亮时父级样式）**：当子菜单被选中时，父级仅文字和图标加深，不展示背景条；背景条只展示在当前选中的二级/三级菜单项上
- **展开箭头**：展开时旋转 180deg，过渡时长 `--nav-transition`
- **收起时**：隐藏文字 + 箭头 + 子菜单，图标居中对齐

**导航状态矩阵**：

| 状态 | 视觉规则 | 适用范围 |
|------|----------|----------|
| normal | 默认文字 `--nav-color-sider-text`，无背景条 | 侧边一级 / 二级 / 三级菜单 |
| hover | 背景 `--nav-color-sider-hover`，文字加深 | 可点击菜单项 |
| active | 背景 `--nav-color-sider-active`，文字和图标同步加深 | 当前选中的菜单项 |
| has-active-child | 仅文字和图标加深，不展示背景条 | 子菜单被选中时的父级菜单 |
| collapsed | 隐藏文字、箭头和子菜单，仅 icon 居中 | 侧边栏收起态 |
| disabled / unavailable | 不响应 hover / active，不使用选中背景 | 不可用菜单项，如业务需要 |

**active 状态实现示例**：

错误示例，禁止使用主色浅背景作为侧边菜单 active 背景：

```css
.side-menu-item.is-active {
  background: var(--nav-color-primary-bg);
}
```

正确示例：

```css
.side-menu-item:hover {
  background: var(--nav-color-sider-hover);
  color: var(--nav-color-sider-text-active);
}

.side-menu-item.is-active {
  background: var(--nav-color-sider-active);
  color: var(--nav-color-sider-text-active);
}

.side-menu-item.has-active-child {
  color: var(--nav-color-sider-text-active);
}

.side-menu-item.is-active .side-icon {
  color: var(--nav-color-sider-icon-active);
}

.side-menu-item.has-active-child .side-icon {
  color: var(--nav-color-sider-icon-active);
}
```

### 收起/展开规范

- 侧边栏展开宽度：208px
- 侧边栏收起宽度：64px
- 收起状态：隐藏名称和箭头，仅保留 Logo、一级菜单 Icon、个人相关区域

### 可访问性与交互可用性

- 所有 icon-only 按钮必须提供可读的 `aria-label`，包括帮助、消息、收起/展开触发器等
- 收起/展开触发器必须可键盘聚焦和触发，不得只依赖鼠标 hover 或隐藏热区
- 用户头像下拉菜单、帮助按钮、消息按钮必须具备明确的可读名称或辅助说明
- hover 不能作为唯一反馈；active、focus、expanded/collapsed 状态必须可由 DOM 状态或 class 明确表达
- 动效默认使用 `var(--nav-transition)`；如用户系统设置减少动态效果，可降级为更短或无动画，但不得改变默认视觉规范

### 侧边栏收起触发器强制规则

凡是包含侧边栏的布局，包括 SideLayout 和 MixedLayout，必须实现独立可见的收起/展开触发器，不得仅依赖菜单项、顶部按钮或隐藏交互来切换侧边栏。

- **触发器位置**：贴合侧边栏右边界，允许超出侧边栏边界显示；展开态位于 208px 侧边栏边界，收起态随 64px 侧边栏边界移动
- **唯一越界例外**：收起触发器是侧边栏右边界唯一允许受控外露的元素，外露距离固定为 12px；Logo / 品牌名 / 菜单项 / 分组标题 / 底部用户区（如有）/ 消息与帮助按钮均必须约束在 208px 展开宽度或 64px 收起宽度内
- **默认样式**：24px × 24px 圆形按钮，`border-radius: var(--nav-radius-pill)`，背景使用 `var(--nav-color-surface)`，边框使用 `var(--nav-color-border)`，阴影使用 `var(--nav-shadow-dropdown)`
- **图标**：10px chevron 箭头；展开态显示向左 chevron，收起态显示向右 chevron
- **交互**：点击触发器必须切换侧边栏展开/收起状态，并同步主内容区偏移
- **收起后表现**：隐藏菜单文字、展开箭头和子菜单，仅保留一级菜单 icon 居中显示
- **禁止省略**：生成 SideLayout 或 MixedLayout 时，DOM 中必须存在独立的 `.collapse-trigger` 或 `.toggle-sidebar` 收起触发器

### 导航背景规范

- 页面背景、顶部导航背景、侧边导航背景统一使用 `--nav-color-bg-canvas`
- `--nav-color-bg-canvas` 当前值固定为 `#f7f8fa`
- 禁止使用 `linear-gradient`、`radial-gradient`、弥散光晕、圆点背景或白色玻璃背景作为导航页面背景
- 浮层、下拉菜单、输入框等局部容器可继续使用 `--nav-color-surface`

### 顶部导航高度规范

- 顶部导航高度统一为 **56px**（`var(--nav-header-height)`）
- 用于计算顶部导航、侧边导航与内容区偏移等衍生值

### 导航模板唯一事实来源

- SideLayout、TopLayout、MixedLayout 的导航实现必须以 `scripts/layout/` 中对应模板为准
- 用户输入只允许替换 Logo、产品名称、菜单数据、用户信息和内容区业务内容
- 不得为了“美化”重新设计导航 DOM、状态色、背景、收起触发器、菜单高度、菜单间距或 token 值
- 生成完成前必须按照本文件「[布局生成强约束与验收清单](#布局生成强约束与验收清单)」逐项检查

#### 根容器背景实现

```css
.app {
  min-height: 100vh;
  position: relative;
  isolation: isolate;
  overflow: hidden;
  background: var(--nav-color-bg-canvas);
}
```

#### 各组件中的对应关系

| 组件 | 根容器背景 | 顶部导航栏 | 侧边栏 |
|------|-----------|-----------|--------|
| MixedLayout | `background: var(--nav-color-bg-canvas)` | `background: var(--nav-color-bg-canvas)` | `background: var(--nav-color-sider)` |
| SideLayout | `background: var(--nav-color-bg-canvas)` | `background: var(--nav-color-bg-canvas)` | `background: var(--nav-color-sider)` |
| TopLayout | `background: var(--nav-color-bg-canvas)` | `background: var(--nav-color-bg-canvas)` | 无侧边栏 |

#### 背景禁止项

- 不使用底部装饰背景图
- 不使用 `navigation_background.png`
- 不使用 `linear-gradient` 或 `radial-gradient`
- 不使用弥散光晕、圆点、玻璃容器背景

#### 注意事项

- 导航背景 token 以 `references/global-style.css` 为唯一来源，组件只通过 CSS 变量引用
- 侧边栏背景使用 `var(--nav-color-sider)`，当前值与页面背景一致为 `#f7f8fa`
- 顶部导航栏使用 `var(--nav-color-bg-canvas)`，不得单独改为纯白或玻璃态背景
- 布局模板必须引入 `references/global-style.css`，子元素通过 `var(--xxx)` 引用 token；禁止在模板内重复定义整套 token
- 禁止在样式中使用硬编码色值，必须通过 CSS 变量引用

### Logo 规范

- Logo 图形尺寸：28px × 28px 或 32px × 32px
- Logo 圆角：`var(--nav-radius-sm)` (6px)
- Logo 背景色：`var(--nav-color-primary)`
- Logo 图形颜色：白色
- 产品名称字号：16px，字重 500/600
- 颜色：`var(--nav-color-text-active)`
- Logo 与产品名称间距：`var(--nav-space-2)` (8px)

### 顶部导航品牌文字规范

- 顶部导航左侧若存在品牌名、系统名或紧邻品牌展示的页面/系统标题，应使用 `.brand-name`，并必须统一使用以下样式：
  - 字号：`var(--font-size-lg)`（16px）
  - 行高：24px
  - 字重：`var(--font-weight-tertiary)`（600）
  - 颜色：`var(--nav-color-text-active)`（当前值 `rgba(0, 0, 0, 0.85)`）
  - 字体族：继承页面全局字体
- `.brand-name` 不得被业务标题、菜单项或页面标题样式覆盖；同一顶导左侧可存在多个 `.brand-name`
- 品牌区与顶部一级菜单之间只通过 `margin-right` / `gap` 留白衔接，**不得**在品牌名、`.logo-section`、`.header-left`、`.topbar-left` 右侧添加竖向分割线、`border-right`、伪元素竖线或右侧 `box-shadow`

### 顶部一级菜单规范

- 菜单间距（相邻菜单）：28px
- 菜单字号：14px
- 未选中状态文字颜色：`rgba(0, 0, 0, 0.65)`
- 选中状态文字颜色：`rgba(0, 0, 0, 0.85)`，字重 500/600
- hover 状态文字颜色：`var(--color-text)`（当前值 `rgba(0, 0, 0, 0.88)`）
- 选中态不展示下划线，仅通过文字颜色加深和字重提升表达
- 菜单项高度：40px
- 一级菜单数量 ≤9 个时不显示"更多"按钮；>9 个时才显示"..."

**禁止误用 Tab / 胶囊样式**：

顶栏一级菜单是**文字导航**，不是 `Tabs`、`Segmented`、圆角 pill 按钮或带 icon 的工具栏按钮组。

| 禁止项 | 说明 |
| :-- | :-- |
| 选中 / hover 背景 | 不得使用 `--nav-color-primary-bg` 或任何背景色块 |
| 选中文字色 | 不得使用 `--nav-color-primary`；必须使用 `--nav-color-text-active` |
| 圆角胶囊 | 不得给菜单项加 `border-radius`、左右 padding 背景块 |
| 菜单 icon | 默认不加 icon（除非用户明确要求） |
| 组件替代 | 不得用 antd `Tabs` / `Menu mode="horizontal"` 替代模板 `.top-menu` + `.menu-item` |

错误示例（禁止使用主色浅背景作为顶栏菜单 active 背景）：

```css
.menu-item.active {
  color: var(--nav-color-primary);
  background: var(--nav-color-primary-bg);
  border-radius: var(--nav-radius-sm);
}
```

正确示例：

```css
.menu-item:not(.active):hover {
  color: var(--color-text);
}

.menu-item.active {
  color: var(--nav-color-text-active);
  font-weight: 500;
}
```

**参考实现来源**：`scripts/layout/TopLayout.tsx` 的 `.top-menu`、`.menu-item`、`.menu-item.active`

### 站点地图默认模板说明

- TopLayout / MixedLayout 默认模板不包含站点地图触发器、站点地图抽屉或遮罩层代码。
- 不得在默认导航生成中自动添加站点地图入口；仅当用户明确提出站点地图需求时，作为额外功能单独设计。

### 业务切换默认模板说明

- TopLayout / MixedLayout 默认模板不包含业务切换选择器、业务切换分割线或业务切换状态代码。
- 不得在默认导航生成中自动添加业务切换入口；仅当用户明确提出业务切换需求时，作为额外功能单独设计。

### 用户下拉菜单规范

| 属性 | 值 |
|------|-----|
| 定位 | `top: calc(100% + var(--nav-space-2))`，`right: 0` |
| 宽度 | 132px |
| 内边距 | `var(--nav-space-1)` (4px) |
| 圆角 | `var(--nav-radius-md)` (8px) |
| 边框 | `1px solid var(--nav-color-border-light)` |
| 阴影 | `var(--nav-shadow-dropdown)` |
| 菜单项内边距 | 9px `var(--nav-space-4)` |
| 分割线 | `var(--nav-space-1)` 上下边距 |

**用户下拉菜单项顺序**（从上至下）：
1. 个人资料
2. 意见反馈
3. 退出登录

### 顶部导航右侧自定义内容规范

顶部导航右侧支持自定义内容区，各元素按功能归组，从右往左依次排列：**头像** → **图标组** → **搜索框**。

**分组与间距规则**：

| 层级 | 间距 | 说明 |
|------|------|------|
| 组间距 | 16px | 不同功能组之间，如图标组与搜索组之间 |
| 组内间距 | 4px | 同组元素之间，如 icon 与 icon、头像与用户名之间 |

**强制要求：头像与用户名间距**

- 顶部导航中只要同时出现用户头像与用户名，外层容器必须使用 `.user-actions`
- `.user-actions` 必须设置 `display: flex; align-items: center; gap: var(--nav-space-1);`
- `var(--nav-space-1)` 当前值为 4px
- 用户名必须使用 `.user-name`，字号 14px，行高 22px，颜色 `var(--nav-color-text-secondary)`，且不换行
- 禁止省略头像与用户名之间的 gap，禁止用 `margin-left` 替代 `.user-actions` 的 gap

**分组归属示例**：
- 搜索框 → 独立组
- 多个功能图标（通知、截图、帮助等）→ 同一组（组内间距 4px）
- 头像（+ 用户名）→ 独立组，位于最右侧

**组件来源**：搜索框默认使用 `antd` 的 `<Input variant="filled" prefix={<SearchOutlined />} />`；帮助、消息等按钮必须使用 `@ant-design/icons` 图标，并优先通过 `antd` 的 `<Button type="text" />` 承载。禁止用手写 SVG、emoji 或第三方图标库替代帮助/消息图标。

**常用组件对照**：

| 区域 | Ant Design 组件 | 备注 |
|------|----------------|------|
| 搜索框 | `<Input allowClear variant="filled" prefix={<SearchOutlined />} />` | 宽度按需设定，默认 220px；不显示右侧搜索按钮 |
| 帮助按钮 | `<Button type="text" icon={<QuestionCircleOutlined />} />` | 32px × 32px，图标尺寸 16px |
| 消息按钮 | `<Button type="text" icon={<BellOutlined />} />` | 32px × 32px，图标尺寸 16px |
| 头像 | `<Avatar size={32}>` | 最右侧，点击展开用户下拉菜单 |

**Filled 前缀搜索框对齐要求**：

- 搜索框外层宽度默认 220px；≤1120px 时可缩小为 180px。
- 搜索框整体高度为 32px。
- 默认不使用 `Input.Search`，避免右侧搜索按钮、分割线和输入框形成老式组合态。
- 仅在搜索必须由“点击搜索按钮”显式提交，或高成本远程查询需要独立提交入口时，才允许使用 `Input.Search`。
- `.nav-search` 必须绑定在 `Input` 的 `ant-input-affix-wrapper` 根节点上，通过 `variant="filled"` 形成浅灰填充搜索框。
- 顶导搜索的可见输入主体必须是 `Input` 本身：`<Input className="nav-search" variant="filled" prefix={<SearchOutlined />} allowClear />`。禁止把 `.nav-search` 绑在 `AutoComplete`、`Select`、`Input.Search` 或自定义外层容器上。
- 如需搜索建议、最近访问、跨业务候选等增强能力，只能使用 `Popover` / `Dropdown` 等浮层承载候选内容；不得用 `AutoComplete` 替换顶导搜索主体。
- 出现白底、尾部背景、宽度错位等问题时，优先检查是否偏离上述 DOM 结构；禁止通过 `.nav-search .ant-select-selector`、`.nav-search-autocomplete` 等补丁类硬盖错误结构。

```css
.nav-search.ant-input-affix-wrapper {
  width: 220px;
  height: 32px;
  border-color: transparent;
  background: var(--color-fill-tertiary);
  box-shadow: none;
}

.nav-search.ant-input-affix-wrapper:hover,
.nav-search.ant-input-affix-wrapper:focus-within,
.nav-search.ant-input-affix-wrapper-focused {
  border-color: transparent;
  background: var(--color-fill-secondary);
}
```

**布局代码示例**：

```tsx
import { Space, Input, Button, Avatar } from 'antd';
import {
  BellOutlined, QuestionCircleOutlined, SearchOutlined,
} from '@ant-design/icons';

// 组间距 16px，组内间距 4px；顶导搜索必须保持裸 Input 结构，候选能力用 Popover / Dropdown 外挂
<Space size={16} align="center">
  <Input
    className="nav-search"
    placeholder="搜索..."
    allowClear
    variant="filled"
    prefix={<SearchOutlined />}
  />

  {/* 图标组（同组，间距 4px）*/}
  <Space size={4}>
    <Button type="text" aria-label="帮助文档" icon={<QuestionCircleOutlined />} />
    <Button type="text" aria-label="消息通知" icon={<BellOutlined />} />
  </Space>

  {/* 头像（最右侧）*/}
  <Space className="user-actions" size={4}>
    <Avatar size={32} style={{ background: 'var(--nav-color-primary)' }}>七</Avatar>
    <span className="user-name">七妮妮</span>
  </Space>
</Space>
```

---

### 布局生成强约束与验收清单

本节为 Agent 生成页面布局与导航时的强制约束、选型规则与交付前自检项。与上文「布局共性规则」和「导航共性规则」中的设计 token 互补：本节侧重**生成决策与验收**，共性规则侧重**视觉与交互参数**。

#### 导航生成强约束

- 必须从 SideLayout、TopLayout、MixedLayout 三种模板中选择一种，不得混搭导航结构
- 不得从零实现导航，不得根据审美重写导航 DOM、间距、状态色、收起触发器或背景规则
- 用户输入只能映射到导航数据和内容区数据，不得改变导航规范；除非用户明确要求修改 Skill 规则本身
- 若用户需求与导航规范冲突，优先遵循导航规范
- 生成时不得把侧边菜单 active 背景写成 `--nav-color-primary-bg`
- 侧边菜单 hover 背景必须使用 `--nav-color-sider-hover`
- 侧边菜单 active 背景必须使用 `--nav-color-sider-active`（引用 hover token，当前与 hover 同色）
- 侧边菜单 active 文字必须使用 `--nav-color-sider-text-active`
- 侧边菜单 active icon 必须使用 `--nav-color-sider-icon-active`
- TopLayout / MixedLayout **顶栏一级菜单** active / hover **不得**使用背景色
- 顶栏一级菜单 active 文字必须使用 `--nav-color-text-active`，**不得**使用 `--nav-color-primary`
- 顶栏一级菜单必须从 `TopLayout.tsx` 复制 `.top-menu` + `.menu-item` DOM / CSS，**不得**用 antd `Tabs` / `Menu mode="horizontal"` 替代（除非用户明确要求）
- 导航背景必须使用 `--nav-color-bg-canvas`（当前值 `#f7f8fa`），不得恢复渐变、弥散光晕或径向圆点背景

#### 侧边导航分组生成规则

- 当用户输入的侧边菜单天然包含业务域、模块域或分类结构时，SideLayout / MixedLayout 必须生成侧边导航分组标题
- 当用户输入只有单层菜单或没有明确分组时，不展示分组标题
- 禁止生成空分组、占位分组或仅用于装饰的分组标题
- 分组标题必须使用下文「[侧边导航分组标题规范](#侧边导航分组标题规范)」

#### 导航选择规则

| 判断条件 | 使用布局 |
|----------|----------|
| 用户明确要求侧边导航 | SideLayout |
| 用户明确要求顶部导航 | TopLayout |
| 用户明确要求混合导航 | MixedLayout |
| 用户未明确但菜单项多、层级深，属于 ERP / CRM / 运维 / 生产力后台 | SideLayout |
| 菜单项 ≤9 个且层级浅，主导航适合水平排列 | TopLayout |
| 同时需要顶部一级导航和侧边二级 / 三级导航 | MixedLayout |

#### 侧边栏收起触发器强制要求

- 所有包含侧边栏的导航布局都必须包含收起/展开触发器，不得省略
- 触发器必须是独立 DOM 元素，使用 `.collapse-trigger` 或 `.toggle-sidebar` 类名
- 默认采用 24px × 24px 圆形 chevron 按钮，贴合侧边栏右边界，允许超出边界显示
- 展开态显示向左 chevron，收起态显示向右 chevron
- 点击后必须切换侧边栏 208px / 64px 宽度，并同步主内容区偏移
- 收起后必须隐藏菜单文字、展开箭头和子菜单，仅保留一级菜单 icon 居中
- 禁止只保留 `collapsed` 状态或 `toggleSidebar` 函数但不渲染可见触发器

> 视觉与 DOM 细节另见上文「[侧边栏收起触发器强制规则](#侧边栏收起触发器强制规则)」。

#### 生成后必须自检

**模板选择与数据替换**

- 是否只选择了一种导航模板
- 是否只替换了 Logo、产品名称、菜单项、用户信息和内容区数据

**背景与 token**

- 是否没有恢复 `linear-gradient`、`radial-gradient`、弥散光晕或圆点背景
- 是否没有使用 `var(--nav-color-primary-bg)` 作为侧边菜单 active 背景
- 是否没有使用 `var(--nav-color-primary-bg)` 或 `--nav-color-primary` 作为顶栏一级菜单 active / hover 样式
- SideLayout / MixedLayout 是否未直接使用 antd `Layout.Sider` 默认浅色白底（`theme="light"` 的 `#fff`）；顶栏与侧边栏背景是否均为 `var(--nav-color-bg-canvas)` / `var(--nav-color-sider)`（当前值 `#f7f8fa`），而非 `#fff` 或 `--nav-color-surface`

**侧边菜单状态**

- 侧边菜单 hover 背景是否为 `var(--nav-color-sider-hover)`
- 侧边菜单 active 背景是否为 `var(--nav-color-sider-active)`
- 当二级/三级菜单被选中时，父级折叠菜单是否不展示背景条，仅当前子菜单展示背景条
- 侧边菜单 active 文字是否为 `var(--nav-color-sider-text-active)`
- 侧边菜单 active icon 是否为 `var(--nav-color-sider-icon-active)`

**侧边栏交互**

- 若包含侧边栏，是否存在独立可见的 24px × 24px 圆形收起触发器
- 侧边栏收起后 Logo 图形是否仍可见并居中，且只隐藏品牌文字
- 若侧边菜单需要分组，是否展示了 40px 高、透明背景、与一级菜单等宽的分组标题
- 若侧边菜单无需分组，是否没有展示分组标题
- 分组标题在侧边栏收起时是否隐藏

**顶部导航**

- 顶部导航 `.brand-name` 是否用于品牌名、系统名、紧邻品牌的页面/系统标题
- `.brand-name` 是否为 `var(--font-size-lg)` / 24px / `var(--font-weight-tertiary)` / `var(--nav-color-text-active)`
- 品牌分割线是否为 `margin: 0 var(--nav-space-4)`
- 顶部菜单 normal 是否为 `var(--nav-color-text-secondary)`，hover 是否为 `var(--color-text)`，active 是否为 `var(--nav-color-text-active)` + 500/600
- 顶部菜单 active 是否没有下划线
- 顶栏菜单 active / hover **是否均无背景色**（不是 Tab / 胶囊 / Segmented 样式）
- 顶栏菜单 active 文字 **是否不是** 主色蓝（`--nav-color-primary`）
- 顶栏菜单间距是否为 **28px**（不是 4px 等紧凑 Tab 间距）
- 顶栏菜单是否未默认添加 icon 或圆角胶囊（除非用户要求）
- 顶栏菜单是否保留模板 `.top-menu` + `.menu-item` 结构，未用 antd `Tabs` / 横向 `Menu` 替代

**用户区**

- 头像与用户名容器 `.user-actions` 是否设置 `gap: var(--nav-space-1)`，即 4px
- 用户名是否使用 `.user-name`，并为 14px / 22px / `var(--nav-color-text-secondary)` / 不换行

---

## 1. 侧边导航 (SideLayout)

> **适用场景**：适用于功能模块较多、信息层级较深（3级及以上）的企业级管理后台。侧边导航提供更长的垂直空间展示复杂的树状菜单，方便用户在不同功能间频繁切换。当需求中明确提及"侧边导航/侧栏框架"或系统属于高频操作的生产力工具（如 ERP、CRM、运维平台）时，应优先采用此布局。

> **重要**：整体结构为侧边栏 + 固定顶部栏（与侧边栏等宽）。侧边栏内包含 Logo 区、菜单列表、用户操作区。**无站点地图、无业务切换、无顶部一级菜单**。

**索引**：

- [布局结构](#1-侧边导航-sidelayout)
- [固定顶部栏规范](#固定顶部栏规范)
- [品牌区规范](#品牌区规范)
- [侧边栏规范](#侧边栏规范)
- [侧边栏菜单规范](#侧边栏菜单规范)
- [收起触发器规范](#收起触发器规范侧边导航)
- [收起状态行为](#收起状态行为)
- [收起后子菜单气泡](#收起后子菜单气泡)
- [用户操作区规范](#用户操作区规范)
- [响应式处理](#响应式处理)
- [完整实现](#完整实现请参考scriptssideLayouttsx)

**布局结构**：
```
┌─────────────────────────────────────────────────────────────────┐
│  ┌────────────┐ ┌───────────────────────────────────────────┐   │
│  │ 顶部栏     │ │                                           │   │
│  │ Logo      │ │                                           │   │
│  │ 品牌名    │ │                                           │   │
│  ├────────────┤ │               主内容区                    │   │
│  │ 侧边栏     │ │                                           │   │
│  │ Logo      │ │                                           │   │
│  │ 侧边菜单   │ │                                           │   │
│  │ 用户操作区 │ │                                           │   │
│  └────────────┘ └───────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

**约束**：

### 固定顶部栏规范

参考实现来自 `scripts/layout/SideLayout.tsx`。

- **定位**：`position: fixed; inset: 0 auto auto 0`
- **宽度**：与侧边栏一致（展开 208px / 收起 64px）
- **高度**：56px（`var(--nav-header-height)`）
- **内边距**：`padding: 0 var(--nav-space-4)`
- **边框**：底部 `1px solid var(--nav-color-border-light)`，右侧 `1px solid var(--nav-color-sider-divider)`
- **背景**：`var(--nav-color-bg-canvas)`
- **过渡**：宽度随侧边栏一起变化，过渡时长 `var(--nav-transition)`

### 品牌区规范

- **Logo 图形**：24px × 24px，`object-fit: contain`
- **字号**：16px
- **字重**：400，与一级菜单 normal 态一致
- **行高**：24px
- **颜色**：`var(--nav-color-text-active)`
- **DOM 拆分**：Logo 图形与品牌文字必须拆成两个元素，Logo 图形用 `.logo-mark` / `.logo-icon`，品牌文字用 `.brand-name`（**禁止**用裸 `<span>` 不带类名）
- **收起保留**：侧边栏收起时只隐藏品牌文字（`.brand-name`），Logo 图形必须继续显示；禁止用 `{!collapsed && <Logo />}` 或 `.is-collapsed .brand { display: none }` 隐藏整个品牌区；禁止用 `.brand span { display: none }` 通配隐藏（会误伤 `.logo-mark`）
- **收起对齐**：侧边栏宽度为 64px 时，品牌区图形居中显示，清除多余文字间距或左侧偏移

### 侧边栏规范

- **定位**：`position: fixed; top: var(--nav-header-height); left: 0; bottom: 0`
- **宽度**：展开 208px / 收起 64px
- **背景**：`var(--nav-color-sider)`（当前值为 `#f7f8fa`）
- **边框**：右侧 `1px solid var(--nav-color-sider-divider)`
- **边界约束**：侧边栏根节点可为浮层或收起触发器保留 `overflow: visible`，但 `.topbar`、`.side-menu`、`.sidebar-content`、`.user-actions` 等内部内容容器必须 `box-sizing: border-box` 且禁止横向溢出；除收起触发器外，不得有任何侧栏元素越过右边界
- **文本收口**：品牌名、菜单文字、用户名必须单行省略，使用 `min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap`

### 侧边栏菜单规范

- **容器内边距**：`padding: var(--nav-space-3) var(--nav-space-2) calc(60px + var(--nav-space-3))`；顶部到首个分组标题 / 菜单为 12px，底部为 60px 用户区 + 12px 避让
- **一级菜单项间距**：`margin-bottom: 0`，菜单行之间不额外插入垂直间距
- **一级菜单项**：
  - `min-height: 40px`
  - `padding: 0 var(--nav-space-4)`（左内边距 16px）
  - `border-radius: var(--nav-radius-sm)`
  - 图标宽度 16px，图标与文字间距 `var(--nav-space-2)`（8px）
  - 一级菜单文字起点固定为距菜单项背景左边缘 40px（16px 左内边距 + 16px icon + 8px 间距）
- **子菜单容器**：
  - `margin: 0`
  - `padding: 0`
  - `border-radius: var(--nav-radius-sm)`
- **子菜单项**：
  - `min-height: 40px`
  - `padding: 0 var(--nav-space-3) 0 40px`（二级/三级不带图标，但文字起点固定为距菜单项背景左边缘 40px）
- **展开箭头**：
  - 使用 Ant Design Icons 的 `DownOutlined` 图形路径
  - 宽度/高度：12px × 12px
  - 颜色：`rgba(0, 0, 0, 0.25)`
  - 距离菜单项背景右侧：16px（可展开一级菜单使用 `padding-right: var(--nav-space-4)`）
  - 展开时旋转 180deg，过渡时长 `var(--nav-transition)`

### 侧边导航分组标题规范

当 SideLayout 或 MixedLayout 的左侧菜单需要按业务域、模块域或分类结构分组时，必须展示分组标题；如果菜单无需分组，则不展示分组标题，不生成空标题、占位标题或装饰标题。

- **适用范围**：SideLayout 侧边菜单、MixedLayout 左侧侧边菜单
- **高度**：40px
- **宽度**：与一级菜单项背景宽度一致
- **背景**：transparent
- **圆角**：与一级菜单项一致，使用 `var(--nav-radius-sm)`
- **字体颜色**：`var(--nav-color-text-secondary)`（当前值为 `rgba(0, 0, 0, 0.65)`）
- **字号**：12px
- **字重**：400，与一级菜单 normal 态一致
- **内边距**：与一级菜单项一致，`padding: 0 var(--nav-space-4)`
- **首个分组标题间距**：距离顶部导航分割线 / 侧边栏内容顶部 12px，由侧边菜单容器 `padding-top: var(--nav-space-3)` 提供
- **后续分组标题间距**：上一组内容到底部分割线 12px，分割线到下一组标题 12px，即 `.side-section + .side-section { margin-top: var(--nav-space-3); padding-top: var(--nav-space-3); border-top: 1px solid ... }`
- **标题下方间距**：标题到首个菜单项距离为 0
- **最后一组**：最后一组底部不再追加分割线；如存在固定底部用户区，最后一组内容到用户区的避让由 `.side-menu` 底部 `calc(60px + var(--nav-space-3))` 提供
- **交互**：不可点击，不参与 hover / active 状态
- **收起状态**：侧边栏收起时隐藏分组标题

```css
.side-section-title {
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0 var(--nav-space-4);
  border-radius: var(--nav-radius-sm);
  background: transparent;
  color: var(--nav-color-text-secondary);
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
}

.side-section + .side-section {
  margin-top: var(--nav-space-3);
  padding-top: var(--nav-space-3);
  border-top: 1px solid var(--nav-color-border-light);
}

.side-layout.is-collapsed .side-section-title,
.sidebar.collapsed .side-section-title {
  display: none;
}
```

### 收起触发器规范（侧边导航）

- **位置**：侧边栏顶部外侧，`top: calc(-1 * var(--nav-space-5) - var(--nav-space-5))`，`right: -12px`
- **尺寸**：24px × 24px
- **圆角**：`border-radius: var(--nav-radius-pill)`（16px）
- **边框**：`1px solid var(--nav-color-border)`
- **背景**：`var(--nav-color-surface)`
- **阴影**：`var(--nav-shadow-dropdown)`
- **图标**：10px chevron 箭头

### 收起状态行为

收起时（宽度 64px）：
- 隐藏文字（`.side-text`）
- 隐藏展开箭头（`.side-arrow`）
- 隐藏子菜单（`.submenu`）
- Logo 区域品牌名隐藏，但 Logo 图形（`.logo-mark` / `.logo-icon`）必须保留并居中显示
- 菜单项居中对齐，`padding: 0`
- **选中菜单项保留背景**：`rgba(0, 0, 0, 0.04)`

### 收起后子菜单气泡

- **触发**：hover 有子菜单的一级菜单项
- **隐藏延迟**：mouseleave 后 **120ms**
- **定位**：`left: 菜单项 right + 12px; top: 菜单项 top`
- **最小宽度**：164px
- **内边距**：`var(--nav-space-1)` (4px)
- **子项高度**：32px
- **子项 padding**：`5px var(--nav-space-3)`
- **边框/圆角/阴影**：同下拉菜单规范

### 用户操作区规范

- **位置**：侧边栏底部，绝对定位，`bottom: 0`
- **背景层尺寸**：`width: 100%`，`height: 60px`（内容区 44px + 上下各 8px 背景延伸）
- **内边距**：`padding: var(--nav-space-2) var(--nav-space-4)`（上下 8px 为背景延伸；中间 44px 承载头像 / 用户名 / icon，元素垂直居中不变）
- **背景色**：`var(--nav-color-sider)`；当项目将 `--nav-color-sider` 设为 `transparent` 时，底栏须改用 `var(--nav-color-bg-canvas)` 以免底部出现透明缝隙
- **间距**：`gap: var(--nav-space-2)`
- **圆角**：无（保持底部遮挡区为直角全宽底栏）
- **内容边界**：用户操作区只放头像、用户名、消息 / 帮助等 icon button 和用户下拉菜单；**禁止**放入侧边菜单项、分组标题或系统管理入口
- **横向收口**：用户操作区必须 `box-sizing: border-box; overflow: hidden`，用户名 `flex: 1 1 auto; min-width: 0; text-overflow: ellipsis`，右侧 icon 组 `flex: 0 0 auto; margin-left: auto`，禁止头像、用户名或 icon 组挤出侧边栏右边界
- **菜单避让**：侧边菜单滚动区必须为用户操作区预留底部空间，推荐 `.side-menu { padding-bottom: calc(60px + var(--nav-space-3)); overflow-y: auto; overflow-x: hidden; }`
- **滚动责任**：菜单项过多时只允许 `.side-menu` 滚动，`.user-actions` 固定在侧边栏底部且不得被菜单覆盖或顶出视口
- **收起状态**：仅保留头像居中，隐藏用户名和整个 `.user-action-icons` 容器；`.user-actions` 须设置 `gap: 0`，不得只隐藏 `.icon-button` 后保留空的 flex 容器；不得把底部用户区变成菜单列表的一部分

**头像规范**：
- 尺寸：32px × 32px（与 `<Avatar size={32}>` 一致）
- Flex 约束：`flex: 0 0 32px; width: 32px; min-width: 32px; height: 32px;`，禁止在 64px 收起侧栏内被 flex 横向压缩
- 圆角：50%
- 背景：`var(--nav-color-primary)`
- 颜色：`var(--nav-color-surface)`
- 字重：700

**用户名规范**：
- 字号：14px
- 行高：22px
- 颜色：`var(--nav-color-text-secondary)`
- 不换行，超长时单行省略，不得横向撑开底部用户区

**消息 / 帮助 icon button 规范**：
- 热区：**28px × 28px**（1:1 正方形，与高度一致）
- icon 图形：16px
- 必须使用 `.icon-button`（或 `.sider-icon-button`），`padding: 0`，`min-width: 28px`，hover 背景不得超出 28px 热区

**用户下拉菜单规范**：

| 属性 | 值 |
|------|-----|
| 定位 | `right: 0; bottom: calc(100% + var(--nav-space-2))` |
| 宽度 | 132px |
| 内边距 | `var(--nav-space-1)` (4px) |
| 圆角 | `var(--nav-radius-md)` (8px) |
| 边框 | `1px solid var(--nav-color-border-light)` |
| 阴影 | `var(--nav-shadow-dropdown)` |

### 响应式处理

| 断点 | 行为 |
|------|------|
| ≤1120px | 搜索框宽度缩小为 180px |
| ≤760px | 隐藏 Logo 文字、搜索框、用户名 |
| ≤760px | 侧边栏 `transform: translateX(-100%)`，可滑出 |
| ≤760px | 主内容区 `margin-left: 0; padding: var(--nav-space-4)` |

**完整实现请参考**：`scripts/layout/SideLayout.tsx`

---

## 2. 顶部导航 (TopLayout)

> **适用场景**：顶部导航适用于菜单项较少（通常 ≤9 个）的轻量级工具平台，如果主导航菜单水平上分布于页面顶部。

**索引**：

- [布局结构](#2-顶部导航-toplayout)
- [约束](#约束)
- [用户下拉菜单规范](#用户下拉菜单规范-2)
- [用户区域样式规范](#用户区域样式规范)
- [完整实现](#完整实现请参考scriptstoplayouttsx)

**布局结构**：

```
┌─────────────────────────────────────────────────────────────────┐
│ ┌────────────┐ ┌───────────────────────────────────────────────┐│
│ │  Logo      │ │  一级菜单 (最多9个)                            ││
│ │  图形+名称  │ │  菜单1 │菜单2 │菜单3...                      ││
│ └────────────┘ └───────────────────────────────────────────────┘│
│                                          ┌─────────────────────┤
│                                          │搜索 │帮助│消息│头像││
└──────────────────────────────────────────┴─────────────────────┘
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │                      主内容区                                │ │
│ │                                                             │ │
│ │                                                             │ │
│ └─────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

**约束**：

- **顶导共性规则**：TopLayout / MixedLayout 顶部导航必须复用本文件前文的“顶部导航品牌文字规范”“顶部一级菜单规范”“顶部导航右侧自定义内容规范”“用户下拉菜单规范”，不得另写一套状态色、间距或用户区规则。
- **品牌区无竖线**：Logo / 产品名称与顶部一级菜单在同一顶栏平面内自然衔接，二者之间只用留白分隔；禁止在平台名称后生成竖向分割线或把 SideLayout 的品牌区右边界搬到 TopLayout。
- **常见元素自左向右依次**：
  1. 产品 Logo：Logo 图形 + 产品名称。品牌名、系统名或紧邻品牌展示的标题必须使用 `.brand-name`
  2. 菜单：顶部一级菜单数量 >9 个才出现"..."（不要出现更多）。顶部一级菜单数量 ≤9 个，不要出现"..."。如有二级菜单，根据实际需求挂在一级菜单下面，默认为隐藏，当 Hover 展示
  3. 搜索框：根据实际需求决定是否使用，默认必须使用 `antd` 的 `<Input variant="filled" prefix={<SearchOutlined />} />`，一般位置在右侧，且在个人相关左边；不得默认使用带右侧按钮的 `Input.Search`
  4. 个人相关：根据实际需求决定是否使用。「帮助文档」「消息通知」必须使用 `@ant-design/icons` 图标并通过 `antd` 的 `<Button type="text" />` 承载，账号头像宽高 32px。点击账号头像出现下拉面板，展示元素按照从上至下依次展示：个人资料、意见反馈、退出登录
  5. 用户名显示：紧跟在账号头像后面（右侧），必须放入 `.user-actions` 并使用 `.user-name`

**顶部导航右侧元素顺序**（从左到右）：搜索框 → 帮助文档 → 消息通知 → 用户头像 → 用户名

**站点地图说明**：

- TopLayout / MixedLayout 默认模板不生成站点地图触发器、站点地图抽屉或遮罩层。
- 仅当用户明确要求站点地图能力时，才可作为额外扩展单独设计。

**用户下拉菜单规范**：

| 属性 | 值 |
|------|-----|
| 定位 | `top: calc(100% + var(--nav-space-2))`，`right: 0` |
| 宽度 | 132px |
| 内边距 | `var(--nav-space-1)` (4px) |
| 圆角 | `var(--nav-radius-md)` (8px) |
| 边框 | `1px solid var(--nav-color-border-light)` |
| 阴影 | `var(--nav-shadow-dropdown)` |

**参考实现来源**：`scripts/layout/TopLayout.tsx`

**完整实现请参考**：`scripts/layout/TopLayout.tsx`

---

## 3. 混合导航 (MixedLayout)

> **适用场景**：适用于功能极其复杂、包含多个独立业务子系统的超大型平台。通过顶部导航进行一级业务/模块切换，侧边导航处理具体业务内的深层功能结构。当系统属于多任务流并行、需要频繁在不同大类业务间跨转（如 集团化管理平台、云服务控制台）或明确提及"混合导航/混合框架"时，应优先采用此布局。

**索引**：

- [布局结构](#3-混合导航-mixedlayout)
- [约束](#约束-2)
- [完整实现](#完整实现请参考scriptsmixedlayouttsx)

**布局结构**：

```
┌─────────────────────────────────────────────────────────────────┐
│ ┌────────────┐ ┌───────────────────────────────────────────┐   │
│ │  Logo      │ │  顶部一级菜单                              │   │
│ │  图形+名称  │ │  业务1 │业务2 │业务3                       │   │
│ └────────────┘ └───────────────────────────────────────────┘   │
│                                      ┌─────────────────────────┤
│                                      │搜索 │帮助│消息│头像│用户名│
└──────────────────────────────────────┴─────────────────────────┘
┌────────────┬───────────────────────────────────────────────────┐
│            │                                                   │
│  ┌──────┐  │  ┌─────────────────────────────────────────────┐ │
│  │ Logo │  │  │              主内容区                        │ │
│  ├──────┤  │  │                                             │ │
│  │收起  │  │  │  背景: var(--nav-color-bg-canvas)          │ │
│  │展开  │  │  │                                             │ │
│  │按钮  │  │  │  ┌───────────────────────────────────────┐ │ │
│  ├──────┤  │  │  │                                       │ │ │
│  │侧边  │  │  │  │         页面内容卡片                   │ │ │
│  │菜单  │  │  │  │                                       │ │ │
│  │      │  │  │  └───────────────────────────────────────┘ │ │
│  │ 一级 │  │  │                                             │ │
│  │  二级│  │  └─────────────────────────────────────────────┘ │
│  │  三级│  │                                                   │
│  ├──────┤  │                                                   │
│  │用户  │  │                                                   │
│  │操作区│  │                                                   │
│  └──────┘  │                                                   │
│            │                                                   │
│  侧边栏    │                                                   │
│  展开208px │                                                   │
│  收起64px  │                                                   │
└────────────┴───────────────────────────────────────────────────┘
```

**约束**：

- **布局架构**：
  - 顶部导航（56px 高）：左侧：Logo（图形 + 文字）→ 一级菜单；右侧：搜索框 → 帮助图标 → 消息图标 → 用户头像（32px）
  - 侧边栏（208px ↔ 64px）：一级菜单（icon + 文字）→ 点击箭头展开二级/三级菜单 → 收起时仅显示 icon
  - 顶部品牌区与一级菜单之间不得有竖向分割线；侧边栏右边界只从顶部导航下方开始，不得穿过顶栏品牌区
- **交互行为**：
  - 用户头像：点击用户头像 → 下拉菜单（从上至下展示：个人资料、意见反馈、退出登录）
  - 侧边栏收起：隐藏所有文字 + 子菜单 + 箭头 → 仅留 icon 居中 → 箭头位置 208px → 收起后 64px
  - 侧边栏收起/展开按钮：`overflow: visible`，采用独立 fixed 方式（24px × 24px 圆形，贴合侧边栏右边缘，位置紧靠 Logo 区域下方）
- **菜单规则**：
  - 顶部菜单 >9 个才显示"..."
  - 侧边栏菜单不折行（从上到下排序，上下间距为 8px）
  - 选中状态宽度一致
- **视觉规范**：
  - 背景：`var(--nav-color-bg-canvas)`，扁平无阴影
  - 间距：菜单间距 8px → 图标与文字 8px → 元素间距按规范
  - 响应式：适配所有分辨率 → 移动端侧边栏滑出
  - 选中态高度：40px
  - icon 风格：SVG 线型图标，**杜绝使用 emoji**
- **侧边二级 / 三级菜单（MixedLayout 模板）**：
  - 一级菜单文字起点固定为距菜单项背景左边缘 40px（16px 左内边距 + 16px icon + 8px 间距）
  - 二级（`.submenu .menu-link`）与三级（`.submenu .submenu .menu-link`）使用**同一套**样式，不得再区分 13px/12px 或 40px/58px 左缩进
  - 字号：**`var(--font-size-sm)`**（14px，与一级侧栏菜单项一致）
  - 内边距：`6px var(--nav-space-4) 6px 40px`
  - 行高区域：`min-height: 40px`
  - 颜色与选中背景：遵循前文「布局共性规则」与 `scripts/layout/MixedLayout.tsx`

**完整实现请参考**：`scripts/layout/MixedLayout.tsx`
