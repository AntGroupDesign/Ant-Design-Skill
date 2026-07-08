# 描述列表组件 (Description List Components)

本节规定所有基于 Ant Design `Descriptions` / ProComponents `ProDescriptions` 的通用设计规则，适用于详情页中的结构化字段信息展示。

> **Token 使用**：描述列表统一使用本 Skill `global-style.css` 中的 `--color-text-tertiary`、`--color-text`、`--margin-xs`、`--margin`、`--color-bg-card-inner` 等标准变量，模板中不得引入旧版别名。

## 目录

| 场景 | 说明 |
| :-- | :-- |
| [描述列表共性规则](#描述列表共性规则) | 值展示、操作 icon 对齐、视觉与布局等通用约束 |
| [1. 基础描述列表 (Basic Descriptions)](#1-基础描述列表-basic-descriptions) | 结构化字段信息展示，2~3 列布局 |
| [2. 可编辑描述列表 (Editable Descriptions)](#2-可编辑描述列表-editable-descriptions) | 查阅与即时编辑一体，适用于复杂多维数据的纠错与更新 |
| [3. 分组卡片描述列表 (Grouped Card Descriptions)](#3-分组卡片描述列表-grouped-card-descriptions) | 页面含 2 个及以上语义分组，每组独立 Card + Descriptions 只读展示 |

---

## 描述列表共性规则

以下规则适用于本文件所有描述列表组件，各组件不再重复说明。

> **页面说明提示条**：默认不生成；仅当用户明确要求，或字段含义、编辑生效范围、只读策略容易误解时，才引用 [`layout.md` §页面说明提示条](layout.md#页面说明提示条)。

### 描述列表选型

| 判断条件 | 推荐方案 |
| :-- | :-- |
| 单组结构化字段，只读展示 | §1 基础描述列表 |
| 需行内编辑、保存、动态字段类型 | §2 可编辑描述列表 |
| 页面含 **≥2** 个语义分组（如账户 / 机构） | §3 分组卡片描述列表 |

**选型优先级**：先判断分组数；≥2 组用分组卡片。单组再判断是否需要编辑；需编辑用可编辑描述列表，否则用基础描述列表。

### 值展示规则

| 类型 | 规则 |
| :-- | :-- |
| 短文本 | 完整展示，左对齐 |
| 状态标签 | 使用 AntD `Tag` 组件，颜色语义正确（`success` / `error` / `warning` / `processing`） |
| 手机号 / 订单号 / 日期等 | 算作可读内容，左对齐 |
| 千分位数字 | 默认加千分位，如 `123,220` |
| 计量单位 | 小写字母，如 `123,220kg` |
| 百分比 | 如 `12.32%` |
| 分数进度 | 如 `12/30` |
| 日期格式 | `YYYY-MM-DD`，如 `2019-12-09` |
| 日期范围 | 波浪号前后加空格，如 `2018-12-08 ~ 2019-12-07` |
| 相对时间 | 1分钟内：`刚刚`；1小时内：`N分钟前`；24小时内：`N小时前`；24小时外：`MM-DD HH:mm`；超1年：`YYYY-MM-DD HH:mm` |
| 金额 | `CNY1,123.00` 或 `￥123.00` |
| 长文本 / 代码块 | 放最后一行，自动换行，用灰色块（`var(--color-bg-card-inner)`）包裹；如含编辑 / 复制等操作 icon，icon 须放在灰色块内并跟随文本末尾 |
| 可点击内容 | 使用链接色 `var(--color-info)`；文字操作用 `Typography.Link` 或 `Button type="link" size="small"` |
| 带操作 icon | 见下方 [操作 icon 与同行对齐](#操作-icon-与同行对齐) |

### 操作 icon 与同行对齐

同一 Descriptions 页面内，value 区的正文、操作 icon、文字链接须**同色、同行 baseline 对齐**。规则如下：

| 规则 | 说明 |
| :-- | :-- |
| **同行容器** | 正文与 icon / 链接包在同一容器内；短文本使用 **`db-descriptions-value-row`**：`display: inline-flex`、`align-items: baseline`、`gap: var(--margin-xs)` |
| **长文本容器** | 长文本 / 代码块使用 **`db-descriptions-long-text`** 包裹灰色块内容；操作 icon 放在该容器内部、正文之后，跟随文本末尾自然换行，禁止放在灰色块外或单独另起一行 |
| **icon 按钮** | 统一 `Button type="text" size="small" ant-btn-icon-only`，并加 class **`db-descriptions-action-icon`**；**禁止**对单个字段单独覆盖 color |
| **icon 颜色（默认）** | `var(--color-text-tertiary)` |
| **icon 颜色（hover）** | `var(--color-info)` |
| **同页一致** | 编辑、显隐、复制等所有操作 icon **须同一组件 / 同一 class**，禁止部分 icon 走 AntD 默认色、部分走自定义色 |
| **对齐** | 与 AntD Descriptions 正文 baseline 一致；**禁止**在 value 内对短文本 + 操作使用 `Flex align="center"` |
| **禁止** | 默认 `Button type="link"`（无 `size="small"`）与 14px 正文混排——行高会被撑到 32px，导致错位 |

样式定义见 `references/global-style.css`「描述列表样式覆盖」段落（`.db-descriptions-value-row`、`.db-descriptions-long-text`、`.db-descriptions-action-icon`）。

**结构示例**：

```tsx
<span className="db-descriptions-value-row">
  <span>{value}</span>
  <Button type="text" size="small" className="db-descriptions-action-icon" icon={<EditOutlined />} />
</span>
```

**长文本带操作示例**：

```tsx
<span className="db-descriptions-long-text">
  {description}
  <Button
    type="text"
    size="small"
    className="db-descriptions-action-icon"
    icon={<EditOutlined />}
  />
</span>
```

### 视觉规范

| 元素 | 颜色 | 字号 | 字重 |
| :-- | :-- | :-- | :-- |
| 字段标题（label） | `var(--color-text-tertiary)`（rgba(0,0,0,0.45)，与 AntD Descriptions 默认一致） | 14px | 400（跟随 AntD 默认，无需手动设置） |
| 正文内容（value） | `var(--color-text)`（rgba(0,0,0,0.88)） | 14px | 400（跟随 AntD 默认，无需手动设置） |
| 操作 icon（默认） | `var(--color-text-tertiary)` | 14px | — |
| 操作 icon（hover） | `var(--color-info)` | 14px | — |

> 当全局 `global-style.css` 与上述规则冲突时，**优先遵循 `global-style.css`**。

### 布局规则

- 列数：信息维度少用 **2 列**，多时用 **3 列**，通过 `column` 属性控制
- 每列字段左对齐，列间保持固定垂直间距
- `label` 默认单行展示，禁止被压缩成逐字换行或跨行断开；若字段标题发生换行，优先降低 `column`（3 → 2）或使用 `.ds-descriptions` / `labelStyle` 保持 `white-space: nowrap` 与合理最小宽度
- 每行排列：`label` 在左，`value` 在右；短文本操作 icon / 文字链接在 **value 文本右侧**，同处 `db-descriptions-value-row` 内（见 [操作 icon 与同行对齐](#操作-icon-与同行对齐)）
- 长文本 / 代码块字段放最后一行，`span` 设为列数以占满整行；如有操作 icon，icon 必须在 `db-descriptions-long-text` 灰色块内跟随文本末尾，不得跨到下一行独立显示

### 与页面整体布局的协调

- 组件宽度不超出页面内容区域，与页面网格系统对齐
- 组件边距继承自页面全局间距系统（`--margin` / `--padding` 相关变量）
- 详情页通常配合 `PageHeader`（面包屑 + 标题行 + 右侧操作）使用；带面包屑时遵循 [`layout.md` §带面包屑的页面标题区](layout.md#带面包屑的页面标题区)，多分组场景见 [§3 分组卡片描述列表](#3-分组卡片描述列表-grouped-card-descriptions)

---

## 1. 基础描述列表 (Basic Descriptions)

> **适用场景**：详情页中展示一组结构化字段信息，字段数量适中，采用 2~3 列布局。

**约束**：
- 使用 AntD `Descriptions` 组件，`items` 属性传入字段数组，禁止使用旧版 `Descriptions.Item` 子组件写法
- `column` 根据字段数量设置为 `2` 或 `3`
- label 颜色由 AntD 默认样式控制，对应 `var(--color-text-tertiary)`，**无需手动覆盖**
- 状态字段使用 `Tag` 组件，颜色语义正确
- 长文本 / 代码块字段 `span` 设为 `column` 值，占满整行，内容用 `db-descriptions-long-text` 灰色块包裹
- value 含操作 icon 时，遵守 [操作 icon 与同行对齐](#操作-icon-与同行对齐)

**代码模板**：`scripts/description-list/01-BasicDescriptions.tsx`

---

## 2. 可编辑描述列表 (Editable Descriptions)

> **适用场景**：在复杂、大量的数据组合里，需要对呈现的不同维度信息查阅的同时进行即时修改、保存，以便纠错和更新，提高操作效率。

**约束**：
- 使用 `@ant-design/pro-components` 的 `ProDescriptions` 组件，**不使用** antd 原生 `Descriptions`
- 通过 `editable={{ onSave }}` 开启行内编辑；`onSave` 返回 `true` 退出编辑态；列级 `editable: false` 可单独禁用某列
- 字段定义优先使用 `columns` 数组；也可通过 `ProDescriptions.Item` 子组件追加字段
- 字段类型通过 `valueType` 声明（`select` / `date` / `money` / `digit` / `rate` / `percent` 等），ProDescriptions 自动渲染对应的展示与编辑控件
- 文本字段可使用 `copyable: true` 开启复制、`ellipsis: true` 开启超长省略
- 需要自定义编辑控件时，使用 `renderFormItem` 返回自定义表单组件
- `valueType` 支持函数形式，可根据其他字段值动态切换类型（如 `state2 === 'Success'` 时切换为 `select`）
- 列级 `request` 可异步加载选项数据；`fieldProps` 可透传控件属性（如 `mode: 'multiple'`）
- 展示态可通过 `render` 自定义内容（Tag 颜色、链接样式、复制按钮、长文本灰底等）；如需在 `render` 内点击进入编辑，必须关闭该字段自动编辑入口，完全由 `action?.startEditable(key)` 手动接管
- **禁止编辑入口重复**：`editable={{ onSave }}` 已为可编辑字段生成「编辑 / 保存 / 取消」入口；`render` 中禁止再叠加 `<EditOutlined />`、编辑按钮或额外点击入口，避免同一字段出现两套编辑控件
- `formProps.onValuesChange` 可监听编辑过程中的表单值变化
- 操作列使用 `valueType: 'option'`，渲染链接操作项
- 通过 `actionRef` 可手动触发编辑状态（如 `action?.startEditable(key)`）
- 组件级 `request` 异步加载数据，返回 `{ success: true, data: {...} }` 结构
- 所有 inline style 中的间距、圆角、颜色必须使用 `var(--xxx)` 变量，禁止硬编码数值

**代码模板**：`scripts/description-list/02-EditableDescriptions.tsx`

---

## 3. 分组卡片描述列表 (Grouped Card Descriptions)

> **适用场景**：一级页面含 **2 个及以上** 只读语义分组（如「账户信息」「机构信息」）。单组用 [§1](#1-基础描述列表-basic-descriptions)，可编辑用 [§2](#2-可编辑描述列表-editable-descriptions)。

**约束**：
- 页面内容区**禁止**外层大 Card 包裹全部分组；每组一个 `Card`（`bordered={false}`），分组名写 **`Card` 的 `title`**，**禁止**用 `Descriptions.title` 充当分组标题
- Card 内放一组 `Descriptions`（无 `title`），`column` 设为 `2` 或 `3`；字段展示规则同 §1，含 [操作 icon 与同行对齐](#操作-icon-与同行对齐)
- 复用模板导出的 `descriptionGroupCardStyles`、`descriptionGroupCardStyle`（白卡片外观、标题下无分割线；Card body 遵循页面级内容区 **上/下 16px、左/右 24px**，见 [`layout.md` §页面内容水平对齐](layout.md#页面内容水平对齐)）
- Card 之间间距 **16px**（`var(--margin)`）

**代码模板**：`scripts/description-list/03-GroupedCardDescriptions.tsx`
