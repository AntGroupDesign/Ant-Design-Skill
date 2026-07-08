# 更新记录

本文档记录 **Ant Design Skill** 的版本变更，方便使用者快速了解每次更新内容。

---

## v1.0.0

**初始版本发布**

Ant Design Skill 首次开源发布。面向 AI 时代的设计系统表达与实践，把设计系统从"人理解的规范"升级为"AI 也能执行的设计能力"。

### 核心能力

- **Skill 入口规范**（`SKILL.md`）：完整的 AI Skill 定义文件，包含能力定位、覆盖范围、分段阅读指引、技术栈声明、使用流程、输出规则与 Design Token 集成 checklist
- **全局设计体系**（`references/global-style.css`）：基于 Design Token 的完整 CSS 变量系统，覆盖颜色、字体、间距、圆角、阴影、z-index 等维度，统一 Ant Design / ProComponents 的视觉基线

### 设计规范文档（references/）

| 规范文件 | 覆盖内容 |
|----------|---------|
| `layout.md` | 页面布局规则：主内容区规范、页面区块间距、页面标题区、页面说明提示条、侧边导航（SideLayout）、顶部导航（TopLayout）、混合导航（MixedLayout）、嵌入现有后台、面包屑、侧边栏收起态等 |
| `components_Form.md` | 表单组件规范：基础表单、横向分步表单、竖向分步表单、嵌入模式表单、筛选表单（QueryFilter）、登录表单 |
| `components_Table.md` | 表格组件规范：基础表格、可筛选排序表格、嵌套表格、批量操作表格、拖拽排序表格、带工具栏表格 |
| `components_List.md` | 列表组件规范：基础列表、编辑列表、带工具栏的列表、支持展开的列表、支持选中的列表、查询列表、竖排样式列表、卡片列表 |
| `components_DescriptionList.md` | 描述列表规范：基础描述列表、可编辑描述列表、分组卡片描述列表 |
| `components_Chart.md` | 图表与指标卡规范：基础图表引用边界、图表与指标卡共性规则、基础指标卡、同级指标卡、总分指标卡、嵌套指标卡、页签联动指标卡 |

### 代码模板（scripts/）

**导航布局**（3 个模板）

- `SideLayout.tsx` — 侧边导航布局
- `TopLayout.tsx` — 顶部导航布局
- `MixedLayout.tsx` — 混合导航布局

**表单**（6 个模板）

- `01-BasicForm.tsx` — 基础表单
- `02-HorizontalStepsForm.tsx` — 横向分步表单
- `03-VerticalStepsForm.tsx` — 竖向分步表单（含 5 步示例）
- `04-EmbedForm.tsx` — 嵌入模式表单
- `05-QueryFilter.tsx` — 筛选表单
- `06-LoginForm.tsx` — 登录表单

**表格**（6 个模板）

- `01-BasicTable.tsx` — 基础表格
- `02-FilterSortTable.tsx` — 可筛选排序表格
- `03-NestedTable.tsx` — 嵌套表格
- `04-BatchTable.tsx` — 批量操作表格
- `05-DragSortTable.tsx` — 拖拽排序表格
- `06-ToolbarTable.tsx` — 带工具栏表格

**列表**（8 个模板）

- `01-BasicList.tsx` — 基础列表
- `02-EditList.tsx` — 编辑列表
- `03-ToolbarList.tsx` — 带工具栏的列表
- `04-ExpandableList.tsx` — 支持展开的列表
- `05-SelectableList.tsx` — 支持选中的列表
- `06-QueryList.tsx` — 查询列表
- `07-VerticalList.tsx` — 竖排样式列表
- `08-CardList.tsx` — 卡片列表

**描述列表**（3 个模板）

- `01-BasicDescriptions.tsx` — 基础描述列表
- `02-EditableDescriptions.tsx` — 可编辑描述列表
- `03-GroupedCardDescriptions.tsx` — 分组卡片描述列表

**图表 / 指标卡**（6 个模板）

- `00-OnlyChartsBlock.tsx` — 基础图表区块
- `01-BasicStatisticCard.tsx` — 基础指标卡
- `02-IconStatisticCard.tsx` — 同级指标卡
- `03-TotalStatisticCard.tsx` — 总分指标卡
- `04-NestedStatisticCard.tsx` — 嵌套指标卡
- `05-TabsStatisticCard.tsx` — 页签联动指标卡

### 技术栈

- React 19 + TypeScript 5.x
- Ant Design 6.x（`antd ^6.0.0`、`@ant-design/icons ^6.0.0`）
- Ant Design ProComponents `^2.7.0`
- Ant Design Charts `^2.0.0`（图表页面按需引入）