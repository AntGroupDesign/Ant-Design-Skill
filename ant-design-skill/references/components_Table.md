# 表格组件

本节规定所有基于 Ant Design Table 的通用设计规则，适用于 `antd` Table 或 `@ant-design/pro-components` ProTable。

## 目录

| 场景 | 说明 |
| :-- | :-- |
| [表格共性规则](#表格共性规则) | 适用于所有表格组件的顶部筛选选型、筛选控件、值展示、标签、操作列、样式、分页与布局规则 |
| [1. 基础表格 (Basic Table)](#1-基础表格-basic-table) | 仅展示数据，无交互排序、筛选需求 |
| [2. 筛选排序表格 (Filterable and Sortable Table)](#2-筛选排序表格-filterable-and-sortable-table) | 需对单列或多列进行排序、筛选 |
| [3. 嵌套表格 (Nested Table)](#3-嵌套表格-nested-table) | 行内展示关联子数据，使用 `expandedRowRender` |
| [4. 批量操作表格 (Batch Action Table)](#4-批量操作表格-batch-action-table) | 勾选多行执行批量操作（删除、导出等）|
| [5. 拖拽排序表格 (Drag Sort Table)](#5-拖拽排序表格-drag-sort-table) | 支持通过拖拽行调整数据顺序 |
| [6. 带工具栏的表格 (Toolbar Table)](#6-带工具栏的表格-toolbar-table) | toolbar 属性支持 Tab 切换、筛选、按钮等组合操作 |

---

## 表格共性规则

> **提示**：所有用户可见文字（列 title、筛选项 text、操作按钮等）均使用产品对应语言（中文产品用中文），示例中出现的英文仅作演示，请勿照搬。
>
> **页面说明提示条**：默认不生成；仅当用户明确要求，或存在非显而易见的业务规则 / 操作风险 / 生效时机时，才引用 [`layout.md` §页面说明提示条](layout.md#页面说明提示条)。本节「批量操作提示条」仅指勾选行后出现在工具栏与表格之间的提示，二者职责不同。

### 筛选组件使用规则

根据字段的具体属性，选取最合适的选择类组件：

| 筛选类型 | 使用场景 | 推荐组件 |
| :-- | :-- | :-- |
| 文本搜索 | 需要通过任意关键词进行模糊搜索 | `Input prefix={<SearchOutlined />}` |
| 下拉单选 | 需要从多个选项中单选一个 | `Select` |
| 状态标签 | 选项较少（≤4 个）且需平铺展示快速切换 | `Radio.Group` / Segmented |
| 多选组合 | 需要同时选择一个或多个选项进行组合筛选 | `Checkbox.Group` / `Select` mode="multiple" |
| 级联选择 | 需要从严格层级关系中选择完整路径（省/市/区） | `Cascader` |
| 树形结构 | 需要从树状数据中选择一个或多个节点（含父节点） | `TreeSelect` |
| 开关切换 | 需要快速切换单个布尔状态（如启用/停用） | `Switch` |

### 列表页顶部筛选：QueryFilter vs 单行工具栏

凡**任意导航布局**（侧边 / 顶部 / 混合）下的列表页，表格上方的查询区域须在以下两种实现中**二选一**。禁止在筛选项较少时默认使用 QueryFilter，导致重置/查询按钮独占一行、控件过宽、整体占高。

| 判断条件 | 推荐方案 | 规范 / 模板 |
| :-- | :-- | :-- |
| 筛选项 **≤4 个**，且可在卡片宽度内 **单行清晰展示**（含搜索、下拉、状态与查询/重置按钮） | **单行工具栏** | 下文「[工具栏布局](#工具栏布局)」→ **单行工具栏**；结构示例见「[工具栏与表格间距](#工具栏与表格间距)」代码块（`flex` + `Input` + `Select` 等） |
| 筛选项 **≥5 个**，或需要 **展开/收起**，或条件组合复杂、需分区展示 | **搜索卡承载 QueryFilter** | `references/components_Form.md` §5 筛选表单；代码模板 `scripts/form/05-QueryFilter.tsx` |

**选型优先级**（与 `references/components_Form.md` §5 不冲突时）：

1. 先判断能否 **单行清晰展示**；能 → **单行工具栏**，不能 → **QueryFilter**。
2. 所有带顶部筛选的列表/表格页（见 `SKILL.md`「列表页顶部筛选选型」）均须按本表选型，**不得**在无展开收起需求时一律使用 QueryFilter。
3. QueryFilter 的 `submitter` 区域在 ProComponents 中**默认独占一行**，属组件布局行为；筛选项少时应避免 QueryFilter，而非强行压缩栅格。
4. 筛选字段的组件类型（`Input`、`Select`、`Segmented` 等）仍遵循上文「[筛选组件使用规则](#筛选组件使用规则)」；单行工具栏与 QueryFilter **共用**该表，区别仅在**外层布局容器**。
5. 表格/列表筛选区的文本搜索默认使用与 `Select` / `DatePicker` 一致的线框输入框 + 前置放大镜图标；禁止复用顶部导航的 `.nav-search` 或 `variant="filled"` 灰底样式。仅在必须由用户点击搜索按钮触发提交时，才允许使用 `Input.Search`。

### 值展示规则

- **状态类**：在 ProTable 中通过 `valueEnum` 的 `status` 字段配置，禁止在 `render` 中手写颜色。`status` 值与 `global-style.css` 功能色的对应关系如下：

  | valueEnum status | 语义 | 对应 global-style.css 功能色 |
  | :-- | :-- | :-- |
  | `Success` | 成功 / 正常 / 运行中 | `--color-success` (#52c41a) |
  | `Error` | 错误 / 异常 / 失败 | `--color-error` (#ff4d4f) |
  | `Warning` | 警告 / 待处理 | `--color-warning` (#faad14) |
  | `Processing` | 进行中 / 处理中 | `--color-info` (#1677ff) |
  | `Default` | 关闭 / 停用 / 未知 | 中性灰（无对应功能色变量） |
- **长文本**：定义合理列宽，配合 `ellipsis: true` 单行省略，超出部分显示省略号；完整内容须通过 **Tooltip** 展示；**禁止**单元格多行跨行
- **列对齐**：表格业务列默认左对齐；表头与正文必须使用同一列对齐方式，禁止只让表头或正文单独偏移
- **数字类**：数字、百分比、金额、耗时、调用量、带单位指标等，在本 Skill 的默认表格生成中也保持左对齐；禁止仅因字段是数值而设置 `align: 'right'`
- **状态标签**：若数值后需要跟随状态 Tag，仍保持左对齐，避免右对齐时标签参与对齐、破坏数值比较线
- **特殊列例外**：选择框列、展开列、拖拽手柄列、纯图标列可按组件默认居中；除非用户明确要求财务报表式右对齐，否则不生成右对齐数值列
- **可排序列对齐**：可排序列仍遵循列自身对齐规则；排序图标与表头文案保持 8px 间距，不得通过 `align: 'right'`、`justify-content: flex-end` 等方式调整排序图标位置
- **表头不换行**：表头标题默认单行展示，禁止中文表头按字跨行；可排序列须同时预留「标题 + 8px 间距 + 排序图标」的宽度，不能只按正文内容、Tag / Badge 宽度估算列宽
- **短枚举列宽**：状态、等级、优先级、风险等级等短枚举列如带排序 / 筛选，`minWidth` 不低于 96px；4 个中文及以上标题建议 112px；列较多时启用横向滚动，不要通过压缩列宽让表头换行
- **日期类**：使用正确格式，如日期：YYYY-MM-DD
- **进度类**：使用进度条 + 百分比数值展示
- **编号 / 标识类**：按字段**语义**选择字体；**禁止**在表格主数据列使用 `ds-page-caption`（该 class 仅用于说明性辅助文案，非单元格正文）；**禁止**仅因含英文字母或字母数字混排而使用等宽字体——主数据列英文与中文均用正文默认字体（`ds-text-main`）

  | 语义 | 字体 / class | 示例 |
  | :-- | :-- | :-- |
  | 正文 / 业务标识 | 正文默认，`ds-text-main` | 名称、工号、订单号、用户 ID、角色名、含英文的资源名 |
  | 技术标识 | `--font-code` / `.db-font-code` / `Text code` | Git commit、缺陷 ID、API 路径（**非**列表主数据列的常规展示字段） |
  | 金额 / 指标数字（需位数对齐比较） | `--font-number` / `.db-font-number` | ¥527,000、转化率 |


### 标签使用规范

- 语义明确，准确反映数据分类
- 单个数据项展示标签数量不超过 3 个
- 颜色使用 AntD Tag 预设语义值，与 `global-style.css` 功能色对应，禁止写死 hex 值：

  | Tag color 值 | 语义 | 对应 global-style.css 变量 |
  | :-- | :-- | :-- |
  | `"success"` | 成功 / 正常 | `--color-success` |
  | `"error"` | 错误 / 危险 | `--color-error` |
  | `"warning"` | 警告 | `--color-warning` |
  | `"processing"` | 进行中 | `--color-info` |
  | `"default"` | 中性 / 停用 | 无对应功能色变量 |
- 无特殊要求，不为每个标签设计独特颜色，保持简洁统一

### 行背景与业务语义

表格行背景只表达**交互状态**（hover、选中、展开、拖拽、禁用等），不表达数据本身的业务语义。风险等级、时间标记、优先级、最新 / 当前 / 默认等语义应收敛到对应单元格内展示，避免整行铺色造成视觉噪音，并与选中态、hover 态、错误态混淆。

| 场景 | 推荐展示 | 禁止做法 |
| :-- | :-- | :-- |
| 风险等级（高 / 中 / 低） | `Tag color="error" / "warning" / "processing"`，或文字前置语义色圆点 | 用 `rowClassName` 或 `style.background` 给整行加红 / 黄 / 蓝底 |
| 时间标记（今日 / 当前日 / 本周 / 最新） | 日期字段内追加次要文本或轻量 `Tag`，如 `2026-06-17 今日` | 因 `isToday` / `isCurrent` / `isLatest` 给整行加灰底或默认选中 |
| 当前状态（跟进中 / 待跟进 / 已化解） | `valueEnum status`、`Badge status`、语义圆点 + 文案 | 根据状态给整行铺色 |
| 默认 / 推荐 / 重点 / Top 项 | 对应字段内用 Tag / Badge / 次要文本标记 | 映射为 active 行、selected 行或整行强调背景 |
| 需要强调数量（如 4 项高风险待跟进） | PageHeader / 工具栏中的文本指标；若还需解释处置规则，再使用页面说明提示条 | 把所有高风险行整行染红来表达数量 |

**禁止**：

- 禁止因 `record.riskLevel === 'high'`、`status === 'error'`、`priority === 'urgent'`、`isToday`、`isCurrent`、`isLatest`、`isDefault` 等业务字段设置整行背景
- 禁止把业务语义映射成 `selectedRowKeys`、active 行态或默认选中态；只有用户真实选择 / 勾选后才使用选中行背景
- 禁止在同一表格中混用多种业务语义行底色；表格只保留默认白底、表头灰底、hover 背景、选中背景
- 需要强提醒时，优先使用顶部统计文案、对应字段内的 Tag / Badge / 次要文本；只有涉及处置规则、操作风险或生效时机时才使用页面说明提示条，而不是整行色块


#### 操作列按钮规范
表格操作列统一使用**文字链接按钮**，不加图标：

- **可操作状态**：使用 `<a>` 或 `<Button type="link">`，颜色为 `var(--color-table-action)`（`#1677ff`）
- **不可操作状态**：按钮置灰禁用，使用 `disabled` 属性，颜色自动降为 `--color-text-quaternary`（`rgba(0,0,0,0.25)`），禁止手动设置灰色
- **删除按钮**：默认与其他操作保持一致的链接色，**不使用红色 `danger` 属性**；仅当用户明确要求强调危险性时，才可加 `danger`
- **禁止使用图标按钮**：操作列不添加任何图标，保持文字简洁
- **列宽**：展示 2 个文字操作时，操作列 `width` 不小于 **160px**；单元格内容设置 `whiteSpace: 'nowrap'`，禁止换行
- **间距**：多个操作之间仅使用 `Space size={8}` 区分，**禁止**在操作之间插入竖线分隔符 `\|`
- **文案与对齐**：操作文案一般为 2 个字（如「编辑」「删除」「上架」「下架」）；同一单元格内多个操作须垂直居中对齐，统一使用 `Button type="link"`（含 `disabled` 态），禁止混用 `<a>` 与 `Button type="link">` 导致错位


### 表格样式规范

表格正文内容复用**常规正文**规范：`font-size: 14px`，`line-height: 22px`，`color: var(--color-text)`（`rgba(0,0,0,0.88)`），直接使用 `.ds-text-main` 工具类或对应 token 变量。表头背景色、行悬浮背景色通过 Ant Design [ConfigProvider theme.token](https://ant.design/components/config-provider-cn#configproviderconfig) 全局注入；首末列外侧边距通过 CSS 覆盖实现：

```tsx
import { ConfigProvider, Table } from 'antd';

const tableTheme = {
  token: {
    fontSize: 14,
    colorPrimary: '#1677ff',
    borderRadius: 8,
    borderRadiusLG: 8,
  },
  components: {
    Table: {
      headerBg: '#fafafa',
      headerHoverBg: '#fafafa',
    },
  },
};
```

> **注意**：`ConfigProvider` 的 `theme.token` / `theme.components` 须传入**具体色值**（如 `#1677ff`、`#fafafa`），**禁止**传入 CSS 变量字符串（如 `'var(--color-primary)'`），否则 Ant Design 运行时无法正确解析。

表格卡片内**工具栏 / Tab / 筛选区 / Table 外框 / 分页器**共用同一条卡片内部内容线，距卡片外缘 **24px**（`var(--nav-space-6)`），与 [`layout.md` §页面内容水平对齐](layout.md#页面内容水平对齐)、[`components_List.md`](components_List.md) 的容器内部留白一致。Table 表头 / 表体文字还须保留自身单元格可读留白：首列 `padding-left: var(--padding)`（16px）、末列 `padding-right: var(--padding)`（16px）。该内部内容线不得套用到页面级 PageHeader；页面级标题继承 Content 留白并与卡片外缘对齐。

#### 表格卡内部垂直节奏（16 / 16 / 24）

表格卡内部采用「水平 24、垂直 16」的分层节奏，避免把所有间距都写成 24px。

| 位置 | 间距 | Token | 说明 |
| :-- | :-- | :-- | :-- |
| 卡片左 / 右边缘 → 工具栏、Tab、Table 外框、分页内容线 | **24px** | `var(--nav-space-6)` | 由卡片内容区承担 |
| Table 单元格边缘 → 首末列文字 | **16px** | `var(--padding)` | 表格自己的可读留白，避免文字贴灰色表头 / 行背景边缘 |
| 卡片顶部 → 工具栏 / Tab 行 | **16px** | `var(--padding)` | 卡片 `padding-block-start` 承担，工具栏自身不再加 top padding |
| 工具栏 / Tab 行 → Table 顶部 | **16px** | `var(--padding)` | `ds-table-toolbar + Table` 或 ProTable ListToolBar `padding-bottom` 承担 |
| Table 底部 → 分页器 | **16px** | `var(--padding)` | 由 `.ant-table-pagination` margin-top 或 `.ds-table-pagination` padding-top 承担 |
| 分页器 → 卡片底部 | **16px** | `var(--padding)` | 卡片 `padding-block-end` 承担 |
| 无分页 Table → 卡片底部 | **16px** | `var(--padding)` | 卡片 `padding-block-end` 承担，禁止贴底 |

**禁止**：

- 卡内工具栏、Tab、Table、分页之间全部使用 24px，导致内部节奏过松
- 表格卡已有 `padding-inline: 24px` 时，工具栏 / 分页 / Table wrapper 再写 `padding-inline: 24px`，导致水平缩进叠成 48px；但 Table 首末列必须保留 16px 单元格内部留白
- 同时保留 ProTable 默认 ListToolBar 顶部 padding 与卡片顶部 padding，导致 Tab 距卡片顶变成 32px
- 把表格卡写成 `paddingBlock: 'var(--padding) 0'`、`paddingBottom: 0`、`bodyStyle={{ paddingBottom: 0 }}`，导致分页或最后一行贴到卡片底部
- 用业务语义（风险等级、今日、最新、默认、重点等）给整行设置红 / 黄 / 蓝 / 灰底，破坏表格扫描性；业务语义只在对应单元格内用 Tag / Badge / 圆点 / 次要文本表达

**实现**（二选一，**禁止叠加**）：

| 方式 | 卡片水平内边距 | Table 首末列 | 适用 |
| :-- | :-- | :-- | :-- |
| **B. 卡片内容区承担**（**默认**，table scripts / 含标题 Table / ProTable） | `padding-inline: var(--nav-space-6)`（`ds-page-card` / Card body） | **16px**（`var(--padding)`，表格单元格内部可读留白） | 纯 Table、工具栏 Table、批量操作、带 Tab ProTable |
| **A. 区块各自承担** | `0` | **24px**（`global-style.css` 全局规则） | 仅遗留 / 特殊壳层水平已为 0 且无 `ds-list-card` 时 |

**方案 B 标准写法**（推荐）：

```tsx
<div
  className="ds-page-card ds-table-card-padded"
>
  <Table ... />
</div>
```

**自定义 toolbar / pagination 推荐结构**：

```tsx
<div className="ds-page-card ds-table-card-padded">
  <div className="ds-table-toolbar">
    {/* Tabs / 搜索 / 筛选 / 新建 */}
  </div>
  <Table pagination={false} />
  <div className="ds-table-pagination">
    <Pagination />
  </div>
</div>
```

> 亦可仅用 `className="ds-table-card"`（padding 与首末列内边距规则合一，等价于 `ds-page-card` + `ds-table-card-padded`）。

在 `global-style.css` 中，方式 A 的全局首末列规则与方式 B 的清零规则如下（选择器须含 `.ant-table-cell`，避免 Ant Design CSS-in-JS 中 `padding` 简写覆盖导致规则失效）：

```css
/* 方式 A：Table 首末列左右各 24px（列表卡 body:0 等场景） */
.ant-table-wrapper .ant-table-thead > tr > th.ant-table-cell:first-child,
.ant-table-wrapper .ant-table-tbody > tr > td.ant-table-cell:first-child {
  padding-left: var(--nav-space-6) !important;
}

.ant-table-wrapper .ant-table-thead > tr > th.ant-table-cell:last-child,
.ant-table-wrapper .ant-table-tbody > tr > td.ant-table-cell:last-child {
  padding-right: var(--nav-space-6) !important;
}

/* 方式 B：卡片内容区已 padding-inline 24px 时，首末列保留 16px 单元格内部留白 */
.ds-table-card-padded .ant-table-wrapper ...:first-child { padding-left: var(--padding) !important; }
.ds-table-card-padded .ant-table-wrapper ...:last-child { padding-right: var(--padding) !important; }
```

**禁止**：`ds-page-card` 与全局首末列 24px **同时生效**（会叠成 48px）。表格卡片必须加 `ds-table-card-padded`。`ds-table-card-padded` 下首列 / 末列保留 `var(--padding)`（16px）作为 Table 单元格内部留白，避免表头 / 行内容文字贴边；不要清到 0。

若 CSS 仍被组件库覆盖，可在 columns 上对首列 / 末列使用 `onHeaderCell` / `onCell` 注入 `paddingInline: 'var(--nav-space-6)'` 作为兜底。

操作列示例：

```tsx
// columns 定义
{
  title: '操作',
  key: 'action',
  width: 160,
  render: (_, record) => (
    <Space size={8} align="center" className="table-action-cell">
      <Button type="link">编辑</Button>
      <Button type="link" disabled>删除</Button>
    </Space>
  ),
},
```

| 样式属性 | 值 | 实现方式 |
| :-- | :-- | :-- |
| 正文字号 | `--font-size-sm`（14px） | ConfigProvider theme.token |
| 正文行高 | `calc(--font-size-sm + 8px)`（22px） | 复用正文工具类 |
| 正文颜色 | `--color-text`（`rgba(0,0,0,0.88)`） | `.ds-text-main` 工具类 |
| 表头背景 | `--color-table-header-bg`（`#fafafa`） | ConfigProvider `components.Table.headerBg` |
| 行悬浮背景 | `--color-table-row-hover`（`#fafafa`） | ConfigProvider `components.Table.headerHoverBg` |
| 操作列宽 | 160px（2 个文字操作） | columns `width` |
| 操作链接色 | `--color-table-action`（`#1677ff`） | `Button type="link"` 默认主题色 |
| 操作间距 | 8px | `Space size={8}` |
| 工具栏 / 筛选 / Tab 左右 | 24px（`var(--nav-space-6)`） | 方式 B：卡片 `padding-inline`；方式 A：容器 `padding-inline` |
| Table 外框左 / 右 | 24px | 方式 B：由卡片内容区承担；方式 A：由 Table 首末列 24px 承担 |
| 首列 / 末列单元格内部留白 | 16px | 方式 B：Table 首列 padding-left、末列 padding-right 保留 `var(--padding)`；方式 A：首末列 24px 已包含外框与单元格留白 |
| 分页区左右 | 24px（`var(--nav-space-6)`） | 方式 B：由卡片承担；方式 A：分页包裹层 `padding-inline` |

### 分页规范

使用 Ant Design `Pagination` 组件，配合 `Table` 的 `pagination` 属性关闭内置分页：

```tsx
import { Table, Pagination } from 'antd';

// Table 关闭内置分页
<Table columns={columns} dataSource={pageData} pagination={false} />

// 自定义分页器放在表格下方
<Pagination
  current={page}
  pageSize={pageSize}
  total={filteredData.length}
  onChange={(p) => setPage(p)}
  showSizeChanger={false}
/>
```

- `showSizeChanger={false}`：隐藏每页条数切换器，保持简洁
- 分页器右对齐，与工具栏布局对齐
- 分页器容器与 Table 末列右缘、工具栏同一对齐线：**方式 B** 由卡片 `padding-inline` 承担，分页包裹层**勿再**加 `padding-inline`；**方式 A** 时分页包裹层须 `padding-inline: var(--nav-space-6)`
- 分页器样式继承 Ant Design 默认，无需额外配置

```tsx
{/* 方式 B：卡片已承担左右 24px，分页只保留垂直间距 */}
<div className="ds-table-pagination">
  <Pagination ... />
</div>
```

```tsx
// ✓ 正确：统一 Button type="link"，仅用间距区分
<Space size={8} align="center" className="table-action-cell">
  <Button type="link">编辑</Button>
  <Button type="link">发布</Button>
</Space>

// ✓ 正确：不可操作时置灰
<Button type="link" disabled>删除</Button>

// ✗ 错误：操作之间加竖线 |
<span>|</span>

// ✗ 错误：混用 <a> 与 Button type="link"> 导致未对齐
<a>编辑</a>
<Button type="link" disabled>删除</Button>

// ✗ 错误：操作列加图标
<Button type="link" icon={<EditOutlined />}>编辑</Button>

// ✗ 错误：删除默认加红色
<Button type="link" danger>删除</Button>


## 排列和布局

### 工具栏布局
| 类型 | 适用场景 | 设计说明 |
| :-- | :-- | :-- |
| **单行工具栏** | 操作和信息简洁，可在一行内清晰展示 | 最左侧为表格标题 / 当前结果标题；右侧从左到右依次：搜索、筛选、新建等创建型操作、刷新/批量导出等全局操作 |
| **复杂筛选** | 控件较多、需要多行或展开收起 | 不放在表格卡内部，须上移为独立搜索卡，并由搜索卡承载 `QueryFilter` |
| **无标题工具栏** | 表格上下文已非常清晰，无需重复说明 | 省略标题，搜索框需前置 |
| **标题下拉菜单** | 表格存在几种核心状态或分类需切换，且选项数量为 4-7 个时使用。若选项 ≤4 个且需要高曝光，优先使用"带标签"而非下拉菜单 | 将核心状态/分类设计成标题下拉菜单，方便快速切换 |
| **带标签** | 存在筛选频率最高的字段，子集固定且数量较少（≤4个） | 将最高频筛选字段的子集用卡内顶部 Tab Strip 展示在工具栏最左侧 |

### 卡内顶部 Tab Strip

当表格顶部存在结果分类 Tab（如「全部 / 进行中 / 失败」或「数据表 / API」）时，须使用卡内顶部 Tab Strip。Tab Strip 是结果集合的轻量分类导航，不等同普通工具栏，不用于承载复杂筛选。

| 规则 | 值 | 说明 |
| :-- | :-- | :-- |
| Tab Strip 距卡片顶 | **16px**（`var(--padding)`） | 由 `.ds-card-tab-strip` 顶部 padding 承担 |
| Tab 行高度 | **32px** | `toolbar-tabs` / ProTable toolbar tab 统一固定高度，避免 Tab 行忽高忽低 |
| Tab Strip 与 Table 顶间距 | **16px**（`var(--padding)`） | Tab Strip 底部 padding 承担；禁止再触发 `.ds-card-toolbar + Table` 的 16px margin |
| Tab 与轻量操作同行 | 同一行 | Tab 在左侧；搜索、少量筛选、日期、添加等操作在**右侧** |
| Tab 底部分割线 | 无整条灰线 | 去掉 Tabs 导航容器底边（`className="toolbar-tabs"`，见 `global-style.css`） |
| 选中 Tab 指示 | 无下划线 | 选中项只保留主色文字与数量弱主色态；禁止 AntD ink-bar、整块背景、描边 |
| Tab 数量 | 中性数量 | 使用 `className="ds-tab-count"`；默认灰底 / 次要文字，active 时跟随主色弱强调 |

**Tab Strip 只允许轻量单行**：

| 结构 | 适用 | 间距规则 |
| :-- | :-- | :-- |
| `ds-card-tab-strip` | 结果分类 Tab、少量筛选项、搜索框和 1～2 个结果级操作按钮能在一行内展示 | Tab 在左，筛选 / 操作在右；顶部 16px、Tab 行 32px、底部 16px；到 Table 不再额外 `marginTop` |

若筛选项需要多行、展开收起、字段 ≥5 个，或同行展示会挤压主操作，必须上移为独立 `<Card className="ds-search-panel">` 承载 `QueryFilter`，不得在表格卡内部承载复杂筛选。

> **禁止**：在表格卡内部使用双行筛选工具栏；让右侧操作换行或主按钮掉到第二行；用负 `margin` 修正 Tab 位置；在 Tab Strip 和 Table 之间手写 `marginTop: var(--padding)` / `marginTop: var(--margin-md)`；同时保留 ProTable 默认 ListToolBar padding 与外层卡片 padding；把 Tab 数量用 `Badge` 的 error / warning / success 红黄绿语义色表达。

**结构示例**（antd `Tabs` + `Table`）：

```tsx
<div className="ds-page-card ds-table-card-padded" style={{ background: 'var(--color-bg-container)', ... }}>
  <div className="ds-card-tab-strip table-toolbar-with-tabs">
    <Tabs
      className="toolbar-tabs"
      items={tabItems.map((item) => ({
        ...item,
        label: <span>{item.label}<span className="ds-tab-count">{item.count}</span></span>,
      }))}
    />
    <Space className="ds-card-toolbar-actions" size={8} align="center">
      <div className="search-wrapper">
        <Input
          className="table-filter-search"
          prefix={<SearchOutlined />}
          placeholder="搜索..."
          style={{ width: 280 }}
        />
      </div>
      <Select /* 筛选 */ />
      <DatePicker.RangePicker /* 日期 */ />
      <Button type="primary">添加</Button>
    </Space>
  </div>
  <Table tableLayout="fixed" pagination={false} />
</div>
```

> `ds-card-tab-strip`、`table-toolbar-with-tabs`、`toolbar-tabs`、`ds-table-card-with-tabs`、`ds-tab-count` 样式定义见 `references/global-style.css`。Tab Strip 按 **16 / 32 / 16** 固定节奏承接到 Table，禁止再包一层 `marginTop`。

**ProTable 实现注意**（`toolbar.menu.type: 'tab'` + 外层卡片 **方案 B**：`ds-page-card ds-table-card-padded`）：

| 问题 | 原因 | 处理 |
| :-- | :-- | :-- |
| Tab 距卡片顶约 32px（偏大） | 外层卡片 `padding-block-start: 16px` 与 ProTable ListToolBar 默认 `padding-block: 16px` 叠加 | 外层容器加 `className="ds-table-card-with-tabs"`，由 `global-style.css` 去掉工具栏 `padding-block-start` |
| Table 左右缩进偏大（48px） | 外层 `ds-page-card` 与 Table 首末列 24px 叠加 | 外层容器同时加 `ds-table-card-padded` |
| Table 左右缩进偏大（ProCard body） | ProTable 内部 `ProCard` body 仍有默认 padding | 外层容器加 `className="ds-table-card-with-tabs"`，由 `global-style.css` 清掉 `.ant-pro-card-body` padding |
| Tab Strip 与 Table 顶间距 | ListToolBar 容器默认 padding 偏大 | `ds-table-card-with-tabs` 将底部 padding 收敛为 `var(--padding)`（16px），勿再额外 `marginTop` / 外层包裹 |

```tsx
<div
  className="ds-page-card ds-table-card-padded ds-table-card-with-tabs"
  style={{ background: 'var(--color-bg-container)', ... }}
>
  <ProTable
    search={false}
    toolbar={{ menu: { type: 'tab', ... }, actions: [...] }}
    ...
  />
</div>
```

### 工具栏与表格间距

当表格上方放置独立的筛选工具栏区域（**无 Tab**）时，工具栏底部与表格顶部之间的间距统一为 **20px**（`var(--margin-md)`），不使用分割线。若筛选区与 Tab 同属卡片内部工具栏，则按上文 `ds-card-toolbar` 结构处理，不再套用 20px。

**有 Tab 时**：卡内顶部 Tab Strip 与 Table 顶部间距为 **16px**（`var(--padding)`），见上文「卡内顶部 Tab Strip」。

示例代码：

```tsx
<div className="ds-page-card ds-table-card-padded" style={{ background: 'var(--color-bg-container)', ... }}>
  {/* 工具栏：左右由卡片 padding 承担，勿再加 padding-inline */}
  <div className="ds-card-toolbar ds-card-toolbar-inline">
    <div className="search-wrapper">
      <Input
        className="table-filter-search"
        prefix={<SearchOutlined />}
        placeholder="搜索..."
        style={{ width: 280 }}
      />
    </div>
    <Button type="primary">新建</Button>
  </div>

  {/* 无 Tab 工具栏：顶部间距 20px */}
  <div style={{ marginTop: 'var(--margin-md)' }}>
    <Table tableLayout="fixed" ... />
  </div>
</div>
```

| 样式属性 | 值 | 说明 |
| :-- | :-- | :-- |
| 工具栏与表格间距 | `var(--margin-md)`（20px） | 工具栏与表格为独立区域时的垂直间距 |
| 分割线 | 无 | 工具栏与表格之间无需分割线 |

> 注意：此间距规则仅适用于工具栏与表格为独立区域的情况。若使用列头筛选（`filters`）或工具栏嵌入表格内部，无需额外间距。

#### 工具栏与表格之间禁止插入汇总条

工具栏底部与表格顶部之间**仅允许**表格本体（或 ProTable 内容区），**禁止**在二者之间插入自定义汇总条、统计条、灰色信息带等中间层容器。

| 需展示的信息 | 推荐位置 | 规范引用 |
| :-- | :-- | :-- |
| 待办数量、筛选合计、口径摘要等**轻量统计** | 页面标题区 `extra`（与全局操作按钮并列） | [`layout.md` §页面标题区 extra](layout.md#页面标题区-extra) |
| 勾选行后的批量操作反馈 | **批量操作提示条**（工具栏与表格之间，仅勾选后出现） | 下文 §批量操作提示条 |
| 跨页全局核心指标 | 指标卡 / 图表区块（表格**上方**独立大区块） | `components_Chart.md` |
| 业务规则与操作说明 | **页面说明提示条**（标题下方） | [`layout.md` §页面说明提示条](layout.md#页面说明提示条) |

**反例**（禁止）：

```tsx
// ✗ 工具栏与表格之间插入汇总条
<div className="ds-table-toolbar">...</div>
<div style={{ background: 'var(--color-fill-quaternary)', ... }}>
  当前筛选 8 条 · 合计 ¥65,115.50
</div>
<Table ... />
```

```tsx
// ✓ 轻量统计放标题区 extra；工具栏后直接接表格
<PageHeader
  title="费用报销"
  extra={
    <Space>
      <Text type="secondary">待审批 5 条 · 合计 ¥65,115.50</Text>
      <Button type="primary">批量通过</Button>
    </Space>
  }
/>
<div className="ds-table-toolbar">...</div>
<div style={{ marginTop: 'var(--margin-md)' }}>
  <Table ... />
</div>
```

### 表格布局

- **列宽**：根据字段及值的长度定义合理列宽，保证可读性，防止布局破坏；**禁止**仅给部分列设宽、让首列无宽无限撑开
- **首列宽度**：核心文本列（如名称）须设置 `width`（百分比如 `'32%'` 或固定像素），配合 `ellipsis: true`
- **表格布局模式**：混合使用百分比列宽与固定像素列宽时，须设置 `tableLayout="fixed"`，避免列宽被自动算法挤压
- **字段排序**：将最有利于用户识别和决策的字段信息前置
- **操作列**：最多展示 2 个最常用操作，其余收纳进"更多"菜单；宽度不小于 160px，内容禁止换行
- **固定列**：列数量较多时固定前后列，横向滚动查看；首列放区分行最核心字段，尾列放操作列


## 与页面整体布局的协调要求

表格通常放在白色卡片容器中，卡片外缘与页面级 PageHeader 对齐；卡片内部内容线遵循 [`layout.md` §页面内容水平对齐](layout.md#页面内容水平对齐)（距卡片外缘**左右 24px**）。

**默认（方案 B）**：卡片 shell 使用 `className="ds-page-card ds-table-card-padded"`（上 16 / 左右 24 / 下 16），Table 外框与工具栏 / Tab / 分页共用 24px 内容线；Table 首末列保留 **16px 单元格内部留白**，避免灰色表头 / 行背景中的文字贴边。工具栏 / Tab / 分页**勿再**叠加水平 `padding-inline`。

**含 Card 标题 + Table**（如「主机资源明细」）：同一套 `ds-page-card ds-table-card-padded`；标题与 Table 间距 **16px**（`var(--padding)`）。

**列表卡内 Table**：列表卡使用 `ds-list-card`（方案 B），Table 首末列由 `global-style.css` 在 `.ds-list-card` 下自动保留 16px 单元格内部留白；若 Table 在 `ds-page-card` 等其它已承担 horizontal padding 的容器内，须叠加 `ds-table-card-padded`。

```tsx
{/* 纯 Table — 方案 B */}
<div
  className="ds-page-card ds-table-card-padded"
>
  <Table ... />
</div>
```

| 样式属性 | 值 | 说明 |
| :-- | :-- | :-- |
| 水平对齐线 | `var(--nav-space-6)`（**24px**） | 表格卡内部内容线；卡片外缘与 PageHeader 对齐，PageHeader 不再叠加该 24px |
| 默认实现 | `ds-page-card` + `ds-table-card-padded` | 卡片内容区承担 24px，Table 首末列保留 16px 单元格内部留白；**禁止**与全局首末列 24px 叠加 |
| 垂直内边距 | 上 16px / 下 16px | `ds-page-card` 默认；带 Tab ProTable 可覆写 `paddingBlock: var(--padding) 0` |
| 背景色 | `var(--color-bg-container)`（#fff） | 白色卡片背景 |
| 圆角 | `var(--border-radius-lg)`（8px） | 卡片圆角 |
| 阴影 | `var(--shadow)` | 卡片投影；表格 / 列表 / 搜索 / 指标等页面级白卡默认无描边，禁止用 AntD Card 默认 `bordered` 替代投影 |

- 组件宽度不超过页面内容区域
- 组件与页面网格系统对齐
- 响应式策略：参照 `references/global-style.css` 中的响应式断点（`--screen-xs` 至 `--screen-xxl`）适配不同屏幕

> **卡片投影与页面背景**：卡片投影使用 `--shadow`（见 `references/global-style.css`），在 SideLayout / MixedLayout 的浅色渐变背景（画布底色 `#f7f8fa`）上对比度较低，属 token 设计意图（轻投影），**不是投影 token 取值错误**。若页面背景为渐变布局，白色卡片边界可能不如纯色背景清晰；此时优先检查背景层叠加效果，**不要**擅自改用 `--shadow-hover` 或额外描边替代 `--shadow`，除非产品明确要求增强层级。

---

## 六类使用场景 (Six Usage Scenarios)

### 1. 基础表格 (Basic Table)

适用场景：仅展示数据，无交互排序、筛选需求。

**代码模板**：`scripts/table/01-BasicTable.tsx`

---

### 2. 筛选排序表格 (Filterable and Sortable Table)

适用场景：需要对单列或多列进行排序、筛选。

**代码模板**：`scripts/table/02-FilterSortTable.tsx`

---

### 3. 嵌套表格 (Nested Table)

适用场景：行内需要展示关联的子数据（如版本列表、设备详情等），使用 `expandedRowRender` 实现。

**代码模板**：`scripts/table/03-NestedTable.tsx`

---

### 4. 批量操作表格 (Batch Action Table)

适用场景：需要勾选多行并执行批量操作（批量删除、批量导出等）。

> **注意**：当列头包含 checkbox（全选框）或可排序列（含排序下拉箭头）时，checkbox、下拉箭头与列头名称之间的水平间距应保持 **8px**，通过 CSS 覆盖实现：
>
> ```css
> /* checkbox、下拉箭头与列头名称间距 8px */
> .ant-table-wrapper .ant-table-thead > tr > th .ant-table-column-sorter {
>   margin-inline-start: 8px !important;
>   margin-left: 8px !important;
> }
> ```

#### 批量操作提示条 (Batch Action Alert)

> 与 [`layout.md` §页面说明提示条](layout.md#页面说明提示条) 区分：批量操作提示条位于**表格内部**、勾选行后出现；页面说明提示条位于**页面标题下方**、解释全局业务规则。

勾选行后展示的「已选 N 项 / 取消选择 / 批量操作」提示条，须与表格正文 typography 一致。**禁止**使用裸 `<span>` 继承页面默认字号（易出现 16px 与表格 14px 不一致）。

| 样式属性 | 值 | 实现方式 |
| :-- | :-- | :-- |
| 提示文案字号 | `--font-size-sm`（14px） | `.ds-text-main` 工具类 |
| 提示文案行高 | `calc(--font-size-sm + 8px)`（22px） | `.ds-text-main` 工具类 |
| 提示文案颜色 | `--color-text` | `.ds-text-main` 工具类 |
| 取消选择 | `Button type="link"` | 与操作列 link 按钮同一套行高 |
| 文案与 link 间距 | 8px | `Space size={8}` |
| 文案与 link 行高对齐 | 22px | `Space align="center"` + `.table-batch-alert-cell` |
| 提示条背景 | `#fafafa` | 容器 `background` |
| 提示条圆角 | 6px | 容器 `borderRadius: 6` |
| 提示条内边距 | `8px 12px` | 容器 `padding` |
| 提示条左右对齐 | `var(--nav-space-6)`（**24px**） | **方式 B**：卡片已承担，**勿**加 `margin-inline`；**方式 A**：容器 `margin-inline: var(--nav-space-6)` |
| 与工具栏间距 | `var(--margin-md)`（20px） | 位于工具栏与 Table 之间时使用 |

**ProTable**：使用 `tableAlertRender` / `tableAlertOptionRender`，内部文案与「取消选择」仍须加 `.ds-text-main` 与 `Button type="link"`，**禁止**裸 `<span>` + `<a>`。

**纯 antd Table**（无 ProComponents）：在工具栏与 Table 之间手写提示条，结构如下：

```tsx
{selectedRowKeys.length > 0 && (
  <div
    className="table-batch-alert"
    style={{
      marginTop: 'var(--margin-md)',
      padding: '8px 12px',
      background: '#fafafa',
      borderRadius: 6,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}
  >
    <Space size={8} align="center" className="table-batch-alert-cell">
      <span className="ds-text-main">已选 {selectedRowKeys.length} 项</span>
      <Button type="link" onClick={() => setSelectedRowKeys([])}>
        取消选择
      </Button>
    </Space>
    <Button type="primary">批量上架</Button>
  </div>
)}
```

> `.table-batch-alert-cell` 样式定义见 `references/global-style.css`，与操作列 `.table-action-cell` 共用 link 按钮 22px 行高规则。

**代码模板**：`scripts/table/04-BatchTable.tsx`

---

### 5. 拖拽排序表格 (Drag Sort Table)

适用场景：需要支持对表格行进行拖拽调整排序。

依赖包：`@dnd-kit/core`、`@dnd-kit/sortable`、`@dnd-kit/utilities`、`@dnd-kit/modifiers`。

**实现要点**：

- `DndContext` / `SortableContext` 须通过 `components.body.wrapper` 挂载在 `<tbody>` 外层，**禁止**包裹整个 `<Table>`，否则会破坏表头 DOM 导致列标题不显示
- 使用 `components.body.row` 自定义行时，**每列须设置固定 `width`**（像素或百分比），配合 `tableLayout="fixed"`
- 拖拽手柄列 `title` 留空字符串即可；表头须 `white-space: nowrap` 防止换行
- 工具栏与表格间距、表格与底部摘要间距均使用 `var(--margin-md)`（20px）

**代码模板**：`scripts/table/05-DragSortTable.tsx`

---

### 6. 带工具栏的表格 (Toolbar Table)

适用场景：需要在表格顶部使用 toolbar 支持 Tab 切换分类、筛选组件和操作按钮的组合，适合多维度数据切换与快捷操作。

布局须符合上文 **「卡内顶部 Tab Strip」**：Tab 与搜索/筛选/日期/添加同一行，筛选项与操作按钮在右侧；Tab Strip 按 16 / 32 / 16 节奏承接到 Table、无整条底部分割线、无 ink-bar；Tab 数量使用 `ds-tab-count` 中性样式。

**toolbar 各子属性的布局规范（ProTable）：**

| toolbar 子属性 | 类型 | 布局位置 | 说明 |
| :-- | :-- | :-- | :-- |
| `menu` (type: 'tab') | `ToolbarMenu` | 工具栏左侧 | Tab 切换不同数据维度，配合 `activeKey` + `onChange` 受控管理 |
| `filter` | `ReactNode` | 工具栏右侧区域 | 搜索、筛选、日期等，与 `actions` 同处右侧 |
| `actions` | `ReactNode[]` | 工具栏右侧 | 新建、导出等操作按钮 |
| `options` | `TableOption` | 工具栏最右侧 | 刷新、密度、列设置等 |

> `activeKey` 与 Tab 状态需通过 `useState` 受控管理，切 Tab 时触发数据重新请求（`request` 会自动被调用）。

**间距**：外层卡片须加 `className="ds-page-card ds-table-card-padded ds-table-card-with-tabs"`，避免 ProTable ListToolBar 与卡片 `padding` 叠加导致 Tab 距顶变为 32px，并防止 Table 首末列双倍缩进；详见上文「卡内顶部 Tab Strip → ProTable 实现注意」。

**代码模板**：`scripts/table/06-ToolbarTable.tsx`
