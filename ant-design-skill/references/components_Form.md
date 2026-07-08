# 表单组件 (Form Components)

本节规定所有基于 Ant Design Form 的通用设计规则，适用于 `antd` 原生 `Form` 或 `@ant-design/pro-components` 的 `ProForm` 体系组件（包括 `StepsForm`、`BetaSchemaForm`、`QueryFilter`、`LoginForm` 等）。

## 目录

| 场景 | 说明 |
| :-- | :-- |
| [表单共性规则](#表单共性规则) | 适用于所有表单组件的按钮位置、控件选择、输入宽度、Token、抽屉与状态色规则 |
| [1. 基础表单 (Basic Form)](#1-基础表单-basic-form) | 单列垂直布局的信息录入表单，适用于字段较少的场景 |
| [2. 横向分步表单 (Steps Form)](#2-横向分步表单-steps-form) | 长流程拆解为多个有序步骤，各步骤独立校验 |
| [3. 竖向分步表单 (Steps Form - Vertical)](#3-竖向分步表单-steps-form---vertical) | 竖向排列步骤条，适用于步骤较多（≥4 步）的场景 |
| [4. 嵌入模式表单 (Embed Form)](#4-嵌入模式表单-embed-form) | 内容量大、可明确分类的配置型表单；含宽面板 + 锚点增强形态 |
| [5. 筛选表单 (Query Filter)](#5-筛选表单-query-filter) | 列表页顶部的查询筛选区域，支持展开收起 |
| [6. 登录表单 (Login Form)](#6-登录表单-login-form) | 专门适配登录场景的布局表单 |

---

## 表单共性规则

以下规则适用于本文件所有表单组件，各组件不再重复说明。

> **页面说明提示条**：默认不生成；仅当用户明确要求，或保存范围、字段联动、步骤校验、生效时机容易误解时，才引用 [`layout.md` §页面说明提示条](layout.md#页面说明提示条)。

> **表单间距边界**：表单外层 PagePanel / `ds-page-card` 可遵循页面级白卡外圈 16 / 24 规则；表单内部字段、`Form.Item` 间距、按钮区、`StepsForm` 步骤条、左右分栏、嵌入表单弱分组、`QueryFilter` 字段栅格与 submitter 均按本文件表单专属规则执行，禁止套用列表 / 表格 / 指标 / 描述卡的内容线规则。

### 操作按钮位置
按钮顺序固定为：左侧次操作（取消 / 重置）→ 右侧主操作（确认 / 提交 / 发布）。按钮对齐方式按场景区分：

+ **抽屉 / 模态弹窗**：按钮位于容器底部**右对齐**
+ **独立页面 / 嵌入区块**：按钮位于容器底部**左对齐**

```tsx
// 抽屉 / 弹窗：右对齐
<div style={{ textAlign: 'right' }}>
  <Space size={8}>
    <Button onClick={onClose}>取消</Button>
    <Button type="primary" htmlType="submit">确认</Button>
  </Space>
</div>

// 独立页面 / 嵌入区块：左对齐
<div style={{ textAlign: 'left' }}>
  <Space size={8}>
    <Button onClick={() => formRef.current?.resetFields()}>重置</Button>
    <Button type="primary" onClick={() => formRef.current?.submit()}>提交</Button>
  </Space>
</div>

```

### 输入组件选择规则
| 需求 | 组件 |
| :--- | :--- |
| 文本输入 | `Input` |
| 长文本 / 备注 | `Input.TextArea` |
| 预定义选项单选 | `Select` |
| 少量互斥选项 | `Radio.Group` |
| 多选 | `Checkbox.Group` |
| 日期 / 时间 | `DatePicker` / `TimePicker` |
| 数字 | `InputNumber` |
| 开关 | `Switch` |
| 层级数据 | `Cascader` 或 `TreeSelect` |
| 文件上传 | `Upload` |
| 两列互转 | `Transfer` |


### 输入框宽度规范
垂直布局专用，**禁止用百分比**，优先使用 ProForm 内置 `width` 枚举；非 ProForm 组件使用 `style={{ width: Npx }}` 写固定像素值。

ProForm `width` 枚举与像素对照：

| 枚举值 | 像素 | 适用字段 |
| :--- | :--- | :--- |
| `"xs"` | 104px | 短数字、短编码 |
| `"sm"` | 216px | 姓名、电话、ID |
| `"md"` | 328px | 大部分标准字段（默认首选） |
| `"lg"` | 480px | 网址、标签组、文件路径 |
| `"xl"` | 552px | 长链接、描述、备注（最大档位） |

> **注意**：ProForm `width="lg"` 对应 480px，与 global-style.css 中 L 档（440px）不完全一致，以 ProForm 枚举值为准。

非 ProForm 组件（antd 原生 `Input`、`Select` 等）的固定像素档位：

| 档位 | 宽度 | 适用字段 |
| :--- | :--- | :--- |
| XS | 104px | 短数字、短编码 |
| S | 216px | 姓名、电话、ID |
| M | 328px | 大部分标准字段（默认首选） |
| L | 440px | 网址、标签组、文件路径 |
| XL | 552px | 长链接、描述、备注（最大档位） |

计算公式：`目标宽度 = XS(104px) × N + 间距(8px) × (N-1)`

同一表单内**单行**输入组件（Text / Select / DatePicker 等）须统一 `width`，默认 **`md`**；`ProFormTextArea` 使用 **`width="xl"`**（552px），**禁止** `width="100%"` 或百分比。

> **宽面板双列嵌入表单例外**：`ProForm.Group` 双列 Grid 内，列宽由 Grid 等分；单行控件在列内 **`width: 100%` 撑满格**（样式见 `global-style.css` §`.embed-form-content`），字段仍写 `width="md"` 作语义标记。抽屉 / 窄容器 / §4 基础嵌入仍用固定 `md` 328px，不适用列内 100%。

#### TextArea 字数统计

`Input.TextArea` / `ProFormTextArea` 使用 `showCount` 时，字数统计属于输入控件的附属信息，应收在输入框内部右下角；禁止让计数占据输入框外部高度或压到下一个表单项 label。带计数的短 TextArea 最小高度不低于 76px，避免 `rows={2}` 时像单行输入框。弹窗 / 抽屉等固定容器内禁止露出原生 resize 手柄，避免拖拽破坏弹窗滚动与底部按钮区。复制到用户项目后须引入 `global-style.css`，其中已覆盖 `.ant-input-textarea-show-count` 的计数位置、底部预留空间与弹窗内 resize 行为。

若项目内需要统一单行 `Input` 高度，选择器必须排除 TextArea（如 `.ant-input:not(textarea)`），禁止用全局 `.ant-input { height: 32px }` 压缩多行输入框。

#### Checkbox 与多选控件

| 控件 | 是否设 `width` | 说明 |
| :-- | :-- | :-- |
| `ProFormCheckbox.Group` | ✅ 建议 `md` | `width` 控制**选项容器**宽度；列布局用 `fieldProps.style`（如 `display: 'grid'`） |
| `ProFormCheckbox`（单方确认 / 会签） | ❌ 不设 | 文案为子节点，宽度随内容；需与 TextArea 左缘对齐时，外层 `div` 设 `maxWidth: 552` |
| `ProFormRadio.Group` | ✅ 同 Select | 互斥单选，宽度规则与 Select 一致 |

多行确认文案须勾选框与首行文字**顶对齐**：横向 / 竖向分步表单依赖 `global-style.css` 中 `.horizontal-steps-form` / `.vertical-steps-form` 的 Checkbox scoped 样式；**禁止**仅依赖 antd 默认垂直居中。

```tsx
// 多选：容器 md + 可选网格
<ProFormCheckbox.Group
  name="dimensions"
  label="影响维度"
  width="md"
  options={OPTIONS}
  fieldProps={{ style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 } }}
/>

// 会签确认：不设 width，外层限制与 xl 字段同宽
<div style={{ maxWidth: 552 }}>
  <ProFormCheckbox name="partyAConfirmed" rules={[{ required: true }]}>
    甲方确认：……
  </ProFormCheckbox>
</div>
```

### Form Component Token

Form 相关 Design Token 统一定义在 [`references/global-style.css`](../references/global-style.css) **「Form（表单）」**组件区（Component Token 区块）。每条 `--form-*` 变量注释已标注对应的 Ant Design `components.Form` Token 名，**以 global-style.css 为唯一数据源，本文件不再重复对照表**。

使用要求：

+ **样式引用**：优先使用 `--form-*` 变量（如 `--form-item-margin-bottom`、`--form-drawer-content-padding-inline`）
+ **`ConfigProvider` 注入**：`theme.components.Form` 须传入**具体数值/色值**，禁止传入 `'var(--xxx)'` 字符串；取值与 global-style.css 该区块注释一致

### 抽屉面板宽度
当使用 Ant Design `Drawer` 承载单列垂直表单、且抽屉 `body` 仅铺表单而无侧栏等横向分栏时：

+ **面板总宽度（`Drawer.width`，px）** = **该表单统一采用的控件宽度**（上表档位像素值，如 M 档 `328px`）+ **内容区左侧内边距** + **内容区右侧内边距**。
+ 左右内边距与全局规范一致：**各 `var(--form-drawer-content-padding-inline)`（24px）**。
+ **示例**：M 档 + 左右各 24px → `328 + 24 + 24 = 376`。
+ 若表单改用其他档位、或 `body` 的左右 `padding` 与 `24px` 不一致，则按**实际控件宽度与左右内边距之和**计算；**多列/弱分组**、抽屉内增加其它分栏时，不适用此简单求和，需单独排版。

### 抽屉标题栏与关闭按钮
适用于 `Drawer` 内嵌表单（含单列垂直、卡片分组等）：

+ **关闭入口**须与**标题同一行**，且位于**标题之后（靠右，LTR）**；**禁止**将关闭放在**标题之前**（例如行首），以免与阅读顺序和底部主操作右对齐习惯冲突。
+ 为避免关闭按钮出现在标题**之前**（如 `placement: 'start'`），**必须**显式设置 `closable={{ placement: 'end' }}`。
+ **距面板右内边距**：关闭可点击区域与面板右缘之间取 **24px**（`var(--form-drawer-content-padding-inline)`），并与 `footer` 内操作按钮（取消 / 确定等）右缘纵向对齐。
+ 可通过 `Drawer` 的 `styles.header`、`styles.footer`（或与 `footer` 内包裹层的 `padding`）与 `styles.body` 统一左右 **`var(--form-drawer-content-padding-inline)`**，确保标题行关闭与底部按钮同一垂线。

```tsx
<Drawer
  title="添加数据源"
  width={376}
  open={open}
  onClose={onClose}
  closable={{ placement: 'end' }}
  styles={{
    header: { paddingInline: 24 },
    body: { paddingInline: 24 },
    footer: { paddingInline: 24 },
  }}
  footer={/* 取消 / 确认，右对齐 */}
>
  <Form layout="vertical" requiredMark>...</Form>
</Drawer>
```

### 状态色映射规范

表单中涉及状态字段（启用/停用、处理中/已完成等）时，统一使用 Ant Design Tag 预设语义值，引用 `global-style.css` 中的功能色变量，禁止写死 hex 值：

| Tag color 值 | 语义 | 对应 global-style.css 变量 |
| :-- | :-- | :-- |
| `"success"` | 成功 / 正常 / 运行中 | `--color-success` (#52c41a) |
| `"error"` | 错误 / 异常 / 失败 | `--color-error` (#ff4d4f) |
| `"warning"` | 警告 / 待处理 | `--color-warning` (#faad14) |
| `"processing"` | 进行中 / 处理中 | `--color-info` (#1677ff) |
| `"default"` | 中性 / 停用 / 关闭 | 无对应功能色变量，使用默认灰色 |

**实现方式**：在 `BetaSchemaForm` / `ProForm` 的列定义中使用 `valueEnum`，通过 `status` 字段配置语义状态，组件自动渲染对应颜色，无需在 `render` 中手写颜色逻辑：

```tsx
// ✓ 正确：通过 valueEnum + status 映射
const statusEnum = {
  active:   { text: '正常', status: 'Success'   },
  pending:  { text: '待处理', status: 'Warning'  },
  error:    { text: '异常', status: 'Error'     },
  stopped:  { text: '停用', status: 'Default'   },
};

// ✗ 错误：禁止在 render 中手写颜色
render: (_, record) => (
  <Tag style={{ color: '#52c41a' }}>正常</Tag>
);
```

---

### 分步表单选型

凡涉及**长流程、多步骤、多方协作、中途保存**的表单，须先完成本表选型，再选 §2 横向或 §3 竖向模板。**禁止**在 `StepsForm` 外再套一层进度看板。

#### 组件与步骤数选型

| 判断条件 | 推荐方案 | 规范 / 模板 |
| :-- | :-- | :-- |
| 步骤 ≤4，描述较短 | **横向分步表单** | §2 → `02-HorizontalStepsForm.tsx` |
| 步骤 ≥4，或每步描述较长（含负责方说明） | **竖向分步表单** | §3 → `03-VerticalStepsForm.tsx` |
| 字段可按模块分组、无强步骤顺序 | **嵌入模式表单** | §4 → `04-EmbedForm.tsx` |
| 配置区块 ≥4，或需在页内快速跳转各区块 | **宽面板增强形态** | 在 §4 基础嵌入表单上扩展，不单列模板 |
| 需嵌入**现有**管理后台 | 任意导航布局 + 分步表单页 | `layout.md` §嵌入现有后台：主内容区继承；不单独拆应用壳 |

#### 信息归属（避免与步骤条重复）

| 信息 | 放在哪里 | 禁止 |
| :-- | :-- | :-- |
| 当前第几步 | `Steps` 步骤条（内置） | 表单上方独立进度条 /「x/y 步」Card |
| 每步谁填写 | `stepProps.description` | 额外交协作者 Tag 区 |
| 整单进度 / 缺件 / 下一处理方 | **列表页、详情页或工单中心**（任选其一） | 表单页顶部待补材料清单 |
| 暂存时间 | 暂存 `message` 或外部追踪页 | 表单顶部「上次保存」面板 |
| 终态汇总 | 最后一步 `Descriptions` | 表单外独立预览 Card |

#### 关键反例

+ ❌ 竖向 `StepsForm` 上方再叠 Card（进度条 + 待补材料 + 处理方 Tag）→ 与左侧步骤条信息重复，破坏分步表单信息层级
+ ❌ 为展示协作进度单独发明第三层「工单看板」夹在页面提示条与 `StepsForm` 之间 → 应把追踪信息放到列表/详情/工单页
+ ❌ 竖向 ≥4 步却用横向模板或仅复制 3 步示例后自行拼凑 → 须以 `03-VerticalStepsForm.tsx` 5 步示例为基准扩展
+ ✓ 表单页只保留：PageHeader + 可选页面说明提示条 + 白色 PagePanel（`ds-page-card`）+ `StepsForm`；编辑 / 流程页带面包屑时按 `layout.md` §带面包屑的页面标题区，协作规则优先写在 `stepProps.description`，只有保存 / 生效 / 校验规则容易误解时才加页面提示条

---

## 1. 基础表单 (Basic Form)


> **适用场景**：单列垂直布局的信息录入表单，适用于抽屉内或独立页面中字段较少、逻辑简单的场景。字段较多或存在明显分组逻辑时，可根据实际情况考虑分组或拆分布局。

**约束**：

+ `layout` 固定为 `"vertical"`，禁止在此场景使用 `horizontal` 或 `inline`
+ 输入组件宽度优先使用 ProForm `width` 枚举（如 `width="md"`），非 ProForm 组件使用 `style={{ width: Npx }}` 固定像素值，**禁止用百分比**
+ `Select` 使用 `options` 属性传入选项，禁止使用 `<Option>` 子组件写法
+ 按钮区规则见上方"表单类共性规则"

**代码模板**：`scripts/form/01-BasicForm.tsx`

---

## 2. 横向分步表单 (Steps Form)


> **适用场景**：将冗长或复杂的填写任务分解为一系列较小、有逻辑顺序的表单步骤的交互设计模式。适用于任何需要将一个长流程拆解为多个有序步骤的基础场景。

**约束**：

+ 使用 `<StepsForm />` 包裹多个 `<StepsForm.StepForm />`，每个 `StepForm` 对应一个步骤
+ 各步骤表单**独立校验**，仅当前步骤校验通过才允许进入下一步
+ 最终提交时，`onFinish` 回调接收聚合对象，结构为 `{ step1: {...}, step2: {...}, ... }`
+ 内部自动管理当前步骤索引、表单实例缓存与回退逻辑
+ 使用 `ProCard` 作为外层容器，背景色遵循 `var(--color-bg-container)`
+ 步骤描述文本（`stepProps.description`）颜色由 StepsForm 内部样式控制，跟随 `var(--color-text-secondary)`，开发者无需手动设置
+ 组件来自 `@ant-design/pro-components`（ProForm 体系），**可使用** antd 原生 `Form`
+ 按钮区由 `StepsForm` 内部自动管理；须自定义时在 `submitter.render` 中扩展，**最后一步**主按钮文案改为「提交」
+ 输入组件宽度使用 ProForm 内置 `width` 枚举，详见共性规则 [输入框宽度规范](#输入框宽度规范) 与 [Checkbox 与多选控件](#checkbox-与多选控件)
+ 信息归属与禁止叠 UI 见上方 [分步表单选型](#分步表单选型)
+ `StepsForm` 必须放在白色 PagePanel 内，外层 PagePanel 使用 `ds-page-card steps-form-page-card` 或等效白色内容容器承担背景、圆角、阴影与 24px 水平内边距；禁止直接浮在页面灰色背景上
+ 外层须包 **`className="horizontal-steps-form"`**，作为 `StepsForm` 的**父级**包裹层（`.ant-form` 在其内部，**禁止**写反选择器 `.ant-form .horizontal-steps-form`）
+ 分步表单卡内顶部到 Steps、submitter / 最后一项到底部均由 `horizontal-steps-form` 保留 **48px**；禁止在模板根节点或 `StepsForm` 上手写 `padding: 24px 0 72px`、`paddingBottom: 0` 等内联覆盖
+ 复制到用户项目后须引入 `global-style.css`，其中「横向分步表单样式覆盖」提供：卡内 48px 上下收口、步骤条布局、单行控件 **md(328px)** / TextArea **xl(552px)**、Checkbox 顶对齐

**页面结构**（嵌入现有后台时）：

```
PageHeader → [可选 Alert（ds-page-inline-alert）] → PagePanel → .horizontal-steps-form → StepsForm
```

**代码模板**：`scripts/form/02-HorizontalStepsForm.tsx`

---

## 3. 竖向分步表单 (Steps Form - Vertical)

> **适用场景**：与横向分步表单一致，将冗长或复杂的填写任务分解为多个有序步骤。区别在于步骤条采用竖向排列，适用于步骤较多（≥4 步）、且每步描述文字较长需要更多展示空间的场景。竖向步骤条节省横向空间，与表单内容区左右分栏，适合在现有管理后台主内容区或抽屉中使用。

**约束**：

+ 导入来源固定为 `@ant-design/pro-components`，禁止替换为其他库
+ 竖向分步表单必须以 `scripts/form/03-VerticalStepsForm.tsx` 为起点复制生成，只替换步骤标题、字段、描述与提交逻辑；禁止从 AntD 裸 `StepsForm`、`Steps` 或自定义步骤列表重新拼装
+ 使用 `StepsForm` 包裹多个 `StepsForm.StepForm`，通过 `stepsProps={{ direction: 'vertical' }}` 设置竖向步骤条
+ 竖向步骤条必须基于 `StepsForm` 原生 `stepsDom` 渲染，禁止手写 `List` / `Timeline` / `div` 模拟圆点、序号和连接线
+ `layoutRender` 必须保留模板结构：左侧 `.vertical-steps-form-steps` 只放 `{stepsDom}`，右侧 `.vertical-steps-form-content` 只放 `{formDom}`；禁止把步骤标题 / 描述拆出来另写自定义步骤列表
+ 竖向步骤条与表单内容区左右分栏：左侧固定步骤区，右侧为当前步骤表单，按钮跟随表单列左对齐
+ 左侧步骤列表顶部与右侧表单内容顶部必须对齐：左侧 `.vertical-steps-form-steps` 的第一个步骤项标题顶部与右侧 `.vertical-steps-form-content` 的首个可见内容元素位于同一视觉起点；不要求第 2 / 3 / 4 步标题与右侧内容动态对齐。右侧首个元素可能是字段 label、区块标题、`Descriptions` 标题或汇总标题；禁止给任一列、`StepForm`、`stepFormBody`、`Form` 或首个 `Form.Item` / 标题额外设置 `padding-top` / `margin-top` 导致两列错位
+ 右侧表单项之间使用 `--form-item-margin-bottom`，默认 24px；禁止为单个 `Form.Item` 额外写 `margin-bottom: 28px` / `32px` 造成节奏不统一
+ 步骤标题和描述文字由 `stepProps` 提供；**描述须写明负责方**（如 `业务方 · 负责人`），较长时优先竖向布局
+ 步骤项间距必须稳定：5 步场景使用 `vertical-steps-form--five-steps` 的固定 `min-height` / `padding-bottom`；步骤间距只能由 `.ant-steps-item` 自身承担，禁止在 `.ant-steps`、步骤列表父容器或单个步骤外层使用 `gap` / `margin-bottom` 拉开距离，否则连接线会在外部空白处断开
+ 步骤圆点 / 完成态图标统一为 **32px × 32px**，连接线只出现在两个圆点之间：从上一个圆点下方 8px 开始，到下一个圆点上方 8px 结束；完成态、当前态、未开始态必须共用同一中心线，禁止完成态 check 图标导致连接线穿过或超过编号
+ 禁止给 `.ant-steps-item-tail`、`.ant-steps-item-container`、`.ant-steps-item-content` 写 `height` / `top` / `transform` 等局部覆盖；连接线位置、完成态圆点、左侧标题顶部与右侧首个内容顶部对齐，均由 `global-style.css` 的 `.vertical-steps-form` scoped 样式统一控制
+ 各步骤表单**独立校验**，仅当前步骤校验通过才允许通过"下一步"按钮进入下一步
+ 最终提交时，`onFinish` 回调接收聚合对象
+ 按钮区通过 `submitter.render` 扩展：除「上一步 / 下一步 / 提交」外，可增加「暂存草稿」（调用 `formRef.getFieldsValue()`，**不**触发当前步 required 以外的全量校验）
+ 步骤数 ≥5 时，外层容器增加 `vertical-steps-form--five-steps` class（见 `global-style.css`）
+ 最后一步可增加 `Descriptions` 汇总关键字段，作为终态确认
+ 输入组件宽度使用 ProForm 内置 `width` 枚举，详见共性规则"输入框宽度规范"
+ `StepsForm` 必须放在白色 PagePanel 内，外层 PagePanel 使用 `ds-page-card steps-form-page-card` 或等效白色内容容器承担背景、圆角、阴影与 24px 水平内边距；禁止直接浮在页面灰色背景上
+ 分步表单卡内顶部到步骤区、submitter / 最后一项到底部均由 `vertical-steps-form` 保留 **48px**；禁止给 PagePanel 与 `vertical-steps-form` 同时叠加上下 padding
+ 最后一步如包含 `Descriptions` / 表格汇总 + 多方确认 Checkbox，必须使用 `.steps-confirm-summary` 与 `.steps-confirm-checklist`：汇总区到 checkbox 组 16px，checkbox 行间距 16px，checkbox 与文案 8px 且多行文案顶对齐
+ **禁止**在 `StepsForm` 上方叠加进度 Card、待补材料清单、协作看板，见 [分步表单选型](#分步表单选型)

**页面结构**（嵌入现有后台时）：

```
PageHeader → [可选 Alert（ds-page-inline-alert）] → PagePanel（ds-page-card steps-form-page-card）→ .vertical-steps-form → StepsForm
```

**代码模板**：`scripts/form/03-VerticalStepsForm.tsx`（含 5 步示例、暂存草稿、终态 `Descriptions`）

---

## 4. 嵌入模式表单 (Embed Form)


> **适用场景**：内容量大、可明确分类的配置型表单的场景。

**约束**：

+ 导入来源固定为 `@ant-design/pro-components`，禁止替换为其他库
+ 使用 `BetaSchemaForm` 配合 `layoutType="Embed"` 渲染嵌入模式表单，表单内嵌在页面区域中，不弹窗不抽屉
+ 多个嵌入表单可组合在同一个 `ProForm` 容器内，统一提交
+ 列定义使用 `ProFormColumnsType` 类型，通过 `columns` 属性配置字段、校验规则与值枚举
+ `valueType: 'group'` 用于字段分组，分组内通过 `columns` 嵌套子字段
+ 状态字段使用 `valueEnum` 配置，禁止在 `render` 中手写 Tag 颜色逻辑
+ 字段宽度使用 `width` 枚举，详见共性规则"输入框宽度规范"；注意 `BetaSchemaForm` 的 `columns` 中 `width` 使用单字母写法（`'m'` / `'s'` / `'l'`），与 ProForm 子组件的双字母写法（`'md'` / `'sm'` / `'lg'`）不同
+ 多区块组合时，每个区块用 `div` 包裹，样式为 `border: 1px solid var(--color-border-secondary); border-radius: var(--border-radius); padding: var(--padding) var(--nav-space-6)`（上 16px / 左右 24px / 下 16px，与 [`layout.md` §页面内容水平对齐](layout.md#页面内容水平对齐) 一致），区块标题使用 `fontSize: var(--font-size-lg), fontWeight: var(--font-weight-secondary), color: var(--color-text)`
+ 按钮区规则见上方"表单类共性规则"（独立页面 / 嵌入区块，按钮左对齐）

**代码模板**：`scripts/form/04-EmbedForm.tsx`（基础 / 窄容器）；宽面板仅作为本节扩展规则，不单列典型模板。

#### 增强形态：宽面板

> **适用场景**：配置项多、语义区块 ≥4、无强步骤顺序，并且用户需要在页面内频繁跳转编辑。它是 §4 嵌入模式表单的增强形态，不是独立表单大类。

##### 选型

| 判断条件 | 方案 | 实现方式 |
| :-- | :-- | :-- |
| 区块 ≤3，无页内跳转 | §4 基础嵌入 | `04-EmbedForm.tsx` |
| 区块 ≥4，或单区块字段很多 | 宽面板增强形态 | 在基础嵌入表单上扩展 |
| 抽屉 / 窄容器 | §4 基础嵌入，控件固定 `width="md"` 328px | `04-EmbedForm.tsx` |

##### 结构与间距

- 页面结构：`PageHeader` → 可选页面说明提示条 → `PagePanel.embed-form-page-panel`；编辑页需要面包屑时按 `layout.md` §带面包屑的页面标题区，面包屑与标题左对齐，右侧操作与标题行居中对齐并靠右
- 面板内结构：左侧 `.embed-form-nav` 放 Anchor；右侧 `.embed-form-content` 放 `ProForm` 和多个 `.embed-form-section`
- 锚点与表单区之间只用 `gap: var(--nav-space-6)`，禁止加 `border-right` / 竖线分隔
- 白卡片外圈使用页面级内容卡 16 / 24 规则；`.embed-form-section` 是表单内部弱分组，可继续使用 `--padding-lg` 作为表单密集字段分组例外，但不得套用到列表卡、表格卡、指标卡、描述分组卡等页面级内容卡
- Anchor 只负责区块跳转，不参与字段排版；无步骤顺序时不要改用 `StepsForm`

##### 字段布局

- 双列只允许发生在 `ProForm.Group` 内：`.ant-pro-form-group-container` 使用 `repeat(2, 1fr)` + `column-gap: var(--nav-space-6)`
- `.embed-form-section-body` 与 `.embed-form-subsection` 保持纵向堆叠，不做双列 Grid
- 每个子区块使用一个 `ProForm.Group`，普通字段放在 Group 内，列内撑满；字段仍声明 `width="md"` 作为语义标记
- 长 TextArea 使用 `embed-form-field-full` 跨两列整行；落单普通字段默认半宽，不自动跨列
- Switch / Radio 等非文本控件使用对应 class（如 `embed-form-switch-field`、`embed-form-radio-field`）保证与输入框高度和列宽节奏一致

##### 避免

- 不要把 `.embed-form-section-body` 写成两列 Grid，避免子区块横排、控件被压窄
- 不要对 `.ant-pro-form-group-container.ant-space` 写 `gap: 0`，会清掉两列间距
- 不要把同一子区块拆成多个 `ProForm.Group`，会造成列宽节奏不一致
- 不要让普通字段自动跨列；只有长 TextArea 等明确长内容字段允许整行

**样式**：如需实现宽面板增强形态，样式见 `references/global-style.css` §宽面板嵌入表单（`.embed-form-*`）。

---

## 5. 筛选表单 (Query Filter)

> **适用场景**：用于列表页顶部搜索卡内的查询筛选表单，支持展开收起。适用于数据量大、筛选条件多，需要与服务端交互获取查询结果的场景。通过 `QueryFilter` 组件，用户可设置多个筛选条件后一次性提交查询，精准定位目标数据。

`QueryFilter` 是筛选表单组件本体，不是页面白卡容器；复杂筛选须由搜索卡承载：

```tsx
<Card bordered={false} className="ds-search-panel">
  <QueryFilter {...queryFilterProps} />
</Card>
```

**约束**：

+ 导入来源固定为 `@ant-design/pro-components`，禁止替换为其他库
+ 使用 `QueryFilter` 组件，配合 `ProFormText`、`ProFormDatePicker`、`ProFormSelect` 等筛选字段组件
+ `defaultCollapsed` 控制默认收起状态，`split={false}` 关闭字段间分割线（默认开启，通常关闭以保持界面简洁）
+ `defaultFormItemsNumber` 控制收起时展示的表单项数量（默认 5），超出部分点击"展开"后显示
+ 搜索/查询行为为一次性提交（非即时筛选），点击"查询"按钮后发起请求
+ "重置"按钮清空所有筛选条件并重新查询
+ 筛选条件一般不超过 8 个，条件过多时考虑使用高级查询弹窗
+ 展开收起使用线性图标（`DownOutlined` / `UpOutlined`），禁止使用实心图标
+ 按钮区域（重置/查询/展开收起）通过 `submitter.render` 自定义，使用 `Col flex="auto"` + `justifyContent: 'flex-end'` 实现与内容区右边界对齐
+ 输入组件默认使用 M 宽度（`width="md"`），筛选字段宽度统一
+ `QueryFilter` 必须放在搜索卡容器 `<Card bordered={false} className="ds-search-panel">` 内；搜索卡负责白卡外观与 Card body padding（上下 `var(--nav-space-5)`、左右 `var(--nav-space-6)`），`QueryFilter` 只负责字段布局、展开收起与提交行为。禁止再写 `padding: 72`、额外 Card body padding，或让 `QueryFilter` 自己承担白卡外壳。字段行列间距由 `searchGutter={[24, 16]}` 控制

**代码模板**：`scripts/form/05-QueryFilter.tsx`

#### 补充：内联高级筛选

当列表页筛选条件较少（≤6 个）、不需要 ProComponents 的强校验 / 联动能力时，可在搜索卡内提供「高级筛选」展开区，作为 `QueryFilter` 的轻量补充，而不是独立表单场景。

**使用规则**：

- 主筛选区永久可见；高级筛选通过入口展开，展开内容仍留在同一张搜索卡内
- 展开区使用 `var(--nav-color-bg-canvas)` 作为弱底色，圆角和内边距走 `--nav-radius-sm`、`--nav-space-4`
- 筛选字段使用 CSS Grid 自适应排列，字段之间保持 `--nav-space-3` 间距；禁止强行用 flex 换行
- 展开区底部必须提供「重置 / 查询 / 收起」操作，右对齐；`查询` 为主按钮，`收起` 用链接按钮弱化
- 展开 / 收起使用 `DownOutlined` / `UpOutlined`，禁止实心图标或自绘箭头
- 展开区内不再嵌套完整 Form；字段可直接使用 `Input`、`DatePicker`、`Select` 等受控组件。需要校验、联动或服务端统一提交时，改用本节 `QueryFilter`

**避免**：

- 高级筛选展开后只有字段、没有底部操作区
- 把展开区做成独立 Card 或加阴影，导致它脱离搜索卡
- 把「收起」做成默认按钮，与「查询」抢主操作权重
- 在展开区内继续套灰底 / 卡片色，造成层级重复

---

## 6. 登录表单 (Login Form)

> **适用场景**：为适应常见的登录表单布局来专门实现，适用于各类登录场景，降低布局的压力。

**约束**：

+ 导入来源固定为 `@ant-design/pro-components`，禁止替换为其他库
+ 使用 `LoginForm` 组件，内置 Logo、标题、副标题、登录方式切换和第三方登录等布局能力
+ 多登录方式通过 `Tabs` 切换，`loginType` 状态由 `useState` 管理
+ 账号密码登录使用 `ProFormText` + `ProFormText.Password`
+ 手机号登录使用 `ProFormText`（手机号）+ `ProFormCaptcha`（验证码）
+ `ProFormCaptcha` 的 `onGetCaptcha` 回调处理验证码获取逻辑，`captchaTextRender` 自定义按钮文案
+ 第三方登录图标使用 `@ant-design/icons`，样式通过 `theme.useToken()` 获取 Token 变量，禁止硬编码颜色
+ 密码强度展示使用 Token 语义颜色（`token.colorSuccess` / `token.colorWarning` / `token.colorError`），禁止写死 hex 值
+ `ProConfigProvider hashed={false}` 包裹以禁用样式哈希，避免与全局样式冲突

**代码模板**：`scripts/form/06-LoginForm.tsx`
