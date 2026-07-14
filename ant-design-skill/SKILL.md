---
name: ant-design-skill
description: 基于 Ant Design 生成企业级中后台界面与业务组件。适用于管理后台、企业管理系统（ERP/CRM）、运维控制台、数据看板等产品场景；覆盖导航布局（SideLayout/TopLayout/MixedLayout）、查询筛选（QueryFilter）、表单（基础表单、分步表单、嵌入表单、筛选表单、登录表单）、表格（AntD Table / ProTable）、列表（AntD List / ProList）、详情展示与描述列表（Descriptions / ProDescriptions）、图表（Ant Design Charts）、指标卡、Design Token 与 ConfigProvider。用户提到 antd、Ant Design、ProComponents、ProTable、ProForm、中后台页面、管理后台、管理系统、数据看板、表格页、列表页、表单页、详情页、筛选查询、批量操作、操作列、详情展示、图表看板、指标卡、页面说明提示条、侧边栏收起、Design Token、ConfigProvider 或主题 token 时使用本 Skill；即使用户未明确说 Ant Design，也应在上述中后台场景使用。
---

# Ant Design 企业级中后台设计 Skill

## 概述

本 Skill 基于 Ant Design 设计规范，提供企业级中后台产品的完整界面生成能力，包括：

- **全局样式**：统一的 Design Token（颜色、字体、间距、阴影等）
- **导航框架**：侧边导航、顶部导航、混合导航三种布局模板
- **业务组件**：表单、表格、列表、描述列表、图表等组件的设计规范与代码模板

适用于构建功能复杂、信息层级较深的企业级管理后台产品。

---

## Skill 覆盖范围与模板优先级

本 Skill 是对 Ant Design / ProComponents 中后台常用场景的**精选产品化落地规范**，不替代官方全量组件文档。生成时按以下优先级判断：

1. **已覆盖场景优先 Skill**：凡需求命中 `references/` 或 `scripts/` 中明确列出的组件类型 / 页面类型，优先遵循本 Skill 的选型、模板、结构、间距、容器与交互规则。
2. **有代码模板时必须模板起步**：凡 `scripts/` 中已提供模板的场景，必须以对应模板复制改造为起点，只替换业务字段、数据、文案、图表配置与提交逻辑；保留模板的页面结构、关键 `className`、Design Token、间距节奏和交互分区。
3. **有 reference 无模板时按规范生成**：若场景在 `references/` 中已有规则但没有完整模板，按对应 reference 生成，再结合 Ant Design / ProComponents 原生 API 实现。
4. **未覆盖能力回到官方原生**：若组件或低频能力未出现在 `references/` / `scripts/` 覆盖范围内，可参考 Ant Design / ProComponents 官方原生用法实现；视觉仍须继承本 Skill 的全局 token、布局密度、间距、圆角与投影，不得引入与现有体系冲突的局部样式。
5. **官方文档只补 API，不覆盖 Skill 结构**：官方文档用于确认组件能力、props 与版本差异；对本 Skill 已覆盖的场景，最终结构和视觉规则以本 Skill 模板与 reference 为准。

全局优先级只决定“从哪里起步”；各组件 reference 中的单独规则仍然有效，用于约束高风险结构（如分步表单 `stepsDom`、表格/列表卡内部间距、描述列表长文本操作位、图表 tooltip 层级等）。

---

## 分段阅读指引

本 Skill 与配套 `references/`、`global-style.css` 体量较大，**禁止一次性通读全文**。按任务类型按需加载：

### 按任务选读

| 任务 | 先读（SKILL.md 章节） | 再读规范 | 再读模板 | global-style.css 按需段 |
|------|----------------------|----------|----------|------------------|
| 页面布局 / 导航布局 | [快速指引 → 文件索引](#文件索引)、[导航布局选择](#导航布局选择) | `references/layout.md` 对应布局章节；含页面说明提示条时读 §页面说明提示条 | `scripts/layout/` 中 **1 个** 模板 | Navigation 组件区；页面说明提示条样式 |
| 表单页面 | [业务组件生成流程 → 生成表单页面](#生成表单页面) | `references/components_Form.md` 对应表单类型；多步骤 / 长流程先读 §分步表单选型 | `scripts/form/` 中 **1 个** 模板 | Form 组件区（分步 / 嵌入 / 筛选表单样式） |
| 表格页面 | [列表页顶部筛选选型](#列表页顶部筛选选型通用与导航无关)、[生成表格页面](#生成表格页面) | `references/components_Table.md` 对应场景 | `scripts/table/` 中 **1 个** 模板 | Table + Toolbar 组件区 |
| 列表页面 | [生成列表页面](#生成列表页面) | `references/components_List.md` 对应列表类型 | `scripts/list/` 中 **1 个** 模板 | List + Toolbar 组件区 |
| 详情页 / 信息展示 | [生成描述列表页面](#生成描述列表页面) | `references/components_DescriptionList.md` 对应类型 | `scripts/description-list/` 中 **1 个** 模板 | Descriptions 组件区 |
| 图表 / 指标卡 | [业务组件生成流程 → 生成图表页面](#生成图表页面) | `references/components_Chart.md` 图表模块与指标卡规则 | 官方 Ant Design Charts 文档 | 共性层 Token + Navigation 页面区块间距 |
| Design Token 集成 | [Design Token 集成](#design-token-集成复制模板时必做) | — | — | 共性层 Token |

### global-style.css 结构速查（按需检索）

| 段落 | 检索关键词 | 何时读 |
|------|------------|--------|
| 共性层 Token | `:root`、`--color-*`、`--space-*`、`--shadow` | 查变量名或验收硬编码 |
| 模板工具类 | `.ds-text-main`、`.ds-page-inline-alert` | 页面说明提示条 / 批量提示条正文样式 |
| Navigation | `--nav-*`、`SideLayout`、`TopLayout`、`MixedLayout` | 实现 / 修改导航布局 |
| Table / List / Toolbar | `Table`、`List`、`Toolbar` | 表格、列表、筛选与工具栏 |
| Descriptions / Card List | `Descriptions`、`Card List` | 描述列表与卡片列表 |
| Form | `.horizontal-steps-form`、`.vertical-steps-form`、`.embed-form-content` | 分步 / 嵌入 / 筛选表单 |
| Global | `Button`、`Badge`、`z-index` | ConfigProvider 协同与浮层层级 |

> **组件命名**：SKILL、references、scripts 模板标题统一使用 references 中的规范名称（如「支持展开的列表」，勿简称「展开列表」）。

## 技术栈

本 Skill 输出物为 **React 19 + TypeScript 5.x** 的 `.tsx` 组件，仅依赖社区开源生态，不引入任何私有/内部组件库，可直接用于对外项目。

### 核心依赖

| 类别 | 包 | 版本 | 说明 |
|------|----|------|------|
| UI 组件库 | `antd` | `^6.0.0` | 基础组件 + Design Token 主题系统 |
| 业务组件 | `@ant-design/pro-components` | `^2.7.0` | ProLayout / ProTable / ProForm / ProList / ProDescriptions |
| 图标 | `@ant-design/icons` | `^6.0.0` | 与 antd 6.x 生态适配 |
| 框架 | `react` / `react-dom` | `^19.0.0` | 模板基于 React Hooks |
| 语言 | `typescript` | `^5.0.0` | 输出代码禁止使用 `any` |

### 按需依赖

| 场景 | 包 | 版本 | 说明 |
|------|----|------|------|
| 图表页面 | `@ant-design/charts` | `^2.0.0` | 仅当页面需要折线图、柱状图、饼状图等图表模块时引入；具体图表 API 以对应版本官方文档为准 |

### 工程脚手架（二选一）

- **Vite + React Router**：轻量灵活，社区主流，推荐中小型项目；新项目优先使用当前稳定主版本
- **Ant Design Pro（Umi 4）**：开箱即用，约定式路由，推荐标准中后台

### 运行环境

- Node.js `>= 18`
- 包管理器：pnpm `>= 8` / npm `>= 9` / yarn `>= 1.22`

### 最小起步

```bash
# 方案 A：Vite
pnpm create vite my-admin --template react-ts
pnpm add antd @ant-design/icons @ant-design/pro-components \
         react-router-dom @tanstack/react-query axios
# 图表页面按需追加
pnpm add @ant-design/charts@^2.0.0

# 方案 B：Ant Design Pro
pnpm dlx create-umi@latest
```

如安装 `@ant-design/pro-components` 时出现 peer dependency 提示，可在本地预览或验证场景使用 `npm install --legacy-peer-deps` 继续安装；安装后必须启动本地预览，检查 ProForm / ProTable / ProList / ProDescriptions / StatisticCard 等页面是否正常渲染与交互。若运行报错，优先修正具体 API 或样式问题，不得因此降级 antd 或替换 Skill 模板组件。

---

## 快速指引

### 文件索引

#### 规范文档（references/）

| 类别 | 文件 | 说明 |
|------|------|------|
| 布局规范 | `references/layout.md` | 页面框架、主内容区、区块间距、**页面说明提示条**、侧边导航、顶部导航、混合导航的详细规范 |
| 表单规范 | `references/components_Form.md` | 基础表单、分步表单、嵌入表单、筛选表单、登录表单 |
| 表格规范 | `references/components_Table.md` | 基础表格、可筛选排序表格、嵌套表格、批量操作表格、拖拽排序表格、带工具栏表格 |
| 列表规范 | `references/components_List.md` | 基础列表、编辑列表、带工具栏的列表、支持展开的列表、支持选中的列表、查询列表、竖排样式列表、卡片列表 |
| 描述列表规范 | `references/components_DescriptionList.md` | 基础描述列表、可编辑描述列表、分组卡片描述列表 |
| 图表规范 | `references/components_Chart.md` | 基础图表引用、图表与指标卡共性规则、指标卡规范入口 |

#### 代码模板（scripts/）

**导航布局（规范见 `references/layout.md`）**

| 布局类型 | 文件 | 说明 |
|----------|------|------|
| 侧边导航 | `scripts/layout/SideLayout.tsx` | 功能模块较多、信息层级较深的复杂系统 |
| 顶部导航 | `scripts/layout/TopLayout.tsx` | 菜单项较少（≤9 个）的轻量级工具平台 |
| 混合导航 | `scripts/layout/MixedLayout.tsx` | 功能复杂、包含多个独立业务子系统的超大型平台 |

**表单**（规范见 `references/components_Form.md`）

| 场景 | 文件 | 说明 |
|------|------|------|
| 基础表单 | `scripts/form/01-BasicForm.tsx` | 单列垂直布局，字段较少的录入场景 |
| 横向分步表单 | `scripts/form/02-HorizontalStepsForm.tsx` | 长流程拆解为多个有序步骤（横向步骤条） |
| 竖向分步表单 | `scripts/form/03-VerticalStepsForm.tsx` | 步骤较多（≥4 步）的竖向步骤条；含 5 步示例、暂存草稿与终态汇总 |
| 嵌入模式表单 | `scripts/form/04-EmbedForm.tsx` | 内容量大、可明确分类的配置型表单（窄容器 / 区块较少） |
| 筛选表单 | `scripts/form/05-QueryFilter.tsx` | 列表页顶部查询筛选，支持展开收起 |
| 登录表单 | `scripts/form/06-LoginForm.tsx` | 登录场景专用布局 |

**表格**（规范见 `references/components_Table.md`）

| 场景 | 文件 | 说明 |
|------|------|------|
| 基础表格 | `scripts/table/01-BasicTable.tsx` | 仅展示数据，无排序筛选 |
| 可筛选排序表格 | `scripts/table/02-FilterSortTable.tsx` | 单列或多列排序、筛选 |
| 嵌套表格 | `scripts/table/03-NestedTable.tsx` | 行内展开关联子数据 |
| 批量操作表格 | `scripts/table/04-BatchTable.tsx` | 勾选多行执行批量操作 |
| 拖拽排序表格 | `scripts/table/05-DragSortTable.tsx` | 拖拽调整行顺序 |
| 带工具栏表格 | `scripts/table/06-ToolbarTable.tsx` | Tab 切换、筛选、按钮等组合 toolbar |

**列表**（规范见 `references/components_List.md`）

| 场景 | 文件 | 说明 |
|------|------|------|
| 基础列表 | `scripts/list/01-BasicList.tsx` | 标题、描述、状态、标签与操作 |
| 编辑列表 | `scripts/list/02-EditList.tsx` | 浏览时即时修改列表属性 |
| 带工具栏的列表 | `scripts/list/03-ToolbarList.tsx` | Tab 分组、搜索、筛选、新建等 |
| 支持展开的列表 | `scripts/list/04-ExpandableList.tsx` | 收起展开渐进呈现更多信息 |
| 支持选中的列表 | `scripts/list/05-SelectableList.tsx` | 批量选中与批量操作 |
| 查询列表 | `scripts/list/06-QueryList.tsx` | 筛选条件一次性提交查询 |
| 竖排样式列表 | `scripts/list/07-VerticalList.tsx` | 图片 + 文本等展示型信息 |
| 卡片列表 | `scripts/list/08-CardList.tsx` | 网格卡片布局；标题、状态 / 分类 Tag 与右侧操作须使用模板局部的可收缩标题组 + 独立操作区 |

**描述列表**（规范见 `references/components_DescriptionList.md`）

| 场景 | 文件 | 说明 |
|------|------|------|
| 基础描述列表 | `scripts/description-list/01-BasicDescriptions.tsx` | 详情页结构化字段只读展示 |
| 可编辑描述列表 | `scripts/description-list/02-EditableDescriptions.tsx` | 查阅同时即时修改、保存字段 |
| 分组卡片描述列表 | `scripts/description-list/03-GroupedCardDescriptions.tsx` | 多个语义分组独立展示 |

**图表 / 指标卡**（规范见 `references/components_Chart.md`）

| 场景 | 文件 | 说明 |
|------|------|------|
| 基础图表 | `scripts/charts/00-OnlyChartsBlock.tsx` | 折线图、柱状图、饼图等纯图表页面区块；不展示核心指标数值 |
| 基础指标卡 | `scripts/charts/01-BasicStatisticCard.tsx` | 单个核心指标，可附带趋势图或辅助信息 |
| 同级指标卡 | `scripts/charts/02-IconStatisticCard.tsx` | 多个同级核心指标横向并排 |
| 总分指标卡 | `scripts/charts/03-TotalStatisticCard.tsx` | 总量与分项占比关系展示 |
| 嵌套指标卡 | `scripts/charts/04-NestedStatisticCard.tsx` | 多个独立指标卡按同级 Grid 排列，单卡内展示数值与 mini chart |
| 页签联动指标卡 | `scripts/charts/05-TabsStatisticCard.tsx` | 多维指标通过页签切换查看 |

#### 设计系统

| 文件 | 说明 |
|------|------|
| `references/global-style.css` | 完整的 Design Token CSS 变量定义 |

### 导航布局选择

| 布局 | 适用场景 | 模板文件 |
|------|---------|---------|
| **侧边导航 (SideLayout)** | 功能模块较多、信息层级较深（3级及以上）的企业级管理后台；高频操作的生产力工具（ERP、CRM、运维平台） | `scripts/layout/SideLayout.tsx` |
| **顶部导航 (TopLayout)** | 菜单项较少（≤9 个一级菜单）的轻量级工具平台；主导航菜单水平分布于页面顶部 | `scripts/layout/TopLayout.tsx` |
| **混合导航 (MixedLayout)** | 功能极其复杂、包含多个独立业务子系统的超大型平台；多任务流并行、需要频繁在不同大类业务间切换 | `scripts/layout/MixedLayout.tsx` |

---

## 使用流程

### 快速开始

当用户需要创建一个中后台页面时，按照以下流程操作：

1. 判断需求是否命中 [Skill 覆盖范围与模板优先级](#skill-覆盖范围与模板优先级)；已覆盖场景优先走本 Skill。
2. 判断交付边界：0 到 1 新建中后台应用 / 平台 / 系统时默认生成导航布局与主内容区；在已有项目中新增页面时先复用现有 Layout / 导航 / 路由壳，只生成内容区。若已有项目没有导航且需求属于管理后台 / 平台级页面，应补充导航壳；用户明确要求单页 demo、局部组件或嵌入模块时不强制生成导航。
3. 需要生成导航时，按 [导航布局选择](#导航布局选择) 确定且仅确定一种布局：SideLayout、TopLayout 或 MixedLayout。
4. 按页面目标选择业务组件：列表/表格、表单、详情描述列表、图表/指标卡，必要时先做顶部筛选选型。
5. 按 [按任务选读](#按任务选读) 读取对应 reference 与模板；有模板时复制模板起步，无模板时按 reference + 官方原生 API 实现。
6. 替换业务字段、数据、文案与提交逻辑，保留模板结构、关键 `className`、Design Token 和交互分区。
7. 按 [Design Token 集成](#design-token-集成复制模板时必做) 接入 `global-style.css` 并完成自测验收。

### 导航布局生成流程

1. 读取 `references/layout.md` 对应布局章节与「布局生成强约束与验收清单」。
2. 从 `scripts/layout/SideLayout.tsx`、`TopLayout.tsx` 或 `MixedLayout.tsx` 复制唯一匹配的模板。
3. 仅替换 Logo、产品名称、菜单文本、菜单数量、用户信息和内容区业务内容。
4. 保留导航 DOM 结构、CSS token、hover / active / collapsed 状态；SideLayout / MixedLayout 必须保留独立可见的侧边栏收起触发器，收起态只隐藏品牌文字不隐藏 Logo。
5. 顶部导航一级菜单必须保留模板 `.menu-item` 选中态（文字加深 + 字重 500，无背景），禁止改为 Tab / 胶囊 / Segmented 样式；完整禁止项见 `layout.md` §顶部一级菜单规范。
6. TopLayout / MixedLayout 顶部品牌区后不得生成竖向分割线；禁止给 `.brand-name`、`.logo-section`、`.header-left`、`.topbar-left` 添加 `border-right`、伪元素竖线或右侧 `box-shadow`。混合导航的侧边栏右边界必须从顶栏下方开始，不得穿过顶栏品牌区。
7. TopLayout / MixedLayout 顶导搜索必须保留模板中的 `Input.nav-search` 结构；搜索建议、最近访问、跨业务候选等增强能力使用 `Popover` / `Dropdown` 浮层扩展，不得替换为 `AutoComplete`、`Select` 或 `Input.Search`。

### 业务组件生成流程

#### 列表页顶部筛选选型（通用，与导航无关）

凡在**任意导航框架**（侧边 / 顶部 / 混合）下实现「列表或表格 + 顶部查询区」，均须先按本表选型，再实现具体组件。完整说明见 `references/components_Table.md`「列表页顶部筛选：QueryFilter vs 单行工具栏」。

| 判断条件 | 推荐方案 | 规范 / 模板 |
| :-- | :-- | :-- |
| 筛选项 ≤4 个，且可在一行内清晰展示（含查询/重置） | **单行工具栏** | `components_Table.md` → 工具栏布局 / 工具栏与表格间距 |
| 筛选项 ≥5 个，或需要展开收起 | **搜索卡承载 QueryFilter** | `components_Form.md` §5；`scripts/form/05-QueryFilter.tsx` |

> **选型优先级**：先判断能否单行展示；能则用单行工具栏，**勿**在仅 3～4 个筛选项时默认 QueryFilter（易导致按钮独占一行、控件过宽）。

#### 生成表单页面

```
输入：需要创建一个新增用户的表单页面
输出：完整的表单组件代码
```

**操作步骤**：

1. 根据表单复杂度选择类型（基础表单 / 分步表单 / 嵌入表单）
2. 读取 `references/components_Form.md` 中对应组件的规范和模板
3. 复制代码模板
4. 替换字段定义、表单验证规则、提交逻辑

#### 生成表格页面

```
输入：需要一个支持排序、筛选、批量操作的表格页面
输出：完整的表格组件代码
```

**操作步骤**：

1. 若含顶部筛选，先按 [列表页顶部筛选选型](#列表页顶部筛选选型通用与导航无关) 确定单行工具栏或搜索卡承载 QueryFilter
2. 读取 `references/components_Table.md` 中对应场景（如筛选排序、批量操作、拖拽排序等）
3. 复制代码模板
4. 配置列定义（columns）、排序/筛选逻辑、操作列
5. **禁止**在工具栏与表格之间插入汇总条；轻量统计放 `PageHeader` extra，见 `components_Table.md` §工具栏与表格之间禁止插入汇总条
6. 表格卡内部遵循 `components_Table.md` §表格卡内部垂直节奏与§表格卡头部表达：左右对齐线 24px；卡内标题 / 工具栏 / Tab / Table / 分页之间统一 16px；表格卡左上角必须有简单标题、带左侧标题的单行工具栏或结果分类 Tab，禁止只有空白 padding 后直接进入表头，也禁止搜索框 / 筛选框作为卡片左上角唯一内容；只有确有分类切换时才使用 Tab
7. ProTable 作为表格卡内容时，外层必须使用 `ds-page-card ds-table-card-padded ds-pro-table-card`；若使用 `toolbar.menu.type: 'tab'`，再叠加 `ds-table-card-with-tabs`，避免 ProTable 默认 ListToolBar / ProCard body padding 与外层卡片 padding 叠加
8. Table / List 分页写法必须二选一：内置分页只使用组件自带 `pagination`，不得传入 `ds-table-pagination` / `ds-list-pagination` 等外置分页容器 class；外置分页必须关闭内置 `pagination`，并用 `ds-table-pagination` / `ds-list-pagination` 包裹 `Pagination`。同一段 16px 间距只允许一个来源承担，禁止 margin 与 padding 叠加成 32px；若使用 Table 内置分页，外层表格卡仍必须保留 `padding-block-end: var(--padding)`
9. 检查表头与表体单行展示：短枚举列、可排序列须预留标题与图标宽度；名称 / 标识 / 负责人 / 操作列须设置合理宽度、`ellipsis` / Tooltip 或 `whiteSpace: 'nowrap'`；禁止在 `render` 中手写纵向多行结构导致名称、负责人、操作链接换行。
10. 检查操作列与横向溢出：操作列不得固定套用 120 / 160，须按文案分档设置宽度（2 个 2 字操作 ≥160px，含 3-4 字操作 ≥180-200px，两个 4 字操作 ≥200px），并统一用 `Space` + `table-action-cell` + `whiteSpace: 'nowrap'` 包裹。列数 ≥ 6、存在长文本列 + 日期 / 时间列 + 操作列，或操作列含 3-4 字操作时，必须检查列宽总和；仅当列宽总和超过容器，或已出现表头换行、操作列贴边 / 溢出、内容被裁切时，才设置 `scroll={{ x: ... }}`。启用 `scroll.x` 后，操作列建议 `fixed: 'right'`；未启用横向滚动时，不默认固定列。禁止压缩列宽、换行或裁切操作链接。

#### 生成列表页面

```
输入：需要一个项目管理列表，支持编辑和删除
输出：完整的列表组件代码
```

**操作步骤**：

1. 读取 `references/components_List.md` 中"编辑列表"
2. 复制代码模板
3. 配置数据源、列定义、操作处理函数
4. 列表卡内部遵循 `components_List.md` §列表卡内部留白，与表格卡共用「左右对齐线 24px、卡内工具栏 / Tab / List / 分页之间 16px」规则；列表卡左上角必须有列表结果标题、当前结果标题或结果分类 Tab，禁止搜索框 / 筛选框作为卡片左上角唯一内容
5. 外置分页列表必须使用 `className="ds-list-pagination"` 或等价 `padding: var(--padding) 0`；若使用 List / ProList 内置分页，不得再套外置分页容器或重复写 `padding-top`；无分页列表必须保留 16px 底部收口（`.ds-list-bottom-spacer` 或全局兜底），禁止最后一条列表项贴到卡片底部
6. 带右侧图片 / 缩略图的列表项必须使用 `components_List.md` §列表条目内部布局：图片作为 `media` / `extra` 时相对整条列表项上下居中，外层用 `.ds-list-item-media`，内层固定尺寸图盒用 `.ds-list-item-media-box`，禁止贴顶或贴底

#### 生成图表页面

```
输入：需要一个数据看板，包含核心指标、趋势图和明细表
输出：遵循页面布局规范的图表模块组合方案与必要代码引用说明
```

**操作步骤**：

1. 读取 `references/components_Chart.md` 中"图表与指标卡共性规则"与 §图表实现分层
2. 基础图表能力引用 `@ant-design/charts@^2.0.0` 对应版本官方文档，不在 Skill 内复制具体图表配置；**完整图表**（OnlyCharts、页签关联区、图表 Grid）使用 Charts 实现，**指标卡 mini chart**（56–96px）优先使用 SVG sparkline（见 `01` / `04` 模板），禁止 `<img>` 或文字占位
3. 先确定页面结构：标题区、筛选区、指标卡、主图表、辅助图表、明细表格
4. 图表模块间距、容器留白和页面背景遵循 `references/layout.md`
5. 如涉及指标卡，先按 `references/components_Chart.md` 中 2–6 节的指标卡类型选取合适形态；基础图表区块与指标卡分类需保持边界清晰
6. 多个同级指标须先按 `components_Chart.md` §同级指标组图表选型判断：优先指标卡 Grid、小型趋势图或单个多 series 主图；禁止多个全宽主图表纵向堆在一个大 Card 中
7. 同级指标卡必须复用 `scripts/charts/02-IconStatisticCard.tsx` 的 `StatisticCard.statistic` 结构；不得在同一组中混用普通 `Card + div/span` 手写主数值，避免核心数字字号和上下留白不一致；默认示例可展示 4 张，但真实生成必须按指标数量自适应：1–2 张靠左不拉满，3–4 张按实际数量等分，5 张及以上最多 4 列换行，窄屏单列
8. 总分指标卡必须按 `components_Chart.md` §总分指标卡处理：总值和每个分值都是同级指标单元，单元总数为 `1 + 分项数量`，每个单元等宽；必须使用 `ds-total-statistic-card` + `ds-total-statistic-grid` + `ds-total-statistic-cell` 专用结构，所有单元用 `minmax(0, 1fr)` 等分且 `box-sizing: border-box` / `min-width: 0` / `max-width: 100%` 防止长金额或 padding 撑出卡片；禁止生成“左侧总值区 + 右侧分项区”的非等分结构，分割线如有必须挂在同级单元边界并随内容区高度伸展
9. **指标卡内嵌迷你图表**：须按 `components_Chart.md` §指标卡内嵌迷你图表处理容器对齐与 plot padding；配色按 §指标卡内嵌迷你图表配色（通用）执行——每个指标单元绑定一个语义主色，同一枚迷你图内线条 / 柱体 / 面积 / 点 / 环必须同源同色族，禁止线用一种语义色、主体填充又用另一套默认色；有填充区域的类型（如面积图）使用同色渐变且方向为上浅下深（SVG 默认 `stopOpacity` `0.08 → 0.22`）；模板默认 SVG sparkline，不在指标卡内引入 Charts 完整配置；若需要坐标轴 / 图例 / 完整 tooltip，升级为独立图表区块
10. **完整图表面积填充**：`@ant-design/charts` Area / Column 等有填充区域的类型，须使用 G2 `l(角度) 0:rgba(...) 1:rgba(...)` 写法（模板默认 `l(270)`、`8% → 22%`）；**禁止**在 `style.fill` 中使用 CSS `color-mix()` 或 `linear-gradient()`，否则 Canvas 无法解析、面积区不渲染
11. 涉及 hover tooltip 的图表，必须按 `components_Chart.md` §图表 Tooltip 浮层规则处理：优先使用当前 Charts 版本支持的 API 将 tooltip 挂到 `document.body` / overlay 容器，层级高于导航基础层，且不得被图表容器 `overflow` 裁切
12. 嵌套指标卡必须按 `components_Chart.md` §嵌套指标卡处理：多个嵌套指标卡不得使用 `StatisticCard.Group`、`Divider` 或外层白色容器合并，必须像同级指标卡一样使用局部 Grid / Flex 直接落在页面画布上；默认示例可展示 4 张，但真实生成必须按指标数量自适应：1–2 张靠左不拉满，3–4 张等分，5 张及以上最多 4 列换行，窄屏单列；单卡内部使用 `statistic + chart`，chart 只作为 56–96px（推荐 72px，最大 120px）的 mini chart，优先使用同色面积填充的趋势图且每张卡须绑定独立 `semanticColor`，禁止生成多个全宽监控图纵向列表
13. 页签联动指标卡必须使用 `ds-statistic-tabs` 的 Tabs 选中态；active 项只保留贴在页签指标卡白色卡片底边的 2px 主色 ink bar，禁止主色文字 / 数值、整块浅色背景、描边或 `.card-selected`；各 Tab 等分均分（`flex: 1`），相邻 Tab 须清零 AntD 默认 `margin-left`（`.ant-tabs-tab + .ant-tabs-tab`），避免选中第二项及之后 Tab 时 ink bar 与总计项分割线之间出现空隙；Tabs nav 不保留底部分割线、默认 bottom margin、空 content holder / content / tabpane 高度或 `.ant-pro-card-tabs` 底部 padding；Tabs 卡片 body 横向 padding 建议为 0，由每个 `.ds-statistic-tab-label` 自己提供左右 24px 内边距，保证第一项总计标题距离整张卡片最左侧 24px，且在 active Tab 单元内也保持 24px 左内距；状态点属于辅助标识槽，不参与标题 / 主数值 / 状态 Tag 的 24px 文字对齐线，总计项不显示状态点，只有分项指标显示状态点，禁止直接用默认 `Statistic.status` 把标题向右挤；状态 Tag 必须与标题 / 主数值左对齐，不得与状态点对齐；关联展示内容在卡片外部作为独立区块，并由 `.ds-page-shell` / `.ds-statistic-linked-content` 保留 16px 区块间距，禁止在 `tabs.children` 中放业务内容；关联内容卡的标题、关联图表、表格或列表必须共享同一 24px 左右对齐线，优先把标题放在 body 内，避免 ProCard header/title 与 body padding 形成两套对齐线；关联图表使用 `@ant-design/charts` 随 `activeKey` 切换数据，禁止文字或灰色占位块

#### 生成描述列表页面

```
输入：需要一个订单详情页，展示结构化字段并支持部分字段行内编辑
输出：完整的描述列表组件代码
```

**描述列表选型**（与导航布局无关，任意 SideLayout / TopLayout / MixedLayout 均适用）：

| 判断条件 | 推荐方案 | 规范 / 模板 |
| :-- | :-- | :-- |
| 单组字段，只读展示 | **基础描述列表** | `references/components_DescriptionList.md` §1；`scripts/description-list/01-BasicDescriptions.tsx` |
| 需行内编辑、保存、动态字段 | **可编辑描述列表** | `references/components_DescriptionList.md` §2；`scripts/description-list/02-EditableDescriptions.tsx` |
| 页面含 **≥2** 个语义分组 | **分组卡片描述列表** | `references/components_DescriptionList.md` §3；`scripts/description-list/03-GroupedCardDescriptions.tsx` |

> **选型优先级**：先判断分组数（≥2 组 → 分组卡片）；单组再判断是否需编辑（需编辑 → 可编辑，否则 → 基础）。

**操作步骤**：

1. 按上表完成描述列表选型
2. 读取 `references/components_DescriptionList.md` 对应 § 章节及「描述列表共性规则」
3. 从 `scripts/description-list/` 复制对应编号模板
4. 配置 `items` / `columns`、值展示格式（Tag、金额、日期等）及操作 icon 对齐 class（`.db-descriptions-value-row`）
5. 检查字段 `label` 保持单行展示，发生跨行时优先降低 `column` 或使用 `.ds-descriptions` / `labelStyle` 兜底
6. 可编辑描述列表额外检查：编辑入口只由 `editable` 自动生成或由自定义逻辑手动接管二选一，禁止在 `render` 中叠加第二套编辑 icon / 按钮

### 常见使用场景

#### 场景 1：快速搭建 CRUD 页面

```
布局：任意导航框架 + 顶部筛选（见通用选型） + 表格/列表
```

本场景是 Step 2（导航）+ Step 3（表格/列表 + 筛选）的组合示例；**筛选选型不绑定侧边导航**，顶部导航、混合导航下的列表页同样适用 [列表页顶部筛选选型](#列表页顶部筛选选型通用与导航无关)。

**生成顺序**：
1. 按 Step 2 选择导航模板（SideLayout / TopLayout / MixedLayout 均可）
2. 根据数据实体选择表格或列表组件
3. 按通用筛选选型实现顶部查询区（单行工具栏或搜索卡承载 QueryFilter）
4. 配置列定义、查询/重置及行内操作（编辑、删除等）

#### 场景 2：创建配置类页面

```
布局：任意导航 + 嵌入表单（多区块分组）；区块较多时可按 §4 的宽面板扩展规则增强
```

**生成顺序**：
1. 使用 `components_Form.md` §4 与 `04-EmbedForm` 作为基础模板
2. 如区块 ≥4 或需要页内跳转，再按 §4「增强形态：宽面板」扩展布局；不另选独立模板
3. 每个子区块一个 `ProForm.Group`；长 TextArea 标记 `embed-form-field-full` 整行；其余落单字段默认半宽
4. PageHeader + 可选页面说明提示条 + 底部操作栏（重置 / 暂存 / 保存）；页面说明提示条默认不生成，仅在保存范围、字段联动或生效时机容易误解时添加

#### 场景 3：创建多步骤表单页面

```
布局：任意导航 + 横向/竖向分步表单（嵌入现有后台，不单独拆应用）
```

**生成顺序**：

1. 读取 `components_Form.md` §[分步表单选型](references/components_Form.md#分步表单选型)，确定横向（≤4 步）或竖向（≥4 步）
2. 从 `scripts/form/02-HorizontalStepsForm.tsx` 或 `03-VerticalStepsForm.tsx` 复制模板（竖向 ≥4 步时**必须**用 03，含 5 步示例）；竖向分步表单必须以模板代码为起点，只替换步骤标题、字段、描述与提交逻辑，禁止从 AntD 裸 `StepsForm` 或自定义 `Steps` 重新拼装
3. 页面结构固定为三层，**禁止**在 `StepsForm` 上方叠加进度 Card / 协作看板 / 待补材料清单：

```
PageShell（或布局主内容区）
├─ PageHeader（标题 + 可选「返回」）
├─ [可选] Alert（ds-page-inline-alert：仅在保存规则与步骤校验容易误解时生成）
└─ PagePanel（ds-page-card steps-form-page-card 白色表单区块）
   └─ vertical-steps-form（≥5 步加 --five-steps）
      └─ StepsForm
```

4. 每步 `stepProps.description` 写明负责方（如「业务方 · 负责人」）；需中途保存时在 `submitter.render` 增加「暂存草稿」（不触发全量校验）
5. 最后一步用 `Descriptions` 做信息汇总；汇总区与多方确认 Checkbox 必须使用 `.steps-confirm-summary` / `.steps-confirm-checklist`，保持 16px 间距；全局进度 / 缺件 / 处理方如需展示，放在**列表页、详情页或工单中心**，不在表单页重复
6. 若表单从业务模块内进入（如新建、编辑、继续填写），须按 `layout.md` §[嵌入现有后台：主内容区继承](references/layout.md#嵌入现有后台主内容区继承) 处理：只生成主内容区，不重复生成全局导航或独立应用壳

**验收清单**：

- [ ] 步骤条与表单左右分栏，按钮左对齐
- [ ] 左侧步骤列表第一个步骤标题顶部与右侧表单首个可见内容顶部对齐（字段 label / 区块标题 / `Descriptions` 标题 / 汇总标题）；不为第 2 / 3 / 4 步标题单独下移右侧内容；5 步场景步骤项间距稳定，不出现第 1、2 步挤压
- [ ] 竖向 Steps 连接线连续且不穿过 / 超过 32px 圆点；完成态、当前态、未开始态共用同一中心线；步骤条复用 `03-VerticalStepsForm.tsx` 的原生 `stepsDom`，未手写 List / Timeline / 圆点连接线，也未用外层 `gap` / `margin-bottom` 撑开 `.ant-steps-item`
- [ ] `StepsForm` 位于白色 `ds-page-card steps-form-page-card` 表单区块内，不直接浮在灰色页面背景上；横向 / 竖向分步表单卡内顶部到步骤区、submitter / 最后一项到底部均至少 48px
- [ ] 最后一步 `Descriptions` / 表格汇总到确认 Checkbox 组为 16px，Checkbox 行间距 16px，勾选框与文案首行顶对齐
- [ ] 表单区上方无第二套进度/缺件 UI
- [ ] 页面继承既有后台内容容器、区块间距与导航归属
- [ ] 暂存草稿可用且不阻塞步骤切换

### 通用实施原则

生成导航或业务组件时均须：

1. **读取规范**：导航见 `references/layout.md`；业务组件见对应 `references/components_*.md`
2. **按模板实现**：已覆盖且 `scripts/` 提供模板的场景，从对应模板复制到用户工作区，禁止从零重写；未覆盖能力按官方原生 API 实现并继承全局视觉体系
3. **样式引用**：颜色、间距、圆角、阴影使用 CSS 变量，**禁止硬编码色值**
4. **适配与验收**：替换示例数据为业务数据；确保 Design Token 生效、交互符合规范

## 输出规则

1. **禁止写入 Skill 目录**：所有生成的代码必须写入用户工作区
2. **资源引用**：使用用户项目中的相对路径或公网占位图
3. **Design Token 优先**：优先使用 `global-style.css` 中的变量，减少硬编码
4. **ConfigProvider 主题色**：`theme.token` / `theme.components` 传入具体 hex 色值，禁止传入 `'var(--xxx)'` 字符串
5. **自测验收**：
   - 组件可正常渲染，无控制台报错
   - 交互行为符合规范
   - 无硬编码色值（除特殊场景）
   - 无 TypeScript `any` 类型
6. **分步表单默认约束**：生成 `StepsForm` 页面时，**默认不生成**表单区上方的进度 Card、待补材料清单、协作看板；步骤进度由 `Steps` 步骤条承担；需全局追踪时由列表/详情/工单页承担，见 `components_Form.md` §分步表单选型
7. **页面标题唯一来源**：导航布局只负责菜单与内容容器，业务主标题由页面层 `PageHeader` 负责；禁止布局层用 `activeMenu` 自动渲染标题后，页面层再写第二个标题
8. **页面标题水平对齐**：页面级 `PageHeader` / `.ds-page-header` 默认直接放在 `.ds-page-shell` 下，禁止设置 `padding-inline`；页面左右留白由布局层 `<Content>` / `.content` 唯一提供。只有 Card / 表格 / 列表等内容容器内部才使用 `padding-inline: var(--nav-space-6)`。
9. **带面包屑的页面标题区**：一级入口页默认不展示面包屑；面包屑只用于存在明确上级路径、下钻来源或返回语义的页面，例如详情页、编辑页、流程页、创建页，以及从对象详情或项目空间继续下钻出的列表 / 表格页。页面是否展示面包屑由信息架构层级决定，不由列表 / 表格 / 表单等组件形态决定。Layout / ProLayout / PageContainer 不得根据菜单层级、`activeMenu`、`pathname` 或 route 自动生成全局面包屑；Breadcrumb 必须由业务页面显式声明。使用 ProLayout / PageContainer 生成一级入口页时须关闭默认面包屑，例如 `breadcrumbRender={false}`。使用面包屑时，标题行和下方业务卡片外缘必须共用 `<Content>` / `.content` 提供的 24px 页面左对齐线，禁止给 Breadcrumb / PageHeader 单独设置 `padding-left`、`margin-left` 或包进 Card。内容区顶部到面包屑的 24px 由 Content padding 提供；面包屑到标题行固定 `var(--nav-space-2)`（8px）；标题行到首个业务区块继续由 `.ds-page-shell { gap: var(--nav-space-4) }` 提供 16px。Breadcrumb 必须使用 `/` 分隔，AntD 写法固定 `separator="/"`。标题右侧如有全局操作、轻量统计或辅助说明，必须放在标题行右侧 `ds-page-header-extra`，与标题行同一行上下居中并靠右；不得放到面包屑行，也不得在标题与业务卡片之间单独插入汇总条。
10. **侧边栏收起态用户区**：收起态只保留 32px 头像，隐藏用户名和整个 `.user-action-icons` 容器；头像必须设置 `flex: 0 0 32px` / `min-width: 32px` 防止被 flex 压缩，`.user-actions` 收起态须 `gap: 0`。
11. **侧边栏边界与间距**：SideLayout / MixedLayout 中，除 24px 收起触发器允许向侧边栏右侧受控外露 12px 外，Logo、品牌名、菜单、分组标题、底部用户区（如有）均不得横向溢出；品牌名、菜单文本、用户名必须单行省略。侧边导航节奏固定为：顶部到首个分组 12px、分组标题高 40px、标题到菜单 0、菜单行 40px、分组之间 12px + 分割线 + 12px；如有固定底部用户区，最后一组到底部用户区避让 12px。
12. **搜索卡 Card body 间距**：`<Card className="ds-search-panel">` 的内边距必须作用到 `.ant-card-body`；禁止只在 Card 外层写 padding，禁止同时写 `styles.body.padding` 与 `.ds-search-panel` padding。搜索框到 Tab 的 16px 只由 `.ds-search-tabs-row` 承担，搜索行不得再写额外 `marginBottom`。
13. **卡内顶部结果分类 Tab 与轻量工具栏分层**：表格 / 列表卡顶部若是结果分类 Tab（如「全部 / 进行中 / 失败」），必须使用 `ds-card-tab-strip + toolbar-tabs`；首个 `ds-card-tab-strip` 若位于已有顶部 padding 的 `ds-page-card` / `ds-table-card` 容器内，顶部 16px 由容器 padding 承担，禁止再叠加 Tab Strip 顶部 padding、空占位块或 `marginTop`，避免 32px 顶距。纯 `ds-list-card` 壳层只承担水平 24px，顶部 16px 仍由内部 Tab Strip / Header 垂直 padding 承担。Tab 行高固定 32px，下方到 Table / List 内容保留 16px；选中态只保留主色文字和 `ds-tab-count` 弱主色数量，禁止灰色底线、AntD ink-bar、整块背景、描边或红 / 黄 / 绿 Badge。表格卡无结果分类时不要强行生成 Tab，使用 `ds-card-title-row` + `ds-table-title` 表达当前数据集名称；禁止卡片左上角只有空白 padding 后直接进入表头，也禁止搜索框 / 筛选框作为卡片左上角唯一内容。Tab 左侧展示结果分类，搜索 / 筛选 / 操作按钮在右侧且不得跨行；右侧控件放不下、字段 ≥5 个或需要展开收起时，必须上移为独立 `ds-search-panel` + `QueryFilter`。普通标题 + 搜索 / 少量筛选 / 结果级操作才使用 `ds-card-toolbar ds-card-toolbar-inline`，其中左侧必须是 `ds-table-title` 或当前结果标题；搜索卡 Tab 继续使用 `ds-search-tabs`，页签联动指标卡继续使用 `ds-statistic-tabs`，不要混用。
14. **页面级白卡投影**：页面业务容器（`ds-page-card`、`ds-search-panel`、`ds-list-card`、`ds-table-card`、`ds-statistic-card`）统一白底、8px 圆角、`var(--shadow)` 轻投影并清除默认描边；AntD Card / ProCard 生成时优先 `bordered={false}`。对象选择卡 / 卡片列表项可用细描边表达交互状态，但不得替代页面级白卡投影。
15. **页面级内容卡 padding 唯一来源**：基础业务卡内容区固定上下 `var(--padding)`（16px）、左右 `var(--nav-space-6)`（24px），适用于通用 Card、列表卡、表格卡、指标卡、图表卡、描述分组卡和对象选择卡；不适用于表单内部字段布局、StepsForm 步骤条、嵌入表单弱分组、QueryFilter 字段栅格和 submitter。普通 `div.ds-page-card` 由外层承担；AntD `Card` / ProCard / `StatisticCard` 必须命中 `.ant-card-body` / `.ant-pro-card-body`；`ds-list-card` 的 Card body 必须清零，由壳层承担 24px 内容线。禁止 `bodyStyle={{ padding: 24 }}`、`styles.body.padding: 24`、toolbar / List item / Table wrapper 再次写水平 padding。Table 外框跟随卡片 24px 内容线，但首末列必须保留 `var(--padding)`（16px）单元格内部留白，避免表头 / 行内容文字贴边。ProTable 必须用 `ds-pro-table-card` 清掉内部 ProCard body / ListToolBar 默认 padding，避免与外层表格卡叠加。对象选择卡可保留描边状态，但 body padding 不例外。
16. **搜索卡与 QueryFilter 分层**：`ds-search-panel` 是页面级筛选区容器，负责白卡外观、区块间距和 Card body padding；`QueryFilter` 是内部筛选表单组件，负责字段栅格、展开收起、查询 / 重置和提交行为。复杂筛选必须使用 `<Card bordered={false} className="ds-search-panel"><QueryFilter ... /></Card>`；禁止把 `QueryFilter` 当成独立白卡外壳，也禁止在复杂筛选场景用手写搜索卡字段替代 `QueryFilter`。筛选项 ≤4 且一行清晰时才使用卡内单行工具栏或轻量搜索卡字段。
17. **弹窗 / 抽屉浮层结构**：生成 Modal / Drawer 前必须先判断展示类还是操作类；浮层必须显式定义宽度档位、最大视口约束、滚动归属和操作按钮位置，详见 `components_Form.md` §弹窗 / 抽屉浮层容器。固定设计值须集中到局部常量或设计 token 映射中，禁止在 `styles` 和计算表达式里散落硬编码。普通业务 Modal 默认设置 `centered`，禁止依赖 AntD 默认 `top: 100px` 造成弹窗偏上；操作类 Modal 使用 header / body / footer 三段式，header 与 footer 有分割线，body 是唯一滚动区且 footer 固定可见；展示类 Modal 可不生成 footer。桌面 Drawer 默认使用左关闭 + 标题 + 右侧操作按钮的固定 header，body 单独滚动；禁止沿用右上角默认关闭、把按钮放进可滚动 body，或让底部按钮被内容挤出屏幕。

### Design Token 集成（复制模板时必做）

从 Skill 复制 layout / form / list 模板到用户项目时，模板内的 `import '../../references/global-style.css'` 指向 Skill 仓库路径，**在用户项目中不会自动生效**。须按以下 checklist 集成：

| 步骤 | 操作 |
|------|------|
| 1. 复制 global-style.css | 将 Skill 的 `references/global-style.css` 复制到用户项目，建议 `src/styles/global-style.css`（或项目既有全局样式目录） |
| 2. 全局引入 | 在入口文件（如 `src/main.tsx`）添加 `import './styles/global-style.css'` |
| 3. 移除 Skill 路径 | 删除已复制模板中的 `import '../../references/global-style.css'`（或改为指向步骤 1 的实际相对路径） |
| 4. ConfigProvider | App 根节点包裹 antd `ConfigProvider`，`theme.token.colorPrimary` 等传入 hex（如 `#1677ff`）；`borderRadius` / `borderRadiusLG` 统一为 **8**（与 `--border-radius-lg` 一致），禁止 CSS 变量字符串 |
| 4b. ProLayout 间距（必做） | 使用 `ProLayout` / `PageContainer` 时，**必须**引入 `global-style.css`（清零 Pro 默认 40px padding）；建议在根节点叠加 `ProConfigProvider`，`token.pageContainer.paddingInlinePageContainerContent: 0`、`paddingBlockPageContainerContent: 0` |
| 5. 验收 | 页面背景为 `#f7f8fa`；导航 hover/active 背景正常；ProCard / StatisticCard 圆角为 8px；控制台无 global-style.css 404；DevTools 检查 `.ant-pro-layout-content` / PageContainer 无 40px padding |

```tsx
// src/main.tsx 示例
import './styles/global-style.css';
import { ConfigProvider } from 'antd';
import { ProConfigProvider } from '@ant-design/pro-components';
import App from './App';

root.render(
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: '#1677ff',
        borderRadius: 8,
        borderRadiusLG: 8,
      },
    }}
  >
    <ProConfigProvider
      token={{
        pageContainer: {
          paddingInlinePageContainerContent: 0,
          paddingBlockPageContainerContent: 0,
        },
      }}
    >
      <App />
    </ProConfigProvider>
  </ConfigProvider>,
);
```

> **table 模板**：`scripts/table/` 多数文件未 inline import global-style.css，同样依赖步骤 2 的全局引入，否则 `var(--padding)` 等变量未定义。

---
